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
type   |   String (id of node style object)
data   |   Any (data bound to object)

###	Data.style{Object}
Attribute | Datatype
--- | ---
nodes   |   Array {Object}
edges   |   Array {Object}

###	Data.style.nodes{Array}
Attribute | Datatype
--- | ---
`id*`   |   String
shape   |   String{“circle”, “layeredCircle”, “rectangle”}
radius   |   String {Measurement} (if circle!)
borderColor   |   String{CSS compatible color description}
backgroundColor   |   String{CSS compatible color description}
hoverColor   |   String{CSS compatible color description}
textColor   |   String{CSS compatible color description}
dotted   |   Boolean
maxHeight   |   String {Measurement} (if rectangle!)
maxWidth   |   String {Measurement} (if rectangle!)
borderRadiusX   |   String {Measurement}
borderRadiusY   |   String {Measurement}
textHoverColor   |   String
focusedColor   |   String
focusedBorderWidth   |   String {Measurement}
shadow   |   string {CSS shadow filter}

###	Data.style.edges{Array}
Attribute | Datatype
--- | ---
`id*`   |   String
labelBackgroundColor   |   String{CSS compatible color description}
hoverColor   |   String{CSS compatible color description}
labelTextColor   |   String{CSS compatible color description}
dotted   |   Boolean
arrowColor   |   String{CSS compatible color description}
color   |   String{CSS compatible color description}
edgeDistance   |   String {Measurement}
borderRadiusX   |   String {Measurement}
borderRadiusY   |   String {Measurement}
labelTextHoverColor   |   String
labelBorderColor   |   String
labelBorderWidth   |   String {Measurement}
focusedColor   |   String



##	Graph Constructor(element, data, *options*)
### Options
Function | Function Blueprint
--- | ---
entityClickListener   |   Function{(data => { data.id; data.data; })}
entityHoveredListener   |   Function{(data => { data.id; data.data; data.eventType; } )}
entityDoubleClickedListener   |   Function{(data => { data.id; data.data; })}
enableGrid   |   Boolean
fixededgeLabelWidth   |   Boolean
maxedgeLabelWidth   |   String {Measurement}
edgeLabelWidth   |   String {Measurement}
enableZoomButtons   |   Boolean
showContextMenu   |   Boolean
customContextMenu   |   Object
fadeOnHover   |   boolean

## Graph API
Function | Function Blueprint | Description
--- | --- | ---
setFilters   |   Function<( [{type, attribute, value, filterFunction}] )>   |   Adds filters for what should NOT be displayed in the current dataset. Type is either “node” or “edge”. attribute and value are equal to the attributes on the actual dataset objects. You can filter on anything from id to type. filterFunction is a custom filter function that will take the data object bound to the edge or node as input. setFilters will overwrite any existing filters.
resetAllFilters   |   Function(<()>)   |   This function clears all filters.
getFilters   |   Function(<()>)   |   This function returns all current filters
toggleMultiplicity   |   Function(<()>)   |   Toggles multiplicity on and off
highlight   |   Function<(attribute, value, filterFunction)>   |   Highlights a selection in the graph based on an attribute and a value, or a custom function.
updateDataset   |   Function<(newDataset)>   |   This function updates the dataset in the graph, applies all existing filters, and then updates the selection, DOM, and simulation.
resetZoom   |   Function<()>   |   Resets the zoom its initial position
zoomToNode   |   Function<(nodeID)>   |   Zooms in on a specific node in the graph
setMatrixLayout   |   Function<(attribute, filterFunction, sortFunction)>   |   Sets the layout to a fixed matrix. This enables the developer to group things together. The function can either take an attribute (with values set for it on each node, such as “type”) and use that as the criteria for grouping, or use a custom filter function which takes the bound data as input and returns a group name as a string.  A sortFunction can also be supplied in order to determine the order of things in the matrix. The order will read from left to right, top to bottom. Like a book.
resetLayout   |   Function<()>   |   Resets the layout to the default layout
implodeOrExplodeNode   |   Function<(nodeID, isImplode)>   |   Implodes/Explodes nodes directly connected to the given node ID (in the TO direction) isImplode indicates if it is a implode or explode operation
implodeOrExplodeNodeLeafs   |   Function<(nodeID, isImplode)>   |   Implodes/Explodes nodes directly connected to the given node ID (in the TO direction), but only if the nodes do not branch out any further (i.e. have any TO connections). isImplode indicates if it is a implode or explode operation
implodeOrExplodeNodeRecursive   |   Function<(nodeID, isImplode)>   |   Implodes/Explodes nodes directly connected to the given node ID (in the TO direction), and then recursively continues until it hits the end of the tree. isImplode indicates if it is a implode or explode operation
implodeOrExplodeNodeNonCircular   |   Function<(nodeID, isImplode)>   |   Works very similarly to recursive, but only affects node paths that have no path back to the origin node.
destroyGraph   |   Function<()>   |   Completely removes the graph and all its components from the DOM, and deletes its content. This is necessary sometimes if working with frontend frameworks.