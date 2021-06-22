import MathUtils from "../../Utils/MathUtils"

/**
 * Creates a fan cluster force that forces nodes together
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
 * @param {number=} strength - How strong should the force be that pulls the nodes together? (0-1)
 */
const fanForce = (groupBy, strength) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : node => node.type
	const power = strength ? strength : 0.9
	const positionMap = new Map()
	let nodes = []

	function force(alpha) {
		const l = alpha * power
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			const target = positionMap.get(node.id)
			node.vx -= (node.x - target[0]) * l
			node.vy -= (node.y - target[1]) * l
		}
	}

	const getMaxMeasurement = node => (node.radius ? node.radius * 2 : Math.max(node.width, node.height))

	force.initialize = newNodes => {
		nodes = newNodes
		const groupsMap = new Map()
		newNodes.forEach(node => {
			const group = computeGroup(node)
			if (!groupsMap.has(group)) {
				groupsMap.set(group, [node])
			} else {
				groupsMap.get(group).push(node)
			}
		})
		const degreeIncrements = Math.floor(360 / groupsMap.size)
		Array.from(groupsMap.keys()).forEach((key, index) => {
			const radian = MathUtils.calculateRadian(degreeIncrements * index)
			const radianCos = Math.cos(radian)
			const radianSin = Math.sin(radian)
			const initialX = 300 * radianCos
			const initialY = 300 * radianSin
			let lastPosition = [initialX, initialY]
			groupsMap.get(key).forEach(node => {
				const maxMeasurement = getMaxMeasurement(node)
				const x = maxMeasurement * radianCos + lastPosition[0]
				const y = maxMeasurement * radianSin + lastPosition[1]
				positionMap.set(node.id, [x, y])
				const nextX = maxMeasurement * radianCos + x
				const nextY = maxMeasurement * radianSin + y
				lastPosition = [nextX, nextY]
			})
		})
	}

	return force
}

export default fanForce
