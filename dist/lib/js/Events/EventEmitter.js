"use strict";

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEnum = _interopRequireDefault(require("./EventEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter =
/*#__PURE__*/
function () {
  /* Add all possible events from Enum to instance */
  function EventEmitter() {
    var _this = this;

    _classCallCheck(this, EventEmitter);

    this.events = {};
    Object.keys(_EventEnum.default).forEach(function (key) {
      _this.events[_EventEnum.default[key]] = [];
    });
  }
  /* Add a callback to an event */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, callback) {
      if (this.events[eventName]) {
        this.events[eventName].push(callback);
      } else {
        throw new Error("No such event: " + eventName);
      }
    }
    /* Trigger an Event */

  }, {
    key: "trigger",
    value: function trigger(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.events[eventName]) {
        this.events[eventName].forEach(function (callback) {
          callback.apply(null, args);
        });
      }
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;