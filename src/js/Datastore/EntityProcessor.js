import EventEnum from "../Events/EventEnum"
import Env from "../Config/Env"

/**
 * The entity processor has two purposes
 * It is used to prepare data on nodes and edges so that it does not have to be calculated on the fly.
 * It is also used to manipulate the data stored on the objects to achieve certain effects (such as fixating coordinates)
 */
export default class EntityProcessor {
	constructor(eventEmitter, styles, userDefinedOptions) {
		this.style = styles

		this.fixedEdgeLabelWidth =
			userDefinedOptions.enableFixedEdgeLabelWidth !== undefined ? userDefinedOptions.enableFixedEdgeLabelWidth : Env.FIXED_EDGE_LABEL_WIDTH
		this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : Env.LABEL_WIDTH
		this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : Env.LABEL_WIDTH * 2

		this.ee = eventEmitter
		this.ee.on(EventEnum.NODE_FIXATION_REQUESTED, (node, x, y) => {
			this.repositionNode(node, x, y)
		})
		this.ee.on(EventEnum.DATASTORE_UPDATED, (nodes, edges) => {
			this.updateEdgeedNodeIDs(edges, nodes)
			this.updateEdgeDistances(edges)
			this.updateEdgeLabelWidths(edges)
			this.updateEdgeCounters(edges)
			this.updateNodeParameters(nodes)
			this.ee.trigger(EventEnum.DATA_PROCESSOR_FINISHED, nodes, edges)
		})
	}

	/**
	 * Fixate a node to a given position in the graph.
	 * @param {object} node - Node object to be fixated
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 */
	repositionNode(node, x, y) {
		node.fx = x
		node.fy = y
	}

	/**
	 * Translates node IDs to index IDs on edge objects. This is essentially only to satisfy the D3 force layout.
	 * @param {object[]} edges - Edges to be updated
	 * @param {object[]} nodes - List of all nodes
	 */
	updateEdgeedNodeIDs(edges, nodes) {
		edges.forEach(edge => {
			//D3 uses the index of the node as source and target. Convert from the ID specified
			edge.source = nodes.findIndex(node => node.id === edge.sourceNode)
			edge.target = nodes.findIndex(node => node.id === edge.targetNode)
			if (edge.source === undefined || edge.target === undefined) {
				console.error("Broken Edge", edge)
			}
		})
	}

	/**
	 * Updates the edge distances (lengths, essentially).
	 * @param {object[]} edges - Edges to be updated
	 */
	updateEdgeDistances(edges) {
		edges.forEach(edge => {
			if (this.style && this.style.edges) {
				const style = this.style.edges.find(style => style.id === edge.type)
				if (style && style.edgeDistance) {
					edge.edgeDistance = style.edgeDistance
				} else {
					edge.edgeDistance = Env.DEFAULT_VISIBLE_EDGE_DISTANCE
				}
			} else {
				edge.edgeDistance = Env.DEFAULT_VISIBLE_EDGE_DISTANCE
			}
		})
	}

	/**
	 * Updates the edge label width on a given array of edges.
	 * @param {object[]} edges -
	 */
	updateEdgeLabelWidths(edges) {
		edges.forEach(edge => {
			if (this.fixedEdgeLabelWidth) {
				edge.nameToWidth = this.edgeLabelWidth
				edge.nameFromWidth = this.edgeLabelWidth
			} else {
				if (edge.nameTo) {
					let width = edge.nameTo.width()
					width = width < this.maxEdgeLabelWidth ? width : this.maxEdgeLabelWidth
					edge.nameToWidth = width + Env.EDGE_LABEL_PADDING
				} else {
					edge.nameToWidth = this.edgeLabelWidth
				}
				if (edge.nameFrom) {
					let width = edge.nameTo.width()
					width = width < this.maxEdgeLabelWidth ? width : this.maxEdgeLabelWidth
					edge.nameFromWidth = width + Env.EDGE_LABEL_PADDING
				} else {
					edge.nameFromWidth = this.edgeLabelWidth
				}
			}
		})
	}

	/**
	 * Updates the edge counts for self-references and multi-references (to the same node).
	 * @param {object[]} edges
	 */
	updateEdgeCounters(edges) {
		edges.forEach(edge => {
			//Multi edge counter
			let i = 0
			if (isNaN(edge.multiEdgeCount)) {
				const sameEdges = []

				edges.forEach(otherEdge => {
					if (
						(edge.source === otherEdge.source && edge.target === otherEdge.target) ||
						(edge.target === otherEdge.source && edge.source === otherEdge.target)
					) {
						sameEdges.push(otherEdge)
					}
				})

				for (i = 0; i < sameEdges.length; i++) {
					sameEdges[i].multiEdgeCount = sameEdges.length
					sameEdges[i].multiEdgeIndex = i
				}
			}

			//Self edge counter
			if (isNaN(edge.selfEdgeCount)) {
				const selfEdges = []

				edges.forEach(otherEdge => {
					if (edge.source === otherEdge.source && edge.target === otherEdge.target) {
						selfEdges.push(otherEdge)
					}
				})

				for (i = 0; i < selfEdges.length; i++) {
					selfEdges[i].selfEdgeCount = selfEdges.length
					selfEdges[i].selfEdgeIndex = i
				}
			}
		})
	}

	/**
	 * Updates node parameters. This is for example in order to more easily access information such as radius, height, width, etc at runtime.
	 * @param {object[]} nodes
	 */
	updateNodeParameters(nodes) {
		nodes.forEach(node => {
			/* Init Radius and max text length values */
			if (this.style && this.style.nodes) {
				const style = this.style.nodes.find(style => style.id === node.type)
				if (style) {
					switch (style.shape) {
						case "circle":
						case "layeredCircle":
							node.radius = style.radius ? style.radius : Env.DEFAULT_CIRCLE_NODE_RADIUS
							node.maxTextWidth = 2 * node.radius
							node.shape = style.shape
							break

						case "rectangle":
							node.height = style.maxHeight ? style.maxHeight : Env.DEFAULT_RECTANGLE_MAX_HEIGHT
							node.width = style.maxWidth ? style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH
							node.maxTextWidth = style.maxWidth ? style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH
							node.shape = style.shape
							break

						default:
							//Use circle by default
							node.radius = style.radius ? style.radius : Env.DEFAULT_CIRCLE_NODE_RADIUS
							node.maxTextWidth = 2 * node.radius
							node.shape = style.shape
							break
					}
				} else {
					//Use 50r circle as default
					node.radius = Env.DEFAULT_CIRCLE_NODE_RADIUS
					node.maxTextWidth = 2 * node.radius
					node.shape = "circle"
				}
			} else {
				//Use 50r circle as default
				node.radius = Env.DEFAULT_CIRCLE_NODE_RADIUS
				node.maxTextWidth = 2 * node.radius
				node.shape = "circle"
			}
		})
	}
}
