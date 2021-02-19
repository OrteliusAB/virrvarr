# Pinning Nodes
You can pin nodes to the canvas, causing them to be unaffected by the physics engine that is powering the graph. Pin nodes still affect other nodes around them through negative charge, but will stay in the same position.

Node pinning works through activating and deactivating a pin mode. When the pin mode is activated drag and dropping a node will cause it to get pinned. When the mode is not activated then the node will not be pinned. Typically you may want to bind this mode toggling to a key. For example, if the user is pressing down the shift-key then activate the mode, and if the user lets go of the key then deactivate it.

You can also pin the entire graph through a special pinGraph function.

To clear a pin you simply drag and drop a node without pin mode activated and it will come loose. To clear all pins in the graph you can also use the resetPins function.

Consider the following example:
```javascript
graph.setPinMode(true)
graph.setPinMode(false)
graph.pinGraph()
graph.resetPins()
``` 