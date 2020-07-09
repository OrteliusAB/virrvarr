import "./Utils/Protoypes.js"
import Env from "./Config/Env.js"
import Datastore from "./Datastore/Datastore"
import EventEmitter from "./Events/EventEmitter"
import UI from "./UI/UI"
import Engine from "./Engine/Engine"
import EventEnum from "./Events/EventEnum"
import EntityProcessor from "./Datastore/EntityProcessor.js"

export default class Virrvarr {
    constructor(graphContainerElement, inputData, options) {
        /* Init user input */
        this.options = Object.assign.apply(Object, [{}].concat(options))
        this.style = JSON.parse(JSON.stringify(inputData.style))

        /* Init EventEmitter */
        this.ee = new EventEmitter()
        //If the user specified listeners in options then add them
        this.options.entityClickListener && this.ee.on(EventEnum.CLICK_ENTITY, this.options.entityClickListener)
        this.options.entityDoubleClickedListener && this.ee.on(EventEnum.DBL_CLICK_ENTITY, this.options.entityDoubleClickedListener)
        this.options.entityHoveredListener && this.ee.on(EventEnum.HOVER_ENTITY, this.options.entityHoveredListener)

        /* Init UI */
        this.UI = new UI(graphContainerElement, this.ee, this.style, options)

        /* Init Datastore */
        this.entityProcessor = new EntityProcessor(this.ee, this.style, this.options)
        this.datastore = new Datastore(inputData.nodes, inputData.edges, this.ee, this.style, this.options)

        /* Init Engine */
        this.engine = new Engine(this.UI.width / 2, this.UI.height / 2, this.ee)

        /* Graph has mounted! */
        this.ee.on(EventEnum.GRAPH_HAS_MOUNTED, () => {
            this.UI.zoomHandler.scaleTo(Env.INITIAL_SCALE)
        })
        this.ee.trigger(EventEnum.GRAPH_HAS_MOUNTED)
    }

    /* Tells the datatstore to set the filters */
    setFilters(filters) {
        this.ee.trigger(EventEnum.DATA_FILTER_REQUESTED, filters)
    }

    /* Returns all the filters from the datastore */
    getFilters() {
        return this.datastore.filters
    }

    /* Tells the datastore to reset the filters */
    resetAllFilters() {
        this.ee.trigger(EventEnum.DATA_FILTER_RESET_REQUESTED)
    }

    /* Toggles multiplicity on and off in the graph */
    toggleMultiplicity() {
        this.ee.trigger(EventEnum.TOGGLE_MULTIPLICITY_REQUESTED)
    }

    /* Highlights nodes in the graph based on input criteria */
    highlight(attribute, value, filterFunction) {
        if ((attribute && value) || filterFunction) {
            const nodesToHighlight = this.datastore.nodes.filter(node => {
                if (filterFunction) {
                    return filterFunction(node.data)
                }
                return node[attribute].toUpperCase().startsWith(value.toUpperCase())
            })
            this.ee.trigger(EventEnum.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight)
        }
        else {
            throw new Error("No attribute, value or filterfunction provided")
        }
    }

    /* Resets the zoom to the initial position */
    resetZoom() {
        this.ee.trigger(EventEnum.ZOOM_REQUESTED, null, null, null)
    }

    /* Zooms in on a specific node */
    zoomToNode(nodeID) {
        const node = this.datastore.nodes.find(node => node.id === nodeID)
        if (node) {
            const width = this.UI.graphContainerElement.offsetWidth / 2
            const height = this.UI.graphContainerElement.offsetHeight / 2
            const scale = 1.5
            const x = (-node.x * scale) + width
            const y = (-node.y * scale) + height
            this.ee.trigger(EventEnum.ZOOM_REQUESTED, x, y, scale)
        }
        else {
            throw new Error("No such node: " + nodeID)
        }
    }

    /* Sets a matrix layout for the simulation */
    setMatrixLayout(attribute, filterFunction, sortFunction) {
        this.ee.trigger(EventEnum.ENGINE_LAYOUT_REQUESTED,
            this.datastore.nodes,
            this.datastore.edges,
            attribute,
            filterFunction,
            sortFunction
        )
    }

    /* Resets the layout to the default mode */
    resetLayout() {
        this.ee.trigger(EventEnum.ENGINE_LAYOUT_RESET_REQUESTED, this.datastore.nodes, this.datastore.edges)
    }

    centerNode(nodeID) {
        const node = this.datastore.nodes.find(potentialNode => potentialNode.id === nodeID)
        if (node) {
            const width = this.UI.rootG.node().getBBox().width / 4
            const height = this.UI.rootG.node().getBBox().height / 4
            this.ee.trigger(EventEnum.NODE_FIXATION_REQUESTED, node, width, height)
        }
    }

    /* Implodes and explodes nodes */
    implodeOrExplodeNode(nodeID, isImplode) {
        this.ee.trigger(EventEnum.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode)
    }
    implodeOrExplodeNodeLeafs(nodeID, isImplode) {
        this.ee.trigger(EventEnum.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode)
    }
    implodeOrExplodeNodeRecursive(nodeID, isImplode) {
        this.ee.trigger(EventEnum.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode)
    }
    implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
        this.ee.trigger(EventEnum.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode)
    }

    /* Tells the datastore to change the dataset for a new one
       This is most commonly used for reflecting changes in the outer application */
    updateDataset(newDataset) {
        this.ee.trigger(EventEnum.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges)
    }

    /* Completely remove the graph from DOM and memory */
    destroyGraph() {
        //All unmount listeners must be synchronous!!
        this.ee.trigger(EventEnum.GRAPH_WILL_UNMOUNT)
        this.UI.graphContainerElement.remove()
        Object.keys(this).forEach(key => {
            delete this[key]
        })
    }
}