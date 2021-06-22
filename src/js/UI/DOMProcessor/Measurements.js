import Env from "../../Config/Env"

export default class Measurements {
	constructor(graphContainerElement) {
		this.graphContainerElement = graphContainerElement

		this.measurementDiv = document.createElement("div")
		this.measurementDiv.id = "measurements-div"
		//Default styles are hard coded for now.
		this.measurementDiv.setAttribute("style", "font-size:12px; position: absolute;float: left;white-space: nowrap;visibility: hidden;")
		this.graphContainerElement.appendChild(this.measurementDiv)

		this.svgContainer = document.createElement("div")
		this.svgContainer.setAttribute("style", "font-size:12px; position: absolute;float: left;white-space: nowrap;visibility: hidden;display:none;")
		this.svgContainer.id = "measurement-svg-container"
		const measurementSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		measurementSVG.id = "measurements-svg"
		this.svgContainer.appendChild(measurementSVG)
		this.measurementG = document.createElementNS("http://www.w3.org/2000/svg", "g")
		measurementSVG.appendChild(this.measurementG)
		this.graphContainerElement.appendChild(this.svgContainer)

		this.measurementCache = new Map()
	}

	/**
	 * Calculates the width of a text string in pixels.
	 * @param {string} textStyle - optional css class to apply to to the text
	 */
	getTextWidth(string, textStyle) {
		if (this.measurementCache.has(string + textStyle)) {
			return this.measurementCache.get(string + textStyle)
		}
		if (textStyle) {
			this.measurementDiv.classList.add(textStyle)
		}
		this.measurementDiv.appendChild(document.createTextNode(string))
		const width = this.measurementDiv.offsetWidth
		if (textStyle) {
			this.measurementDiv.classList.remove(textStyle)
		}
		this.measurementCache.set(string + textStyle, width)
		this.measurementDiv.innerHTML = ""
		return width
	}

	/**
	 * Truncates a string to a given width.
	 * @param {number} maxLength - maximum length in pixels
	 * @param {string} textStyle - optional css class to apply to to the text
	 */
	truncate(text, maxLength, textStyle) {
		const query = text + maxLength + textStyle
		if (this.measurementCache.has(query)) {
			return this.measurementCache.get(query)
		}
		maxLength -= Env.ADDITIONAL_TEXT_SPACE
		if (isNaN(maxLength) || maxLength <= 0) {
			return "..."
		}
		const originalLength = text.length
		let textLength = text.length
		let textWidth
		let ratio
		while (true) {
			textWidth = this.getTextWidth(text, textStyle)
			if (textWidth <= maxLength) {
				break
			}
			ratio = textWidth / maxLength
			textLength = Math.floor(textLength / ratio)
			text = text.substring(0, textLength)
		}
		if (originalLength > textLength) {
			return text.substring(0, textLength - 3) + "..."
		}
		this.measurementCache.set(query, text)
		return text
	}

	/**
	 * Computes the bbox of an svg element.
	 * @param {SVGElement} element - Element to compute bbox for.
	 * @param {string=} query - If the value should be cached, a query can be passed in as well.
	 */
	getSVGBBox(element, query) {
		const computeBBox = () => {
			this.svgContainer.style.display = "block"
			this.measurementG.appendChild(element)
			const bBox = element.getBBox()
			this.measurementG.removeChild(element)
			this.svgContainer.style.display = "none"
			return bBox
		}
		if (query) {
			if (!this.measurementCache.has(query)) {
				this.measurementCache.set(query, computeBBox())
			}
			return this.measurementCache.get(query)
		}
		return computeBBox()
	}
}
