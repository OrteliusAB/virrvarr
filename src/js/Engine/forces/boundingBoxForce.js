/**
 * Creates a rectangular bounding box that stops nodes from leaving it
 * @param {number=} width - Width of the box. If not set will be determined by the sizes and amounts of the nodes
 * @param {number=} height - Height of the box. If not set will be determined by the sizes and amounts of the nodes
 */
const boundingBoxForce = (width, height) => {
	let nodes = []
	let computedWidth = width
	let computedHeight = height
	const multiplier = 5

	function force() {
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			if (node.x < -computedWidth) {
				node.x = -computedWidth
			} else if (node.x > computedWidth) {
				node.x = computedWidth
			}
			if (node.y < -computedHeight) {
				node.y = -computedHeight
			} else if (node.y > computedHeight) {
				node.y = computedHeight
			}
		}
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = newNodes
		if (!width || !height) {
			let size = 0
			nodes.forEach(node => {
				size += Math.max(size, getWidth(node) * multiplier, getHeight(node) * multiplier)
			})
			if (!width && !height) {
				computedWidth = size / 2
				computedHeight = size / 2
			} else if (!width) {
				computedWidth = size - height > 0 ? size - height : 100
			} else if (!height) {
				computedHeight = size - width > 0 ? size - width : 100
			}
		} else {
			computedWidth = width
			computedHeight = height
		}
		computedWidth = computedWidth / 2
		computedHeight = computedHeight / 2
	}

	return force
}

export default boundingBoxForce
