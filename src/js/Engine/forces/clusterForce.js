import * as d3 from "d3"
//Adapted from: https://observablehq.com/@d3/clustered-bubbles
/**
 * Creates a cluster force that forces nodes together
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {number=} strength - How strong should the force be that pulls the nodes together? (0-1)
 * @param {boolean=} showOutline - Should a square with a title be rendered around each cluster?
 */
const clusterForce = (groupBy, strength, showOutline = false) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : node => node.type
	const power = strength ? strength : 0.7
	let groups = []
	let nodes = []
	let element
	const BORDER_PADDING = 200

	const computeCentroid = nodes => {
		let x = 0
		let y = 0
		let z = 0
		for (const node of nodes) {
			const k = (node.radius ? node.radius : Math.max(node.width, node.height)) ** 2
			x += node.x * k
			y += node.y * k
			z += k
		}
		return { x: x / z, y: y / z }
	}

	function force(alpha) {
		const l = alpha * power
		groups.forEach(group => {
			const centroid = computeCentroid(group)
			group.forEach(node => {
				const { x: cx, y: cy } = centroid
				node.vx -= (node.x - cx) * l
				node.vy -= (node.y - cy) * l
			})
		})
		if (showOutline) {
			groups.forEach((group, index) => {
				let xStart = Infinity
				let yStart = Infinity
				let xEnd = -Infinity
				let yEnd = -Infinity
				group.forEach(node => {
					const halfWidth = node.width ? node.width / 2 : node.radius
					const halfHeight = node.height ? node.height / 2 : node.radius
					node.x - halfWidth < xStart && (xStart = node.x - halfWidth)
					node.y - halfHeight < yStart && (yStart = node.y - halfHeight)
					const nodeEndX = node.x + halfWidth
					const nodeEndY = node.y + halfHeight
					nodeEndX > xEnd && (xEnd = nodeEndX)
					nodeEndY > yEnd && (yEnd = nodeEndY)
				})
				const g = d3.select(element).select(`[class="${index}"]`)
				g.attr("transform", `translate(${xStart - BORDER_PADDING / 2}, ${yStart - BORDER_PADDING / 2})`)
					.select("rect")
					.attr("height", yEnd - yStart + BORDER_PADDING)
				g.selectAll("rect").attr("width", xEnd - xStart + BORDER_PADDING)
			})
		}
	}

	force.element = newElement => {
		element = newElement
	}

	force.initialize = newNodes => {
		nodes = newNodes
		const newGroups = new Map()
		nodes.forEach(node => {
			const group = computeGroup(node)
			if (!newGroups.has(group)) {
				newGroups.set(group, [node])
			} else {
				newGroups.get(group).push(node)
			}
		})
		if (showOutline) {
			d3.select(element).selectAll("*").remove()
			Array.from(newGroups.keys()).forEach((key, index) => {
				const g = d3.select(element).append("g").classed(index, true)
				g.append("rect").attr("stroke-width", "4px").attr("stroke", "#000000").attr("fill", "none")
				g.append("rect").attr("stroke-width", "4px").attr("stroke", "#000000").attr("fill", "#f7f7f7").attr("y", -35).attr("height", 35)
				g.append("text")
					.text(key === undefined ? "N/A" : key)
					.attr("style", "font-size:26px;")
					.attr("y", -10)
					.attr("x", 10)
			})
		}
		groups = [...newGroups.values()]
	}

	return force
}

export default clusterForce
