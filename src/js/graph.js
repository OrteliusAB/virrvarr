import "./Utils/Protoypes"
import Env from "./Config/Env"
import Datastore from "./Datastore/Datastore"
import EventEmitter from "./Events/EventEmitter"
import UI from "./UI/UI"
import Engine from "./Engine/Engine"
import EventEnum from "./Events/EventEnum"
import EntityProcessor from "./Datastore/EntityProcessor.js"

/**
 * The main graph class
 */
export class Virrvarr {
	// eslint-disable-line
	#options = null // eslint-disable-line
	#style = null // eslint-disable-line
	#ee = null // eslint-disable-line
	#UI = null // eslint-disable-line
	#entityProcessor = null // eslint-disable-line
	#datastore = null // eslint-disable-line
	#engine = null // eslint-disable-line

	/**
	 * Main constructor
	 * @param {HTMLElement} graphContainerElement - Element that the graph should mount in
	 * @param {object} inputData - Data that the graph should display
	 * @param {object} options - Optional configuration for the graph
	 * @param {boolean} options.enableGrid - Should the grid background pattern be enabled?
	 * @param {boolean} options.enableFadeOnHover - Should nodes and edges that are not directly connected to a hovered node be faded out when said node is hovered?
	 * @param {boolean} options.enableZoomButtons - Should zoom buttons be enabled?
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
	 * 
	 */
	constructor(graphContainerElement, inputData, options) {
		/* Init user input */
		this.#options = Object.assign.apply(Object, [{}].concat(options))
		this.#style = inputData.style ? JSON.parse(JSON.stringify(inputData.style)) : {}

		/* Init EventEmitter */
		this.#ee = new EventEmitter()
		//If the user specified listeners in options then add them
		this.#options.entityClickedListener && this.#ee.on(EventEnum.CLICK_ENTITY, this.#options.entityClickedListener)
		this.#options.entityDoubleClickedListener && this.#ee.on(EventEnum.DBL_CLICK_ENTITY, this.#options.entityDoubleClickedListener)
		this.#options.entityHoveredListener && this.#ee.on(EventEnum.HOVER_ENTITY, this.#options.entityHoveredListener)

		/* Init UI */
		this.#UI = new UI(graphContainerElement, this.#ee, this.#style, options)

		/* Init Datastore */
		this.#entityProcessor = new EntityProcessor(this.#ee, this.#style, this.#options)
		this.#datastore = new Datastore(inputData.nodes, inputData.edges, this.#ee, this.#style, this.#options)

		/* Init Engine */
		this.#engine = new Engine(this.#UI.width / 2, this.#UI.height / 2, this.#ee)

		/* Graph has mounted! */
		this.#ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
			this.#UI.zoomHandler.scaleTo(Env.INITIAL_SCALE)
		})
		this.#ee.trigger(EventEnum.GRAPH_HAS_MOUNTED)
	}

	/**
	 * Sets and applies new filters, overwriting any existing.
	 * @param {object[]} filters
	 * @return {void}
	 */
	setFilters(filters) {
		this.#ee.trigger(EventEnum.DATA_FILTER_REQUESTED, filters)
	}

	/**
	 * Returns all current filters.
	 * @return {object[]} - The filters
	 */
	getFilters() {
		return this.#datastore.filters
	}

	/**
	 * Removes all current filters.
	 * @return {void}
	 */
	resetAllFilters() {
		this.#ee.trigger(EventEnum.DATA_FILTER_RESET_REQUESTED)
	}

	/**
	 * Toggles multiplicity on and off in the graph.
	 * @return {void}
	 */
	toggleMultiplicity() {
		this.#ee.trigger(EventEnum.TOGGLE_MULTIPLICITY_REQUESTED)
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
			const nodesToHighlight = this.#datastore.nodes.filter(node => {
				if (filterFunction) {
					return filterFunction(node.data)
				}
				return node[attribute].toUpperCase().startsWith(value.toUpperCase())
			})
			this.#ee.trigger(EventEnum.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight)
		} else {
			throw new Error("No attribute, value or filterfunction provided")
		}
	}

	/**
	 * Resets the zoom (Zoom to fit).
	 * @return {void}
	 */
	resetZoom() {
		this.#ee.trigger(EventEnum.ZOOM_REQUESTED, null, null, null)
	}

	/**
	 * Zooms in on a specific node.
	 * @param {string} nodeID - ID of the node to zoom to
	 * @return {void}
	 */
	zoomToNode(nodeID) {
		const node = this.#datastore.nodes.find(node => node.id === nodeID)
		if (node) {
			const width = this.#UI.graphContainerElement.offsetWidth / 2
			const height = this.#UI.graphContainerElement.offsetHeight / 2
			const scale = 1.5
			const x = -node.x * scale + width
			const y = -node.y * scale + height
			this.#ee.trigger(EventEnum.ZOOM_REQUESTED, x, y, scale)
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
		this.#ee.trigger(EventEnum.ENGINE_LAYOUT_REQUESTED, this.#datastore.nodes, this.#datastore.edges, attribute, filterFunction, sortFunction)
	}

	/**
	 * Resets the layout to the default mode.
	 * @return {void}
	 */
	resetLayout() {
		this.#ee.trigger(EventEnum.ENGINE_LAYOUT_RESET_REQUESTED, this.#datastore.nodes, this.#datastore.edges)
	}

	/**
	 * Fixates a node to the center of the graph.
	 * @param {string} nodeID - ID of the node to center
	 * @return {void}
	 */
	centerNode(nodeID) {
		const node = this.#datastore.nodes.find(potentialNode => potentialNode.id === nodeID)
		if (node) {
			const width = this.#UI.rootG.node().getBBox().width / 4
			const height = this.#UI.rootG.node().getBBox().height / 4
			this.#ee.trigger(EventEnum.NODE_FIXATION_REQUESTED, node, width, height)
		}
	}

	/**
	 * Implodes/explodes all nodes one step out from the provided node.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNode(nodeID, isImplode) {
		this.#ee.trigger(EventEnum.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Implodes/explodes all leaf nodes one step out from the provided node. I.e. nodes that have no further connections.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNodeLeafs(nodeID, isImplode) {
		this.#ee.trigger(EventEnum.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Implodes/explodes all branching nodes from the provided node recursively.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNodeRecursive(nodeID, isImplode) {
		this.#ee.trigger(EventEnum.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Implodes/explodes all branching nodes from the provided node recursively, but only ones that are not circular. I.e. branches that do not lead back to the provided node.
	 * @param {string} nodeID - ID of the node
	 * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
	 * @return {void}
	 */
	implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
		this.#ee.trigger(EventEnum.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode)
	}

	/**
	 * Updates the data in the graph. This is commonly used for reflecting changes in the outer application
	 * @param {object} newDataset - New data set
	 * @return {void}
	 */
	updateDataset(newDataset) {
		this.#ee.trigger(EventEnum.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges)
	}

	/**
	 * Completely dismount and remove the graph
	 * @return {void}
	 */
	destroyGraph() {
		//All unmount listeners must be synchronous!!
		this.#ee.trigger(EventEnum.GRAPH_WILL_UNMOUNT)
		Object.keys(this).forEach(key => {
			delete this[key]
		})
	}
}
