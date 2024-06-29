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
})({"3d80N":[function(require,module,exports) {
var d = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var y = ()=>typeof globalThis.process < "u" ? globalThis.process.env : {};
var H = new Set(d), _ = (e)=>H.has(e), G = d.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var Z = _("--dry-run"), p = ()=>_("--verbose") || y().VERBOSE === "true", q = p();
var u = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var x = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), b = (...e)=>u("\uD83D\uDD35 INFO", ...e), m = (...e)=>u("\uD83D\uDFE0 WARN", ...e), S = 0, c = (...e)=>p() && u(`\u{1F7E1} ${S++}`, ...e);
var s = {
    "isContentScript": true,
    "isBackground": false,
    "isReact": false,
    "runtimes": [
        "script-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/Users/fredhu/Desktop/Items/fred-items/chrome-ext-tools/src/contents/mock.ts",
    "bundleId": "724ca3337c896fdf",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 53822
};
module.bundle.HMR_BUNDLE_ID = s.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: s.verbose
    }
};
var D = module.bundle.Module;
function I(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = I;
module.bundle.hotData = {};
var l = globalThis.browser || globalThis.chrome || null;
function v() {
    return !s.host || s.host === "0.0.0.0" ? "localhost" : s.host;
}
function C() {
    return s.port || location.port;
}
var E = "__plasmo_runtime_script_";
function L(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function O(e = C()) {
    let t = v();
    return `${s.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function B(e) {
    typeof e.message == "string" && x("[plasmo/parcel-runtime]: " + e.message);
}
function T(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(O());
    return t.addEventListener("message", async function(o) {
        let r = JSON.parse(o.data);
        if (r.type === "update" && await e(r.assets), r.type === "error") for (let a of r.diagnostics.ansi){
            let w = a.codeframe || a.stack;
            m("[plasmo/parcel-runtime]: " + a.message + `
` + w + `

` + a.hints.join(`
`));
        }
    }), t.addEventListener("error", B), t.addEventListener("open", ()=>{
        b(`[plasmo/parcel-runtime]: Connected to HMR server for ${s.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        m(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${s.entryFilePath}`);
    }), t;
}
var n = "__plasmo-loading__";
function $() {
    let e = globalThis.window?.trustedTypes;
    if (typeof e > "u") return;
    let t = document.querySelector('meta[name="trusted-types"]')?.content?.split(" "), o = t ? t[t?.length - 1] : void 0;
    return typeof e < "u" ? e.createPolicy(o || `trusted-html-${n}`, {
        createHTML: (a)=>a
    }) : void 0;
}
var P = $();
function g() {
    return document.getElementById(n);
}
function f() {
    return !g();
}
function F() {
    let e = document.createElement("div");
    e.id = n;
    let t = `
  <style>
    #${n} {
      background: #f3f3f3;
      color: #333;
      border: 1px solid #333;
      box-shadow: #333 4.7px 4.7px;
    }

    #${n}:hover {
      background: #e3e3e3;
      color: #444;
    }

    @keyframes plasmo-loading-animate-svg-fill {
      0% {
        fill: transparent;
      }
    
      100% {
        fill: #333;
      }
    }

    #${n} .svg-elem-1 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s both infinite;
    }

    #${n} .svg-elem-2 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s both infinite;
    }
    
    #${n} .svg-elem-3 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both infinite;
    }

    #${n} .hidden {
      display: none;
    }

  </style>
  
  <svg height="32" width="32" viewBox="0 0 264 354" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M139.221 282.243C154.252 282.243 166.903 294.849 161.338 308.812C159.489 313.454 157.15 317.913 154.347 322.109C146.464 333.909 135.26 343.107 122.151 348.538C109.043 353.969 94.6182 355.39 80.7022 352.621C66.7861 349.852 54.0034 343.018 43.9705 332.983C33.9375 322.947 27.105 310.162 24.3369 296.242C21.5689 282.323 22.9895 267.895 28.4193 254.783C33.8491 241.671 43.0441 230.464 54.8416 222.579C59.0353 219.777 63.4908 217.438 68.1295 215.588C82.0915 210.021 94.6978 222.671 94.6978 237.703L94.6978 255.027C94.6978 270.058 106.883 282.243 121.914 282.243H139.221Z" fill="#333" class="svg-elem-1" ></path>
    <path d="M192.261 142.028C192.261 126.996 204.867 114.346 218.829 119.913C223.468 121.763 227.923 124.102 232.117 126.904C243.915 134.789 253.11 145.996 258.539 159.108C263.969 172.22 265.39 186.648 262.622 200.567C259.854 214.487 253.021 227.272 242.988 237.308C232.955 247.343 220.173 254.177 206.256 256.946C192.34 259.715 177.916 258.294 164.807 252.863C151.699 247.432 140.495 238.234 132.612 226.434C129.808 222.238 127.47 217.779 125.62 213.137C120.056 199.174 132.707 186.568 147.738 186.568L165.044 186.568C180.076 186.568 192.261 174.383 192.261 159.352L192.261 142.028Z" fill="#333" class="svg-elem-2" ></path>
    <path d="M95.6522 164.135C95.6522 179.167 83.2279 191.725 68.8013 187.505C59.5145 184.788 50.6432 180.663 42.5106 175.227C26.7806 164.714 14.5206 149.772 7.28089 132.289C0.041183 114.807 -1.85305 95.5697 1.83772 77.0104C5.52849 58.4511 14.6385 41.4033 28.0157 28.0228C41.393 14.6423 58.4366 5.53006 76.9914 1.83839C95.5461 -1.85329 114.779 0.0414162 132.257 7.2829C149.735 14.5244 164.674 26.7874 175.184 42.5212C180.62 50.6576 184.744 59.5332 187.46 68.8245C191.678 83.2519 179.119 95.6759 164.088 95.6759L122.869 95.6759C107.837 95.6759 95.6522 107.861 95.6522 122.892L95.6522 164.135Z" fill="#333" class="svg-elem-3"></path>
  </svg>
  <span class="hidden">Context Invalidated, Press to Reload</span>
  `;
    return e.innerHTML = P ? P.createHTML(t) : t, e.style.pointerEvents = "none", e.style.position = "fixed", e.style.bottom = "14.7px", e.style.right = "14.7px", e.style.fontFamily = "sans-serif", e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center", e.style.padding = "14.7px", e.style.gap = "14.7px", e.style.borderRadius = "4.7px", e.style.zIndex = "2147483647", e.style.opacity = "0", e.style.transition = "all 0.47s ease-in-out", e;
}
function N(e) {
    return new Promise((t)=>{
        document.documentElement ? (f() && (document.documentElement.appendChild(e), t()), t()) : globalThis.addEventListener("DOMContentLoaded", ()=>{
            f() && document.documentElement.appendChild(e), t();
        });
    });
}
var k = ()=>{
    let e;
    if (f()) {
        let t = F();
        e = N(t);
    }
    return {
        show: async ({ reloadButton: t = !1 } = {})=>{
            await e;
            let o = g();
            o.style.opacity = "1", t && (o.onclick = (r)=>{
                r.stopPropagation(), globalThis.location.reload();
            }, o.querySelector("span").classList.remove("hidden"), o.style.cursor = "pointer", o.style.pointerEvents = "all");
        },
        hide: async ()=>{
            await e;
            let t = g();
            t.style.opacity = "0";
        }
    };
};
var W = `${E}${module.id}__`, i, A = !1, M = k();
async function h() {
    c("Script Runtime - reloading"), A ? globalThis.location?.reload?.() : M.show({
        reloadButton: !0
    });
}
function R() {
    i?.disconnect(), i = l?.runtime.connect({
        name: W
    }), i.onDisconnect.addListener(()=>{
        h();
    }), i.onMessage.addListener((e)=>{
        e.__plasmo_cs_reload__ && h(), e.__plasmo_cs_active_tab__ && (A = !0);
    });
}
function j() {
    if (l?.runtime) try {
        R(), setInterval(R, 24e3);
    } catch  {
        return;
    }
}
j();
T(async (e)=>{
    c("Script runtime - on updated assets"), e.filter((o)=>o.envHash === s.envHash).some((o)=>L(module.bundle, o.id)) && (M.show(), l?.runtime ? i.postMessage({
        __plasmo_cs_changed__: !0
    }) : setTimeout(()=>{
        h();
    }, 4700));
});

},{}],"hUuKi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "config", ()=>config);
var _xhrTs = require("url:~app/scripts/xhr.ts");
var _xhrTsDefault = parcelHelpers.interopDefault(_xhrTs);
var _constants = require("~app/constants");
var _store = require("~app/utils/store");
var _storeDefault = parcelHelpers.interopDefault(_store);
const temp = document.createElement("script");
temp.setAttribute("type", "text/javascript");
temp.src = (0, _xhrTsDefault.default);
temp.onload = async function() {
    // \u5411content xhr.ts \u53d1\u6d88\u606f\u66f4\u65b0PROXY_ROUTES \u3010\u52a0\u8f7d\u5b8c\u5c31\u540c\u6b65-\u4e3b\u52a8\u884c\u4e3a\u3011
    const data = await (0, _storeDefault.default).getItem((0, _store.STORE_KEY).ROUTES);
    const config = await (0, _storeDefault.default).get((0, _store.STORE_KEY).GLOBAL_SWITCH_CONFIG);
    const mockEnabled = config?.mock ?? false;
    window.postMessage({
        action: (0, _constants.MESSAGE_TYPES).MATCHING_UPDATE,
        payload: {
            secret: "content-to-xhr",
            data: mockEnabled ? data || [] : []
        }
    });
    temp.parentNode.removeChild(temp);
};
document.documentElement.appendChild(temp);
// \u76d1\u542c\u6765\u81ea background script \u7684\u6d88\u606f
// chrome.runtime.onMessage.addListener(
//   async function(request, sender, sendResponse) {
//     if (request.action === MESSAGE_TYPES.MATCHING_UPDATE) {
//       console.log("Received hello from background");
//       sendResponse({farewell: "goodbye"});
//     }
//     return true;  // Will respond asynchronously.
//   }
// );
(0, _storeDefault.default).watch({
    [(0, _store.STORE_KEY).ROUTES]: (c)=>{
        // \u5411content xhr.ts \u53d1\u6d88\u606f\u66f4\u65b0PROXY_ROUTES \u3010\u76d1\u542c\u5230\u6570\u636e\u53d8\u5316\u5c31\u540c\u6b65-\u4e3b\u52a8\u884c\u4e3a\u3011
        window.postMessage({
            action: (0, _constants.MESSAGE_TYPES).MATCHING_UPDATE,
            payload: {
                data: c?.newValue || [],
                secret: "content-to-xhr"
            }
        });
    },
    [(0, _store.STORE_KEY).LOADING]: (c)=>{
        window.postMessage({
            action: (0, _constants.MESSAGE_TYPES).SET_LOADING,
            payload: {
                secret: "content-to-content",
                data: c?.newValue
            }
        });
    }
});
// \u957f\u8fde\u63a5\u548cbg\u901a\u4fe1
const port = chrome.runtime.connect({
    name: "knockknock"
});
port.onMessage.addListener(function(msg) {
    const { data, event, id, headers } = msg;
    if (event in (0, _constants.MESSAGE_TYPES)) event;
});
const config = {
    matches: [
        "<all_urls>"
    ],
    all_frames: true,
    run_at: "document_start"
};

},{"url:~app/scripts/xhr.ts":"8ojY4","~app/constants":"eTO6I","~app/utils/store":"6hhi1","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"8ojY4":[function(require,module,exports) {
module.exports = require("5be2d93a1dd888c9").getBundleURL("9OpAX") + "xhr.fca9bbb0.js" + "?" + Date.now();

},{"5be2d93a1dd888c9":"lSi2Y"}],"lSi2Y":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"eTO6I":[function(require,module,exports) {
/* eslint-disable no-unused-vars */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MESSAGE_TYPES", ()=>MESSAGE_TYPES);
parcelHelpers.export(exports, "OPERATE_TYPE", ()=>OPERATE_TYPE);
parcelHelpers.export(exports, "REQUEST_TYPE", ()=>REQUEST_TYPE);
parcelHelpers.export(exports, "REQUEST_TYPE_DICT", ()=>REQUEST_TYPE_DICT);
parcelHelpers.export(exports, "REQUEST_TYPE_OPTIONS", ()=>REQUEST_TYPE_OPTIONS);
parcelHelpers.export(exports, "PROXY_ROUTE_KEY", ()=>PROXY_ROUTE_KEY);
parcelHelpers.export(exports, "MOCK_TYPE", ()=>MOCK_TYPE);
parcelHelpers.export(exports, "MOCK_TYPE_DICT", ()=>MOCK_TYPE_DICT);
parcelHelpers.export(exports, "MOCK_TYPE_DICT_SHADOW", ()=>MOCK_TYPE_DICT_SHADOW);
parcelHelpers.export(exports, "MOCK_TYPE_OPTIONS", ()=>MOCK_TYPE_OPTIONS);
parcelHelpers.export(exports, "MATCH_TYPE", ()=>MATCH_TYPE);
parcelHelpers.export(exports, "MATCH_TYPE_DICT", ()=>MATCH_TYPE_DICT);
parcelHelpers.export(exports, "ResourceType", ()=>ResourceType);
parcelHelpers.export(exports, "RuleActionType", ()=>RuleActionType);
parcelHelpers.export(exports, "MATCH_TYPE_OPTIONS", ()=>MATCH_TYPE_OPTIONS);
parcelHelpers.export(exports, "HTTP_STATUS_CODE_OPTIONS", ()=>HTTP_STATUS_CODE_OPTIONS);
parcelHelpers.export(exports, "GLOBAL_VARIABLE", ()=>GLOBAL_VARIABLE);
parcelHelpers.export(exports, "GLOBAL_VARIABLE_MAP", ()=>GLOBAL_VARIABLE_MAP);
parcelHelpers.export(exports, "DEFAULT_REQUEST_HEADERS_KEYS", ()=>DEFAULT_REQUEST_HEADERS_KEYS);
parcelHelpers.export(exports, "DEFAULT_RESPONSE_HEADERS_KEYS", ()=>DEFAULT_RESPONSE_HEADERS_KEYS);
var _utils = require("~app/utils");
var _httpStatus = require("./httpStatus");
const MESSAGE_TYPES = {
    MATCHING_UPDATE: "matchingUpdate",
    SET_LOADING: "setLoading",
    SET_RECORD: "setRecord"
};
var OPERATE_TYPE;
(function(OPERATE_TYPE) {
    OPERATE_TYPE["EDIT"] = "edit";
    OPERATE_TYPE["DELETE"] = "delete";
    OPERATE_TYPE["UPDATE_RECORD"] = "updateRecord";
    OPERATE_TYPE["TOP"] = "top";
    OPERATE_TYPE["CLONE"] = "clone";
})(OPERATE_TYPE || (OPERATE_TYPE = {}));
var REQUEST_TYPE;
(function(REQUEST_TYPE) {
    REQUEST_TYPE["ALL"] = "*";
    REQUEST_TYPE["GET"] = "get";
    REQUEST_TYPE["POST"] = "post";
    REQUEST_TYPE["PUT"] = "put";
    REQUEST_TYPE["DELETE"] = "delete";
    REQUEST_TYPE["HEAD"] = "head";
    REQUEST_TYPE["OPTIONS"] = "options";
    REQUEST_TYPE["PATCH"] = "patch";
    REQUEST_TYPE["TRACE"] = "trace" // \u56de\u663e\u670d\u52a1\u5668\u6536\u5230\u7684\u8bf7\u6c42\uff0c\u4e3b\u8981\u7528\u4e8e\u6d4b\u8bd5\u6216\u8bca\u65ad\u3002
    ;
})(REQUEST_TYPE || (REQUEST_TYPE = {}));
const REQUEST_TYPE_DICT = {
    [REQUEST_TYPE.ALL]: "\u4e0d\u9650",
    [REQUEST_TYPE.GET]: "GET",
    [REQUEST_TYPE.POST]: "POST",
    [REQUEST_TYPE.PUT]: "PUT",
    [REQUEST_TYPE.DELETE]: "DELETE",
    [REQUEST_TYPE.HEAD]: "HEAD",
    [REQUEST_TYPE.OPTIONS]: "OPTIONS",
    [REQUEST_TYPE.PATCH]: "PATCH",
    [REQUEST_TYPE.TRACE]: "TRACE"
};
const REQUEST_TYPE_OPTIONS = (0, _utils.convertDictToArray)(REQUEST_TYPE_DICT);
var PROXY_ROUTE_KEY;
(function(PROXY_ROUTE_KEY) {
    PROXY_ROUTE_KEY["ID"] = "id";
    PROXY_ROUTE_KEY["MOCK_TYPE"] = "mockType";
    PROXY_ROUTE_KEY["ENABLE"] = "enable";
    PROXY_ROUTE_KEY["MATCH_TYPE"] = "matchType";
    PROXY_ROUTE_KEY["REQUEST_TYPE"] = "requestType";
    PROXY_ROUTE_KEY["RESPONSE_STATUS"] = "responseStatus";
    PROXY_ROUTE_KEY["REDIRECT_URL"] = "redirectUrl";
    PROXY_ROUTE_KEY["DELAY"] = "delay";
    PROXY_ROUTE_KEY["URL"] = "url";
    PROXY_ROUTE_KEY["GROUP"] = "group";
    PROXY_ROUTE_KEY["NAME"] = "name";
    PROXY_ROUTE_KEY["RESPONSE"] = "response";
    PROXY_ROUTE_KEY["MOCK_REQUEST_HEADERS"] = "mockRequestHeaders";
    PROXY_ROUTE_KEY["ENABLE_MOCK_REQUEST_HEADERS"] = "enableMockRequestHeaders";
    PROXY_ROUTE_KEY["REQUEST_HEADERS"] = "requestHeaders";
    PROXY_ROUTE_KEY["MOCK_RESPONSE_HEADERS"] = "mockResponseHeaders";
    PROXY_ROUTE_KEY["ENABLE_MOCK_RESPONSE_HEADERS"] = "enableMockResponseHeaders";
    PROXY_ROUTE_KEY["RESPONSE_HEADERS"] = "responseHeaders";
})(PROXY_ROUTE_KEY || (PROXY_ROUTE_KEY = {}));
var MOCK_TYPE;
(function(MOCK_TYPE) {
    MOCK_TYPE["NORMAL"] = "normal";
    MOCK_TYPE["REDIRECT"] = "redirect";
    MOCK_TYPE["MODIFY_HEADERS"] = "modifyHeaders";
})(MOCK_TYPE || (MOCK_TYPE = {}));
const MOCK_TYPE_DICT = {
    [MOCK_TYPE.NORMAL]: "Mock",
    [MOCK_TYPE.REDIRECT]: "Redirect",
    [MOCK_TYPE.MODIFY_HEADERS]: "ModifyHeaders"
};
const MOCK_TYPE_DICT_SHADOW = {
    [MOCK_TYPE.NORMAL]: // eslint-disable-next-line max-len
    "2px 2px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)",
    [MOCK_TYPE.REDIRECT]: // eslint-disable-next-line max-len
    "2px 2px 68px 0px rgba(189, 16, 224, 0.5), inset -9px -9px 16px 0px rgba(189, 16, 224, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)",
    [MOCK_TYPE.MODIFY_HEADERS]: // eslint-disable-next-line max-len
    "2px 2px 68px 0px rgba(184, 233, 134, 0.5), inset -8px -8px 16px 0px rgba(184, 233, 134, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)"
};
const MOCK_TYPE_OPTIONS = (0, _utils.convertDictToArray)(MOCK_TYPE_DICT);
var MATCH_TYPE;
(function(MATCH_TYPE) {
    MATCH_TYPE["CONTAINS"] = "contains";
    MATCH_TYPE["EQUALS"] = "equals";
    MATCH_TYPE["REGEXP"] = "regexp";
})(MATCH_TYPE || (MATCH_TYPE = {}));
const MATCH_TYPE_DICT = {
    [MATCH_TYPE.CONTAINS]: "contains",
    [MATCH_TYPE.EQUALS]: "equals",
    [MATCH_TYPE.REGEXP]: "regexp"
};
var ResourceType;
(function(ResourceType) {
    ResourceType["MAIN_FRAME"] = "main_frame";
    ResourceType["SUB_FRAME"] = "sub_frame";
    ResourceType["STYLESHEET"] = "stylesheet";
    ResourceType["SCRIPT"] = "script";
    ResourceType["IMAGE"] = "image";
    ResourceType["FONT"] = "font";
    ResourceType["OBJECT"] = "object";
    ResourceType["XMLHTTPREQUEST"] = "xmlhttprequest";
    ResourceType["PING"] = "ping";
    ResourceType["CSP_REPORT"] = "csp_report";
    ResourceType["MEDIA"] = "media";
    ResourceType["WEBSOCKET"] = "websocket";
    ResourceType["OTHER"] = "other";
    ResourceType["WEBBUNDLE"] = "webbundle";
    ResourceType["WEBTRANSPORT"] = "webtransport";
})(ResourceType || (ResourceType = {}));
var RuleActionType;
(function(RuleActionType) {
    RuleActionType["BLOCK"] = "block";
    RuleActionType["REDIRECT"] = "redirect";
    RuleActionType["ALLOW"] = "allow";
    RuleActionType["UPGRADE_SCHEME"] = "upgradeScheme";
    RuleActionType["MODIFY_HEADERS"] = "modifyHeaders";
    RuleActionType["ALLOW_ALL_REQUESTS"] = "allowAllRequests";
})(RuleActionType || (RuleActionType = {}));
const MATCH_TYPE_OPTIONS = (0, _utils.convertDictToArray)(MATCH_TYPE_DICT);
const HTTP_STATUS_CODE_OPTIONS = Object.keys((0, _httpStatus.HTTP_STATUS_CODE_DICT)).map((v)=>({
        value: +v,
        label: `${v} ${(0, _httpStatus.HTTP_STATUS_CODE_DICT)[v]}`
    }));
var GLOBAL_VARIABLE;
(function(GLOBAL_VARIABLE) {
    GLOBAL_VARIABLE["CHROME_PLUS_ORIGINAL_XHR"] = "CHROME_PLUS_ORIGINAL_XHR";
    GLOBAL_VARIABLE["CHROME_PLUS_REQUEST_MAP"] = "CHROME_PLUS_REQUEST_MAP";
    GLOBAL_VARIABLE["CHROME_PLUS_PROXY_XHR"] = "CHROME_PLUS_PROXY_XHR";
    GLOBAL_VARIABLE["CHROME_PLUS_PROXY_ROUTES"] = "CHROME_PLUS_PROXY_ROUTES";
})(GLOBAL_VARIABLE || (GLOBAL_VARIABLE = {}));
const GLOBAL_VARIABLE_MAP = {
    [GLOBAL_VARIABLE.CHROME_PLUS_ORIGINAL_XHR]: "CHROME_PLUS_ORIGINAL_XHR",
    [GLOBAL_VARIABLE.CHROME_PLUS_REQUEST_MAP]: "CHROME_PLUS_REQUEST_MAP",
    [GLOBAL_VARIABLE.CHROME_PLUS_PROXY_XHR]: "CHROME_PLUS_PROXY_XHR",
    [GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES]: "CHROME_PLUS_PROXY_ROUTES"
};
const DEFAULT_REQUEST_HEADERS_KEYS = [
    "Accept",
    "Accept-Charset",
    "Accept-Encoding",
    "Accept-Language",
    "Accept-Datetime",
    "Authorization",
    "Cache-Control",
    "Connection",
    "Cookie",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "Expect",
    "From",
    "Host",
    "If-Match",
    "If-Modified-Since",
    "If-None-Match",
    "If-Range",
    "If-Unmodified-Since",
    "Max-Forwards",
    "Origin",
    "Pragma",
    "Proxy-Authorization",
    "Range",
    "Referer",
    "TE",
    "User-Agent",
    "Upgrade",
    "Via",
    "Warning" // General warning about possible errors in the entity body
];
const DEFAULT_RESPONSE_HEADERS_KEYS = [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials",
    // eslint-disable-next-line max-len
    "Access-Control-Expose-Headers",
    "Access-Control-Max-Age",
    "Accept-Patch",
    "Accept-Ranges",
    "Age",
    "Allow",
    "Cache-Control",
    "Connection",
    "Content-Disposition",
    "Content-Encoding",
    "Content-Language",
    "Content-Length",
    "Content-Location",
    "Content-MD5",
    "Content-Range",
    "Content-Type",
    "Date",
    "ETag",
    "Expires",
    "Last-Modified",
    "Link",
    "Location",
    "P3P",
    "Pragma",
    "Proxy-Authenticate",
    // eslint-disable-next-line max-len
    "Public-Key-Pins",
    // eslint-disable-next-line max-len
    "Refresh",
    "Retry-After",
    "Server",
    "Set-Cookie",
    "Status",
    "Trailer",
    "Transfer-Encoding",
    "Upgrade",
    // eslint-disable-next-line max-len
    "Vary",
    "Via",
    "Warning",
    "WWW-Authenticate" // Indicates the authentication scheme that should be used to access the requested entity
];
exports.default = {
    PROXY_ROUTE_KEY,
    MOCK_TYPE,
    MOCK_TYPE_DICT,
    MOCK_TYPE_OPTIONS,
    MATCH_TYPE,
    HTTP_STATUS_CODE: (0, _httpStatus.HTTP_STATUS_CODE),
    MESSAGE_TYPES,
    GLOBAL_VARIABLE_MAP
};

},{"~app/utils":"bTs7t","./httpStatus":"8uORB","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"bTs7t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
parcelHelpers.export(exports, "convertDictToArray", ()=>convertDictToArray);
parcelHelpers.export(exports, "jointUrl", ()=>jointUrl);
parcelHelpers.export(exports, "moveToTop", ()=>moveToTop);
parcelHelpers.export(exports, "encryptDecrypt", ()=>encryptDecrypt);
const log = (data)=>chrome.devtools.inspectedWindow.eval(`console.log('${JSON.stringify(data)}')`);
function convertDictToArray(dict, config = [
    "value",
    "label"
]) {
    const [keyName = "value", valueName = "label"] = config;
    return Object.entries(dict).map(([key, value])=>({
            [keyName]: key,
            [valueName]: value
        }));
}
function jointUrl(url) {
    try {
        // \u5c1d\u8bd5\u521b\u5efa\u4e00\u4e2aURL\u5bf9\u8c61
        const parsedUrl = new URL(url);
        // \u68c0\u67e5\u534f\u8bae\u662f\u5426\u4e3ahttp\u6216https
        if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") return url // \u8fd4\u56de\u539fURL\uff0c\u56e0\u4e3a\u5b83\u662f\u4e00\u4e2a\u6709\u6548\u7684HTTP(S)\u5730\u5740
        ;
        else throw new Error("Invalid protocol") // \u629b\u51fa\u9519\u8bef\uff0c\u5904\u7406\u975eHTTP(S)\u534f\u8bae
        ;
    } catch (error) {
        // \u5982\u679cURL\u6784\u9020\u5931\u8d25\u6216\u534f\u8bae\u4e0d\u6b63\u786e\uff0c\u5219\u8fd4\u56de\u4fee\u6b63\u540e\u7684URL
        return location.origin + url;
    }
}
function moveToTop(arr, index) {
    if (index >= 0 && index < arr.length) {
        // \u4ece\u6307\u5b9a\u7d22\u5f15\u4f4d\u7f6e\u79fb\u9664\u5143\u7d20
        const [item] = arr.splice(index, 1);
        // \u5c06\u8be5\u5143\u7d20\u63d2\u5165\u5230\u6570\u7ec4\u7684\u5f00\u5934
        arr.unshift(item);
    }
}
function encryptDecrypt(input, key) {
    // \u5c06\u8f93\u5165\u5b57\u7b26\u4e32\u8f6c\u6362\u4e3a\u5b57\u7b26\u7801\u6570\u7ec4
    const inputChars = Array.from(input).map((char)=>char.charCodeAt(0));
    // \u751f\u6210\u5bc6\u94a5\u7684\u5b57\u7b26\u7801\u6570\u7ec4
    const keyChars = Array.from(key).map((char)=>char.charCodeAt(0));
    // \u6267\u884c\u5f02\u6216\u52a0\u5bc6\u6216\u89e3\u5bc6
    const output = inputChars.map((char, index)=>{
        return String.fromCharCode(char ^ keyChars[index % keyChars.length]);
    });
    // \u5c06\u5b57\u7b26\u6570\u7ec4\u8f6c\u6362\u56de\u5b57\u7b26\u4e32
    return output.join("");
}
// type JSONValue = string | number | boolean | JSONObject | JSONArray
// interface JSONObject {
//   [key: string]: JSONValue
// }
// interface JSONArray extends Array<JSONValue> {}
// function jsonToTypeScriptType(json: JSONValue, typeName: string = 'Root'): string {
//   if (typeof json === 'string') {
//     return 'string'
//   } else if (typeof json === 'number') {
//     return 'number'
//   } else if (typeof json === 'boolean') {
//     return 'boolean'
//   } else if (Array.isArray(json)) {
//     if (json.length === 0) {
//       return 'any[]'
//     }
//     const arrayType = jsonToTypeScriptType(json[0])
//     return `${arrayType}[]`
//   } else if (typeof json === 'object' && json !== null) {
//     let result = `interface ${typeName} {\n`
//     for (const key in json) {
//       const valueType = jsonToTypeScriptType(json[key], capitalizeFirstLetter(key))
//       result += `  ${key}: ${valueType};\n`
//     }
//     result += '}'
//     return result
//   } else {
//     return 'any'
//   }
// }
// function capitalizeFirstLetter(string: string): string {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
// // \u793a\u4f8b\u7528\u6cd5
// const jsonData = {
//   name: 'John',
//   age: 30,
//   isStudent: false,
//   courses: ['Math', 'Science'],
//   address: {
//     street: '123 Main St',
//     city: 'Anytown'
//   }
// }
// const typeScriptType = jsonToTypeScriptType(jsonData)
// console.log(typeScriptType)
exports.default = {
    convertDictToArray,
    log,
    jointUrl,
    moveToTop
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6dfwG":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"8uORB":[function(require,module,exports) {
/* eslint-disable no-unused-vars */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HTTP_STATUS_CODE", ()=>HTTP_STATUS_CODE);
parcelHelpers.export(exports, "HTTP_STATUS_CODE_DICT", ()=>HTTP_STATUS_CODE_DICT);
var HTTP_STATUS_CODE;
(function(HTTP_STATUS_CODE) {
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["CONTINUE"] = 100] = "CONTINUE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PROCESSING"] = 102] = "PROCESSING";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["OK"] = 200] = "OK";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["CREATED"] = 201] = "CREATED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["ACCEPTED"] = 202] = "ACCEPTED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NO_CONTENT"] = 204] = "NO_CONTENT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["IM_USED"] = 226] = "IM_USED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["FOUND"] = 302] = "FOUND";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["SEE_OTHER"] = 303] = "SEE_OTHER";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["USE_PROXY"] = 305] = "USE_PROXY";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["CONFLICT"] = 409] = "CONFLICT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["GONE"] = 410] = "GONE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["I_AM_A_TEAPOT"] = 418] = "I_AM_A_TEAPOT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["LOCKED"] = 423] = "LOCKED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HTTP_STATUS_CODE || (HTTP_STATUS_CODE = {}));
const HTTP_STATUS_CODE_DICT = {
    [HTTP_STATUS_CODE.CONTINUE]: "Continue",
    [HTTP_STATUS_CODE.SWITCHING_PROTOCOLS]: "Switching Protocols",
    [HTTP_STATUS_CODE.PROCESSING]: "Processing",
    [HTTP_STATUS_CODE.OK]: "OK",
    [HTTP_STATUS_CODE.CREATED]: "Created",
    [HTTP_STATUS_CODE.ACCEPTED]: "Accepted",
    [HTTP_STATUS_CODE.NON_AUTHORITATIVE_INFORMATION]: "Non-Authoritative Information",
    [HTTP_STATUS_CODE.NO_CONTENT]: "No Content",
    [HTTP_STATUS_CODE.RESET_CONTENT]: "Reset Content",
    [HTTP_STATUS_CODE.PARTIAL_CONTENT]: "Partial Content",
    [HTTP_STATUS_CODE.MULTI_STATUS]: "Multi-Status",
    [HTTP_STATUS_CODE.ALREADY_REPORTED]: "Already Reported",
    [HTTP_STATUS_CODE.MULTIPLE_CHOICES]: "Multiple Choices",
    [HTTP_STATUS_CODE.MOVED_PERMANENTLY]: "Moved Permanently",
    [HTTP_STATUS_CODE.FOUND]: "Found",
    [HTTP_STATUS_CODE.SEE_OTHER]: "See Other",
    [HTTP_STATUS_CODE.NOT_MODIFIED]: "Not Modified",
    [HTTP_STATUS_CODE.USE_PROXY]: "Use Proxy",
    [HTTP_STATUS_CODE.TEMPORARY_REDIRECT]: "Temporary Redirect",
    [HTTP_STATUS_CODE.PERMANENT_REDIRECT]: "Permanent Redirect",
    [HTTP_STATUS_CODE.BAD_REQUEST]: "Bad Request",
    [HTTP_STATUS_CODE.UNAUTHORIZED]: "Unauthorized",
    [HTTP_STATUS_CODE.PAYMENT_REQUIRED]: "Payment Required",
    [HTTP_STATUS_CODE.FORBIDDEN]: "Forbidden",
    [HTTP_STATUS_CODE.NOT_FOUND]: "Not Found",
    [HTTP_STATUS_CODE.METHOD_NOT_ALLOWED]: "Method Not Allowed",
    [HTTP_STATUS_CODE.NOT_ACCEPTABLE]: "Not Acceptable",
    [HTTP_STATUS_CODE.PROXY_AUTHENTICATION_REQUIRED]: "Proxy Authentication Required",
    [HTTP_STATUS_CODE.REQUEST_TIMEOUT]: "Request Timeout",
    [HTTP_STATUS_CODE.CONFLICT]: "Conflict",
    [HTTP_STATUS_CODE.GONE]: "Gone",
    [HTTP_STATUS_CODE.LENGTH_REQUIRED]: "Length Required",
    [HTTP_STATUS_CODE.PRECONDITION_FAILED]: "Precondition Failed",
    [HTTP_STATUS_CODE.PAYLOAD_TOO_LARGE]: "Payload Too Large",
    [HTTP_STATUS_CODE.URI_TOO_LONG]: "URI Too Long",
    [HTTP_STATUS_CODE.UNSUPPORTED_MEDIA_TYPE]: "Unsupported Media Type",
    [HTTP_STATUS_CODE.RANGE_NOT_SATISFIABLE]: "Range Not Satisfiable",
    [HTTP_STATUS_CODE.EXPECTATION_FAILED]: "Expectation Failed",
    [HTTP_STATUS_CODE.I_AM_A_TEAPOT]: "I'm a teapot",
    [HTTP_STATUS_CODE.MISDIRECTED_REQUEST]: "Misdirected Request",
    [HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
    [HTTP_STATUS_CODE.LOCKED]: "Locked",
    [HTTP_STATUS_CODE.FAILED_DEPENDENCY]: "Failed Dependency",
    [HTTP_STATUS_CODE.UPGRADE_REQUIRED]: "Upgrade Required",
    [HTTP_STATUS_CODE.PRECONDITION_REQUIRED]: "Precondition Required",
    [HTTP_STATUS_CODE.TOO_MANY_REQUESTS]: "Too Many Requests",
    [HTTP_STATUS_CODE.REQUEST_HEADER_FIELDS_TOO_LARGE]: "Request Header Fields Too Large",
    [HTTP_STATUS_CODE.UNAVAILABLE_FOR_LEGAL_REASONS]: "Unavailable For Legal Reasons",
    [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: "Internal Server Error",
    [HTTP_STATUS_CODE.NOT_IMPLEMENTED]: "Not Implemented",
    [HTTP_STATUS_CODE.BAD_GATEWAY]: "Bad Gateway",
    [HTTP_STATUS_CODE.SERVICE_UNAVAILABLE]: "Service Unavailable",
    [HTTP_STATUS_CODE.GATEWAY_TIMEOUT]: "Gateway Timeout",
    [HTTP_STATUS_CODE.HTTP_VERSION_NOT_SUPPORTED]: "HTTP Version Not Supported",
    [HTTP_STATUS_CODE.VARIANT_ALSO_NEGOTIATES]: "Variant Also Negotiates",
    [HTTP_STATUS_CODE.INSUFFICIENT_STORAGE]: "Insufficient Storage",
    [HTTP_STATUS_CODE.LOOP_DETECTED]: "Loop Detected",
    [HTTP_STATUS_CODE.NOT_EXTENDED]: "Not Extended",
    [HTTP_STATUS_CODE.NETWORK_AUTHENTICATION_REQUIRED]: "Network Authentication Required"
};
exports.default = {
    HTTP_STATUS_CODE,
    HTTP_STATUS_CODE_DICT
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6hhi1":[function(require,module,exports) {
/* eslint-disable no-unused-vars */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "STORE_KEY", ()=>STORE_KEY);
var _storage = require("@plasmohq/storage");
var STORE_KEY;
(function(STORE_KEY) {
    STORE_KEY["ROUTES"] = "routes";
    STORE_KEY["GLOBAL_SWITCH_CONFIG"] = "globalSwitchConfig";
    STORE_KEY["LOADING"] = "loading";
    STORE_KEY["GROUPS"] = "groups";
    STORE_KEY["GROUPS_MAP"] = "groupsMap";
})(STORE_KEY || (STORE_KEY = {}));
const store = new (0, _storage.Storage)({
    area: "sync",
    copiedKeyList: []
});
store.watch({
    [STORE_KEY.GROUPS]: (c)=>{
        const map = {};
        (c?.newValue || []).forEach((element)=>{
            map[element.value] = element.label;
        });
        store.set(STORE_KEY.GROUPS_MAP, map);
    }
});
exports.default = store;

},{"@plasmohq/storage":"69U3v","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"69U3v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseStorage", ()=>o);
parcelHelpers.export(exports, "Storage", ()=>g);
var _pify = require("pify");
var _pifyDefault = parcelHelpers.interopDefault(_pify);
var l = ()=>{
    try {
        let e = globalThis.navigator?.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (e[1] === "Chrome") return parseInt(e[2]) < 100 || globalThis.chrome.runtime?.getManifest()?.manifest_version === 2;
    } catch  {
        return !1;
    }
    return !1;
};
var o = class {
    #a;
    #e;
    get primaryClient() {
        return this.#e;
    }
    #t;
    get secondaryClient() {
        return this.#t;
    }
    #r;
    get area() {
        return this.#r;
    }
    get hasWebApi() {
        try {
            return typeof window < "u" && !!window.localStorage;
        } catch (e) {
            return console.error(e), !1;
        }
    }
    #s = new Map;
    #i;
    get copiedKeySet() {
        return this.#i;
    }
    isCopied = (e)=>this.hasWebApi && (this.allCopied || this.copiedKeySet.has(e));
    #n = !1;
    get allCopied() {
        return this.#n;
    }
    getExtStorageApi = ()=>globalThis.browser?.storage || globalThis.chrome?.storage;
    get hasExtensionApi() {
        try {
            return !!this.getExtStorageApi();
        } catch (e) {
            return console.error(e), !1;
        }
    }
    isWatchSupported = ()=>this.hasExtensionApi;
    keyNamespace = "";
    isValidKey = (e)=>e.startsWith(this.keyNamespace);
    getNamespacedKey = (e)=>`${this.keyNamespace}${e}`;
    getUnnamespacedKey = (e)=>e.slice(this.keyNamespace.length);
    constructor({ area: e = "sync", allCopied: t = !1, copiedKeyList: s = [] } = {}){
        this.setCopiedKeySet(s), this.#r = e, this.#n = t;
        try {
            this.hasWebApi && (t || s.length > 0) && (this.#t = window.localStorage);
        } catch  {}
        try {
            this.hasExtensionApi && (this.#a = this.getExtStorageApi(), l() ? this.#e = (0, _pifyDefault.default)(this.#a[this.area], {
                exclude: [
                    "getBytesInUse"
                ],
                errorFirst: !1
            }) : this.#e = this.#a[this.area]);
        } catch  {}
    }
    setCopiedKeySet(e) {
        this.#i = new Set(e);
    }
    rawGetAll = ()=>this.#e?.get();
    getAll = async ()=>{
        let e = await this.rawGetAll();
        return Object.entries(e).filter(([t])=>this.isValidKey(t)).reduce((t, [s, a])=>(t[this.getUnnamespacedKey(s)] = a, t), {});
    };
    copy = async (e)=>{
        let t = e === void 0;
        if (!t && !this.copiedKeySet.has(e) || !this.allCopied || !this.hasExtensionApi) return !1;
        let s = this.allCopied ? await this.rawGetAll() : await this.#e.get((t ? [
            ...this.copiedKeySet
        ] : [
            e
        ]).map(this.getNamespacedKey));
        if (!s) return !1;
        let a = !1;
        for(let r in s){
            let i = s[r], n = this.#t?.getItem(r);
            this.#t?.setItem(r, i), a ||= i !== n;
        }
        return a;
    };
    rawGet = async (e)=>this.hasExtensionApi ? (await this.#e.get(e))[e] : this.isCopied(e) ? this.#t?.getItem(e) : null;
    rawSet = async (e, t)=>(this.isCopied(e) && this.#t?.setItem(e, t), this.hasExtensionApi && await this.#e.set({
            [e]: t
        }), null);
    clear = async (e = !1)=>{
        e && this.#t?.clear(), await this.#e.clear();
    };
    rawRemove = async (e)=>{
        this.isCopied(e) && this.#t?.removeItem(e), this.hasExtensionApi && await this.#e.remove(e);
    };
    removeAll = async ()=>{
        let e = await this.getAll(), t = Object.keys(e);
        await Promise.all(t.map(this.remove));
    };
    watch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#o(e), t;
    };
    #o = (e)=>{
        for(let t in e){
            let s = this.getNamespacedKey(t), a = this.#s.get(s)?.callbackSet || new Set;
            if (a.add(e[t]), a.size > 1) continue;
            let r = (i, n)=>{
                if (n !== this.area || !i[s]) return;
                let h = this.#s.get(s);
                if (!h) throw new Error(`Storage comms does not exist for nsKey: ${s}`);
                Promise.all([
                    this.parseValue(i[s].newValue),
                    this.parseValue(i[s].oldValue)
                ]).then(([p, d])=>{
                    for (let m of h.callbackSet)m({
                        newValue: p,
                        oldValue: d
                    }, n);
                });
            };
            this.#a.onChanged.addListener(r), this.#s.set(s, {
                callbackSet: a,
                listener: r
            });
        }
    };
    unwatch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#c(e), t;
    };
    #c(e) {
        for(let t in e){
            let s = this.getNamespacedKey(t), a = e[t], r = this.#s.get(s);
            r && (r.callbackSet.delete(a), r.callbackSet.size === 0 && (this.#s.delete(s), this.#a.onChanged.removeListener(r.listener)));
        }
    }
    unwatchAll = ()=>this.#h();
    #h() {
        this.#s.forEach(({ listener: e })=>this.#a.onChanged.removeListener(e)), this.#s.clear();
    }
    async getItem(e) {
        return this.get(e);
    }
    async setItem(e, t) {
        await this.set(e, t);
    }
    async removeItem(e) {
        return this.remove(e);
    }
}, g = class extends o {
    get = async (e)=>{
        let t = this.getNamespacedKey(e), s = await this.rawGet(t);
        return this.parseValue(s);
    };
    set = async (e, t)=>{
        let s = this.getNamespacedKey(e), a = JSON.stringify(t);
        return this.rawSet(s, a);
    };
    remove = async (e)=>{
        let t = this.getNamespacedKey(e);
        return this.rawRemove(t);
    };
    setNamespace = (e)=>{
        this.keyNamespace = e;
    };
    parseValue = async (e)=>{
        try {
            if (e !== void 0) return JSON.parse(e);
        } catch (t) {
            console.error(t);
        }
    };
};

},{"pify":"lXTmq","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"lXTmq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>pify);
const processFunction = (function_, options, proxy, unwrapped)=>function(...arguments_) {
        const P = options.promiseModule;
        return new P((resolve, reject)=>{
            if (options.multiArgs) arguments_.push((...result)=>{
                if (options.errorFirst) {
                    if (result[0]) reject(result);
                    else {
                        result.shift();
                        resolve(result);
                    }
                } else resolve(result);
            });
            else if (options.errorFirst) arguments_.push((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
            else arguments_.push(resolve);
            const self = this === proxy ? unwrapped : this;
            Reflect.apply(function_, self, arguments_);
        });
    };
const filterCache = new WeakMap();
function pify(input, options) {
    options = {
        exclude: [
            /.+(?:Sync|Stream)$/
        ],
        errorFirst: true,
        promiseModule: Promise,
        ...options
    };
    const objectType = typeof input;
    if (!(input !== null && (objectType === "object" || objectType === "function"))) throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objectType}\``);
    const filter = (target, key)=>{
        let cached = filterCache.get(target);
        if (!cached) {
            cached = {};
            filterCache.set(target, cached);
        }
        if (key in cached) return cached[key];
        const match = (pattern)=>typeof pattern === "string" || typeof key === "symbol" ? key === pattern : pattern.test(key);
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        const writableOrConfigurableOwn = descriptor === undefined || descriptor.writable || descriptor.configurable;
        const included = options.include ? options.include.some((element)=>match(element)) : !options.exclude.some((element)=>match(element));
        const shouldFilter = included && writableOrConfigurableOwn;
        cached[key] = shouldFilter;
        return shouldFilter;
    };
    const cache = new WeakMap();
    const proxy = new Proxy(input, {
        apply (target, thisArg, args) {
            const cached = cache.get(target);
            if (cached) return Reflect.apply(cached, thisArg, args);
            const pified = options.excludeMain ? target : processFunction(target, options, proxy, target);
            cache.set(target, pified);
            return Reflect.apply(pified, thisArg, args);
        },
        get (target, key) {
            const property = target[key];
            // eslint-disable-next-line no-use-extend-native/no-use-extend-native
            if (!filter(target, key) || property === Function.prototype[key]) return property;
            const cached = cache.get(property);
            if (cached) return cached;
            if (typeof property === "function") {
                const pified = processFunction(property, options, proxy, target);
                cache.set(property, pified);
                return pified;
            }
            return property;
        }
    });
    return proxy;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}]},["3d80N","hUuKi"], "hUuKi", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixPQUFNLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSTtZQUMxQixNQUFNLFNBQVMsTUFBTSxJQUFJO1lBRXpCLElBQUksUUFDSCxPQUFPLFFBQVEsTUFBTSxRQUFRLFNBQVM7WUFHdkMsTUFBTSxTQUFTLFFBQVEsY0FBYyxTQUFTLGdCQUFnQixRQUFRLFNBQVMsT0FBTztZQUN0RixNQUFNLElBQUksUUFBUTtZQUNsQixPQUFPLFFBQVEsTUFBTSxRQUFRLFNBQVM7UUFDdkM7UUFFQSxLQUFJLE1BQU0sRUFBRSxHQUFHO1lBQ2QsTUFBTSxXQUFXLE1BQU0sQ0FBQyxJQUFJO1lBRTVCLHFFQUFxRTtZQUNyRSxJQUFJLENBQUMsT0FBTyxRQUFRLFFBQVEsYUFBYSxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQy9ELE9BQU87WUFHUixNQUFNLFNBQVMsTUFBTSxJQUFJO1lBRXpCLElBQUksUUFDSCxPQUFPO1lBR1IsSUFBSSxPQUFPLGFBQWEsWUFBWTtnQkFDbkMsTUFBTSxTQUFTLGdCQUFnQixVQUFVLFNBQVMsT0FBTztnQkFDekQsTUFBTSxJQUFJLFVBQVU7Z0JBQ3BCLE9BQU87WUFDUjtZQUVBLE9BQU87UUFDUjtJQUNEO0lBRUEsT0FBTztBQUNSIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1ydW50aW1lQDAuMjUuMC9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS1mYTU3MGQ4NTMxMmM4NzgyLmpzIiwiY2hyb21lLWV4dC10b29scy9zcmMvY29udGVudHMvbW9jay50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtanNAMi44LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL3J1bnRpbWUtYjIxZWU0YzFhODBjYzQ0OC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtanNAMi44LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL2hlbHBlcnMvYnVuZGxlLXVybC5qcyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2FwcC9jb25zdGFudHMvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9hcHAvdXRpbHMvaW5kZXgudHMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBhcmNlbCt0cmFuc2Zvcm1lci1qc0AyLjkuM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9hcHAvY29uc3RhbnRzL2h0dHBTdGF0dXMudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9hcHAvdXRpbHMvc3RvcmUudHMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3N0b3JhZ2VAMS4xMC4wX3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3N0b3JhZ2UvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9waWZ5QDYuMS4wL25vZGVfbW9kdWxlcy9waWZ5L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBkPXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W107dmFyIHk9KCk9PnR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgSD1uZXcgU2V0KGQpLF89ZT0+SC5oYXMoZSksRz1kLmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFo9XyhcIi0tZHJ5LXJ1blwiKSxwPSgpPT5fKFwiLS12ZXJib3NlXCIpfHx5KCkuVkVSQk9TRT09PVwidHJ1ZVwiLHE9cCgpO3ZhciB1PShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB4PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksYj0oLi4uZSk9PnUoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxtPSguLi5lKT0+dShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLFM9MCxjPSguLi5lKT0+cCgpJiZ1KGBcXHV7MUY3RTF9ICR7UysrfWAsLi4uZSk7dmFyIHM9e1wiaXNDb250ZW50U2NyaXB0XCI6dHJ1ZSxcImlzQmFja2dyb3VuZFwiOmZhbHNlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJzY3JpcHQtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvVXNlcnMvZnJlZGh1L0Rlc2t0b3AvSXRlbXMvZnJlZC1pdGVtcy9jaHJvbWUtZXh0LXRvb2xzL3NyYy9jb250ZW50cy9tb2NrLnRzXCIsXCJidW5kbGVJZFwiOlwiNzI0Y2EzMzM3Yzg5NmZkZlwiLFwiZW52SGFzaFwiOlwiZTc5MmZiYmRhYTc4ZWU4NFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjUzODIyfTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9cy5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOnMudmVyYm9zZX19O3ZhciBEPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEkoZSl7RC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1JO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgbD1nbG9iYWxUaGlzLmJyb3dzZXJ8fGdsb2JhbFRoaXMuY2hyb21lfHxudWxsO2Z1bmN0aW9uIHYoKXtyZXR1cm4hcy5ob3N0fHxzLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOnMuaG9zdH1mdW5jdGlvbiBDKCl7cmV0dXJuIHMucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgRT1cIl9fcGxhc21vX3J1bnRpbWVfc2NyaXB0X1wiO2Z1bmN0aW9uIEwoZSx0KXtsZXR7bW9kdWxlczpvfT1lO3JldHVybiBvPyEhb1t0XTohMX1mdW5jdGlvbiBPKGU9QygpKXtsZXQgdD12KCk7cmV0dXJuYCR7cy5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCJ9Oi8vJHt0fToke2V9L2B9ZnVuY3Rpb24gQihlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZ4KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gVChlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoTygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCByPUpTT04ucGFyc2Uoby5kYXRhKTtpZihyLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHIuYXNzZXRzKSxyLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCBhIG9mIHIuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IHc9YS5jb2RlZnJhbWV8fGEuc3RhY2s7bShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIithLm1lc3NhZ2UrYFxuYCt3K2BcblxuYCthLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsQiksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57YihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke3MuZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PnttKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7cy5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgbj1cIl9fcGxhc21vLWxvYWRpbmdfX1wiO2Z1bmN0aW9uICQoKXtsZXQgZT1nbG9iYWxUaGlzLndpbmRvdz8udHJ1c3RlZFR5cGVzO2lmKHR5cGVvZiBlPlwidVwiKXJldHVybjtsZXQgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0cnVzdGVkLXR5cGVzXCJdJyk/LmNvbnRlbnQ/LnNwbGl0KFwiIFwiKSxvPXQ/dFt0Py5sZW5ndGgtMV06dm9pZCAwO3JldHVybiB0eXBlb2YgZTxcInVcIj9lLmNyZWF0ZVBvbGljeShvfHxgdHJ1c3RlZC1odG1sLSR7bn1gLHtjcmVhdGVIVE1MOmE9PmF9KTp2b2lkIDB9dmFyIFA9JCgpO2Z1bmN0aW9uIGcoKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobil9ZnVuY3Rpb24gZigpe3JldHVybiFnKCl9ZnVuY3Rpb24gRigpe2xldCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5pZD1uO2xldCB0PWBcbiAgPHN0eWxlPlxuICAgICMke259IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmM2YzZjM7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XG4gICAgICBib3gtc2hhZG93OiAjMzMzIDQuN3B4IDQuN3B4O1xuICAgIH1cblxuICAgICMke259OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlM2UzZTM7XG4gICAgICBjb2xvcjogIzQ0NDtcbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwge1xuICAgICAgMCUge1xuICAgICAgICBmaWxsOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICBcbiAgICAgIDEwMCUge1xuICAgICAgICBmaWxsOiAjMzMzO1xuICAgICAgfVxuICAgIH1cblxuICAgICMke259IC5zdmctZWxlbS0xIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAwLjhzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuXG4gICAgIyR7bn0gLnN2Zy1lbGVtLTIge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDAuOXMgYm90aCBpbmZpbml0ZTtcbiAgICB9XG4gICAgXG4gICAgIyR7bn0gLnN2Zy1lbGVtLTMge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDFzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuXG4gICAgIyR7bn0gLmhpZGRlbiB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICA8L3N0eWxlPlxuICBcbiAgPHN2ZyBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI2NCAzNTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cGF0aCBkPVwiTTEzOS4yMjEgMjgyLjI0M0MxNTQuMjUyIDI4Mi4yNDMgMTY2LjkwMyAyOTQuODQ5IDE2MS4zMzggMzA4LjgxMkMxNTkuNDg5IDMxMy40NTQgMTU3LjE1IDMxNy45MTMgMTU0LjM0NyAzMjIuMTA5QzE0Ni40NjQgMzMzLjkwOSAxMzUuMjYgMzQzLjEwNyAxMjIuMTUxIDM0OC41MzhDMTA5LjA0MyAzNTMuOTY5IDk0LjYxODIgMzU1LjM5IDgwLjcwMjIgMzUyLjYyMUM2Ni43ODYxIDM0OS44NTIgNTQuMDAzNCAzNDMuMDE4IDQzLjk3MDUgMzMyLjk4M0MzMy45Mzc1IDMyMi45NDcgMjcuMTA1IDMxMC4xNjIgMjQuMzM2OSAyOTYuMjQyQzIxLjU2ODkgMjgyLjMyMyAyMi45ODk1IDI2Ny44OTUgMjguNDE5MyAyNTQuNzgzQzMzLjg0OTEgMjQxLjY3MSA0My4wNDQxIDIzMC40NjQgNTQuODQxNiAyMjIuNTc5QzU5LjAzNTMgMjE5Ljc3NyA2My40OTA4IDIxNy40MzggNjguMTI5NSAyMTUuNTg4QzgyLjA5MTUgMjEwLjAyMSA5NC42OTc4IDIyMi42NzEgOTQuNjk3OCAyMzcuNzAzTDk0LjY5NzggMjU1LjAyN0M5NC42OTc4IDI3MC4wNTggMTA2Ljg4MyAyODIuMjQzIDEyMS45MTQgMjgyLjI0M0gxMzkuMjIxWlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0xXCIgPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE5Mi4yNjEgMTQyLjAyOEMxOTIuMjYxIDEyNi45OTYgMjA0Ljg2NyAxMTQuMzQ2IDIxOC44MjkgMTE5LjkxM0MyMjMuNDY4IDEyMS43NjMgMjI3LjkyMyAxMjQuMTAyIDIzMi4xMTcgMTI2LjkwNEMyNDMuOTE1IDEzNC43ODkgMjUzLjExIDE0NS45OTYgMjU4LjUzOSAxNTkuMTA4QzI2My45NjkgMTcyLjIyIDI2NS4zOSAxODYuNjQ4IDI2Mi42MjIgMjAwLjU2N0MyNTkuODU0IDIxNC40ODcgMjUzLjAyMSAyMjcuMjcyIDI0Mi45ODggMjM3LjMwOEMyMzIuOTU1IDI0Ny4zNDMgMjIwLjE3MyAyNTQuMTc3IDIwNi4yNTYgMjU2Ljk0NkMxOTIuMzQgMjU5LjcxNSAxNzcuOTE2IDI1OC4yOTQgMTY0LjgwNyAyNTIuODYzQzE1MS42OTkgMjQ3LjQzMiAxNDAuNDk1IDIzOC4yMzQgMTMyLjYxMiAyMjYuNDM0QzEyOS44MDggMjIyLjIzOCAxMjcuNDcgMjE3Ljc3OSAxMjUuNjIgMjEzLjEzN0MxMjAuMDU2IDE5OS4xNzQgMTMyLjcwNyAxODYuNTY4IDE0Ny43MzggMTg2LjU2OEwxNjUuMDQ0IDE4Ni41NjhDMTgwLjA3NiAxODYuNTY4IDE5Mi4yNjEgMTc0LjM4MyAxOTIuMjYxIDE1OS4zNTJMMTkyLjI2MSAxNDIuMDI4WlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0yXCIgPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTk1LjY1MjIgMTY0LjEzNUM5NS42NTIyIDE3OS4xNjcgODMuMjI3OSAxOTEuNzI1IDY4LjgwMTMgMTg3LjUwNUM1OS41MTQ1IDE4NC43ODggNTAuNjQzMiAxODAuNjYzIDQyLjUxMDYgMTc1LjIyN0MyNi43ODA2IDE2NC43MTQgMTQuNTIwNiAxNDkuNzcyIDcuMjgwODkgMTMyLjI4OUMwLjA0MTE4MyAxMTQuODA3IC0xLjg1MzA1IDk1LjU2OTcgMS44Mzc3MiA3Ny4wMTA0QzUuNTI4NDkgNTguNDUxMSAxNC42Mzg1IDQxLjQwMzMgMjguMDE1NyAyOC4wMjI4QzQxLjM5MyAxNC42NDIzIDU4LjQzNjYgNS41MzAwNiA3Ni45OTE0IDEuODM4MzlDOTUuNTQ2MSAtMS44NTMyOSAxMTQuNzc5IDAuMDQxNDE2MiAxMzIuMjU3IDcuMjgyOUMxNDkuNzM1IDE0LjUyNDQgMTY0LjY3NCAyNi43ODc0IDE3NS4xODQgNDIuNTIxMkMxODAuNjIgNTAuNjU3NiAxODQuNzQ0IDU5LjUzMzIgMTg3LjQ2IDY4LjgyNDVDMTkxLjY3OCA4My4yNTE5IDE3OS4xMTkgOTUuNjc1OSAxNjQuMDg4IDk1LjY3NTlMMTIyLjg2OSA5NS42NzU5QzEwNy44MzcgOTUuNjc1OSA5NS42NTIyIDEwNy44NjEgOTUuNjUyMiAxMjIuODkyTDk1LjY1MjIgMTY0LjEzNVpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tM1wiPjwvcGF0aD5cbiAgPC9zdmc+XG4gIDxzcGFuIGNsYXNzPVwiaGlkZGVuXCI+Q29udGV4dCBJbnZhbGlkYXRlZCwgUHJlc3MgdG8gUmVsb2FkPC9zcGFuPlxuICBgO3JldHVybiBlLmlubmVySFRNTD1QP1AuY3JlYXRlSFRNTCh0KTp0LGUuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixlLnN0eWxlLnBvc2l0aW9uPVwiZml4ZWRcIixlLnN0eWxlLmJvdHRvbT1cIjE0LjdweFwiLGUuc3R5bGUucmlnaHQ9XCIxNC43cHhcIixlLnN0eWxlLmZvbnRGYW1pbHk9XCJzYW5zLXNlcmlmXCIsZS5zdHlsZS5kaXNwbGF5PVwiZmxleFwiLGUuc3R5bGUuanVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIixlLnN0eWxlLmFsaWduSXRlbXM9XCJjZW50ZXJcIixlLnN0eWxlLnBhZGRpbmc9XCIxNC43cHhcIixlLnN0eWxlLmdhcD1cIjE0LjdweFwiLGUuc3R5bGUuYm9yZGVyUmFkaXVzPVwiNC43cHhcIixlLnN0eWxlLnpJbmRleD1cIjIxNDc0ODM2NDdcIixlLnN0eWxlLm9wYWNpdHk9XCIwXCIsZS5zdHlsZS50cmFuc2l0aW9uPVwiYWxsIDAuNDdzIGVhc2UtaW4tb3V0XCIsZX1mdW5jdGlvbiBOKGUpe3JldHVybiBuZXcgUHJvbWlzZSh0PT57ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50PyhmKCkmJihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZSksdCgpKSx0KCkpOmdsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwoKT0+e2YoKSYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpLHQoKX0pfSl9dmFyIGs9KCk9PntsZXQgZTtpZihmKCkpe2xldCB0PUYoKTtlPU4odCl9cmV0dXJue3Nob3c6YXN5bmMoe3JlbG9hZEJ1dHRvbjp0PSExfT17fSk9Pnthd2FpdCBlO2xldCBvPWcoKTtvLnN0eWxlLm9wYWNpdHk9XCIxXCIsdCYmKG8ub25jbGljaz1yPT57ci5zdG9wUHJvcGFnYXRpb24oKSxnbG9iYWxUaGlzLmxvY2F0aW9uLnJlbG9hZCgpfSxvLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIiksby5zdHlsZS5jdXJzb3I9XCJwb2ludGVyXCIsby5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYWxsXCIpfSxoaWRlOmFzeW5jKCk9Pnthd2FpdCBlO2xldCB0PWcoKTt0LnN0eWxlLm9wYWNpdHk9XCIwXCJ9fX07dmFyIFc9YCR7RX0ke21vZHVsZS5pZH1fX2AsaSxBPSExLE09aygpO2FzeW5jIGZ1bmN0aW9uIGgoKXtjKFwiU2NyaXB0IFJ1bnRpbWUgLSByZWxvYWRpbmdcIiksQT9nbG9iYWxUaGlzLmxvY2F0aW9uPy5yZWxvYWQ/LigpOk0uc2hvdyh7cmVsb2FkQnV0dG9uOiEwfSl9ZnVuY3Rpb24gUigpe2k/LmRpc2Nvbm5lY3QoKSxpPWw/LnJ1bnRpbWUuY29ubmVjdCh7bmFtZTpXfSksaS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntoKCl9KSxpLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihlPT57ZS5fX3BsYXNtb19jc19yZWxvYWRfXyYmaCgpLGUuX19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fJiYoQT0hMCl9KX1mdW5jdGlvbiBqKCl7aWYobD8ucnVudGltZSl0cnl7UigpLHNldEludGVydmFsKFIsMjRlMyl9Y2F0Y2h7cmV0dXJufX1qKCk7VChhc3luYyBlPT57YyhcIlNjcmlwdCBydW50aW1lIC0gb24gdXBkYXRlZCBhc3NldHNcIiksZS5maWx0ZXIobz0+by5lbnZIYXNoPT09cy5lbnZIYXNoKS5zb21lKG89PkwobW9kdWxlLmJ1bmRsZSxvLmlkKSkmJihNLnNob3coKSxsPy5ydW50aW1lP2kucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2NoYW5nZWRfXzohMH0pOnNldFRpbWVvdXQoKCk9PntoKCl9LDQ3MDApKX0pO1xuIiwiaW1wb3J0IHR5cGUgeyBQbGFzbW9DU0NvbmZpZyB9IGZyb20gXCJwbGFzbW9cIlxuaW1wb3J0IGluamVjdCBmcm9tIFwidXJsOn5hcHAvc2NyaXB0cy94aHIudHNcIlxuXG5pbXBvcnQgeyBNRVNTQUdFX1RZUEVTIH0gZnJvbSBcIn5hcHAvY29uc3RhbnRzXCJcbmltcG9ydCBzdG9yZSwgeyBTVE9SRV9LRVkgfSBmcm9tIFwifmFwcC91dGlscy9zdG9yZVwiXG5cbmNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG50ZW1wLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIilcbnRlbXAuc3JjID0gaW5qZWN0XG50ZW1wLm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8g5ZCRY29udGVudCB4aHIudHMg5Y+R5raI5oGv5pu05pawUFJPWFlfUk9VVEVTIOOAkOWKoOi9veWujOWwseWQjOatpS3kuLvliqjooYzkuLrjgJFcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHN0b3JlLmdldEl0ZW0oU1RPUkVfS0VZLlJPVVRFUylcbiAgY29uc3QgY29uZmlnOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPiA9IGF3YWl0IHN0b3JlLmdldChTVE9SRV9LRVkuR0xPQkFMX1NXSVRDSF9DT05GSUcpXG4gIGNvbnN0IG1vY2tFbmFibGVkID0gY29uZmlnPy5tb2NrID8/IGZhbHNlXG4gIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgYWN0aW9uOiBNRVNTQUdFX1RZUEVTLk1BVENISU5HX1VQREFURSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBzZWNyZXQ6ICdjb250ZW50LXRvLXhocicsXG4gICAgICBkYXRhOiBtb2NrRW5hYmxlZCA/IGRhdGEgfHwgW10gOiBbXSxcbiAgICB9XG4gIH0pXG4gIHRlbXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0ZW1wKVxufVxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHRlbXApXG5cbi8vIOebkeWQrOadpeiHqiBiYWNrZ3JvdW5kIHNjcmlwdCDnmoTmtojmga9cbi8vIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbi8vICAgYXN5bmMgZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbi8vICAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT09IE1FU1NBR0VfVFlQRVMuTUFUQ0hJTkdfVVBEQVRFKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIGhlbGxvIGZyb20gYmFja2dyb3VuZFwiKTtcbi8vICAgICAgIHNlbmRSZXNwb25zZSh7ZmFyZXdlbGw6IFwiZ29vZGJ5ZVwifSk7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiB0cnVlOyAgLy8gV2lsbCByZXNwb25kIGFzeW5jaHJvbm91c2x5LlxuLy8gICB9XG4vLyApO1xuXG5zdG9yZS53YXRjaCh7XG4gIFtTVE9SRV9LRVkuUk9VVEVTXTogKGMpID0+IHtcbiAgICAvLyDlkJFjb250ZW50IHhoci50cyDlj5Hmtojmga/mm7TmlrBQUk9YWV9ST1VURVMg44CQ55uR5ZCs5Yiw5pWw5o2u5Y+Y5YyW5bCx5ZCM5q2lLeS4u+WKqOihjOS4uuOAkVxuICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICBhY3Rpb246IE1FU1NBR0VfVFlQRVMuTUFUQ0hJTkdfVVBEQVRFLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBkYXRhOiBjPy5uZXdWYWx1ZSB8fCBbXSxcbiAgICAgICAgc2VjcmV0OiAnY29udGVudC10by14aHInXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgW1NUT1JFX0tFWS5MT0FESU5HXTogKGMpID0+IHtcbiAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgYWN0aW9uOiBNRVNTQUdFX1RZUEVTLlNFVF9MT0FESU5HLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzZWNyZXQ6ICdjb250ZW50LXRvLWNvbnRlbnQnLFxuICAgICAgICBkYXRhOiBjPy5uZXdWYWx1ZVxuICAgICAgfSBcbiAgICB9KVxuICB9XG59KVxuLy8g6ZW/6L+e5o6l5ZKMYmfpgJrkv6FcbmNvbnN0IHBvcnQgPSBjaHJvbWUucnVudGltZS5jb25uZWN0KHsgbmFtZTogXCJrbm9ja2tub2NrXCIgfSlcbnBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtc2cpIHtcbiAgY29uc3QgeyBkYXRhLCBldmVudCwgaWQsIGhlYWRlcnMgfSA9IG1zZ1xuICBpZiAoZXZlbnQgaW4gTUVTU0FHRV9UWVBFUykge1xuICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgIFxuICAgIH1cbiAgfVxufSlcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBjb25zdCBjb25maWc6IFBsYXNtb0NTQ29uZmlnID0ge1xuICBtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdLFxuICBhbGxfZnJhbWVzOiB0cnVlLFxuICBydW5fYXQ6IFwiZG9jdW1lbnRfc3RhcnRcIlxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hlbHBlcnMvYnVuZGxlLXVybCcpLmdldEJ1bmRsZVVSTCgnOU9wQVgnKSArIFwieGhyLmZjYTliYmIwLmpzXCIgKyBcIj9cIiArIERhdGUubm93KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBidW5kbGVVUkwgPSB7fTtcblxuZnVuY3Rpb24gZ2V0QnVuZGxlVVJMQ2FjaGVkKGlkKSB7XG4gIHZhciB2YWx1ZSA9IGJ1bmRsZVVSTFtpZF07XG5cbiAgaWYgKCF2YWx1ZSkge1xuICAgIHZhbHVlID0gZ2V0QnVuZGxlVVJMKCk7XG4gICAgYnVuZGxlVVJMW2lkXSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRCdW5kbGVVUkwoKSB7XG4gIHRyeSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhciBtYXRjaGVzID0gKCcnICsgZXJyLnN0YWNrKS5tYXRjaCgvKGh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcL1teKVxcbl0rL2cpO1xuXG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCB0d28gc3RhY2sgZnJhbWVzIHdpbGwgYmUgdGhpcyBmdW5jdGlvbiBhbmQgZ2V0QnVuZGxlVVJMQ2FjaGVkLlxuICAgICAgLy8gVXNlIHRoZSAzcmQgb25lLCB3aGljaCB3aWxsIGJlIGEgcnVudGltZSBpbiB0aGUgb3JpZ2luYWwgYnVuZGxlLlxuICAgICAgcmV0dXJuIGdldEJhc2VVUkwobWF0Y2hlc1syXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICcvJztcbn1cblxuZnVuY3Rpb24gZ2V0QmFzZVVSTCh1cmwpIHtcbiAgcmV0dXJuICgnJyArIHVybCkucmVwbGFjZSgvXigoPzpodHRwcz98ZmlsZXxmdHB8KGNocm9tZXxtb3p8c2FmYXJpLXdlYiktZXh0ZW5zaW9uKTpcXC9cXC8uKylcXC9bXi9dKyQvLCAnJDEnKSArICcvJztcbn0gLy8gVE9ETzogUmVwbGFjZSB1c2VzIHdpdGggYG5ldyBVUkwodXJsKS5vcmlnaW5gIHdoZW4gaWUxMSBpcyBubyBsb25nZXIgc3VwcG9ydGVkLlxuXG5cbmZ1bmN0aW9uIGdldE9yaWdpbih1cmwpIHtcbiAgdmFyIG1hdGNoZXMgPSAoJycgKyB1cmwpLm1hdGNoKC8oaHR0cHM/fGZpbGV8ZnRwfChjaHJvbWV8bW96fHNhZmFyaS13ZWIpLWV4dGVuc2lvbik6XFwvXFwvW14vXSsvKTtcblxuICBpZiAoIW1hdGNoZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09yaWdpbiBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVzWzBdO1xufVxuXG5leHBvcnRzLmdldEJ1bmRsZVVSTCA9IGdldEJ1bmRsZVVSTENhY2hlZDtcbmV4cG9ydHMuZ2V0QmFzZVVSTCA9IGdldEJhc2VVUkw7XG5leHBvcnRzLmdldE9yaWdpbiA9IGdldE9yaWdpbjsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgY29udmVydERpY3RUb0FycmF5IH0gZnJvbSAnfmFwcC91dGlscydcblxuaW1wb3J0IHsgSFRUUF9TVEFUVVNfQ09ERSwgSFRUUF9TVEFUVVNfQ09ERV9ESUNUIH0gZnJvbSAnLi9odHRwU3RhdHVzJ1xuXG5leHBvcnQgY29uc3QgTUVTU0FHRV9UWVBFUyA9IHtcbiAgTUFUQ0hJTkdfVVBEQVRFOiAnbWF0Y2hpbmdVcGRhdGUnLFxuICBTRVRfTE9BRElORzogJ3NldExvYWRpbmcnLFxuICBTRVRfUkVDT1JEOiAnc2V0UmVjb3JkJyxcbn1cblxuZXhwb3J0IGVudW0gT1BFUkFURV9UWVBFIHtcbiAgRURJVCA9ICdlZGl0JyxcbiAgREVMRVRFID0gJ2RlbGV0ZScsXG4gIFVQREFURV9SRUNPUkQgPSAndXBkYXRlUmVjb3JkJyxcbiAgVE9QID0gJ3RvcCcsXG4gIENMT05FID0gJ2Nsb25lJ1xufVxuZXhwb3J0IGVudW0gUkVRVUVTVF9UWVBFIHtcbiAgQUxMID0gJyonLFxuICBHRVQgPSAnZ2V0JyxcbiAgUE9TVCA9ICdwb3N0JywgLy8g5ZCR5pyN5Yqh5Zmo5o+Q5Lqk5pWw5o2u44CCXG4gIFBVVCA9ICdwdXQnLCAvLyDlkJHmnI3liqHlmajkuIrkvKDmm7TmlrDmlbDmja7jgIJcbiAgREVMRVRFID0gJ2RlbGV0ZScsIC8vIOivt+axguacjeWKoeWZqOWIoOmZpOaMh+WumueahOi1hOa6kOOAglxuICBIRUFEID0gJ2hlYWQnLCAvLyDnsbvkvLzkuo4gR0VUIOivt+axgu+8jOS9huWPqui/lOWbnummlumDqO+8jOS4jei/lOWbnuWunumZheWGheWuueOAglxuICBPUFRJT05TID0gJ29wdGlvbnMnLCAvLyDnlKjkuo7mj4/ov7Dlr7nnm67moIfotYTmupDnmoTpgJrkv6HpgInpobnjgIJcbiAgUEFUQ0ggPSAncGF0Y2gnLCAvLyDnlKjkuo7lr7notYTmupDov5vooYzlsYDpg6jkv67mlLnvvIzljbPlr7notYTmupDnmoTpg6jliIblhoXlrrnov5vooYzmm7TmlrDmiJbkv67mlLlcbiAgVFJBQ0UgPSAndHJhY2UnIC8vIOWbnuaYvuacjeWKoeWZqOaUtuWIsOeahOivt+axgu+8jOS4u+imgeeUqOS6jua1i+ivleaIluiviuaWreOAglxufVxuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVFlQRV9ESUNUID0ge1xuICBbUkVRVUVTVF9UWVBFLkFMTF06ICfkuI3pmZAnLFxuICBbUkVRVUVTVF9UWVBFLkdFVF06ICdHRVQnLFxuICBbUkVRVUVTVF9UWVBFLlBPU1RdOiAnUE9TVCcsXG4gIFtSRVFVRVNUX1RZUEUuUFVUXTogJ1BVVCcsXG4gIFtSRVFVRVNUX1RZUEUuREVMRVRFXTogJ0RFTEVURScsXG4gIFtSRVFVRVNUX1RZUEUuSEVBRF06ICdIRUFEJyxcbiAgW1JFUVVFU1RfVFlQRS5PUFRJT05TXTogJ09QVElPTlMnLFxuICBbUkVRVUVTVF9UWVBFLlBBVENIXTogJ1BBVENIJyxcbiAgW1JFUVVFU1RfVFlQRS5UUkFDRV06ICdUUkFDRSdcbn1cbmV4cG9ydCBjb25zdCBSRVFVRVNUX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShSRVFVRVNUX1RZUEVfRElDVClcblxuZXhwb3J0IGVudW0gUFJPWFlfUk9VVEVfS0VZIHtcbiAgSUQgPSAnaWQnLFxuICBNT0NLX1RZUEUgPSAnbW9ja1R5cGUnLFxuICBFTkFCTEUgPSAnZW5hYmxlJyxcbiAgTUFUQ0hfVFlQRSA9ICdtYXRjaFR5cGUnLFxuICBSRVFVRVNUX1RZUEUgPSAncmVxdWVzdFR5cGUnLFxuICBSRVNQT05TRV9TVEFUVVMgPSAncmVzcG9uc2VTdGF0dXMnLFxuICBSRURJUkVDVF9VUkwgPSAncmVkaXJlY3RVcmwnLFxuICBERUxBWSA9ICdkZWxheScsXG4gIFVSTCA9ICd1cmwnLFxuICBHUk9VUCA9ICdncm91cCcsXG4gIE5BTUUgPSAnbmFtZScsXG4gIFJFU1BPTlNFID0gJ3Jlc3BvbnNlJyxcbiAgTU9DS19SRVFVRVNUX0hFQURFUlMgPSAnbW9ja1JlcXVlc3RIZWFkZXJzJyxcbiAgRU5BQkxFX01PQ0tfUkVRVUVTVF9IRUFERVJTID0gJ2VuYWJsZU1vY2tSZXF1ZXN0SGVhZGVycycsXG4gIFJFUVVFU1RfSEVBREVSUyA9ICdyZXF1ZXN0SGVhZGVycycsXG4gIE1PQ0tfUkVTUE9OU0VfSEVBREVSUyA9ICdtb2NrUmVzcG9uc2VIZWFkZXJzJyxcbiAgRU5BQkxFX01PQ0tfUkVTUE9OU0VfSEVBREVSUyA9ICdlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzJyxcbiAgUkVTUE9OU0VfSEVBREVSUyA9ICdyZXNwb25zZUhlYWRlcnMnXG59XG5leHBvcnQgdHlwZSBQUk9YWV9ST1VURV9JVEVNID0ge1xuICBbUFJPWFlfUk9VVEVfS0VZLklEXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuTU9DS19UWVBFXTogTU9DS19UWVBFXG4gIFtQUk9YWV9ST1VURV9LRVkuRU5BQkxFXTogYm9vbGVhblxuICBbUFJPWFlfUk9VVEVfS0VZLk1BVENIX1RZUEVdOiBNQVRDSF9UWVBFXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVRVUVTVF9UWVBFXTogUkVRVUVTVF9UWVBFXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVTUE9OU0VfU1RBVFVTXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVESVJFQ1RfVVJMXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuREVMQVldOiBudW1iZXJcbiAgW1BST1hZX1JPVVRFX0tFWS5VUkxdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5HUk9VUF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLk5BTUVdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV06IHVuZGVmaW5lZCB8IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFUVVFU1RfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVTUE9OU0VfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuTU9DS19SRVFVRVNUX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV9NT0NLX1JFUVVFU1RfSEVBREVSU106IGJvb2xlYW5cbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1JFU1BPTlNFX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV9NT0NLX1JFU1BPTlNFX0hFQURFUlNdOiBib29sZWFuXG59XG5cbmV4cG9ydCBlbnVtIE1PQ0tfVFlQRSB7XG4gIE5PUk1BTCA9ICdub3JtYWwnLFxuICBSRURJUkVDVCA9ICdyZWRpcmVjdCcsXG4gIE1PRElGWV9IRUFERVJTID0gJ21vZGlmeUhlYWRlcnMnXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX0RJQ1QgPSB7XG4gIFtNT0NLX1RZUEUuTk9STUFMXTogJ01vY2snLFxuICBbTU9DS19UWVBFLlJFRElSRUNUXTogJ1JlZGlyZWN0JyxcbiAgW01PQ0tfVFlQRS5NT0RJRllfSEVBREVSU106ICdNb2RpZnlIZWFkZXJzJ1xufVxuZXhwb3J0IGNvbnN0IE1PQ0tfVFlQRV9ESUNUX1NIQURPVyA9IHtcbiAgW01PQ0tfVFlQRS5OT1JNQUxdOlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgJzJweCAycHggNjhweCAwcHggcmdiYSgxNDUsIDE5MiwgMjU1LCAwLjUpLCBpbnNldCAtOHB4IC04cHggMTZweCAwcHggcmdiYSgxNDUsIDE5MiwgMjU1LCAwLjYpLCBpbnNldCAwcHggMTFweCAyOHB4IDBweCByZ2IoMjU1LCAyNTUsIDI1NSknLFxuICBbTU9DS19UWVBFLlJFRElSRUNUXTpcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICcycHggMnB4IDY4cHggMHB4IHJnYmEoMTg5LCAxNiwgMjI0LCAwLjUpLCBpbnNldCAtOXB4IC05cHggMTZweCAwcHggcmdiYSgxODksIDE2LCAyMjQsIDAuNiksIGluc2V0IDBweCAxMXB4IDI4cHggMHB4IHJnYigyNTUsIDI1NSwgMjU1KScsXG4gIFtNT0NLX1RZUEUuTU9ESUZZX0hFQURFUlNdOlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgJzJweCAycHggNjhweCAwcHggcmdiYSgxODQsIDIzMywgMTM0LCAwLjUpLCBpbnNldCAtOHB4IC04cHggMTZweCAwcHggcmdiYSgxODQsIDIzMywgMTM0LCAwLjYpLCBpbnNldCAwcHggMTFweCAyOHB4IDBweCByZ2IoMjU1LCAyNTUsIDI1NSknXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoTU9DS19UWVBFX0RJQ1QpXG5cbmV4cG9ydCBlbnVtIE1BVENIX1RZUEUge1xuICBDT05UQUlOUyA9ICdjb250YWlucycsXG4gIEVRVUFMUyA9ICdlcXVhbHMnLFxuICBSRUdFWFAgPSAncmVnZXhwJ1xufVxuZXhwb3J0IGNvbnN0IE1BVENIX1RZUEVfRElDVCA9IHtcbiAgW01BVENIX1RZUEUuQ09OVEFJTlNdOiAnY29udGFpbnMnLFxuICBbTUFUQ0hfVFlQRS5FUVVBTFNdOiAnZXF1YWxzJyxcbiAgW01BVENIX1RZUEUuUkVHRVhQXTogJ3JlZ2V4cCdcbn1cblxuZXhwb3J0IGVudW0gUmVzb3VyY2VUeXBlIHtcbiAgTUFJTl9GUkFNRSA9ICdtYWluX2ZyYW1lJyxcbiAgU1VCX0ZSQU1FID0gJ3N1Yl9mcmFtZScsXG4gIFNUWUxFU0hFRVQgPSAnc3R5bGVzaGVldCcsXG4gIFNDUklQVCA9ICdzY3JpcHQnLFxuICBJTUFHRSA9ICdpbWFnZScsXG4gIEZPTlQgPSAnZm9udCcsXG4gIE9CSkVDVCA9ICdvYmplY3QnLFxuICBYTUxIVFRQUkVRVUVTVCA9ICd4bWxodHRwcmVxdWVzdCcsXG4gIFBJTkcgPSAncGluZycsXG4gIENTUF9SRVBPUlQgPSAnY3NwX3JlcG9ydCcsXG4gIE1FRElBID0gJ21lZGlhJyxcbiAgV0VCU09DS0VUID0gJ3dlYnNvY2tldCcsXG4gIE9USEVSID0gJ290aGVyJyxcbiAgV0VCQlVORExFID0gJ3dlYmJ1bmRsZScsXG4gIFdFQlRSQU5TUE9SVCA9ICd3ZWJ0cmFuc3BvcnQnXG59XG5cbmV4cG9ydCBlbnVtIFJ1bGVBY3Rpb25UeXBlIHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBSRURJUkVDVCA9ICdyZWRpcmVjdCcsXG4gIEFMTE9XID0gJ2FsbG93JyxcbiAgVVBHUkFERV9TQ0hFTUUgPSAndXBncmFkZVNjaGVtZScsXG4gIE1PRElGWV9IRUFERVJTID0gJ21vZGlmeUhlYWRlcnMnLFxuICBBTExPV19BTExfUkVRVUVTVFMgPSAnYWxsb3dBbGxSZXF1ZXN0cydcbn1cblxuZXhwb3J0IGNvbnN0IE1BVENIX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShNQVRDSF9UWVBFX0RJQ1QpXG5cbmV4cG9ydCBjb25zdCBIVFRQX1NUQVRVU19DT0RFX09QVElPTlMgPSBPYmplY3Qua2V5cyhIVFRQX1NUQVRVU19DT0RFX0RJQ1QpLm1hcCgodikgPT4gKHtcbiAgdmFsdWU6ICt2LFxuICBsYWJlbDogYCR7dn0gJHtIVFRQX1NUQVRVU19DT0RFX0RJQ1Rbdl19YFxufSkpXG5cbmV4cG9ydCBlbnVtIEdMT0JBTF9WQVJJQUJMRSB7XG4gIENIUk9NRV9QTFVTX09SSUdJTkFMX1hIUiA9ICdDSFJPTUVfUExVU19PUklHSU5BTF9YSFInLFxuICBDSFJPTUVfUExVU19SRVFVRVNUX01BUCA9ICdDSFJPTUVfUExVU19SRVFVRVNUX01BUCcsXG4gIENIUk9NRV9QTFVTX1BST1hZX1hIUiA9ICdDSFJPTUVfUExVU19QUk9YWV9YSFInLFxuICBDSFJPTUVfUExVU19QUk9YWV9ST1VURVMgPSAnQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTJ1xufVxuZXhwb3J0IGNvbnN0IEdMT0JBTF9WQVJJQUJMRV9NQVAgPSB7XG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSXTogJ0NIUk9NRV9QTFVTX09SSUdJTkFMX1hIUicsXG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUkVRVUVTVF9NQVBdOiAnQ0hST01FX1BMVVNfUkVRVUVTVF9NQVAnLFxuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1BST1hZX1hIUl06ICdDSFJPTUVfUExVU19QUk9YWV9YSFInLFxuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1BST1hZX1JPVVRFU106ICdDSFJPTUVfUExVU19QUk9YWV9ST1VURVMnXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVFU1RfSEVBREVSU19LRVlTID0gW1xuICAnQWNjZXB0JywgLy8gQWNjZXB0YWJsZSByZXNwb25zZSBDb250ZW50LVR5cGVzXG4gICdBY2NlcHQtQ2hhcnNldCcsIC8vIEFjY2VwdGFibGUgY2hhcmFjdGVyIHNldHNcbiAgJ0FjY2VwdC1FbmNvZGluZycsIC8vIEFjY2VwdGFibGUgcmVzcG9uc2UgY29udGVudCBlbmNvZGluZ1xuICAnQWNjZXB0LUxhbmd1YWdlJywgLy8gQWNjZXB0YWJsZSByZXNwb25zZSBjb250ZW50IGxhbmd1YWdlc1xuICAnQWNjZXB0LURhdGV0aW1lJywgLy8gQWNjZXB0YWJsZSB2ZXJzaW9uIG9mIHRoZSBjb250ZW50IGJhc2VkIG9uIGRhdGV0aW1lXG4gICdBdXRob3JpemF0aW9uJywgLy8gQXV0aG9yaXphdGlvbiBpbmZvcm1hdGlvbiBmb3IgYXV0aGVudGljYXRlZCByZXNvdXJjZXNcbiAgJ0NhY2hlLUNvbnRyb2wnLCAvLyBDYWNoZSBjb250cm9sIGRpcmVjdGl2ZXNcbiAgJ0Nvbm5lY3Rpb24nLCAvLyBQcmVmZXJyZWQgdHlwZSBvZiBjb25uZWN0aW9uXG4gICdDb29raWUnLCAvLyBIVFRQIENvb2tpZSBmcm9tIHNlcnZlcidzIFNldC1Db29raWVcbiAgJ0NvbnRlbnQtTGVuZ3RoJywgLy8gTGVuZ3RoIG9mIHRoZSByZXF1ZXN0IGJvZHkgaW4gb2N0YWxcbiAgJ0NvbnRlbnQtTUQ1JywgLy8gTUQ1IGhhc2ggb2YgcmVxdWVzdCBib2R5IGNvbnRlbnQsIEJhc2U2NCBlbmNvZGVkXG4gICdDb250ZW50LVR5cGUnLCAvLyBNSU1FIHR5cGUgb2YgdGhlIHJlcXVlc3QgYm9keVxuICAnRGF0ZScsIC8vIERhdGUgYW5kIHRpbWUgdGhlIG1lc3NhZ2Ugd2FzIHNlbnRcbiAgJ0V4cGVjdCcsIC8vIEV4cGVjdGVkIHNlcnZlciBiZWhhdmlvclxuICAnRnJvbScsIC8vIEVtYWlsIGFkZHJlc3Mgb2YgdGhlIHJlcXVlc3QncyB1c2VyXG4gICdIb3N0JywgLy8gU2VydmVyIGRvbWFpbiBuYW1lIGFuZCBwb3J0IG51bWJlclxuICAnSWYtTWF0Y2gnLCAvLyBPbmx5IHBlcmZvcm0gdGhlIGFjdGlvbiBpZiB0aGUgY2xpZW50J3MgZW50aXR5IG1hdGNoZXMgdGhlIHNlcnZlcidzIGVudGl0eVxuICAnSWYtTW9kaWZpZWQtU2luY2UnLCAvLyBBbGxvd3MgYSAzMDQgTm90IE1vZGlmaWVkIHRvIGJlIHJldHVybmVkIGlmIGNvbnRlbnQgaXMgdW5jaGFuZ2VkXG4gICdJZi1Ob25lLU1hdGNoJywgLy8gQWxsb3dzIGEgMzA0IE5vdCBNb2RpZmllZCB0byBiZSByZXR1cm5lZCBpZiBjb250ZW50IGlzIHVuY2hhbmdlZFxuICAnSWYtUmFuZ2UnLCAvLyBTZW5kIHRoZSBwYXJ0cyB0aGF0IGFyZSBtaXNzaW5nIGlmIHRoZSBlbnRpdHkgaXMgdW5jaGFuZ2VkLCBvdGhlcndpc2Ugc2VuZCB0aGUgZW50aXJlIG5ldyBlbnRpdHlcbiAgJ0lmLVVubW9kaWZpZWQtU2luY2UnLCAvLyBPbmx5IHNlbmQgdGhlIHJlc3BvbnNlIGlmIHRoZSBlbnRpdHkgaGFzIG5vdCBiZWVuIG1vZGlmaWVkIHNpbmNlIGEgc3BlY2lmaWMgdGltZVxuICAnTWF4LUZvcndhcmRzJywgLy8gTGltaXRzIHRoZSBudW1iZXIgb2YgdGltZXMgYSBtZXNzYWdlIGNhbiBiZSBmb3J3YXJkZWQgdGhyb3VnaCBwcm94aWVzIG9yIGdhdGV3YXlzXG4gICdPcmlnaW4nLCAvLyBJbml0aWF0ZXMgYSByZXF1ZXN0IGZvciBjcm9zcy1vcmlnaW4gcmVzb3VyY2Ugc2hhcmluZyAoQ09SUylcbiAgJ1ByYWdtYScsIC8vIEltcGxlbWVudGF0aW9uLXNwZWNpZmljIGhlYWRlcnMgdGhhdCBtYXkgaGF2ZSB2YXJpb3VzIGVmZmVjdHMgYW55d2hlcmUgYWxvbmcgdGhlIHJlcXVlc3QtcmVzcG9uc2UgY2hhaW5cbiAgJ1Byb3h5LUF1dGhvcml6YXRpb24nLCAvLyBBdXRob3JpemF0aW9uIGNyZWRlbnRpYWxzIGZvciBjb25uZWN0aW5nIHRvIGEgcHJveHlcbiAgJ1JhbmdlJywgLy8gUmVxdWVzdCBhIHBvcnRpb24gb2YgYW4gZW50aXR5LCBieXRlIG9mZnNldHMgc3RhcnQgYXQgemVyb1xuICAnUmVmZXJlcicsIC8vIEFkZHJlc3Mgb2YgdGhlIHByZXZpb3VzIHdlYiBwYWdlIGZyb20gd2hpY2ggYSBsaW5rIHRvIHRoZSBjdXJyZW50bHkgcmVxdWVzdGVkIHBhZ2Ugd2FzIGZvbGxvd2VkXG4gICdURScsIC8vIEFjY2VwdGFibGUgZW5jb2RpbmdzIGZvciB0cmFuc2ZlclxuICAnVXNlci1BZ2VudCcsIC8vIEJyb3dzZXIgaWRlbnRpZmljYXRpb24gc3RyaW5nXG4gICdVcGdyYWRlJywgLy8gQXNrIHRoZSBzZXJ2ZXIgdG8gdXBncmFkZSB0byBhbm90aGVyIHByb3RvY29sXG4gICdWaWEnLCAvLyBJbmZvcm1zIHRoZSBzZXJ2ZXIgb2YgcHJveGllcyB0aHJvdWdoIHdoaWNoIHRoZSByZXF1ZXN0IHdhcyBzZW50XG4gICdXYXJuaW5nJyAvLyBHZW5lcmFsIHdhcm5pbmcgYWJvdXQgcG9zc2libGUgZXJyb3JzIGluIHRoZSBlbnRpdHkgYm9keVxuXVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVTUE9OU0VfSEVBREVSU19LRVlTID0gW1xuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgLy8g5oyH56S65ZOq5Lqb572R56uZ5Y+v5Lul5Y+C5LiO6Leo5rqQ6K6/6Zeu44CC5a6D55qE5YC85Y+v5Lul5piv5LiA5Liq5YW35L2T55qEVVJJ77yM5oiW6ICFKuihqOekuuWFgeiuuOS7u+S9leWfn+eahOiuv+mXruOAglxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsIC8vIOaMh+WumuWFgeiuuOi3qOa6kOivt+axgueahEhUVFDmlrnms5XvvIzlpoJHRVQsIFBPU1QsIFBVVOetieOAglxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsIC8vIOWcqOmihOajgOivt+axguS4reS9v+eUqO+8jOaMh+WumuWFgeiuuOeahOiHquWumuS5ieivt+axguWktOOAglxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnLCAvLyDooajnpLrmmK/lkKblhYHorrjlj5HpgIFDb29raWXjgILlj6rmnInlvZPlgLzkuLp0cnVl5pe277yM5rWP6KeI5Zmo5omN5Lya5Y+R6YCBQ29va2ll44CCXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdBY2Nlc3MtQ29udHJvbC1FeHBvc2UtSGVhZGVycycsIC8vIOWFgeiuuOa1j+iniOWZqOiuv+mXrueahOacjeWKoeerr+WTjeW6lOWktOWIl+ihqO+8jOmZpOS6huWFreS4quWfuuacrOeahOWTjeW6lOWktO+8iENhY2hlLUNvbnRyb2wsIENvbnRlbnQtTGFuZ3VhZ2UsIENvbnRlbnQtVHlwZSwgRXhwaXJlcywgTGFzdC1Nb2RpZmllZCwg5ZKMIFByYWdtYe+8ieS5i+WkluOAglxuICAnQWNjZXNzLUNvbnRyb2wtTWF4LUFnZScsIC8vICDooajnpLrpooTmo4Dor7fmsYLnmoTnu5Pmnpzog73lpJ/ooqvnvJPlrZjlpJrplb/ml7bpl7TvvIjku6Xnp5LkuLrljZXkvY3vvInjgIJcbiAgJ0FjY2VwdC1QYXRjaCcsIC8vIFNwZWNpZmllcyB0aGUgcGF0Y2ggZG9jdW1lbnQgZm9ybWF0cyBhY2NlcHRlZCBieSB0aGUgc2VydmVyXG4gICdBY2NlcHQtUmFuZ2VzJywgLy8gU3BlY2lmaWVzIHRoZSByYW5nZSBvZiBieXRlcyB0aGF0IHRoZSBzZXJ2ZXIgY2FuIGhhbmRsZVxuICAnQWdlJywgLy8gVGhlIHRpbWUsIGluIHNlY29uZHMsIHRoYXQgdGhlIG9iamVjdCBoYXMgYmVlbiBpbiBhIHByb3h5IGNhY2hlXG4gICdBbGxvdycsIC8vIFZhbGlkIGFjdGlvbnMgZm9yIGEgc3BlY2lmaWMgcmVzb3VyY2VcbiAgJ0NhY2hlLUNvbnRyb2wnLCAvLyBEaXJlY3RpdmVzIGZvciBjYWNoaW5nIG1lY2hhbmlzbXMgaW4gYm90aCByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICdDb25uZWN0aW9uJywgLy8gT3B0aW9ucyBkZXNpcmVkIGZvciB0aGUgY29ubmVjdGlvblxuICAnQ29udGVudC1EaXNwb3NpdGlvbicsIC8vIERpcmVjdHMgdGhlIGJyb3dzZXIgdG8gZGlzcGxheSB0aGUgZmlsZSBhcyBhbiBhdHRhY2htZW50IGZvciBkb3dubG9hZFxuICAnQ29udGVudC1FbmNvZGluZycsIC8vIFRoZSB0eXBlIG9mIGVuY29kaW5nIHVzZWQgb24gdGhlIGRhdGFcbiAgJ0NvbnRlbnQtTGFuZ3VhZ2UnLCAvLyBUaGUgbGFuZ3VhZ2UgdGhlIGNvbnRlbnQgaXMgaW5cbiAgJ0NvbnRlbnQtTGVuZ3RoJywgLy8gVGhlIGxlbmd0aCBvZiB0aGUgcmVzcG9uc2UgYm9keSBpbiBvY3RldHMgKDgtYml0IGJ5dGVzKVxuICAnQ29udGVudC1Mb2NhdGlvbicsIC8vIEFuIGFsdGVybmF0ZSBsb2NhdGlvbiBmb3IgdGhlIHJldHVybmVkIGRhdGFcbiAgJ0NvbnRlbnQtTUQ1JywgLy8gQSBCYXNlNjQtZW5jb2RlZCBiaW5hcnkgTUQ1IHN1bSBvZiB0aGUgY29udGVudCBvZiB0aGUgcmVzcG9uc2UgKGRlcHJlY2F0ZWQpXG4gICdDb250ZW50LVJhbmdlJywgLy8gV2hlcmUgaW4gdGhlIGZ1bGwgY29udGVudCB0aGlzIHBhcnRpYWwgbWVzc2FnZSBiZWxvbmdzXG4gICdDb250ZW50LVR5cGUnLCAvLyBUaGUgTUlNRSB0eXBlIG9mIHRoaXMgY29udGVudFxuICAnRGF0ZScsIC8vIFRoZSBkYXRlIGFuZCB0aW1lIGF0IHdoaWNoIHRoZSBtZXNzYWdlIHdhcyBzZW50XG4gICdFVGFnJywgLy8gQW4gaWRlbnRpZmllciBmb3IgYSBzcGVjaWZpYyB2ZXJzaW9uIG9mIGEgcmVzb3VyY2VcbiAgJ0V4cGlyZXMnLCAvLyBUaGUgZGF0ZS90aW1lIGFmdGVyIHdoaWNoIHRoZSByZXNwb25zZSBpcyBjb25zaWRlcmVkIHN0YWxlXG4gICdMYXN0LU1vZGlmaWVkJywgLy8gVGhlIGxhc3QgbW9kaWZpY2F0aW9uIGRhdGUgb2YgdGhlIHJlc291cmNlIHRoYXQgd2FzIHJlcXVlc3RlZFxuICAnTGluaycsIC8vIFVzZWQgdG8gZXhwcmVzcyBhIHR5cGVkIHJlbGF0aW9uc2hpcCB3aXRoIGFub3RoZXIgcmVzb3VyY2VcbiAgJ0xvY2F0aW9uJywgLy8gVXNlZCBpbiByZWRpcmVjdGlvbiwgb3Igd2hlbiBhIG5ldyByZXNvdXJjZSBoYXMgYmVlbiBjcmVhdGVkXG4gICdQM1AnLCAvLyBQM1AgcG9saWN5XG4gICdQcmFnbWEnLCAvLyBJbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBoZWFkZXJzIHRoYXQgbWF5IGhhdmUgdmFyaW91cyBlZmZlY3RzXG4gICdQcm94eS1BdXRoZW50aWNhdGUnLCAvLyBSZXF1ZXN0IGZvciBhdXRoZW50aWNhdGlvbiB0byBhY2Nlc3MgdGhlIHByb3h5XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdQdWJsaWMtS2V5LVBpbnMnLCAvLyBIVFRQIFB1YmxpYyBLZXkgUGlubmluZywgdXNlZCB0byBjb252ZXkgYSBjb21taXRtZW50IHRvIGEgY3J5cHRvZ3JhcGhpYyBpZGVudGl0eSBmb3IgYSBjZXJ0YWluIHBlcmlvZCBvZiB0aW1lXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdSZWZyZXNoJywgLy8gVXNlZCBmb3IgcmVkaXJlY3Rpb24gb3Igd2hlbiBhIG5ldyByZXNvdXJjZSBoYXMgYmVlbiBjcmVhdGVkIGFuZCBzaG91bGQgYmUgcmV0cmlldmVkIGFmdGVyIGEgY2VydGFpbiB0aW1lIGludGVydmFsXG4gICdSZXRyeS1BZnRlcicsIC8vIEluZGljYXRlcyBob3cgbG9uZyB0aGUgdXNlciBhZ2VudCBzaG91bGQgd2FpdCBiZWZvcmUgbWFraW5nIGEgZm9sbG93LXVwIHJlcXVlc3RcbiAgJ1NlcnZlcicsIC8vIEEgbmFtZSBmb3IgdGhlIHNlcnZlclxuICAnU2V0LUNvb2tpZScsIC8vIEFuIEhUVFAgY29va2llXG4gICdTdGF0dXMnLCAvLyBDR0kgaGVhZGVyIGZpZWxkIHVzZWQgdG8gZGVmaW5lIHRoZSBzdGF0dXMgb2YgYSBIVFRQIHJlc3BvbnNlXG4gICdUcmFpbGVyJywgLy8gVGhlIGhlYWRlciBmaWVsZHMgcHJlc2VudCBpbiB0aGUgdHJhaWxlciBvZiBhIG1lc3NhZ2UgZW5jb2RlZCB3aXRoIGNodW5rZWQgdHJhbnNmZXItY29kaW5nXG4gICdUcmFuc2Zlci1FbmNvZGluZycsIC8vIFRoZSBmb3JtIG9mIGVuY29kaW5nIHVzZWQgdG8gc2FmZWx5IHRyYW5zZmVyIHRoZSBlbnRpdHkgdG8gdGhlIHVzZXJcbiAgJ1VwZ3JhZGUnLCAvLyBBc2sgdGhlIGNsaWVudCB0byBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgcHJvdG9jb2xcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgJ1ZhcnknLCAvLyBUZWxscyBkb3duc3RyZWFtIHByb3hpZXMgaG93IHRvIG1hdGNoIGZ1dHVyZSByZXF1ZXN0IGhlYWRlcnMgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIGNhY2hlZCByZXNwb25zZSBjYW4gYmUgdXNlZCByYXRoZXIgdGhhbiByZXF1ZXN0aW5nIGEgZnJlc2ggb25lIGZyb20gdGhlIG9yaWdpbiBzZXJ2ZXJcbiAgJ1ZpYScsIC8vIEluZm9ybXMgdGhlIGNsaWVudCBvZiBwcm94aWVzIHRocm91Z2ggd2hpY2ggdGhlIHJlc3BvbnNlIHdhcyBzZW50XG4gICdXYXJuaW5nJywgLy8gQSBnZW5lcmFsIHdhcm5pbmcgYWJvdXQgcG9zc2libGUgcHJvYmxlbXMgd2l0aCB0aGUgZW50aXR5IGJvZHlcbiAgJ1dXVy1BdXRoZW50aWNhdGUnIC8vIEluZGljYXRlcyB0aGUgYXV0aGVudGljYXRpb24gc2NoZW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSByZXF1ZXN0ZWQgZW50aXR5XG5dXG5leHBvcnQgZGVmYXVsdCB7XG4gIFBST1hZX1JPVVRFX0tFWSxcbiAgTU9DS19UWVBFLFxuICBNT0NLX1RZUEVfRElDVCxcbiAgTU9DS19UWVBFX09QVElPTlMsXG4gIE1BVENIX1RZUEUsXG4gIEhUVFBfU1RBVFVTX0NPREUsXG4gIE1FU1NBR0VfVFlQRVMsXG4gIEdMT0JBTF9WQVJJQUJMRV9NQVBcbn1cbiIsImV4cG9ydCBjb25zdCBsb2cgPSAoZGF0YSkgPT4gY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKGBjb25zb2xlLmxvZygnJHtKU09OLnN0cmluZ2lmeShkYXRhKX0nKWApXG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RGljdFRvQXJyYXkoXG4gIGRpY3Q6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgfSxcbiAgY29uZmlnOiBzdHJpbmdbXSA9IFsndmFsdWUnLCAnbGFiZWwnXVxuKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVtdIHtcbiAgY29uc3QgW2tleU5hbWUgPSAndmFsdWUnLCB2YWx1ZU5hbWUgPSAnbGFiZWwnXSA9IGNvbmZpZ1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZGljdCkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XG4gICAgW2tleU5hbWVdOiBrZXksXG4gICAgW3ZhbHVlTmFtZV06IHZhbHVlXG4gIH0pKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGpvaW50VXJsKHVybCkge1xuICB0cnkge1xuICAgIC8vIOWwneivleWIm+W7uuS4gOS4qlVSTOWvueixoVxuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwodXJsKVxuXG4gICAgLy8g5qOA5p+l5Y2P6K6u5piv5ZCm5Li6aHR0cOaIlmh0dHBzXG4gICAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHA6JyB8fCBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonKSB7XG4gICAgICByZXR1cm4gdXJsIC8vIOi/lOWbnuWOn1VSTO+8jOWboOS4uuWug+aYr+S4gOS4quacieaViOeahEhUVFAoUynlnLDlnYBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHByb3RvY29sJykgLy8g5oqb5Ye66ZSZ6K+v77yM5aSE55CG6Z2eSFRUUChTKeWNj+iurlxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyDlpoLmnpxVUkzmnoTpgKDlpLHotKXmiJbljY/orq7kuI3mraPnoa7vvIzliJnov5Tlm57kv67mraPlkI7nmoRVUkxcbiAgICByZXR1cm4gbG9jYXRpb24ub3JpZ2luICsgdXJsXG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Ub3AoYXJyLCBpbmRleCkge1xuICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGFyci5sZW5ndGgpIHtcbiAgICAvLyDku47mjIflrprntKLlvJXkvY3nva7np7vpmaTlhYPntKBcbiAgICBjb25zdCBbaXRlbV0gPSBhcnIuc3BsaWNlKGluZGV4LCAxKVxuICAgIC8vIOWwhuivpeWFg+e0oOaPkuWFpeWIsOaVsOe7hOeahOW8gOWktFxuICAgIGFyci51bnNoaWZ0KGl0ZW0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHREZWNyeXB0KGlucHV0OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gIC8vIOWwhui+k+WFpeWtl+espuS4sui9rOaNouS4uuWtl+espueggeaVsOe7hFxuICBjb25zdCBpbnB1dENoYXJzID0gQXJyYXkuZnJvbShpbnB1dCkubWFwKChjaGFyKSA9PiBjaGFyLmNoYXJDb2RlQXQoMCkpXG5cbiAgLy8g55Sf5oiQ5a+G6ZKl55qE5a2X56ym56CB5pWw57uEXG4gIGNvbnN0IGtleUNoYXJzID0gQXJyYXkuZnJvbShrZXkpLm1hcCgoY2hhcikgPT4gY2hhci5jaGFyQ29kZUF0KDApKVxuXG4gIC8vIOaJp+ihjOW8guaIluWKoOWvhuaIluino+WvhlxuICBjb25zdCBvdXRwdXQgPSBpbnB1dENoYXJzLm1hcCgoY2hhciwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyIF4ga2V5Q2hhcnNbaW5kZXggJSBrZXlDaGFycy5sZW5ndGhdKVxuICB9KVxuXG4gIC8vIOWwhuWtl+espuaVsOe7hOi9rOaNouWbnuWtl+espuS4slxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbi8vIHR5cGUgSlNPTlZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IEpTT05PYmplY3QgfCBKU09OQXJyYXlcbi8vIGludGVyZmFjZSBKU09OT2JqZWN0IHtcbi8vICAgW2tleTogc3RyaW5nXTogSlNPTlZhbHVlXG4vLyB9XG4vLyBpbnRlcmZhY2UgSlNPTkFycmF5IGV4dGVuZHMgQXJyYXk8SlNPTlZhbHVlPiB7fVxuXG4vLyBmdW5jdGlvbiBqc29uVG9UeXBlU2NyaXB0VHlwZShqc29uOiBKU09OVmFsdWUsIHR5cGVOYW1lOiBzdHJpbmcgPSAnUm9vdCcpOiBzdHJpbmcge1xuLy8gICBpZiAodHlwZW9mIGpzb24gPT09ICdzdHJpbmcnKSB7XG4vLyAgICAgcmV0dXJuICdzdHJpbmcnXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb24gPT09ICdudW1iZXInKSB7XG4vLyAgICAgcmV0dXJuICdudW1iZXInXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb24gPT09ICdib29sZWFuJykge1xuLy8gICAgIHJldHVybiAnYm9vbGVhbidcbi8vICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4vLyAgICAgaWYgKGpzb24ubGVuZ3RoID09PSAwKSB7XG4vLyAgICAgICByZXR1cm4gJ2FueVtdJ1xuLy8gICAgIH1cbi8vICAgICBjb25zdCBhcnJheVR5cGUgPSBqc29uVG9UeXBlU2NyaXB0VHlwZShqc29uWzBdKVxuLy8gICAgIHJldHVybiBgJHthcnJheVR5cGV9W11gXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb24gPT09ICdvYmplY3QnICYmIGpzb24gIT09IG51bGwpIHtcbi8vICAgICBsZXQgcmVzdWx0ID0gYGludGVyZmFjZSAke3R5cGVOYW1lfSB7XFxuYFxuLy8gICAgIGZvciAoY29uc3Qga2V5IGluIGpzb24pIHtcbi8vICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IGpzb25Ub1R5cGVTY3JpcHRUeXBlKGpzb25ba2V5XSwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGtleSkpXG4vLyAgICAgICByZXN1bHQgKz0gYCAgJHtrZXl9OiAke3ZhbHVlVHlwZX07XFxuYFxuLy8gICAgIH1cbi8vICAgICByZXN1bHQgKz0gJ30nXG4vLyAgICAgcmV0dXJuIHJlc3VsdFxuLy8gICB9IGVsc2Uge1xuLy8gICAgIHJldHVybiAnYW55J1xuLy8gICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4vLyAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSlcbi8vIH1cblxuLy8gLy8g56S65L6L55So5rOVXG4vLyBjb25zdCBqc29uRGF0YSA9IHtcbi8vICAgbmFtZTogJ0pvaG4nLFxuLy8gICBhZ2U6IDMwLFxuLy8gICBpc1N0dWRlbnQ6IGZhbHNlLFxuLy8gICBjb3Vyc2VzOiBbJ01hdGgnLCAnU2NpZW5jZSddLFxuLy8gICBhZGRyZXNzOiB7XG4vLyAgICAgc3RyZWV0OiAnMTIzIE1haW4gU3QnLFxuLy8gICAgIGNpdHk6ICdBbnl0b3duJ1xuLy8gICB9XG4vLyB9XG5cbi8vIGNvbnN0IHR5cGVTY3JpcHRUeXBlID0ganNvblRvVHlwZVNjcmlwdFR5cGUoanNvbkRhdGEpXG4vLyBjb25zb2xlLmxvZyh0eXBlU2NyaXB0VHlwZSlcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29udmVydERpY3RUb0FycmF5LFxuICBsb2csXG4gIGpvaW50VXJsLFxuICBtb3ZlVG9Ub3Bcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5leHBvcnQgZW51bSBIVFRQX1NUQVRVU19DT0RFIHtcbiAgQ09OVElOVUUgPSAxMDAsXG4gIFNXSVRDSElOR19QUk9UT0NPTFMgPSAxMDEsXG4gIFBST0NFU1NJTkcgPSAxMDIsXG5cbiAgT0sgPSAyMDAsXG4gIENSRUFURUQgPSAyMDEsXG4gIEFDQ0VQVEVEID0gMjAyLFxuICBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTiA9IDIwMyxcbiAgTk9fQ09OVEVOVCA9IDIwNCxcbiAgUkVTRVRfQ09OVEVOVCA9IDIwNSxcbiAgUEFSVElBTF9DT05URU5UID0gMjA2LFxuXG4gIE1VTFRJX1NUQVRVUyA9IDIwNyxcbiAgQUxSRUFEWV9SRVBPUlRFRCA9IDIwOCxcblxuICBJTV9VU0VEID0gMjI2LFxuXG4gIE1VTFRJUExFX0NIT0lDRVMgPSAzMDAsXG4gIE1PVkVEX1BFUk1BTkVOVExZID0gMzAxLFxuICBGT1VORCA9IDMwMixcbiAgU0VFX09USEVSID0gMzAzLFxuICBOT1RfTU9ESUZJRUQgPSAzMDQsXG4gIFVTRV9QUk9YWSA9IDMwNSxcbiAgVEVNUE9SQVJZX1JFRElSRUNUID0gMzA3LFxuICBQRVJNQU5FTlRfUkVESVJFQ1QgPSAzMDgsXG5cbiAgQkFEX1JFUVVFU1QgPSA0MDAsXG4gIFVOQVVUSE9SSVpFRCA9IDQwMSxcbiAgUEFZTUVOVF9SRVFVSVJFRCA9IDQwMixcbiAgRk9SQklEREVOID0gNDAzLFxuICBOT1RfRk9VTkQgPSA0MDQsXG4gIE1FVEhPRF9OT1RfQUxMT1dFRCA9IDQwNSxcbiAgTk9UX0FDQ0VQVEFCTEUgPSA0MDYsXG4gIFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEID0gNDA3LFxuICBSRVFVRVNUX1RJTUVPVVQgPSA0MDgsXG4gIENPTkZMSUNUID0gNDA5LFxuICBHT05FID0gNDEwLFxuICBMRU5HVEhfUkVRVUlSRUQgPSA0MTEsXG4gIFBSRUNPTkRJVElPTl9GQUlMRUQgPSA0MTIsXG4gIFBBWUxPQURfVE9PX0xBUkdFID0gNDEzLFxuICBVUklfVE9PX0xPTkcgPSA0MTQsXG4gIFVOU1VQUE9SVEVEX01FRElBX1RZUEUgPSA0MTUsXG4gIFJBTkdFX05PVF9TQVRJU0ZJQUJMRSA9IDQxNixcbiAgRVhQRUNUQVRJT05fRkFJTEVEID0gNDE3LFxuICBJX0FNX0FfVEVBUE9UID0gNDE4LFxuICBNSVNESVJFQ1RFRF9SRVFVRVNUID0gNDIxLFxuICBVTlBST0NFU1NBQkxFX0VOVElUWSA9IDQyMixcbiAgTE9DS0VEID0gNDIzLFxuICBGQUlMRURfREVQRU5ERU5DWSA9IDQyNCxcbiAgVVBHUkFERV9SRVFVSVJFRCA9IDQyNixcbiAgUFJFQ09ORElUSU9OX1JFUVVJUkVEID0gNDI4LFxuICBUT09fTUFOWV9SRVFVRVNUUyA9IDQyOSxcbiAgUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRSA9IDQzMSxcbiAgVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMgPSA0NTEsXG5cbiAgSU5URVJOQUxfU0VSVkVSX0VSUk9SID0gNTAwLFxuICBOT1RfSU1QTEVNRU5URUQgPSA1MDEsXG4gIEJBRF9HQVRFV0FZID0gNTAyLFxuICBTRVJWSUNFX1VOQVZBSUxBQkxFID0gNTAzLFxuICBHQVRFV0FZX1RJTUVPVVQgPSA1MDQsXG4gIEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEID0gNTA1LFxuICBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUyA9IDUwNixcbiAgSU5TVUZGSUNJRU5UX1NUT1JBR0UgPSA1MDcsXG4gIExPT1BfREVURUNURUQgPSA1MDgsXG4gIE5PVF9FWFRFTkRFRCA9IDUxMCxcbiAgTkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRCA9IDUxMVxufVxuZXhwb3J0IGNvbnN0IEhUVFBfU1RBVFVTX0NPREVfRElDVCA9IHtcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ09OVElOVUVdOiBcIkNvbnRpbnVlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNXSVRDSElOR19QUk9UT0NPTFNdOiBcIlN3aXRjaGluZyBQcm90b2NvbHNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJPQ0VTU0lOR106IFwiUHJvY2Vzc2luZ1wiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk9LXTogXCJPS1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5DUkVBVEVEXTogXCJDcmVhdGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkFDQ0VQVEVEXTogXCJBY2NlcHRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTl06IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9fQ09OVEVOVF06IFwiTm8gQ29udGVudFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SRVNFVF9DT05URU5UXTogXCJSZXNldCBDb250ZW50XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBBUlRJQUxfQ09OVEVOVF06IFwiUGFydGlhbCBDb250ZW50XCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuTVVMVElfU1RBVFVTXTogXCJNdWx0aS1TdGF0dXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQUxSRUFEWV9SRVBPUlRFRF06IFwiQWxyZWFkeSBSZXBvcnRlZFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1VTFRJUExFX0NIT0lDRVNdOiBcIk11bHRpcGxlIENob2ljZXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTU9WRURfUEVSTUFORU5UTFldOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZPVU5EXTogXCJGb3VuZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TRUVfT1RIRVJdOiBcIlNlZSBPdGhlclwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfTU9ESUZJRURdOiBcIk5vdCBNb2RpZmllZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VU0VfUFJPWFldOiBcIlVzZSBQcm94eVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5URU1QT1JBUllfUkVESVJFQ1RdOiBcIlRlbXBvcmFyeSBSZWRpcmVjdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QRVJNQU5FTlRfUkVESVJFQ1RdOiBcIlBlcm1hbmVudCBSZWRpcmVjdFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLkJBRF9SRVFVRVNUXTogXCJCYWQgUmVxdWVzdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTkFVVEhPUklaRURdOiBcIlVuYXV0aG9yaXplZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVlNRU5UX1JFUVVJUkVEXTogXCJQYXltZW50IFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZPUkJJRERFTl06IFwiRm9yYmlkZGVuXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9GT1VORF06IFwiTm90IEZvdW5kXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1FVEhPRF9OT1RfQUxMT1dFRF06IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9BQ0NFUFRBQkxFXTogXCJOb3QgQWNjZXB0YWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRF06IFwiUHJveHkgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkVRVUVTVF9USU1FT1VUXTogXCJSZXF1ZXN0IFRpbWVvdXRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ09ORkxJQ1RdOiBcIkNvbmZsaWN0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkdPTkVdOiBcIkdvbmVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTEVOR1RIX1JFUVVJUkVEXTogXCJMZW5ndGggUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJFQ09ORElUSU9OX0ZBSUxFRF06IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVlMT0FEX1RPT19MQVJHRV06IFwiUGF5bG9hZCBUb28gTGFyZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVVJJX1RPT19MT05HXTogXCJVUkkgVG9vIExvbmdcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5TVVBQT1JURURfTUVESUFfVFlQRV06IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SQU5HRV9OT1RfU0FUSVNGSUFCTEVdOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5FWFBFQ1RBVElPTl9GQUlMRURdOiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5JX0FNX0FfVEVBUE9UXTogXCJJJ20gYSB0ZWFwb3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTUlTRElSRUNURURfUkVRVUVTVF06IFwiTWlzZGlyZWN0ZWQgUmVxdWVzdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTlBST0NFU1NBQkxFX0VOVElUWV06IFwiVW5wcm9jZXNzYWJsZSBFbnRpdHlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTE9DS0VEXTogXCJMb2NrZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRkFJTEVEX0RFUEVOREVOQ1ldOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVQR1JBREVfUkVRVUlSRURdOiBcIlVwZ3JhZGUgUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJFQ09ORElUSU9OX1JFUVVJUkVEXTogXCJQcmVjb25kaXRpb24gUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVE9PX01BTllfUkVRVUVTVFNdOiBcIlRvbyBNYW55IFJlcXVlc3RzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VdOiBcIlJlcXVlc3QgSGVhZGVyIEZpZWxkcyBUb28gTGFyZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlNdOiBcIlVuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zXCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuSU5URVJOQUxfU0VSVkVSX0VSUk9SXTogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0lNUExFTUVOVEVEXTogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQkFEX0dBVEVXQVldOiBcIkJhZCBHYXRld2F5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNFUlZJQ0VfVU5BVkFJTEFCTEVdOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuR0FURVdBWV9USU1FT1VUXTogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURURdOiBcIkhUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlZBUklBTlRfQUxTT19ORUdPVElBVEVTXTogXCJWYXJpYW50IEFsc28gTmVnb3RpYXRlc1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5JTlNVRkZJQ0lFTlRfU1RPUkFHRV06IFwiSW5zdWZmaWNpZW50IFN0b3JhZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTE9PUF9ERVRFQ1RFRF06IFwiTG9vcCBEZXRlY3RlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfRVhURU5ERURdOiBcIk5vdCBFeHRlbmRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5ORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEXTogXCJOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIEhUVFBfU1RBVFVTX0NPREUsXG4gIEhUVFBfU1RBVFVTX0NPREVfRElDVFxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiQHBsYXNtb2hxL3N0b3JhZ2VcIlxyXG5cclxuZXhwb3J0IGVudW0gU1RPUkVfS0VZIHtcclxuICBST1VURVMgPSAncm91dGVzJyxcclxuICBHTE9CQUxfU1dJVENIX0NPTkZJRyA9ICdnbG9iYWxTd2l0Y2hDb25maWcnLFxyXG4gIExPQURJTkcgPSAnbG9hZGluZycsXHJcbiAgR1JPVVBTID0gJ2dyb3VwcycsXHJcbiAgR1JPVVBTX01BUCA9ICdncm91cHNNYXAnLFxyXG59XHJcbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JhZ2Uoe1xyXG4gIGFyZWE6IFwic3luY1wiLFxyXG4gIGNvcGllZEtleUxpc3Q6IFtdLFxyXG59KVxyXG5cclxuc3RvcmUud2F0Y2goe1xyXG4gIFtTVE9SRV9LRVkuR1JPVVBTXTogKGMpID0+IHtcclxuICAgIGNvbnN0IG1hcCA9IHt9O1xyXG4gICAgKGM/Lm5ld1ZhbHVlIHx8IFtdKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBtYXBbZWxlbWVudC52YWx1ZV0gPSBlbGVtZW50LmxhYmVsXHJcbiAgICB9KTtcclxuICAgIHN0b3JlLnNldChTVE9SRV9LRVkuR1JPVVBTX01BUCwgbWFwKVxyXG4gIH0sXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yZSIsImltcG9ydCB5IGZyb21cInBpZnlcIjt2YXIgbD0oKT0+e3RyeXtsZXQgZT0oZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudCkubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKXx8W107aWYoZVsxXT09PVwiQ2hyb21lXCIpcmV0dXJuIHBhcnNlSW50KGVbMl0pPDEwMHx8Z2xvYmFsVGhpcy5jaHJvbWUucnVudGltZT8uZ2V0TWFuaWZlc3QoKT8ubWFuaWZlc3RfdmVyc2lvbj09PTJ9Y2F0Y2h7cmV0dXJuITF9cmV0dXJuITF9O3ZhciBvPWNsYXNzeyNhOyNlO2dldCBwcmltYXJ5Q2xpZW50KCl7cmV0dXJuIHRoaXMuI2V9I3Q7Z2V0IHNlY29uZGFyeUNsaWVudCgpe3JldHVybiB0aGlzLiN0fSNyO2dldCBhcmVhKCl7cmV0dXJuIHRoaXMuI3J9Z2V0IGhhc1dlYkFwaSgpe3RyeXtyZXR1cm4gdHlwZW9mIHdpbmRvdzxcInVcIiYmISF3aW5kb3cubG9jYWxTdG9yYWdlfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmVycm9yKGUpLCExfX0jcz1uZXcgTWFwOyNpO2dldCBjb3BpZWRLZXlTZXQoKXtyZXR1cm4gdGhpcy4jaX1pc0NvcGllZD1lPT50aGlzLmhhc1dlYkFwaSYmKHRoaXMuYWxsQ29waWVkfHx0aGlzLmNvcGllZEtleVNldC5oYXMoZSkpOyNuPSExO2dldCBhbGxDb3BpZWQoKXtyZXR1cm4gdGhpcy4jbn1nZXRFeHRTdG9yYWdlQXBpPSgpPT5nbG9iYWxUaGlzLmJyb3dzZXI/LnN0b3JhZ2V8fGdsb2JhbFRoaXMuY2hyb21lPy5zdG9yYWdlO2dldCBoYXNFeHRlbnNpb25BcGkoKXt0cnl7cmV0dXJuISF0aGlzLmdldEV4dFN0b3JhZ2VBcGkoKX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5lcnJvcihlKSwhMX19aXNXYXRjaFN1cHBvcnRlZD0oKT0+dGhpcy5oYXNFeHRlbnNpb25BcGk7a2V5TmFtZXNwYWNlPVwiXCI7aXNWYWxpZEtleT1lPT5lLnN0YXJ0c1dpdGgodGhpcy5rZXlOYW1lc3BhY2UpO2dldE5hbWVzcGFjZWRLZXk9ZT0+YCR7dGhpcy5rZXlOYW1lc3BhY2V9JHtlfWA7Z2V0VW5uYW1lc3BhY2VkS2V5PWU9PmUuc2xpY2UodGhpcy5rZXlOYW1lc3BhY2UubGVuZ3RoKTtjb25zdHJ1Y3Rvcih7YXJlYTplPVwic3luY1wiLGFsbENvcGllZDp0PSExLGNvcGllZEtleUxpc3Q6cz1bXX09e30pe3RoaXMuc2V0Q29waWVkS2V5U2V0KHMpLHRoaXMuI3I9ZSx0aGlzLiNuPXQ7dHJ5e3RoaXMuaGFzV2ViQXBpJiYodHx8cy5sZW5ndGg+MCkmJih0aGlzLiN0PXdpbmRvdy5sb2NhbFN0b3JhZ2UpfWNhdGNoe310cnl7dGhpcy5oYXNFeHRlbnNpb25BcGkmJih0aGlzLiNhPXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpLGwoKT90aGlzLiNlPXkodGhpcy4jYVt0aGlzLmFyZWFdLHtleGNsdWRlOltcImdldEJ5dGVzSW5Vc2VcIl0sZXJyb3JGaXJzdDohMX0pOnRoaXMuI2U9dGhpcy4jYVt0aGlzLmFyZWFdKX1jYXRjaHt9fXNldENvcGllZEtleVNldChlKXt0aGlzLiNpPW5ldyBTZXQoZSl9cmF3R2V0QWxsPSgpPT50aGlzLiNlPy5nZXQoKTtnZXRBbGw9YXN5bmMoKT0+e2xldCBlPWF3YWl0IHRoaXMucmF3R2V0QWxsKCk7cmV0dXJuIE9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW3RdKT0+dGhpcy5pc1ZhbGlkS2V5KHQpKS5yZWR1Y2UoKHQsW3MsYV0pPT4odFt0aGlzLmdldFVubmFtZXNwYWNlZEtleShzKV09YSx0KSx7fSl9O2NvcHk9YXN5bmMgZT0+e2xldCB0PWU9PT12b2lkIDA7aWYoIXQmJiF0aGlzLmNvcGllZEtleVNldC5oYXMoZSl8fCF0aGlzLmFsbENvcGllZHx8IXRoaXMuaGFzRXh0ZW5zaW9uQXBpKXJldHVybiExO2xldCBzPXRoaXMuYWxsQ29waWVkP2F3YWl0IHRoaXMucmF3R2V0QWxsKCk6YXdhaXQgdGhpcy4jZS5nZXQoKHQ/Wy4uLnRoaXMuY29waWVkS2V5U2V0XTpbZV0pLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpKTtpZighcylyZXR1cm4hMTtsZXQgYT0hMTtmb3IobGV0IHIgaW4gcyl7bGV0IGk9c1tyXSxuPXRoaXMuI3Q/LmdldEl0ZW0ocik7dGhpcy4jdD8uc2V0SXRlbShyLGkpLGF8fD1pIT09bn1yZXR1cm4gYX07cmF3R2V0PWFzeW5jIGU9PnRoaXMuaGFzRXh0ZW5zaW9uQXBpPyhhd2FpdCB0aGlzLiNlLmdldChlKSlbZV06dGhpcy5pc0NvcGllZChlKT90aGlzLiN0Py5nZXRJdGVtKGUpOm51bGw7cmF3U2V0PWFzeW5jKGUsdCk9Pih0aGlzLmlzQ29waWVkKGUpJiZ0aGlzLiN0Py5zZXRJdGVtKGUsdCksdGhpcy5oYXNFeHRlbnNpb25BcGkmJmF3YWl0IHRoaXMuI2Uuc2V0KHtbZV06dH0pLG51bGwpO2NsZWFyPWFzeW5jKGU9ITEpPT57ZSYmdGhpcy4jdD8uY2xlYXIoKSxhd2FpdCB0aGlzLiNlLmNsZWFyKCl9O3Jhd1JlbW92ZT1hc3luYyBlPT57dGhpcy5pc0NvcGllZChlKSYmdGhpcy4jdD8ucmVtb3ZlSXRlbShlKSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jZS5yZW1vdmUoZSl9O3JlbW92ZUFsbD1hc3luYygpPT57bGV0IGU9YXdhaXQgdGhpcy5nZXRBbGwoKSx0PU9iamVjdC5rZXlzKGUpO2F3YWl0IFByb21pc2UuYWxsKHQubWFwKHRoaXMucmVtb3ZlKSl9O3dhdGNoPWU9PntsZXQgdD10aGlzLmlzV2F0Y2hTdXBwb3J0ZWQoKTtyZXR1cm4gdCYmdGhpcy4jbyhlKSx0fTsjbz1lPT57Zm9yKGxldCB0IGluIGUpe2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleSh0KSxhPXRoaXMuI3MuZ2V0KHMpPy5jYWxsYmFja1NldHx8bmV3IFNldDtpZihhLmFkZChlW3RdKSxhLnNpemU+MSljb250aW51ZTtsZXQgcj0oaSxuKT0+e2lmKG4hPT10aGlzLmFyZWF8fCFpW3NdKXJldHVybjtsZXQgaD10aGlzLiNzLmdldChzKTtpZighaCl0aHJvdyBuZXcgRXJyb3IoYFN0b3JhZ2UgY29tbXMgZG9lcyBub3QgZXhpc3QgZm9yIG5zS2V5OiAke3N9YCk7UHJvbWlzZS5hbGwoW3RoaXMucGFyc2VWYWx1ZShpW3NdLm5ld1ZhbHVlKSx0aGlzLnBhcnNlVmFsdWUoaVtzXS5vbGRWYWx1ZSldKS50aGVuKChbcCxkXSk9Pntmb3IobGV0IG0gb2YgaC5jYWxsYmFja1NldCltKHtuZXdWYWx1ZTpwLG9sZFZhbHVlOmR9LG4pfSl9O3RoaXMuI2Eub25DaGFuZ2VkLmFkZExpc3RlbmVyKHIpLHRoaXMuI3Muc2V0KHMse2NhbGxiYWNrU2V0OmEsbGlzdGVuZXI6cn0pfX07dW53YXRjaD1lPT57bGV0IHQ9dGhpcy5pc1dhdGNoU3VwcG9ydGVkKCk7cmV0dXJuIHQmJnRoaXMuI2MoZSksdH07I2MoZSl7Zm9yKGxldCB0IGluIGUpe2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleSh0KSxhPWVbdF0scj10aGlzLiNzLmdldChzKTtyJiYoci5jYWxsYmFja1NldC5kZWxldGUoYSksci5jYWxsYmFja1NldC5zaXplPT09MCYmKHRoaXMuI3MuZGVsZXRlKHMpLHRoaXMuI2Eub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKHIubGlzdGVuZXIpKSl9fXVud2F0Y2hBbGw9KCk9PnRoaXMuI2goKTsjaCgpe3RoaXMuI3MuZm9yRWFjaCgoe2xpc3RlbmVyOmV9KT0+dGhpcy4jYS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoZSkpLHRoaXMuI3MuY2xlYXIoKX1hc3luYyBnZXRJdGVtKGUpe3JldHVybiB0aGlzLmdldChlKX1hc3luYyBzZXRJdGVtKGUsdCl7YXdhaXQgdGhpcy5zZXQoZSx0KX1hc3luYyByZW1vdmVJdGVtKGUpe3JldHVybiB0aGlzLnJlbW92ZShlKX19LGc9Y2xhc3MgZXh0ZW5kcyBve2dldD1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpLHM9YXdhaXQgdGhpcy5yYXdHZXQodCk7cmV0dXJuIHRoaXMucGFyc2VWYWx1ZShzKX07c2V0PWFzeW5jKGUsdCk9PntsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSksYT1KU09OLnN0cmluZ2lmeSh0KTtyZXR1cm4gdGhpcy5yYXdTZXQocyxhKX07cmVtb3ZlPWFzeW5jIGU9PntsZXQgdD10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSk7cmV0dXJuIHRoaXMucmF3UmVtb3ZlKHQpfTtzZXROYW1lc3BhY2U9ZT0+e3RoaXMua2V5TmFtZXNwYWNlPWV9O3BhcnNlVmFsdWU9YXN5bmMgZT0+e3RyeXtpZihlIT09dm9pZCAwKXJldHVybiBKU09OLnBhcnNlKGUpfWNhdGNoKHQpe2NvbnNvbGUuZXJyb3IodCl9fX07ZXhwb3J0e28gYXMgQmFzZVN0b3JhZ2UsZyBhcyBTdG9yYWdlfTtcbiIsImNvbnN0IHByb2Nlc3NGdW5jdGlvbiA9IChmdW5jdGlvbl8sIG9wdGlvbnMsIHByb3h5LCB1bndyYXBwZWQpID0+IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdGNvbnN0IFAgPSBvcHRpb25zLnByb21pc2VNb2R1bGU7XG5cblx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRpZiAob3B0aW9ucy5tdWx0aUFyZ3MpIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaCgoLi4ucmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChvcHRpb25zLmVycm9yRmlyc3QpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0WzBdKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QocmVzdWx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnNoaWZ0KCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLmVycm9yRmlyc3QpIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaCgoZXJyb3IsIHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaChyZXNvbHZlKTtcblx0XHR9XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcyA9PT0gcHJveHkgPyB1bndyYXBwZWQgOiB0aGlzO1xuXHRcdFJlZmxlY3QuYXBwbHkoZnVuY3Rpb25fLCBzZWxmLCBhcmd1bWVudHNfKTtcblx0fSk7XG59O1xuXG5jb25zdCBmaWx0ZXJDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpZnkoaW5wdXQsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IHtcblx0XHRleGNsdWRlOiBbLy4rKD86U3luY3xTdHJlYW0pJC9dLFxuXHRcdGVycm9yRmlyc3Q6IHRydWUsXG5cdFx0cHJvbWlzZU1vZHVsZTogUHJvbWlzZSxcblx0XHQuLi5vcHRpb25zLFxuXHR9O1xuXG5cdGNvbnN0IG9iamVjdFR5cGUgPSB0eXBlb2YgaW5wdXQ7XG5cdGlmICghKGlucHV0ICE9PSBudWxsICYmIChvYmplY3RUeXBlID09PSAnb2JqZWN0JyB8fCBvYmplY3RUeXBlID09PSAnZnVuY3Rpb24nKSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBpbnB1dFxcYCB0byBiZSBhIFxcYEZ1bmN0aW9uXFxgIG9yIFxcYE9iamVjdFxcYCwgZ290IFxcYCR7aW5wdXQgPT09IG51bGwgPyAnbnVsbCcgOiBvYmplY3RUeXBlfVxcYGApO1xuXHR9XG5cblx0Y29uc3QgZmlsdGVyID0gKHRhcmdldCwga2V5KSA9PiB7XG5cdFx0bGV0IGNhY2hlZCA9IGZpbHRlckNhY2hlLmdldCh0YXJnZXQpO1xuXG5cdFx0aWYgKCFjYWNoZWQpIHtcblx0XHRcdGNhY2hlZCA9IHt9O1xuXHRcdFx0ZmlsdGVyQ2FjaGUuc2V0KHRhcmdldCwgY2FjaGVkKTtcblx0XHR9XG5cblx0XHRpZiAoa2V5IGluIGNhY2hlZCkge1xuXHRcdFx0cmV0dXJuIGNhY2hlZFtrZXldO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1hdGNoID0gcGF0dGVybiA9PiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSA/IGtleSA9PT0gcGF0dGVybiA6IHBhdHRlcm4udGVzdChrZXkpO1xuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG5cdFx0Y29uc3Qgd3JpdGFibGVPckNvbmZpZ3VyYWJsZU93biA9IChkZXNjcmlwdG9yID09PSB1bmRlZmluZWQgfHwgZGVzY3JpcHRvci53cml0YWJsZSB8fCBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSk7XG5cdFx0Y29uc3QgaW5jbHVkZWQgPSBvcHRpb25zLmluY2x1ZGUgPyBvcHRpb25zLmluY2x1ZGUuc29tZShlbGVtZW50ID0+IG1hdGNoKGVsZW1lbnQpKSA6ICFvcHRpb25zLmV4Y2x1ZGUuc29tZShlbGVtZW50ID0+IG1hdGNoKGVsZW1lbnQpKTtcblx0XHRjb25zdCBzaG91bGRGaWx0ZXIgPSBpbmNsdWRlZCAmJiB3cml0YWJsZU9yQ29uZmlndXJhYmxlT3duO1xuXHRcdGNhY2hlZFtrZXldID0gc2hvdWxkRmlsdGVyO1xuXHRcdHJldHVybiBzaG91bGRGaWx0ZXI7XG5cdH07XG5cblx0Y29uc3QgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG5cdGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGlucHV0LCB7XG5cdFx0YXBwbHkodGFyZ2V0LCB0aGlzQXJnLCBhcmdzKSB7XG5cdFx0XHRjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0XHRyZXR1cm4gUmVmbGVjdC5hcHBseShjYWNoZWQsIHRoaXNBcmcsIGFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBwaWZpZWQgPSBvcHRpb25zLmV4Y2x1ZGVNYWluID8gdGFyZ2V0IDogcHJvY2Vzc0Z1bmN0aW9uKHRhcmdldCwgb3B0aW9ucywgcHJveHksIHRhcmdldCk7XG5cdFx0XHRjYWNoZS5zZXQodGFyZ2V0LCBwaWZpZWQpO1xuXHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkocGlmaWVkLCB0aGlzQXJnLCBhcmdzKTtcblx0XHR9LFxuXG5cdFx0Z2V0KHRhcmdldCwga2V5KSB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWV4dGVuZC1uYXRpdmUvbm8tdXNlLWV4dGVuZC1uYXRpdmVcblx0XHRcdGlmICghZmlsdGVyKHRhcmdldCwga2V5KSB8fCBwcm9wZXJ0eSA9PT0gRnVuY3Rpb24ucHJvdG90eXBlW2tleV0pIHtcblx0XHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQocHJvcGVydHkpO1xuXG5cdFx0XHRpZiAoY2FjaGVkKSB7XG5cdFx0XHRcdHJldHVybiBjYWNoZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Y29uc3QgcGlmaWVkID0gcHJvY2Vzc0Z1bmN0aW9uKHByb3BlcnR5LCBvcHRpb25zLCBwcm94eSwgdGFyZ2V0KTtcblx0XHRcdFx0Y2FjaGUuc2V0KHByb3BlcnR5LCBwaWZpZWQpO1xuXHRcdFx0XHRyZXR1cm4gcGlmaWVkO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHByb3h5O1xufVxuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6Im1vY2suN2M4OTZmZGYuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);