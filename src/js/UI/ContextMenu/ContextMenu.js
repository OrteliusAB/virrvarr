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
		mouseY = mouseY - window.scrollY
		mouseX = mouseX - window.scrollX
		this.removeContextmenu()
		if (!this.enableBuiltinContextMenu && customSectionsArray.length === 0) {
			return
		}
		const mainDiv = d3
			.select(this.graphContainerElement)
			.append("div")
			.attr("id", "virrvarr-context-menu-container")
			.attr("class", "virrvarr-context-menu")
			.style("position", "fixed")
			.style("display", "block")
		const ulElement = mainDiv.append("ul").attr("class", "virrvarr-context-menu-options")
		const addItems = (left, top) => {
			let previousSectionWasSeen = false
			if (this.enableBuiltinContextMenu) {
				contextSectionsArray.forEach(section => {
					this.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction, left, top)
					previousSectionWasSeen = true
				})
			}
			customSectionsArray.forEach(section => {
				this.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction, left, top)
				previousSectionWasSeen = true
			})
		}
		addItems(0, 0)
		const divNode = mainDiv.node()
		const width = divNode.getBoundingClientRect().width
		const height = divNode.getBoundingClientRect().height
		const left = window.innerWidth - mouseX < width ? window.innerWidth - width : mouseX
		const top = window.innerHeight - mouseY < height ? window.innerHeight - height : mouseY
		mainDiv.style("left", left + "px").style("top", top + "px")
		ulElement.node().innerHTML = ""
		//The reason for doing this twice is because we need to know the full height in order to ensure the menu does not overflow the viewport.
		addItems(left, top)
	}

	/**
	 * Creates a sub menu for the context menu
	 * @param {object|null} clickedItem - Node, Edge, or "null" (canvas) that has been clicked
	 * @param {object[]} sections - User provided menu items
	 * @param {string?} direction The direction of the edge clicked (if applicable)
	 * @param {number} startX - Start X coordinate
	 * @param {number} startY - Start Y coordinate
	 */
	createSubMenu(parent, clickedItem, sections, direction = undefined, startX, startY) {
		const mainDiv = parent.append("div").attr("class", "virrvarr-context-menu").style("position", "fixed")
		const ulElement = mainDiv.append("ul").attr("class", "virrvarr-context-menu-options")
		const addItems = (left, top) => {
			let previousSectionWasSeen = false
			sections.forEach(section => {
				this.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction, left, top)
				previousSectionWasSeen = true
			})
		}
		addItems()
		const parentNode = parent.node()
		const offsetTop = parentNode.offsetTop
		const offsetLeft = parentNode.getBoundingClientRect().width
		const relativeStartX = startX + offsetLeft
		const relativeStartY = startY + offsetTop - 6 //6 is the top and bottom margin for the menu. If it is changed then this part must be changed as well
		const divNode = mainDiv.node()
		const width = divNode.getBoundingClientRect().width
		const height = divNode.getBoundingClientRect().height
		const left = window.innerWidth - relativeStartX < width ? window.innerWidth - width : relativeStartX
		const top = window.innerHeight - relativeStartY < height ? window.innerHeight - height : relativeStartY
		mainDiv.style("left", left + "px").style("top", top + "px")
		ulElement.node().innerHTML = ""
		addItems(left, top)
		mainDiv.style("display", "none")
	}

	/**
	 * Processes and creates a specific section of the context menu.
	 * @param {HTMLElement} ul - The entire menu
	 * @param {object[]} section - Array of menu items to be added
	 * @param {boolean} shouldAddSeparatorBefore - Add a separating line before this new section?
	 * @param {object|null} clickedItem - Item that was clicked
	 * @param {string?} direction - Direction of the clicked edge, if applicable.
	 * @param {number} startX - Start X coordinate.
	 * @param {number} startY - Start Y coordinate.
	 */
	processSection(ul, section, shouldAddSeparatorBefore, clickedItem, direction = undefined, startX, startY) {
		if (shouldAddSeparatorBefore) {
			ul.append("li").append("div").attr("class", "virrvarr-context-menu-divider")
		}
		section.forEach(menuItem => {
			const mainContainer = ul
				.append("li")
				.append("div")
				.attr("class", "virrvarr-context-menu-option")
				.classed("virrvarr-context-menu-option-disabled", menuItem.disabled)
			if (!menuItem.disabled) {
				mainContainer.on("click", () => {
					this.removeContextmenu()
					const data = (clickedItem && clickedItem.data) || null
					const id = (clickedItem && clickedItem.id) || null
					const edgeDirection = direction
					typeof menuItem.action === "function" ? menuItem.action(data, id, edgeDirection) : null
				})
			}
			if (menuItem.icon) {
				mainContainer.append("div").attr("class", "virrvarr-context-menu-option-icon").style("background-image", `url("${menuItem.icon}")`)
			}
			mainContainer
				.append("div")
				.attr("class", "virrvarr-context-menu-option-title")
				.classed("virrvarr-context-menu-option-title-disabled", menuItem.disabled)
				.text(() => menuItem.label)
			const arrowIconContainer = mainContainer.append("div").attr("class", "virrvarr-context-menu-option-icon")
			if (menuItem.children) {
				arrowIconContainer.style(
					"background-image",
					"url(\"data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M3.70710678,4.29289322 C3.31658249,3.90236893 2.68341751,3.90236893 2.29289322,4.29289322 C1.90236893,4.68341751 1.90236893,5.31658249 2.29289322,5.70710678 L8,11.4142136 L13.7071068,5.70710678 C14.0976311,5.31658249 14.0976311,4.68341751 13.7071068,4.29289322 C13.3165825,3.90236893 12.6834175,3.90236893 12.2928932,4.29289322 L8,8.58578644 L3.70710678,4.29289322 Z' transform='translate(8.000000, 7.707107) rotate(-90.000000) translate(-8.000000, -7.707107) '/></svg>\")"
				)
				this.createSubMenu(mainContainer, clickedItem, menuItem.children, (direction = undefined), startX, startY)
			}
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
				.map(section => {
					return section.filter(menuItem => (menuItem.type ? menuItem.type.includes(clickedItem.type) : true))
				})
				.filter(section => section.length > 0)
				.map(section => this.preProcessSection(section, clickedItem.data, clickedItem.id))
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
				.map(section => {
					return section.filter(menuItem => (menuItem.type ? menuItem.type.includes(clickedItem.type) : true))
				})
				.filter(section => section.length > 0)
				.map(section => this.preProcessSection(section, clickedItem.data, clickedItem.id, direction))
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
			customSections = [...this.customContextMenu.canvas].map(section => this.preProcessSection(section))
		}
		this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY)
	}

	/**
	 * The preprocessor makes sure to execute custom function menu items that are nested in child arrays. The function is executed recursively for all children's children.
	 * @param {*} section - Section to be preprocessed
	 * @param  {...any} ...args - Arguments depending on if it is a node an edge or the canvas that has been clicked
	 * @returns
	 */
	preProcessSection(section, ...args) {
		return section
			.map(item => {
				let executedItem = item
				if (typeof item === "function") {
					executedItem = item(...args)
				}
				if (executedItem.children) {
					executedItem.children = executedItem.children.map(childSection => this.preProcessSection(childSection, ...args))
				}
				return executedItem
			})
			.filter(item => item)
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
