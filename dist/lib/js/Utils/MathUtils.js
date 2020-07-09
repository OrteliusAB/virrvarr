"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var curveFunction = d3.line().x(function (d) {
  return d.x;
}).y(function (d) {
  return d.y;
}).curve(d3.curveCardinal);
var loopFunction = d3.line().x(function (d) {
  return d.x;
}).y(function (d) {
  return d.y;
}).curve(d3.curveCardinal.tension(-1));
/* Calculates the radian of an angle */

var calculateRadian = function calculateRadian(angle) {
  angle = angle % 360;

  if (angle < 0) {
    angle = angle + 360;
  }

  var arc = 2 * Math.PI * angle / 360;

  if (arc < 0) {
    arc = arc + 2 * Math.PI;
  }

  return arc;
};
/* Calculates the point where the edge between the source and target node intersects the border of the target node */


var calculateIntersection = function calculateIntersection(source, target, additionalDistance) {
  var dx = target.x - source.x;
  var dy = target.y - source.y;
  var innerDistance = target.radius; //Rectangles require some more work...

  if (target.shape === "rectangle") {
    var m_edge = Math.abs(dy / dx);
    var m_rect = target.height / target.width;

    if (m_edge <= m_rect) {
      var timesX = dx / (target.width / 2);
      var rectY = dy / timesX;
      innerDistance = Math.sqrt(Math.pow(target.width / 2, 2) + rectY * rectY);
    } else {
      var timesY = dy / (target.height / 2);
      var rectX = dx / timesY;
      innerDistance = Math.sqrt(Math.pow(target.height / 2, 2) + rectX * rectX);
    }
  }

  var length = Math.sqrt(dx * dx + dy * dy);
  var ratio = (length - (innerDistance + additionalDistance)) / length;
  var x = dx * ratio + source.x;
  var y = dy * ratio + source.y;
  return {
    x: x,
    y: y
  };
};
/* Calculates a point between two points for curves */


var calculateCurvePoint = function calculateCurvePoint(source, target, l) {
  var distance = calculateMultiEdgeDistance(l);
  var dx = target.x - source.x;
  var dy = target.y - source.y;
  var cx = source.x + dx / 2;
  var cy = source.y + dy / 2;
  var n = calculateNormalVector(source, target, distance);

  if (l.source.index < l.target.index) {
    n.x = -n.x;
    n.y = -n.y;
  }

  if (l.multiEdgeIndex % 2 !== 0) {
    n.x = -n.x;
    n.y = -n.y;
  }

  return {
    "x": cx + n.x,
    "y": cy + n.y
  };
};
/* Calculate the optimal Multi Edge distance */


var calculateMultiEdgeDistance = function calculateMultiEdgeDistance(l) {
  var level = Math.floor((l.multiEdgeIndex - l.multiEdgeCount % 2) / 2) + 1;
  var oddConstant = l.multiEdgeCount % 2 * 15;
  var distance = 0;

  switch (level) {
    case 1:
      distance = 20 + oddConstant;
      break;

    case 2:
      distance = 45 + oddConstant;
      break;

    default:
      break;
  }

  return distance;
};
/* Calculates the normal vector between two points */


var calculateNormalVector = function calculateNormalVector(source, target, length) {
  var dx = target.x - source.x;
  var dy = target.y - source.y;
  var nx = -dy;
  var ny = dx;
  var vlength = Math.sqrt(nx * nx + ny * ny);
  var ratio = length / vlength;
  return {
    "x": nx * ratio,
    "y": ny * ratio
  };
};
/* This function calculates edges to its input and stores the point for the labels. Only for circle nodes! */


var calculateSelfEdgePath = function calculateSelfEdgePath(l) {
  var node = l.source;
  var loopShiftAngle = 360 / l.selfEdgeCount;
  var loopAngle = Math.min(60, loopShiftAngle * 0.8);
  var arcFrom = calculateRadian(loopShiftAngle * l.selfEdgeIndex);
  var arcTo = calculateRadian(loopShiftAngle * l.selfEdgeIndex + loopAngle);
  var x1 = Math.cos(arcFrom) * node.radius;
  var y1 = Math.sin(arcFrom) * node.radius;
  var x2 = Math.cos(arcTo) * node.radius;
  var y2 = Math.sin(arcTo) * node.radius;
  var fixPoint1 = {
    "x": node.x + x1,
    "y": node.y + y1
  };
  var fixPoint2 = {
    "x": node.x + x2,
    "y": node.y + y2
  };
  var distanceMultiplier = 2.5;
  var dx = (x1 + x2) / 2 * distanceMultiplier;
  var dy = (y1 + y2) / 2 * distanceMultiplier;
  var curvePoint = {
    "x": node.x + dx,
    "y": node.y + dy
  };
  l.curvePoint = curvePoint;
  return loopFunction([fixPoint1, curvePoint, fixPoint2]);
};

var _default = {
  calculateCurvePoint: calculateCurvePoint,
  calculateIntersection: calculateIntersection,
  calculateMultiEdgeDistance: calculateMultiEdgeDistance,
  calculateNormalVector: calculateNormalVector,
  calculateRadian: calculateRadian,
  curveFunction: curveFunction,
  loopFunction: loopFunction,
  calculateSelfEdgePath: calculateSelfEdgePath
};
exports.default = _default;