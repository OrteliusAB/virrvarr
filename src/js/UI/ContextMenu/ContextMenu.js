import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"

/**
 * The context menu class governs the custom context menu (right click menu)
 */
export default class ContextMenu {
	constructor(graphContainerElement, eventEmitter, options) {
		this.enableBuiltinContextMenu = options.enableBuiltinContextMenu !== undefined ? options.enableBuiltinContextMenu : Env.SHOW_CONTEXT_MENU
		this.customContextMenu = options.customContextMenu !== undefined ? options.customContextMenu : Env.DEFAULT_CUSTOM_CONTEXT_MENU
		this.graphContainerElement = graphContainerElement
		this.ee = eventEmitter
		if (this.enableBuiltinContextMenu || this.customContextMenu) {
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
		if (!this.enableBuiltinContextMenu && customSectionsArray.length === 0) {
			return
		}
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
		let previousSectionWasSeen = false
		if (this.enableBuiltinContextMenu) {
			contextSectionsArray.forEach(section => {
				this.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction)
				previousSectionWasSeen = true
			})
		}
		customSectionsArray.forEach(section => {
			this.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction)
			previousSectionWasSeen = true
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
			const mainContainer = ul
				.append("li")
				.append("div")
				.attr("class", "virrvarr-context-menu-option")
				.on("click", () => {
					this.removeContextmenu()
					const data = (clickedItem && clickedItem.data) || null
					const id = (clickedItem && clickedItem.id) || null
					const edgeDirection = direction
					return menuItem.action(data, id, edgeDirection)
				})
			if (menuItem.icon) {
				mainContainer.append("div").attr("class", "virrvarr-context-menu-option-icon").style("background-image", `url("${menuItem.icon}")`)
			}
			mainContainer
				.append("div")
				.attr("class", "virrvarr-context-menu-option-title")
				.text(() => menuItem.label)
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
				icon:
					"data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill='%23000000' d='M14,0 C15.1045695,0 16,0.8954305 16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z M14,2 L2,2 L2,14 L14,14 L14,2 Z M10.2928932,5.29289322 C10.6834175,4.90236893 11.3165825,4.90236893 11.7071068,5.29289322 C12.0976311,5.68341751 12.0976311,6.31658249 11.7071068,6.70710678 L11.7071068,6.70710678 L7,11.4142136 L4.29289322,8.70710678 C3.90236893,8.31658249 3.90236893,7.68341751 4.29289322,7.29289322 C4.68341751,6.90236893 5.31658249,6.90236893 5.70710678,7.29289322 L5.70710678,7.29289322 L7,8.58578644 Z' /></svg>",
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
				icon:
					"data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill='%23000000' d='M14,0 C15.1045695,0 16,0.8954305 16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z M14,2 L2,2 L2,14 L14,14 L14,2 Z M10.2928932,5.29289322 C10.6834175,4.90236893 11.3165825,4.90236893 11.7071068,5.29289322 C12.0976311,5.68341751 12.0976311,6.31658249 11.7071068,6.70710678 L11.7071068,6.70710678 L7,11.4142136 L4.29289322,8.70710678 C3.90236893,8.31658249 3.90236893,7.68341751 4.29289322,7.29289322 C4.68341751,6.90236893 5.31658249,6.90236893 5.70710678,7.29289322 L5.70710678,7.29289322 L7,8.58578644 Z' /></svg>",
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
				icon:
					"data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill='%23000000' d='M15,10 C15.5522847,10 16,10.4477153 16,11 L16,11 L16,16 L11,16 C10.4477153,16 10,15.5522847 10,15 C10,14.4477153 10.4477153,14 11,14 L11,14 L14,14 L14,11 C14,10.4477153 14.4477153,10 15,10 Z M1,10 C1.55228475,10 2,10.4477153 2,11 L2,11 L2,14 L5,14 C5.55228475,14 6,14.4477153 6,15 C6,15.5522847 5.55228475,16 5,16 L5,16 L0,16 L8.8817842e-16,11 C8.8817842e-16,10.4477153 0.44771525,10 1,10 Z M16,0 L16,5 C16,5.55228475 15.5522847,6 15,6 C14.4477153,6 14,5.55228475 14,5 L14,5 L14,2 L11,2 C10.4477153,2 10,1.55228475 10,1 C10,0.44771525 10.4477153,0 11,0 L11,0 L16,0 Z M5,0 C5.55228475,0 6,0.44771525 6,1 C6,1.55228475 5.55228475,2 5,2 L5,2 L2,2 L2,5 C2,5.55228475 1.55228475,6 1,6 C0.44771525,6 2.74146524e-17,5.55228475 6.123234e-17,5 L6.123234e-17,5 L3.6739404e-16,0 Z' /></svg>",
				action: () => {
					this.ee.trigger(EventEnum.ZOOM_REQUESTED)
				}
			}
		]
	}
}
