# Hover Effects
Virrvarr supports different visual hover effects.

## Fade on hover
Fade on hover instructs virrvarr to fade the opacity of non-connected nodes and edges when a node is hovered. This allows you to create a clear graphical focus on not just the individual node that the user is hovering, but everything in its connected vicinity.

This functionality is recommended for smaller size datasets. By default it is disabled since it is not really suitable to mid size to large datasets due to the stress on the CPU.

```javascript
const options = {
        enableFadeOnHover: true //Enables Fading of nodes and edges that are not directly connected to the hovered node
    }
const graph = new Virrvarr(graphContainer, data, options)
```