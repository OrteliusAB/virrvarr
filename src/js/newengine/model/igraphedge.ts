import { IGraphNode } from "./igraphnode"
import { NodeID } from "./nodeid"

/** Internal edge structure */
export interface IGraphEdge {
	/** Index for the edge in the list of edges */
	index: number
	/** Where the edge is directed from */
	targetNode: NodeID
	/** Where the edge is directed to */
	sourceNode: NodeID
	/** Actual source node object */
	source: IGraphNode
	/** Actual target node object */
	target: IGraphNode
	/** Strength of the edge */
	strength: number
	/** How long is the edge */
	distance: number
	/** How heavy is the edge */
	weight: number
}
