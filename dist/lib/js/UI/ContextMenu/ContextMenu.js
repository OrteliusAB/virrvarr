"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.edge");

require("core-js/modules/web.dom-collections.for-each");

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

var ContextMenu =
/*#__PURE__*/
function () {
  function ContextMenu(graphContainerElement, eventEmitter, options) {
    var _this = this;

    _classCallCheck(this, ContextMenu);

    this.showContextMenu = options.showContextMenu !== undefined ? options.showContextMenu : _Env.default.SHOW_CONTEXT_MENU;
    this.customContextMenu = options.customContextMenu !== undefined ? options.customContextMenu : _Env.default.DEFAULT_CUSTOM_CONTEXT_MENU;
    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;

    if (this.showContextMenu) {
      this.ee.on(_EventEnum.default.RIGHT_CLICK_ENTITY, function (clickedItem) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.buildMenu(clickedItem, direction);
      });
      this.ee.on(_EventEnum.default.CLICK_ENTITY, function () {
        _this.removeContextmenu();
      });
      this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, function () {
        return _this.removeContextmenu();
      });
    }

    this.InitializeMenuSections();
  }

  _createClass(ContextMenu, [{
    key: "buildMenu",
    value: function buildMenu(item, direction) {
      var coordinates = d3.mouse(document.body);
      var mouseX = coordinates[0];
      var mouseY = coordinates[1];

      if (item === null) {
        this.createCanvasContextMenu(null, mouseX, mouseY);
      } else if (!direction) {
        this.createNodeContextMenu(item, mouseX, mouseY);
      } else {
        this.createEdgeContextMenu(item, mouseX, mouseY, direction);
      }
    }
    /* This function creates a custom floating menu on the screen (primarily used for right clicking) */

  }, {
    key: "createContextMenu",
    value: function createContextMenu(clickedItem, contextSectionsArray, customSectionsArray, mouseX, mouseY) {
      var _this2 = this;

      var direction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      //Remove any old context menu
      this.removeContextmenu(); //Create a new menu

      var ulElement = d3.select(this.graphContainerElement).append("div").attr("id", "virrvarr-context-menu-container").attr("class", "virrvarr-context-menu").style('position', 'fixed').style('left', mouseX + "px").style('top', mouseY + "px").style('display', 'block').append("ul").attr("class", "virrvarr-context-menu-options"); //Fill the menu with all provided sections

      contextSectionsArray.forEach(function (section, index) {
        if (index === 0) {
          _this2.processSection(ulElement, section, false, clickedItem, direction);
        } else {
          _this2.processSection(ulElement, section, true, clickedItem, direction);
        }
      });
      customSectionsArray.forEach(function (section, index) {
        _this2.processSection(ulElement, section, true, clickedItem, direction);
      });
    }
  }, {
    key: "processSection",
    value: function processSection(ul, section, shouldAddSeparatorBefore, clickedItem) {
      var _this3 = this;

      var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

      if (shouldAddSeparatorBefore) {
        ul.append("li").append("div").attr("class", "virrvarr-context-menu-divider");
      }

      section.forEach(function (menuItem) {
        ul.append("li").append("div").attr("class", "virrvarr-context-menu-option").text(function () {
          return menuItem.label;
        }).on("click", function () {
          _this3.removeContextmenu();

          var data = clickedItem && clickedItem.data || null;
          var id = clickedItem && clickedItem.id || null;
          var edgeDirection = direction;
          return menuItem.action(data, id, edgeDirection);
        });
      });
    }
  }, {
    key: "createNodeContextMenu",
    value: function createNodeContextMenu(clickedItem, mouseX, mouseY) {
      var sections = [this.NodeMenu, this.UniversalMenu];
      var customSections = [];

      if (this.customContextMenu.node) {
        customSections = _toConsumableArray(this.customContextMenu.node);
      }

      this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY);
    }
  }, {
    key: "createEdgeContextMenu",
    value: function createEdgeContextMenu(clickedItem, mouseX, mouseY, direction) {
      var sections = [this.EdgeMenu, this.UniversalMenu];
      var customSections = [];

      if (this.customContextMenu.edge) {
        customSections = _toConsumableArray(this.customContextMenu.edge);
      }

      this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY, direction);
    }
  }, {
    key: "createCanvasContextMenu",
    value: function createCanvasContextMenu(clickedItem, mouseX, mouseY) {
      var sections = [this.UniversalMenu];
      var customSections = [];

      if (this.customContextMenu.canvas) {
        customSections = _toConsumableArray(this.customContextMenu.canvas);
      }

      this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY);
    }
    /* This function removes the current floating menu */

  }, {
    key: "removeContextmenu",
    value: function removeContextmenu() {
      d3.select(this.graphContainerElement).select("#virrvarr-context-menu-container").remove();
    }
  }, {
    key: "InitializeMenuSections",
    value: function InitializeMenuSections() {
      var _this4 = this;

      this.NodeMenu = [{
        label: "Select Node",
        action: function action(data, id) {
          _this4.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
            id: id,
            data: data
          });
        }
      }];
      this.EdgeMenu = [{
        label: "Select Edge",
        action: function action(data, id, edgeDirection) {
          _this4.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
            id: id,
            data: data,
            direction: edgeDirection
          });
        }
      }];
      this.UniversalMenu = [{
        label: "Reset Zoom",
        action: function action() {
          _this4.ee.trigger(_EventEnum.default.ZOOM_REQUESTED);
        }
      }];
    }
  }]);

  return ContextMenu;
}();

exports.default = ContextMenu;