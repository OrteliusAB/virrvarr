import { determineLevels } from "../../Utils/Algorithms/DetermineLevels"
import DisjointGroups from "../../Utils/Algorithms/DisjointGroups"
import { edgeOrder } from "../../Utils/Algorithms/EdgeOrder"
import { makeAcyclic } from "../../Utils/Algorithms/MakeAcyclic"
import { straightenEdges } from "../../Utils/Algorithms/StraightenEdges"

/**
 * Creates an hierarhical force that sorts nodes on an axis (either y or x)
 * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node. If left blank mode is "auto"
 * @param {boolean=} useY - If true the hierachy will be top to bottom, otherwise it will be left to right
 * @param {number=} distance - How much space should be between nodes. If not set this will be determined by the size of the nodes
 * @param {boolean=} useLine - If set nodes will be set into a fixed order, trying to minimize edge crossings.
 */
const hierarchyForce = (groupBy, useY = true, distance = undefined, useLine = true) => {
	const computeGroup = groupBy ? (typeof groupBy === "string" ? node => node[groupBy] : node => groupBy(node.data)) : null
	let nodes = []
	let edges = []
	let groups = []
	let offsetDistance = 0
	let halfSize = 0
	let orderMeasurement = 0
	const offsetSizeMultiplier = 4

	function force() {
		const parameter = useY ? "y" : "x"
		const lineParameter = useY ? "x" : "y"
		groups.forEach((group, index) => {
			const coordinate = index * offsetDistance - halfSize
			group.forEach((node, nodeIndex) => {
				if (!node) {
					//There can be blank nodes inserted to create space
					return
				}
				node[parameter] = coordinate
				if (useLine) {
					node[lineParameter] = nodeIndex * orderMeasurement
				}
			})
		})
	}

	force.edges = newEdges => {
		edges = newEdges
	}

	const getWidth = node => (node.radius ? node.radius * 2 : node.width)
	const getHeight = node => (node.radius ? node.radius * 2 : node.height)

	force.initialize = newNodes => {
		nodes = newNodes
		//Compute sizes
		const computeLevelMeasurement = useY ? getHeight : getWidth
		const computeOrderMeasurement = useY ? getWidth : getHeight
		orderMeasurement = 0
		let levelMeasurement = distance ? distance : 0
		nodes.forEach(node => {
			if (!distance) {
				levelMeasurement = Math.max(levelMeasurement, computeLevelMeasurement(node))
			}
			orderMeasurement = Math.max(orderMeasurement, computeOrderMeasurement(node))
		})
		offsetDistance = levelMeasurement * offsetSizeMultiplier
		halfSize = ((groups.length - 1) * offsetDistance) / 2
		orderMeasurement *= 1.5

		//Compute level groups
		if (computeGroup) {
			const newGroups = {}
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
			})
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
		} else {
			//Auto compute a hierarchy layout
			//Compute the sub graphs inside of the graph
			const subGraphs = DisjointGroups(nodes, edges)

			//For each sub graph compute a hierarchy
			let hierarchies = subGraphs.map(nodeArray => {
				const [acyclicNodes, acyclicEdges] = makeAcyclic(nodeArray, edges)
				const { hierarchy, fakeNodesHierarchy, fakeEdges } = determineLevels(acyclicNodes, acyclicEdges)
				if (useLine) {
					const orderedNodes = edgeOrder(hierarchy, acyclicEdges, fakeNodesHierarchy, fakeEdges)
					const positionedNodes = straightenEdges(orderedNodes, [...acyclicEdges, ...fakeEdges])
					return positionedNodes
				}
				return hierarchy
			})

			if (useLine) {
				//Make sure all hierarchies are the same length
				const longestHierarchy = hierarchies.reduce((acc, hierarchy) => Math.max(acc, hierarchy.length), 0)
				hierarchies.forEach(hierarchy => {
					const maxRows = Math.max(...hierarchy.map(level => level.length))
					if (hierarchy.length < longestHierarchy) {
						for (let i = hierarchy.length; i < longestHierarchy; i++) {
							hierarchy.push(new Array(maxRows).fill(null))
						}
					}
				})
			}

			//Merge the hierarchies
			hierarchies = hierarchies.reduce((acc, hierarchy) => {
				hierarchy.forEach((level, index) => {
					if (!acc[index]) {
						acc[index] = level
					} else {
						acc[index] = [...acc[index], ...level]
					}
				})
				return acc
			}, [])

			groups = hierarchies
		}
	}

	return force
}

export default hierarchyForce
