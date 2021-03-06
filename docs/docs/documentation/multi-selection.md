# Multi Selection
By default, clicking a node will deselect all other other nodes. You can, however, select multiple nodes in the graph by toggling the multi selection mode on and off. This is typically implemented together with keydown and keyup listeners, where the mode is toggled on if the user holds down a key such as "ctrl", and then toggled off when they let go of said key.
## Selection Lasso
You can also use the selection lasso to select an entire area of the graph. This is, similarly, done by toggling the lasso mode on and off. When the mode is on and you click/drag your mouse over the canvas the lasso will appear, and all nodes/edge labels that are completely covered by the lasso will have their selection be toggled.

## Dragging/pinning multiple nodes simultaneously
You can drag multiple nodes on the canvas simultaneously by toggling the selection drag mode on and off. Toggling it on means that if a selected node is dragged then all other selected nodes will be moved an identical amount of pixels.

Consider the following example:
```javascript
graph.setMultiSelectMode(true)
graph.setMultiSelectMode(false)
graph.setMultiSelectDragMode(true)
graph.setMultiSelectDragMode(false)
graph.setLassoMode(true)
graph.setLassoMode(false)
``` 