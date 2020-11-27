import EventEnum from "../Events/EventEnum"

/* TODO:: Implement deep clone utility instead of JSON.stringify/parse */
/**
 * The data store class is responsible to storing and managing all edges and nodes.
 * The data store decides what nodes and edges are live, as well as makes sure they have the correct data set on them.
 */
export default class Datastore {
	constructor(nodes, edges, eventEmitter) {
		this.allNodes = JSON.parse(JSON.stringify(nodes))
		this.allEdges = JSON.parse(JSON.stringify(edges))
		this.liveNodes = this.allNodes
		this.liveEdges = this.allEdges
		this.filters = {
			nodes: [],
			edges: []
		}
		this.ee = eventEmitter
		this.ee.on(EventEnum.DATA_UPDATE_REQUESTED, (nodes, edges) => this.updateDataset(nodes, edges))
		this.ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
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
			this.updateLiveData()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_LEAFS_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNodeLeafs(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.updateLiveData()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNodeRecursive(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.updateLiveData()
		})
		this.ee.on(EventEnum.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, (id, isImplode) => {
			this.implodeOrExplodeNodeNonCircular(id, isImplode)
			this.updateNumberOfHiddenEdgesOnNodes()
			this.updateLiveData()
		})
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

		return {
			updatedNodes: nodes,
			updatedEdges: edges
		}
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
