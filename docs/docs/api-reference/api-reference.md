# API Reference

## Graph Constructor(element, *data*, options)
### Data
Parameter | Datatype
--- | ---
`nodes*`   |   Array {Object}
`edges*`   |   Array {Object}
Style   |   Object

### Data.nodes{Array}
Attribute | Datatype
--- | ---
`id*`   |   String
`name*`   |   String
type   |   String (id of node style object)
icon   |   String (URL)
isHidden   |   boolean
data   |   Any (data bound to object)

### Data.edges{Array}
Attribute | Datatype
--- | ---
`id*`   |   String
`sourceNode*`   |   String (id of node object)
`targetNode*`   |   String (id of node object)
nameTo   |   String
nameFrom   |   String
multiplicityTo   |   String
multiplicityFrom   |   String
lineType   |   String
markerFrom   |   "arrow","diamond","square","circle","hollowcircle","hollowreversearrow","none"
markerTo   |   "arrow","diamond","square","circle","hollowcircle","hollowreversearrow","none"
type   |   String (id of node style object)
data   |   Any (data bound to object)

###	Data.style{Object}
Attribute | Datatype
--- | ---
common   |   Object
nodes   |   Array {Object}
edges   |   Array {Object}

###	Data.style.common{Object}
Attribute | Datatype
--- | ---
nodeCursor   |   String
nodeCursorActive   |   String
edgeCursor   |   String
edgeCursorActive   |   String
canvasCursor   |   String
canvasCursorActive   |   String
selectionLassoColor   |   String
selectionLassoOpacity   |   String
selectionLassoBorderWidth   |   String
selectionLassoBorderColor   |   String
hideNodeBadgesOnNoHover   |   Boolean

###	Data.style.nodes{Array}
Attribute | Datatype
--- | ---
`id*`   |   String
shape   |   String{“circle”, “layeredCircle”, “rectangle”}
radius   |   String {Measurement} (if circle!)
borderColor   |   String{CSS compatible color description}
borderHoverColor   |   String{CSS compatible color description}
borderFocusedColor   |   String{CSS compatible color description}
borderFocusedHoverColor   |   String{CSS compatible color description}
backgroundColor   |   String{CSS compatible color description}
backgroundHoverColor   |   String{CSS compatible color description}
backgroundFocusedColor   |   String{CSS compatible color description}
backgroundFocusedHoverColor   |   String{CSS compatible color description}
textColor   |   String{CSS compatible color description}
textHoverColor   |   String{CSS compatible color description}
textFocusedColor   |   String{CSS compatible color description}
textFocusedHoverColor   |   String{CSS compatible color description}
dotted   |   Boolean
maxHeight   |   String {Measurement} (if rectangle!)
maxWidth   |   String {Measurement} (if rectangle!)
borderRadiusX   |   String {Measurement}
borderRadiusY   |   String {Measurement}
borderWidth    |    String {Measurement}
borderHoverWidth    |    String {Measurement}
borderFocusedWidth   |   String {Measurement}
filter   |   string {CSS filter}
hoverFilter   |   string {CSS filter}
focusedFilter   |   string {CSS filter}
focusedHoverFilter   |   string {CSS filter}
icon    |    string

###	Data.style.edges{Array}
Attribute | Datatype
--- | ---
`id*`   |   String
labelBackgroundColor   |   String{CSS compatible color description}
labelTextColor   |   String{CSS compatible color description}
labelTextFocusedColor   |   String{CSS compatible color description}
labelTextFocusedHoverColor   |   String{CSS compatible color description}
dotted   |   Boolean
arrowColor   |   String{CSS compatible color description}
color   |   String{CSS compatible color description}
hoverColor   |   String{CSS compatible color description}
focusedColor   |   String{CSS compatible color description}
focusedHoverColor   |   String{CSS compatible color description}
edgeDistance   |   String {Measurement}
borderRadiusX   |   String {Measurement}
borderRadiusY   |   String {Measurement}
labelBorderColor   |   String
labelHoveredBorderColor    |    String
labelFocusedBorderColor    |    String
labelFocusedHoverBorderColor    |    String
labelBorderWidth   |   String {Measurement}
labelHoveredBorderWidth    |    String {Measurement}
labelFocusedBorderWidth    |    String {Measurement}



##	Graph Constructor(element, data, *options*)
### Options
Function | Function Blueprint
--- | ---
entityClickedListener   |   Function{(data => { data.id; data.data; })}
entityHoveredListener   |   Function{(data => { data.id; data.data; data.eventType; } )}
entityDoubleClickedListener   |   Function{(data => { data.id; data.data; })}
selectionListener   |   Function{(data => { data.id; data.type; data.direction; data.data; })}
fixededgeLabelWidth   |   Boolean
maxedgeLabelWidth   |   String {Measurement}
edgeLabelWidth   |   String {Measurement}
enableZoomButtons   |   Boolean
enableScaleGridOnZoom   |   Boolean
hideDetailsZoomScale   |   number
enableBuiltinContextMenu   |   Boolean
enableFadeOnHover   |   boolean
enableGrid   |   Boolean
customContextMenu   |   Object
enableMultiLineNodeLabels   |   Boolean
rotateLabels   |   Boolean
markerSize   |   Number
lineType   |   String
enableOnionOnFocus   |   Boolean
enableOnionOnHover   |   Boolean
enableEdgeOnion   |   Boolean
onionNumberOfLayers   |   Number
onionBaseColor   |   String {Measurement}
onionLayerSize   |   Number

## Graph API
Function | Function Blueprint | Description
--- | --- | ---
setFilters   |   Function<( [{type, attribute, value, filterFunction}] )>   |   Adds filters for what should NOT be displayed in the current dataset. Type is either “node” or “edge”. attribute and value are equal to the attributes on the actual dataset objects. You can filter on anything from id to type. filterFunction is a custom filter function that will take the data object bound to the edge or node as input. setFilters will overwrite any existing filters.
resetAllFilters   |   Function(<()>)   |   This function clears all filters.
getFilters   |   Function(<()>)   |   This function returns all current filters
toggleMultiplicity   |   Function(<()>)   |   Toggles multiplicity on and off
highlight   |   Function<(attribute, value, filterFunction)>   |   Highlights a selection in the graph based on an attribute and a value, or a custom function.
disable   |   Function<(attribute, value, filterFunction)>   |   Disables a selection in the graph based on an attribute and a value, or a custom function.
clearDisable   |   Function<(attribute, value, filterFunction)>   |   Clears all disabling made by the disable function.
updateDataset   |   Function<(newDataset)>   |   This function updates the dataset in the graph, applies all existing filters, and then updates the selection, DOM, and simulation.
resetZoom   |   Function<()>   |   Resets the zoom its initial position
zoomToNode   |   Function<(nodeID)>   |   Zooms in on a specific node in the graph
setBoundingBox   |   Function<(width, height)>   |   Sets a bounding box for the graph
setNodeChargeMaxDistance   |   Function<(distance)>   |   Sets the maximum distance for which to compute charge force between nodes.
clearBoundingBox   |   Function<()>   |   Clears the bounding box for the graph
setLayout   |   Function<(type, config)>   |   Sets a new graph layout
resetLayout   |   Function<()>   |   Resets the graph layout to the default layout
setDefaultLineType   |   Function<(newType)>   |   Updates the default line type to use.
setCenterForce   |   Function<(isEnabled)>   |   Toggles the center force on or off. Typically this is useful for graphs are not disjointed.
setPinMode   |   Function<(isEnabled)>   |   Sets the pin mode of the graph
setNodesHiddenStatus   |   Function<({isHidden: boolean, id: string}[])>   |   Toggles the hidden status of nodes
setlassoMode   |   Function<(isEnabled)>   |   Sets the lasso selection mode of the graph
setMultiSelectMode   |   Function<(isEnabled)>   |   Sets the multi select mode of the graph
setMultiSelectDragMode   |   Function<(isEnabled)>   |   Sets the multi select drag mode of the graph
setRotateLabels   |   Function<(isEnabled)>   |   Toggles if edge labels should be rotated
setGrid   |   Function<("primary"|"secondary"|boolean)>   |   Toggles the background grid
getNodes   |   Function<(onlyLiveData)>   |   Retrieves nodes from the graph.
getEdges   |   Function<(onlyLiveData)>   |   Retrieves edges from the graph.
implodeOrExplodeNode   |   Function<(nodeID, isImplode, direction)>   |   Implodes/Explodes nodes directly connected to the given node ID (in the provided direction - "to", "from" or "both") isImplode indicates if it is a implode or explode operation
implodeOrExplodeNodeLeafs   |   Function<(nodeID, isImplode, direction)>   |   Implodes/Explodes nodes directly connected to the given node ID (in the provided direction), but only if the nodes do not branch out any further (i.e. have any further connections). isImplode indicates if it is a implode or explode operation
implodeOrExplodeNodeRecursive   |   Function<(nodeID, isImplode)>   |   Implodes/Explodes nodes directly connected to the given node ID (in the TO direction), and then recursively continues until it hits the end of the tree. isImplode indicates if it is a implode or explode operation
implodeOrExplodeNodeNonCircular   |   Function<(nodeID, isImplode)>   |   Works very similarly to recursive, but only affects node paths that have no path back to the origin node.
destroyGraph   |   Function<()>   |   Completely removes the graph and all its components from the DOM, and deletes its content. This is necessary sometimes if working with frontend frameworks.