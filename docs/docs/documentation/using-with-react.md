# React
Virrvarr can of course be easily implemented in any React project.

Here is a simple example for reference:
```jsx
import React from "react"
import Virrvarr from "virrvarr"

export default class VirrvarrGraph extends React.Component {

    constructor(props) {
        //For this example the props will contain an object called "data". This contains a correctly formatted virrvarr graph dataset, and cannot be null.
        super(props)
        //We will store the graph instance object in our state
        this.state = {
            graph: null
        }
    }

    componentDidMount() {
        //Instantiate our graph!
        this.initGraph(this.props.data)
    }

    shouldComponentUpdate(nextProps, nextState) {
        //Update the graph with new data, if the data prop has changed
        if(JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
            this.state.graph.updateDataset(nextProps.data)
        }
        //Stop the component from rerendering, and leave the DOM to virrvarr
        return false
    }

    componentWillUnmount() {
        //When unmounting, destroy all traces of the graph in the DOM and memory
        if(this.state.graph) {
            this.state.graph.destroyGraph()
        }
    }

    initGraph(data) {
        //Create a new graph instance
        const options = {}
        const graph = new Virrvarr(this.graphContainer, data, {})
        this.setState({
            graph: graph
        })
    }

    render() {
        //Don't forget that the graph will always take up as much space as you give it. If you give it 0px, it takes up 0px.
        //You can of course also use flex layouts and such.
        const style = {
            width: 500,
            height: 500
        }
        //Create a reference to the container element
        return <div ref={ref => this.graphContainer = ref} style={style}></div>
    }
}
```