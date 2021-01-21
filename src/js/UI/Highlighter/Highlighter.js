import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"
import CssUtils from "../../Utils/CssUtils"

/**
 * The Highlighter class handles highlighting of nodes in the graph.
 * This includes both highlighting on selections as well as highlighting on search.
 */
export default class Highlighter {
	constructor(eventEmitter, userDefinedOptions) {
		this.ee = eventEmitter
		this.ee.on(EventEnum.CLICK_ENTITY, data => {
			data && this.setElementFocus(data.id, data.direction)
		})
		this.ee.on(EventEnum.CLICK_ENTITY, data => {
			data || this.removeAllEntityFocus()
		})
		this.ee.on(EventEnum.HIGHLIGHT_NODE_REQUESTED, nodes => {
			this.highlightNode(nodes.map(node => node.id))
		})
		this.ee.on(EventEnum.FADE_NODE_REQUESTED, nodeIDs => {
			this.fadeNodes(nodeIDs)
		})
		this.ee.on(EventEnum.CLEAR_FADE_NODE_REQUESTED, () => {
			this.clearFade()
		})
		this.enableOnionOnFocus = typeof userDefinedOptions.enableOnionOnFocus === "boolean" ? userDefinedOptions.enableOnionOnFocus : Env.ENABLE_ONION_ON_FOCUS
		this.focusedOnionNumberOfLayers = userDefinedOptions.focusedOnionNumberOfLayers ? userDefinedOptions.focusedOnionNumberOfLayers : Env.DEFAULT_ONION_FOCUSED_LAYERS
		this.focusedOnionBaseColor = userDefinedOptions.focusedOnionBaseColor ? userDefinedOptions.focusedOnionBaseColor : Env.DEFAULT_ONION_FOCUSED_COLOR
		this.focusedOnionLayerSize = userDefinedOptions.focusedOnionLayerSize ? userDefinedOptions.focusedOnionLayerSize : Env.DEFAULT_ONION_FOCUSED_SIZE
	}

	/**
	 * This function sets the exclusive focus on a given entity
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
			this.removeAllEntityFocus()
			this.toggleEntityFocusByID(entityID, isFrom)
		}
	}

	/**
	 * Removes focus from all nodes and edges
	 */
	removeAllEntityFocus() {
		d3.selectAll(".focused").classed("focused", false)
		if (this.enableOnionOnFocus) {
			d3.selectAll(".onion-clone")
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
		const nodeElement = d3.select(`[id='${entityID}']`) //html4 support
		if (nodeElement.node()) {
			const DOMElement = nodeElement.node()
			const DOMNeighborhood = DOMElement.parentElement.children
			d3.selectAll([...DOMNeighborhood]).classed("focused", !nodeElement.classed("focused"))
			if (this.enableOnionOnFocus) {
				this.toggleOnionBorder(DOMElement, this.focusedOnionLayerSize, this.focusedOnionBaseColor, this.focusedOnionNumberOfLayers)
			}
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
	 * 
	 * @param {boolean} wasTurnedOn - Returns true if the onion border was toggled on, and false if it was toggled off
	 */
	toggleOnionBorder(DOMElement, size, color, layers = 2) {
		const DOMNeighborhood = DOMElement.parentElement.children
		let found = false
		Array.from(DOMNeighborhood).forEach(node => {
			if (node.classList.contains("onion-clone")) {
				found = true
				d3.select(node)
					.attr("class", null)
					.transition()
					.duration(Env.DEFAULT_ONION_ANIMATION_TIME)
					.style("transform", "scale(0.8)")
					.remove()
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
				clone.setAttribute("class", "onion-clone")
				DOMElement.parentElement.insertBefore(clone, previousNode)
				CssUtils.tween(clone, "scale", DOMElement.getBoundingClientRect().width / clone.getBoundingClientRect().width, 1, Date.now(), Env.DEFAULT_ONION_ANIMATION_TIME * i)
				previousNode = clone
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
		const labelGroup = d3.select(`#label${entityID}${isFrom ? "from" : "to"}`)
		if (labelGroup) {
			const label = labelGroup.select("rect:not(.removing)")
			const focusedState = label.classed("focused")
			label.classed("focused", !focusedState)
			if (this.enableOnionOnFocus) {
				this.toggleOnionBorder(label.node(), this.focusedOnionLayerSize, this.focusedOnionBaseColor, this.focusedOnionNumberOfLayers)
			}
			d3.selectAll(`marker[id$="${entityID}${isFrom ? "inverse" : ""}"]`)
				.select("path")
				.classed("focused", !focusedState)

			d3.selectAll(`[class*="${entityID}${isFrom ? "inverse " : " "}"]`)
				.selectAll("path, text")
				.classed("focused", !focusedState)
			return true
		}
		return false
	}

	/**
	 * Highlights multiple nodes with an expanding circle that disappears after a given time frame.
	 * @param {string[]} nodes - Array of node IDs to highlight
	 */
	highlightNode(nodes) {
		d3.selectAll(".node")
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
	  * Fades (dims) nodes and their connected edges.
	  * @param {string[]} nodes - Array of node IDs to fade
	  */
	fadeNodes(nodeIDsToFade) {
		d3.selectAll(".node")
			.filter(d => {
				return nodeIDsToFade.includes(d.id)
			})
			.classed("faded", true)
		d3.selectAll(".edge")
			.filter(d => {
				return nodeIDsToFade.includes(d.sourceNode) || nodeIDsToFade.includes(d.targetNode)
			})
			.classed("faded", true)
		d3.selectAll(".label")
			.filter(d => {
				return nodeIDsToFade.includes(d.sourceNode) || nodeIDsToFade.includes(d.targetNode)
			})
			.classed("faded", true)
	}

	/**
	  * Clears all fading for nodes and connected edges set by "fadeNodes".
	  * @param {string[]} nodes - Array of node IDs to fade
	  */
	clearFade() {
		d3.selectAll(".faded")
			.classed("faded", false)
	}
}