import * as d3 from "d3"

/**
 * Creates a D3 curve function.
 */
const curveFunction = d3
	.line()
	.x(d => {
		return d.x
	})
	.y(d => {
		return d.y
	})
	.curve(d3.curveCardinal)

/**
 * Creates a d3 loop function.
 */
const loopFunction = d3
	.line()
	.x(d => {
		return d.x
	})
	.y(d => {
		return d.y
	})
	.curve(d3.curveCardinal.tension(-1))

/**
 * Calculates the radian of an angle.
 * @param {number} angle
 */
const calculateRadian = angle => {
	angle = angle % 360
	if (angle < 0) {
		angle = angle + 360
	}
	let arc = (2 * Math.PI * angle) / 360
	if (arc < 0) {
		arc = arc + 2 * Math.PI
	}
	return arc
}

/**
 * Calculates the point where the edge between the source and target node intersects the border of the target node.
 * @param {object} source - source node of the edge
 * @param {object} target - target node of the edge
 * @param {number} additionalDistance - additional distance, or what is essentially a padding.
 */
const calculateIntersection = (source, target, additionalDistance) => {
	const dx = target.x - source.x
	const dy = target.y - source.y
	let innerDistance = target.radius

	//Rectangles require some more work...
	if (target.shape === "rectangle") {
		const mEdge = Math.abs(dy / dx)
		const mRect = target.height / target.width

		if (mEdge <= mRect) {
			const timesX = dx / (target.width / 2)
			const rectY = dy / timesX
			innerDistance = Math.sqrt(Math.pow(target.width / 2, 2) + rectY * rectY)
		} else {
			const timesY = dy / (target.height / 2)
			const rectX = dx / timesY
			innerDistance = Math.sqrt(Math.pow(target.height / 2, 2) + rectX * rectX)
		}
	}

	const length = Math.sqrt(dx * dx + dy * dy)
	const ratio = (length - (innerDistance + additionalDistance)) / length
	const x = dx * ratio + source.x
	const y = dy * ratio + source.y

	return { x, y }
}

/**
 * Calculates the angle for a label in the graph
 * @param {number} point1 - First vector of the edge
 * @param {number} point2 - Second vector of the edge
 */
const calculateLabelAngle = (point1, point2) => {
	//Get the angle in degrees
	const dx = point1.x - point2.x
	const dy = point1.y - point2.y
	const theta = Math.atan2(dy, dx)
	let angle = theta * (180 / Math.PI)
	//Convert to a 360 scale
	angle += 180
	//Make sure the label is never upside-down
	if (angle > 90 && angle < 270) {
		angle -= 180
	}
	return angle
}

/**
 * Calculates a point between two points for creating a curved line.
 * @param {object} source - Point where the source node is intersected by the edge
 * @param {object} target - Point where the target node is intersected by the edge
 * @param {object} l - Edge itself
 */
const calculateCurvePoint = (source, target, l) => {
	const distance = calculateMultiEdgeDistance(l)

	const dx = target.x - source.x
	const dy = target.y - source.y

	const cx = source.x + dx / 2
	const cy = source.y + dy / 2

	const n = calculateNormalizedVector(source, target, distance)

	if (l.source.index < l.target.index) {
		n.x = -n.x
		n.y = -n.y
	}

	if (l.multiEdgeIndex % 2 !== 0) {
		n.x = -n.x
		n.y = -n.y
	}

	return { x: cx + n.x, y: cy + n.y }
}

/**
 * Calculate the optimal Multi Edge distance. This is typically used to ensure edges don't overlap.
 * @param {object} l - Edge to be evaluated
 */
const calculateMultiEdgeDistance = l => {
	const level = Math.floor((l.multiEdgeIndex - (l.multiEdgeCount % 2)) / 2) + 1
	const oddConstant = (l.multiEdgeCount % 2) * 15
	let distance = 0
	switch (level) {
		case 1:
			distance = 20 + oddConstant
			break
		case 2:
			distance = 45 + oddConstant
			break
		default:
			break
	}
	return distance
}

/**
 * Calculates the normal vector between two points.
 * @param {object} source - Source point
 * @param {object} target - Target point
 * @param {number} length - Distance
 */
const calculateNormalizedVector = (source, target, length) => {
	const dx = target.x - source.x
	const dy = target.y - source.y

	const nx = -dy
	const ny = dx

	const vlength = Math.sqrt(nx * nx + ny * ny)
	const ratio = length / vlength

	return { x: nx * ratio, y: ny * ratio }
}

/**
 * Calculates edges to its input and stores the point for the labels. Only for circle shaped nodes!
 * @param {object} l - Edge to be processed
 */
const calculateSelfEdgePath = l => {
	const node = l.source

	const loopShiftAngle = 360 / l.selfEdgeCount
	const loopAngle = Math.min(60, loopShiftAngle * 0.8)

	const arcFrom = calculateRadian(loopShiftAngle * l.selfEdgeIndex)
	const arcTo = calculateRadian(loopShiftAngle * l.selfEdgeIndex + loopAngle)

	const x1 = Math.cos(arcFrom) * node.radius
	const y1 = Math.sin(arcFrom) * node.radius

	const x2 = Math.cos(arcTo) * node.radius
	const y2 = Math.sin(arcTo) * node.radius

	const fixPoint1 = { x: node.x + x1, y: node.y + y1 }
	const fixPoint2 = { x: node.x + x2, y: node.y + y2 }

	const distanceMultiplier = 2.5
	const dx = ((x1 + x2) / 2) * distanceMultiplier
	const dy = ((y1 + y2) / 2) * distanceMultiplier
	const curvePoint = { x: node.x + dx, y: node.y + dy }
	l.curvePoint = curvePoint

	return loopFunction([fixPoint1, curvePoint, fixPoint2])
}

export default {
	calculateCurvePoint,
	calculateIntersection,
	calculateMultiEdgeDistance,
	calculateNormalizedVector,
	calculateRadian,
	curveFunction,
	loopFunction,
	calculateSelfEdgePath,
	calculateLabelAngle
}
