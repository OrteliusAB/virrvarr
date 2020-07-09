"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* TODO:: Implement deep clone utility instead of JSON.stringify/parse */
var Datastore =
/*#__PURE__*/
function () {
  function Datastore(nodes, edges, eventEmitter) {
    var _this = this;

    _classCallCheck(this, Datastore);

    this.allNodes = JSON.parse(JSON.stringify(nodes));
    this.allEdges = JSON.parse(JSON.stringify(edges));
    this.liveNodes = this.allNodes;
    this.liveEdges = this.allEdges;
    this.filters = {
      nodes: [],
      edges: []
    };
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.DATA_UPDATE_REQUESTED, function (nodes, edges) {
      return _this.updateDataset(nodes, edges);
    });
    this.ee.on(_EventEnum.default.GRAPH_HAS_MOUNTED, function () {
      _this.ee.trigger(_EventEnum.default.DATASTORE_UPDATED, _this.nodes, _this.edges);
    });
    this.ee.on(_EventEnum.default.DATA_FILTER_REQUESTED, function (filters) {
      _this.setFilters(filters);

      _this.applyFilters();

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(_EventEnum.default.DATA_FILTER_RESET_REQUESTED, function () {
      _this.resetAllFilters();

      _this.applyFilters();

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(_EventEnum.default.IMPLODE_EXPLODE_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNode(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(_EventEnum.default.IMPLODE_EXPLODE_LEAFS_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNodeLeafs(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(_EventEnum.default.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNodeRecursive(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(_EventEnum.default.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNodeNonCircular(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.updateEdgeIDs();
    this.applyFilters();
    this.updateNumberOfHiddenEdgesOnNodes();
  }

  _createClass(Datastore, [{
    key: "updateEdgeIDs",
    value: function updateEdgeIDs() {
      this.allEdges.forEach(function (edge, edgeIndex) {
        if (edge.id === undefined) {
          edge.id = edgeIndex;
        }
      });
    }
  }, {
    key: "updateDataset",
    value: function updateDataset(newNodes, newEdges) {
      var nodes = JSON.parse(JSON.stringify(newNodes));
      var edges = JSON.parse(JSON.stringify(newEdges));
      this.allNodes = nodes;
      this.allEdges = edges;
      this.updateEdgeIDs();
      this.applyFilters();
      this.updateNumberOfHiddenEdgesOnNodes();
      this.updateLiveData();
    }
  }, {
    key: "getNodeByID",
    value: function getNodeByID(ID) {
      return this.allNodes.find(function (node) {
        return node.id === ID;
      });
    }
  }, {
    key: "getEdgeByID",
    value: function getEdgeByID(ID) {
      return this.allEdges.find(function (edge) {
        return edge.id === ID;
      });
    }
    /* Clears all filters */

  }, {
    key: "resetAllFilters",
    value: function resetAllFilters() {
      this.filters = {
        nodes: [],
        edges: []
      };
    }
    /* Sets the filters */

  }, {
    key: "setFilters",
    value: function setFilters(filters) {
      var nodeFilters = [];
      var edgeFilters = [];
      filters.forEach(function (filter) {
        if (filter.entityType === "node") {
          nodeFilters.push({
            attribute: filter.attribute,
            value: filter.value,
            function: filter.filterFunction
          });
        } else if (filter.entityType === "edge") {
          edgeFilters.push({
            attribute: filter.attribute,
            value: filter.value,
            function: filter.filterFunction
          });
        } else {
          throw new Error("No such entity type for filters:", filter.entityType);
        }
      });
      this.filters.nodes = nodeFilters;
      this.filters.edges = edgeFilters;
    }
    /* Applies all defined filters to the dataset */

  }, {
    key: "applyFilters",
    value: function applyFilters() {
      var _this2 = this;

      this.allNodes.forEach(function (node) {
        var isFiltered = false;

        _this2.filters.nodes.forEach(function (filter) {
          if (!isFiltered) {
            if (filter.filterFunction) {
              isFiltered = filter.filterFunction(node.data);
            } else if (node[filter.attribute] === filter.value) {
              isFiltered = true;
            }
          }
        });

        node.isFiltered = isFiltered;
      });
      this.allEdges.forEach(function (edge) {
        var isFiltered = false;

        _this2.filters.edges.forEach(function (filter) {
          if (!isFiltered) {
            if (filter.filterFunction) {
              isFiltered = filter.filterFunction(edge.data);
            } else if (edge[filter.attribute] === filter.value) {
              isFiltered = true;
            }
          }
        }); //If nodes have been removed there could be broken edges. Mark these as filtered as well.


        var foundSource = _this2.allNodes.find(function (node) {
          return edge.sourceNode === node.id && !node.isFiltered;
        });

        var foundTarget = _this2.allNodes.find(function (node) {
          return edge.targetNode === node.id && !node.isFiltered;
        });

        if (!foundSource || !foundTarget) {
          isFiltered = true;
        }

        edge.isFiltered = isFiltered;
      });
    }
    /* Updates the live data by filtering non-relevant nodes and edges */

  }, {
    key: "updateLiveData",
    value: function updateLiveData() {
      var _this3 = this;

      var nodes = this.allNodes.filter(function (node) {
        return _this3.isNodeLive(node);
      });
      var edges = this.allEdges.filter(function (edge) {
        return _this3.isEdgeLive(edge);
      }); //Apply the result to the live data
      //Sidenote: the reason we don't just overwrite the live data is because that messes with D3s object references

      nodes.forEach(function (newNode) {
        if (!_this3.liveNodes.find(function (oldNode) {
          return oldNode.id === newNode.id;
        })) {
          _this3.liveNodes.push(newNode);
        }
      });
      this.liveNodes = this.liveNodes.filter(function (oldNode) {
        return nodes.find(function (newNode) {
          return oldNode.id === newNode.id;
        });
      });
      edges.forEach(function (newEdge) {
        if (!_this3.liveEdges.find(function (oldEdge) {
          return oldEdge.id === newEdge.id;
        })) {
          _this3.liveEdges.push(newEdge);
        }
      });
      this.liveEdges = this.liveEdges.filter(function (oldEdge) {
        return edges.find(function (newEdge) {
          return oldEdge.id === newEdge.id;
        });
      });
      this.ee.trigger(_EventEnum.default.DATASTORE_UPDATED, this.nodes, this.edges);
    }
    /* Updates the counter on all nodes that has information about how many hidden edges it is a source to */

  }, {
    key: "updateNumberOfHiddenEdgesOnNodes",
    value: function updateNumberOfHiddenEdgesOnNodes() {
      var _this4 = this;

      //Write number of hidden edges to nodes
      this.allNodes.forEach(function (node) {
        if (node.isHidden || node.isFiltered) {
          //Node is not live
          node.hiddenEdgeCount = null;
          return;
        }

        node.hiddenEdgeCount = _this4.allEdges.filter(function (edge) {
          return edge.isHidden && !edge.isFiltered && edge.sourceNode === node.id;
        }).length;
      });
    }
  }, {
    key: "isNodeLive",
    value: function isNodeLive(node) {
      return !node.isHidden && !node.isFiltered;
    }
  }, {
    key: "isEdgeLive",
    value: function isEdgeLive(edge) {
      return !edge.isHidden && !edge.isFiltered;
    }
    /* Sets given nodes and edges to a specified hidden status (usually true or false) */

  }, {
    key: "setNodesAndEdgesHiddenStatus",
    value: function setNodesAndEdgesHiddenStatus(nodes, edges, status) {
      nodes.forEach(function (node) {
        return node.isHidden = status;
      });
      edges.forEach(function (edge) {
        return edge.isHidden = status;
      });
    }
    /* Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) */

  }, {
    key: "implodeOrExplodeNode",
    value: function implodeOrExplodeNode(rootNodeID, isImplode) {
      var _this5 = this;

      var connectedEdges = this.allEdges.filter(function (edge) {
        return edge.sourceNode === rootNodeID;
      });
      var connectedNodes = connectedEdges.map(function (edge) {
        return edge.targetNode;
      }).filter(function (node) {
        return node !== rootNodeID;
      });
      var collateralEdges = this.allEdges.filter(function (edge) {
        if (connectedNodes.includes(edge.sourceNode) && connectedNodes.includes(edge.targetNode)) {
          //Processed nodes connecting to each other. This should always be included.
          return true;
        } else if (connectedNodes.includes(edge.sourceNode)) {
          //Going outwards
          return _this5.isNodeLive(_this5.getNodeByID(edge.targetNode));
        } else if (connectedNodes.includes(edge.targetNode)) {
          //Going inwards
          return _this5.isNodeLive(_this5.getNodeByID(edge.sourceNode));
        } else {
          return false;
        }
      });
      var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
      var nodes = connectedNodes.map(function (nodeID) {
        return _this5.getNodeByID(nodeID);
      });
      this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
      return {
        updatedNodes: nodes,
        updatedEdges: edges
      };
    }
    /* Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) where no further branching continues */

  }, {
    key: "implodeOrExplodeNodeLeafs",
    value: function implodeOrExplodeNodeLeafs(rootNodeID, isImplode) {
      var _this6 = this;

      var connectedEdges = this.allEdges.filter(function (edge) {
        return edge.sourceNode === rootNodeID;
      }).filter(function (edge) {
        return !_this6.allEdges.find(function (secondaryEdge) {
          return secondaryEdge.sourceNode === edge.targetNode;
        });
      });
      var connectedNodes = connectedEdges.map(function (edge) {
        return edge.targetNode;
      });
      var collateralEdges = this.allEdges.filter(function (edge) {
        return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
      });
      var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
      var nodes = connectedNodes.map(function (nodeID) {
        return _this6.getNodeByID(nodeID);
      });
      this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
      return {
        updatedNodes: nodes,
        updatedEdges: edges
      };
    }
    /* Sets all nodes connected to the node with the provided ID to hidden=true/false 
    (in the TO direction) recursively until it reaches the end of the tree */

  }, {
    key: "implodeOrExplodeNodeRecursive",
    value: function implodeOrExplodeNodeRecursive(nodeID, isImplode) {
      var _this7 = this;

      var processedNodeIDs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (!processedNodeIDs.includes(nodeID)) {
        processedNodeIDs.push(nodeID);

        var _this$implodeOrExplod = this.implodeOrExplodeNode(nodeID, isImplode),
            updatedNodes = _this$implodeOrExplod.updatedNodes;

        updatedNodes.forEach(function (node) {
          return _this7.implodeOrExplodeNodeRecursive(node.id, isImplode, processedNodeIDs);
        });
      }
    }
    /* 
    Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) 
    recursively until it reaches the end of the tree, but only for branches that don't create circular references back. 
    (to avoid imploding the entire tree on highly interconnected data) 
    */

  }, {
    key: "implodeOrExplodeNodeNonCircular",
    value: function implodeOrExplodeNodeNonCircular(rootNodeID, isImplode) {
      var _this8 = this;

      var connectedEdges = this.allEdges.filter(function (edge) {
        return edge.sourceNode === rootNodeID;
      }).filter(function (edge) {
        return _this8.calculateEdgePathFromNodeToNode(edge.targetNode, rootNodeID).length === 0;
      });
      var connectedNodes = connectedEdges.map(function (edge) {
        return edge.targetNode;
      });
      var collateralEdges = this.allEdges.filter(function (edge) {
        return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
      });
      var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
      var nodes = connectedNodes.map(function (nodeID) {
        return _this8.getNodeByID(nodeID);
      });
      this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
      connectedNodes.forEach(function (nodeID) {
        return _this8.implodeOrExplodeNodeRecursive(nodeID, isImplode);
      });
      return {
        updatedNodes: nodes,
        updatedEdges: edges
      };
    }
    /*  Calculates the shortest path from one node to another
        It returns an array with the nodeIDs, or an empty array if there is no path */

  }, {
    key: "calculateEdgePathFromNodeToNode",
    value: function calculateEdgePathFromNodeToNode(nodeIDFrom, nodeIDTo) {
      var _this9 = this;

      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var crossedNodes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var result = [];

      if (!crossedNodes.includes(nodeIDFrom)) {
        if (nodeIDFrom === nodeIDTo) {
          path.push(nodeIDTo);
          return path;
        }

        path.push(nodeIDFrom);
        crossedNodes.push(nodeIDFrom);
        var nextSteps = this.allEdges.filter(function (edge) {
          return edge.sourceNode === nodeIDFrom;
        });
        nextSteps.forEach(function (node) {
          var pathCopy = _toConsumableArray(path);

          var potentialPath = _this9.calculateEdgePathFromNodeToNode(node, nodeIDTo, pathCopy, crossedNodes);

          if (potentialPath.length > 0) {
            result = potentialPath;
          }
        });
      }

      return result;
    }
  }, {
    key: "edges",
    get: function get() {
      return this.liveEdges;
    }
  }, {
    key: "nodes",
    get: function get() {
      return this.liveNodes;
    }
  }]);

  return Datastore;
}();

exports.default = Datastore;