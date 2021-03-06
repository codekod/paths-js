// Generated by uRequire v{NO_VERSION} - template: 'nodejs' 
(function (window, global) {
  
var __isAMD = !!(typeof define === 'function' && define.amd),
    __isNode = (typeof exports === 'object'),
    __isWeb = !__isNode;
Polygon = require('./polygon'),
    O = require('./ops');

module.exports = (function () {
  return function (_arg) {
    var angle, center, points, radii;
    center = _arg.center, radii = _arg.radii;
    angle = 2 * Math.PI / radii.length;
    points = radii.map(function (r, i) {
      return O.plus(center, O.on_circle(r, i * angle));
    });
    return Polygon({
      points: points,
      closed: true
    });
  };
}).call(this);


}).call(this, (typeof exports === 'object' ? global : window), (typeof exports === 'object' ? global : window))