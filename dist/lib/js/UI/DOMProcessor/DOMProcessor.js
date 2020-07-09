"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MathUtils = _interopRequireDefault(require("../../Utils/MathUtils"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

var d3 = _interopRequireWildcard(require("d3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DOMProcessor =
/*#__PURE__*/
function () {
  function DOMProcessor(rootG, eventEmitter, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, DOMProcessor);

    this.fixedEdgeLabelWidth = userDefinedOptions.fixedEdgeLabelWidth !== undefined ? userDefinedOptions.fixedEdgeLabelWidth : _Env.default.FIXED_EDGE_LABEL_WIDTH;
    this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : _Env.default.LABEL_WIDTH;
    this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : _Env.default.LABEL_WIDTH * 2;
    this.fadeOnHover = userDefinedOptions.fadeOnHover !== undefined ? userDefinedOptions.fadeOnHover : _Env.default.DEFAULT_FADE_ON_HOVER;
    this.showMultiplicity = true;
    this.rootG = rootG;
    this.nodes = [];
    this.edges = [];
    this.listeningForTick = false;
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.TOGGLE_MULTIPLICITY_REQUESTED, function () {
      _this.showMultiplicity = !_this.showMultiplicity;

      _this.updateMultiplicityCounters(_this.edges);
    });
    this.ee.on(_EventEnum.default.DATA_PROCESSOR_FINISHED, function (nodes, edges) {
      _this.nodes = nodes;
      _this.edges = edges; //The order of these matters, don't rearrange

      _this.updateMarkers(edges);

      _this.updateEdges(edges);

      _this.updateLabels(edges);

      _this.updateMultiplicityCounters(edges);

      _this.updateNodes(nodes);

      _this.attachEntityClickListeners();

      _this.ee.trigger(_EventEnum.default.DOM_PROCESSOR_FINISHED, nodes, edges);
    });
    this.ee.on(_EventEnum.default.ENGINE_TICK, function () {
      if (_this.listeningForTick) {
        _this.tick();
      }
    });
    this.ee.on(_EventEnum.default.GRAPH_HAS_MOUNTED, function () {
      _this.listeningForTick = true;
    });
  }
  /* Updates all markers (arrows) */


  _createClass(DOMProcessor, [{
    key: "updateMarkers",
    value: function updateMarkers(edges) {
      var _this2 = this;

      /* Init markers */
      var defs = this.rootG.select("defs");
      defs.selectAll("marker").remove();
      edges.forEach(function (l, i) {
        _this2.drawMarker(defs, l, false);

        if (l.nameFrom) {
          _this2.drawMarker(defs, l, true);
        }
      });
    }
    /* Updates all edges */

  }, {
    key: "updateEdges",
    value: function updateEdges(edges) {
      var _this3 = this;

      /* Create edge groups and paths */
      var selector = this.rootG.select("#edge-container").selectAll(".edge").data(edges, function (d) {
        return d.id;
      });
      selector.exit().remove();
      selector.enter().append("g").attr("class", function (d) {
        return _this3.getMarkerId(d, true) + " " + _this3.getMarkerId(d, false);
      }).classed("edge", true).append("path").attr("class", function (d) {
        //Generated class
        return "edge-path-".concat(d.type ? d.type : "default");
      }).attr("marker-end", function (l) {
        return "url(#" + _this3.getMarkerId(l, false) + ")";
      }).attr("marker-start", function (l) {
        if (l.nameFrom) {
          return "url(#" + _this3.getMarkerId(l, true) + ")";
        }

        return "";
      });
      this.edgePath = this.rootG.select("#edge-container").selectAll(".edge path");
    }
    /* Updates all multiplicity counters */

  }, {
    key: "updateMultiplicityCounters",
    value: function updateMultiplicityCounters(edges) {
      var _this4 = this;

      /* Create multiplicity counter */
      if (this.showMultiplicity) {
        var selector = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").data(edges, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").classed("multiplicity", true).filter(function (l) {
          return l.multiplicityTo || l.multiplicityFrom;
        }).each(function (d, i, c) {
          if (d.multiplicityFrom) {
            _this4.drawMultiplicity(d3.select(c[i]), "to");
          }

          if (d.multiplicityTo) {
            _this4.drawMultiplicity(d3.select(c[i]), "from");
          }
        });
      } else {
        this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
      }

      this.activeMultiplicities = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").selectAll("g");
    }
    /* Updates all nodes */

  }, {
    key: "updateNodes",
    value: function updateNodes(nodes) {
      var _this5 = this;

      /* Create node groups */
      var selector = this.rootG.select("#node-container").selectAll(".node").data(nodes, function (d) {
        return d.id;
      });
      selector.exit().remove();
      selector.enter().append("g").attr("class", "node").call(d3.drag().on("start", function (d) {
        //Stop force on start in case it was just a simple click
        _this5.ee.trigger(_EventEnum.default.NODE_DRAG_START, d);

        d.fx = d.x;
        d.fy = d.y;
      }).on("drag", function (d) {
        //Restart force on drag
        _this5.ee.trigger(_EventEnum.default.NODE_DRAG_DRAGGED, d);

        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }).on("end", function (d) {
        d.fx = null;
        d.fy = null;

        _this5.ee.trigger(_EventEnum.default.NODE_DRAG_ENDED, d);
      })).each(function (d, i, c) {
        var element = d3.select(c[i]);

        _this5.drawNode(element, d);
      }); //Draw counter badges for imploded edges

      nodes.forEach(function (node) {
        d3.select("#badge-" + node.id + "-hidden-edge-counter").remove();

        if (node.hiddenEdgeCount) {
          var element = d3.select("[id='".concat(node.id, "']")).select(function () {
            return this.parentNode;
          });

          _this5.drawNodeCollapsedEdgeCounter(element, node);
        }
      });
      this.nodeElements = this.rootG.select("#node-container").selectAll(".node");
    }
    /* Updates all labels */

  }, {
    key: "updateLabels",
    value: function updateLabels(edges) {
      var _this6 = this;

      /* Create label groups */
      var selector = this.rootG.select("#label-container").selectAll(".label").data(edges, function (d) {
        return d.id;
      });
      selector.exit().remove();
      selector.enter().append("g").classed("label", true)
      /* Create labels, exclude edges without labels */
      .filter(function (d) {
        var needsLabel = d.nameTo || d.nameFrom;
        return needsLabel;
      }).each(function (d, i, c) {
        if (d.nameFrom) {
          _this6.drawLabel(d3.select(c[i]), d, "from");
        }

        _this6.drawLabel(d3.select(c[i]), d, "to");
      });
      this.labels = this.rootG.select("#label-container").selectAll(".label").selectAll("g");
    }
    /* Returns the distance of the passed edge */

  }, {
    key: "getEdgeDistance",
    value: function getEdgeDistance(l) {
      var targetRadius = l.target.radius !== undefined ? l.target.radius : 0;
      var sourceRadius = l.source.radius !== undefined ? l.source.radius : 0;
      var distance = targetRadius + sourceRadius;
      return distance + l.edgeDistance;
    }
    /* Retrieves the marker ID */

  }, {
    key: "getMarkerId",
    value: function getMarkerId(l, inverse) {
      return (l.type ? l.type : "normal") + l.id + (inverse ? "inverse" : "");
    }
    /* Draws a marker */

  }, {
    key: "drawMarker",
    value: function drawMarker(defs, edge, inverse) {
      defs.append("marker").attr("id", this.getMarkerId(edge, inverse)).attr("viewBox", "0 -8 14 16").attr("refX", inverse ? 0 : 12).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").attr("class", (edge.type ? edge.type : "normal") + "Marker").attr("class", "marker-" + (edge.type ? edge.type : "default")).append("path").attr("d", function () {
        return inverse ? "M12,-8L0,0L12,8Z" : "M0,-8L12,0L0,8Z";
      });
    }
    /* Draws a label to a edge in direction X */

  }, {
    key: "drawLabel",
    value: function drawLabel(edge, data, direction) {
      var label = edge.append("g").attr("id", "label" + data.id + direction).classed(direction, true);
      this.drawLabelRect(label, data, direction);
      var labelText = label.append("text").attr("class", function () {
        //Generated class
        return "label-text-".concat(data.type ? data.type : "default");
      }).attr("text-anchor", "middle");
      this.drawLabelText(labelText, data, direction);
    }
    /* Draws a rectangle as a label background */

  }, {
    key: "drawLabelRect",
    value: function drawLabelRect(label, data, direction) {
      var _this7 = this;

      var width = direction === "to" ? data.nameToWidth : data.nameFromWidth;
      label.append("rect").attr("class", function () {
        //Generated class
        return "label-rect-".concat(data.type ? data.type : "default");
      }).attr("x", -width / 2).attr("y", -_Env.default.LABEL_HEIGHT / 2).attr("width", width).attr("height", _Env.default.LABEL_HEIGHT).on("mouseenter", function (edgeData) {
        _this7.labelMouseEnter(edgeData, direction);
      }).on("mouseleave", function (edgeData) {
        _this7.labelMouseLeave(edgeData, direction);
      });
    }
    /* Draws a new <tspan> to a supplied label */

  }, {
    key: "drawLabelText",
    value: function drawLabelText(element, d, direction) {
      element.append("tspan").text(function () {
        var width = direction === "to" ? d.nameToWidth : d.nameFromWidth;
        var value;

        if (direction === "to") {
          value = d.nameTo;
        } else if (direction === "from") {
          value = d.nameFrom;
        } else {
          value = d.nameTo ? d.nameTo : d.nameFrom;
        }

        return value.toString().truncate(width);
      });
    }
    /* Highlights the marker and edge for the given label and direction */

  }, {
    key: "labelMouseEnter",
    value: function labelMouseEnter(edgeData, direction) {
      var _this8 = this;

      var inverse = direction === "from";
      d3.selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path").classed("hovered", true);
      d3.selectAll("." + this.getMarkerId(edgeData, inverse)).selectAll("path, text").classed("hovered", true); //Timeout the sorting to save CPU cycles, and stop a sorting from taking place if the mouse just passed by

      setTimeout(function () {
        var marker = d3.selectAll("marker#" + _this8.getMarkerId(edgeData, inverse)).select("path");

        if (marker.classed("hovered")) {
          //Handle event
          _this8.handleHoverEvent(edgeData, "enter"); //Sort the labels which brings the hovered one to the foreground


          _this8.rootG.selectAll(".label").sort(function (a, b) {
            if (a.id === edgeData.id && b.id !== edgeData.id) {
              return 1; // a is hovered
            } else if (a.id !== edgeData.id && b.id === edgeData.id) {
              return -1; // b is hovered
            } else {
              // workaround to make sorting in chrome for these elements stable
              return a.id - b.id; // compare unique values
            }
          });
        }
      }, 250);
    }
    /* Removes highlighting of marker and edge for the given label and direction */

  }, {
    key: "labelMouseLeave",
    value: function labelMouseLeave(edgeData, direction) {
      //Handle event
      this.handleHoverEvent(edgeData, "leave");
      var inverse = direction === "from";
      d3.selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path").classed("hovered", false);
      d3.selectAll("." + this.getMarkerId(edgeData, inverse)).selectAll("path, text").classed("hovered", false);
    }
    /* Draws multiplicity notation */

  }, {
    key: "drawMultiplicity",
    value: function drawMultiplicity(edge, direction) {
      var _this9 = this;

      var card = edge.append("g").attr("class", function (l) {
        return _this9.getMarkerId(l, direction === "to");
      }).classed(direction, true);
      card.append("text").attr("text-anchor", "middle").text(function (d) {
        return direction === "to" ? d.multiplicityTo : d.multiplicityFrom;
      });
    }
    /* Draws a node */

  }, {
    key: "drawNode",
    value: function drawNode(element, data) {
      var _this10 = this;

      switch (data.shape) {
        case "circle":
          element.append("circle").attr("r", function (d) {
            return d.radius;
          }).attr("class", "node-".concat(data.type ? data.type : "default")) //Generated Class
          .attr("id", data.id); //.append("svg:title")
          //.text((d) => d.name)

          break;

        case "layeredCircle":
          //Create an outer circle, with the "real" circle inside
          element.append("circle").attr("r", function (d) {
            return d.radius;
          }).attr("style", "stroke-width:2;fill:#fff;stroke:#000;stroke-dasharray:0;").attr("id", data.id);
          element.append("circle").attr("r", function (d) {
            return d.radius - 4;
          }).attr("class", "node-".concat(data.type ? data.type : "default")); //Generated Class
          //.append("svg:title")
          //.text((d) => d.name)

          break;

        case "rectangle":
          element.append("rect").attr("x", function (d) {
            return -d.width / 2;
          }).attr("y", function (d) {
            return -d.height / 2;
          }).attr("width", function (d) {
            return d.width;
          }).attr("height", function (d) {
            return d.height;
          }).attr("class", "node-".concat(data.type ? data.type : "default")) //Generated Class
          .attr("id", data.id); //.append("svg:title")
          //.text((d) => d.name)

          break;

        default:
          console.error("NO SHAPE FOUND FOR NODE");
      }

      element //Add hover listeners
      .on("mouseenter", function (d) {
        //Handle event
        _this10.handleHoverEvent(d, "enter");
      }).on("mouseleave", function (d) {
        //Handle event
        _this10.handleHoverEvent(d, "leave");
      }) //Add Tooltip hover function
      .on("mousemove", function (d) {
        _this10.ee.trigger(_EventEnum.default.MOUSE_OVER_NODE, d);
      }).on("mouseout", function (d) {
        _this10.ee.trigger(_EventEnum.default.MOUSE_LEFT_NODE, d);
      }); //draw textblock

      this.drawTextBlock(element); //Draw the textline inside the block
      //Figure out if it should be one or two rows of text

      var text = data.name;
      var truncatedText = text.truncate(data.maxTextWidth);

      if (truncatedText.length < text.length && truncatedText.lastIndexOf(" ") > -1) {
        truncatedText = truncatedText.substring(0, truncatedText.lastIndexOf(" "));
        var otherStringTruncated = text.substring(truncatedText.length + 1).truncate(data.maxTextWidth);

        if (otherStringTruncated.length + truncatedText.length + 1 < text.length) {
          otherStringTruncated = otherStringTruncated.substring(0, otherStringTruncated.length - 3) + "...";
        }

        this.drawTextline(element.select("text"), truncatedText, data.type ? data.type : "default", -(_Env.default.SPACE_BETWEEN_SPANS / 2));
        this.drawTextline(element.select("text"), otherStringTruncated, data.type ? data.type : "default", _Env.default.SPACE_BETWEEN_SPANS / 2);
      } else {
        if (truncatedText.length < text.length) {
          truncatedText = truncatedText.substring(0, truncatedText.length - 3) + "...";
        }

        this.drawTextline(element.select("text"), truncatedText, data.type ? data.type : "default", 0);
      }
    }
    /* Draws a <text> block to a given element */

  }, {
    key: "drawTextBlock",
    value: function drawTextBlock(element) {
      element.append("text").attr("text-anchor", "middle");
    }
    /* Draws a new line of text to a given element. */

  }, {
    key: "drawTextline",
    value: function drawTextline(element, word, type, y) {
      element.append("tspan").attr("class", "node-text-".concat(type)).attr("x", 0).attr("y", y).text(word);
    } //Draws a badge in the top right corner of nodes with a number of a hidden edge count in it

  }, {
    key: "drawNodeCollapsedEdgeCounter",
    value: function drawNodeCollapsedEdgeCounter(element, data) {
      var count = "".concat(data.hiddenEdgeCount);
      var textWidth = count.width();
      var fontSize = 14;
      var areaHeight = data.radius ? data.radius * 2 : data.height;
      var areaWidth = data.radius ? data.radius * 2 : data.width;
      var marginX = 12;
      var marginY = 12;
      var translateY = -(areaHeight / 2);
      var translateX = areaWidth / 2;
      var rectHeight = fontSize + marginY;
      var rectWidth = textWidth + marginX;
      element.append("g").attr("id", "badge-" + data.id + "-hidden-edge-counter").attr("style", "pointer-events:none;").attr("transform", "translate(".concat(translateX, " ").concat(translateY, ")")).append("rect").attr("width", rectWidth).attr("height", rectHeight).attr("y", -(rectHeight / 2)).attr("x", -(rectWidth / 2)).attr("class", "virrvarr-node-edge-counter-badge").select(function () {
        return this.parentNode;
      }).append("text").attr("class", "virrvarr-node-edge-counter-badge-text").append("tspan").attr("style", "font-size:".concat(fontSize, ";")).text("".concat(count));
    }
    /* Creates event listener for onClick events for nodes and edges */

  }, {
    key: "attachEntityClickListeners",
    value: function attachEntityClickListeners() {
      var _this11 = this;

      //We need to stop the click event if it is a double click event
      //We do this using a timeout that starts on click and cancels on double click.
      var timeout = null;
      this.rootG.selectAll(".node").on("click", function (d) {
        d3.event.stopPropagation();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          _this11.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
            id: d.id,
            data: d.data
          });
        }, _Env.default.DOUBLE_CLICK_THRESHOLD);
      }).on("dblclick", function (d) {
        d3.event.stopPropagation();
        clearTimeout(timeout);

        _this11.ee.trigger(_EventEnum.default.DBL_CLICK_ENTITY, {
          id: d.id,
          data: d.data
        });
      }).on("contextmenu", function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();

        _this11.ee.trigger(_EventEnum.default.RIGHT_CLICK_ENTITY, d);
      });
      this.rootG.selectAll(".label .from").on("click", function (d) {
        d3.event.stopPropagation();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          _this11.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "from"
          });
        }, _Env.default.DOUBLE_CLICK_THRESHOLD);
      }).on("dblclick", function (d) {
        d3.event.stopPropagation();

        _this11.ee.trigger(_EventEnum.default.DBL_CLICK_ENTITY, {
          id: d.id,
          data: d.data,
          direction: "from"
        });
      }).on("contextmenu", function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();

        _this11.ee.trigger(_EventEnum.default.RIGHT_CLICK_ENTITY, d, "from");
      });
      this.rootG.selectAll(".label .to").on("click", function (d) {
        d3.event.stopPropagation();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          _this11.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "to"
          });
        }, _Env.default.DOUBLE_CLICK_THRESHOLD);
      }).on("dblclick", function (d) {
        d3.event.stopPropagation();

        _this11.ee.trigger(_EventEnum.default.DBL_CLICK_ENTITY, {
          id: d.id,
          data: d.data,
          direction: "from"
        });
      }).on("contextmenu", function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();

        _this11.ee.trigger(_EventEnum.default.RIGHT_CLICK_ENTITY, d, "to");
      });
    }
    /* Handles what happens when an item is hovered */

  }, {
    key: "handleHoverEvent",
    value: function handleHoverEvent(hoveredData, eventType) {
      //Emitt event
      this.ee.trigger(_EventEnum.default.HOVER_ENTITY, {
        eventType: eventType,
        id: hoveredData.id,
        data: hoveredData.data
      });

      if (this.fadeOnHover) {
        //Handle fading the non-relevant information
        //If the selected item is a node
        if (!hoveredData.sourceNode) {
          //Find all edges and nodes with a connection to this node
          var filteredEdges = this.edges.filter(function (edge) {
            return edge.sourceNode === hoveredData.id || edge.targetNode === hoveredData.id;
          });
          var validNodes = filteredEdges.reduce(function (acc, edge) {
            acc.push(edge.targetNode);
            acc.push(edge.sourceNode);
            return acc;
          }, []);
          validNodes.push(hoveredData.id); //Set opacity for fade or unfade

          var opacity = eventType === "enter" ? "" + _Env.default.DEFAULT_FADE_OPACITY : "" + 1; //Nodes

          d3.selectAll(".node").filter(function (d) {
            return validNodes.find(function (node) {
              return node === d.id;
            }) === undefined;
          }).transition().duration(_Env.default.FADE_TIME).ease(d3.easeLinear).style("opacity", opacity); //Edges

          d3.selectAll(".edge").filter(function (d) {
            return filteredEdges.find(function (edge) {
              return edge.id === d.id;
            }) === undefined;
          }).transition().duration(_Env.default.FADE_TIME).ease(d3.easeLinear).style("opacity", opacity); //Labels

          d3.selectAll(".label").filter(function (d) {
            return filteredEdges.find(function (edge) {
              return edge.id === d.id;
            }) === undefined;
          }).transition().duration(_Env.default.FADE_TIME).ease(d3.easeLinear).style("opacity", opacity);
        }
      }
    }
    /* Animation tick */

  }, {
    key: "tick",
    value: function tick() {
      //Edges
      this.edgePath.attr("d", function (l) {
        if (l.source === l.target) {
          return _MathUtils.default.calculateSelfEdgePath(l);
        }

        var pathStart = _MathUtils.default.calculateIntersection(l.target, l.source, 1);

        var pathEnd = _MathUtils.default.calculateIntersection(l.source, l.target, 1);

        var curvePoint = _MathUtils.default.calculateCurvePoint(pathStart, pathEnd, l);

        l.curvePoint = curvePoint;
        return _MathUtils.default.curveFunction([_MathUtils.default.calculateIntersection(l.curvePoint, l.source, 1), curvePoint, _MathUtils.default.calculateIntersection(l.curvePoint, l.target, 1)]);
      }); //Nodes

      this.nodeElements.attr("transform", function (node) {
        return "translate(" + node.x + "," + node.y + ")";
      }); //Multiplicities

      this.activeMultiplicities.attr("transform", function (l) {
        var group = d3.select(this);
        var pos;

        if (group.classed("to")) {
          pos = _MathUtils.default.calculateIntersection(l.curvePoint, l.source, _Env.default.MULTIPLICITY_HDISTANCE);
        } else {
          pos = _MathUtils.default.calculateIntersection(l.curvePoint, l.target, _Env.default.MULTIPLICITY_HDISTANCE);
        }

        var n = _MathUtils.default.calculateNormalVector(l.curvePoint, l.source, _Env.default.MULTIPLICITY_VDISTANCE);

        if (l.source.index < l.target.index) {
          n.x = -n.x;
          n.y = -n.y;
        }

        return "translate(" + (pos.x + n.x) + "," + (pos.y + n.y) + ")";
      }); //Labels

      this.labels.attr("transform", function (l) {
        var group = d3.select(this);
        var midX = l.curvePoint.x;
        var midY = l.curvePoint.y;

        if (l.nameFrom) {
          if (group.classed("to")) {
            midY += _Env.default.LABEL_HEIGHT / 2 + 1;
          } else if (group.classed("from")) {
            midY -= _Env.default.LABEL_HEIGHT / 2 + 1;
          }
        }

        return "translate(" + midX + "," + midY + ")";
      });
    }
  }]);

  return DOMProcessor;
}();

exports.default = DOMProcessor;