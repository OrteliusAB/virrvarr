# Multiplicity
Virrvarr is able to display multiplicity on relations. This can be specified by supplying a multiplicityFrom and multiplicityTo attribute on the edge objects in your dataset.

Consider the following example:
```javascript
{
    edges: [
        {id: "L1", sorceNode: "N1", targetNode: "N2", nameTo: "Connects", nameFrom: "Connected by", multiplicityTo: "1..*", multiplicityFrom: "0..1"}
    ]
}
```

You can toggle the multiplicity on and off using the virrvarr instance like so:
```javascript
graph.toggleMultiplicity()
```