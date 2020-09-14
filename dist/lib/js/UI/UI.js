"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

var _ZoomHandler = _interopRequireDefault(require("./ZoomHandler/ZoomHandler"));

var _ContextMenu = _interopRequireDefault(require("./ContextMenu/ContextMenu"));

var _Highlighter = _interopRequireDefault(require("./Highlighter/Highlighter"));

var _Tooltip = _interopRequireDefault(require("./Tooltip/Tooltip"));

var _Grid = _interopRequireDefault(require("./Grid/Grid"));

var _DOMProcessor = _interopRequireDefault(require("./DOMProcessor/DOMProcessor"));

var _CssUtils = _interopRequireDefault(require("../Utils/CssUtils.js"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, UI);

    this.graphContainerElement = graphContainerElement;
    this.style = styles;
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, function () {
      return _this.destroy();
    });
    this.initializeContainerAutoResize();
    this.zoomHandler = new _ZoomHandler.default(this.graphContainerElement, this.ee, userDefinedOptions);
    this.contextMenu = new _ContextMenu.default(this.graphContainerElement, this.ee, userDefinedOptions);
    this.highlighter = new _Highlighter.default(this.ee);
    this.tooltip = new _Tooltip.default(this.graphContainerElement, this.ee);
    this.stylesID = "A" + (0, _v.default)();

    _CssUtils.default.initializeGraphStyles(this.style, this.stylesID);

    this.rootG = this.initializeDOM();
    this.grid = new _Grid.default(this.graphContainerElement, this.ee, userDefinedOptions);
    this.DOMProcessor = new _DOMProcessor.default(this.rootG, this.ee, userDefinedOptions);
  }

  _createClass(UI, [{
    key: "initializeContainerAutoResize",

    /* This function automatically resizes the svg container when the window size changes */
    value: function initializeContainerAutoResize() {
      var _this2 = this;

      d3.select(window).on("resize", function () {
        /* Because of how flex layouts work we need to first remove the graphcontainers space,
         and then we can measure the new dimensions */
        d3.select(_this2.graphContainerElement).select("svg").attr("width", 0).attr("height", 0);
        d3.select(_this2.graphContainerElement).select("svg").attr("width", _this2.width).attr("height", _this2.height).attr("viewBox", "0 0 " + _this2.width + " " + _this2.height);
      });
    }
  }, {
    key: "initializeDOM",
    value: function initializeDOM() {
      var _this3 = this;

      var width = this.graphContainerElement.offsetWidth;
      var height = this.graphContainerElement.offsetHeight;
      var rootG = d3.select(this.graphContainerElement).insert("svg", "*").attr("class", "virrvarr").classed("svgGraph", true).attr("width", width).attr("height", height).attr("viewBox", "0 0 " + width + " " + height).on("click", function () {
        //Do not bubble the event
        d3.event.stopPropagation();

        _this3.ee.trigger(_EventEnum.default.CLICK_ENTITY, null);
      }).on("contextmenu", function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();

        _this3.ee.trigger(_EventEnum.default.RIGHT_CLICK_ENTITY, null);
      }).call(this.zoom).on("dblclick.zoom", null).append("g");
      rootG.append("defs");
      rootG.append("g").attr("id", "edge-container");
      rootG.append("g").attr("id", "label-container");
      rootG.append("g").attr("id", "multiplicity-container");
      rootG.append("g").attr("id", "node-container");
      return rootG;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.rootG.select("#edge-container").selectAll(".edge").remove();
      this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
      this.rootG.select("#node-container").selectAll(".node").remove();
      this.rootG.select("#label-container").selectAll(".label").remove();
      d3.select(this.graphContainerElement).select("svg").remove();
      d3.select("#".concat(this.stylesID)).remove();
    }
  }, {
    key: "zoom",
    get: function get() {
      return this.zoomHandler.zoom;
    }
  }, {
    key: "context",
    get: function get() {
      return this.contextMenu;
    }
  }, {
    key: "width",
    get: function get() {
      return this.graphContainerElement.offsetWidth;
    }
  }, {
    key: "height",
    get: function get() {
      return this.graphContainerElement.offsetHeight;
    }
  }]);

  return UI;
}();

exports.default = UI;