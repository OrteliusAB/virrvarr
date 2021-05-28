import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"

/**
 * The tooltip class handles generating and positioning the tooltip in the graph.
 */
export default class Tooltip {
	constructor(graphContainerElement, eventEmitter) {
		this.graphContainerElement = graphContainerElement
		this.ee = eventEmitter
		this.tooltip = this.initializeTooltip()
		this.ee.on(EventEnum.MOUSE_OVER_NODE, node => {
			this.showTooltip(node)
		})
		this.ee.on(EventEnum.MOUSE_LEFT_NODE, () => {
			this.hideTooltip()
		})
		this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.destroy())
	}

	/**
	 * Initializes the tooltip
	 */
	initializeTooltip() {
		return d3.select(this.graphContainerElement).append("div").attr("id", "virrvarr-tooltip")
	}

	/**
	 * Displays the tooltip with a text at coordinates x and y
	 * @param {object} node - The node object where the tooltip should be
	 */
	showTooltip(node) {
		const coordinates = d3.mouse(document.documentElement)
		this.tooltip
			.style("left", coordinates[0] - window.pageXOffset + "px")
			.style("top", coordinates[1] + 20 - window.pageYOffset + "px")
			.style("display", "inline-block")
			.style("position", "fixed")
			.text(node.name)
	}

	/**
	 * Hides the tooltip
	 */
	hideTooltip() {
		this.tooltip.style("display", "none")
	}

	/**
	 * Unmounts the tooltip from the DOM
	 */
	destroy() {
		this.tooltip.remove()
	}
}
