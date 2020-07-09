# Binding Data
Data can be bound to specific nodes and edges. This is useful when interacting with the graph API. The bound data will be returned on events (for example if a node is clicked), and exposed in custom, developer provided functions for filters, layouts and so on.

To bind data you simply use the data attribute on your node and edge objects like so:
```javascript
{
    nodes: [
        {id: "N1", name: "Node One", data: {someAttribute: "I am a bound data value"}},
        {id: "N2", name: "Node Two"}
    ]
    edges: [
        {id: "L1", sorceNode: "N1", targetNode: "N2", nameTo: "Connects", data: {someAttribute: "I am also a bound data value"}}
    ]
}
```