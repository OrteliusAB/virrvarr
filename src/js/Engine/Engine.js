import * as d3 from "d3"
import EventEnum from "../Events/EventEnum"
import Env from "../Config/Env"
import boundingBoxForce from "./forces/boundingBoxForce"
import clusterForce from "./forces/clusterForce"
import hierarchyForce from "./forces/hierarchyForce"
import gridForce from "./forces/gridForce"
import matrixForce from "./forces/matrixForce"
import treemapForce from "./forces/treemapForce"

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
		this.ee.on(EventEnum.NODE_DRAG_START, () => {
			this.stop()
			this.target(0.2)
		})
		this.ee.on(EventEnum.NODE_DRAG_DRAGGED, () => {
			this.restart()
		})
		this.ee.on(EventEnum.NODE_DRAG_ENDED, () => {
			this.target(0)
		})
		this.ee.on(EventEnum.CLICK_ENTITY, () => {
			this.alpha(0)
		})
		this.ee.on(EventEnum.ENGINE_LAYOUT_REQUESTED, (layout, options) => {
			this.setLayout(layout, options ? options : {})
		})
		this.ee.on(EventEnum.ENGINE_LAYOUT_RESET_REQUESTED, () => {
			this.clearLayout()
			this.alpha(2)
			this.restart()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_REQUESTED, () => {
			this.alpha(0.5)
			this.restart()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_LEAFS_REQUESTED, () => {
			this.alpha(0.5)
			this.restart()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, () => {
			this.alpha(0.5)
			this.restart()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, () => {
			this.alpha(0.5)
			this.restart()
		})
		this.ee.on(EventEnum.TOGGLE_MULTIPLICITY_REQUESTED, () => {
			this.softRestart()
		})
		this.ee.on(EventEnum.LASSO_ENTER, () => {
			this.softRestart()
		})
		this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.stop())
		this.forceCenterX = forceCenterX
		this.forceCenterY = forceCenterY
		this.linkForce = d3
			.forceLink()
			.distance(edge => {
				return this.getEdgeDistance(edge)
			})
			.strength(Env.EDGE_STRENGTH)
		this.simulation = this.initializeSimulation()
	}

	/**
	 * Lightly pokes the graph. This can be used if you want to trigger a tick.
	 */
	softRestart() {
		this.alpha(0.001)
		this.restart()
	}

	/**
	 * Start the simulation engine
	 */
	initializeSimulation() {
		return d3
			.forceSimulation()
			.force("charge", d3.forceManyBody().strength(Env.CHARGE).distanceMax(Env.CHARGE_MAX_DISTANCE))
			.force(
				"collide",
				d3
					.forceCollide()
					.radius(d => (d.width ? Math.max(d.width, d.height) / 2 + 5 : d.radius + 5))
					.strength(1)
					.iterations(1)
			)
			.force("y", d3.forceY(this.forceCenterX).strength(Env.GRAVITY))
			.force("x", d3.forceX(this.forceCenterY).strength(Env.GRAVITY))
			.nodes([])
			.force("link", this.linkForce)
			.on("tick", () => {
				this.ee.trigger(EventEnum.ENGINE_TICK)
			})
	}

	enableCenterForce() {
		this.simulation.force("center", d3.forceCenter(this.forceCenterX, this.forceCenterY))
	}

	disableCenterForce() {
		this.simulation.force("center", null)
	}

	setBoundingBox(width, height) {
		this.simulation.force("boundingbox", boundingBoxForce(width, height))
		this.alpha(1)
		this.restart()
	}

	removeBoundingBox() {
		this.simulation.force("boundingbox", null)
		this.alpha(1)
		this.restart()
	}

	setLayout(layout, options) {
		this.clearLayoutGUI()
		switch (layout) {
			case "hierarchy":
				this.simulation.force("layout", hierarchyForce(options.groupBy, options.useY, options.distance))
				this.linkForce.strength(Env.EDGE_STRENGTH)
				break
			case "grid":
				this.simulation.force("layout", gridForce(options.useY, options.useX, options.strength, options.size, options.multiplier))
				this.linkForce.strength(0.1)
				break
			case "matrix":
				this.simulation.force("layout", matrixForce(options.groupBy, options.strength))
				this.linkForce.strength(0)
				break
			case "cluster":
				this.simulation.force("layout", clusterForce(options.groupBy, options.strength))
				this.linkForce.strength(0)
				break
			case "treemap":
				this.simulation.force("layout", treemapForce(options.groupBy, options.width, options.height, options.strength))
				this.linkForce.strength(0)
				break
			case "radial":
				this.simulation.force(
					"layout",
					d3
						.forceRadial()
						.strength(options.strength ? options.strength : 0.9)
						.x(this.forceCenterX)
						.y(this.forceCenterY)
						.radius(() => (options.radius ? options.radius : 1400))
				)
				this.linkForce.strength(0)
				break
			default:
				this.simulation.force("layout", null)
				this.linkForce.strength(Env.EDGE_STRENGTH)
				break
		}
		this.alpha(1)
		this.restart()
	}

	clearLayout() {
		this.clearLayoutGUI()
		this.simulation.force("layout", null)
		this.linkForce.strength(Env.EDGE_STRENGTH)
		this.alpha(1)
		this.restart()
	}

	clearLayoutGUI() {
		d3.select("#layout-extras").selectAll("*").remove()
	}

	/**
	 * Update the simulation with a new data set
	 * @param {object[]} nodes
	 * @param {edges[]} edges
	 */
	updateSimulation(nodes, edges) {
		this.simulation.nodes(nodes)
		this.linkForce.links(edges)
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
