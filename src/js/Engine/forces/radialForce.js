/**
 * Creates a radial cluster force that forces nodes into a circular pattern
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {number=} strength - How strong should the force be? (0-1)
 */
const radialForce = (groupBy, strength) => {
	const power = typeof strength === "number" ? strength : 0.9
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : () => 0
	let groups = []
	let radiuses = []
	const MIN_RADIUS_OFFSET = 600
	const MIN_RADIUS_OFFSET_MULTIPLIER = 1.1

	function force(alpha) {
		for (let i = 0; i < groups.length; i++) {
			const radius = radiuses[i]
			for (let j = 0; j < groups[i].length; j++) {
				const node = groups[i][j]
				const dx = node.x || 1e-6
				const dy = node.y || 1e-6
				const r = Math.sqrt(dx * dx + dy * dy)
				const k = ((radius - r) * power * alpha) / r
				node.vx += dx * k
				node.vy += dy * k
			}
		}
	}

	const getMaxMeasurement = node => (node.radius ? node.radius * 2 : Math.max(node.width, node.height))

	force.initialize = newNodes => {
		const newGroups = new Map()
		newNodes.forEach(node => {
			const group = computeGroup(node)
			if (!newGroups.has(group)) {
				newGroups.set(group, [node])
			} else {
				newGroups.get(group).push(node)
			}
		})
		const keys = Array.from(newGroups.keys()).sort()
		groups = keys.map(key => newGroups.get(key))
		let lastRadius = 0
		radiuses = groups
			.map(group => {
				return group.reduce((acc, node) => acc + getMaxMeasurement(node), 0) / 3.14
			})
			.map(radius => {
				if (radius > lastRadius * MIN_RADIUS_OFFSET_MULTIPLIER + MIN_RADIUS_OFFSET) {
					return radius
				} else {
					lastRadius = lastRadius * MIN_RADIUS_OFFSET_MULTIPLIER + MIN_RADIUS_OFFSET
					return lastRadius
				}
			})
	}

	return force
}

export default radialForce
