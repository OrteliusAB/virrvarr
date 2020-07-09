"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Highlighter =
/*#__PURE__*/
function () {
  function Highlighter(eventEmitter) {
    var _this = this;

    _classCallCheck(this, Highlighter);

    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.CLICK_ENTITY, function (data) {
      data && _this.setElementFocus(data.id, data.direction);
    });
    this.ee.on(_EventEnum.default.CLICK_ENTITY, function (data) {
      data || _this.removeAllEntityFocus();
    });
    this.ee.on(_EventEnum.default.HIGHLIGHT_NODE_REQUESTED, function (nodes) {
      _this.highlightNode(nodes.map(function (node) {
        return node.id;
      }));
    });
  }
  /* This function sets the exclusive focus on a given entity */


  _createClass(Highlighter, [{
    key: "setElementFocus",
    value: function setElementFocus(entityID) {
      var isFromDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (entityID) {
        var isFrom;

        if (isFromDirection === "from") {
          isFrom = true;
        } else if (isFromDirection === "to") {
          isFrom = false;
        }

        this.removeAllEntityFocus();
        this.toggleEntityFocusByID(entityID, isFrom);
      }
    }
    /* This function turns off focus for all nodes and edges */

  }, {
    key: "removeAllEntityFocus",
    value: function removeAllEntityFocus() {
      d3.selectAll(".focused").classed("focused", false);
    }
    /* This function toggles the highlighting of a given node */

  }, {
    key: "toggleEntityFocusByID",
    value: function toggleEntityFocusByID(entityID) {
      var isFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.toggleNodeEntityFocus(entityID) || this.toggleEdgeEntityFocus(entityID, isFrom);
    }
    /* Toggles focus on nodes */

  }, {
    key: "toggleNodeEntityFocus",
    value: function toggleNodeEntityFocus(entityID) {
      var nodeElement = d3.select("[id='".concat(entityID, "']")); //For html4 support

      if (nodeElement.node()) {
        var DOMElement = nodeElement.node();
        var DOMNeighborhood = DOMElement.parentElement.children;
        d3.selectAll(_toConsumableArray(DOMNeighborhood)).classed("focused", !nodeElement.classed("focused"));
        return true;
      }

      return false;
    }
    /* Toggles focus on edges */

  }, {
    key: "toggleEdgeEntityFocus",
    value: function toggleEdgeEntityFocus(entityID, isFrom) {
      var labelGroup = d3.select("#label".concat(entityID).concat(isFrom ? "from" : "to"));

      if (labelGroup) {
        var label = labelGroup.select("rect");
        var focusedState = label.classed("focused");
        label.classed("focused", !focusedState);
        d3.selectAll("marker[id*=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).select("path").classed("focused", !focusedState);
        d3.selectAll("[class*=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).selectAll("path, text").classed("focused", !focusedState);
        return true;
      }

      return false;
    }
  }, {
    key: "highlightNode",
    value: function highlightNode(nodes) {
      d3.selectAll(".node").filter(function (d) {
        return nodes.includes(d.id);
      }).append("circle").attr("r", 50).classed("highlighted-node", true).transition().duration(_Env.default.HIGHLIGHT_TIME).ease(d3.easeBounce).style("transform", "scale(5)").transition().duration(_Env.default.HIGHLIGHT_TIME_REMOVE).remove();
    }
  }]);

  return Highlighter;
}();

exports.default = Highlighter;