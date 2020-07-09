# Updating data
At some point you may want to update the data in your graph. You can do this by supplying a completely new dataset. 

`Do not worry! This will not force a complete re-render. Virrvarr will only render the delta.`

Below is a simple example:
```javascript
const myNewData = {}
graph.updateDataset(myNewData)
```