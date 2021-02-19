# Multi Selection
By default, clicking a node will deselect all other other nodes. You can, however, select multiple nodes in the graph by toggling the multi selection mode on and off. This is typically implemented together with keydown and keyup listeners, where the mode is toggled on if the user holds down a key such as "ctrl", and then toggled off when they let go of said key.

Consider the following example:
```javascript
graph.setMultiSelectMode(true)
graph.setMultiSelectMode(false)
``` 