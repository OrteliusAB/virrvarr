import "./Utils/Protoypes"
import Datastore from "./Datastore/Datastore"
import EventEmitter from "./Events/EventEmitter"
import UI from "./UI/UI"
import Engine from "./Engine/Engine"
import EventEnum from "./Events/EventEnum"

/**
 * The main graph class
 */
export class Virrvarr {
	/**
	 * Main constructor
	 * @param {HTMLElement} graphContainerElement - Element that the graph should mount in
	 * @param {object} inputData - Data that the graph should display
	 * @param {object} options - Optional configuration for the graph
	 * @param {boolean} options.enableGrid - Should the grid background pattern be enabled?
	 * @param {boolean} options.enableFadeOnHover - Should nodes and edges that are not directly connected to a hovered node be faded out when said node is hovered?
	 * @param {boolean} options.enableZoomButtons - Should zoom buttons be enabled?
	 * @param {boolean} options.enableScaleGridOnZoom - Should the grid scale with the zoom?
	 * @param {boolean} options.enableContextMenu - Should the conext menu be enabled?
	 * @param {Function} options.entityClickedListener - Click listener for entities.
	 * @param {Function} options.entityDoubleClickedListener - Double click listener for entities.
	 * @param {Function} options.entityHoveredListener - Hover listener for entities.
	 * @param {boolean} options.enableFixedEdgeLabelWidth - Should edge label width be fixed? Note that you need to provide the edgeLabelWidth option together with this option.
	 * @param {number} options.edgeLabelWidth - Default edge label width.
	 * @param {number} options.maxEdgeLabelWidth - Maximum edge label width.
	 * @param {object} options.customContextMenu - Custom context menu.
	 * @param {boolean} options.enableMultiLineNodeLabels - Allow node names to take up two lines.
	 * @param {rotateLabels} options.customContextMenu - Make edge labels perpendicular to the edge.
	 * @param {boolean} options.enableOnionOnFocus - Should nodes and edge labels get an onion border on focus (selection)?
	 * @param {boolean} options.enableOnionOnHover - Should nodes and edge labels get an onion border on hover?
	 * @param {number} options.onionNumberOfLayers - How many layers should onion borders have by default?
	 * @param {string} options.onionBaseColor - What should the base color be of the onion borders?
	 * @param {number} options.onionLayerSize - How big should each layer in the onion border be by default?
	 *
	 */
	constructor(graphContainerElement, inputData, options) {
		/* Init user input */
		this._options = Object.assign.apply(Object, [{}].concat(options))
		this._style = inputData.style ? JSON.parse(JSON.stringify(inputData.style)) : {}

		/* Init EventEmitter */
		this._ee = new EventEmitter()
		//If the user specified listeners in options then add them
		this._options.entityClickedListener && this._ee.on(EventEnum.CLICK_ENTITY, this._options.entityClickedListener)
		this._options.entityDoubleClickedListener && this._ee.on(EventEnum.DBL_CLICK_ENTITY, this._options.entityDoubleClickedListener)
		this._options.entityHoveredListener && this._ee.on(EventEnum.HOVER_ENTITY, this._options.entityHoveredListener)

		/* Init UI */
		this._UI = new UI(graphContainerElement, this._ee, this._style, options)

		/* Init Datastore */
		this._datastore = new Datastore(inputData.nodes, inputData.edges, this._ee, this._style, this._options)

		/* Init Engine */
		this._engine = new Engine(this._UI.width / 2, this._UI.height / 2, this._ee)

		/* Graph has mounted! */
		this._ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
			setTimeout(() => this._UI.zoomHandler.resetZoom(), 200)
		})
		this._ee.trigger(EventEnum.GRAPH_HAS_MOUNTED)
	}

	/**
	 * Sets and applies new filters, overwriting any existing.
	 * @param {object[]} filters
	 * @return {void}
	 */
	setFilters(filters) {
		this._ee.trigger(EventEnum.DATA_FILTER_REQUESTED, filters)
	}

	/**
	 * Returns all current filters.
	 * @return {object[]} - The filters
	 */
	getFilters() {
		return this._datastore.filters
	}

	/**
	 * Removes all current filters.
	 * @return {void}
	 */
	resetAllFilters() {
		this._ee.trigger(EventEnum.DATA_FILTER_RESET_REQUESTED)
	}

	/**
	 * Toggles multiplicity on and off in the graph.
	 * @return {void}
	 */
	toggleMultiplicity() {
		this._ee.trigger(EventEnum.TOGGLE_MULTIPLICITY_REQUESTED)
	}

	/**
	 * Highlights nodes in the graph based on input criteria.
	 * @param {string} attribute - Attribute name to look for
	 * @param {string} value - Value that the attribute should start with
	 * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be highlighted
	 * @return {void}
	 */
	highlight(attribute, value, filterFunction) {
		if ((attribute && value) || filterFunction) {
			const nodesToHighlight = this._datastore.nodes.filter(node => {
				if (filterFunction) {
					return filterFunction(node.data)
				}
				return node[attribute].toUpperCase().includes(value.toUpperCase())
			})
			this._ee.trigger(EventEnum.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight)
		} else {
			throw new Error("No attribute, value or filterfunction provided")
		}
	}

	/**
	 * Disables (dims) nodes in the graph based on input criteria.
	 * @param {string} attribute - Attribute name to look for
	 * @param {string} value - Value that the attribute should start with
	 * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be disabled
	 * @return {void}
	 */
	disable(attribute, value, filterFunction) {
		if ((attribute && value) || filterFunction) {
			const nodesToDisable = this._datastore.nodes
				.filter(node => {
					if (filterFunction) {
						return filterFunction(node.data)
					}
					return node[attribute].toUpperCase().includes(value.toUpperCase())
				})
				.map(node => node.id)
			this._ee.trigger(EventEnum.DISABLE_NODES_REQUESTED, nodesToDisable)
		} else {
			throw new Error("No attribute, value or filterfunction provided")
		}
	}

	/**
	 * Resets the disabling of nodes set by the "disable" function.
	 * @return {void}
	 */
	clearDisable() {
		this._ee.trigger(EventEnum.CLEAR_DISABLE_NODES_REQUESTED)
	}

	/**
	 * Resets the zoom (Zoom to fit).
	 * @return {void}
	 */
	resetZoom() {
		this._ee.trigger(EventEnum.ZOOM_REQUESTED, null, null, null)
	}

	/**
	 * Zooms in on a specific node.
	 * @param {string} nodeID - ID of the node to zoom to
	 * @return {void}
	 */
	zoomToNode(nodeID) {
		const node = this._datastore.nodes.find(node => node.id === nodeID)
		if (node) {
			const width = this._UI.graphContainerElement.offsetWidth / 2
			const height = this._UI.graphContainerElement.offsetHeight / 2
			const scale = 1.5
			const x = -node.x * scale + width
			const y = -node.y * scale + height
			this._ee.trigger(EventEnum.ZOOM_REQUESTED, x, y, scale)
		} else {
			throw new Error("No such node: " + nodeID)
		}
	}

	/**
	 * Sets a matrix layout for the simulation.
	 * @param {string} attribute - Property name on the nodes to group by
	 * @param {Function} filterFunction  - Optional filter function that can be used instead of attribute. Should return a string that represents the group that the node belongs to.
	 * @param {Function} sortFunction  - Optional sort function that will be applied to nodes before the layout is created. Use this to ensure correct positioning of groups on the screen
	 * @return {void}
	 */
	setMatrixLayout(attribute, filterFunction, sortFunction) {
		this._ee.trigger(EventEnum.ENGINE_LAYOUT_REQUESTED, this._datastore.nodes, this._datastore.edges, attribute, filterFunction, sortFunction)
	}

	/**
	 * Resets the layout to the default mode.
	 * @return {void}
	 */
	resetLayout() {
		this._ee.trigger(EventEnum.ENGINE_LAYOUT_RESET_REQUESTED, this._datastore.nodes, this._datastore.edges)
	}

	/**
	 * Pins a node to the center of the graph.
	 * @param {string} nodeID - ID of the node to center
	 * @return {void}
	 */
	centerNode(nodeID) {
		const node = this._datastore.nodes.find(potentialNode => potentialNode.id === nodeID)
		if (node) {
			const rootG = this._UI.rootG
			const midX = rootG.node().getBBox().x + rootG.node().getBBox().width / 2
			const midY = rootG.node().getBBox().y + rootG.node().getBBox().height / 2
			node.reposition(midX, midY).then(() => {
				node.pin(midX, midY)
				this._UI.DOMProcessor.updateNodes(this._UI.DOMProcessor.nodes)
				this._engine.alpha(1)
				this._engine.restart()
			})
		}
	}

	/**
	 * Sets the pin mode for nodes on and off
	 * Pin mode is when nodes are fixated upon drag
	 * @param {boolean} isEnabled
	 * @return {void}
	 */
	setPinMode(isEnabled) {
		this._ee.trigger(EventEnum.NODE_PIN_MODE_TOGGLED, isEnabled)
	}

	/**
	 * Sets the multi selection mode for nodes on and off
	 * multi selection mode is when selecting a node does not cause a deselection of any prior selected nodes
	 * @param {boolean} isEnabled
	 * @return {void}
	 */
	setMultiSelectMode(isEnabled) {
		this._ee.trigger(EventEnum.NODE_MULTI_SELECT_MODE_TOGGLED, isEnabled)
	}

	/**
	 * Pins the entire graph
	 * @return {void}
	 */
	pinGraph() {
		const pins = this._datastore.nodes.map(node => node.pin(node.x, node.y))
		Promise.all(pins).then(() => {
			this._UI.DOMProcessor.updateNodes(this._UI.DOMProcessor.nodes)
		})
	}

	/**
	 * Resets all pins in the graph
	 * @return {void}
	 */
	resetAllPins() {
		this._datastore.allNodes.forEach(node => node.unPin())
		this._UI.DOMProcessor.updateNodes(this._UI.DOMProcessor.nodes)
		this._engine.alpha(1)
		this._engine.restart(1)
	}

	/**
	 * Implodes/explodes all nodes one step out from the provided node.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNode(nodeID, isImplode) {
		this._ee.trigger(EventEnum.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Implodes/explodes all leaf nodes one step out from the provided node. I.e. nodes that have no further connections.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNodeLeafs(nodeID, isImplode) {
		this._ee.trigger(EventEnum.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Implodes/explodes all branching nodes from the provided node recursively.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNodeRecursive(nodeID, isImplode) {
		this._ee.trigger(EventEnum.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Implodes/explodes all branching nodes from the provided node recursively, but only ones that are not circular. I.e. branches that do not lead back to the provided node.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
		this._ee.trigger(EventEnum.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Updates the data in the graph. This is commonly used for reflecting changes in the outer application
	 * @param {object} newDataset - New data set
	 * @return {void}
	 */
	updateDataset(newDataset) {
		this._ee.trigger(EventEnum.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges)
	}

	/**
	 * Exports the graph dataset into a JSON file that can be loaded into the graph at a later time
	 * @param {boolean} includeOnlyLiveData - Should only live data be included in the export, or the entire dataset?
	 */
	saveGraphAsJSON(includeOnlyLiveData) {
		if (!this._datastore.allNodes && !this._datastore.allEdges) {
			return
		}
		const filename = "virrvarr.json"
		const data = {
			style: this._style,
			nodes: includeOnlyLiveData ? this._datastore.liveNodes : this._datastore.allNodes,
			edges: includeOnlyLiveData ? this._datastore.liveEdges : this._datastore.allEdges
		}
		const blob = new Blob([JSON.stringify(data, null, null)], { type: "text/json" })
		const aElement = document.createElement("a")
		aElement.download = filename
		aElement.href = window.URL.createObjectURL(blob)
		aElement.dataset.downloadurl = ["text/json", aElement.download, aElement.href].join(":")
		aElement.click()
	}

	/**
	 * Completely dismount and remove the graph
	 * @return {void}
	 */
	destroyGraph() {
		//All unmount listeners must be synchronous!!
		this._ee.trigger(EventEnum.GRAPH_WILL_UNMOUNT)
		Object.keys(this).forEach(key => {
			delete this[key]
		})
	}
}
