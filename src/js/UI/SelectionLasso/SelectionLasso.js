import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"

/**
 * The selection lasso class handles drawing the selection lasso on screen, and determining node focuses based on it.
 */
export default class SelectionLasso {
	/**
	 *
	 * @param {HTMLElement} graphContainerElement
	 * @param {EventEmitter} eventEmitter
	 */
	constructor(graphContainerElement, eventEmitter) {
		this.graphContainerElement = graphContainerElement
		this.ee = eventEmitter
		this.lasso = this.initializeLasso()
		this.isLassoEnabled = false
		this.isLassoActive = false
		this.originX = 0
		this.originY = 0
		this.ee.on(EventEnum.LASSO_MODE_TOGGLED, isEnabled => {
			this.isLassoEnabled = isEnabled
			!isEnabled && this.hideLasso()
		})
		this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.destroy())
	}

	/**
	 * Initializes the lasso
	 */
	initializeLasso() {
		d3.select(this.graphContainerElement)
			.on("mousedown", () => this.isLassoEnabled && this.showLasso())
			.on("mousemove", () => this.isLassoEnabled && this.isLassoActive && this.moveLasso())
			.on("mouseup", () => this.isLassoActive && this.hideLasso())
			.on("mouseout", () => {
				let outsideContainer = true
				if (d3.event.relatedTarget) {
					let target = d3.event.relatedTarget
					while (target.parentElement) {
						if (target.parentElement === this.graphContainerElement) {
							outsideContainer = false
							break
						}
						target = target.parentElement
					}
				}
				if (this.isLassoActive && outsideContainer) {
					this.hideLasso()
				}
			})
		return d3
			.select(this.graphContainerElement)
			.append("div")
			.attr("id", "selection-lasso")
			.on("mousemove", () => this.isLassoEnabled && this.isLassoActive && this.moveLasso())
			.node()
	}

	/**
	 * Move the lasso based on new mouse coordinates
	 */
	moveLasso() {
		const coordinates = d3.mouse(this.graphContainerElement)
		const newX = coordinates[0] + this.graphContainerElement.getBoundingClientRect().x - window.pageXOffset
		const newY = coordinates[1] + this.graphContainerElement.getBoundingClientRect().y - window.pageYOffset
		const relativeX = newX - this.originX
		const relativeY = newY - this.originY
		const width = Math.abs(relativeX)
		const height = Math.abs(relativeY)
		this.lasso.style.width = `${width}px`
		this.lasso.style.height = `${height}px`
		this.lasso.style.left = `${Math.min(newX, this.originX)}px`
		this.lasso.style.top = `${Math.min(newY, this.originY)}px`
		const rect = this.lasso.getBoundingClientRect()
		this.ee.trigger(EventEnum.LASSO_MOVED, rect.x, rect.y, width, height)
	}

	/**
	 * Shows the lasso
	 */
	showLasso() {
		const coordinates = d3.mouse(this.graphContainerElement)
		this.originX = coordinates[0] + this.graphContainerElement.getBoundingClientRect().x - window.pageXOffset
		this.originY = coordinates[1] + this.graphContainerElement.getBoundingClientRect().y - window.pageYOffset
		this.lasso.style.display = "block"
		this.lasso.style.width = "0px"
		this.lasso.style.height = "0px"
		this.lasso.style.left = `${this.originX}px`
		this.lasso.style.top = `${this.originY}px`
		this.isLassoActive = true
		this.ee.trigger(EventEnum.LASSO_ENTER)
	}

	/**
	 * Hides the lasso
	 */
	hideLasso() {
		this.originX = 0
		this.originY = 0
		this.lasso.style.removeProperty("display")
		this.isLassoActive = false
		this.ee.trigger(EventEnum.LASSO_EXIT)
	}

	/**
	 * Unmounts the lasso from the DOM
	 */
	destroy() {
		this.lasso.remove()
	}
}
