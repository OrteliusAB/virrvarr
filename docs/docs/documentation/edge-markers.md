# Edge Markers
Edge markers are the symbols at the end of the edges where they meet the nodes. You can configure both the size of the markers as well as the type.

Check out the following example:
```javascript
const data = {
    nodes: yourNodes,
    edges: [
        {
            ...yourEdge,
            markerFrom: "diamond"
            markerTo: "square"
        }
    ]
}
const options = {
        markerSize: "24"
    }
const graph = new Virrvarr(graphContainer, data, options)
```