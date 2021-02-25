/**
 * All events in Virrvarr are stored here.
 */
const EVENTS = Object.freeze({
	/* PUBLIC EVENTS */
	// Params: data (.id, .data, .direction (undefined/"to"/"from"))
	CLICK_ENTITY: "ENTITY_CLICKED_EVENT",
	// Params: data (.id, .data, .direction (undefined/"to"/"from"))
	DBL_CLICK_ENTITY: "ENTITY_DBL_CLICKED_EVENT",
	// Params: data (.id, .data, .eventType (enter/leave), .direction)
	HOVER_ENTITY: "ENTITY_HOVER_EVENT",
	// Params: data [(.id, .data, .type (node/edge), .direction)]
	SELECTION_UPDATED: "SELECTION_UPDATED_EVENT",

	/* PRIVATE EVENTS */
	// Params: entity, direction (undefined/"to"/"from")
	RIGHT_CLICK_ENTITY: "ENTITY_RIGHT_CLICKED_EVENT",
	// Params: node
	NODE_DRAG_START: "NODE_DRAG_STARTED_EVENT",
	// Params: node
	NODE_DRAG_DRAGGED: "NODE_DRAG_DRAGGED_EVENT",
	// Params: node
	NODE_DRAG_ENDED: "NODE_DRAG_ENDED_EVENT",
	// Params: node
	MOUSE_OVER_NODE: "MOUSE_MOVED_OVER_NODE_EVENT",
	// Params: N/A
	MOUSE_LEFT_NODE: "MOUSE_MOVED_OUTSIDE_NODE_EVENT",

	// Params: isEnabled
	NODE_PIN_MODE_TOGGLED: "NODE_PIN_MODE_TOGGLED_EVENT",
	// Params: isEnabled
	NODE_MULTI_SELECT_MODE_TOGGLED: "NODE_MULTI_SELECT_MODE_TOGGLED_EVENT",
	// Params: isEnabled
	LASSO_MODE_TOGGLED: "LASSO_MODE_TOGGLED_EVENT",
	// Params: x, y, width, height
	LASSO_MOVED: "LASSO_MOVED_EVENT",
	// Params: N/A
	LASSO_ENTER: "LASSO_ENTER_EVENT",
	// Params: N/A
	LASSO_EXIT: "LASSO_EXIT_EVENT",

	// Params: [...nodes], [...edges]
	DATA_UPDATE_REQUESTED: "DATA_UPDATE_REQUESTED_EVENT",
	// Params: [...nodes], [...edges]
	DATASTORE_UPDATED: "LIVE_DATA_UPDATED_EVENT",
	// Params: [...nodes], [...edges]
	DOM_PROCESSOR_FINISHED: "DOM_PROCESSOR_FINISHED_EVENT",
	// Params: [...nodes], [...edges]
	ENGINE_UPDATE_FINISHED: "ENGINE_UPDATE_FINISHED_EVENT",

	// Params: filters ({node:[], edges:[]})
	DATA_FILTER_REQUESTED: "DATA_FILTER_REQUESTED_EVENT",
	// Params: N/A
	DATA_FILTER_RESET_REQUESTED: "DATA_FILTER_RESET_REQUESTED_EVENT",

	// Params: entityID, isImplode (true/false)
	IMPLODE_EXPLODE_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_REQUESTED_EVENT",
	// Params: entityID, isImplode (true/false)
	IMPLODE_EXPLODE_LEAFS_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_LEAFS_REQUESTED_EVENT",
	// Params: entityID, isImplode (true/false)
	IMPLODE_EXPLODE_RECURSIVE_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_RECURSIVE_REQUESTED_EVENT",
	// Params: entityID, isImplode (true/false)
	IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_NON_CIRCULAR_REQUESTED_EVENT",

	// Params: x, y, scale
	ZOOM_REQUESTED: "ZOOM_WAS_REQUESTED_EVENT",

	// Params: [...nodes]
	HIGHLIGHT_NODE_REQUESTED: "HIGHLIGHT_NODE_REQUESTED_EVENT",
	// Params: [...nodeIDs]
	DISABLE_NODES_REQUESTED: "DISABLE_NODES_REQUESTED_EVENT",
	// Params: N/A
	CLEAR_DISABLE_NODES_REQUESTED: "CLEAR_DISABLE_NODES_REQUESTED_EVENT",

	// Params N/A
	TOGGLE_MULTIPLICITY_REQUESTED: "TOGGLE_MULTIPLICITY_REQUEST_EVENT",

	// Params: N/A
	ENGINE_TICK: "ENGINE_TICK_EVENT",
	// Params: nodes, edges, attribute, filterFunction, sortFunction
	ENGINE_LAYOUT_REQUESTED: "ENGINE_LAYOUT_REQUESTED_EVENT",
	// Params: nodes, edges
	ENGINE_LAYOUT_RESET_REQUESTED: "ENGINE_LAYOUT_RESET_REQUESTED_EVENT",

	// Params: N/A
	GRAPH_HAS_MOUNTED: "GRAPH_HAS_MOUNTED_EVENT",
	// Params: N/A
	GRAPH_WILL_UNMOUNT: "GRAPH_WILL_UNMOUNT_EVENT" //All unmount listeners must be synchronous!!
})

export default EVENTS
