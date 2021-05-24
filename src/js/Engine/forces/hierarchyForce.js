/**
 * Creates an hierarhical force that sorts nodes on an axis (either y or x)
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {boolean=} useY - If true the hierachy will be top to bottom, otherwise it will be left to right
 * @param {number=} distance - How much space should be between nodes. If not set this will be determined by the size of the nodes
 */
const hierarchyForce = (groupBy, useY = true, distance = undefined) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : node => node.type
	let nodes = []
	let groups = []
	let offsetDistance = 0
	let halfSize = 0
	const offsetSizeMultiplier = 4

	function force() {
		const parameter = useY ? "y" : "x"
		groups.forEach((group, index) => {
			const coordinate = index * offsetDistance - halfSize
			group.forEach(node => {
				node[parameter] = coordinate
			})
		})
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = newNodes
		const newGroups = {}
		const computeSize = useY ? getHeight : getWidth
		let maxSize = distance ? distance : 0
		nodes.forEach(node => {
			let group = computeGroup(node)
			if (group === null || group === undefined) {
				group = 0
			}
			if (!newGroups[group]) {
				newGroups[group] = [node]
			} else {
				newGroups[group].push(node)
			}
			if (!distance) {
				maxSize = Math.max(maxSize, computeSize(node))
			}
		})
		offsetDistance = maxSize * offsetSizeMultiplier
		groups = Object.keys(newGroups)
			.sort((a, b) => {
				const valueAInt = parseInt(a)
				const valueBInt = parseInt(b)
				const valueA = isNaN(valueAInt) ? a : valueAInt
				const valueB = isNaN(valueBInt) ? a : valueBInt
				if (valueA < valueB) {
					return -1
				}
				if (valueA > valueB) {
					return 1
				}
				return 0
			})
			.map(key => newGroups[key])
		halfSize = ((groups.length - 1) * offsetDistance) / 2
	}

	return force
}

export default hierarchyForce
