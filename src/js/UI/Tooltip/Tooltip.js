import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"

export default class Tooltip {
    constructor(graphContainerElement, eventEmitter) {
        this.graphContainerElement = graphContainerElement
        this.ee = eventEmitter
        this.tooltip = this.initializeTooltip()
        this.ee.on(EventEnum.MOUSE_OVER_NODE, (node) => { this.showTooltip(node) })
        this.ee.on(EventEnum.MOUSE_LEFT_NODE, () => { this.hideTooltip() })
        this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.destroy())
    }

    /* Initializes the tooltip */
    initializeTooltip() {
        return d3.select(this.graphContainerElement)
            .append("div")
            .attr("id", "virrvarr-tooltip");
    }

    /* Displays the tooltip with a text at coordinates x and y */
    showTooltip(node) {
        const coordinates = d3.mouse(document.documentElement)
        this.tooltip
            .style("left", coordinates[0] - window.pageXOffset + "px")
            .style("top", coordinates[1] + 20 - window.pageYOffset + "px")
            .style("transform", "translateX(-50%)")
            .style("display", "inline-block")
            .style("position", "fixed")
            .html(node.name)
    }

    /* Hides the tooltip */
    hideTooltip() {
        this.tooltip.style("display", "none")
    }

    destroy() {
        this.tooltip.remove()
    }
}