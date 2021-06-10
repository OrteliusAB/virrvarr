import * as d3 from "d3"
import EventEnum from "../Events/EventEnum"
import ZoomHandler from "./ZoomHandler/ZoomHandler"
import ContextMenu from "./ContextMenu/ContextMenu"
import Highlighter from "./Highlighter/Highlighter"
import Tooltip from "./Tooltip/Tooltip"
import Grid from "./Grid/Grid"
import DOMProcessor from "./DOMProcessor/DOMProcessor"
import CSSUtil from "../Utils/CssUtils.js"
import SelectionLasso from "./SelectionLasso/SelectionLasso"

/**
 * The UI class manages all different UI addons.
 */
export default class UI {
	constructor(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
		this.graphContainerElement = graphContainerElement
		this.style = styles
		this.ee = eventEmitter
		this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.destroy())
		this.zoomHandler = new ZoomHandler(this.graphContainerElement, this.ee, userDefinedOptions)
		this.contextMenu = new ContextMenu(this.graphContainerElement, this.ee, userDefinedOptions)
		this.tooltip = new Tooltip(this.graphContainerElement, this.ee)
		this.stylesID = ("A" + Math.random()).replace(".", "")
		CSSUtil.initializeGraphStyles(this.style, this.stylesID, graphContainerElement)
		this.rootG = this.initializeDOM()
		this.selectionLasso = new SelectionLasso(this.graphContainerElement, this.ee)
		this.highlighter = new Highlighter(this.graphContainerElement, this.ee, userDefinedOptions)
		this.grid = new Grid(this.graphContainerElement, this.ee, userDefinedOptions)
		this.DOMProcessor = new DOMProcessor(this.graphContainerElement, this.ee, userDefinedOptions)
	}

	get zoom() {
		return this.zoomHandler.zoom
	}

	get context() {
		return this.contextMenu
	}

	get width() {
		return this.graphContainerElement.offsetWidth
	}

	get height() {
		return this.graphContainerElement.offsetHeight
	}

	initializeDOM() {
		const rootG = d3
			.select(this.graphContainerElement)
			.insert("svg", "*")
			.attr("class", "virrvarr")
			.classed("svgGraph", true)
			.attr("width", "100%")
			.attr("height", "100%")
			.on("click", () => {
				//Do not bubble the event
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.CLICK_ENTITY, null)
			})
			.on("contextmenu", () => {
				d3.event.preventDefault()
				d3.event.stopPropagation()
				this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, null)
			})
			.call(this.zoom)
			.on("dblclick.zoom", null)
			.append("g")

		rootG.append("defs")
		rootG.append("g").attr("id", "edge-container")
		rootG.append("g").attr("id", "label-container")
		rootG.append("g").attr("id", "multiplicity-container")
		rootG.append("g").attr("id", "layout-extras")
		rootG.append("g").attr("id", "node-container")
		return rootG
	}

	updateStyles(newStyles) {
		this.style = newStyles
		d3.select(this.graphContainerElement).select(`#${this.stylesID}`).remove()
		CSSUtil.initializeGraphStyles(this.style, this.stylesID, this.graphContainerElement)
	}

	destroy() {
		this.rootG.select("#edge-container").selectAll(".edge").remove()
		this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove()
		this.rootG.select("#node-container").selectAll(".node").remove()
		this.rootG.select("#label-container").selectAll(".label").remove()
		this.rootG.select("#layout-extras").selectAll("*").remove()
		d3.select(this.graphContainerElement).select("svg").remove()
		d3.select(this.graphContainerElement).select(`#${this.stylesID}`).remove()
	}
}
