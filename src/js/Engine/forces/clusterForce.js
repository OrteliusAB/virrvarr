//Adapted from: https://observablehq.com/@d3/clustered-bubbles
/**
 * Creates a cluster force that forces nodes together
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {number=} strength - How strong should the force be that pulls the nodes together? (0-1)
 */
const clusterForce = (groupBy, strength) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : node => node.type
	const power = strength ? strength : 0.7
	let groups = []
	let nodes = []

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
		groups = [...newGroups.values()]
	}

	return force
}

export default clusterForce
