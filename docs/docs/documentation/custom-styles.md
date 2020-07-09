# Custom Styles
You can add custom styles to your nodes and edges using the "style" attribute on the data object. These styles can then be applied on your nodes and edges using the "type" attribute. 

Consider the following example:
```javascript
const data = {
    style: {
        nodes: [
            {
                id: "special",
                shape: "layeredCircle",
                borderColor: "#000000",
                backgroundColor: "#36c000",
                hoverColor: "#f00000",
                textColor: "#fff000"
            },
        edges: [
            {
                id: "relation",
                dotted: true,
                color: "#000000",
                hoverColor: "#f00000",
                labelBackgroundColor: "#ecf0f1",
                labelTextColor: "#000000",
                arrowColor: "#fff000"
            }
        ]
    }
    nodes: [
        {id: "N1", name: "Node One", type="special"},
        {id: "N2", name: "Node Two"}
    ]
    edges: [
        {id: "L1", sorceNode: "N1", targetNode: "N2", nameTo: "Connects", type="relation"}
    ]
}
```
For more information on available style parameters see the API Reference page.