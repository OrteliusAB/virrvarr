import * as d3 from "d3"
import EventEnum from "../Events/EventEnum"
import ZoomHandler from "./ZoomHandler/ZoomHandler"
import ContextMenu from "./ContextMenu/ContextMenu"
import Highlighter from "./Highlighter/Highlighter"
import Tooltip from "./Tooltip/Tooltip"
import Grid from "./Grid/Grid"
import DOMProcessor from "./DOMProcessor/DOMProcessor"
import CSSUtil from "../Utils/CssUtils.js"
import uuid from "uuid/v4"

export default class UI {
    constructor(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
        this.graphContainerElement = graphContainerElement
        this.style = styles
        this.ee = eventEmitter
        this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.destroy())

        this.initializeContainerAutoResize()

        this.zoomHandler = new ZoomHandler(this.graphContainerElement, this.ee, userDefinedOptions)
        this.contextMenu = new ContextMenu(this.graphContainerElement, this.ee, userDefinedOptions)
        this.highlighter = new Highlighter(this.ee)
        this.tooltip = new Tooltip(this.graphContainerElement, this.ee)

        this.stylesID = "A" + uuid()
        CSSUtil.initializeGraphStyles(this.style, this.stylesID)

        this.rootG = this.initializeDOM()
        this.grid = new Grid(this.graphContainerElement, this.ee, userDefinedOptions)
        this.DOMProcessor = new DOMProcessor(this.rootG, this.ee, userDefinedOptions)
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

    /* This function automatically resizes the svg container when the window size changes */
    initializeContainerAutoResize() {
        d3.select(window).on("resize", () => {
            /* Because of how flex layouts work we need to first remove the graphcontainers space,
             and then we can measure the new dimensions */
            d3.select(this.graphContainerElement)
                .select("svg")
                .attr("width", 0)
                .attr("height", 0)

            d3.select(this.graphContainerElement)
                .select("svg")
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("viewBox", "0 0 " + this.width + " " + this.height)
        })
    }

    initializeDOM() {
        const width = this.graphContainerElement.offsetWidth
        const height = this.graphContainerElement.offsetHeight
        const rootG = d3.select(this.graphContainerElement)
            .insert("svg", "*")
            .attr("class", "virrvarr")
            .classed("svgGraph", true)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", "0 0 " + width + " " + height)
            .on("click", () => {
                //Do not bubble the event
                d3.event.stopPropagation();
                this.ee.trigger(EventEnum.CLICK_ENTITY, null)
            })
            .on("contextmenu", (d) => {
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
        rootG.append("g").attr("id", "node-container")
        return rootG
    }

    destroy() {
        this.rootG.select("#edge-container").selectAll(".edge").remove()
        this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove()
        this.rootG.select("#node-container").selectAll(".node").remove()
        this.rootG.select("#label-container").selectAll(".label").remove()
        d3.select(this.graphContainerElement).select("svg").remove()
        d3.select(`#${this.stylesID}`).remove()
    }

}