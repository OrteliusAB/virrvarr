# Disabling Nodes
Virrvarr allows you to supply a search query to your graph, and will disable any nodes that match the provided search criteria. 

A disable node and all of its edges will be faded out and not be clickable, but will still remain visible and active in the graph. This is useful if you want to highlight something in the graph, but not filter out data completely.

If a function is supplied the attribute/value combination will be ignored.

To clear all disabled-settings you can use the clearDisable() function.

Consider the following example:
```javascript
graph.disable("name", "Node T")
graph.disable(null, null, (boundData) => { return boundData.someAttribute === "I am a bound data value" })
graph.clearDisable()
``` 