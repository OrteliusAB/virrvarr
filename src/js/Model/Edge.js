export default class VVEdge {
	constructor(id, type, sourceNode, targetNode, nameFrom, nameTo, multiplicityFrom, multiplicityTo, data) {
		//User provided information
		this.id = id
		this.type = type
		this.sourceNode = sourceNode
		this.targetNode = targetNode
		this.nameFrom = nameFrom
		this.nameTo = nameTo
		this.multiplicityFrom = multiplicityFrom
		this.multiplicityTo = multiplicityTo
		this.data = data

        //Visual information
        this.isFiltered = false
        this.isHidden = false
        
        //Meta Data calculated at runtime
        this.edgeDistance = undefined
        this.nameToWidth = undefined
        this.nameFromWidth = undefined
        this.multiEdgeCount = undefined
        this.multiEdgeIndex = undefined
        this.curvePoint = undefined

        //D3 relevant attributes
        this.index = 
        this.source = undefined //index reference
        this.target = undefined //index reference
	}
}
