/**
 * Orders nodes by barycenter.
 * Inspired by: http://profs.etsmtl.ca/mmcguffin/research/2012-mcguffin-simpleNetVis/mcguffin-2012-simpleNetVis.pdf
 */
export default (nodes, edges) => {
	const edgeMap = new Map()
	nodes.forEach(node => edgeMap.set(node.id, []))
	edges.forEach(edge => {
		edgeMap.get(edge.sourceNode).push(nodes.findIndex(targetNode => targetNode.id === edge.targetNode))
	})
	const orderedNodes = nodes.map((_, index) => ({ average: 0, index }))
	const findPosition = i => {
		return orderedNodes.findIndex(node => node.index === i)
	}
	for (let i = 0; i < 10; i++) {
		nodes.forEach((node, i) => {
			const position1 = findPosition(i)
			let sum = position1
			edgeMap.get(node.id).forEach(neighbor => {
				const position2 = findPosition(neighbor)
				sum += position2
			})
			orderedNodes[position1].average = sum / edgeMap.get(node.id).length + 1
		})
		orderedNodes.sort((a, b) => a.average - b.average)
	}
	return orderedNodes.map(orderedNode => nodes[orderedNode.index])
}
