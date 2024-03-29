import * as d3 from "d3"
import BaryCenter from "../../Utils/Algorithms/BaryCenter"
/**
 * Creates an adjacency matrix of nodes and their edges ordered by barycenter
 */
const adjacencyMatrixForce = () => {
	let nodes = []
	let element
	let edges
	let maxHeight = 0
	let size = 0
	let totalSideLength = 0
	let offset = 0

	function force() {
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			node.x = i * size - offset
			node.y = -maxHeight - offset
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
		const maxWidth = nodes.reduce((acc, node) => Math.max(acc, getWidth(node)), 0)
		maxHeight = nodes.reduce((acc, node) => Math.max(acc, getHeight(node)), 0)
		size = Math.max(maxWidth, maxHeight)
		totalSideLength = size * nodes.length
		offset = totalSideLength / 2

		const indexMap = new Map()
		nodes.forEach((node, index) => indexMap.set(node.id, index))
		const matrix = []
		for (let i = 0; i < nodes.length; i++) {
			matrix.push(new Array(nodes.length).fill(0))
		}
		edges.forEach(edge => {
			matrix[indexMap.get(edge.sourceNode)][indexMap.get(edge.targetNode)] = 1
		})

		const startX = -offset - size / 2
		const startY = -offset

		const selector = d3.select(element)
		selector.selectAll("*").remove()
		const highlightGroup = selector.append("g")
		const edgeGroup = selector.append("g")
		const textGroup = selector.append("g")

		for (let i = 0; i < matrix.length; i++) {
			const row = matrix[i]
			for (let j = 0; j < row.length; j++) {
				const g = highlightGroup.append("g")
				g.attr("class", "adjacency-matrix-force-edge")
					.append("rect")
					.attr("width", size)
					.attr("height", size)
					.attr("x", startX + size * j)
					.attr("y", startY + size * i)
					.attr("style", "fill:transparent;stroke:none;")
				edgeGroup
					.append("rect")
					.attr("width", size)
					.attr("height", size)
					.attr("x", startX + size * j)
					.attr("y", startY + size * i)
					.attr("style", `fill:${row[j] ? "#000000" : "transparent"};pointer-events:none;stroke:black;stroke-width:3px;`)
			}
			textGroup
				.append("text")
				.attr("x", startX + size * matrix.length)
				.attr("y", startY + size * i + size / 2 + 35)
				.attr("style", "font-size: 78px")
				.text(nodes[i].name)
			textGroup
				.append("text")
				.attr("x", startY + size * matrix.length)
				.attr("y", startX + size * (nodes.length - 1 - i) + size + 100)
				.attr("style", "font-size: 78px; transform:rotate(90deg);")
				.text(nodes[i].name)
		}
	}

	return force
}

export default adjacencyMatrixForce
