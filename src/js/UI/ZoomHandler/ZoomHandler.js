import * as d3 from "d3"
import Env from "../../Config/Env"
import EventEnum from "../../Events/EventEnum"

export default class ZoomHandler {
    constructor(graphContainerElement, eventEmitter, options) {
        this.graphContainerElement = graphContainerElement
        this.enableZoomButtons = options.enableZoomButtons !== undefined ? options.enableZoomButtons : Env.ENABLE_ZOOM_BUTTONS
        this.ee = eventEmitter
        this.ee.on(EventEnum.ZOOM_REQUESTED, (x, y, scale) => { this.handleZoomRequest(x, y, scale) })
        this.zoom = d3.zoom()
            .scaleExtent(Env.SCALE_EXTENT)
            .on("zoom", () => {
                const rootG = d3.select(this.graphContainerElement).select("g")
                rootG.attr("transform", d3.event.transform)
            })
        if (this.enableZoomButtons) {
            this.initializeZoomButtons()
        }
    }

    initializeZoomButtons() {
        const zoomButtons = d3.select(this.graphContainerElement)
            .append("div")
            .attr("style", "position:relative;")
            .append("svg")
            .attr("filter", "drop-shadow(0px 0px 2px rgba(0, 0, 0, .5))")
            .attr("style", "position:absolute;height:110px;width:34px;right:15px;bottom:30px;")
            .append("g")
            .attr("class", "virrvarr-zoom-controls")
            .attr("style", "cursor:pointer;")

        zoomButtons
            .append("g")
            .on('click', () => {
                this.scaleBy(1.5);
            })
            .attr("class", "virrvarr-zoom-in")
            .attr("transform", "translate(0, 0)")
            .append("defs")
            .append("path")
            .attr("id","prefix__zoomin_a")
            .attr("d","M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6-9C8.99 2 11 4.01 11 6.5S8.99 11 6.5 11 2 8.99 2 6.5 4.01 2 6.5 2zM7 4H6v2H4v1h2v2h1V7h2V6H7V4z")
            .select(function () {
                return this.parentNode;
            })
            .select(function () {
                return this.parentNode;
            })
            .append("rect")
            .attr("x", "2")
            .attr("y", "2")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("width", "30")
            .attr("height", "30")
            .attr("fill", "white")
            .select(function () {
                return this.parentNode;
            })

            .append("g")
            .attr("fill", "none")
            .attr("fill-rule", "evenodd")
            .attr("transform", "translate(9 9)")
            .append("mask")
            .attr("id","prefix__zoomin_b")
            .attr("fill","#fff")
            .append("use")
            .attr("xedge:href","#prefix__zoomin_a")
            .select(function () {
                return this.parentNode;
            })
            .select(function () {
                return this.parentNode;
            })
            .append("g")
            .attr("fill", "#666")
            .attr("mask", "url(#prefix__zoomin_b)")
            .append("path")
            .attr("d","M0 0H50V50H0z")
            .attr("transform","translate(-16 -16)")
                      
        zoomButtons
            .append("g")
            .on('click', () => {
                this.scaleBy(1 / 1.5);
            })
            .attr("class", "virrvarr-zoom-out")
            .attr("transform", "translate(0, 38)")
            .append("defs")
            .append("path")
            .attr("id","prefix__zoomout_a")
            .attr("d","M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11zM4 6h5v1H4V6z")
            .select(function () {
                return this.parentNode;
            })
            .select(function () {
                return this.parentNode;
            })

            .append("rect")
            .attr("x", "2")
            .attr("y", "2")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("width", "30")
            .attr("height", "30")
            .attr("fill", "white")
            .select(function () {
                return this.parentNode;
            })
            .append("g")
            .attr("fill", "none")
            .attr("fill-rule", "evenodd")
            .attr("transform", "translate(9 9)")
            .append("mask")
            .attr("id","prefix__zoomout_b")
            .attr("fill","#fff")
            .append("use")
            .attr("xedge:href","#prefix__zoomout_a")
            .select(function () {
                return this.parentNode;
            })
            .select(function () {
                return this.parentNode;
            })
            .append("g")
            .attr("fill", "#666")
            .attr("mask", "url(#prefix__zoomout_b)")
            .append("path")
            .attr("d","M0 0H50V50H0z")
            .attr("transform","translate(-16 -16)")

        zoomButtons
            .append("g")
            .on('click', () => {
                this.resetZoom();
            })
            .attr("class", "virrvarr-zoom-reset")
            .attr("transform", "translate(0, 76)")
            .append("defs")
            .append("path")
            .attr("id","prefix__reset_a")
            .attr("d","M15 10c.552 0 1 .448 1 1v5h-5c-.552 0-1-.448-1-1s.448-1 1-1h3v-3c0-.552.448-1 1-1zM1 10c.552 0 1 .448 1 1v3h3c.552 0 1 .448 1 1s-.448 1-1 1H0v-5c0-.552.448-1 1-1zM16 0v5c0 .552-.448 1-1 1s-1-.448-1-1V2h-3c-.552 0-1-.448-1-1s.448-1 1-1h5zM5 0c.552 0 1 .448 1 1s-.448 1-1 1H2v3c0 .552-.448 1-1 1s-1-.448-1-1V0z")
            .select(function () {
                return this.parentNode;
            })
            .select(function () {
                return this.parentNode;
            })

            .append("rect")
            .attr("x", "2")
            .attr("y", "2")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("width", "30")
            .attr("height", "30")
            .attr("fill", "white")
            .select(function () {
                return this.parentNode;
            })
            .append("g")
            .attr("fill", "none")
            .attr("fill-rule", "evenodd")
            .attr("transform", "translate(9 9)")
            .append("mask")
            .attr("id","prefix__reset_b")
            .attr("fill","#fff")
            .append("use")
            .attr("xedge:href","#prefix__reset_a")
            .select(function () {
                return this.parentNode;
            })
            .select(function () {
                return this.parentNode;
            })
            .append("g")
            .attr("fill", "#666")
            .attr("mask", "url(#prefix__reset_b)")
            .append("path")
            .attr("d","M0 0H50V50H0z")
            .attr("transform","translate(-16 -16)")
    }

    scaleTo(scale) {
        this.zoom.scaleTo(d3.select(this.graphContainerElement).select("svg"), scale)
    }

    scaleBy(ratio) {
        this.zoom.scaleBy(d3.select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME / 2), ratio);
    }

    /* This function resets the zoom to the initial position */
    resetZoom() {
        const rootG = d3.select(this.graphContainerElement).select("g")
        const currentTransformStr = rootG.attr("transform")
        let currentScale = currentTransformStr.substring(currentTransformStr.indexOf("scale(") + 6, currentTransformStr.lastIndexOf(")"))
        currentScale = parseFloat(currentScale)

        const width = this.graphContainerElement.offsetWidth
        const height = this.graphContainerElement.offsetHeight
        const groupWidth = rootG.node().getBBox().width * currentScale
        const groupHeight = rootG.node().getBBox().height * currentScale
        const widthRatio = width / groupWidth
        const heightRatio = height / groupHeight

        const ratio = Math.min(widthRatio, heightRatio)

        //Is this some kind of dark magic bug, or am I going bonkers?
        //If the SVG changes size this function will fail to center the graph correctly
        //Refreshing the window will solve the problem
        //The resulting transform attributes are identical in both scenarios, but one centers it and one does not.
        d3.select(this.graphContainerElement)
            .select("svg")
            .transition()
            .duration(Env.ZOOM_TIME / 4)
            .call(this.zoom.scaleBy, ratio)
            .transition()
            .call(this.zoom.translateTo, width / 2, height / 2)
    }

    /* This function transforms the svg>g element to a specific translation and scale */
    zoomToCoordinates(x, y, scale) {
        d3.select(this.graphContainerElement)
            .select("svg")
            .transition()
            .duration(Env.ZOOM_TIME)
            .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale))
            .select("g")
            .attr("transform", `translate(${x},${y})scale(${scale})`)
    }

    handleZoomRequest(x, y, scale) {
        if ((x || x === 0) && (y || y === 0) && scale) {
            this.zoomToCoordinates(x, y, scale)
        }
        else {
            this.resetZoom()
        }
    }
}