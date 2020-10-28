"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ZoomHandler =
/*#__PURE__*/
function () {
  function ZoomHandler(graphContainerElement, eventEmitter, options) {
    var _this = this;

    _classCallCheck(this, ZoomHandler);

    this.graphContainerElement = graphContainerElement;
    this.enableZoomButtons = options.enableZoomButtons !== undefined ? options.enableZoomButtons : _Env.default.ENABLE_ZOOM_BUTTONS;
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.ZOOM_REQUESTED, function (x, y, scale) {
      _this.handleZoomRequest(x, y, scale);
    });
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, function () {
      return _this.destroy();
    });
    this.zoom = d3.zoom().scaleExtent(_Env.default.SCALE_EXTENT).on("zoom", function () {
      var rootG = d3.select(_this.graphContainerElement).select("g");
      rootG.attr("transform", d3.event.transform);
    });

    if (this.enableZoomButtons) {
      this.initializeZoomButtons();
    } else {
      this.zoomButtonContainer = null;
    }
  }

  _createClass(ZoomHandler, [{
    key: "initializeZoomButtons",
    value: function initializeZoomButtons() {
      var _this2 = this;

      this.zoomButtonContainer = d3.select(this.graphContainerElement).append("div").attr("style", "position:relative;");
      var zoomButtons = this.zoomButtonContainer.append("svg").attr("filter", "drop-shadow(0px 0px 2px rgba(0, 0, 0, .5))").attr("style", "position:absolute;height:110px;width:34px;right:15px;bottom:30px;").append("g").attr("class", "virrvarr-zoom-controls").attr("style", "cursor:pointer;");
      zoomButtons.append("g").on('click', function () {
        _this2.scaleBy(1.5);
      }).attr("class", "virrvarr-zoom-in").attr("transform", "translate(0, 0)").append("defs").append("path").attr("id", "prefix__zoomin_a").attr("d", "M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6-9C8.99 2 11 4.01 11 6.5S8.99 11 6.5 11 2 8.99 2 6.5 4.01 2 6.5 2zM7 4H6v2H4v1h2v2h1V7h2V6H7V4z").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__zoomin_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__zoomin_a").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__zoomin_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
      zoomButtons.append("g").on('click', function () {
        _this2.scaleBy(1 / 1.5);
      }).attr("class", "virrvarr-zoom-out").attr("transform", "translate(0, 38)").append("defs").append("path").attr("id", "prefix__zoomout_a").attr("d", "M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11zM4 6h5v1H4V6z").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__zoomout_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__zoomout_a").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__zoomout_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
      zoomButtons.append("g").on('click', function () {
        _this2.resetZoom();
      }).attr("class", "virrvarr-zoom-reset").attr("transform", "translate(0, 76)").append("defs").append("path").attr("id", "prefix__reset_a").attr("d", "M15 10c.552 0 1 .448 1 1v5h-5c-.552 0-1-.448-1-1s.448-1 1-1h3v-3c0-.552.448-1 1-1zM1 10c.552 0 1 .448 1 1v3h3c.552 0 1 .448 1 1s-.448 1-1 1H0v-5c0-.552.448-1 1-1zM16 0v5c0 .552-.448 1-1 1s-1-.448-1-1V2h-3c-.552 0-1-.448-1-1s.448-1 1-1h5zM5 0c.552 0 1 .448 1 1s-.448 1-1 1H2v3c0 .552-.448 1-1 1s-1-.448-1-1V0z").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__reset_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__reset_a").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__reset_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
    }
  }, {
    key: "scaleTo",
    value: function scaleTo(scale) {
      this.zoom.scaleTo(d3.select(this.graphContainerElement).select("svg"), scale);
    }
  }, {
    key: "scaleBy",
    value: function scaleBy(ratio) {
      this.zoom.scaleBy(d3.select(this.graphContainerElement).select("svg").transition().duration(_Env.default.ZOOM_TIME / 2), ratio);
    }
    /* This function resets the zoom to the initial position */

  }, {
    key: "resetZoom",
    value: function resetZoom() {
      var rootG = d3.select(this.graphContainerElement).select("g");
      var currentTransformStr = rootG.attr("transform");
      var currentScale = currentTransformStr.substring(currentTransformStr.indexOf("scale(") + 6, currentTransformStr.lastIndexOf(")"));
      currentScale = parseFloat(currentScale);
      var width = this.graphContainerElement.offsetWidth;
      var height = this.graphContainerElement.offsetHeight;
      var groupWidth = rootG.node().getBBox().width * currentScale;
      var groupHeight = rootG.node().getBBox().height * currentScale;
      var widthRatio = width / groupWidth;
      var heightRatio = height / groupHeight;
      var ratio = Math.min(widthRatio, heightRatio); //Is this some kind of dark magic bug, or am I going bonkers?
      //If the SVG changes size this function will fail to center the graph correctly
      //Refreshing the window will solve the problem
      //The resulting transform attributes are identical in both scenarios, but one centers it and one does not.

      d3.select(this.graphContainerElement).select("svg").transition().duration(_Env.default.ZOOM_TIME / 4).call(this.zoom.scaleBy, ratio).transition().call(this.zoom.translateTo, width / 2, height / 2);
    }
    /* This function transforms the svg>g element to a specific translation and scale */

  }, {
    key: "zoomToCoordinates",
    value: function zoomToCoordinates(x, y, scale) {
      d3.select(this.graphContainerElement).select("svg").transition().duration(_Env.default.ZOOM_TIME).call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale)).select("g").attr("transform", "translate(".concat(x, ",").concat(y, ")scale(").concat(scale, ")"));
    }
  }, {
    key: "handleZoomRequest",
    value: function handleZoomRequest(x, y, scale) {
      if ((x || x === 0) && (y || y === 0) && scale) {
        this.zoomToCoordinates(x, y, scale);
      } else {
        this.resetZoom();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.zoomButtonContainer) {
        this.zoomButtonContainer.remove();
      }
    }
  }]);

  return ZoomHandler;
}();

exports.default = ZoomHandler;