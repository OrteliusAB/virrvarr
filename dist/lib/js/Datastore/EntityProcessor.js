"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntityProcessor =
/*#__PURE__*/
function () {
  function EntityProcessor(eventEmitter, styles, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, EntityProcessor);

    this.style = styles;
    this.fixedEdgeLabelWidth = userDefinedOptions.fixedEdgeLabelWidth !== undefined ? userDefinedOptions.fixedEdgeLabelWidth : _Env.default.FIXED_EDGE_LABEL_WIDTH;
    this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : _Env.default.LABEL_WIDTH;
    this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : _Env.default.LABEL_WIDTH * 2;
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.NODE_FIXATION_REQUESTED, function (node, x, y) {
      _this.repositionNode(node, x, y);
    });
    this.ee.on(_EventEnum.default.DATASTORE_UPDATED, function (nodes, edges) {
      _this.updateEdgeedNodeIDs(edges, nodes);

      _this.updateEdgeDistances(edges);

      _this.updateEdgeLabelWidths(edges);

      _this.updateEdgeCounters(edges);

      _this.updateNodeParameters(nodes);

      _this.ee.trigger(_EventEnum.default.DATA_PROCESSOR_FINISHED, nodes, edges);
    });
  }

  _createClass(EntityProcessor, [{
    key: "repositionNode",
    value: function repositionNode(node, x, y) {
      node.fx = x;
      node.fy = y;
    }
    /* Translates node IDs to index IDs */

  }, {
    key: "updateEdgeedNodeIDs",
    value: function updateEdgeedNodeIDs(edges, nodes) {
      edges.forEach(function (edge) {
        //D3 uses the index of the node as source and target. Convert from the ID specified
        edge.source = nodes.findIndex(function (node) {
          return node.id === edge.sourceNode;
        });
        edge.target = nodes.findIndex(function (node) {
          return node.id === edge.targetNode;
        });

        if (edge.source === undefined || edge.target === undefined) {
          console.error("Broken Edge", edge);
        }
      });
    }
    /* Updates the edge distances */

  }, {
    key: "updateEdgeDistances",
    value: function updateEdgeDistances(edges) {
      var _this2 = this;

      edges.forEach(function (edge) {
        if (_this2.style && _this2.style.edges) {
          var style = _this2.style.edges.find(function (style) {
            return style.id === edge.type;
          });

          if (style && style.edgeDistance) {
            edge.edgeDistance = style.edgeDistance;
          } else {
            edge.edgeDistance = _Env.default.DEFAULT_VISIBLE_EDGE_DISTANCE;
          }
        } else {
          edge.edgeDistance = _Env.default.DEFAULT_VISIBLE_EDGE_DISTANCE;
        }
      });
    }
    /* Updates the edge label width */

  }, {
    key: "updateEdgeLabelWidths",
    value: function updateEdgeLabelWidths(edges) {
      var _this3 = this;

      edges.forEach(function (edge) {
        if (_this3.fixedEdgeLabelWidth) {
          edge.nameToWidth = _this3.edgeLabelWidth;
          edge.nameFromWidth = _this3.edgeLabelWidth;
        } else {
          if (edge.nameTo) {
            var width = edge.nameTo.width();
            width = width < _this3.maxEdgeLabelWidth ? width : _this3.maxEdgeLabelWidth;
            edge.nameToWidth = width + _Env.default.EDGE_LABEL_PADDING;
          } else {
            edge.nameToWidth = _this3.edgeLabelWidth;
          }

          if (edge.nameFrom) {
            var _width = edge.nameTo.width();

            _width = _width < _this3.maxEdgeLabelWidth ? _width : _this3.maxEdgeLabelWidth;
            edge.nameFromWidth = _width + _Env.default.EDGE_LABEL_PADDING;
          } else {
            edge.nameFromWidth = _this3.edgeLabelWidth;
          }
        }
      });
    }
    /* Updates the edge counts for self-references and multi-references (to the same node) */

  }, {
    key: "updateEdgeCounters",
    value: function updateEdgeCounters(edges) {
      edges.forEach(function (edge) {
        //Multi edge counter
        var i = 0;

        if (isNaN(edge.multiEdgeCount)) {
          var sameEdges = [];
          edges.forEach(function (otherEdge) {
            if (edge.source === otherEdge.source && edge.target === otherEdge.target || edge.target === otherEdge.source && edge.source === otherEdge.target) {
              sameEdges.push(otherEdge);
            }
          });

          for (i = 0; i < sameEdges.length; i++) {
            sameEdges[i].multiEdgeCount = sameEdges.length;
            sameEdges[i].multiEdgeIndex = i;
          }
        } //Self edge counter


        if (isNaN(edge.selfEdgeCount)) {
          var selfEdges = [];
          edges.forEach(function (otherEdge) {
            if (edge.source === otherEdge.source && edge.target === otherEdge.target) {
              selfEdges.push(otherEdge);
            }
          });

          for (i = 0; i < selfEdges.length; i++) {
            selfEdges[i].selfEdgeCount = selfEdges.length;
            selfEdges[i].selfEdgeIndex = i;
          }
        }
      });
    }
    /* Updates node parameters */

  }, {
    key: "updateNodeParameters",
    value: function updateNodeParameters(nodes) {
      var _this4 = this;

      nodes.forEach(function (node) {
        /* Init Radius and max text length values */
        if (_this4.style && _this4.style.nodes) {
          var style = _this4.style.nodes.find(function (style) {
            return style.id === node.type;
          });

          if (style) {
            switch (style.shape) {
              case "circle":
              case "layeredCircle":
                node.radius = style.radius ? style.radius : _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
                node.maxTextWidth = 2 * node.radius;
                node.shape = style.shape;
                break;

              case "rectangle":
                node.height = style.maxHeight ? style.maxHeight : _Env.default.DEFAULT_RECTANGLE_MAX_HEIGHT;
                node.width = style.maxWidth ? style.maxWidth : _Env.default.DEFAULT_RECTANGLE_MAX_WIDTH;
                node.maxTextWidth = style.maxWidth ? style.maxWidth : _Env.default.DEFAULT_RECTANGLE_MAX_WIDTH;
                node.shape = style.shape;
                break;

              default:
                //Use circle by default
                node.radius = style.radius ? style.radius : _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
                node.maxTextWidth = 2 * node.radius;
                node.shape = style.shape;
                break;
            }
          } else {
            //Use 50r circle as default
            node.radius = _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
            node.maxTextWidth = 2 * node.radius;
            node.shape = "circle";
          }
        } else {
          //Use 50r circle as default
          node.radius = _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
          node.maxTextWidth = 2 * node.radius;
          node.shape = "circle";
        }
      });
    }
  }]);

  return EntityProcessor;
}();

exports.default = EntityProcessor;