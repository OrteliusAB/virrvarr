import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"

export default class ContextMenu {
    constructor(graphContainerElement, eventEmitter, options) {
        this.showContextMenu = options.showContextMenu !== undefined ? options.showContextMenu : Env.SHOW_CONTEXT_MENU
        this.customContextMenu = options.customContextMenu !== undefined ? options.customContextMenu : Env.DEFAULT_CUSTOM_CONTEXT_MENU
        this.graphContainerElement = graphContainerElement
        this.ee = eventEmitter
        if (this.showContextMenu) {
            this.ee.on(EventEnum.RIGHT_CLICK_ENTITY, (clickedItem, direction = null) => { this.buildMenu(clickedItem, direction) })
            this.ee.on(EventEnum.CLICK_ENTITY, () => { this.removeContextmenu() })
            this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.removeContextmenu())
        }
        this.InitializeMenuSections()
    }

    buildMenu(item, direction) {
        const coordinates = d3.mouse(document.body)
        const mouseX = coordinates[0]
        const mouseY = coordinates[1]
        if (item === null) {
            this.createCanvasContextMenu(null, mouseX, mouseY)
        }
        else if (!direction) {
            this.createNodeContextMenu(item, mouseX, mouseY)
        }
        else {
            this.createEdgeContextMenu(item, mouseX, mouseY, direction)
        }
    }

    /* This function creates a custom floating menu on the screen (primarily used for right clicking) */
    createContextMenu(clickedItem, contextSectionsArray, customSectionsArray, mouseX, mouseY, direction = undefined) {
        //Remove any old context menu
        this.removeContextmenu()

        //Create a new menu
        const ulElement = d3.select(this.graphContainerElement)
            .append("div")
            .attr("id", "virrvarr-context-menu-container")
            .attr("class", "virrvarr-context-menu")
            .style('position', 'fixed')
            .style('left', mouseX + "px")
            .style('top', mouseY + "px")
            .style('display', 'block')
            .append("ul")
            .attr("class", "virrvarr-context-menu-options")

        //Fill the menu with all provided sections
        contextSectionsArray.forEach((section, index) => {
            if (index === 0) {
                this.processSection(ulElement, section, false, clickedItem, direction)
            }
            else {
                this.processSection(ulElement, section, true, clickedItem, direction)
            }
        })
        customSectionsArray.forEach((section, index) => {
            this.processSection(ulElement, section, true, clickedItem, direction)
        })
    }

    processSection(ul, section, shouldAddSeparatorBefore, clickedItem, direction = undefined) {
        if (shouldAddSeparatorBefore) {
            ul.append("li")
                .append("div")
                .attr("class", "virrvarr-context-menu-divider")
        }
        section.forEach(menuItem => {
            ul.append("li")
                .append("div")
                .attr("class", "virrvarr-context-menu-option")
                .text(() => menuItem.label)
                .on("click", () => {
                    this.removeContextmenu()
                    const data = clickedItem && clickedItem.data || null
                    const id = clickedItem && clickedItem.id || null
                    const edgeDirection = direction
                    return menuItem.action(data, id, edgeDirection)
                })
        })
    }

    createNodeContextMenu(clickedItem, mouseX, mouseY) {
        const sections = [
            this.NodeMenu,
            this.UniversalMenu
        ]
        let customSections = []
        if (this.customContextMenu.node) {
            customSections = [...this.customContextMenu.node]
        }
        this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY)
    }

    createEdgeContextMenu(clickedItem, mouseX, mouseY, direction) {
        const sections = [
            this.EdgeMenu,
            this.UniversalMenu
        ]
        let customSections = []
        if (this.customContextMenu.edge) {
            customSections = [...this.customContextMenu.edge]
        }

        this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY, direction)
    }

    createCanvasContextMenu(clickedItem, mouseX, mouseY) {
        const sections = [
            this.UniversalMenu
        ]
        let customSections = []
        if (this.customContextMenu.canvas) {
            customSections = [...this.customContextMenu.canvas]
        }

        this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY)
    }

    /* This function removes the current floating menu */
    removeContextmenu() {
        d3.select(this.graphContainerElement)
            .select("#virrvarr-context-menu-container")
            .remove()
    }

    InitializeMenuSections() {
        this.NodeMenu = [
            {
                label: "Select Node",
                action: (data, id) => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: id,
                        data: data,
                    })
                }
            }
        ]

        this.EdgeMenu = [
            {
                label: "Select Edge",
                action: (data, id, edgeDirection) => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: id,
                        data: data,
                        direction: edgeDirection
                    })
                }
            }
        ]

        this.UniversalMenu = [
            {
                label: "Reset Zoom",
                action: () => {
                    this.ee.trigger(EventEnum.ZOOM_REQUESTED)
                }
            }
        ]
    }

}