/* eslint-disable no-unused-vars */
import VVNode from "../../Model/Node"
import VVEdge from "../../Model/Edge"
/**
 * Takes a leveled hierarchy graph and reorders the contained edges to an optimal position.
 * If a fake hierarchy is provided null values will be inserted into the resulting order.
 * Solution is partially inspired by the "Hungarian Method" for maximization
 * @param {VVNode[][]} hierarchy
 * @param {{id: string}[][]} fakeHierarchy
 * @param {VVEdge[]} edges
 * @param {{sourceNode: string, targetNode: string}} fakeEdges
 * @returns {VVNode[][]} - Ordered Hierarchy
 */
export const edgeOrder = (hierarchy, edges, fakeHierarchy, fakeEdges = []) => {
	if (hierarchy.length === 1) {
		return hierarchy
	}

	let fullHierarchy = fakeHierarchy ? hierarchy.map((level, index) => [...level, ...fakeHierarchy[index]]) : hierarchy

	//Only edges that go between two adjacent levels should be included
	const nodeLevelMap = new Map()
	const nodeIndexInLevel = new Map()
	fullHierarchy.forEach((level, levelIndex) => {
		level.forEach((node, nodeIndex) => {
			nodeLevelMap.set(node.id, levelIndex)
			nodeIndexInLevel.set(node.id, nodeIndex)
		})
	})
	const allEdges = [...edges, ...fakeEdges].filter(edge => {
		const sourceLevel = nodeLevelMap.get(edge.sourceNode)
		const targetLevel = nodeLevelMap.get(edge.targetNode)
		if (sourceLevel === targetLevel - 1) {
			return true
		}
		return false
	})

	//The index of the nodes in the hierarchy will change during ordering. We need to keep track of this
	const updateNodeIndexForLevel = level => {
		level.forEach((node, nodeIndex) => {
			nodeIndexInLevel.set(node.id, nodeIndex)
		})
	}
	const findNodeIndexInLevel = nodeID => {
		return nodeIndexInLevel.get(nodeID)
	}

	//When it has been determined what node is most likely to need to lie to the left we can recursively check if any other node is better suited
	//This is necessary because the initial "optimal" node is just an approximation
	const findLeftOptimality = (index, matrix) => {
		const foundLeftSums = matrix.map(row => (row.sum[index] > 0 ? row.sum[index] : 0))
		const maxIndex = foundLeftSums.indexOf(Math.max(...foundLeftSums))
		if (foundLeftSums[maxIndex] !== 0) {
			return findLeftOptimality(maxIndex, matrix)
		}
		return index
	}

	//Order scan is from start level to end level
	//Reverse is when we go from top to bottom rather than bottom to top
	//This loop could probably be made faster in the future.
	const orderHierarchyLevels = (hierarchy, isReverse = false) => {
		hierarchy.forEach((level, levelIndex) => {
			const matrix = level.map(node => {
				const nodeSourceIndexes = allEdges.reduce((acc, edge, index) => {
					if (!isReverse && edge.targetNode === node.id) {
						acc.push(findNodeIndexInLevel(edge.sourceNode))
					} else if (isReverse && edge.sourceNode === node.id) {
						acc.push(findNodeIndexInLevel(edge.targetNode))
					}
					return acc
				}, [])
				return {
					node,
					sum: level.map(neighbourNode => {
						if (neighbourNode.id === node.id) {
							return 0
						}
						const neighbourSourceIndexes = allEdges.reduce((acc, edge, index) => {
							if (!isReverse && edge.targetNode === neighbourNode.id) {
								acc.push(findNodeIndexInLevel(edge.sourceNode))
							} else if (isReverse && edge.sourceNode === neighbourNode.id) {
								acc.push(findNodeIndexInLevel(edge.targetNode))
							}
							return acc
						}, [])
						//These parameters describe the penalty of being to the left / right of the neighbour in terms of crossings
						let nodeIsToTheLeft = 0
						let nodeIsToTheRight = 0
						nodeSourceIndexes.forEach(nodeIndex => {
							neighbourSourceIndexes.forEach(neighbourIndex => {
								nodeIndex < neighbourIndex && nodeIsToTheRight++
								nodeIndex > neighbourIndex && nodeIsToTheLeft++
							})
						})
						//This result represents how many *less* crossings there will be if the node is to the left of its neighbour
						//I.e. A higher number means it is better to the left
						return nodeIsToTheRight - nodeIsToTheLeft
					})
				}
			})
			const newOrder = []
			const orderLength = matrix.length
			for (let i = 0; i < orderLength; i++) {
				const sums = matrix.map(row => row.sum.reduce((acc, cell) => acc + cell, 0))
				const indexToSplit = findLeftOptimality(sums.indexOf(Math.max(...sums)), matrix)
				newOrder.push(matrix[indexToSplit].node)
				matrix.forEach(row => {
					row.sum.splice(indexToSplit, 1) //Remove the column
				})
				matrix.splice(indexToSplit, 1) //Remove the row
			}
			updateNodeIndexForLevel(newOrder)
			hierarchy[levelIndex] = newOrder
		})
		return hierarchy
	}

	//We sweep bottom to top and then top to bottom
	//A case could be made for repeating the process until an optimal layout is found. A single pass usually gives an OK result though.
	for (let i = 0; i < 1; i++) {
		fullHierarchy = orderHierarchyLevels(orderHierarchyLevels(fullHierarchy).reverse(), true).reverse()
	}
	//Initial reactions suggest that doing a bottom to top scan last gives a generally slightly nicer result.
	fullHierarchy = orderHierarchyLevels(fullHierarchy)

	return fullHierarchy
}
