import MathUtil from "../../Utils/MathUtils"
import EventEnum from "../../Events/EventEnum"
import Measurements from "./Measurements"
import Env from "../../Config/Env"
import * as d3 from "d3"

/**
 * The DOM Processor class is responsible for managing the DOM using the provided node and edge data, as well as provided configuration.
 */
export default class DOMProcessor {
	constructor(graphContainerElement, eventEmitter, userDefinedOptions) {
		this.enableFadeOnHover = userDefinedOptions.enableFadeOnHover !== undefined ? userDefinedOptions.enableFadeOnHover : Env.DEFAULT_FADE_ON_HOVER
		this.showMultiplicity = true
		this.enableMultiLineNodeLabels =
			userDefinedOptions.enableMultiLineNodeLabels !== undefined ? userDefinedOptions.enableMultiLineNodeLabels : Env.DEFAULT_NODE_TEXT_MULTILINE
		this.rotateLabels = userDefinedOptions.rotateLabels !== undefined ? userDefinedOptions.rotateLabels : Env.ROTATE_LABELS
		this.lineType = userDefinedOptions.lineType !== undefined ? userDefinedOptions.lineType : Env.DEFAULT_LINE_TYPE
		this.markerSize = userDefinedOptions.markerSize !== undefined ? userDefinedOptions.markerSize : Env.DEFAULT_MARKER_SIZE

		this.measurements = new Measurements(graphContainerElement)
		this.rootG = d3.select(graphContainerElement).select("g")
		this.nodes = []
		this.edges = []
		this.selection = null
		this.hoveredEntity = null
		this.hoveredDirection = null
		this.dragSelection = []
		this.listeningForTick = false
		this.pinMode = false

		//Every time we redraw we want to store custom IDs of the last selection, including type and meta data.
		//This is beacuse we may receive the same node/edge, but with new parameters, and in that case it has to be redrawn
		this.lastEdgeIDs = new Set()
		this.lastNodeIDs = new Set()

		this.lastDragX = 0
		this.lastDragY = 0
		this.isMultiSelecDragtModeEnabled = false

		this.ee = eventEmitter
		this.ee.on(EventEnum.NODE_MULTI_SELECT_DRAG_MODE_TOGGLED, isEnabled => {
			this.isMultiSelecDragtModeEnabled = isEnabled
		})
		this.ee.on(EventEnum.SELECTION_UPDATED, selection => {
			this.selection = selection
		})
		this.ee.on(EventEnum.TOGGLE_MULTIPLICITY_REQUESTED, () => {
			this.showMultiplicity = !this.showMultiplicity
			this.updateMultiplicityCounters(this.edges)
		})
		this.ee.on(EventEnum.NODE_PIN_MODE_TOGGLED, isEnabled => (this.pinMode = isEnabled))
		this.ee.on(EventEnum.DATASTORE_UPDATED, (nodes, edges) => {
			this.nodes = nodes
			this.edges = edges
			//The order of these matters, don't rearrange
			this.cleanOldDOMNodesAndEdges()
			this.updateMarkers(edges)
			this.updateEdges(edges)
			this.updateLabels(edges)
			this.updateMultiplicityCounters(edges)
			this.updateNodes(nodes)
			this.attachEntityClickListeners()
			this.ee.trigger(EventEnum.DOM_PROCESSOR_FINISHED, nodes, edges)
		})
		this.ee.on(EventEnum.RELATIVE_POSITION_UPDATE_REQUESTED, () => {
			this.computeRelativeNodeAndLabelPositions()
		})
		this.ee.on(EventEnum.ENGINE_TICK, () => {
			this.tick()
		})
		this.ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
			this.listeningForTick = true
		})
	}

	/**
	 * Finds any nodes or edges that have changed in a way that must be reflected in the DOM, and removes them from the dataset bound to the DOM elements
	 * This makes it so that the next enter() selection will receive the nodes/edges as new data points, and will redraw them from scratch
	 */
	cleanOldDOMNodesAndEdges() {
		const fixList = (idSet, idGenerator, entityList, selectorArray) => {
			if (idSet.size > 0 && entityList.length > 0) {
				const update = entityList.filter(entity => idSet.has(idGenerator(entity)))
				selectorArray.forEach(selector => {
					this.rootG
						.select(selector[0])
						.selectAll(selector[1])
						.data(update, d => {
							return d.id
						})
						.exit()
						.remove()
				})
			}
			idSet.clear()
			entityList.forEach(entity => idSet.add(idGenerator(entity)))
		}
		fixList(this.lastEdgeIDs, this.getEdgeGraphicalID, this.edges, [
			["#edge-container", ".edge"],
			["#multiplicity-container", ".multiplicity"],
			["#label-container", ".label"]
		])
		fixList(this.lastNodeIDs, this.getNodeGraphicalID, this.nodes, [["#node-container", ".node"]])
	}

	/**
	 * Computes the relative positions and sizes of nodes and labels. This is used for things like the selection lasso.
	 */
	computeRelativeNodeAndLabelPositions() {
		this.nodeElements.each(function (d) {
			const node = d3.select(this).select("*:not(.onion-clone)").node()
			const boundingClientRect = node.getBoundingClientRect()
			d.relativeX = boundingClientRect.x
			d.relativeY = boundingClientRect.y
			d.relativeWidth = boundingClientRect.width
			d.relativeHeight = boundingClientRect.height
		})
		this.labels.each(function (d) {
			const group = d3.select(this)
			const direction = group.classed("to") ? "To" : "From"
			const rect = group.select("rect:not(.onion-clone)").node()
			const boundingClientRect = rect.getBoundingClientRect()
			d[`label${direction}RelativeX`] = d.relativeX = boundingClientRect.x
			d[`label${direction}RelativeY`] = d.relativeY = boundingClientRect.y
			d[`label${direction}RelativeWidth`] = d.relativeWidth = boundingClientRect.width
			d[`label${direction}RelativeHeight`] = d.relativeHeight = boundingClientRect.height
		})
	}

	/**
	 * Generates a graphical identifier for an edge. The graphical identifier is used to determine not just the unique edge, but also its DOM representation
	 * @param {VVEdge} edge
	 * @returns {string} - Graphical Identifier
	 */
	getEdgeGraphicalID(edge) {
		return (
			edge.id +
			(edge.type ? edge.type : "") +
			(edge.nameFrom ? edge.nameFrom : "") +
			(edge.nameTo ? edge.nameTo : "") +
			(edge.multiplicityFrom ? edge.multiplicityFrom : "") +
			(edge.multiplicityTo ? edge.multiplicityTo : "")
		)
	}

	/**
	 * Generates a graphical identifier for a node. The graphical identifier is used to determine not just the unique node, but also its DOM representation
	 * @param {VVNode} node
	 * @returns {string} - Graphical Identifier
	 */
	getNodeGraphicalID(node) {
		return node.id + (node.type ? node.type : "") + node.shape + node.hiddenEdgeCount + node.name
	}

	/**
	 * Updates all markers (arrows for edges)
	 * @param {object[]} edges - All edges
	 */
	updateMarkers(edges) {
		const defs = this.rootG.select("defs")
		defs.selectAll("marker").remove()
		const fragment = document.createDocumentFragment()
		edges.forEach(l => {
			fragment.appendChild(this.drawMarker(l, false))
			if (l.nameFrom || l.markerFrom) {
				fragment.appendChild(this.drawMarker(l, true))
			}
		})
		defs.node().appendChild(fragment)
	}

	/**
	 * Updates all edges in the DOM, including enter and exit operations.
	 * @param {object[]} edges - edges to be present in the DOM
	 */
	updateEdges(edges) {
		const selector = this.rootG
			.select("#edge-container")
			.selectAll(".edge")
			.data(edges, d => {
				return d.id
			})
		selector.exit().remove()
		selector
			.enter()
			.append("g")
			.attr("class", d => {
				return this.getMarkerId(d, true) + " " + this.getMarkerId(d, false)
			})
			.classed("edge", true)
			.append("path")
			.attr("class", d => {
				return `edge-path-${d.type ? d.type : "default"}`
			})
			.attr("marker-end", l => {
				return "url(#" + this.getMarkerId(l, false) + ")"
			})
			.attr("marker-start", l => {
				if (l.nameFrom || l.markerFrom) {
					return "url(#" + this.getMarkerId(l, true) + ")"
				}
				return ""
			})

		this.edgePath = this.rootG.select("#edge-container").selectAll(".edge path")
	}

	/**
	 * Updates all multiplicity counters on edges.
	 * @param {object[]} edges - List of all edges
	 */
	updateMultiplicityCounters(edges) {
		if (this.showMultiplicity) {
			const selector = this.rootG
				.select("#multiplicity-container")
				.selectAll(".multiplicity")
				.data(edges, d => {
					return d.id
				})
			selector.exit().remove()
			selector
				.enter()
				.append("g")
				.classed("multiplicity", true)
				.filter(l => {
					return l.multiplicityTo || l.multiplicityFrom
				})
				.each((d, i, c) => {
					if (d.multiplicityFrom) {
						this.drawMultiplicity(d3.select(c[i]), "from")
					}
					if (d.multiplicityTo) {
						this.drawMultiplicity(d3.select(c[i]), "to")
					}
				})
		} else {
			this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove()
		}
		this.activeMultiplicities = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").selectAll("g")
	}

	/**
	 * Updates all nodes in the DOM, including enter and exit operations.
	 * @param {object[]} nodes - List of all nodes
	 */
	updateNodes(nodes) {
		const fragment = document.createDocumentFragment()
		const selector = this.rootG
			.select("#node-container")
			.selectAll(".node")
			.data(nodes, d => {
				return d.id
			})
		selector.exit().remove()
		selector
			.enter()
			.append("g")
			.attr("class", "node")
			.call(
				d3
					.drag()
					.filter(() => !d3.event.button) //By default the filter will block the event if ctrl is down.
					.on("start", d => {
						if (
							this.isMultiSelecDragtModeEnabled &&
							this.selection &&
							this.selection.find(selection => selection.type === "node" && selection.id === d.id)
						) {
							this.dragSelection = this.nodes.filter(node => {
								return this.selection.find(selection => selection.type === "node" && selection.id === node.id)
							})
						} else {
							this.dragSelection = [d]
						}
						for (let i = 0; i < this.dragSelection.length; i++) {
							this.ee.trigger(EventEnum.NODE_DRAG_START, this.dragSelection[i])
							this.dragSelection[i].pin(this.dragSelection[i].x, this.dragSelection[i].y)
						}
						this.lastDragX = d3.event.x
						this.lastDragY = d3.event.y
					})
					.on("drag", () => {
						for (let i = 0; i < this.dragSelection.length; i++) {
							this.ee.trigger(EventEnum.NODE_DRAG_DRAGGED, this.dragSelection[i])
							const newX = this.dragSelection[i].fx + d3.event.x - this.lastDragX
							const newY = this.dragSelection[i].fy + d3.event.y - this.lastDragY
							this.dragSelection[i].pin(newX, newY)
						}
						this.lastDragX = d3.event.x
						this.lastDragY = d3.event.y
					})
					.on("end", d => {
						for (let i = 0; i < this.dragSelection.length; i++) {
							const node = this.dragSelection[i]
							if (!this.pinMode) {
								node.unPin()
							}
							this.rootG.select(`[id='pin-${node.id}']`).remove()
							this.drawPinBadgeForNode(node)
							this.ee.trigger(EventEnum.NODE_DRAG_ENDED, node)
						}
						this.dragSelection = []
						this.lastDragX = 0
						this.lastDragY = 0
						//While dragging the hover listeners have been shut off. Reset the selection if necessary.
						if (d !== this.hoveredEntity) {
							this.handleHoverEvent(d, "leave")
							if (this.hoveredEntity) {
								this.handleHoverEvent(this.hoveredEntity, "enter", this.hoveredDirection)
							}
						}
					})
			)
			.each((d, i, c) => {
				const element = d3.select(c[i])
				fragment.appendChild(c[i])
				element.node().appendChild(this.drawNode(element, d))
			})
		this.rootG.select("#node-container").node().appendChild(fragment)
		//Clear old badges
		this.clearAllFloatingNodeMetaData()
		//Draw counter badges for imploded edges
		nodes.forEach(node => this.drawCounterBadgeForNode(node))
		//Draw pin badge for fixated nodes
		nodes.forEach(node => this.drawPinBadgeForNode(node))
		this.nodeElements = this.rootG.select("#node-container").selectAll(".node")
	}

	/**
	 * Removes all floating meta data badges and pins
	 */
	clearAllFloatingNodeMetaData() {
		this.rootG.selectAll(".virrvarr-floating-node-meta").remove()
	}

	/**
	 * Evaluates if a node should have a pin badge, and if so draws it.
	 * Note that this function assumes that any previous pin has already been removed.
	 * @param {VVNode} node
	 */
	drawPinBadgeForNode(node) {
		if (node.fx && node.fy && !node.animating) {
			const element = this.rootG.select(`[id='${node.id}']`).select(function () {
				return this.parentNode
			})
			this.drawPin(element, node)
		}
	}

	/**
	 * Evaluates if a node should have a counter badge and if so draws it.
	 * Note that this function assumes that any previous badge has already been removed.
	 * @param {VVNode} node
	 */
	drawCounterBadgeForNode(node) {
		if (node.hiddenEdgeCount) {
			const element = this.rootG.select(`[id='${node.id}']`).select(function () {
				return this.parentNode
			})
			this.drawNodeCollapsedEdgeCounter(element, node)
		}
	}

	/**
	 * Updates all labels on edges.
	 * @param {object[]} edges - List of all edges
	 */
	updateLabels(edges) {
		const selector = this.rootG
			.select("#label-container")
			.selectAll(".label")
			.data(edges, d => {
				return d.id
			})
		selector.exit().remove()
		selector
			.enter()
			.append("g")
			.classed("label", true)
			/* Create labels, exclude edges without labels */
			.filter(d => {
				const needsLabel = d.nameTo || d.nameFrom
				return needsLabel
			})
			.each((d, i, c) => {
				if (d.nameFrom) {
					this.drawLabel(d3.select(c[i]), d, "from")
				}
				if (d.nameTo) {
					this.drawLabel(d3.select(c[i]), d, "to")
				}
			})
		this.labels = this.rootG.select("#label-container").selectAll(".label").selectAll("g")
	}

	/**
	 * Returns the distance (length) of the passed edge.
	 * @param {object} l - Edge object
	 */
	getEdgeDistance(l) {
		const targetRadius = l.target.radius !== undefined ? l.target.radius : 0
		const sourceRadius = l.source.radius !== undefined ? l.source.radius : 0
		const distance = targetRadius + sourceRadius
		return distance + l.edgeDistance
	}

	/**
	 * Retrieves marker ID.
	 * @param {object} l - Edge object
	 * @param {boolean} inverse - Is the edge inverse?
	 */
	getMarkerId(l, inverse) {
		return (l.type ? l.type : "normal") + l.id + (inverse ? "inverse" : "")
	}

	/**
	 * Draws a marker.
	 * @param {D3Selection} defs - Definitions selection by D3
	 * @param {object} edge - Edge object
	 * @param {boolean} inverse - Is the edge inverse?
	 */
	drawMarker(edge, inverse) {
		const marker = d3
			.select(document.createElementNS("http://www.w3.org/2000/svg", "marker"))
			.attr("id", this.getMarkerId(edge, inverse))
			.attr("viewBox", "0 -8 14 16")
			.attr("refX", inverse ? 0 : 12)
			.attr("refY", 0)
			.attr("markerWidth", this.markerSize)
			.attr("markerHeight", this.markerSize)
			.attr("markerUnits", "userSpaceOnUse")
			.attr("orient", "auto")
			.attr("class", (edge.type ? edge.type : "normal") + "Marker")
			.attr("class", "marker-" + (edge.type ? edge.type : "default"))
		const markerType = inverse ? edge.markerFrom : edge.markerTo
		if (markerType === "circle") {
			marker.append("circle").attr("r", 7).attr("fill", "black").attr("cx", 7)
			return marker.node()
		} else if (markerType === "hollowcircle") {
			marker.append("circle").attr("r", 7).attr("fill", "black").attr("cx", 7)
			marker.append("circle").attr("r", 4).attr("fill", "white").attr("cx", 7)
			return marker.node()
		}
		if (markerType === "hollowreversearrow") {
			marker
				.append("path")
				.attr("d", () => {
					return inverse ? "M12,0L1,-8L1,8Z" : "M12,-8L0,0L12,8Z"
				})
				.attr("style", "fill:white;stroke-width:2;stroke:black;")
			return marker.node()
		}
		marker.append("path").attr("d", () => {
			if (markerType === "diamond") {
				return "M0,0L6,6L12,0L6,-6Z"
			} else if (markerType === "square") {
				return "M12,-12L12,12L0,12L0,-12Z"
			} else if (markerType === "none") {
				return ""
			} else {
				//Arrow
				return inverse ? "M12,-8L0,0L12,8Z" : "M0,-8L12,0L0,8Z"
			}
		})
		return marker.node()
	}

	/**
	 * Draws a label to a edge in direction X.
	 * @param {D3Selection} edge - Edge HTMLElement selection by D3
	 * @param {object} data - Edge object
	 * @param {"to"|"from"} direction - Direction of the edge
	 */
	drawLabel(edge, data, direction) {
		const label = edge
			.append("g")
			.attr("id", "label" + data.id + direction)
			.classed(direction, true)

		this.drawLabelRect(label, data, direction)
		const labelText = label
			.append("text")
			.attr("class", () => {
				return `label-text-${data.type ? data.type : "default"}`
			})
			.attr("text-anchor", "middle")
		this.drawLabelText(labelText, data, direction)
	}

	/**
	 * Draws a rectangle as a label background.
	 * @param {D3Selection} label - D3 selection of the label parent HTMLElement
	 * @param {object} data - Edge object
	 * @param {"to"|"from"} direction - Direction of the edge
	 */
	drawLabelRect(label, data, direction) {
		const width = direction === "to" ? data.nameToWidth : data.nameFromWidth
		label
			.append("rect")
			.attr("class", () => {
				return `label-rect-${data.type ? data.type : "default"}`
			})
			.attr("x", -width / 2)
			.attr("y", -Env.LABEL_HEIGHT / 2)
			.attr("width", width)
			.attr("height", Env.LABEL_HEIGHT)
			.on("mouseenter", edgeData => {
				this.labelMouseEnter(edgeData, direction)
			})
			.on("mouseleave", edgeData => {
				this.labelMouseLeave(edgeData, direction)
			})
	}

	/**
	 * Draws a new <tspan> to a supplied label.
	 * @param {D3Selection} element - Label HTMLElement selection by D3
	 * @param {object} d - Edge object
	 * @param {"to"|"from"} direction - Direction of the edge
	 */
	drawLabelText(element, d, direction) {
		element.append("tspan").text(() => {
			const width = direction === "to" ? d.nameToWidth : d.nameFromWidth
			let value
			if (direction === "to") {
				value = d.nameTo
			} else if (direction === "from") {
				value = d.nameFrom
			} else {
				value = d.nameTo ? d.nameTo : d.nameFrom
			}
			return this.measurements.truncate(value.toString(), width)
		})
	}

	/**
	 * Highlights the marker and edge for the given label and direction.
	 * @param {object} edgeData - Edge object
	 * @param {"to"|"from"} direction - Direction of the edge
	 */
	labelMouseEnter(edgeData, direction) {
		const inverse = direction === "from"
		this.rootG
			.selectAll(`marker[id="${this.getMarkerId(edgeData, inverse)}"]`)
			.select("*")
			.classed("hovered", true)
		this.rootG
			.selectAll(`[class*="${this.getMarkerId(edgeData, inverse)}"]`)
			.selectAll("path, text")
			.classed("hovered", true)
		//Timeout the sorting to save CPU cycles, and stop a sorting from taking place if the mouse just passed by
		this.handleHoverEvent(edgeData, "enter", direction)
		setTimeout(() => {
			const marker = this.rootG.selectAll(`[class*="${this.getMarkerId(edgeData, inverse)}"]`).select("path, text")
			if (marker._groups[0].length > 0 && marker.classed("hovered")) {
				//Sort the labels which brings the hovered one to the foreground
				this.rootG.selectAll(".label").sort((a, b) => {
					if (a.id === edgeData.id && b.id !== edgeData.id) {
						return 1 // a is hovered
					} else if (a.id !== edgeData.id && b.id === edgeData.id) {
						return -1 // b is hovered
					} else {
						// workaround to make sorting in chrome for these elements stable
						return a.id - b.id
					}
				})
			}
		}, 250)
	}

	/**
	 * Removes highlighting of marker and edge for the given label and direction
	 * @param {object} edgeData - Edge object
	 * @param {"to"|"from"} direction - Direction of the edge
	 */
	labelMouseLeave(edgeData, direction) {
		this.handleHoverEvent(edgeData, "leave", direction)
		const inverse = direction === "from"
		this.rootG
			.selectAll(`marker[id="${this.getMarkerId(edgeData, inverse)}"]`)
			.select("*")
			.classed("hovered", false)
		this.rootG
			.selectAll(`[class*="${this.getMarkerId(edgeData, inverse)}"]`)
			.selectAll("path, text")
			.classed("hovered", false)
	}

	/**
	 * Draws multiplicity notation
	 * @param {object} edge - Edge object
	 * @param {"to"|"from"} direction - Direction of the edge
	 */
	drawMultiplicity(edge, direction) {
		const card = edge
			.append("g")
			.attr("class", l => {
				return this.getMarkerId(l, direction === "to")
			})
			.classed(direction, true)
		card.append("text")
			.attr("text-anchor", "middle")
			.text(d => {
				return direction === "to" ? d.multiplicityTo : d.multiplicityFrom
			})
	}

	/**
	 * Draws a node
	 * @param {D3Selection} element - D3 selection of the node html element.
	 * @param {object} data - Node object
	 */
	drawNode(element, data) {
		let measurementQuery = data.shape + (data.icon ? "icon" : "noicon") + "firstText"
		const contentGroupElementNode = document.createElementNS("http://www.w3.org/2000/svg", "g")
		const contentGroupElement = d3.select(contentGroupElementNode)
		let contentGroupOffsetX = 0
		let textOffsetY = 0
		let textAnchor = "middle"
		switch (data.shape) {
			case "circle":
				element
					.insert("circle", "g")
					.attr("r", d => d.radius)
					.attr("class", `node-${data.type ? data.type : "default"}`)
					.attr("id", data.id)
					.classed("main-shape", true)
				if (data.icon) {
					this.drawIcon(contentGroupElement, data.icon)
					textOffsetY = Env.DEFAULT_NODE_ICON_PADDING
				}
				break
			case "layeredCircle":
				element
					.insert("circle", "g")
					.attr("r", d => d.radius)
					.attr("style", "stroke-width:0;fill:#fff;pointer-events:none;")
					.attr("id", data.id)
					.attr("class", "layered-circle")
				element
					.insert("circle", "g")
					.attr("r", d => d.radius - 4)
					.attr("class", `node-${data.type ? data.type : "default"}`)
					.classed("main-shape", true)
				if (data.icon) {
					this.drawIcon(contentGroupElement, data.icon)
					textOffsetY = Env.DEFAULT_NODE_ICON_PADDING
				}
				break
			case "rectangle":
				element
					.insert("rect", "g")
					.attr("x", d => -d.width / 2)
					.attr("y", d => -d.height / 2)
					.attr("width", d => d.width)
					.attr("height", d => d.height)
					.attr("class", `node-${data.type ? data.type : "default"}`)
					.classed("main-shape", true)
					.attr("id", data.id)
				if (data.icon) {
					const icon = this.drawIcon(element, data.icon)
					icon.attr("y", -Env.DEFAULT_NODE_ICON_SIZE / 2)
					icon.attr("x", -data.width / 2 + Env.ADDITIONAL_TEXT_SPACE)
					contentGroupOffsetX += -data.width / 2 + Env.ADDITIONAL_TEXT_SPACE + Env.DEFAULT_NODE_ICON_SIZE + Env.DEFAULT_NODE_ICON_PADDING
					textAnchor = "start"
				}
				break
			default:
				console.error("NO SHAPE FOUND FOR NODE")
		}
		element
			.on("mouseenter", d => {
				this.handleHoverEvent(d, "enter")
			})
			.on("mouseleave", d => {
				this.handleHoverEvent(d, "leave")
			})
			.on("mousemove", d => {
				this.ee.trigger(EventEnum.MOUSE_OVER_NODE, d)
			})
			.on("mouseout", d => {
				this.ee.trigger(EventEnum.MOUSE_LEFT_NODE, d)
			})
		this.drawTextBlock(contentGroupElement, textAnchor)
		//Draw the text inside the block
		if (!this.enableMultiLineNodeLabels) {
			this.drawTextline(
				contentGroupElement.select("text"),
				this.measurements.truncate(data.name, data.maxTextWidth),
				data.type ? data.type : "default",
				this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height + textOffsetY
			)
		} else {
			const text = data.name
			let truncatedText = this.measurements.truncate(text, data.maxTextWidth)
			if (truncatedText.length < text.length && truncatedText.lastIndexOf(" ") > -1) {
				truncatedText = truncatedText.substring(0, truncatedText.lastIndexOf(" "))
				let otherStringTruncated = this.measurements.truncate(text.substring(truncatedText.length + 1), data.maxTextWidth)
				if (otherStringTruncated.length + truncatedText.length + 1 < text.length) {
					otherStringTruncated = otherStringTruncated.substring(0, otherStringTruncated.length - 3) + "..."
				}
				this.drawTextline(
					contentGroupElement.select("text"),
					truncatedText,
					data.type ? data.type : "default",
					this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height + textOffsetY
				)
				measurementQuery = measurementQuery + "secondText"
				this.drawTextline(
					contentGroupElement.select("text"),
					otherStringTruncated,
					data.type ? data.type : "default",
					this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height
				)
			} else {
				if (truncatedText.length < text.length) {
					truncatedText = truncatedText.substring(0, truncatedText.length - 3) + "..."
				}
				this.drawTextline(
					contentGroupElement.select("text"),
					truncatedText,
					data.type ? data.type : "default",
					this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height + textOffsetY
				)
			}
		}
		measurementQuery = measurementQuery + "finalized"
		const finalBBox = this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery)
		contentGroupElement.attr("transform", `translate(${contentGroupOffsetX}, ${-finalBBox.height / 2 - finalBBox.y})`)
		return contentGroupElementNode
	}

	/**
	 * Draws an <image> block to a given element with an icon in it
	 * @param {D3Selection} element - The element that the text block should be written to
	 * @param {string} icon - The source icon
	 */
	drawIcon(element, icon) {
		return element
			.append("image")
			.attr("href", icon)
			.attr("width", Env.DEFAULT_NODE_ICON_SIZE)
			.attr("height", Env.DEFAULT_NODE_ICON_SIZE)
			.attr("x", -Env.DEFAULT_NODE_ICON_SIZE / 2)
			.attr("style", "pointer-events: none;")
	}

	/**
	 * Draws a <text> block to a given element
	 * @param {D3Selection} element - The element that the text block should be written to
	 */
	drawTextBlock(element, anchor) {
		element.append("text").attr("text-anchor", anchor ? anchor : "middle")
	}

	/**
	 * Draws a new line of text to a given element.
	 * @param {D3Selection} element - D3 Selection of the element that the text should be drawn in.
	 * @param {*} word - Text to be written
	 * @param {*} type - Type of node
	 * @param {*} y - Y position padding
	 */
	drawTextline(element, word, type, y) {
		element.append("tspan").attr("class", `node-text-${type}`).attr("x", 0).attr("y", y).text(word)
	}

	/**
	 * Draws a badge in the bottom right corner of nodes with a number of a hidden edge count in it.
	 * @param {D3Selecton} element - Node element selection by D3
	 * @param {Object} data - Node data
	 */
	drawNodeCollapsedEdgeCounter(element, data) {
		const count = `${data.hiddenEdgeCount}`
		const textWidth = this.measurements.getTextWidth(count)
		const fontSize = 14
		const areaHeight = data.radius ? data.radius * 2 : data.height
		const areaWidth = data.radius ? data.radius * 2 : data.width
		const paddingX = 16
		const paddingY = 16
		const translateY = areaHeight / 2 //(make this number negative to switch between top and bottom quadrant)
		const translateX = areaWidth / 2
		const rectHeight = fontSize + paddingY
		const rectWidth = textWidth + paddingX
		const rightTopRoundedRect = (x, y, width, height, radius) => {
			return `M${x},${y}
				h${width - radius}
				q${radius},0 ${radius},${radius}
				v${height - 2 * radius}
				q0,${radius} ${-radius},${radius}
				h${radius * 2 - width}
				q${-radius},0 ${-radius},${-radius}
				z`
		}
		element
			.append("g")
			.attr("id", "badge-" + data.id + "-hidden-edge-counter")
			.attr("class", "virrvarr-floating-node-meta")
			.attr("style", "pointer-events:none;")
			.attr("transform", `translate(${translateX} ${translateY})`)
			.append("path")
			.attr("d", rightTopRoundedRect(-(rectWidth / 2), -(rectHeight / 2), rectWidth, rectHeight, 10))
			.attr("class", "virrvarr-node-badge")
			.select(function () {
				return this.parentNode
			})
			.append("text")
			.attr("class", "virrvarr-node-edge-counter-badge-text")
			.append("tspan")
			.attr("style", `font-size:${fontSize};`)
			.text(`${count}`)
	}

	/**
	 * Draws a pin in the top right corner of a node.
	 * @param {D3Selecton} element - Node element selection by D3
	 * @param {Object} data - Node data
	 */
	drawPin(element, data) {
		const areaHeight = data.radius ? data.radius * 2 : data.height
		const areaWidth = data.radius ? data.radius * 2 : data.width
		const translateY = -(areaHeight / 2)
		const translateX = areaWidth / 2
		const rectHeight = 25
		const rectWidth = 25
		const rightBottomRoundedRect = (x, y, width, height, radius) => {
			return `M${radius},${y}
				h${width - radius * 2}
				q${radius},0 ${radius},${radius}
				v${height - 2 * radius}
				q0,${radius} ${-radius},${radius}
				h${-width + radius}
				v${-height + radius}
				q0,${-radius} ${radius},${-radius}
				z`
		}
		element
			.append("g")
			.attr("id", "pin-" + data.id)
			.attr("class", "virrvarr-floating-node-meta")
			.attr("style", "pointer-events:none;")
			.attr("transform", `translate(${translateX - rectWidth / 2} ${translateY})`)
			.append("path")
			.attr("d", rightBottomRoundedRect(-(rectWidth / 2), -(rectHeight / 2), rectWidth, rectHeight, 10))
			.attr("class", "virrvarr-node-badge")
			.select(function () {
				return this.parentNode
			})
			.append("path")
			.attr(
				"d",
				"M24.715,261.811c-5.492,0-10.645-2.133-14.521-6.01c-8.011-8.017-8.011-21.054-0.006-29.064    l70.375-70.372L38.51,113.785c-7.073-7.179-7.928-18.303-2.039-26.466c0.855-1.184,21.314-28.839,58.964-28.839    c2.224,0,4.492,0.101,6.756,0.295L180.62,3.597c8.103-5.729,20.081-4.48,26.863,2.796l44.675,48.037    c6.919,7.436,7.319,19.006,0.926,26.906l-55.882,69.151c1.979,23.759,1.052,63.069-23.901,77.725    c-7.959,4.666-18.578,3.26-25.021-3.282l-38.837-39.316l-70.206,70.183C35.365,259.678,30.208,261.811,24.715,261.811z"
			)
			.attr("style", "fill:#ffffff;transform: scale(0.05) translate(120px, -130px);stroke:#ffffff;")
	}

	/**
	 * Creates event listener for onClick events for nodes and edges
	 */
	attachEntityClickListeners() {
		//We need to stop the click event if it is a double click event
		//We do this using a timeout that starts on click and cancels on double click.
		let timeout = null
		this.rootG
			.selectAll(".node")
			.on("click", d => {
				d3.event.stopPropagation()
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					this.ee.trigger(EventEnum.CLICK_ENTITY, {
						id: d.id,
						data: d.data
					})
				}, Env.DOUBLE_CLICK_THRESHOLD)
			})
			.on("dblclick", d => {
				d3.event.stopPropagation()
				clearTimeout(timeout)
				this.ee.trigger(EventEnum.DBL_CLICK_ENTITY, {
					id: d.id,
					data: d.data
				})
			})
			.on("contextmenu", d => {
				d3.event.preventDefault()
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, d)
			})
		this.rootG
			.selectAll(".label .from")
			.on("click", d => {
				d3.event.stopPropagation()
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					this.ee.trigger(EventEnum.CLICK_ENTITY, {
						id: d.id,
						data: d.data,
						direction: "from"
					})
				}, Env.DOUBLE_CLICK_THRESHOLD)
			})
			.on("dblclick", d => {
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.DBL_CLICK_ENTITY, {
					id: d.id,
					data: d.data,
					direction: "from"
				})
			})
			.on("contextmenu", d => {
				d3.event.preventDefault()
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, d, "from")
			})
		this.rootG
			.selectAll(".label .to")
			.on("click", d => {
				d3.event.stopPropagation()
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					this.ee.trigger(EventEnum.CLICK_ENTITY, {
						id: d.id,
						data: d.data,
						direction: "to"
					})
				}, Env.DOUBLE_CLICK_THRESHOLD)
			})
			.on("dblclick", d => {
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.DBL_CLICK_ENTITY, {
					id: d.id,
					data: d.data,
					direction: "to"
				})
			})
			.on("contextmenu", d => {
				d3.event.preventDefault()
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, d, "to")
			})
	}

	/**
	 * Handles what happens when an item is hovered
	 * @param {object} hoveredData - Object that has been hovered
	 * @param {"enter"|"leave"} eventType - What type of event it is.
	 * @param {"to"|"from"} direction? - If an edge is hovered then this will show the potential direction.
	 */
	handleHoverEvent(hoveredData, eventType, direction = undefined) {
		this.hoveredEntity = eventType === "enter" ? hoveredData : null
		this.hoveredDirection = eventType === "enter" ? direction : null
		if (this.dragSelection.length > 0) {
			//Do not do anything if a node is being dragged
			return
		}
		this.ee.trigger(EventEnum.HOVER_ENTITY, {
			eventType,
			id: hoveredData.id,
			data: hoveredData.data,
			direction
		})
		if (this.enableFadeOnHover) {
			if (!hoveredData.sourceNode) {
				const filteredEdges = this.edges.filter(edge => {
					return edge.sourceNode === hoveredData.id || edge.targetNode === hoveredData.id
				})
				const validNodes = filteredEdges.reduce((acc, edge) => {
					acc.push(edge.targetNode)
					acc.push(edge.sourceNode)
					return acc
				}, [])
				validNodes.push(hoveredData.id)
				const opacity = eventType === "enter" ? "" + Env.DEFAULT_FADE_OPACITY : "" + 1
				this.rootG
					.selectAll(".node")
					.filter(d => {
						return validNodes.find(node => node === d.id) === undefined
					})
					.transition()
					.duration(Env.FADE_TIME)
					.ease(d3.easeLinear)
					.style("opacity", opacity)
				this.rootG
					.selectAll(".edge")
					.filter(d => {
						return filteredEdges.find(edge => edge.id === d.id) === undefined
					})
					.transition()
					.duration(Env.FADE_TIME)
					.ease(d3.easeLinear)
					.style("opacity", opacity)
				this.rootG
					.selectAll(".label")
					.filter(d => {
						return filteredEdges.find(edge => edge.id === d.id) === undefined
					})
					.transition()
					.duration(Env.FADE_TIME)
					.ease(d3.easeLinear)
					.style("opacity", opacity)
			}
		}
	}

	/**
	 * Animation tick
	 */
	tick() {
		//Nodes
		this.nodeElements.attr("transform", node => {
			return "translate(" + node.x + "," + node.y + ")"
		})
		//Edges
		this.edgePath.attr("d", l => {
			if (l.source.x === l.target.x && l.source.y === l.target.y && l.source.id !== l.target.id) {
				//The two nodes are at the exact same position
				return ""
			}
			if (l.source === l.target) {
				return MathUtil.calculateSelfEdgePath(l)
			}
			if (this.rotateLabels) {
				l.angle = MathUtil.calculateLabelAngle(l.source, l.target)
			} else {
				l.angle = 0
			}
			const lineTypeToUse = l.lineType ? l.lineType : this.lineType
			//Calculate curve point (this will also be used later for multiplicity and label positioning)
			let pathStart
			let pathEnd
			if (!lineTypeToUse.startsWith("arc")) {
				pathStart = MathUtil.calculateIntersection(l.target, l.source, 1)
				pathEnd = MathUtil.calculateIntersection(l.source, l.target, 1)
			}
			//Arc lines
			if (lineTypeToUse === "arctop" || lineTypeToUse === "arcright" || lineTypeToUse === "arcbottom" || lineTypeToUse === "arcleft") {
				let edgeStartX
				let edgeStartY
				let edgeEndX
				let edgeEndY
				let flip
				if (lineTypeToUse === "arctop") {
					edgeStartX = l.source.x
					edgeEndX = l.target.x
					edgeStartY = l.source.y - (l.source.radius ? l.source.radius : l.source.height / 2)
					edgeEndY = l.target.y - (l.target.radius ? l.target.radius : l.target.height / 2)
					flip = edgeEndX > edgeStartX ? 1 : 0
					const midpointX = edgeStartX + (edgeEndX - edgeStartX) / 2
					const yCurvePoint = edgeStartY - Math.abs((edgeEndX - edgeStartX) / 2)
					l.curvePoint = { x: midpointX, y: yCurvePoint }
				} else if (lineTypeToUse === "arcright") {
					edgeStartX = l.source.x + (l.source.radius ? l.source.radius : l.source.width / 2)
					edgeStartY = l.source.y
					edgeEndX = l.target.x + (l.target.radius ? l.target.radius : l.target.width / 2)
					edgeEndY = l.target.y
					flip = edgeEndY > edgeStartY ? 1 : 0
					const midpointX = edgeStartX + Math.abs((edgeEndY - edgeStartY) / 2)
					const yCurvePoint = edgeStartY + (edgeEndY - edgeStartY) / 2
					l.curvePoint = { x: midpointX, y: yCurvePoint }
				} else if (lineTypeToUse === "arcbottom") {
					edgeStartX = l.source.x
					edgeEndX = l.target.x
					edgeStartY = l.source.y + (l.source.radius ? l.source.radius : l.source.height / 2)
					edgeEndY = l.target.y + (l.target.radius ? l.target.radius : l.target.height / 2)
					flip = edgeEndX < edgeStartX ? 1 : 0
					const midpointX = edgeStartX + (edgeEndX - edgeStartX) / 2
					const yCurvePoint = edgeStartY + Math.abs((edgeEndX - edgeStartX) / 2)
					l.curvePoint = { x: midpointX, y: yCurvePoint }
				} else if (lineTypeToUse === "arcleft") {
					edgeStartX = l.source.x - (l.source.radius ? l.source.radius : l.source.width / 2)
					edgeStartY = l.source.y
					edgeEndX = l.target.x - (l.target.radius ? l.target.radius : l.target.width / 2)
					edgeEndY = l.target.y
					flip = edgeEndY < edgeStartY ? 1 : 0
					const midpointX = edgeStartX - Math.abs((edgeEndY - edgeStartY) / 2)
					const yCurvePoint = edgeStartY + (edgeEndY - edgeStartY) / 2
					l.curvePoint = { x: midpointX, y: yCurvePoint }
				}
				return `M ${edgeStartX}, ${edgeStartY}
				A ${(edgeStartY - edgeEndY) / 2},
				${(edgeStartY - edgeEndY) / 2} 0 0, ${flip}
				${edgeEndX}, ${edgeEndY}`
			}
			//Taxi lines
			if ((lineTypeToUse === "taxi" && l.multiEdgeCount === 1) || lineTypeToUse === "fulltaxi") {
				let midPointY = pathStart.y + (pathEnd.y - pathStart.y) / 2
				//Fulltaxi means we apply the taxi lines to the multi edge edges as well
				if (lineTypeToUse === "fulltaxi" && l.multiEdgeCount > 1) {
					const dividedDistance = (pathEnd.y - pathStart.y) / l.multiEdgeCount
					midPointY = pathStart.y + dividedDistance * l.multiEdgeIndex + dividedDistance / 2
					l.curvePoint = {
						x: pathStart.x + (pathEnd.x - pathStart.x) / 2,
						y: midPointY
					}
				} else {
					l.curvePoint = MathUtil.calculateCurvePoint(pathStart, pathEnd, l)
				}
				return `M${pathStart.x},${pathStart.y} 
					L${pathStart.x},${midPointY} 
					L${pathEnd.x},${midPointY} 
					${pathEnd.x},${pathEnd.y}`
			}
			//Cubic bezier curve
			if (lineTypeToUse === "cubicbezier" && l.multiEdgeCount === 1) {
				l.curvePoint = MathUtil.calculateCurvePoint(pathStart, pathEnd, l)
				return `M${pathStart.x}, ${pathStart.y} 
					C${(pathStart.x + pathEnd.x) / 2}, ${pathStart.y} 
					${(pathStart.x + pathEnd.x) / 2}, ${pathEnd.y} 
					${pathEnd.x}, ${pathEnd.y}`
			}
			//Straight line
			else {
				l.curvePoint = MathUtil.calculateCurvePoint(pathStart, pathEnd, l)
				return MathUtil.curveFunction([
					MathUtil.calculateIntersection(l.curvePoint, l.source, 1),
					l.curvePoint,
					MathUtil.calculateIntersection(l.curvePoint, l.target, 1)
				])
			}
		})
		//Multiplicities
		this.activeMultiplicities.attr("transform", function (l) {
			const group = d3.select(this)
			let pos
			if (group.classed("to")) {
				pos = MathUtil.calculateIntersection(l.curvePoint, l.target, Env.MULTIPLICITY_HDISTANCE)
			} else {
				pos = MathUtil.calculateIntersection(l.curvePoint, l.source, Env.MULTIPLICITY_HDISTANCE)
			}
			const n = MathUtil.calculateNormalizedVector(l.curvePoint, l.source, Env.MULTIPLICITY_VDISTANCE)
			if (l.source.index < l.target.index) {
				n.x = -n.x
				n.y = -n.y
			}
			return "translate(" + (pos.x + n.x) + "," + (pos.y + n.y) + ")"
		})
		//Labels
		this.labels.attr("transform", function (l) {
			if (l.source.x === l.target.x && l.source.y === l.target.y && l.source.id !== l.target.id) {
				return ""
			}
			const group = d3.select(this)
			const midX = l.curvePoint.x
			let midY = l.curvePoint.y
			if (l.nameFrom) {
				if (group.classed("to")) {
					midY += Env.LABEL_HEIGHT / 2 + 1
				} else if (group.classed("from")) {
					midY -= Env.LABEL_HEIGHT / 2 + 1
				}
			}
			if (l.angle) {
				return "translate(" + midX + "," + midY + ") rotate(" + l.angle + ")"
			} else {
				return "translate(" + midX + "," + midY + ")"
			}
		})
	}
}
