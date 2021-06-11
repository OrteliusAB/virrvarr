/**
 * Creates a table (or, list) of all nodes. By default nodes will be shown in alphabetical name order
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {number=} strength - How strong should the force be that pulls the nodes into the matrix? (0-1)
 */
const listForce = (groupBy, strength = undefined) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : node => node.name
	const power = strength ? strength : 0.9
	let nodes = []
	let size = 0
	let numberOfRowsAndColumns = 0
	let halfSize = 0
	const multiplier = 2

	function force(alpha) {
		const l = alpha * power
		let currentRow = 0
		let currentColumn = 0
		for (let i = 0; i < nodes.length; i++) {
			if (currentColumn === numberOfRowsAndColumns) {
				currentColumn = 0
				currentRow += 1
			}
			currentColumn += 1
			const node = nodes[i]
			node.vx -= (node.x - ((currentColumn - 1) * size - halfSize)) * l
			node.vy -= (node.y - (currentRow * size - halfSize)) * l
		}
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = newNodes
		nodes.sort((a, b) => {
			const valueA = computeGroup(a)
			const valueB = computeGroup(b)
			if (valueA < valueB) {
				return -1
			}
			if (valueA > valueB) {
				return 1
			}
			return 0
		})
		size = 0
		nodes.forEach(node => {
			size = Math.max(size, getWidth(node) * multiplier, getHeight(node) * multiplier)
		})
		numberOfRowsAndColumns = Math.ceil(Math.sqrt(nodes.length))
		halfSize = ((numberOfRowsAndColumns - 1) * size) / 2
	}

	return force
}

export default listForce
