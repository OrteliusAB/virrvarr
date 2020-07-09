# Layout
Virrvarr supports different graph layouts that can be set using the virrvarr API. 

## Matrix Layout
Matrix layouts are a way of grouping data in clusters. To create a matrix layout you need to supply information to virrvarr about what group each node is a part of, as well as (potentially) what order these should be displayed in. 

To create a group you can either provide an attribute that is set directly on all nodes, or you can provide a custom function that takes the bound data on each node as an input argument and returns a group name in the form of a string value. If a function is supplied the attribute value will be ignored.

A sort function can also be provided. The function should take two arguments, Node object 1's bound data and node object 2's bound data, and works just like a regular array sorting function.

```javascript
graph.setMatrixLayout("type")
graph.setMatrixLayout(
    null, 
    (boundData) => { return boundData.someAttribute },
    null //Sorting function can be added here
)
//To reset the layout simply call resetLayout
graph.resetLayout()
```

`A cool trick is to sort by the attribute "id". This will cause the graph to display as a grid.`