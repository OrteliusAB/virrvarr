import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"

/**
 * The Highlighter class handles highlighting of nodes in the graph.
 * This includes both highlighting on selections as well as highlighting on search.
 */
export default class Highlighter {
	constructor(eventEmitter) {
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
			const label = labelGroup.select("rect")
			const focusedState = label.classed("focused")
			label.classed("focused", !focusedState)
			d3.selectAll(`marker[id*="${entityID}${isFrom ? "inverse" : ""}"]`)
				.select("path")
				.classed("focused", !focusedState)

			d3.selectAll(`[class*="${entityID}${isFrom ? "inverse" : ""}"]`)
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
}
