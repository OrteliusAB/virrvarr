"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tooltip =
/*#__PURE__*/
function () {
  function Tooltip(graphContainerElement, eventEmitter) {
    var _this = this;

    _classCallCheck(this, Tooltip);

    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;
    this.tooltip = this.initializeTooltip();
    this.ee.on(_EventEnum.default.MOUSE_OVER_NODE, function (node) {
      _this.showTooltip(node);
    });
    this.ee.on(_EventEnum.default.MOUSE_LEFT_NODE, function () {
      _this.hideTooltip();
    });
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, function () {
      return _this.destroy();
    });
  }
  /* Initializes the tooltip */


  _createClass(Tooltip, [{
    key: "initializeTooltip",
    value: function initializeTooltip() {
      return d3.select(this.graphContainerElement).append("div").attr("id", "virrvarr-tooltip");
    }
    /* Displays the tooltip with a text at coordinates x and y */

  }, {
    key: "showTooltip",
    value: function showTooltip(node) {
      var coordinates = d3.mouse(document.documentElement);
      this.tooltip.style("left", coordinates[0] - window.pageXOffset + "px").style("top", coordinates[1] + 20 - window.pageYOffset + "px").style("transform", "translateX(-50%)").style("display", "inline-block").style("position", "fixed").html(node.name);
    }
    /* Hides the tooltip */

  }, {
    key: "hideTooltip",
    value: function hideTooltip() {
      this.tooltip.style("display", "none");
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.tooltip.remove();
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;