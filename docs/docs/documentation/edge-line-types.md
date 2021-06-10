# Edge line types
By default edges will be drawn as straight lines. You can change this behaviour if you want. Note, however, that straight lines are far more performant as they are easier to compute.

The following line types are available for use:
- "line"
- "cubicbezier"
- "taxi"
- "fulltaxi"
- "arctop"
- "arcright"
- "arcbottom"
- "arcleft"

Check out the following example:
```javascript
const data = {
    nodes: yourNodes,
    edges: [
        {
            ...yourEdge,
            lineType: "cubicbezier" //Overrides the default setting for a specific edge
        }
    ]
}
const options = {
        lineType: "taxi" //Sets the default directly in the options object
    }
const graph = new Virrvarr(graphContainer, data, options)
graph.setDefaultLineType("fulltaxi") //Updates the default after it has been created
```