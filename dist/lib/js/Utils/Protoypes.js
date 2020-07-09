"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

var d3 = _interopRequireWildcard(require("d3"));

var _Env = _interopRequireDefault(require("../Config/Env.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* Add String function to calculate the text field length */
String.prototype.width = function (textStyle) {
  // Set a default value
  if (!textStyle) {
    textStyle = "text";
  }

  var d = d3.select("body").append("div").attr("class", textStyle).attr("style", "position: absolute;float: left;white-space: nowrap;visibility: hidden;").attr("id", "width-test") // tag this element to identify it
  .text(this),
      w = document.getElementById("width-test").offsetWidth;
  d.remove();
  return w;
};
/* Function to truncate a string */


String.prototype.truncate = function (maxLength, textStyle) {
  maxLength -= _Env.default.ADDITIONAL_TEXT_SPACE;

  if (isNaN(maxLength) || maxLength <= 0) {
    return this;
  }

  var text = this;
  var textLength = this.length;
  var textWidth;
  var ratio;

  while (true) {
    textWidth = text.width(textStyle);

    if (textWidth <= maxLength) {
      break;
    }

    ratio = textWidth / maxLength;
    textLength = Math.floor(textLength / ratio);
    text = text.substring(0, textLength);
  }

  if (this.length > textLength) {
    return this.substring(0, textLength);
  }

  return this;
};