import * as d3 from "d3"
import EventEnum from "../Events/EventEnum"
import Env from "../Config/Env"
import boundingBoxForce from "./forces/boundingBoxForce"
import clusterForce from "./forces/clusterForce"
import hierarchyForce from "./forces/hierarchyForce"
import gridForce from "./forces/gridForce"
import matrixForce from "./forces/matrixForce"
import treemapForce from "./forces/treemapForce"
import radialForce from "./forces/radialForce"
import fanForce from "./forces/fanForce"
import adjacencyMatrixForce from "./forces/adjacencyMatrixForce"
import tableForce from "./forces/tableForce"

/**
 * The Engine class is responsible for running the physics simulation of the graph.
 */
export default class Engine {
	constructor(forceCenterX, forceCenterY, graphContainerElement, eventEmitter) {
		this.layoutElement = graphContainerElement.querySelector("#layout-extras")
		this.edges = []
		this.ee = eventEmitter
		this.ee.on(EventEnum.DOM_PROCESSOR_FINISHED, (nodes, edges) => {
			this.edges.splice(0, this.edges.length)
			edges.forEach(edge => this.edges.push(edge))
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
		this.forceMap = new Map()
		this.registerForce("boundingBox", boundingBoxForce)
		this.registerForce("cluster", clusterForce)
		this.registerForce("hierarchy", hierarchyForce)
		this.registerForce("grid", gridForce)
		this.registerForce("matrix", matrixForce)
		this.registerForce("treemap", treemapForce)
		this.registerForce("radial", radialForce)
		this.registerForce("fan", fanForce)
		this.registerForce("adjacencymatrix", adjacencyMatrixForce)
		this.registerForce("table", tableForce)
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
			.force("charge", d3.forceManyBody().strength(Env.CHARGE).distanceMax(Env.CHARGE_MAX_DISTANCE).theta(1.1))
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
				this.simulation.force("layout", this.forceMap.get("hierarchy")(options.groupBy, options.useY, options.distance, options.useLine))
				this.linkForce.strength(Env.EDGE_STRENGTH)
				break
			case "adjacencymatrix":
				this.simulation.force("layout", this.forceMap.get("adjacencymatrix")())
				this.linkForce.strength(0)
				break
			case "grid":
				this.simulation.force("layout", this.forceMap.get("grid")(options.useY, options.useX, options.strength, options.size, options.multiplier))
				this.linkForce.strength(0.1)
				break
			case "matrix":
				this.simulation.force("layout", this.forceMap.get("matrix")(options.groupBy, options.strength))
				this.linkForce.strength(0)
				break
			case "cluster":
				this.simulation.force("layout", this.forceMap.get("cluster")(options.groupBy, options.strength, options.showOutline))
				this.linkForce.strength(0)
				break
			case "treemap":
				this.simulation.force("layout", this.forceMap.get("treemap")(options.groupBy, options.width, options.height, options.strength))
				this.linkForce.strength(0)
				break
			case "radial":
				this.simulation.force("layout", this.forceMap.get("radial")(options.groupBy, options.strength))
				this.linkForce.strength(0)
				break
			case "table":
				this.simulation.force("layout", this.forceMap.get("table")(options.headers, options.getData))
				this.linkForce.strength(0)
				break
			case "fan":
				this.simulation.force("layout", this.forceMap.get("fan")(options.groupBy, options.strength))
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

	/**
	 * Add a force to the simulation
	 * @param {string} forceID - ID of the force to add
	 * @param {string} forceName - Identifier for the force within the simulation
	 * @param {any} forceOptions - Options for the force
	 */
	addForce(forceID, forceName, forceOptions) {
		if (!this.forceMap.has(forceID)) {
			console.error("Force does not exists: ", forceID)
			return
		}
		this.simulation.force(forceName, this.forceMap.get(forceID)(forceOptions))
		this.alpha(1)
		this.restart()
	}

	/**
	 * Removes a force from the simulation
	 * @param {string} forceName - Identifier for the force within the simulation
	 */
	removeForce(forceName) {
		this.clearLayoutGUI()
		this.simulation.force(forceName, null)
		this.alpha(1)
		this.restart()
	}

	/**
	 * Registers a new force in the engine.
	 * @param {string} id - Identifier for the force type
	 * @param {Function} forceFunction - Force compatible function
	 * @returns
	 */
	registerForce(id, forceFunction) {
		if (this.forceMap.has(id)) {
			console.error("Force already exists: ", id)
			return
		}
		const forceWrapper = (...args) => {
			const force = forceFunction(...args)
			if (force.element) {
				const layoutGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
				layoutGroup.id = id
				this.layoutElement.appendChild(layoutGroup)
				force.element(layoutGroup)
			}
			if (force.edges) {
				force.edges(this.edges)
			}
			return force
		}
		this.forceMap.set(id, forceWrapper)
		return forceWrapper
	}

	/**
	 * Ends the main layout force
	 */
	clearLayout() {
		this.clearLayoutGUI()
		this.simulation.force("layout", null)
		this.linkForce.strength(Env.EDGE_STRENGTH)
		this.alpha(1)
		this.restart()
	}

	/**
	 * Clears the entire layout GUI
	 */
	clearLayoutGUI() {
		d3.select(this.layoutElement).selectAll("g").selectAll("*").remove()
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
