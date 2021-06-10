export default class VVEdge {
	constructor(id, type, sourceNode, targetNode, nameFrom, nameTo, multiplicityFrom, multiplicityTo, lineType, markerFrom, markerTo, data) {
		//User provided information
		this.id = id
		this.type = type
		this.sourceNode = sourceNode
		this.targetNode = targetNode
		this.nameFrom = nameFrom
		this.nameTo = nameTo
		this.multiplicityFrom = multiplicityFrom
		this.multiplicityTo = multiplicityTo
		this.lineType = lineType
		this.markerFrom = markerFrom
		this.markerTo = markerTo
		this.data = data

		//Status
		this.isToFocused = false
		this.isFromFocused = false

		//Visual information
		this.isFiltered = false
		this.isHidden = false

		//Relative coordinates
		this.labelToRelativeX = undefined
		this.labelToRelativeY = undefined
		this.labelToRelativeWidth = undefined
		this.labelToRelativeHeight = undefined
		this.labelFromRelativeX = undefined
		this.labelFromRelativeY = undefined
		this.labelFromRelativeWidth = undefined
		this.labelFromRelativeHeight = undefined

		//Meta Data calculated at runtime
		this.edgeDistance = undefined
		this.nameToWidth = undefined
		this.nameFromWidth = undefined
		this.multiEdgeCount = undefined
		this.multiEdgeIndex = undefined
		this.curvePoint = undefined

		//D3 relevant attributes
		this.index = this.source = undefined //index reference
		this.target = undefined //index reference
	}

	isInverse() {
		return this.nameFrom || this.markerFrom
	}

	/**
	 * Updates the main data points of the edge after it has been created
	 * @param {string} type - Type of edge
	 * @param {string} nameFrom - Name in the from direction
	 * @param {string} nameTo - Name in the to direction
	 * @param {string} multiplicityFrom - Multiplicity in the from direction
	 * @param {string} multiplicityTo - Multiplicity in the to direction
	 * @param {"line"|"cubicbezier"|"taxi"|"fulltaxi"} lineType - Line type for the edge
	 * @param {"arrow"|"diamond"|"square"|"none"} markerFrom - Marker type in the from direction
	 * @param {"arrow"|"diamond"|"square"|"none"} markerTo - Marker type in the to direction
	 * @param {any} data - Bound data
	 */
	updateData(type, nameFrom, nameTo, multiplicityFrom, multiplicityTo, lineType, markerFrom, markerTo, data) {
		this.type = type
		this.nameFrom = nameFrom
		this.nameTo = nameTo
		this.multiplicityFrom = multiplicityFrom
		this.multiplicityTo = multiplicityTo
		this.lineType = lineType
		this.markerFrom = markerFrom
		this.markerTo = markerTo
		this.data = data
	}
}
