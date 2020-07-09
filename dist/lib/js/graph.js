"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./Utils/Protoypes.js");

var _Env = _interopRequireDefault(require("./Config/Env.js"));

var _Datastore = _interopRequireDefault(require("./Datastore/Datastore"));

var _EventEmitter = _interopRequireDefault(require("./Events/EventEmitter"));

var _UI = _interopRequireDefault(require("./UI/UI"));

var _Engine = _interopRequireDefault(require("./Engine/Engine"));

var _EventEnum = _interopRequireDefault(require("./Events/EventEnum"));

var _EntityProcessor = _interopRequireDefault(require("./Datastore/EntityProcessor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Virrvarr =
/*#__PURE__*/
function () {
  function Virrvarr(graphContainerElement, inputData, options) {
    var _this = this;

    _classCallCheck(this, Virrvarr);

    /* Init user input */
    this.options = Object.assign.apply(Object, [{}].concat(options));
    this.style = JSON.parse(JSON.stringify(inputData.style));
    /* Init EventEmitter */

    this.ee = new _EventEmitter.default(); //If the user specified listeners in options then add them

    this.options.entityClickListener && this.ee.on(_EventEnum.default.CLICK_ENTITY, this.options.entityClickListener);
    this.options.entityDoubleClickedListener && this.ee.on(_EventEnum.default.DBL_CLICK_ENTITY, this.options.entityDoubleClickedListener);
    this.options.entityHoveredListener && this.ee.on(_EventEnum.default.HOVER_ENTITY, this.options.entityHoveredListener);
    /* Init UI */

    this.UI = new _UI.default(graphContainerElement, this.ee, this.style, options);
    /* Init Datastore */

    this.entityProcessor = new _EntityProcessor.default(this.ee, this.style, this.options);
    this.datastore = new _Datastore.default(inputData.nodes, inputData.edges, this.ee, this.style, this.options);
    /* Init Engine */

    this.engine = new _Engine.default(this.UI.width / 2, this.UI.height / 2, this.ee);
    /* Graph has mounted! */

    this.ee.on(_EventEnum.default.GRAPH_HAS_MOUNTED, function () {
      _this.UI.zoomHandler.scaleTo(_Env.default.INITIAL_SCALE);
    });
    this.ee.trigger(_EventEnum.default.GRAPH_HAS_MOUNTED);
  }
  /* Tells the datatstore to set the filters */


  _createClass(Virrvarr, [{
    key: "setFilters",
    value: function setFilters(filters) {
      this.ee.trigger(_EventEnum.default.DATA_FILTER_REQUESTED, filters);
    }
    /* Returns all the filters from the datastore */

  }, {
    key: "getFilters",
    value: function getFilters() {
      return this.datastore.filters;
    }
    /* Tells the datastore to reset the filters */

  }, {
    key: "resetAllFilters",
    value: function resetAllFilters() {
      this.ee.trigger(_EventEnum.default.DATA_FILTER_RESET_REQUESTED);
    }
    /* Toggles multiplicity on and off in the graph */

  }, {
    key: "toggleMultiplicity",
    value: function toggleMultiplicity() {
      this.ee.trigger(_EventEnum.default.TOGGLE_MULTIPLICITY_REQUESTED);
    }
    /* Highlights nodes in the graph based on input criteria */

  }, {
    key: "highlight",
    value: function highlight(attribute, value, filterFunction) {
      if (attribute && value || filterFunction) {
        var nodesToHighlight = this.datastore.nodes.filter(function (node) {
          if (filterFunction) {
            return filterFunction(node.data);
          }

          return node[attribute].toUpperCase().startsWith(value.toUpperCase());
        });
        this.ee.trigger(_EventEnum.default.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight);
      } else {
        throw new Error("No attribute, value or filterfunction provided");
      }
    }
    /* Resets the zoom to the initial position */

  }, {
    key: "resetZoom",
    value: function resetZoom() {
      this.ee.trigger(_EventEnum.default.ZOOM_REQUESTED, null, null, null);
    }
    /* Zooms in on a specific node */

  }, {
    key: "zoomToNode",
    value: function zoomToNode(nodeID) {
      var node = this.datastore.nodes.find(function (node) {
        return node.id === nodeID;
      });

      if (node) {
        var width = this.UI.graphContainerElement.offsetWidth / 2;
        var height = this.UI.graphContainerElement.offsetHeight / 2;
        var scale = 1.5;
        var x = -node.x * scale + width;
        var y = -node.y * scale + height;
        this.ee.trigger(_EventEnum.default.ZOOM_REQUESTED, x, y, scale);
      } else {
        throw new Error("No such node: " + nodeID);
      }
    }
    /* Sets a matrix layout for the simulation */

  }, {
    key: "setMatrixLayout",
    value: function setMatrixLayout(attribute, filterFunction, sortFunction) {
      this.ee.trigger(_EventEnum.default.ENGINE_LAYOUT_REQUESTED, this.datastore.nodes, this.datastore.edges, attribute, filterFunction, sortFunction);
    }
    /* Resets the layout to the default mode */

  }, {
    key: "resetLayout",
    value: function resetLayout() {
      this.ee.trigger(_EventEnum.default.ENGINE_LAYOUT_RESET_REQUESTED, this.datastore.nodes, this.datastore.edges);
    }
  }, {
    key: "centerNode",
    value: function centerNode(nodeID) {
      var node = this.datastore.nodes.find(function (potentialNode) {
        return potentialNode.id === nodeID;
      });

      if (node) {
        var width = this.UI.rootG.node().getBBox().width / 4;
        var height = this.UI.rootG.node().getBBox().height / 4;
        this.ee.trigger(_EventEnum.default.NODE_FIXATION_REQUESTED, node, width, height);
      }
    }
    /* Implodes and explodes nodes */

  }, {
    key: "implodeOrExplodeNode",
    value: function implodeOrExplodeNode(nodeID, isImplode) {
      this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode);
    }
  }, {
    key: "implodeOrExplodeNodeLeafs",
    value: function implodeOrExplodeNodeLeafs(nodeID, isImplode) {
      this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode);
    }
  }, {
    key: "implodeOrExplodeNodeRecursive",
    value: function implodeOrExplodeNodeRecursive(nodeID, isImplode) {
      this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode);
    }
  }, {
    key: "implodeOrExplodeNodeNonCircular",
    value: function implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
      this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode);
    }
    /* Tells the datastore to change the dataset for a new one
       This is most commonly used for reflecting changes in the outer application */

  }, {
    key: "updateDataset",
    value: function updateDataset(newDataset) {
      this.ee.trigger(_EventEnum.default.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges);
    }
    /* Completely remove the graph from DOM and memory */

  }, {
    key: "destroyGraph",
    value: function destroyGraph() {
      var _this2 = this;

      //All unmount listeners must be synchronous!!
      this.ee.trigger(_EventEnum.default.GRAPH_WILL_UNMOUNT);
      this.UI.graphContainerElement.remove();
      Object.keys(this).forEach(function (key) {
        delete _this2[key];
      });
    }
  }]);

  return Virrvarr;
}();

exports.default = Virrvarr;