import * as d3 from "d3"
import Env from "../../Config/Env"

/**
 * The Grid class is responsible for drawing the background grid pattern to the canvas (if applicable)
 */
export default class Grid {
	constructor(graphContainerElement, eventEmitter, options) {
		this.graphContainerElement = graphContainerElement
		this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : Env.ENABLE_GRID
		this.enableSecondaryGrid = options.enableSecondaryGrid !== undefined ? options.enableSecondaryGrid : false
		this.ee = eventEmitter
		if (this.enableGrid) {
			this.initializeGrid()
		} else if (this.enableSecondaryGrid) {
			this.initializeAlternativeGrid()
		}
	}

	/**
	 * Initialize the background grid
	 */
	initializeGrid() {
		const defs = d3.select(this.graphContainerElement).select("svg").select("g").select("defs")
		const gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse")
		gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #dedede; stroke-width: 1; stroke-dasharray: 2;")
		this.createLine(gridPattern, 0, 0, 0, 2)
		this.createLine(gridPattern, 0, 0, 2, 0)
		this.createLine(gridPattern, 60, 60, 58, 60)
		this.createLine(gridPattern, 60, 60, 60, 58)
		this.createLine(gridPattern, 0, 58, 0, 60)
		this.createLine(gridPattern, 0, 60, 2, 60)
		this.createLine(gridPattern, 58, 0, 60, 0)
		this.createLine(gridPattern, 60, 0, 60, 2)
		d3.select(this.graphContainerElement)
			.select("svg")
			.insert("rect", ":first-child")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "url(#grid)")
	}

	/**
	 * Initialize the secondary grid
	 */
	initializeAlternativeGrid() {
		const defs = d3.select(this.graphContainerElement).select("svg").select("g").select("defs")
		const gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse")
		gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #a0a0a0; stroke-width: 1; stroke-dasharray: 2;")
		d3.select(this.graphContainerElement)
			.select("svg")
			.insert("rect", ":first-child")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "url(#grid)")
	}

	/**
	 * @param {D3Selection} container - D3 selection of the container we are drawing inside of
	 * @param {*} startX - Start X coordinate of the line
	 * @param {*} startY - Start Y coordinate of the line
	 * @param {*} endX - End X coordinate of the line
	 * @param {*} endY - End Y coordinate of the line
	 */
	createLine(container, startX, startY, endX, endY) {
		container.append("line").attr("style", "stroke: #a0a0a0;stroke-width:0.5;").attr("x1", startX).attr("y1", startY).attr("x2", endX).attr("y2", endY)
	}
}
