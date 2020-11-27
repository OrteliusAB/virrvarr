import * as d3 from "d3"
import EventEnum from "../Events/EventEnum"
import Env from "../Config/Env"

/**
 * The Engine class is responsible for running the physics simulation of the graph.
 */
export default class Engine {
	constructor(forceCenterX, forceCenterY, eventEmitter) {
		this.ee = eventEmitter
		this.ee.on(EventEnum.DOM_PROCESSOR_FINISHED, (nodes, edges) => {
			this.updateSimulation(nodes, edges)
			this.ee.trigger(EventEnum.ENGINE_UPDATE_FINISHED, nodes, edges)
		})
		this.ee.on(EventEnum.NODE_DRAG_START, () => { this.stop(); this.target(0.5) })
		this.ee.on(EventEnum.NODE_DRAG_DRAGGED, () => { this.restart() })
		this.ee.on(EventEnum.NODE_DRAG_ENDED, () => { this.target(0) })
		this.ee.on(EventEnum.CLICK_ENTITY, () => { this.alpha(0) })
		this.ee.on(EventEnum.NODE_FIXATION_REQUESTED, () => { this.alpha(1); this.restart() })
		this.ee.on(EventEnum.ENGINE_LAYOUT_REQUESTED, (nodes, edges, attribute, filterFunction, sortFunction) => {
			this.createLayout(nodes, edges, attribute, filterFunction, sortFunction)
		})
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

	/**
	 * Start the simulation engine
	 */
	initializeSimulation() {
		return d3
			.forceSimulation()
			.force("charge", d3.forceManyBody().strength(Env.CHARGE))
			.force("center", d3.forceCenter(this.forceCenterX, this.forceCenterY))
			.force("y", d3.forceY(0).strength(Env.GRAVITY))
			.force("x", d3.forceX(0).strength(Env.GRAVITY))
			.nodes([])
			.force(
				"link",
				d3
					.forceLink()
					.links([])
					.distance(l => {
						return this.getEdgeDistance(l)
					})
					.strength(Env.EDGE_STRENGTH)
			)
			.on("tick", () => {
				this.ee.trigger(EventEnum.ENGINE_TICK)
			})
	}

	/**
	 * Update the simulation with a new data set
	 * @param {object[]} nodes
	 * @param {edges[]} edges
	 */
	updateSimulation(nodes, edges) {
		this.simulation.nodes(nodes)
		this.simulation.force(
			"link",
			d3
				.forceLink()
				.links(edges)
				.distance(l => {
					return this.getEdgeDistance(l)
				})
				.strength(Env.EDGE_STRENGTH)
		)
		this.simulation.alpha(1).restart()
	}

	/**
	 * Stop the simulation
	 */
	stop() {
		this.simulation.stop()
	}

	/**
	 * Restart the simulation
	 */
	restart() {
		this.simulation.restart()
	}

	/**
	 * Set the current alpha value of the simulation
	 * @param {number} target - Alpha value
	 */
	alpha(target) {
		this.simulation.alpha(target)
	}

	/**
	 * Set the target alpha value for the simulation
	 * @param {number} target - Alpha value
	 */
	target(target) {
		this.simulation.alphaTarget(target)
	}

	/**
	 * Set the alpha decay value of the simulation.
	 * @param {number} target - Alpha decay value
	 */
	decay(target) {
		this.simulation.alphaDecay(target)
	}

	/**
	 * Creates a force group layout and positions nodes in the different groups depending on given input.
	 * @param {object[]} nodes - All nodes to be affected
	 * @param {object[]} edges - All edges to be affected
	 * @param {string} attribute - Attribute to be used to determine the group of a node
	 * @param {Function} filterFunction - Optional filter function that can be used instead of the attribute. Should return a string that determines the group of the provided node.
	 * @param {Function} sortFunction - Optional sort function that will determine the order of the groups in the layout. Starting from left to right, top to bottom.
	 */
	createLayout(nodes, edges, attribute, filterFunction, sortFunction) {
		if (sortFunction) {
			nodes = nodes.sort((a, b) => sortFunction(a, b))
		}

		let allGroups
		if (filterFunction) {
			allGroups = nodes.map(node => filterFunction(node.data))
		} else {
			allGroups = nodes.map(node => node[attribute])
		}

		const xGroups = [...new Set(allGroups)]

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

		const columnScale = d3
			.scalePoint()
			.domain([...Array(numberOfRowsAndColumns).keys()])
			.range([30, 2000])

		const rowScale = d3
			.scalePoint()
			.domain([...Array(numberOfRowsAndColumns).keys()])
			.range([30, 2000])

		this.simulation
			.force(
				"x",
				d3.forceX(d => {
					let value
					if (filterFunction) {
						value = filterFunction(d.data)
					} else {
						value = d[attribute]
					}
					return columnScale(matrix[xGroups.indexOf(value)][1])
				})
			)
			.force(
				"y",
				d3.forceY(d => {
					let value
					if (filterFunction) {
						value = filterFunction(d.data)
					} else {
						value = d[attribute]
					}
					return rowScale(matrix[xGroups.indexOf(value)][0])
				})
			)
			.force(
				"link",
				d3
					.forceLink()
					.links(edges)
					.distance(l => {
						return this.getEdgeDistance(l)
					})
					.strength(0)
			)
			.force("charge", d3.forceManyBody().strength(-800))
			.alpha(1)
			.restart()
	}

	/**
	 * Resets the force layout to its default mode and removes any existing groups.
	 * @param {object[]} nodes - Nodes affected
	 * @param {object[]} edges - Edges affected
	 */
	resetLayout(nodes, edges) {
		this.simulation
			.force("y", d3.forceY(0).strength(Env.GRAVITY))
			.force("x", d3.forceX(0).strength(Env.GRAVITY))
			.force(
				"link",
				d3
					.forceLink()
					.links(edges)
					.distance(l => {
						return this.getEdgeDistance(l)
					})
					.strength(Env.EDGE_STRENGTH)
			)
			.force("charge", d3.forceManyBody().strength(Env.CHARGE))
	}

	/**
	 * Returns the distance (length) of the passed edge
	 * @param {object} l - Edge
	 */
	getEdgeDistance(l) {
		const targetRadius = l.target.radius !== undefined ? l.target.radius : 0
		const sourceRadius = l.source.radius !== undefined ? l.source.radius : 0
		const distance = targetRadius + sourceRadius
		return distance + l.edgeDistance
	}
}
