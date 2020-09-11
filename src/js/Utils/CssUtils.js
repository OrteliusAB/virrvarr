import Env from "../Config/Env.js"

/* This function writes user defined CSS classes to the DOM dynamically on start */
const initializeGraphStyles = (style, id) => {
    let cssString = ""
    cssString = `
                /* Text */
                .virrvarr .multiplicity {
                    font-size: ${Env.DEFAULT_MULTIPLICITY_FONT_SIZE};
                }     

                /* Tooltip */
                #virrvarr-tooltip {
                  position: absolute;
                  display: none;
                  min-width: ${Env.TOOLTIP_MIN_WIDTH};
                  background: ${Env.TOOLTIP_BACKGROUND};
                  opacity: 0.8;
                  color: ${Env.TOOLTIP_COLOR};
                  padding: 10px;
                  text-align: center;
                  max-width: ${Env.TOOLTIP_MAX_WIDTH};
                  word-wrap: break-word;
                  font-size: 14px;
                  border-radius: ${Env.TOOLTIP_BORDER_RADIUS};
                }

                /* Search Highlighting */
                .virrvarr .highlighted-node {
                  stroke-width: ${Env.HIGHLIGHTING_BORDER_WIDTH};
                  stroke: ${Env.HIGHLIGHTING_BORDER_COLOR};
                  fill: ${Env.HIGHLIGHTING_COLOR};
                  opacity: 0.3;
                  pointer-events: none;
                }

                /* Default edge style */
                .edge-path-default{
                    fill: none;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH} !important;
                    stroke-dasharray: ${Env.DEFAULT_EDGE_DASHARRAY} !important;
                    stroke: ${Env.DEFAULT_EDGE_COLOR} !important;
                }
                .edge-path-default.hovered{
                    stroke: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                }
                .edge-path-default.focused{
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                }
                
                .label-rect-default{
                    cursor: pointer;
                    fill: ${Env.DEFAULT_LABEL_BACKGROUND_COLOR};
                    rx: ${Env.DEFAULT_LABEL_BORDER_RADIUS_X};
                    ry: ${Env.DEFAULT_LABEL_BORDER_RADIUS_Y};
                    stroke: ${Env.DEFAULT_LABEL_BORDER_COLOR} !important;
                    stroke-width: ${Env.DEFAULT_LABEL_BORDER_WIDTH} !important; 
                }
                .label-rect-default:hover{
                    fill: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR};
                    cursor: pointer;
                }
                .label g .label-rect-default.focused {
                    stroke-width: ${Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH} !important;
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                }

                .label-text-default{
                    fill: ${Env.DEFAULT_LABEL_TEXT_COLOR};
                    dominant-baseline: central;
                    pointer-events: none;
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                }
                .to:hover .label-text-default,
                .from:hover .label-text-default{
                    fill: ${Env.DEFAULT_LABEL_TEXT_HOVER_COLOR}
                }
                
                .marker-default path{
                    fill: ${Env.DEFAULT_EDGE_COLOR};
                }
                .marker-default path.hovered{
                    stroke: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                    fill: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                    cursor: pointer;
                }
                .marker-default path.focused{
                    fill: ${Env.DEFAULT_FOCUS_COLOR} !important;
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                }

                /* Default node values */
                .node-default {
                    cursor: pointer;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH};
                    stroke: ${Env.DEFAULT_NODE_STROKE_COLOR};
                    fill: ${Env.DEFAULT_NODE_COLOR};
                    stroke-dasharray: 0;
                    rx: ${Env.DEFAULT_NODE_BORDER_RADIUS_X};
                    ry: ${Env.DEFAULT_NODE_BORDER_RADIUS_Y};
                }
                .node-default:hover {
                    fill: ${Env.DEFAULT_NODE_HOVER_COLOR};
                }
                .node-text-default {
                    dominant-baseline: central;
                    pointer-events: none;
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                    fill: ${Env.DEFAULT_NODE_TEXT_COLOR};
                }
                .node:hover .node-text-default {
                    fill: ${Env.DEFAULT_NODE_TEXT_HOVER_COLOR};
                }
                .virrvarr .node-default.focused {
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                    stroke-width: ${Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH} !important;
                }
                `

    if (style && style.nodes) {
        style.nodes.forEach(nodeType => {
            cssString = `
                ${cssString}
                .node-${nodeType.id} {
                    cursor: pointer;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH};
                    stroke: ${nodeType.borderColor ? nodeType.borderColor : Env.DEFAULT_NODE_STROKE_COLOR};
                    fill: ${nodeType.backgroundColor ? nodeType.backgroundColor : Env.DEFAULT_NODE_COLOR};
                    stroke-dasharray: ${nodeType.dotted ? Env.DEFAULT_NODE_DOTTED_DASHARRAY : 0};
                    rx: ${nodeType.borderRadiusX ? nodeType.borderRadiusX : Env.DEFAULT_NODE_BORDER_RADIUS_X};
                    ry: ${nodeType.borderRadiusY ? nodeType.borderRadiusY : Env.DEFAULT_NODE_BORDER_RADIUS_Y};
                    filter: ${nodeType.shadow ? `drop-shadow(${nodeType.shadow})` : Env.DEFAULT_NODE_SHADOW ? `drop-shadow(${Env.DEFAULT_NODE_SHADOW})` : "none"};
                }
                .node-${nodeType.id}:hover {
                    fill: ${nodeType.hoverColor ? nodeType.hoverColor : Env.DEFAULT_NODE_HOVER_COLOR};
                }
                .node-text-${nodeType.id} {
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                    dominant-baseline: central;
                    pointer-events: none;
                    fill: ${nodeType.textColor ? nodeType.textColor : Env.DEFAULT_NODE_TEXT_COLOR};
                }
                .node:hover .node-text-${nodeType.id} {
                    fill: ${nodeType.textHoverColor ? nodeType.textHoverColor : Env.DEFAULT_NODE_TEXT_HOVER_COLOR};
                }
                .virrvarr .node-${nodeType.id}.focused {
                    stroke: ${nodeType.focusedColor ? nodeType.focusedColor : Env.DEFAULT_FOCUS_COLOR} !important;
                    stroke-width: ${nodeType.focusedBorderWidth ? nodeType.focusedBorderWidth : Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH} !important;
                }
                `
        })
    }

    if (style && style.edges) {
        style.edges.forEach(edgeType => {
            cssString = `
                ${cssString}
                .edge-path-${edgeType.id}{
                    fill: none !important;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH} !important;
                    stroke-dasharray: ${edgeType.dotted ? Env.DEFAULT_EDGE_DOTTED_DASHARRAY : Env.DEFAULT_EDGE_DASHARRAY} !important;
                    stroke: ${edgeType.color ? edgeType.color : Env.DEFAULT_EDGE_COLOR} !important;
                }
                .edge-path-${edgeType.id}.hovered{
                    stroke: ${edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                }
                .edge-path-${edgeType.id}.focused{
                    stroke: ${edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR} !important;
                } 
                .label-rect-${edgeType.id}{
                    cursor: pointer;
                    fill: ${edgeType.labelBackgroundColor ? edgeType.labelBackgroundColor : Env.DEFAULT_LABEL_BACKGROUND_COLOR};
                    rx: ${edgeType.borderRadiusX ? edgeType.borderRadiusX : Env.DEFAULT_LABEL_BORDER_RADIUS_X};
                    ry: ${edgeType.borderRadiusY ? edgeType.borderRadiusY : Env.DEFAULT_LABEL_BORDER_RADIUS_Y};
                    stroke: ${edgeType.labelBorderColor ? edgeType.labelBorderColor : Env.DEFAULT_LABEL_BORDER_COLOR} !important;
                    stroke-width: ${edgeType.labelBorderWidth ? edgeType.labelBorderWidth : Env.DEFAULT_LABEL_BORDER_WIDTH} !important; 
                }
                .label-rect-${edgeType.id}:hover{
                    fill: ${edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR};
                    cursor: pointer;
                }
                .label g .label-rect-${edgeType.id}.focused {
                    stroke-width: ${Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH} !important;
                    stroke: ${edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR} !important;
                }
                .label-text-${edgeType.id}{
                    fill: ${edgeType.labelTextColor ? edgeType.labelTextColor : Env.DEFAULT_LABEL_TEXT_COLOR};
                    dominant-baseline: central;
                    pointer-events: none;
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                }
                .to:hover .label-text-${edgeType.id},
                .from:hover .label-text-${edgeType.id}{
                    fill: ${edgeType.labelTextHoverColor ? edgeType.labelTextHoverColor : Env.DEFAULT_LABEL_TEXT_HOVER_COLOR}
                }
                .marker-${edgeType.id} path.hovered{
                    stroke: ${edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                    fill: ${edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                    cursor: pointer;
                }
                .marker-${edgeType.id} path{
                    fill: ${edgeType.arrowColor ? edgeType.arrowColor : Env.DEFAULT_ARROW_COLOR};
                }
                .marker-${edgeType.id} path.focused{
                    fill: ${edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR} !important;
                    stroke: ${edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR} !important;
                }
                `
        })
    }

    const css = document.createElement('style')
    css.type = 'text/css'
    css.id = id
    css.appendChild(document.createTextNode(cssString))
    document.getElementsByTagName("head")[0].appendChild(css)
}

export default {
    initializeGraphStyles: initializeGraphStyles,
}