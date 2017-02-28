(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SVGShapes"] = factory();
	else
		root["SVGShapes"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toPath = exports.getPoints = undefined;

	var _getPoints = __webpack_require__(1);

	var _getPoints2 = _interopRequireDefault(_getPoints);

	var _toPath = __webpack_require__(2);

	var _toPath2 = _interopRequireDefault(_toPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.getPoints = _getPoints2.default;
	exports.toPath = _toPath2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getPoints = function getPoints(type, attributes) {
	  switch (type) {
	    case 'circle':
	      return getPointsFromCircle(attributes);
	    case 'ellipse':
	      return getPointsFromEllipse(attributes);
	    case 'line':
	      return getPointsFromLine(attributes);
	    case 'path':
	      return getPointsFromPath(attributes);
	    case 'polygon':
	      return getPointsFromPolygon(attributes);
	    case 'polyline':
	      return getPointsFromPolyline(attributes);
	    case 'rect':
	      return getPointsFromRect(attributes);
	    default:
	      throw new Error('Not a valid shape type');
	  }
	};

	var getPointsFromCircle = function getPointsFromCircle(_ref) {
	  var cx = _ref.cx,
	      cy = _ref.cy,
	      r = _ref.r;

	  return [{ x: cx, y: cy - r }, { x: cx, y: cy + r, curve: { type: 'arc', rx: r, ry: r } }, { x: cx, y: cy - r, curve: { type: 'arc', rx: r, ry: r } }];
	};

	var getPointsFromEllipse = function getPointsFromEllipse(_ref2) {
	  var cx = _ref2.cx,
	      cy = _ref2.cy,
	      rx = _ref2.rx,
	      ry = _ref2.ry;

	  return [{ x: cx, y: cy - ry }, { x: cx, y: cy + ry, curve: { type: 'arc', rx: rx, ry: ry } }, { x: cx, y: cy - ry, curve: { type: 'arc', rx: rx, ry: ry } }];
	};

	var getPointsFromLine = function getPointsFromLine(_ref3) {
	  var x1 = _ref3.x1,
	      x2 = _ref3.x2,
	      y1 = _ref3.y1,
	      y2 = _ref3.y2;

	  return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
	};

	var getPointsFromPath = function getPointsFromPath(_ref4) {
	  var d = _ref4.d;

	  var points = [];

	  var instructions = d.split(/[^a-zA-Z]+/).filter(function (i) {
	    return i.length;
	  });
	  var numbers = d.split(/[^\-0-9.]+/).map(parseFloat).filter(function (n) {
	    return !isNaN(n);
	  });

	  var optionalArcKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag'];

	  for (var i = 0, l = instructions.length; i < l; i++) {
	    var isFirstPoint = i === 0;
	    var prevPoint = isFirstPoint ? null : points[i - 1];
	    var prevPoint; 
	    // if(isFirstPoint){
		    // prevPoint = {x:numbers[0],y:numbers[1]}
		    // points.push(prevPoint)
	    // } els
	    // var prevPoint = isFirstPoint ? null : points[i - 1];
	    var prevPoint = isFirstPoint ? {x:numbers[0],y:numbers[1]} : points[i - 1];


	    var relative = false;

	    switch (instructions[i]) {
	      case 'm':
	      case 'l':
	        relative = true;
	        if(isFirstPoint){
			    points.push(prevPoint)
	        }
	      case 'M':
	      case 'L':
	        points.push({
	          x: (relative ? prevPoint.x : 0) + numbers.shift(),
	          y: (relative ? prevPoint.y : 0) + numbers.shift()
	        });

	        break;

	      case 'h':
	        relative = true;

	      case 'H':
	        points.push({
	          x: (relative ? prevPoint.x : 0) + numbers.shift(),
	          y: prevPoint.y
	        });

	        break;

	      case 'v':
	        relative = true;

	      case 'V':
	        points.push({
	          x: prevPoint.x,
	          y: (relative ? prevPoint.y : 0) + numbers.shift()
	        });

	        break;

	      case 'a':
	        relative = true;

	      case 'A':
	        points.push({
	          curve: {
	            type: 'arc',
	            rx: numbers.shift(),
	            ry: numbers.shift(),
	            xAxisRotation: numbers.shift(),
	            largeArcFlag: numbers.shift(),
	            sweepFlag: numbers.shift()
	          },
	          x: (relative ? prevPoint.x : 0) + numbers.shift(),
	          y: (relative ? prevPoint.y : 0) + numbers.shift()
	        });

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = optionalArcKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var k = _step.value;

	            if (points[i]['curve'][k] === 0) {
	              delete points[i]['curve'][k];
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        break;

	      case 'c':
	        relative = true;

	      case 'C':
	        points.push({
	          curve: {
	            type: 'cubic',
	            x1: (relative ? prevPoint.x : 0) + numbers.shift(),
	            y1: (relative ? prevPoint.y : 0) + numbers.shift(),
	            x2: (relative ? prevPoint.x : 0) + numbers.shift(),
	            y2: (relative ? prevPoint.y : 0) + numbers.shift()
	          },
	          x: (relative ? prevPoint.x : 0) + numbers.shift(),
	          y: (relative ? prevPoint.y : 0) + numbers.shift()
	        });

	        break;

	      case 's':
	        relative = true;

	      case 'S':
	        var sx2 = (relative ? prevPoint.x : 0) + numbers.shift();
	        var sy2 = (relative ? prevPoint.y : 0) + numbers.shift();
	        var sx = (relative ? prevPoint.x : 0) + numbers.shift();
	        var sy = (relative ? prevPoint.y : 0) + numbers.shift();

	        var diff = {};

	        var sx1 = void 0;
	        var sy1 = void 0;

	        if (prevPoint.curve && prevPoint.curve.type === 'cubic') {
	          diff.x = Math.abs(prevPoint.x - prevPoint.curve.x2);
	          diff.y = Math.abs(prevPoint.y - prevPoint.curve.y2);
	          sx1 = prevPoint.x < prevPoint.curve.x2 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
	          sy1 = prevPoint.y < prevPoint.curve.y2 ? prevPoint.y - diff.y : prevPoint.y + diff.y;
	        } else {
	          diff.x = Math.abs(sx - sx2);
	          diff.y = Math.abs(sy - sy2);
	          sx1 = sx < sx2 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
	          sy1 = sy < sy2 ? prevPoint.y + diff.y : prevPoint.y - diff.y;
	        }

	        points.push({ curve: { type: 'cubic', x1: sx1, y1: sy1, x2: sx2, y2: sy2 }, x: sx, y: sy });

	        break;

	      case 'q':
	        relative = true;

	      case 'Q':
	        points.push({
	          curve: {
	            type: 'quadratic',
	            x1: (relative ? prevPoint.x : 0) + numbers.shift(),
	            y1: (relative ? prevPoint.y : 0) + numbers.shift()
	          },
	          x: (relative ? prevPoint.x : 0) + numbers.shift(),
	          y: (relative ? prevPoint.y : 0) + numbers.shift()
	        });

	        break;

	      case 't':
	        relative = true;

	      case 'T':
	        var tx = (relative ? prevPoint.x : 0) + numbers.shift();
	        var ty = (relative ? prevPoint.y : 0) + numbers.shift();

	        var tx1 = void 0;
	        var ty1 = void 0;

	        if (prevPoint.curve && prevPoint.curve.type === 'quadratic') {
	          var _diff = {
	            x: Math.abs(prevPoint.x - prevPoint.curve.x1),
	            y: Math.abs(prevPoint.y - prevPoint.curve.y1)
	          };

	          tx1 = prevPoint.x < prevPoint.curve.x1 ? prevPoint.x - _diff.x : prevPoint.x + _diff.x;
	          ty1 = prevPoint.y < prevPoint.curve.y1 ? prevPoint.y - _diff.y : prevPoint.y + _diff.y;
	        } else {
	          tx1 = prevPoint.x;
	          ty1 = prevPoint.y;
	        }

	        points.push({ curve: { type: 'quadratic', x1: tx1, y1: ty1 }, x: tx, y: ty });

	        break;

	      case 'z':
	      case 'Z':
	        points.push({ x: points[0].x, y: points[0].y });
	        break;
	    }
	  }

	  return points;
	};

	var getPointsFromPolygon = function getPointsFromPolygon(_ref5) {
	  var points = _ref5.points;

	  return getPointsFromPoints({ closed: true, points: points });
	};

	var getPointsFromPolyline = function getPointsFromPolyline(_ref6) {
	  var points = _ref6.points;

	  return getPointsFromPoints({ closed: false, points: points });
	};

	var getPointsFromPoints = function getPointsFromPoints(_ref7) {
	  var closed = _ref7.closed,
	      points = _ref7.points;

	  var numbers = points.split(/[\s,]+/).map(function (n) {
	    return parseFloat(n);
	  });

	  var p = numbers.reduce(function (arr, point, i) {
	    if (i % 2 === 0) {
	      arr.push({ x: point });
	    } else {
	      arr[(i - 1) / 2].y = point;
	    }

	    return arr;
	  }, []);

	  if (closed) {
	    p.push(p[0]);
	  }

	  return p;
	};

	var getPointsFromRect = function getPointsFromRect(_ref8) {
	  var height = _ref8.height,
	      rx = _ref8.rx,
	      ry = _ref8.ry,
	      width = _ref8.width,
	      x = _ref8.x,
	      y = _ref8.y;

	  if (rx || ry) {
	    return getPointsFromRectWithCornerRadius({
	      height: height,
	      rx: rx ? rx : ry,
	      ry: ry ? ry : rx,
	      width: width,
	      x: x,
	      y: y
	    });
	  }

	  return getPointsFromBasicRect({ height: height, width: width, x: x, y: y });
	};

	var getPointsFromBasicRect = function getPointsFromBasicRect(_ref9) {
	  var height = _ref9.height,
	      width = _ref9.width,
	      x = _ref9.x,
	      y = _ref9.y;

	  return [{ x: x, y: y }, { x: x + width, y: y }, { x: x + width, y: y + height }, { x: x, y: y + height }, { x: x, y: y }];
	};

	var getPointsFromRectWithCornerRadius = function getPointsFromRectWithCornerRadius(_ref10) {
	  var height = _ref10.height,
	      rx = _ref10.rx,
	      ry = _ref10.ry,
	      width = _ref10.width,
	      x = _ref10.x,
	      y = _ref10.y;

	  var curve = { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 };

	  return [{ x: x + rx, y: y }, { x: x + width - rx, y: y }, { x: x + width, y: y + ry, curve: curve }, { x: x + width, y: y + height - ry }, { x: x + width - rx, y: y + height, curve: curve }, { x: x + rx, y: y + height }, { x: x, y: y + height - ry, curve: curve }, { x: x, y: y + ry }, { x: x + rx, y: y, curve: curve }];
	};

	exports.default = getPoints;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var toPath = function toPath(points) {
	  var d = '';
	  var i = 0;

	  var firstPoint = points[i];

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var point = _step.value;

	      var isFirstPoint = i === 0;
	      var isLastPoint = i === points.length - 1;
	      var prevPoint = isFirstPoint ? null : points[i - 1];
	      var _point$curve = point.curve,
	          curve = _point$curve === undefined ? false : _point$curve,
	          x = point.x,
	          y = point.y;


	      if (isFirstPoint) {
	        d += 'M' + x + ',' + y;
	      } else if (curve) {
	        switch (curve.type) {
	          case 'arc':
	            var _point$curve2 = point.curve,
	                _point$curve2$largeAr = _point$curve2.largeArcFlag,
	                largeArcFlag = _point$curve2$largeAr === undefined ? 0 : _point$curve2$largeAr,
	                rx = _point$curve2.rx,
	                ry = _point$curve2.ry,
	                _point$curve2$sweepFl = _point$curve2.sweepFlag,
	                sweepFlag = _point$curve2$sweepFl === undefined ? 0 : _point$curve2$sweepFl,
	                _point$curve2$xAxisRo = _point$curve2.xAxisRotation,
	                xAxisRotation = _point$curve2$xAxisRo === undefined ? 0 : _point$curve2$xAxisRo;

	            d += 'A' + rx + ',' + ry + ',' + xAxisRotation + ',' + largeArcFlag + ',' + sweepFlag + ',' + x + ',' + y;
	            break;
	          case 'cubic':
	            var _point$curve3 = point.curve,
	                cx1 = _point$curve3.x1,
	                cy1 = _point$curve3.y1,
	                cx2 = _point$curve3.x2,
	                cy2 = _point$curve3.y2;

	            d += 'C' + cx1 + ',' + cy1 + ',' + cx2 + ',' + cy2 + ',' + x + ',' + y;
	            break;
	          case 'quadratic':
	            var _point$curve4 = point.curve,
	                qx1 = _point$curve4.x1,
	                qy1 = _point$curve4.y1;

	            d += 'Q' + qx1 + ',' + qy1 + ',' + x + ',' + y;
	            break;
	        }

	        if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
	          d += 'Z';
	        }
	      } else if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
	        d += 'Z';
	      } else if (x !== prevPoint.x && y !== prevPoint.y) {
	        d += 'L' + x + ',' + y;
	      } else if (x !== prevPoint.x) {
	        d += 'H' + x;
	      } else if (y !== prevPoint.y) {
	        d += 'V' + y;
	      }

	      i++;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return d;
	};

	exports.default = toPath;

/***/ }
/******/ ])
});
;