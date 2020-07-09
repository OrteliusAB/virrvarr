# Filters
A filter is a description of a subset in the virrvarr dataset that should be hidden from the user. Filters can be added, retrieved and reset by executing functions on the graph instance object. 

Filters can either be applied by passing an attribute name and a value, or by passing a custom function. A provided custom function should take the bound data object on the nodes/edges as an input argument and return true if the node/edge should be hidden, otherwise false. If a custom function is supplied the attribute/value combination will be ignored. 

Filters are supported for both nodes as well as edges.

You can reset all current filters by using the resetAllFilters function.

Consider the following example :
```javascript
//Set the graph filters
graph.setFilters(
    [
        { entityType: "node", attribute: "id", value: "N1" },
        { entityType: "edge", filterFunction: (boundData) => { return boundData.someAttribute === "I am a bound data value" } }
    ]
)
//Remove all filters
graph.resetAllFilters()
```