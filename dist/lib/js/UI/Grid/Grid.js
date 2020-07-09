"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Grid =
/*#__PURE__*/
function () {
  function Grid(graphContainerElement, eventEmitter, options) {
    _classCallCheck(this, Grid);

    this.graphContainerElement = graphContainerElement;
    this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : _Env.default.ENABLE_GRID;
    this.ee = eventEmitter;

    if (this.enableGrid) {
      this.initializeGrid();
    }
  }

  _createClass(Grid, [{
    key: "initializeGrid",
    value: function initializeGrid() {
      var defs = d3.select(this.graphContainerElement).select("svg").select("g").select("defs");
      var gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
      gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #dedede; stroke-width: 1; stroke-dasharray: 2;");
      this.createLine(gridPattern, 0, 0, 0, 2);
      this.createLine(gridPattern, 0, 0, 2, 0);
      this.createLine(gridPattern, 60, 60, 58, 60);
      this.createLine(gridPattern, 60, 60, 60, 58);
      this.createLine(gridPattern, 0, 58, 0, 60);
      this.createLine(gridPattern, 0, 60, 2, 60);
      this.createLine(gridPattern, 58, 0, 60, 0);
      this.createLine(gridPattern, 60, 0, 60, 2);
      d3.select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)");
    }
  }, {
    key: "createLine",
    value: function createLine(container, startX, startY, endX, endY) {
      container.append("line").attr("style", "stroke: #a0a0a0;stroke-width:0.5;").attr("x1", startX).attr("y1", startY).attr("x2", endX).attr("y2", endY);
    }
  }]);

  return Grid;
}();

exports.default = Grid;