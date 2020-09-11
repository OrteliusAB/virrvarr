import MathUtil from "../../Utils/MathUtils"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"
import * as d3 from "d3"

export default class DOMProcessor {
    constructor(rootG, eventEmitter, userDefinedOptions) {

        this.fixedEdgeLabelWidth = userDefinedOptions.fixedEdgeLabelWidth !== undefined ? userDefinedOptions.fixedEdgeLabelWidth : Env.FIXED_EDGE_LABEL_WIDTH
        this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : Env.LABEL_WIDTH
        this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : (Env.LABEL_WIDTH * 2)
        this.fadeOnHover = userDefinedOptions.fadeOnHover !== undefined ? userDefinedOptions.fadeOnHover : Env.DEFAULT_FADE_ON_HOVER
        this.showMultiplicity = true

        this.rootG = rootG
        this.nodes = []
        this.edges = []
        this.listeningForTick = false

        this.ee = eventEmitter
        this.ee.on(EventEnum.TOGGLE_MULTIPLICITY_REQUESTED, () => {
            this.showMultiplicity = !this.showMultiplicity
            this.updateMultiplicityCounters(this.edges)
        })
        this.ee.on(EventEnum.DATA_PROCESSOR_FINISHED, (nodes, edges) => {
            this.nodes = nodes
            this.edges = edges
            //The order of these matters, don't rearrange
            this.updateMarkers(edges)
            this.updateEdges(edges)
            this.updateLabels(edges)
            this.updateMultiplicityCounters(edges)
            this.updateNodes(nodes)
            this.attachEntityClickListeners()
            this.ee.trigger(EventEnum.DOM_PROCESSOR_FINISHED, nodes, edges)
        })
        this.ee.on(EventEnum.ENGINE_TICK, () => {
            if (this.listeningForTick) {
                this.tick()
            }
        })
        this.ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
            this.listeningForTick = true
        })
    }


    /* Updates all markers (arrows) */
    updateMarkers(edges) {
        /* Init markers */
        const defs = this.rootG.select("defs")

        defs.selectAll("marker")
            .remove()

        edges.forEach((l, i) => {
            this.drawMarker(defs, l, false)
            if (l.nameFrom) {
                this.drawMarker(defs, l, true)
            }
        })
    }

    /* Updates all edges */
    updateEdges(edges) {
        /* Create edge groups and paths */
        const selector = this.rootG.select("#edge-container").selectAll(".edge")
            .data(edges, d => { return d.id })

        selector.exit().remove()

        selector.enter()
            .append("g")
            .attr("class", (d) => {
                return this.getMarkerId(d, true) + " " + this.getMarkerId(d, false)
            })
            .classed("edge", true)
            .append("path")
            .attr("class", function (d) {
                //Generated class
                return `edge-path-${d.type ? d.type : "default"}`
            })
            .attr("marker-end", (l) => {
                return "url(#" + this.getMarkerId(l, false) + ")"
            })
            .attr("marker-start", (l) => {
                if (l.nameFrom) {
                    return "url(#" + this.getMarkerId(l, true) + ")"
                }
                return ""
            })

        this.edgePath = this.rootG.select("#edge-container").selectAll(".edge path")
    }

    /* Updates all multiplicity counters */
    updateMultiplicityCounters(edges) {
        /* Create multiplicity counter */
        if (this.showMultiplicity) {
            const selector = this.rootG.select("#multiplicity-container").selectAll(".multiplicity")
                .data(edges, d => { return d.id })

            selector.exit().remove()

            selector.enter()
                .append("g")
                .classed("multiplicity", true)
                .filter(function (l) {
                    return l.multiplicityTo || l.multiplicityFrom
                })
                .each((d, i, c) => {
                    if (d.multiplicityFrom) {
                        this.drawMultiplicity(d3.select(c[i]), "to")
                    }
                    if (d.multiplicityTo) {
                        this.drawMultiplicity(d3.select(c[i]), "from")
                    }
                })
        }
        else {
            this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove()
        }

        this.activeMultiplicities = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").selectAll("g")
    }

    /* Updates all nodes */
    updateNodes(nodes) {
        /* Create node groups */
        const selector = this.rootG.select("#node-container").selectAll(".node")
            .data(nodes, d => { return d.id })

        selector.exit().remove()

        selector.enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", (d) => {
                    //Stop force on start in case it was just a simple click
                    this.ee.trigger(EventEnum.NODE_DRAG_START, d)
                    d.fx = d.x
                    d.fy = d.y
                })
                .on("drag", (d) => {
                    //Restart force on drag
                    this.ee.trigger(EventEnum.NODE_DRAG_DRAGGED, d)
                    d.fx = d3.event.x
                    d.fy = d3.event.y
                })
                .on("end", (d) => {
                    d.fx = null
                    d.fy = null
                    this.ee.trigger(EventEnum.NODE_DRAG_ENDED, d)
                }))
            .each((d, i, c) => {
                const element = d3.select(c[i])
                this.drawNode(element, d)
            })

        //Draw counter badges for imploded edges
        nodes.forEach(node => {
            d3.select("#badge-" + node.id + "-hidden-edge-counter").remove()
            if (node.hiddenEdgeCount) {
                const element = d3.select(`[id='${node.id}']`)
                    .select(function () {
                        return this.parentNode;
                    })
                this.drawNodeCollapsedEdgeCounter(element, node)
            }
        })

        this.nodeElements = this.rootG.select("#node-container").selectAll(".node")
    }

    /* Updates all labels */
    updateLabels(edges) {
        /* Create label groups */
        const selector = this.rootG.select("#label-container").selectAll(".label")
            .data(edges, d => { return d.id })

        selector.exit().remove()

        selector.enter()
            .append("g")
            .classed("label", true)
            /* Create labels, exclude edges without labels */
            .filter(function (d) {
                const needsLabel = d.nameTo || d.nameFrom
                return needsLabel
            })
            .each((d, i, c) => {
                if (d.nameFrom) {
                    this.drawLabel(d3.select(c[i]), d, "from")
                }
                if (d.nameTo) {
                    this.drawLabel(d3.select(c[i]), d, "to")
                }
            })

        this.labels = this.rootG.select("#label-container").selectAll(".label").selectAll("g")
    }

    /* Returns the distance of the passed edge */
    getEdgeDistance(l) {
        const targetRadius = l.target.radius !== undefined ? l.target.radius : 0
        const sourceRadius = l.source.radius !== undefined ? l.source.radius : 0
        let distance = targetRadius + sourceRadius
        return distance + l.edgeDistance
    }

    /* Retrieves the marker ID */
    getMarkerId(l, inverse) {
        return (l.type ? l.type : "normal") + l.id + (inverse ? "inverse" : "")
    }

    /* Draws a marker */
    drawMarker(defs, edge, inverse) {
        defs.append("marker")
            .attr("id", this.getMarkerId(edge, inverse))
            .attr("viewBox", "0 -8 14 16")
            .attr("refX", inverse ? 0 : 12)
            .attr("refY", 0)
            .attr("markerWidth", 12)
            .attr("markerHeight", 12)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .attr("class", (edge.type ? edge.type : "normal") + "Marker")
            .attr("class", "marker-" + (edge.type ? edge.type : "default"))
            .append("path")
            .attr("d", function () {
                return inverse ? "M12,-8L0,0L12,8Z" : "M0,-8L12,0L0,8Z"
            })
    }

    /* Draws a label to a edge in direction X */
    drawLabel(edge, data, direction) {
        const label = edge.append("g")
            .attr("id", "label" + data.id + direction)
            .classed(direction, true)

        this.drawLabelRect(label, data, direction)
        const labelText = label.append("text")
            .attr("class", function () {
                //Generated class
                return `label-text-${data.type ? data.type : "default"}`
            })
            .attr("text-anchor", "middle")

        this.drawLabelText(labelText, data, direction)
    }

    /* Draws a rectangle as a label background */
    drawLabelRect(label, data, direction) {
        const width = direction === "to" ? data.nameToWidth : data.nameFromWidth
        label.append("rect")
            .attr("class", function () {
                //Generated class
                return `label-rect-${data.type ? data.type : "default"}`
            })
            .attr("x", -width / 2)
            .attr("y", -Env.LABEL_HEIGHT / 2)
            .attr("width", width)
            .attr("height", Env.LABEL_HEIGHT)
            .on("mouseenter", (edgeData) => {
                this.labelMouseEnter(edgeData, direction)
            })
            .on("mouseleave", (edgeData) => {
                this.labelMouseLeave(edgeData, direction)
            })
    }

    /* Draws a new <tspan> to a supplied label */
    drawLabelText(element, d, direction) {
        element.append("tspan")
            .text(function () {
                const width = direction === "to" ? d.nameToWidth : d.nameFromWidth
                let value
                if (direction === "to") {
                    value = d.nameTo
                } else if (direction === "from") {
                    value = d.nameFrom
                } else {
                    value = d.nameTo ? d.nameTo : d.nameFrom
                }
                return value.toString().truncate(width)
            })
    }

    /* Highlights the marker and edge for the given label and direction */
    labelMouseEnter(edgeData, direction) {
        const inverse = direction === "from"

        d3.selectAll("marker#" + this.getMarkerId(edgeData, inverse))
            .select("path").classed("hovered", true)

        d3.selectAll("." + this.getMarkerId(edgeData, inverse))
            .selectAll("path, text")
            .classed("hovered", true)

        //Timeout the sorting to save CPU cycles, and stop a sorting from taking place if the mouse just passed by
        setTimeout(() => {
            const marker = d3.selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path")
            if (marker.classed("hovered")) {
                //Handle event
                this.handleHoverEvent(edgeData, "enter")
                //Sort the labels which brings the hovered one to the foreground
                this.rootG.selectAll(".label").sort(function (a, b) {
                    if (a.id === edgeData.id && b.id !== edgeData.id) {
                        return 1 // a is hovered
                    } else if (a.id !== edgeData.id && b.id === edgeData.id) {
                        return -1 // b is hovered
                    } else {
                        // workaround to make sorting in chrome for these elements stable
                        return a.id - b.id // compare unique values
                    }
                })
            }
        }, 250)
    }

    /* Removes highlighting of marker and edge for the given label and direction */
    labelMouseLeave(edgeData, direction) {
        //Handle event
        this.handleHoverEvent(edgeData, "leave")

        const inverse = direction === "from"
        d3.selectAll("marker#" + this.getMarkerId(edgeData, inverse))
            .select("path").classed("hovered", false)

        d3.selectAll("." + this.getMarkerId(edgeData, inverse))
            .selectAll("path, text").classed("hovered", false)
    }

    /* Draws multiplicity notation */
    drawMultiplicity(edge, direction) {
        const card = edge.append("g")
            .attr("class", (l) => {
                return this.getMarkerId(l, direction === "to")
            })
            .classed(direction, true)

        card.append("text")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return direction === "to" ? d.multiplicityTo : d.multiplicityFrom
            })
    }

    /* Draws a node */
    drawNode(element, data) {
        switch (data.shape) {
            case "circle":
                element.append("circle")
                    .attr("r", (d) => d.radius)
                    .attr("class", `node-${data.type ? data.type : "default"}`) //Generated Class
                    .attr("id", data.id)
                //.append("svg:title")
                //.text((d) => d.name)
                break;

            case "layeredCircle":
                //Create an outer circle, with the "real" circle inside
                element.append("circle")
                    .attr("r", (d) => d.radius)
                    .attr("style", `stroke-width:2;fill:#fff;stroke:#000;stroke-dasharray:0;`)
                    .attr("id", data.id)
                element.append("circle")
                    .attr("r", (d) => d.radius - 4)
                    .attr("class", `node-${data.type ? data.type : "default"}`) //Generated Class
                //.append("svg:title")
                //.text((d) => d.name)
                break;

            case "rectangle":
                element.append("rect")
                    .attr("x", (d) => -d.width / 2)
                    .attr("y", (d) => -d.height / 2)
                    .attr("width", (d) => d.width)
                    .attr("height", (d) => d.height)
                    .attr("class", `node-${data.type ? data.type : "default"}`) //Generated Class
                    .attr("id", data.id)
                //.append("svg:title")
                //.text((d) => d.name)
                break;

            default:
                console.error("NO SHAPE FOUND FOR NODE")
        }

        element
            //Add hover listeners
            .on("mouseenter", (d) => {
                //Handle event
                this.handleHoverEvent(d, "enter")
            })
            .on("mouseleave", (d) => {
                //Handle event
                this.handleHoverEvent(d, "leave")
            })
            //Add Tooltip hover function
            .on("mousemove", (d) => { this.ee.trigger(EventEnum.MOUSE_OVER_NODE, d) })
            .on("mouseout", (d) => { this.ee.trigger(EventEnum.MOUSE_LEFT_NODE, d) })

        //draw textblock
        this.drawTextBlock(element)

        //Draw the textline inside the block
        //Figure out if it should be one or two rows of text
        const text = data.name
        let truncatedText = text.truncate(data.maxTextWidth)
        if (truncatedText.length < text.length && truncatedText.lastIndexOf(" ") > -1) {
            truncatedText = truncatedText.substring(0, truncatedText.lastIndexOf(" "))
            let otherStringTruncated = text.substring(truncatedText.length + 1).truncate(data.maxTextWidth)
            if ((otherStringTruncated.length + truncatedText.length + 1) < text.length) {
                otherStringTruncated = otherStringTruncated.substring(0, otherStringTruncated.length - 3) + "..."
            }
            this.drawTextline(element.select("text"), truncatedText, (data.type ? data.type : "default"), -(Env.SPACE_BETWEEN_SPANS / 2))
            this.drawTextline(element.select("text"), otherStringTruncated, (data.type ? data.type : "default"), Env.SPACE_BETWEEN_SPANS / 2)
        }
        else {
            if (truncatedText.length < text.length) {
                truncatedText = truncatedText.substring(0, truncatedText.length - 3) + "..."
            }
            this.drawTextline(element.select("text"), truncatedText, (data.type ? data.type : "default"), 0)
        }
    }

    /* Draws a <text> block to a given element */
    drawTextBlock(element) {
        element.append("text")
            .attr("text-anchor", "middle")
    }

    /* Draws a new line of text to a given element. */
    drawTextline(element, word, type, y) {
        element.append("tspan")
            .attr("class", `node-text-${type}`)
            .attr("x", 0)
            .attr("y", y)
            .text(word)
    }

    //Draws a badge in the top right corner of nodes with a number of a hidden edge count in it
    drawNodeCollapsedEdgeCounter(element, data) {
        const count = `${data.hiddenEdgeCount}`
        const textWidth = count.width()
        const fontSize = 14

        const areaHeight = data.radius ? data.radius * 2 : data.height
        const areaWidth = data.radius ? data.radius * 2 : data.width

        const marginX = 12
        const marginY = 12

        const translateY = -(areaHeight / 2)
        const translateX = (areaWidth / 2)

        const rectHeight = fontSize + marginY
        const rectWidth = textWidth + marginX

        element.append("g")
            .attr("id", "badge-" + data.id + "-hidden-edge-counter")
            .attr("style", "pointer-events:none;")
            .attr("transform", `translate(${translateX} ${translateY})`)
            .append("rect")
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("y", -(rectHeight / 2))
            .attr("x", -(rectWidth / 2))
            .attr("class", "virrvarr-node-edge-counter-badge")
            .select(function () {
                return this.parentNode;
            })
            .append("text")
            .attr("class", "virrvarr-node-edge-counter-badge-text")
            .append("tspan")
            .attr("style", `font-size:${fontSize};`)
            .text(`${count}`)
    }

    /* Creates event listener for onClick events for nodes and edges */
    attachEntityClickListeners() {
        //We need to stop the click event if it is a double click event
        //We do this using a timeout that starts on click and cancels on double click.
        let timeout = null

        this.rootG.selectAll(".node")
            .on("click", (d) => {
                d3.event.stopPropagation();
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: d.id,
                        data: d.data
                    })
                }, Env.DOUBLE_CLICK_THRESHOLD)
            })
            .on("dblclick", (d) => {
                d3.event.stopPropagation();
                clearTimeout(timeout)
                this.ee.trigger(EventEnum.DBL_CLICK_ENTITY, {
                    id: d.id,
                    data: d.data
                })
            })
            .on("contextmenu", (d) => {
                d3.event.preventDefault()
                d3.event.stopPropagation()
                this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, d)
            })

        this.rootG.selectAll(".label .from")
            .on("click", (d) => {
                d3.event.stopPropagation();
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: d.id,
                        data: d.data,
                        direction: "from"
                    })
                }, Env.DOUBLE_CLICK_THRESHOLD)
            })
            .on("dblclick", (d) => {
                d3.event.stopPropagation();
                this.ee.trigger(EventEnum.DBL_CLICK_ENTITY, {
                    id: d.id,
                    data: d.data,
                    direction: "from"
                })
            })
            .on("contextmenu", (d) => {
                d3.event.preventDefault()
                d3.event.stopPropagation()
                this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, d, "from")
            })

        this.rootG.selectAll(".label .to")
            .on("click", (d) => {
                d3.event.stopPropagation();
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: d.id,
                        data: d.data,
                        direction: "to"
                    })
                }, Env.DOUBLE_CLICK_THRESHOLD)
            })
            .on("dblclick", (d) => {
                d3.event.stopPropagation();
                this.ee.trigger(EventEnum.DBL_CLICK_ENTITY, {
                    id: d.id,
                    data: d.data,
                    direction: "from"
                })
            })
            .on("contextmenu", (d) => {
                d3.event.preventDefault()
                d3.event.stopPropagation()
                this.ee.trigger(EventEnum.RIGHT_CLICK_ENTITY, d, "to")
            })
    }

    /* Handles what happens when an item is hovered */
    handleHoverEvent(hoveredData, eventType) {
        //Emitt event
        this.ee.trigger(EventEnum.HOVER_ENTITY, {
            eventType: eventType,
            id: hoveredData.id,
            data: hoveredData.data
        })

        if (this.fadeOnHover) {
            //Handle fading the non-relevant information
            //If the selected item is a node
            if (!hoveredData.sourceNode) {
                //Find all edges and nodes with a connection to this node
                let filteredEdges = this.edges.filter(edge => {
                    return edge.sourceNode === hoveredData.id || edge.targetNode === hoveredData.id
                })
                let validNodes = filteredEdges.reduce((acc, edge) => {
                    acc.push(edge.targetNode)
                    acc.push(edge.sourceNode)
                    return acc
                }, [])
                validNodes.push(hoveredData.id)

                //Set opacity for fade or unfade
                const opacity = eventType === "enter" ? "" + Env.DEFAULT_FADE_OPACITY : "" + 1

                //Nodes
                d3.selectAll(".node")
                    .filter(function (d) { return validNodes.find(node => node === d.id) === undefined })
                    .transition()
                    .duration(Env.FADE_TIME)
                    .ease(d3.easeLinear)
                    .style("opacity", opacity)

                //Edges
                d3.selectAll(".edge")
                    .filter(function (d) { return filteredEdges.find(edge => edge.id === d.id) === undefined })
                    .transition()
                    .duration(Env.FADE_TIME)
                    .ease(d3.easeLinear)
                    .style("opacity", opacity)

                //Labels
                d3.selectAll(".label")
                    .filter(function (d) { return filteredEdges.find(edge => edge.id === d.id) === undefined })
                    .transition()
                    .duration(Env.FADE_TIME)
                    .ease(d3.easeLinear)
                    .style("opacity", opacity)
            }
        }
    }

    /* Animation tick */
    tick() {
        //Edges
        this.edgePath.attr("d", (l) => {
            if (l.source === l.target) {
                return MathUtil.calculateSelfEdgePath(l)
            }

            let pathStart = MathUtil.calculateIntersection(l.target, l.source, 1)
            let pathEnd = MathUtil.calculateIntersection(l.source, l.target, 1)
            let curvePoint = MathUtil.calculateCurvePoint(pathStart, pathEnd, l)
            l.curvePoint = curvePoint

            return MathUtil.curveFunction([MathUtil.calculateIntersection(l.curvePoint, l.source, 1),
                curvePoint, MathUtil.calculateIntersection(l.curvePoint, l.target, 1)])
        })

        //Nodes
        this.nodeElements.attr("transform", function (node) {
            return "translate(" + node.x + "," + node.y + ")"
        })

        //Multiplicities
        this.activeMultiplicities.attr("transform", function (l) {
            const group = d3.select(this)
            let pos
            if (group.classed("to")) {
                pos = MathUtil.calculateIntersection(l.curvePoint, l.source, Env.MULTIPLICITY_HDISTANCE)
            } else {
                pos = MathUtil.calculateIntersection(l.curvePoint, l.target, Env.MULTIPLICITY_HDISTANCE)
            }

            let n = MathUtil.calculateNormalVector(l.curvePoint, l.source, Env.MULTIPLICITY_VDISTANCE)

            if (l.source.index < l.target.index) {
                n.x = -n.x
                n.y = -n.y
            }

            return "translate(" + (pos.x + n.x) + "," + (pos.y + n.y) + ")"
        })

        //Labels
        this.labels.attr("transform", function (l) {
            const group = d3.select(this)
            let midX = l.curvePoint.x
            let midY = l.curvePoint.y

            if (l.nameFrom) {
                if (group.classed("to")) {
                    midY += (Env.LABEL_HEIGHT / 2 + 1)
                } else if (group.classed("from")) {
                    midY -= (Env.LABEL_HEIGHT / 2 + 1)
                }
            }

            return "translate(" + midX + "," + midY + ")"
        })
    }

}