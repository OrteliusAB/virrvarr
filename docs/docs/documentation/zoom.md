# Zoom
Virrvarr can be instructed to either zoom in on a specific node, or zoom out and center the graph. In order to zoom in on a specific node you need to supply a node id to the zoomToNode function.

Consider the following example:
```javascript
graph.zoomToNode("N1")
graph.resetZoom()
```

# Enabling/disabling zoom buttons
By default zoom buttons are disabled. Instead you would typically use your mouse wheel to zoom in and out. The zoom buttons can be enabled, though, by supplying the enableZoomButtons option to the virrvarr options object. The zoom buttons will be visible in the bottom right corner of the graph container.
```javascript
const options = {
        enableZoomButtons: true //Enables zoom buttons in the bottom right corner
    }
const graph = new Virrvarr(graphContainer, data, options)
```
