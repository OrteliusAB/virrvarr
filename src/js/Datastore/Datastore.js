import EventEnum from "../Events/EventEnum"
import EntityProcessor from "./EntityProcessor"
import VVNode from "../Model/Node"
import VVEdge from "../Model/Edge"

/**
 * The data store class is responsible to storing and managing all edges and nodes.
 * The data store decides what nodes and edges are live, as well as makes sure they have the correct data set on them.
 */
export default class Datastore {
	constructor(nodes, edges, eventEmitter, styles, userDefinedOptions) {
		this.allNodes = nodes.map(node => new VVNode(node.id, node.type, node.name, node.icon, node.data))
		this.allEdges = edges.map(edge => new VVEdge(
			edge.id,
			edge.type,
			edge.sourceNode,
			edge.targetNode,
			edge.nameFrom,
			edge.nameTo,
			edge.multiplicityFrom,
			edge.multiplicityTo,
			edge.data
		))
		this.liveNodes = this.allNodes
		this.liveEdges = this.allEdges
		this.filters = {
			nodes: [],
			edges: []
		}
		this.ee = eventEmitter
		this.ee.on(EventEnum.DATA_UPDATE_REQUESTED, (nodes, edges) => this.updateDataset(nodes, edges))
		this.ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
			this.entityProcessor.executePreProcessor(this.nodes, this.edges)
			this.ee.trigger(EventEnum.DATASTORE_UPDATED, this.nodes, this.edges)
		})
		this.ee.on(EventEnum.DATA_FILTER_REQUESTED, filters => {
			this.setFilters(filters)
			this.applyFilters()
			this.updateNumberOfHiddenEdgesOnNodes()
			this.updateLiveData()
		})
		this.ee.on(EventEnum.DATA_FILTER_RESET_REQUESTED, () => {
			this.resetAllFilters()
			this.applyFilters()
			this.updateNumberOfHiddenEdgesOnNodes()
			this.updateLiveData()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNode(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.implodeExplodedNodesAnimation(id, isImplode)
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_LEAFS_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNodeLeafs(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.implodeExplodedNodesAnimation(id, isImplode)
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNodeRecursive(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.implodeExplodedNodesAnimation(id, isImplode)
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNodeNonCircular(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.implodeExplodedNodesAnimation(id, isImplode)
		})
		this.entityProcessor = new EntityProcessor(this.ee, styles, userDefinedOptions)
		this.updateEdgeIDs()
		this.applyFilters()
		this.updateNumberOfHiddenEdgesOnNodes()
	}

	/**
	 * Will always return only what data is currently live
	 */
	get edges() {
		return this.liveEdges
	}

	/**
	 * Will always return only what data is currently live
	 */
	get nodes() {
		return this.liveNodes
	}

	/**
	 * Bootstraps the update animation for implosion and explosions of nodes, and ensures things happen a correct order
	 */
	implodeExplodedNodesAnimation(id, isImplode) {
		const rootNode = this.getNodeByID(id)
		this.stageNodePositions(isImplode ? null : rootNode.x, isImplode ? null : rootNode.y, isImplode ? rootNode.x : null, isImplode ? rootNode.y : null)
		if (isImplode) {
			this.entityProcessor.animateNodePositions(this.allNodes).then(() => {
				this.updateLiveData()
			})
		} else {
			this.updateLiveData()
			this.entityProcessor.animateNodePositions(this.allNodes)
		}
	}

	/**
	 * If there are edges that lack IDs this function will set these to a number that represents the index in the edge array.
	 */
	updateEdgeIDs() {
		this.allEdges.forEach((edge, edgeIndex) => {
			if (edge.id === undefined) {
				edge.id = edgeIndex
			}
		})
	}

	/**
	 * Updates the data in the data store.
	 * @param {object[]} newNodes - All nodes to be included in the new data set
	 * @param {object[]} newEdges - All edges to be included in the new data set
	 */
	updateDataset(newNodes, newEdges) {
		const nodes = JSON.parse(JSON.stringify(newNodes))
		const edges = JSON.parse(JSON.stringify(newEdges))
		this.allNodes = nodes
		this.allEdges = edges
		this.updateEdgeIDs()
		this.applyFilters()
		this.updateNumberOfHiddenEdgesOnNodes()
		this.updateLiveData()
	}

	/**
	 * Retrieves a node object by its ID
	 * @param {string} ID - ID of the node
	 * @return {object|null} - Node object or null
	 */
	getNodeByID(ID) {
		return this.allNodes.find(node => node.id === ID)
	}

	/**
	 * Retrieves an edge object by its ID
	 * @param {string} ID - ID of the edge
	 * @return {object|null} - Edge object or null
	 */
	getEdgeByID(ID) {
		return this.allEdges.find(edge => edge.id === ID)
	}

	/**
	 * Clears all filters
	 */
	resetAllFilters() {
		this.filters = {
			nodes: [],
			edges: []
		}
	}

	/**
	 * Stores new filters, overwriting and clearing any existing ones. Note that this function not apply the filters.
	 * @param {object[]} filters - Array of filters to be set
	 */
	setFilters(filters) {
		const nodeFilters = []
		const edgeFilters = []
		filters.forEach(filter => {
			if (filter.entityType === "node") {
				nodeFilters.push({
					attribute: filter.attribute,
					value: filter.value,
					function: filter.filterFunction
				})
			} else if (filter.entityType === "edge") {
				edgeFilters.push({
					attribute: filter.attribute,
					value: filter.value,
					function: filter.filterFunction
				})
			} else {
				throw new Error("No such entity type for filters:", filter.entityType)
			}
		})
		this.filters.nodes = nodeFilters
		this.filters.edges = edgeFilters
	}

	/**
	 * Applies all defined filters to the dataset
	 */
	applyFilters() {
		this.allNodes.forEach(node => {
			let isFiltered = false
			this.filters.nodes.forEach(filter => {
				if (!isFiltered) {
					if (filter.filterFunction) {
						isFiltered = filter.filterFunction(node.data)
					} else if (node[filter.attribute] === filter.value) {
						isFiltered = true
					}
				}
			})
			node.isFiltered = isFiltered
		})

		this.allEdges.forEach(edge => {
			let isFiltered = false
			this.filters.edges.forEach(filter => {
				if (!isFiltered) {
					if (filter.filterFunction) {
						isFiltered = filter.filterFunction(edge.data)
					} else if (edge[filter.attribute] === filter.value) {
						isFiltered = true
					}
				}
			})

			//If nodes have been removed there could be broken edges. Mark these as filtered as well.
			const foundSource = this.allNodes.find(node => edge.sourceNode === node.id && !node.isFiltered)
			const foundTarget = this.allNodes.find(node => edge.targetNode === node.id && !node.isFiltered)
			if (!foundSource || !foundTarget) {
				isFiltered = true
			}

			edge.isFiltered = isFiltered
		})
	}

	/**
	 * Creates source and target coordinates for nodes that are staged to go live from an implosion/explosion.
	 * The result of this function is primarily used to animate the graph into a new state
	 * @param {number?} rootX - Start position for the transition
	 * @param {number?} rootY - Start position for the transition
	 * @param {number?} targetX - End position for the transition
	 * @param {number?} targetY - End position for the transition
	 */
	stageNodePositions(rootX, rootY, targetX, targetY) {
		if (!rootX && !targetX) {
			return
		}
		if (targetX && !rootX) {
			const nodes = this.allNodes.filter(node => !this.isNodeLive(node) && this.liveNodes.find(onScreenNode => onScreenNode.id === node.id))
			nodes.forEach(node => {
				node.targetX = targetX
				node.targetY = targetY
				node.sourceX = node.x
				node.sourceY = node.y
			})
		} else if (rootX && !targetX) {
			const nodes = this.allNodes.filter(node => this.isNodeLive(node) && !this.liveNodes.find(onScreenNode => onScreenNode.id === node.id))
			const leafAncestryMap = {}
			const connectionMap = {}
			nodes.forEach(node => {
				const connectedNodes = this.allEdges
					.filter(edge => (edge.targetNode === node.id || edge.sourceNode === node.id) && edge.targetNode !== edge.sourceNode)
					.map(edge =>
						edge.sourceNode === node.id
							? { node: this.getNodeByID(edge.targetNode), edgeDistance: edge.edgeDistance }
							: { node: this.getNodeByID(edge.sourceNode), edgeDistance: edge.edgeDistance }
					)
					.filter(connectedNode => this.liveNodes.includes(connectedNode.node))
					.reduce((acc, connectedNode) => {
						if (!acc.map(connection => connection.node.id).includes(connectedNode.node.id)) {
							acc.push(connectedNode)
						}
						return acc
					}, [])
				connectionMap[node.id] = connectedNodes
				if (connectedNodes.length === 1) {
					Array.isArray(leafAncestryMap[connectedNodes[0].node.id])
						? leafAncestryMap[connectedNodes[0].node.id].push(node.id)
						: (leafAncestryMap[connectedNodes[0].node.id] = [node.id])
				}
			})
			nodes.forEach(node => {
				node.sourceX = rootX + 2 //I can't be the exact point of the root or there will be divisional errors
				node.sourceY = rootY + 2
				if (connectionMap[node.id].length === 1) {
					const multiplier = leafAncestryMap[connectionMap[node.id][0].node.id].indexOf(node.id) + 1
					const divider = leafAncestryMap[connectionMap[node.id][0].node.id].length
					const angle = Math.floor((359 / divider) * multiplier)
					node.targetX = connectionMap[node.id][0].node.x + connectionMap[node.id][0].edgeDistance * 2 * Math.cos((angle * Math.PI) / 180)
					node.targetY = connectionMap[node.id][0].node.y + connectionMap[node.id][0].edgeDistance * 2 * Math.sin((angle * Math.PI) / 180)
				} else if (connectionMap[node.id].length === 0) {
					node.targetX = 0
					node.targetY = 0
				} else {
					node.targetX =
						connectionMap[node.id].reduce((acc, connection) => {
							return acc + connection.node.x
						}, 0) / connectionMap[node.id].length
					node.targetY =
						connectionMap[node.id].reduce((acc, connection) => {
							return acc + connection.node.y
						}, 0) / connectionMap[node.id].length
				}
			})
		}
	}

	/**
	 * Updates the live data by filtering non-relevant nodes and edges
	 */
	updateLiveData() {
		const nodes = this.allNodes.filter(node => this.isNodeLive(node))
		const edges = this.allEdges.filter(edge => this.isEdgeLive(edge))

		//Apply the result to the live data
		//Sidenote: the reason we don't just overwrite the live data is because that messes with D3s object references
		nodes.forEach(newNode => {
			if (!this.liveNodes.find(oldNode => oldNode.id === newNode.id)) {
				this.liveNodes.push(newNode)
			}
		})
		this.liveNodes = this.liveNodes.filter(oldNode => {
			return nodes.find(newNode => oldNode.id === newNode.id)
		})

		edges.forEach(newEdge => {
			if (!this.liveEdges.find(oldEdge => oldEdge.id === newEdge.id)) {
				this.liveEdges.push(newEdge)
			}
		})
		this.liveEdges = this.liveEdges.filter(oldEdge => {
			return edges.find(newEdge => oldEdge.id === newEdge.id)
		})

		this.entityProcessor.executePreProcessor(this.nodes, this.edges)
		this.ee.trigger(EventEnum.DATASTORE_UPDATED, this.nodes, this.edges)
	}

	/**
	 * Updates the counter on all nodes that has information about how many hidden edges it is a source to
	 */
	updateNumberOfHiddenEdgesOnNodes() {
		//Write number of hidden edges to nodes
		this.allNodes.forEach(node => {
			if (node.isHidden || node.isFiltered) {
				//Node is not live
				node.hiddenEdgeCount = null
				return
			}
			node.hiddenEdgeCount = this.allEdges.filter(edge => edge.isHidden && !edge.isFiltered && edge.sourceNode === node.id).length
		})
	}

	/**
	 * Checks if a node is live or not.
	 * @param {object} node - Node object to be evaluated
	 * @return {boolean} - isLive?
	 */
	isNodeLive(node) {
		return !node.isHidden && !node.isFiltered
	}

	/**
	 * Checks if an edge is live or not.
	 * @param {object} node - Edge object to be evaluated
	 * @return {boolean} - isLive?
	 */
	isEdgeLive(edge) {
		return !edge.isHidden && !edge.isFiltered
	}

	/**
	 * Sets given nodes and edges to a specified hidden status.
	 * @param {object[]} nodes - Array of node objects
	 * @param {object[]} edges - Array of edge objects
	 * @param {boolean} status - Status to be set, true if hidden, false if not
	 */
	setNodesAndEdgesHiddenStatus(nodes, edges, status) {
		nodes.forEach(node => (node.isHidden = status))
		edges.forEach(edge => (edge.isHidden = status))
	}

	/**
	 * Sets all nodes connected to the provided root node to hidden=true/false (in the TO direction)
	 * @param {string} rootNodeID - ID of the root node of the operation
	 * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
	 * @return {object} - Affected nodes and edges
	 */
	implodeOrExplodeNode(rootNodeID, isImplode) {
		const connectedEdges = this.allEdges.filter(edge => edge.sourceNode === rootNodeID)
		const connectedNodes = connectedEdges.map(edge => edge.targetNode).filter(node => node !== rootNodeID)
		const collateralEdges = this.allEdges.filter(edge => {
			if (connectedNodes.includes(edge.sourceNode) && connectedNodes.includes(edge.targetNode)) {
				//Processed nodes connecting to each other. This should always be included.
				return true
			} else if (connectedNodes.includes(edge.sourceNode)) {
				//Going outwards
				return this.isNodeLive(this.getNodeByID(edge.targetNode))
			} else if (connectedNodes.includes(edge.targetNode)) {
				//Going inwards
				return this.isNodeLive(this.getNodeByID(edge.sourceNode))
			} else {
				return false
			}
		})

		const edges = [...connectedEdges, ...collateralEdges]
		const nodes = connectedNodes.map(nodeID => this.getNodeByID(nodeID))
		this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode)

		return {
			updatedNodes: nodes,
			updatedEdges: edges
		}
	}

	/**
	 * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) where no further branching continues.
	 * @param {string} rootNodeID - ID of the root node of the operation
	 * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
	 * @return {object} - Affected nodes and edges
	 */
	implodeOrExplodeNodeLeafs(rootNodeID, isImplode) {
		const connectedEdges = this.allEdges
			.filter(edge => edge.sourceNode === rootNodeID)
			.filter(edge => !this.allEdges.find(secondaryEdge => secondaryEdge.sourceNode === edge.targetNode))
		const connectedNodes = connectedEdges.map(edge => edge.targetNode)
		const collateralEdges = this.allEdges.filter(edge => connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode))

		const edges = [...connectedEdges, ...collateralEdges]
		const nodes = connectedNodes.map(nodeID => this.getNodeByID(nodeID))

		this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode)

		return {
			updatedNodes: nodes,
			updatedEdges: edges
		}
	}

	/**
	 * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) recursively until it reaches the end of the tree.
	 * @param {string} rootNodeID - ID of the root node of the operation
	 * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
	 * @param {string[]} processedNodeIDs - IDs that have been processed. Generally would not set this manually when calling the function.
	 */
	implodeOrExplodeNodeRecursive(nodeID, isImplode, processedNodeIDs = []) {
		if (!processedNodeIDs.includes(nodeID)) {
			processedNodeIDs.push(nodeID)
			const { updatedNodes } = this.implodeOrExplodeNode(nodeID, isImplode)
			updatedNodes.forEach(node => this.implodeOrExplodeNodeRecursive(node.id, isImplode, processedNodeIDs))
		}
	}

	/**
	 * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction)
	 * recursively until it reaches the end of the tree, but only for branches that don't create circular references back.
	 * (to avoid imploding the entire tree on highly interconnected data)
	 * @param {string} rootNodeID - ID of the root node of the operation
	 * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
	 * @return {object} - Affected nodes and edges
	 */
	implodeOrExplodeNodeNonCircular(rootNodeID, isImplode) {
		const connectedEdges = this.allEdges
			.filter(edge => edge.sourceNode === rootNodeID)
			.filter(edge => this.calculateEdgePathFromNodeToNode(edge.targetNode, rootNodeID).length === 0)
		const connectedNodes = connectedEdges.map(edge => edge.targetNode)
		const collateralEdges = this.allEdges.filter(edge => connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode))

		const edges = [...connectedEdges, ...collateralEdges]
		const nodes = connectedNodes.map(nodeID => this.getNodeByID(nodeID))

		this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode)
		connectedNodes.forEach(nodeID => this.implodeOrExplodeNodeRecursive(nodeID, isImplode))
	}

	/**
	 * Calculates the shortest path from one node to another. Returns an array with the nodeIDs, or an empty array if there is no path.
	 * @param {string} nodeIDFrom - Node ID where the road starts
	 * @param {string} nodeIDTo - Node ID where the road ends
	 * @param {string[]} path - The current path, typically you provide this as undefined
	 * @param {string[]} crossedNodes - Nodes that have already been seen, typically you provide this as undefined
	 * @return {string[]} - Shortest path
	 */
	calculateEdgePathFromNodeToNode(nodeIDFrom, nodeIDTo, path = [], crossedNodes = []) {
		let result = []
		if (!crossedNodes.includes(nodeIDFrom)) {
			if (nodeIDFrom === nodeIDTo) {
				path.push(nodeIDTo)
				return path
			}
			path.push(nodeIDFrom)
			crossedNodes.push(nodeIDFrom)
			const nextSteps = this.allEdges.filter(edge => edge.sourceNode === nodeIDFrom)
			nextSteps.forEach(node => {
				const pathCopy = [...path]
				const potentialPath = this.calculateEdgePathFromNodeToNode(node, nodeIDTo, pathCopy, crossedNodes)
				if (potentialPath.length > 0) {
					result = potentialPath
				}
			})
		}
		return result
	}
}
