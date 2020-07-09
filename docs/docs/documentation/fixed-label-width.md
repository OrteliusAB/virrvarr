# Edge label width
By default edge labels will have a fixed width. The width (or, length) can be configured through a few different options parameters.

Check out the following example:
```javascript
const options = {
        enableFixededgeLabelWidth: false, //Should edge label width be fixed? Defaults to true.
        maxedgeLabelWidth: 130, //Maximum width (if fixed edge width is disabled) Defaults to 130 (px)
        edgeLabelWidth: 80 //Fixed width (if fixed edge label width is enabled) Defaults to 80 (px)
    }
const graph = new Virrvarr(graphContainer, data, options)
```