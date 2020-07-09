# Your first graph
Once you have installed and imported the virrvarr library you can create a new graph as seen below.

```html
<body>
<div id="graph-container" style="height:1000px;width:1000px;"></div>
</body>
<script>
const graphContainer = document.getElementById("graph-container")
const data = {
    nodes: [
        {id: "N1", name: "Node One"},
        {id: "N2", name: "Node Two"}
    ]
    edges: [
        {id: "L1", sorceNode: "N1", targetNode: "N2", nameTo: "Connects"}
    ]
}
const graph = new Virrvarr(graphContainer, data, {})
</script>
```

So what is going on here?

To use virrvarr you need to create a container for the graph to live in, and give that container a size (in above example "graph-container"). After doing this you create a new instance of the Virrvarr class to which you pass a reference to the DOM element. You can then interact with the API exposed by the virrvarr instance object.

The Virrvarr constructor takes three arguments:
- Element -> The HTML element to render inside
- Data -> The data object to render
- Options -> Options containing things like event listener and settings.

The graph data consists of nodes, edges and (potentially) styles. Nodes are shapes that float around on the canvas, and edges are what binds them together.