# Rotating labels
Virrvarr will by default display all edge labels horizontally. You can however override this behaviour by passing the rotateLabels boolean property in the options object. This will cause the graph to display the edge labels in line with the edge itself.

Consider the following example:
```javascript
const options = {rotateLabels: true}
const graph = new Virrvarr(graphContainer, data, options)
``` 