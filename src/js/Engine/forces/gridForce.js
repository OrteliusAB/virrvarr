/**
 * Creates a matrix force that pulls nodes into given x and y axises
 * @param {boolean=} useY - If true the Y axis force will be activated
 * @param {boolean=} useX - If true the X axis force will be activated
 * @param {number=} strength - How strong should the force that pulls node into the axis be?
 * @param {number=} size - How large should each axis space be?
 * @param {number=} multiplier - If no size is provided the size of nodes will be used. This multiplier can be used to multiply the measurements by a given number.
 */
const matrixForce = (useY = true, useX = true, strength, size = undefined, multiplier) => {
	let nodes = []
	let maxSizeX = size
	let maxSizeY = size
	const power = strength ? strength : 0.6
	const offsetMultiplier = multiplier ? multiplier : 3

	function force(alpha) {
		const l = alpha * power
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			if (useY) {
				const closestArea = Math.round(node.y / maxSizeY) * maxSizeY
				node.vy -= (node.y - closestArea) * l
			}
			if (useX) {
				const closestArea = Math.round(node.x / maxSizeX) * maxSizeX
				node.vx -= (node.x - closestArea) * l
			}
		}
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = newNodes
		if (size) {
			return
		}
		maxSizeX = 0
		maxSizeY = 0
		nodes.forEach(node => {
			maxSizeX = Math.max(maxSizeX, getWidth(node) * offsetMultiplier)
			maxSizeY = Math.max(maxSizeY, getHeight(node) * offsetMultiplier)
		})
		if (useY && useX) {
			maxSizeX = Math.max(maxSizeX, maxSizeY)
			maxSizeY = Math.max(maxSizeX, maxSizeY)
		}
	}

	return force
}

export default matrixForce
