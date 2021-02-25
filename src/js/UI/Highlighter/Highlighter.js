import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"
import CssUtils from "../../Utils/CssUtils"

/**
 * The Highlighter class handles highlighting of nodes in the graph.
 * This includes both highlighting on selections as well as highlighting on search.
 */
export default class Highlighter {
	/**
	 * @param {HTMLElement} graphContainerElement
	 * @param {EventEmitter} eventEmitter
	 * @param {object} userDefinedOptions
	 */
	constructor(graphContainerElement, eventEmitter, userDefinedOptions) {
		this.graphContainerElement = graphContainerElement
		this.ee = eventEmitter
		this.currentSelection = [] //This speeds things up, since we don't need to reevaluate on every selection
		this.isLassoActive = false
		this.ee.on(EventEnum.HIGHLIGHT_NODE_REQUESTED, nodes => {
			this.highlightNode(nodes.map(node => node.id))
		})
		this.ee.on(EventEnum.DISABLE_NODES_REQUESTED, nodeIDs => {
			this.disableNodes(nodeIDs)
		})
		this.ee.on(EventEnum.CLEAR_DISABLE_NODES_REQUESTED, () => {
			this.clearDisabled()
		})
		this.ee.on(EventEnum.SELECTION_UPDATED, newSelection => this.handleEntitySelection(newSelection))
		this.ee.on(EventEnum.LASSO_MODE_TOGGLED, isEnabled => (this.isLassoActive = isEnabled))
		this.ee.on(EventEnum.HOVER_ENTITY, data => {
			if (this.enableOnionOnHover) {
				const nodeElementNode = d3.select(this.graphContainerElement).select(`[id='${data.id}']`)
				//If an edge label has been hovered then it then we have to dig a bit more:
				const nodeElementLabel = d3
					.select(this.graphContainerElement)
					.select(`[id='label${data.id}${data.direction}']`)
					.select("rect:not(.removing):not(.onion-clone)[class*='label-rect']")
				const nodeElement = nodeElementNode.node() ? nodeElementNode : nodeElementLabel.node() ? nodeElementLabel : null
				if (nodeElement) {
					const DOMElement = nodeElement.node()
					if (!(this.enableOnionOnFocus && DOMElement.classList.contains("focused"))) {
						this.toggleOnionBorder(DOMElement, this.onionLayerSize, this.onionBaseColor, this.onionNumberOfLayers)
					}
				}
			}
		})

		this.enableOnionOnFocus = typeof userDefinedOptions.enableOnionOnFocus === "boolean" ? userDefinedOptions.enableOnionOnFocus : Env.ENABLE_ONION_ON_FOCUS
		this.enableOnionOnHover = typeof userDefinedOptions.enableOnionOnHover === "boolean" ? userDefinedOptions.enableOnionOnHover : Env.ENABLE_ONION_ON_HOVER
		this.onionNumberOfLayers = userDefinedOptions.onionNumberOfLayers ? userDefinedOptions.onionNumberOfLayers : Env.DEFAULT_ONION_LAYERS
		this.onionBaseColor = userDefinedOptions.onionBaseColor ? userDefinedOptions.onionBaseColor : Env.DEFAULT_ONION_COLOR
		this.onionLayerSize = userDefinedOptions.onionLayerSize ? userDefinedOptions.onionLayerSize : Env.DEFAULT_ONION_SIZE
		this.writeHighlightFilters()
	}

	/**
	 * Adds default filter definitions for node
	 */
	writeHighlightFilters() {
		const shadowFilter = (id, deviation, opacity) => {
			d3.select(this.graphContainerElement)
				.select("defs")
				.append("filter")
				.attr("id", id)
				.append("feDropShadow")
				.attr("dx", "0")
				.attr("dy", "0")
				.attr("stdDeviation", deviation)
				.attr("flood-opacity", opacity)
		}
		shadowFilter("shadow-filter", 3, 0.5)
		shadowFilter("shadow-dark-filter", 5, 0.5)
	}

	/**
	 * Handles reflecting selection changes in the DOM
	 * @param {Selection[]} selection - A list of selected nodes and edges.
	 */
	handleEntitySelection(selection) {
		if (selection.length === 0) {
			this.removeAllEntityFocus()
			this.currentSelection = []
			return
		}
		const entitiesToToggle = selection
			.filter(
				outer =>
					!this.currentSelection.find(
						inner => `${outer.id}${outer.direction ? outer.direction : ""}` === `${inner.id}${inner.direction ? inner.direction : ""}`
					)
			)
			.concat(
				this.currentSelection.filter(
					outer =>
						!selection.find(
							inner => `${outer.id}${outer.direction ? outer.direction : ""}` === `${inner.id}${inner.direction ? inner.direction : ""}`
						)
				)
			)
		if (entitiesToToggle.length > 0) {
			entitiesToToggle.forEach(entity => {
				entity.type === "node" && this.setElementFocus(entity.id)
				entity.type === "edge" && this.setElementFocus(entity.id, entity.direction)
			})
			this.currentSelection = selection
		}
	}

	/**
	 * This function sets the focus on a given entity
	 * @param {string} entityID - ID of the entity to be focused
	 * @param {boolean?} isFromDirection - Is the edge in the from direction? If applicable
	 */
	setElementFocus(entityID, isFromDirection = undefined) {
		if (entityID) {
			let isFrom
			if (isFromDirection === "from") {
				isFrom = true
			} else if (isFromDirection === "to") {
				isFrom = false
			}
			this.toggleEntityFocusByID(entityID, isFrom)
		}
	}

	/**
	 * Removes focus from all nodes and edges
	 */
	removeAllEntityFocus() {
		const selector = d3.select(this.graphContainerElement).selectAll(".focused").classed("focused", false)
		if (this.enableOnionOnFocus) {
			selector
				.select(function () {
					return this.parentNode
				})
				.selectAll(".onion-clone")
				.attr("class", "removing")
				.transition()
				.duration(Env.DEFAULT_ONION_ANIMATION_TIME)
				.style("transform", "scale(0.8)")
				.remove()
		}
	}

	/**
	 * Toggles the highlighting of a given node
	 * @param {string} entityID - ID of the entity to toggle
	 * @param {boolean?} isFrom - Is the edge in the from direction? If applicable
	 */
	toggleEntityFocusByID(entityID, isFrom = undefined) {
		return this.toggleNodeEntityFocus(entityID) || this.toggleEdgeEntityFocus(entityID, isFrom)
	}

	/**
	 * Toggles focus on nodes
	 * @param {string} entityID - ID of the node to toggle focus for
	 */
	toggleNodeEntityFocus(entityID) {
		const nodeElement = d3.select(this.graphContainerElement).select(`[id='${entityID}']`) //html4 support
		if (nodeElement.node()) {
			let DOMElement = nodeElement.node()
			const DOMNeighborhood = DOMElement.parentElement.children
			d3.selectAll([...DOMNeighborhood]).classed("focused", !nodeElement.classed("focused"))
			if (!DOMElement.matches(".main-shape")) {
				DOMElement = [...DOMNeighborhood].find(element => element.matches(".main-shape"))
			}
			if (this.enableOnionOnFocus && !(this.enableOnionOnHover && DOMElement.matches(":hover"))) {
				this.toggleOnionBorder(DOMElement, this.onionLayerSize, this.onionBaseColor, this.onionNumberOfLayers)
			}
			return true
		}
		return false
	}

	/**
	 * Toggles focus on edges
	 * @param {string} entityID - ID of the entity to toggle
	 * @param {boolean} isFrom - Is the edge in the from direction?
	 */
	toggleEdgeEntityFocus(entityID, isFrom) {
		const labelGroup = d3.select(this.graphContainerElement).select(`#label${entityID}${isFrom ? "from" : "to"}`)
		if (labelGroup) {
			const label = labelGroup.select("rect:not(.removing)[class*='label-rect']")
			const focusedState = label.classed("focused")
			label.classed("focused", !focusedState)
			if (this.enableOnionOnFocus && !(this.enableOnionOnHover && label.node().matches(":hover"))) {
				this.toggleOnionBorder(label.node(), this.onionLayerSize, this.onionBaseColor, this.onionNumberOfLayers)
			}
			d3.select(this.graphContainerElement)
				.selectAll(`marker[id$="${entityID}${isFrom ? "inverse" : ""}"]`)
				.select("path")
				.classed("focused", !focusedState)

			d3.select(this.graphContainerElement)
				.selectAll(`[class*="${entityID}${isFrom ? "inverse " : " "}"]`)
				.selectAll("path, text")
				.classed("focused", !focusedState)
			return true
		}
		return false
	}

	/**
	 * Creates an onion border around a given svg node by cloning it a given amount of times
	 * @param {HTMLElement} DOMElement - Element to add the border to
	 * @param {number} size - Size of the onion layers
	 * @param {string} color - Base color of the layers
	 * @param {number} layers - number of layers
	 * @param {boolean} wasTurnedOn - Returns true if the onion border was toggled on, and false if it was toggled off
	 */
	toggleOnionBorder(DOMElement, size, color, layers = 2) {
		const DOMNeighborhood = DOMElement.parentElement.children
		let found = false
		Array.from(DOMNeighborhood).forEach(node => {
			if (node.classList.contains("onion-clone")) {
				found = true
				if (!this.isLassoActive) {
					//Becomes really heavy for Chrome
					d3.select(node).attr("class", null).transition().duration(Env.DEFAULT_ONION_ANIMATION_TIME).style("transform", "scale(0.8)").remove()
				} else {
					d3.select(node).attr("class", null).remove()
				}
			}
		})
		if (!found) {
			let previousNode = DOMElement
			let offset = 0
			if (getComputedStyle(DOMElement).strokeWidth && getComputedStyle(DOMElement).stroke !== "rgba(0, 0, 0, 0)") {
				offset += parseInt(getComputedStyle(DOMElement).strokeWidth.substring(0, getComputedStyle(DOMElement).strokeWidth.length - 2)) / 2
			}
			for (let i = 1; i < layers + 1; i++) {
				const clone = DOMElement.cloneNode()
				clone.removeAttribute("class")
				clone.removeAttribute("id")
				clone.removeAttribute("style")
				if (DOMElement.hasAttribute("r")) {
					clone.setAttribute("r", parseInt(DOMElement.getAttribute("r")) + i * size + offset)
				}
				if (DOMElement.hasAttribute("width")) {
					clone.setAttribute("width", parseInt(DOMElement.getAttribute("width")) + i * (size * 2) + offset)
					clone.setAttribute("height", parseInt(DOMElement.getAttribute("height")) + i * (size * 2) + offset)
					clone.setAttribute("x", parseInt(DOMElement.getAttribute("x")) - i * size - offset / 2)
					clone.setAttribute("y", parseInt(DOMElement.getAttribute("y")) - i * size - offset / 2)
					if (getComputedStyle(DOMElement).rx) {
						clone.style.rx = parseInt(getComputedStyle(DOMElement).rx.substring(0, getComputedStyle(DOMElement).rx.length - 2)) * (i + 1) + "px"
					}
					if (getComputedStyle(DOMElement).ry) {
						clone.style.ry = parseInt(getComputedStyle(DOMElement).ry.substring(0, getComputedStyle(DOMElement).ry.length - 2)) * (i + 1) + "px"
					}
				}
				clone.style.pointerEvents = "none"
				clone.style.fill = color
				clone.setAttribute("opacity", 0.5 / i)
				clone.classList.add("onion-clone")
				DOMElement.parentElement.insertBefore(clone, previousNode)
				if (!this.isLassoActive) {
					//Becomes really heavy for Chrome
					CssUtils.tween(
						clone,
						"transform",
						DOMElement.getBoundingClientRect().width / clone.getBoundingClientRect().width,
						1,
						Date.now(),
						Env.DEFAULT_ONION_ANIMATION_TIME * i,
						newValue => `scale(${newValue})`
					)
				}
				previousNode = clone
			}
			return true
		}
		return false
	}

	/**
	 * Highlights multiple nodes with an expanding circle that disappears after a given time frame.
	 * @param {string[]} nodes - Array of node IDs to highlight
	 */
	highlightNode(nodes) {
		d3.select(this.graphContainerElement)
			.selectAll(".node")
			.filter(d => {
				return nodes.includes(d.id)
			})
			.append("circle")
			.attr("r", 50)
			.classed("highlighted-node", true)
			.transition()
			.duration(Env.HIGHLIGHT_TIME)
			.ease(d3.easeBounce)
			.style("transform", "scale(5)")
			.transition()
			.duration(Env.HIGHLIGHT_TIME_REMOVE)
			.remove()
	}

	/**
	 * Disables (dims) nodes and their connected edges.
	 * @param {string[]} nodes - Array of node IDs to fade
	 */
	disableNodes(nodeIDsToDisable) {
		d3.select(this.graphContainerElement)
			.selectAll(".node")
			.filter(d => {
				return nodeIDsToDisable.includes(d.id)
			})
			.classed("disabled", true)
		d3.select(this.graphContainerElement)
			.selectAll(".edge")
			.filter(d => {
				return nodeIDsToDisable.includes(d.sourceNode) || nodeIDsToDisable.includes(d.targetNode)
			})
			.classed("disabled", true)
		d3.select(this.graphContainerElement)
			.selectAll(".label")
			.filter(d => {
				return nodeIDsToDisable.includes(d.sourceNode) || nodeIDsToDisable.includes(d.targetNode)
			})
			.classed("disabled", true)
	}

	/**
	 * Clears all disabling for nodes and connected edges set by "disableNodes".
	 * @param {string[]} nodes - Array of node IDs to fade
	 */
	clearDisabled() {
		d3.select(this.graphContainerElement).selectAll(".disabled").classed("disabled", false)
	}
}
