# Grid
You can enable a background grid on the graph canvas by supplying the enableGrid attribute to virrvarr's options object.

The primary background grid can sometimes be taxing on older systems. In such cases you can intead toggle a secondary grid, which is a bit more bare bones.

Below is an example:
```javascript
const options = {enableGrid: true, enableSecondaryGrid: false}
const graph = new Virrvarr(graphContainer, data, options)
```
