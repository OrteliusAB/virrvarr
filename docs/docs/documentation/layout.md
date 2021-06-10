# Layout
Virrvarr supports different graph layouts that can be set using the "setLayout" function. Layouts can be cleared by using the "resetLayout" function.

To set a layout, you need to provide the setLayout function with a layout type as well as an optional configuration.

For example:
```javascript
graph.setLayout("hierarchy", { useX: true })
graph.resetLayout()
```

## Hierarchy
Hierarchy locks one axis for all nodes, and sorts them by that axis based on a provided groupBy criteria. This is useful if you want to display your network graph as an hierarchical tree.

You can pass the following configuration to the layout:
- useX -> If true the hierarchy will display from left to right, otherwise top to bottom
- groupBy -> A function that takes the bound data on each node and returns a group identifier. By default nodes will be grouped by type.
- distance -> A number that defines the distance between each axis. By default this will be computed based on node height/width.
- useLine -> A boolean that forces all nodes into a single line. Useful for very large graphs, but will cause edges to be positoned in a less intuitive way.

To use the hierarchy layout you supply the "hierarchy" type to the setLayout function:
```javascript
graph.setLayout("hierarchy")
```

## Grid
Grid layout creates a grid on either the Y, X or both axises. The grid draws nodes towards the set axises, making some graphs look much more tidy. This layout will lower the edge strength, but not remove it completely. This may make the graph seem more fluid but is necessary in order for the matrix to not get overly messy.

You can pass the following configuration to the layout:
- useY -> If true the Y axis force will be activated
- useX -> If true the X axis force will be activated
- strength -> How strong should the force that pulls node into the axis be? (must be in the range 0-1!)
- size -> How large should each axis space be? If no size is provided it will be computed based on node sizes
- multiplier -> If no size is provided the size of nodes will be used. This multiplier can be used to multiply the measurements by a given number.

To use grid layout you supply the "grid" type to the setLayout function:
```javascript
graph.setLayout("grid")
```

## matrix
Matrix layout places all nodes in a square matrix. This is usefull for example if you want to get an overview of all nodes that are currently displayed. By default they will be ordered from left to right and top to bottom based on the alphabetical order of their name, but you can provide your own grouping function if you wish.

You can pass the following configuration to the layout:
- groupBy -> A function that will take the bound data from the node and should return a value to be sorted on
- strength -> How strong should the force be that pulls the nodes into the matrix? (must be in range 0-1!)

To use matrix layout you supply the "matrix" type to the setLayout function:
```javascript
graph.setLayout("matrix")
```

## Cluster
Cluster layout allows you to cluster nodes together into groups. This is useful if for example you want to show relationships between nodes that are not necessarily connected by edges.

You can pass the following configuration to the layout:
- groupBy -> A function that will take the bound data from the node and should return a value to be sorted on
- strength -> How strong should the force be that pulls the nodes into the clusters? (must be in range 0-1!)
- showOutline -> If true a rectangle will be rendered around the different clusters with a the title of the cluster above it. The title is derived from the group results.

To use cluster layout you supply the "cluster" type to the setLayout function:
```javascript
graph.setLayout("cluster")
```

## Treemap
Treemap layout generates a treemap based on node groups.

You can pass the following configuration to the layout:
- groupBy -> A function that will take the bound data from the node and should return a value to be sorted on
- width -> Maximum width for the treemap
- height -> Maximum height for the treemap
- strength -> How strong should the force be that pulls the nodes into the treemap clusters? (must be in range 0-1!)

To use treemap layout you supply the "treemap" type to the setLayout function:
```javascript
graph.setLayout("treemap")
```

## Radial
Radial layout orders nodes into a circle. This is particularly useful if nodes are heavily interconnected, and it it is difficult to make out what is actually connected to what. You can also use this force to create radial clusters (i.e. layers of circles) by providing a groupBy function. By default one single large circle will be made.

You can pass the following configuration to the layout:
- groupBy ->  A function that will take the bound data from the node and should return a value to be sorted on
- strength -> How strong should the force be that pulls the nodes into the circle? (must be in range 0-1!)

To use radial layout you supply the "radial" type to the setLayout function:
```javascript
graph.setLayout("radial")
```

## Fan
Fan layout orders nodes into long lines going out from a center point. This is a useful layout for visualising circular hierarchies.

You can pass the following configuration to the layout:
- groupBy ->  A function that will take the bound data from the node and should return a value to be sorted on
- strength -> How strong should the force be that pulls the nodes into the circle? (must be in range 0-1!)

To use fan layout you supply the "fan" type to the setLayout function:
```javascript
graph.setLayout("fan")
```

## Adjacency Matrix
Adjacency Matrix layout allows you to render an adjacency matrix of all your nodes and their edges

To use the adjacency matrix layout you supply the "adjacencymatrix" type to the setLayout function:
```javascript
graph.setLayout("adjacencymatrix")
```

## Table
Table layout allows you to render a table of information with all nodes positioned to the left of said table, with their respective data next to them.

You must(!) pass the following configuration to the layout:
- headers ->  An array of strings with the table headers.
- getData -> a function that will take a node's bound data as input and should result in an array of table cells as strings.

To use the adjacency matrix layout you supply the "adjacencymatrix" type to the setLayout function:
```javascript
graph.setLayout("table", { headers: ["Header 1", "Header 2"], getData: () => ["Value 1", "Value 2"] })
```

# Centering
Centering things in your graph can sometimes be a bit tricky. Virrvarr gives you two options.

## Center Force
A center force can be toggled on and off. By default this will be on right when the graph loads, and will turn itself off after the initial zoom to fit has completed. This force tries to ensure that the average of all node positions should be 0. This means that the graph will be centered without affecting the nodes' relative position to each other. The center force is particularly useful in graphs that are not disjointed, but can also be great for use together with some of the Virrvarr layouts. Note, though, that it may actually cause issues with some layouts, such as the treemap.

You can toggle the force on and off like so:
```javascript
graph.setCenterForce(true)
graph.setCenterForce(false)
```

## Bounding Box
Another option for ensuring that nodes don't stray too far away is to set a bounding box. A bounding box is like an invisible rectangle that no node can travel outside.

If no width or height is provided to the bounding box function these values will be computed based on the amount of nodes and their sizes.

To se a bounding box simply do the following:
```javascript
graph.setBoundingBox(1000, 1000)
graph.clearBoundingBox()
```