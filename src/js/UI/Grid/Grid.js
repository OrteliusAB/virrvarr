import * as d3 from "d3"
import Env from "../../Config/Env"

export default class Grid {
    constructor(graphContainerElement, eventEmitter, options) {
        this.graphContainerElement = graphContainerElement
        this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : Env.ENABLE_GRID
        this.ee = eventEmitter
        if (this.enableGrid) {
            this.initializeGrid()
        }
    }

    initializeGrid() {
        const defs = d3.select(this.graphContainerElement)
            .select("svg")
            .select("g")
            .select("defs")
            
            const gridPattern = defs.append("pattern")
            .attr("id", "grid")
            .attr("width", 60)
            .attr("height", 60)
            .attr("patternUnits", "userSpaceOnUse")

            gridPattern.append("path")
            .attr("d", "M 60 0 L 0 0 0 60")
            .attr("style", "fill: none; stroke: #dedede; stroke-width: 1; stroke-dasharray: 2;")

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

    createLine(container, startX, startY, endX, endY) {
        container.append("line")
        .attr("style", "stroke: #a0a0a0;stroke-width:0.5;")
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", endX)
        .attr("y2", endY)
    }
}