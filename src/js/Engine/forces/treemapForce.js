import * as d3 from "d3"

/**
 * Force that generates a treemap
 * @param {any => "string" | "string"} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {number} width - Maximum width for the treemap
 * @param {number} height - Maximum height for the treemap
 * @param {number} strength - Strength of the treemap force
 */
const treemapForce = (groupBy, width, height, strength) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : node => node.type
	let nodes = []
	let treemapWidth = width
	let treemapHeight = height
	let halfTreemapWidth
	let halfTreemapHeight
	const power = strength ? strength : 0.7
	let groups = []
	let treemap = []
	const multiplier = 0.6

	function force(alpha) {
		if (!treemap.length) {
			return
		}
		const l = alpha * power
		treemap.forEach(group => {
			const centerX = group.x + group.width / 2
			const centerY = group.y + group.height / 2
			group.data.forEach(node => {
				node.vx -= (node.x - centerX) * l
				node.vy -= (node.y - centerY) * l
			})
		})
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = newNodes
		const newGroups = new Map()
		let maxSizeX = 0
		let maxSizeY = 0
		nodes.forEach(node => {
			const group = computeGroup(node)
			if (!newGroups.has(group)) {
				newGroups.set(group, [node])
			} else {
				newGroups.get(group).push(node)
			}
			maxSizeX = Math.max(maxSizeX, getWidth(node) * multiplier)
			maxSizeY = Math.max(maxSizeY, getHeight(node) * multiplier)
		})
		const fullSize = maxSizeY * nodes.length + maxSizeX * nodes.length
		if (!width && !height) {
			treemapWidth = maxSizeX * nodes.length
			treemapHeight = maxSizeY * nodes.length
		} else if (!width) {
			treemapWidth = fullSize - treemapHeight > 0 ? fullSize - treemapHeight : 400
		} else if (!height) {
			treemapHeight = fullSize - treemapWidth > 0 ? fullSize - treemapWidth : 400
		}
		halfTreemapWidth = treemapWidth / 2
		halfTreemapHeight = treemapHeight / 2
		groups = [...newGroups.values()]

		if (groups.length === 0) {
			return
		}

		//Compute Treemap
		const canvas = {
			data: [],
			xStart: 0,
			yStart: 0,
			width: treemapWidth,
			height: treemapHeight
		}
		const totalValue = groups.reduce((acc, current) => acc + current.length, 0)
		const dataScaled = groups.map(group => (group.length * treemapHeight * treemapWidth) / totalValue)

		const getMinWidth = () => {
			if (canvas.height ** 2 > canvas.width ** 2) {
				return { value: canvas.width, vertical: false }
			}
			return { value: canvas.height, vertical: true }
		}

		function worstRatio(row, width) {
			const sum = row.reduce((acc, current) => acc + current, 0)
			const rowMax = Math.max(...row)
			const rowMin = Math.min(...row)
			return Math.max((width ** 2 * rowMax) / sum ** 2, sum ** 2 / (width ** 2 * rowMin))
		}

		const layoutRow = (row, width, vertical) => {
			const rowHeight = row.reduce((acc, current) => acc + current, 0) / width
			row.forEach(rowItem => {
				const rowWidth = rowItem / rowHeight
				let data
				if (vertical) {
					data = {
						x: canvas.xStart,
						y: canvas.yStart,
						width: rowHeight,
						height: rowWidth,
						data: groups[canvas.data.length]
					}
					canvas.yStart += rowWidth
				} else {
					data = {
						x: canvas.xStart,
						y: canvas.yStart,
						width: rowWidth,
						height: rowHeight,
						data: groups[canvas.data.length]
					}
					canvas.xStart += rowWidth
				}
				canvas.data.push(data)
			})
			if (vertical) {
				canvas.xStart += rowHeight
				canvas.yStart -= width
				canvas.width -= rowHeight
			} else {
				canvas.xStart -= width
				canvas.yStart += rowHeight
				canvas.height -= rowHeight
			}
		}

		const layoutLastRow = (rows, children, width) => {
			const minWidth = getMinWidth()
			layoutRow(rows, width, minWidth.vertical)
			layoutRow(children, width, minWidth.vertical)
		}

		const squarify = (children, row, width) => {
			if (children.length === 1) {
				layoutLastRow(row, children, width)
				return
			}
			const rowWithChild = [...row, children[0]]
			if (row.length === 0 || worstRatio(row, width) >= worstRatio(rowWithChild, width)) {
				children.shift()
				squarify(children, rowWithChild, width)
				return
			}
			layoutRow(row, width, getMinWidth().vertical)
			squarify(children, [], getMinWidth().value)
			return
		}

		squarify(dataScaled, [], getMinWidth().value)

		const roundValue = number => Math.max(Math.round(number * 100) / 100, 0)

		treemap = canvas.data.map(group => ({
			...group,
			x: roundValue(group.x) - halfTreemapWidth,
			y: roundValue(group.y) - halfTreemapHeight,
			width: roundValue(group.width),
			height: roundValue(group.height)
		}))

		//Not sure if this code should be located here in the long run, but for now
		d3.select("#layout-extras").selectAll("*").remove()
		d3.select("#layout-extras")
			.selectAll(".treemap-zone")
			.data(treemap)
			.enter()
			.append("rect")
			.classed("treemap-zone", true)
			.attr("x", d => d.x)
			.attr("y", d => d.y)
			.attr("width", d => d.width)
			.attr("height", d => d.height)
			.attr("style", "fill:transparent;stroke:black;pointer-events:none;")
	}

	return force
}
export default treemapForce
