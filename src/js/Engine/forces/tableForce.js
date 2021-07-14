import * as d3 from "d3"
import BaryCenter from "../../Utils/Algorithms/BaryCenter"
/**
 * Creates an adjacency matrix of nodes and their edges and orders them by barycenter
 * @param {string[]} headers - Array of headers to be used for the table. Can be blank strings, but must be included!
 * @param {(data) => string[]} getData - Function used for retrieving data from nodes
 */
const tableForce = (headers = [], getData) => {
	let nodes = []
	let element
	let edges
	let maxHeight = 0
	let maxWidth = 0
	let totalSideLength = 0
	let heightOffset = 0
	let widthOffset = 0

	function force() {
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			node.x = -widthOffset - maxWidth
			node.y = i * maxHeight + maxHeight / 2 - heightOffset
		}
	}

	force.element = newElement => {
		element = newElement
	}

	force.edges = newEdges => {
		edges = newEdges
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = BaryCenter(newNodes, edges)
		maxHeight = nodes.reduce((acc, node) => Math.max(acc, getHeight(node)), 0) + 20
		maxWidth = nodes.reduce((acc, node) => Math.max(acc, getWidth(node)), 0) + 20
		totalSideLength = maxHeight * nodes.length
		heightOffset = totalSideLength / 2

		const selector = d3.select(element)
		selector.selectAll("*").remove()
		const mainGroup = selector.append("g")
		const nodeData = nodes.map(node => getData(node.data))

		let textOffset = 0
		headers.forEach((header, i) => {
			const cell = header.substring(0, 100)
			mainGroup
				.append("text")
				.attr("y", -maxHeight + maxHeight / 2 + 18)
				.attr("x", textOffset)
				.attr("style", "font-size: 36px;font-weight: bold;")
				.text(cell)
			let maxLength = cell.length
			nodeData.forEach((data, j) => {
				let cell = data[i].substring(0, 100)
				if (data[i].length > 100) {
					cell += "..."
				}
				maxLength = Math.max(maxLength, cell.length)
				mainGroup
					.append("text")
					.attr("y", maxHeight * j + maxHeight / 2 + 18)
					.attr("x", textOffset)
					.attr("style", "font-size: 36px;")
					.text(cell)
			})
			textOffset += maxLength * 20 + 40
		})
		widthOffset = (mainGroup.node().getBBox().width + maxWidth) / 2
		mainGroup.attr("transform", `translate(${-widthOffset}, ${-heightOffset})`)
	}

	return force
}

export default tableForce
