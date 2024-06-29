(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2kZfx":[function(require,module,exports) {
// \u89e3\u9664\u7f51\u9875\u590d\u5236\u9650\u5236\u811a\u672c
document.addEventListener("copy", (event)=>{
    event.stopImmediatePropagation();
}, true);
document.addEventListener("paste", (event)=>{
    event.stopImmediatePropagation();
}, true);
document.addEventListener("cut", (event)=>{
    event.stopImmediatePropagation();
}, true);
document.body.style.userSelect = "auto";
document.querySelectorAll("*").forEach((el)=>{
    if (el instanceof HTMLElement) el.style.userSelect = "auto";
});

},{}]},["2kZfx"], "2kZfx", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWE7QUFDYixTQUFTLGlCQUNQLFFBQ0EsQ0FBQztJQUNDLE1BQU07QUFDUixHQUNBO0FBR0YsU0FBUyxpQkFDUCxTQUNBLENBQUM7SUFDQyxNQUFNO0FBQ1IsR0FDQTtBQUdGLFNBQVMsaUJBQ1AsT0FDQSxDQUFDO0lBQ0MsTUFBTTtBQUNSLEdBQ0E7QUFHRixTQUFTLEtBQUssTUFBTSxhQUFhO0FBQ2pDLFNBQVMsaUJBQWlCLEtBQUssUUFBUSxDQUFDO0lBQ3RDLElBQUksY0FBYyxhQUNoQixHQUFHLE1BQU0sYUFBYTtBQUUxQiIsInNvdXJjZXMiOlsiY2hyb21lLWV4dC10b29scy9zcmMvc2NyaXB0cy9jb3B5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIOino+mZpOe9kemhteWkjeWItumZkOWItuiEmuacrFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgJ2NvcHknLFxuICAoZXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICB9LFxuICB0cnVlXG4pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICdwYXN0ZScsXG4gIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gIH0sXG4gIHRydWVcbilcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgJ2N1dCcsXG4gIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gIH0sXG4gIHRydWVcbilcblxuZG9jdW1lbnQuYm9keS5zdHlsZS51c2VyU2VsZWN0ID0gJ2F1dG8nXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykuZm9yRWFjaCgoZWwpID0+IHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICBlbC5zdHlsZS51c2VyU2VsZWN0ID0gJ2F1dG8nXG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5jYjNmMmM1ZS5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);