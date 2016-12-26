module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(exports, "apply", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(exports, "isApplicationOf", function() { return isApplicationOf; });
/* harmony export (binding) */ __webpack_require__.d(exports, "hasMixin", function() { return hasMixin; });
/* harmony export (binding) */ __webpack_require__.d(exports, "wrap", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(exports, "unwrap", function() { return unwrap; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Cached", function() { return Cached; });
/* harmony export (binding) */ __webpack_require__.d(exports, "DeDupe", function() { return DeDupe; });
/* harmony export (binding) */ __webpack_require__.d(exports, "HasInstance", function() { return HasInstance; });
/* harmony export (binding) */ __webpack_require__.d(exports, "BareMixin", function() { return BareMixin; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Mixin", function() { return Mixin; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Interface", function() { return Interface; });
/* harmony export (binding) */ __webpack_require__.d(exports, "mix", function() { return mix; });


// used by apply() and isApplicationOf()

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _appliedMixin = '__mixwith_appliedMixin';

/**
 * A function that returns a subclass of its argument.
 *
 * @example
 * const M = (superclass) => class extends superclass {
 *   getMessage() {
 *     return "Hello";
 *   }
 * }
 *
 * @typedef {Function} MixinFunction
 * @param {Function} superclass
 * @return {Function} A subclass of `superclass`
 */

/**
 * Applies `mixin` to `superclass`.
 *
 * `apply` stores a reference from the mixin application to the unwrapped mixin
 * to make `isApplicationOf` and `hasMixin` work.
 *
 * This function is usefull for mixin wrappers that want to automatically enable
 * {@link hasMixin} support.
 *
 * @example
 * const Applier = (mixin) => wrap(mixin, (superclass) => apply(superclass, mixin));
 *
 * // M now works with `hasMixin` and `isApplicationOf`
 * const M = Applier((superclass) => class extends superclass {});
 *
 * class C extends M(Object) {}
 * let i = new C();
 * hasMixin(i, M); // true
 *
 * @function
 * @param {Function} superclass A class or constructor function
 * @param {MixinFunction} mixin The mixin to apply
 * @return {Function} A subclass of `superclass` produced by `mixin`
 */
var apply = function apply(superclass, mixin) {
  var application = mixin(superclass);
  application.prototype[_appliedMixin] = unwrap(mixin);
  return application;
};

/**
 * Returns `true` iff `proto` is a prototype created by the application of
 * `mixin` to a superclass.
 *
 * `isApplicationOf` works by checking that `proto` has a reference to `mixin`
 * as created by `apply`.
 *
 * @function
 * @param {Object} proto A prototype object created by {@link apply}.
 * @param {MixinFunction} mixin A mixin function used with {@link apply}.
 * @return {boolean} whether `proto` is a prototype created by the application of
 * `mixin` to a superclass
 */
var isApplicationOf = function isApplicationOf(proto, mixin) {
  return proto.hasOwnProperty(_appliedMixin) && proto[_appliedMixin] === unwrap(mixin);
};

/**
 * Returns `true` iff `o` has an application of `mixin` on its prototype
 * chain.
 *
 * @function
 * @param {Object} o An object
 * @param {MixinFunction} mixin A mixin applied with {@link apply}
 * @return {boolean} whether `o` has an application of `mixin` on its prototype
 * chain
 */
var hasMixin = function hasMixin(o, mixin) {
  while (o != null) {
    if (isApplicationOf(o, mixin)) return true;
    o = Object.getPrototypeOf(o);
  }
  return false;
};

// used by wrap() and unwrap()
var _wrappedMixin = '__mixwith_wrappedMixin';

/**
 * Sets up the function `mixin` to be wrapped by the function `wrapper`, while
 * allowing properties on `mixin` to be available via `wrapper`, and allowing
 * `wrapper` to be unwrapped to get to the original function.
 *
 * `wrap` does two things:
 *   1. Sets the prototype of `mixin` to `wrapper` so that properties set on
 *      `mixin` inherited by `wrapper`.
 *   2. Sets a special property on `mixin` that points back to `mixin` so that
 *      it can be retreived from `wrapper`
 *
 * @function
 * @param {MixinFunction} mixin A mixin function
 * @param {MixinFunction} wrapper A function that wraps {@link mixin}
 * @return {MixinFunction} `wrapper`
 */
var wrap = function wrap(mixin, wrapper) {
  Object.setPrototypeOf(wrapper, mixin);
  if (!mixin[_wrappedMixin]) {
    mixin[_wrappedMixin] = mixin;
  }
  return wrapper;
};

/**
 * Unwraps the function `wrapper` to return the original function wrapped by
 * one or more calls to `wrap`. Returns `wrapper` if it's not a wrapped
 * function.
 *
 * @function
 * @param {MixinFunction} wrapper A wrapped mixin produced by {@link wrap}
 * @return {MixinFunction} The originally wrapped mixin
 */
var unwrap = function unwrap(wrapper) {
  return wrapper[_wrappedMixin] || wrapper;
};

var _cachedApplications = '__mixwith_cachedApplications';

/**
 * Decorates `mixin` so that it caches its applications. When applied multiple
 * times to the same superclass, `mixin` will only create one subclass, memoize
 * it and return it for each application.
 *
 * Note: If `mixin` somehow stores properties its classes constructor (static
 * properties), or on its classes prototype, it will be shared across all
 * applications of `mixin` to a super class. It's reccomended that `mixin` only
 * access instance state.
 *
 * @function
 * @param {MixinFunction} mixin The mixin to wrap with caching behavior
 * @return {MixinFunction} a new mixin function
 */
var Cached = function Cached(mixin) {
  return wrap(mixin, function (superclass) {
    // Get or create a symbol used to look up a previous application of mixin
    // to the class. This symbol is unique per mixin definition, so a class will have N
    // applicationRefs if it has had N mixins applied to it. A mixin will have
    // exactly one _cachedApplicationRef used to store its applications.

    var cachedApplications = superclass[_cachedApplications];
    if (!cachedApplications) {
      cachedApplications = superclass[_cachedApplications] = new Map();
    }

    var application = cachedApplications.get(mixin);
    if (!application) {
      application = mixin(superclass);
      cachedApplications.set(mixin, application);
    }

    return application;
  });
};

/**
 * Decorates `mixin` so that it only applies if it's not already on the
 * prototype chain.
 *
 * @function
 * @param {MixinFunction} mixin The mixin to wrap with deduplication behavior
 * @return {MixinFunction} a new mixin function
 */
var DeDupe = function DeDupe(mixin) {
  return wrap(mixin, function (superclass) {
    return hasMixin(superclass.prototype, mixin) ? superclass : mixin(superclass);
  });
};

/**
 * Adds [Symbol.hasInstance] (ES2015 custom instanceof support) to `mixin`.
 *
 * @function
 * @param {MixinFunction} mixin The mixin to add [Symbol.hasInstance] to
 * @return {MixinFunction} the given mixin function
 */
var HasInstance = function HasInstance(mixin) {
  if (Symbol && Symbol.hasInstance && !mixin[Symbol.hasInstance]) {
    Object.defineProperty(mixin, Symbol.hasInstance, {
      value: function value(o) {
        return hasMixin(o, mixin);
      }
    });
  }
  return mixin;
};

/**
 * A basic mixin decorator that applies the mixin with {@link apply} so that it
 * can be used with {@link isApplicationOf}, {@link hasMixin} and the other
 * mixin decorator functions.
 *
 * @function
 * @param {MixinFunction} mixin The mixin to wrap
 * @return {MixinFunction} a new mixin function
 */
var BareMixin = function BareMixin(mixin) {
  return wrap(mixin, function (s) {
    return apply(s, mixin);
  });
};

/**
 * Decorates a mixin function to add deduplication, application caching and
 * instanceof support.
 *
 * @function
 * @param {MixinFunction} mixin The mixin to wrap
 * @return {MixinFunction} a new mixin function
 */
var Mixin = function Mixin(mixin) {
  return DeDupe(Cached(BareMixin(mixin)));
};

var SymbolName = Symbol.for('_Symbol_name_');
var SymbolValue = Symbol.for('_Symbol_value_');
/**
 * Decorates a mixin function to add deduplication, application caching and
 * instanceof support.
 *
 * @function
 * @param {MixinFunction} mixin The mixin to wrap
 * @return {MixinFunction} a new mixin function
 */
var Interface = function Interface(name, mixin) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (Symbol && Symbol.for) {
    mixin[SymbolName] = name;
    mixin[SymbolValue] = value;
    // mixin.prototype.is = value
  }
  return Mixin(mixin);
};

// helper method for checking Interface implementation

Object.defineProperty(Object.prototype, 'implements', {
  enumerable: false,
  value: function value(check) {
    var symbol = false;

    switch (typeof check === 'undefined' ? 'undefined' : _typeof(check)) {
      case 'string':
        symbol = Symbol.for(check);
        break;
      case 'symbol':
        symbol = check;
        break;
      default:
        if (check[SymbolName] != null) {
          symbol = Symbol.for(check[SymbolName]);
        }
    }

    return symbol ? this[symbol] != undefined : false;
  }
});

/**
 * A fluent interface to apply a list of mixins to a superclass.
 *
 * ```javascript
 * class X extends mix(Object).with(A, B, C) {}
 * ```
 *
 * The mixins are applied in order to the superclass, so the prototype chain
 * will be: X->C'->B'->A'->Object.
 *
 * This is purely a convenience function. The above example is equivalent to:
 *
 * ```javascript
 * class X extends C(B(A(Object))) {}
 * ```
 *
 * @function
 * @param {Function} [superclass=Object]
 * @return {MixinBuilder}
 */
var mix = function mix(superclass) {
  return new MixinBuilder(superclass);
};

var MixinBuilder = function () {
  function MixinBuilder() {
    var superclass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      return _class;
    }();

    _classCallCheck(this, MixinBuilder);

    this.superclass = superclass;
  }

  /**
   * Applies `mixins` in order to the superclass given to `mix()`.
   *
   * @param {Array.<Mixin>} mixins
   * @return {Function} a subclass of `superclass` with `mixins` applied
   */


  _createClass(MixinBuilder, [{
    key: 'with',
    value: function _with() {
      for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      return mixins.reduce(this._reduce, this.superclass);
    }
  }, {
    key: '_reduce',
    value: function _reduce(c, m) {
      var ret = m(c);
      ret.prototype[Symbol.for(m[SymbolName])] = m[SymbolValue];
      return ret;
    }
  }]);

  return MixinBuilder;
}();

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map