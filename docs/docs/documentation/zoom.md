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

Graph details such as Node captions, icons and labels can be configured to be hidden at a given zoom (scale) breakpoint. This can help make the graph look less cluttery when zoomed far out, and boost performance in graphs with many nodes.

You can configure the setting like so:
```javascript
const options = {
        hideDetailsZoomScale: 0.3 //Details will be hidden when the graph is further zoomed out than a scale of 0.3.
    }
const graph = new Virrvarr(graphContainer, data, options)
```
