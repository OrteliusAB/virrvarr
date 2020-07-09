import * as d3 from "d3"
import EventEnum from "../Events/EventEnum"
import Env from "../Config/Env"

export default class Engine {
    constructor(forceCenterX, forceCenterY, eventEmitter) {
        this.ee = eventEmitter
        this.ee.on(EventEnum.DOM_PROCESSOR_FINISHED, (nodes, edges) => {
            this.updateSimulation(nodes, edges)
            this.ee.trigger(EventEnum.ENGINE_UPDATE_FINISHED, nodes, edges)
        })
        this.ee.on(EventEnum.NODE_DRAG_START, () => {
            this.stop()
            this.target(0.5)
        })
        this.ee.on(EventEnum.NODE_DRAG_DRAGGED, () => {
            this.restart()
        })
        this.ee.on(EventEnum.NODE_DRAG_ENDED, () => {
            this.target(0)
        })
        this.ee.on(EventEnum.CLICK_ENTITY, () => { this.alpha(0) })
        this.ee.on(EventEnum.NODE_FIXATION_REQUESTED, () => {
            this.alpha(1)
            this.restart()
        })
        this.ee.on(EventEnum.ENGINE_LAYOUT_REQUESTED, (nodes, edges, attribute, filterFunction, sortFunction) => { this.createLayout(nodes, edges, attribute, filterFunction, sortFunction) })
        this.ee.on(EventEnum.ENGINE_LAYOUT_RESET_REQUESTED, (nodes, edges) => {
            this.resetLayout(nodes, edges)
            this.alpha(1)
            this.restart()
        })
        this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.stop())
        this.forceCenterX = forceCenterX
        this.forceCenterY = forceCenterY
        this.simulation = this.initializeSimulation()
    }

    initializeSimulation() {
        return d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(Env.CHARGE))
            .force("center", d3.forceCenter(this.forceCenterX, this.forceCenterY))
            .force("y", d3.forceY(0).strength(Env.GRAVITY))
            .force("x", d3.forceX(0).strength(Env.GRAVITY))
            .nodes([])
            .force("link",
                d3.forceLink()
                    .links([])
                    .distance((l) => {
                        return this.getEdgeDistance(l);
                    })
                    .strength(Env.EDGE_STRENGTH)
            )
            .on("tick", () => { this.ee.trigger(EventEnum.ENGINE_TICK) })
    }

    updateSimulation(nodes, edges) {
        this.simulation.nodes(nodes)
        this.simulation.force("link",
            d3.forceLink()
                .links(edges)
                .distance((l) => {
                    return this.getEdgeDistance(l);
                })
                .strength(Env.EDGE_STRENGTH)
        )
        this.simulation.alpha(1).restart()
    }

    stop() {
        this.simulation.stop()
    }

    restart() {
        this.simulation.restart()
    }

    alpha(target) {
        this.simulation.alpha(target)
    }

    target(target) {
        this.simulation.alphaTarget(target)
    }

    decay(target) {
        this.simulation.alphaDecay(target)
    }

    createLayout(nodes, edges, attribute, filterFunction, sortFunction) {
        if (sortFunction) {
            nodes = nodes.sort((a, b) => sortFunction(a, b))
        }

        let allGroups
        if (filterFunction) {
            allGroups = nodes.map(node => filterFunction(node.data))
        }
        else {
            allGroups = nodes.map(node => node[attribute])
        }

        let xGroups = [...new Set(allGroups)]

        const numberOfRowsAndColumns = Math.ceil(Math.sqrt(xGroups.length))
        let currentRow = 0
        let currentColumn = 0
        const matrix = xGroups.map(() => {
            if (currentColumn === numberOfRowsAndColumns) {
                currentColumn = 0
                currentRow += 1
            }
            currentColumn += 1
            return [currentRow, currentColumn - 1]
        })

        const columnScale = d3.scalePoint()
            .domain([...Array(numberOfRowsAndColumns).keys()])
            .range([30, 2000]);

        const rowScale = d3.scalePoint()
            .domain([...Array(numberOfRowsAndColumns).keys()])
            .range([30, 2000]);

        this.simulation
            .force("x", d3.forceX((d) => {
                let value
                if (filterFunction) {
                    value = filterFunction(d.data)
                }
                else {
                    value = d[attribute]
                }
                return columnScale(matrix[xGroups.indexOf(value)][1])
            }))
            .force("y", d3.forceY((d) => {
                let value
                if (filterFunction) {
                    value = filterFunction(d.data)
                }
                else {
                    value = d[attribute]
                }
                return rowScale(matrix[xGroups.indexOf(value)][0])
            }))
            .force("link",
                d3.forceLink()
                    .links(edges)
                    .distance((l) => {
                        return this.getEdgeDistance(l);
                    })
                    .strength(0)
            )
            .force("charge", d3.forceManyBody().strength(-800))
            .alpha(1).restart()
    }

    resetLayout(nodes, edges) {
        this.simulation
            .force("y", d3.forceY(0).strength(Env.GRAVITY))
            .force("x", d3.forceX(0).strength(Env.GRAVITY))
            .force("link",
                d3.forceLink()
                    .links(edges)
                    .distance((l) => {
                        return this.getEdgeDistance(l);
                    })
                    .strength(Env.EDGE_STRENGTH)
            )
            .force("charge", d3.forceManyBody().strength(Env.CHARGE))
    }

    /* Returns the distance of the passed edge */
    getEdgeDistance(l) {
        const targetRadius = l.target.radius !== undefined ? l.target.radius : 0
        const sourceRadius = l.source.radius !== undefined ? l.source.radius : 0
        let distance = targetRadius + sourceRadius
        return distance + l.edgeDistance
    }

}