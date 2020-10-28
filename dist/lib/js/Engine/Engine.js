"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Engine =
/*#__PURE__*/
function () {
  function Engine(forceCenterX, forceCenterY, eventEmitter) {
    var _this = this;

    _classCallCheck(this, Engine);

    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.DOM_PROCESSOR_FINISHED, function (nodes, edges) {
      _this.updateSimulation(nodes, edges);

      _this.ee.trigger(_EventEnum.default.ENGINE_UPDATE_FINISHED, nodes, edges);
    });
    this.ee.on(_EventEnum.default.NODE_DRAG_START, function () {
      _this.stop();

      _this.target(0.5);
    });
    this.ee.on(_EventEnum.default.NODE_DRAG_DRAGGED, function () {
      _this.restart();
    });
    this.ee.on(_EventEnum.default.NODE_DRAG_ENDED, function () {
      _this.target(0);
    });
    this.ee.on(_EventEnum.default.CLICK_ENTITY, function () {
      _this.alpha(0);
    });
    this.ee.on(_EventEnum.default.NODE_FIXATION_REQUESTED, function () {
      _this.alpha(1);

      _this.restart();
    });
    this.ee.on(_EventEnum.default.ENGINE_LAYOUT_REQUESTED, function (nodes, edges, attribute, filterFunction, sortFunction) {
      _this.createLayout(nodes, edges, attribute, filterFunction, sortFunction);
    });
    this.ee.on(_EventEnum.default.ENGINE_LAYOUT_RESET_REQUESTED, function (nodes, edges) {
      _this.resetLayout(nodes, edges);

      _this.alpha(1);

      _this.restart();
    });
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, function () {
      return _this.stop();
    });
    this.forceCenterX = forceCenterX;
    this.forceCenterY = forceCenterY;
    this.simulation = this.initializeSimulation();
  }

  _createClass(Engine, [{
    key: "initializeSimulation",
    value: function initializeSimulation() {
      var _this2 = this;

      return d3.forceSimulation().force("charge", d3.forceManyBody().strength(_Env.default.CHARGE)).force("center", d3.forceCenter(this.forceCenterX, this.forceCenterY)).force("y", d3.forceY(0).strength(_Env.default.GRAVITY)).force("x", d3.forceX(0).strength(_Env.default.GRAVITY)).nodes([]).force("link", d3.forceLink().links([]).distance(function (l) {
        return _this2.getEdgeDistance(l);
      }).strength(_Env.default.EDGE_STRENGTH)).on("tick", function () {
        _this2.ee.trigger(_EventEnum.default.ENGINE_TICK);
      });
    }
  }, {
    key: "updateSimulation",
    value: function updateSimulation(nodes, edges) {
      var _this3 = this;

      this.simulation.nodes(nodes);
      this.simulation.force("link", d3.forceLink().links(edges).distance(function (l) {
        return _this3.getEdgeDistance(l);
      }).strength(_Env.default.EDGE_STRENGTH));
      this.simulation.alpha(1).restart();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.simulation.stop();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.simulation.restart();
    }
  }, {
    key: "alpha",
    value: function alpha(target) {
      this.simulation.alpha(target);
    }
  }, {
    key: "target",
    value: function target(_target) {
      this.simulation.alphaTarget(_target);
    }
  }, {
    key: "decay",
    value: function decay(target) {
      this.simulation.alphaDecay(target);
    }
  }, {
    key: "createLayout",
    value: function createLayout(nodes, edges, attribute, filterFunction, sortFunction) {
      var _this4 = this;

      if (sortFunction) {
        nodes = nodes.sort(function (a, b) {
          return sortFunction(a, b);
        });
      }

      var allGroups;

      if (filterFunction) {
        allGroups = nodes.map(function (node) {
          return filterFunction(node.data);
        });
      } else {
        allGroups = nodes.map(function (node) {
          return node[attribute];
        });
      }

      var xGroups = _toConsumableArray(new Set(allGroups));

      var numberOfRowsAndColumns = Math.ceil(Math.sqrt(xGroups.length));
      var currentRow = 0;
      var currentColumn = 0;
      var matrix = xGroups.map(function () {
        if (currentColumn === numberOfRowsAndColumns) {
          currentColumn = 0;
          currentRow += 1;
        }

        currentColumn += 1;
        return [currentRow, currentColumn - 1];
      });
      var columnScale = d3.scalePoint().domain(_toConsumableArray(Array(numberOfRowsAndColumns).keys())).range([30, 2000]);
      var rowScale = d3.scalePoint().domain(_toConsumableArray(Array(numberOfRowsAndColumns).keys())).range([30, 2000]);
      this.simulation.force("x", d3.forceX(function (d) {
        var value;

        if (filterFunction) {
          value = filterFunction(d.data);
        } else {
          value = d[attribute];
        }

        return columnScale(matrix[xGroups.indexOf(value)][1]);
      })).force("y", d3.forceY(function (d) {
        var value;

        if (filterFunction) {
          value = filterFunction(d.data);
        } else {
          value = d[attribute];
        }

        return rowScale(matrix[xGroups.indexOf(value)][0]);
      })).force("link", d3.forceLink().links(edges).distance(function (l) {
        return _this4.getEdgeDistance(l);
      }).strength(0)).force("charge", d3.forceManyBody().strength(-800)).alpha(1).restart();
    }
  }, {
    key: "resetLayout",
    value: function resetLayout(nodes, edges) {
      var _this5 = this;

      this.simulation.force("y", d3.forceY(0).strength(_Env.default.GRAVITY)).force("x", d3.forceX(0).strength(_Env.default.GRAVITY)).force("link", d3.forceLink().links(edges).distance(function (l) {
        return _this5.getEdgeDistance(l);
      }).strength(_Env.default.EDGE_STRENGTH)).force("charge", d3.forceManyBody().strength(_Env.default.CHARGE));
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
  }]);

  return Engine;
}();

exports.default = Engine;