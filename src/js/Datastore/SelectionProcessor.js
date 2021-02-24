import EventEmitter from "../Events/EventEmitter"
import EventEnum from "../Events/EventEnum"
import Datastore from "./Datastore"

/**
 * The selection processor handles the selection state of nodes and edges.
 * The processor makes sure that events from other components translate into the state being properly updated.
 * When the state is updated the selection processor is also responsible for compiling the new state into an event to alert other components/the user.
 */
export default class EntityProcessor {

    /**
     * @param {EventEmitter} eventEmitter 
     * @param {Datastore} datastore 
     */
    constructor(eventEmitter, datastore) {
        this.datastore = datastore
        this.multiSelectMode = false
        this.ee = eventEmitter
        this.lastLassoCoveredSelection = null
        this.lassoExiting = false
        this.lassoExitingTimeout = null
        this.ee.on(EventEnum.NODE_MULTI_SELECT_MODE_TOGGLED, isEnabled => (this.multiSelectMode = isEnabled))
        this.ee.on(EventEnum.LASSO_ENTER, () => {
            if (this.lassoExitingTimeout) {
                clearTimeout(this.lassoExitingTimeout)
                this.lassoExiting = false
            }
            this.lastLassoCoveredSelection = []
        })
        this.ee.on(EventEnum.LASSO_EXIT, () => {
            this.lassoExiting = true
            this.lassoExitingTimeout = setTimeout(() => {
                this.lassoExiting = false
            }, 100)
            this.lastLassoCoveredSelection = null
        })
        this.ee.on(EventEnum.LASSO_MOVED, (x, y, width, height) => this.selectLassoArea(x, y, width, height))
        this.ee.on(EventEnum.CLICK_ENTITY, data => {
            if (!this.lastLassoCoveredSelection && !this.lassoExiting) {
                if (data) {
                    this.entityClicked(data.id, data.direction)
                }
                else {
                    this.entityClicked()
                }
            }
        })
    }

    /**
     * Retrieves the current selection
     */
    getSelection() {
        const selectedNodes = this.datastore.nodes.filter(node => node.isFocused).map(node => { return { id: node.id, type: "node", data: node.data } })
        const selectedEdgeTo = this.datastore.edges.filter(edge => edge.isToFocused).map(edge => { return { id: edge.id, type: "edge", data: edge.data, direction: "to" } })
        const selectedEdgeFrom = this.datastore.edges.filter(edge => edge.isFromFocused).map(edge => { return { id: edge.id, type: "edge", data: edge.data, direction: "from" } })
        return [
            ...selectedNodes,
            ...selectedEdgeTo,
            ...selectedEdgeFrom
        ]
    }

    /**
     * Updates focus state when an entity has been clicked.
     * If direction is falsey and id is truthy then a node has been selected
     * If both id and direction are truthy an edge has been selected
     * If id is falsey then the background canvas has been clicked
     * @param {string} id 
     * @param {"to"|"from"|undefined|null} direction 
     */
    entityClicked(id, direction) {
        if (!this.multiSelectMode || !id) {
            this.clearAllSelections()
            if (!id) {
                this.ee.trigger(EventEnum.SELECTION_UPDATED, this.getSelection())
                return
            }
        }
        if (id && direction) {
            const edge = this.datastore.getEdgeByID(id)
            if (edge) {
                if (direction === "to") {
                    edge.isToFocused = !edge.isToFocused
                    this.ee.trigger(EventEnum.SELECTION_UPDATED, this.getSelection())
                    return
                }
                else if (direction === "from") {
                    edge.isFromFocused = !edge.isFromFocused
                    this.ee.trigger(EventEnum.SELECTION_UPDATED, this.getSelection())
                    return
                }
            }
        }
        else if (id) {
            const node = this.datastore.getNodeByID(id)
            if (node) {
                node.isFocused = !node.isFocused
                this.ee.trigger(EventEnum.SELECTION_UPDATED, this.getSelection())
                return
            }
        }
    }

    /**
     * Removes all selections from the state
     */
    clearAllSelections() {
        this.datastore.nodes.forEach(node => node.isFocused = false)
        this.datastore.edges.forEach(edge => { edge.isToFocused = false; edge.isFromFocused = false })
    }

    /**
     * Handles updating the when the selection lasso has moved
     * @param {number} x - x coordinate of the lasso
     * @param {number} y - y coordinate of the lasso
     * @param {number} width - width of the lasso
     * @param {number} height - height of the lasso
     */
    selectLassoArea(x, y, width, height) {
        const lassoEndX = x + width
        const lassoEndY = y + height
        const coveredSelection = [...this.lastLassoCoveredSelection]
        let selectionChanged = false
        this.datastore.nodes.forEach(node => {
            if (
                node.relativeX >= x
                && node.relativeY >= y
                && node.relativeX + node.relativeWidth <= lassoEndX
                && node.relativeY + node.relativeheight <= lassoEndY
            ) {
                if (!this.lastLassoCoveredSelection.includes(node.id)) {
                    node.isFocused = !node.isFocused
                    coveredSelection.push(node.id)
                    selectionChanged = true
                }
            }
            else if (this.lastLassoCoveredSelection.includes(node.id)) {
                coveredSelection.splice(coveredSelection.indexOf(node.id), 1)
                node.isFocused = !node.isFocused
                selectionChanged = true
            }
        })
        this.datastore.edges.forEach(edge => {
            if (edge.nameTo) {
                if (
                    edge.labelToRelativeX >= x
                    && edge.labelToRelativeY >= y
                    && edge.labelToRelativeX + edge.labelToRelativeWidth <= lassoEndX
                    && edge.labelToRelativeY + edge.labelToRelativeHeight <= lassoEndY
                ) {
                    if (!this.lastLassoCoveredSelection.includes(`${edge.id}to`)) {
                        edge.isToFocused = !edge.isToFocused
                        coveredSelection.push(`${edge.id}to`)
                        selectionChanged = true
                    }
                }
                else if (this.lastLassoCoveredSelection.includes(`${edge.id}to`)) {
                    coveredSelection.splice(coveredSelection.indexOf(`${edge.id}to`), 1)
                    edge.isToFocused = !edge.isToFocused
                    selectionChanged = true
                }
            }
            if (edge.nameFrom) {
                if (
                    edge.labelFromRelativeX >= x
                    && edge.labelFromRelativeY >= y
                    && edge.labelFromRelativeX + edge.labelFromRelativeWidth <= lassoEndX
                    && edge.labelFromRelativeY + edge.labelFromRelativeHeight <= lassoEndY
                ) {
                    if (!this.lastLassoCoveredSelection.includes(`${edge.id}from`)) {
                        edge.isFromFocused = !edge.isFromFocused
                        coveredSelection.push(`${edge.id}from`)
                        selectionChanged = true
                    }
                }
                else if (this.lastLassoCoveredSelection.includes(`${edge.id}from`)) {
                    coveredSelection.splice(coveredSelection.indexOf(`${edge.id}from`), 1)
                    edge.isFromFocused = !edge.isFromFocused
                    selectionChanged = true
                }
            }
        })
        if (selectionChanged) {
            this.lastLassoCoveredSelection = coveredSelection
            this.ee.trigger(EventEnum.SELECTION_UPDATED, this.getSelection())
        }
    }

}