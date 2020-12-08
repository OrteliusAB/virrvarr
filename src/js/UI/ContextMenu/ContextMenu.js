import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"

/**
 * The context menu class governs the custom context menu (right click menu)
 */
export default class ContextMenu {
	constructor(graphContainerElement, eventEmitter, options) {
		this.showContextMenu = options.enableContextMenu !== undefined ? options.enableContextMenu : Env.SHOW_CONTEXT_MENU
		this.customContextMenu = options.customContextMenu !== undefined ? options.customContextMenu : Env.DEFAULT_CUSTOM_CONTEXT_MENU
		this.graphContainerElement = graphContainerElement
		this.ee = eventEmitter
		if (this.showContextMenu) {
			this.ee.on(EventEnum.RIGHT_CLICK_ENTITY, (clickedItem, direction = null) => {
				this.buildMenu(clickedItem, direction)
			})
			this.ee.on(EventEnum.CLICK_ENTITY, () => {
				this.removeContextmenu()
			})
			this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.removeContextmenu())
		}
		this.InitializeMenuSections()
	}

	/**
	 * Generates and positions a context menu.
	 * @param {object|null} item - Node, Edge, or "null" (canvas) that has been clicked
	 * @param {string?} direction - The direction of the edge clicked (if applicable)
	 */
	buildMenu(item, direction) {
		const coordinates = d3.mouse(document.body)
		const mouseX = coordinates[0]
		const mouseY = coordinates[1]
		if (item === null) {
			this.createCanvasContextMenu(null, mouseX, mouseY)
		} else if (!direction) {
			this.createNodeContextMenu(item, mouseX, mouseY)
		} else {
			this.createEdgeContextMenu(item, mouseX, mouseY, direction)
		}
	}

	/**
	 * Creates a custom floating menu on the screen using the given input
	 * @param {object|null} clickedItem - Node, Edge, or "null" (canvas) that has been clicked
	 * @param {object[]} contextSectionsArray - Default menu items
	 * @param {object[]} customSectionsArray - User provided menu items
	 * @param {number} mouseX - Mouse X coordinate
	 * @param {number} mouseY - Mouse Y coordinate
	 * @param {string?} direction The direction of the edge clicked (if applicable)
	 */
	createContextMenu(clickedItem, contextSectionsArray, customSectionsArray, mouseX, mouseY, direction = undefined) {
		this.removeContextmenu()
		const ulElement = d3
			.select(this.graphContainerElement)
			.append("div")
			.attr("id", "virrvarr-context-menu-container")
			.attr("class", "virrvarr-context-menu")
			.style("position", "fixed")
			.style("left", mouseX + "px")
			.style("top", mouseY + "px")
			.style("display", "block")
			.append("ul")
			.attr("class", "virrvarr-context-menu-options")
		contextSectionsArray.forEach((section, index) => {
			if (index === 0) {
				this.processSection(ulElement, section, false, clickedItem, direction)
			} else {
				this.processSection(ulElement, section, true, clickedItem, direction)
			}
		})
		customSectionsArray.forEach(section => {
			this.processSection(ulElement, section, true, clickedItem, direction)
		})
	}

	/**
	 * Processes and creates a specific section of the context menu.
	 * @param {HTMLElement} ul - The entire menu
	 * @param {object[]} section - Array of menu items to be added
	 * @param {boolean} shouldAddSeparatorBefore - Add a separating line before this new section?
	 * @param {object|null} clickedItem - Item that was clicked
	 * @param {string?} direction - Direction of the clicked edge, if applicable.
	 */
	processSection(ul, section, shouldAddSeparatorBefore, clickedItem, direction = undefined) {
		if (shouldAddSeparatorBefore) {
			ul.append("li").append("div").attr("class", "virrvarr-context-menu-divider")
		}
		section.forEach(menuItem => {
			ul.append("li")
				.append("div")
				.attr("class", "virrvarr-context-menu-option")
				.text(() => menuItem.label)
				.on("click", () => {
					this.removeContextmenu()
					const data = (clickedItem && clickedItem.data) || null
					const id = (clickedItem && clickedItem.id) || null
					const edgeDirection = direction
					return menuItem.action(data, id, edgeDirection)
				})
		})
	}

	/**
	 * Create a node context menu
	 * @param {object} clickedItem - Clicked node
	 * @param {number} mouseX - Mouse X coordinate
	 * @param {number} mouseY - Mouse Y coordinate
	 */
	createNodeContextMenu(clickedItem, mouseX, mouseY) {
		const sections = [this.NodeMenu, this.UniversalMenu]
		let customSections = []
		if (this.customContextMenu.node) {
			customSections = [...this.customContextMenu.node]
		}
		this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY)
	}

	/**
	 * Create an edge context menu
	 * @param {object|null} clickedItem - Clicked edge
	 * @param {number} mouseX - Mouse X coordinate
	 * @param {number} mouseY - Mouse Y coordinate
	 * @param {string} direction - Direction of the edge
	 */
	createEdgeContextMenu(clickedItem, mouseX, mouseY, direction) {
		const sections = [this.EdgeMenu, this.UniversalMenu]
		let customSections = []
		if (this.customContextMenu.edge) {
			customSections = [...this.customContextMenu.edge]
		}

		this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY, direction)
	}

	/**
	 * Create a canvas context menu
	 * @param {null} clickedItem - Clicked canvas
	 * @param {number} mouseX - Mouse X coordinate
	 * @param {number} mouseY - Mouse Y coordinate
	 */
	createCanvasContextMenu(clickedItem, mouseX, mouseY) {
		const sections = [this.UniversalMenu]
		let customSections = []
		if (this.customContextMenu.canvas) {
			customSections = [...this.customContextMenu.canvas]
		}

		this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY)
	}

	/**
	 * Removes the current floating menu
	 */
	removeContextmenu() {
		d3.select(this.graphContainerElement).select("#virrvarr-context-menu-container").remove()
	}

	/**
	 * Initializes the menu sections
	 */
	InitializeMenuSections() {
		this.NodeMenu = [
			{
				label: "Select Node",
				action: (data, id) => {
					this.ee.trigger(EventEnum.CLICK_ENTITY, {
						id,
						data
					})
				}
			}
		]

		this.EdgeMenu = [
			{
				label: "Select Edge",
				action: (data, id, edgeDirection) => {
					this.ee.trigger(EventEnum.CLICK_ENTITY, {
						id,
						data,
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
