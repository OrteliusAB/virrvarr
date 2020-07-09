# Imploding and Exploding
Imploding a node is similar to applying a filter, but works a bit differently. An implosion/explosion always has a start node as well as a path of traversal. Anything that gets traversed will be will be toggled as hidden or shown. It is important to note that implosions and explosions operates only on live data, and is not aware of the existance of filtered data.

Nodes that are imploded will by default cause a number badge to pop up on exploded nodes that connect to them in the to-direction. Showing the user that something is currently imploded. 

This functionality is useful if you want to allow the user to expand and collapse sections the live graph.

There are four different functions you can use for this:
- `implodeOrExplodeNode(nodeID)`
  - Implodes/Explodes nodes directly connected to the given node ID (in the TO direction)
- `implodeOrExplodeNodeLeafs(nodeID)`
  - Implodes/Explodes nodes directly connected to the given node ID (in the TO direction), but only if the nodes do not branch out any further (i.e. have any TO connections of their own)
- `implodeOrExplodeNodeNonCircular(nodeID)`
  - Implodes/Explodes nodes directly connected to the given node ID (in the TO direction), and then recursively continues until it finds the end of the tree
- `implodeOrExplodeNodeRecursive(nodeID)`
  - Works very similarly to recursive, but only affects node paths that have no path back to the origin node

All four functions take two arguments, an id and a boolean to say if it is an implode operation (true) or an explode operation (false)

Consider the following example:
```javascript
//Set the graph filters
graph.implodeOrExplodeNode("N1", true) //Implode all connected nodes in the TO direction
graph.implodeOrExplodeNodeLeafs("N1", false) //Explode all leafs
graph.implodeOrExplodeNodeNonCircular("N1", true) //Implode nodes on isolated branches
graph.implodeOrExplodeNodeRecursive("N1", false) //Explode all outwards branches recursively
```