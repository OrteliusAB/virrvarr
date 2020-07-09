# Highlight Search
Virrvarr allows you to supply a search query to your graph, and will highlight any nodes that match the provided search criteria. 

You can either supply an attribute and value combination, or a custom function to determine what to match (attribute/value combination will be applied as ".startsWith(value)"). The custom function should take the bound data object on the nodes as an input argument and return true if it is a match, otherwise false. 

If a function is supplied the attribute/value combination will be ignored.

Consider the following example:
```javascript
graph.highlight("name", "Node T")
graph.highlight(null, null, (boundData) => { return boundData.someAttribute === "I am a bound data value" })
``` 