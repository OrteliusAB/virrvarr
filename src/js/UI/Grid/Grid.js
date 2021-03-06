import * as d3 from "d3"
import Env from "../../Config/Env"

/**
 * The Grid class is responsible for drawing the background grid pattern to the canvas (if applicable)
 */
export default class Grid {
	constructor(graphContainerElement, eventEmitter, options) {
		this.graphContainerElement = graphContainerElement
		this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : Env.ENABLE_GRID
		this.enableSecondaryGrid = options.enableSecondaryGrid !== undefined ? options.enableSecondaryGrid : Env.ENABLE_SECONDARY_GRID
		this.enableScaleGridOnZoom = options.enableScaleGridOnZoom !== undefined ? options.enableScaleGridOnZoom : Env.ENABLE_SCALE_GRID_ON_ZOOM
		this.ee = eventEmitter
		this.initialize()
	}

	/**
	 * Initializes the grid
	 */
	initialize() {
		d3.select(this.graphContainerElement).select("#grid").remove()
		d3.select(this.graphContainerElement).select("#grid-rect").remove()
		if (this.enableGrid) {
			this.initializeGrid()
		} else if (this.enableSecondaryGrid) {
			this.initializeAlternativeGrid()
		}
	}

	/**
	 * Initialize the secondary grid
	 */
	initializeAlternativeGrid() {
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
		const grid = d3
			.select(this.graphContainerElement)
			.select("svg")
			.insert("rect", ":first-child")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "url(#grid)")
			.attr("class", "grid")
			.attr("id", "grid-rect")
		if (this.enableScaleGridOnZoom) {
			grid.attr("width", "2000%")
				.attr("height", "2000%")
				.attr("x", "-1000%") //This is faster for scaling than recalculating the relative x and y coordinates every time the zoom handler fires.
				.attr("y", "-1000%")
		}
		const transform = d3.select(this.graphContainerElement).select("g").node.getAttribute("transform")
		if (transform) {
			grid.attr("transform", transform)
		}
	}

	/**
	 * Initialize the primary grid
	 */
	initializeGrid() {
		const defs = d3.select(this.graphContainerElement).select("svg").select("g").select("defs")
		const gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse")
		gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #a0a0a0; stroke-width: 1; stroke-dasharray: 2;")
		const grid = d3
			.select(this.graphContainerElement)
			.select("svg")
			.insert("rect", ":first-child")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "url(#grid)")
			.attr("class", "grid")
			.attr("id", "grid-rect")
		if (this.enableScaleGridOnZoom) {
			grid.attr("width", "2000%")
				.attr("height", "2000%")
				.attr("x", "-1000%") //This is faster for scaling than recalculating the relative x and y coordinates every time the zoom handler fires.
				.attr("y", "-1000%")
		}
		const transform = d3.select(this.graphContainerElement).select("g").node().getAttribute("transform")
		if (transform) {
			grid.attr("transform", transform)
		}
	}

	/**
	 * @param {D3Selection} container - D3 selection of the container we are drawing inside of
	 * @param {number} startX - Start X coordinate of the line
	 * @param {number} startY - Start Y coordinate of the line
	 * @param {number} endX - End X coordinate of the line
	 * @param {number} endY - End Y coordinate of the line
	 */
	createLine(container, startX, startY, endX, endY) {
		container.append("line").attr("style", "stroke: #a0a0a0;stroke-width:0.5;").attr("x1", startX).attr("y1", startY).attr("x2", endX).attr("y2", endY)
	}
}
