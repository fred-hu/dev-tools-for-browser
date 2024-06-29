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
})({"6hEXZ":[function(require,module,exports) {
var u = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var h = ()=>typeof globalThis.process < "u" ? globalThis.process.env : {};
var B = new Set(u), _ = (e)=>B.has(e), G = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || h().VERBOSE === "true", N = g();
var m = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var y = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), b = (...e)=>m("\uD83D\uDD35 INFO", ...e), f = (...e)=>m("\uD83D\uDFE0 WARN", ...e), M = 0, i = (...e)=>g() && m(`\u{1F7E1} ${M++}`, ...e);
var v = ()=>{
    let e = globalThis.browser?.runtime || globalThis.chrome?.runtime, t = ()=>setInterval(e.getPlatformInfo, 24e3);
    e.onStartup.addListener(t), t();
};
var n = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/Users/fredhu/Desktop/Items/fred-items/chrome-ext-tools/.plasmo/static/background/index.ts",
    "bundleId": "ee05ffe663a274ca",
    "envHash": "d99a5ffa57acd638",
    "verbose": "false",
    "secure": false,
    "serverPort": 53822
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function H(e) {
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
module.bundle.Module = H;
module.bundle.hotData = {};
var c = globalThis.browser || globalThis.chrome || null;
function R() {
    return !n.host || n.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : n.host;
}
function x() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function d() {
    return n.port || location.port;
}
var P = "__plasmo_runtime_page_", S = "__plasmo_runtime_script_";
var O = `${n.secure ? "https" : "http"}://${R()}:${d()}/`;
async function k(e = 1470) {
    for(;;)try {
        await fetch(O);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (c.runtime.getManifest().manifest_version === 3) {
    let e = c.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let s = new URL(decodeURIComponent(o.slice(e.length)));
            s.hostname === n.host && s.port === `${n.port}` ? (s.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(s).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function E(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function C(e = d()) {
    let t = x();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function T(e) {
    typeof e.message == "string" && y("[plasmo/parcel-runtime]: " + e.message);
}
function L(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        await e(s);
    }), t.addEventListener("error", T), t;
}
function A(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C());
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        if (s.type === "update" && await e(s.assets), s.type === "error") for (let r of s.diagnostics.ansi){
            let l = r.codeframe || r.stack;
            f("[plasmo/parcel-runtime]: " + r.message + `
` + l + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", T), t.addEventListener("open", ()=>{
        b(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        f(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    bgChanged: !1,
    csChanged: !1,
    pageChanged: !1,
    scriptPorts: new Set,
    pagePorts: new Set
};
async function p(e = !1) {
    if (e || a.buildReady && a.pageChanged) {
        i("BGSW Runtime - reloading Page");
        for (let t of a.pagePorts)t.postMessage(null);
    }
    if (e || a.buildReady && (a.bgChanged || a.csChanged)) {
        i("BGSW Runtime - reloading CS");
        let t = await c?.tabs.query({
            active: !0
        });
        for (let o of a.scriptPorts){
            let s = t.some((r)=>r.id === o.sender.tab?.id);
            o.postMessage({
                __plasmo_cs_active_tab__: s
            });
        }
        c.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    v();
    let e = A(async (t)=>{
        i("BGSW Runtime - On HMR Update"), a.bgChanged ||= t.filter((s)=>s.envHash === n.envHash).some((s)=>E(module.bundle, s.id));
        let o = t.find((s)=>s.type === "json");
        if (o) {
            let s = new Set(t.map((l)=>l.id)), r = Object.values(o.depsByBundle).map((l)=>Object.values(l)).flat();
            a.bgChanged ||= r.every((l)=>s.has(l));
        }
        p();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await k(), p(!0);
    });
}
L(async (e)=>{
    switch(i("BGSW Runtime - On Build Repackaged"), e.type){
        case "build_ready":
            a.buildReady ||= !0, p();
            break;
        case "cs_changed":
            a.csChanged ||= !0, p();
            break;
    }
});
c.runtime.onConnect.addListener(function(e) {
    let t = e.name.startsWith(P), o = e.name.startsWith(S);
    if (t || o) {
        let s = t ? a.pagePorts : a.scriptPorts;
        s.add(e), e.onDisconnect.addListener(()=>{
            s.delete(e);
        }), e.onMessage.addListener(function(r) {
            i("BGSW Runtime - On source changed", r), r.__plasmo_cs_changed__ && (a.csChanged ||= !0), r.__plasmo_page_changed__ && (a.pageChanged ||= !0), p();
        });
    }
});
c.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (i("BGSW Runtime - On top-level code changed"), p()), !0;
});

},{}],"l1O93":[function(require,module,exports) {
var _messaging = require("./messaging");
var _index = require("../../../src/background/index");

},{"./messaging":"e6TMO","../../../src/background/index":"dNGms"}],"e6TMO":[function(require,module,exports) {
// @ts-nocheck
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _enableCopy = require("~background/messages/enableCopy");
var _enableCopyDefault = parcelHelpers.interopDefault(_enableCopy);
var _enableMock = require("~background/messages/enableMock");
var _enableMockDefault = parcelHelpers.interopDefault(_enableMock);
var _updateRules = require("~background/messages/updateRules");
var _updateRulesDefault = parcelHelpers.interopDefault(_updateRules);
globalThis.__plasmoInternalPortMap = new Map();
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse)=>{
    request?.name;
    return true;
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    switch(request.name){
        case "enableCopy":
            (0, _enableCopyDefault.default)({
                ...request,
                sender
            }, {
                send: (p)=>sendResponse(p)
            });
            break;
        case "enableMock":
            (0, _enableMockDefault.default)({
                ...request,
                sender
            }, {
                send: (p)=>sendResponse(p)
            });
            break;
        case "updateRules":
            (0, _updateRulesDefault.default)({
                ...request,
                sender
            }, {
                send: (p)=>sendResponse(p)
            });
            break;
        default:
            break;
    }
    return true;
});
chrome.runtime.onConnect.addListener(function(port) {
    globalThis.__plasmoInternalPortMap.set(port.name, port);
    port.onMessage.addListener(function(request) {
        port.name;
    });
});

},{"~background/messages/enableCopy":"24YC5","~background/messages/enableMock":"lVeLD","~background/messages/updateRules":"iYn52","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"24YC5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _radash = require("radash");
var _copyTs = require("url:~app/scripts/copy.ts");
var _copyTsDefault = parcelHelpers.interopDefault(_copyTs);
var _store = require("~app/utils/store");
var _storeDefault = parcelHelpers.interopDefault(_store);
const injectMap = new Map();
const inject = (0, _radash.debounce)({
    delay: 200
}, async (windowId, tabId)=>{
    const config = await (0, _storeDefault.default).get((0, _store.STORE_KEY).GLOBAL_SWITCH_CONFIG);
    const copyEnabled = config?.copy ?? false;
    if (copyEnabled) {
        const tag = `copy-${windowId}-${tabId}`;
        if (!injectMap.has(tag) || injectMap.get(tag) === false) chrome.scripting.executeScript({
            target: {
                tabId
            },
            world: "MAIN",
            files: [
                (0, _copyTsDefault.default).split("/").pop().split("?")[0]
            ]
        }, ()=>{
            // \u6210\u529f\u56de\u8c03
            console.log("injected successfully");
        });
        else console.log("already injected");
        injectMap.set(tag, true);
    }
});
// \u6fc0\u6d3btab
const onActivated = async (e)=>{
    const { windowId, tabId } = e;
    inject(windowId, tabId);
};
// \u9875\u9762\u5237\u65b0
const onUpdated = function(tabId, changeInfo, tab) {
    const { windowId } = tab;
    const tag = `copy-${windowId}-${tabId}`;
    if (injectMap.has(tag)) injectMap.delete(tag);
    if (tab.url.startsWith("http") && changeInfo.status === "complete" && tab.status === "complete") inject(windowId, tabId);
};
// \u5173\u95ed\u6d4f\u89c8\u5668
const onRemoved = (windowId)=>{
    injectMap.forEach((value, key)=>{
        if (key.startsWith(`copy-${windowId}-`)) {
            if (injectMap.has(key)) injectMap.delete(key);
        }
    });
};
// \u5173\u95edtab
const onTabRemove = (tabId, removeInfo)=>{
    const { windowId } = removeInfo;
    const tag = `copy-${windowId}-${tabId}`;
    if (injectMap.has(tag)) injectMap.delete(tag);
};
// \u6fc0\u6d3btab
if (!chrome.tabs.onActivated.hasListener(onActivated)) chrome.tabs.onActivated.addListener(onActivated);
if (!chrome.tabs.onUpdated.hasListener(onUpdated)) // \u5237\u65b0\u9875\u9762
chrome.tabs.onUpdated.addListener(onUpdated);
if (!chrome.windows.onRemoved.hasListener(onRemoved)) // \u76d1\u542c\u5173\u95ed\u6d4f\u89c8\u5668
chrome.windows.onRemoved.addListener(onRemoved);
if (!chrome.tabs.onRemoved.hasListener(onTabRemove)) // \u76d1\u542c\u5173\u95ed\u6807\u7b7e\u9875
chrome.tabs.onRemoved.addListener(onTabRemove);
const handler = async (req, res)=>{
    const { enable } = req.body;
    if (enable) {
        // \u5f53\u524dtab\u5373\u65f6\u542f\u52a8
        const [tab] = await chrome.tabs.query({
            active: true
        });
        if (tab) {
            const { windowId, id } = tab;
            inject(windowId, id);
        }
    }
    res.send({});
};
exports.default = handler;

},{"radash":"f9uNF","url:~app/scripts/copy.ts":"ahB4E","~app/utils/store":"2ItQY","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"f9uNF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "alphabetical", ()=>(0, _arrayMjs.alphabetical));
parcelHelpers.export(exports, "boil", ()=>(0, _arrayMjs.boil));
parcelHelpers.export(exports, "cluster", ()=>(0, _arrayMjs.cluster));
parcelHelpers.export(exports, "counting", ()=>(0, _arrayMjs.counting));
parcelHelpers.export(exports, "diff", ()=>(0, _arrayMjs.diff));
parcelHelpers.export(exports, "first", ()=>(0, _arrayMjs.first));
parcelHelpers.export(exports, "flat", ()=>(0, _arrayMjs.flat));
parcelHelpers.export(exports, "fork", ()=>(0, _arrayMjs.fork));
parcelHelpers.export(exports, "group", ()=>(0, _arrayMjs.group));
parcelHelpers.export(exports, "intersects", ()=>(0, _arrayMjs.intersects));
parcelHelpers.export(exports, "iterate", ()=>(0, _arrayMjs.iterate));
parcelHelpers.export(exports, "last", ()=>(0, _arrayMjs.last));
parcelHelpers.export(exports, "list", ()=>(0, _arrayMjs.list));
parcelHelpers.export(exports, "max", ()=>(0, _arrayMjs.max));
parcelHelpers.export(exports, "merge", ()=>(0, _arrayMjs.merge));
parcelHelpers.export(exports, "min", ()=>(0, _arrayMjs.min));
parcelHelpers.export(exports, "objectify", ()=>(0, _arrayMjs.objectify));
parcelHelpers.export(exports, "range", ()=>(0, _arrayMjs.range));
parcelHelpers.export(exports, "replace", ()=>(0, _arrayMjs.replace));
parcelHelpers.export(exports, "replaceOrAppend", ()=>(0, _arrayMjs.replaceOrAppend));
parcelHelpers.export(exports, "select", ()=>(0, _arrayMjs.select));
parcelHelpers.export(exports, "shift", ()=>(0, _arrayMjs.shift));
parcelHelpers.export(exports, "sift", ()=>(0, _arrayMjs.sift));
parcelHelpers.export(exports, "sort", ()=>(0, _arrayMjs.sort));
parcelHelpers.export(exports, "sum", ()=>(0, _arrayMjs.sum));
parcelHelpers.export(exports, "toggle", ()=>(0, _arrayMjs.toggle));
parcelHelpers.export(exports, "unique", ()=>(0, _arrayMjs.unique));
parcelHelpers.export(exports, "zip", ()=>(0, _arrayMjs.zip));
parcelHelpers.export(exports, "zipToObject", ()=>(0, _arrayMjs.zipToObject));
parcelHelpers.export(exports, "all", ()=>(0, _asyncMjs.all));
parcelHelpers.export(exports, "defer", ()=>(0, _asyncMjs.defer));
parcelHelpers.export(exports, "guard", ()=>(0, _asyncMjs.guard));
parcelHelpers.export(exports, "map", ()=>(0, _asyncMjs.map));
parcelHelpers.export(exports, "parallel", ()=>(0, _asyncMjs.parallel));
parcelHelpers.export(exports, "reduce", ()=>(0, _asyncMjs.reduce));
parcelHelpers.export(exports, "retry", ()=>(0, _asyncMjs.retry));
parcelHelpers.export(exports, "sleep", ()=>(0, _asyncMjs.sleep));
parcelHelpers.export(exports, "try", ()=>(0, _asyncMjs.tryit));
parcelHelpers.export(exports, "tryit", ()=>(0, _asyncMjs.tryit));
parcelHelpers.export(exports, "callable", ()=>(0, _curryMjs.callable));
parcelHelpers.export(exports, "chain", ()=>(0, _curryMjs.chain));
parcelHelpers.export(exports, "compose", ()=>(0, _curryMjs.compose));
parcelHelpers.export(exports, "debounce", ()=>(0, _curryMjs.debounce));
parcelHelpers.export(exports, "memo", ()=>(0, _curryMjs.memo));
parcelHelpers.export(exports, "partial", ()=>(0, _curryMjs.partial));
parcelHelpers.export(exports, "partob", ()=>(0, _curryMjs.partob));
parcelHelpers.export(exports, "proxied", ()=>(0, _curryMjs.proxied));
parcelHelpers.export(exports, "throttle", ()=>(0, _curryMjs.throttle));
parcelHelpers.export(exports, "inRange", ()=>(0, _numberMjs.inRange));
parcelHelpers.export(exports, "toFloat", ()=>(0, _numberMjs.toFloat));
parcelHelpers.export(exports, "toInt", ()=>(0, _numberMjs.toInt));
parcelHelpers.export(exports, "assign", ()=>(0, _objectMjs.assign));
parcelHelpers.export(exports, "clone", ()=>(0, _objectMjs.clone));
parcelHelpers.export(exports, "construct", ()=>(0, _objectMjs.construct));
parcelHelpers.export(exports, "crush", ()=>(0, _objectMjs.crush));
parcelHelpers.export(exports, "get", ()=>(0, _objectMjs.get));
parcelHelpers.export(exports, "invert", ()=>(0, _objectMjs.invert));
parcelHelpers.export(exports, "keys", ()=>(0, _objectMjs.keys));
parcelHelpers.export(exports, "listify", ()=>(0, _objectMjs.listify));
parcelHelpers.export(exports, "lowerize", ()=>(0, _objectMjs.lowerize));
parcelHelpers.export(exports, "mapEntries", ()=>(0, _objectMjs.mapEntries));
parcelHelpers.export(exports, "mapKeys", ()=>(0, _objectMjs.mapKeys));
parcelHelpers.export(exports, "mapValues", ()=>(0, _objectMjs.mapValues));
parcelHelpers.export(exports, "omit", ()=>(0, _objectMjs.omit));
parcelHelpers.export(exports, "pick", ()=>(0, _objectMjs.pick));
parcelHelpers.export(exports, "set", ()=>(0, _objectMjs.set));
parcelHelpers.export(exports, "shake", ()=>(0, _objectMjs.shake));
parcelHelpers.export(exports, "upperize", ()=>(0, _objectMjs.upperize));
parcelHelpers.export(exports, "draw", ()=>(0, _randomMjs.draw));
parcelHelpers.export(exports, "random", ()=>(0, _randomMjs.random));
parcelHelpers.export(exports, "shuffle", ()=>(0, _randomMjs.shuffle));
parcelHelpers.export(exports, "uid", ()=>(0, _randomMjs.uid));
parcelHelpers.export(exports, "series", ()=>(0, _seriesMjs.series));
parcelHelpers.export(exports, "camel", ()=>(0, _stringMjs.camel));
parcelHelpers.export(exports, "capitalize", ()=>(0, _stringMjs.capitalize));
parcelHelpers.export(exports, "dash", ()=>(0, _stringMjs.dash));
parcelHelpers.export(exports, "pascal", ()=>(0, _stringMjs.pascal));
parcelHelpers.export(exports, "snake", ()=>(0, _stringMjs.snake));
parcelHelpers.export(exports, "template", ()=>(0, _stringMjs.template));
parcelHelpers.export(exports, "title", ()=>(0, _stringMjs.title));
parcelHelpers.export(exports, "trim", ()=>(0, _stringMjs.trim));
parcelHelpers.export(exports, "isArray", ()=>(0, _typedMjs.isArray));
parcelHelpers.export(exports, "isDate", ()=>(0, _typedMjs.isDate));
parcelHelpers.export(exports, "isEmpty", ()=>(0, _typedMjs.isEmpty));
parcelHelpers.export(exports, "isEqual", ()=>(0, _typedMjs.isEqual));
parcelHelpers.export(exports, "isFloat", ()=>(0, _typedMjs.isFloat));
parcelHelpers.export(exports, "isFunction", ()=>(0, _typedMjs.isFunction));
parcelHelpers.export(exports, "isInt", ()=>(0, _typedMjs.isInt));
parcelHelpers.export(exports, "isNumber", ()=>(0, _typedMjs.isNumber));
parcelHelpers.export(exports, "isObject", ()=>(0, _typedMjs.isObject));
parcelHelpers.export(exports, "isPrimitive", ()=>(0, _typedMjs.isPrimitive));
parcelHelpers.export(exports, "isPromise", ()=>(0, _typedMjs.isPromise));
parcelHelpers.export(exports, "isString", ()=>(0, _typedMjs.isString));
parcelHelpers.export(exports, "isSymbol", ()=>(0, _typedMjs.isSymbol));
var _arrayMjs = require("./array.mjs");
var _asyncMjs = require("./async.mjs");
var _curryMjs = require("./curry.mjs");
var _numberMjs = require("./number.mjs");
var _objectMjs = require("./object.mjs");
var _randomMjs = require("./random.mjs");
var _seriesMjs = require("./series.mjs");
var _stringMjs = require("./string.mjs");
var _typedMjs = require("./typed.mjs");

},{"./array.mjs":false,"./async.mjs":false,"./curry.mjs":"bLRM5","./number.mjs":false,"./object.mjs":false,"./random.mjs":false,"./series.mjs":false,"./string.mjs":false,"./typed.mjs":false,"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"bLRM5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "callable", ()=>callable);
parcelHelpers.export(exports, "chain", ()=>chain);
parcelHelpers.export(exports, "compose", ()=>compose);
parcelHelpers.export(exports, "debounce", ()=>debounce);
parcelHelpers.export(exports, "memo", ()=>memo);
parcelHelpers.export(exports, "partial", ()=>partial);
parcelHelpers.export(exports, "partob", ()=>partob);
parcelHelpers.export(exports, "proxied", ()=>proxied);
parcelHelpers.export(exports, "throttle", ()=>throttle);
function chain(...funcs) {
    return (...args)=>{
        return funcs.slice(1).reduce((acc, fn)=>fn(acc), funcs[0](...args));
    };
}
function compose(...funcs) {
    return funcs.reverse().reduce((acc, fn)=>fn(acc));
}
const partial = (fn, ...args)=>{
    return (...rest)=>fn(...[
            ...args,
            ...rest
        ]);
};
const partob = (fn, argobj)=>{
    return (restobj)=>fn({
            ...argobj,
            ...restobj
        });
};
const proxied = (handler)=>{
    return new Proxy({}, {
        get: (target, propertyName)=>handler(propertyName)
    });
};
const memoize = (cache, func, keyFunc, ttl)=>{
    return function callWithMemo(...args) {
        const key = keyFunc ? keyFunc(...args) : JSON.stringify({
            args
        });
        const existing = cache[key];
        if (existing !== void 0) {
            if (!existing.exp) return existing.value;
            if (existing.exp > new Date().getTime()) return existing.value;
        }
        const result = func(...args);
        cache[key] = {
            exp: ttl ? new Date().getTime() + ttl : null,
            value: result
        };
        return result;
    };
};
const memo = (func, options = {})=>{
    return memoize({}, func, options.key ?? null, options.ttl ?? null);
};
const debounce = ({ delay }, func)=>{
    let timer = void 0;
    let active = true;
    const debounced = (...args)=>{
        if (active) {
            clearTimeout(timer);
            timer = setTimeout(()=>{
                active && func(...args);
                timer = void 0;
            }, delay);
        } else func(...args);
    };
    debounced.isPending = ()=>{
        return timer !== void 0;
    };
    debounced.cancel = ()=>{
        active = false;
    };
    debounced.flush = (...args)=>func(...args);
    return debounced;
};
const throttle = ({ interval }, func)=>{
    let ready = true;
    let timer = void 0;
    const throttled = (...args)=>{
        if (!ready) return;
        func(...args);
        ready = false;
        timer = setTimeout(()=>{
            ready = true;
            timer = void 0;
        }, interval);
    };
    throttled.isThrottled = ()=>{
        return timer !== void 0;
    };
    return throttled;
};
const callable = (obj, fn)=>{
    const FUNC = ()=>{};
    return new Proxy(Object.assign(FUNC, obj), {
        get: (target, key)=>target[key],
        set: (target, key, value)=>{
            target[key] = value;
            return true;
        },
        apply: (target, self, args)=>fn(Object.assign({}, target))(...args)
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"5G9Z5":[function(require,module,exports) {
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

},{}],"ahB4E":[function(require,module,exports) {
module.exports = require("97e19ac886bad8de").getBundleURL("kqZzI") + "../../copy.1fd78fa9.js" + "?" + Date.now();

},{"97e19ac886bad8de":"7BRJX"}],"7BRJX":[function(require,module,exports) {
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

},{}],"2ItQY":[function(require,module,exports) {
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

},{"@plasmohq/storage":"h4wSb","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"h4wSb":[function(require,module,exports) {
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

},{"pify":"1siwu","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"1siwu":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"lVeLD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _radash = require("radash");
var _constants = require("~app/constants");
var _store = require("~app/utils/store");
var _storeDefault = parcelHelpers.interopDefault(_store);
// chrome.tabs.sendMessage(tabId, {action: MESSAGE_TYPES.MATCHING_UPDATE}, function(response) {
//   console.log(response.farewell);
// });
const injectMap = new Map();
const inject = (0, _radash.debounce)({
    delay: 200
}, async (windowId, tabId)=>{
    const data = await (0, _storeDefault.default).getItem((0, _store.STORE_KEY).ROUTES);
    const [tab] = await chrome.tabs.query({
        active: true
    });
    const enableInTab = tab?.url?.startsWith("http");
    const config = await (0, _storeDefault.default).get((0, _store.STORE_KEY).GLOBAL_SWITCH_CONFIG);
    const mockEnabled = config?.mock ?? false;
    if (mockEnabled && enableInTab) {
        const tag = `mock-${windowId}-${tabId}`;
        // \u542f\u7528Mock\u4e14\u811a\u672a\u63d2\u5165: \u5148\u6ce8\u5165\u5168\u5c40\u5f85mock\u8def\u7531\u6570\u636e\u518d\u6ce8\u5165\u811a\u672c
        if (!injectMap.has(tag) || injectMap.get(tag) === false) chrome.scripting.executeScript({
            target: {
                tabId
            },
            world: "MAIN",
            func: async (data, varName)=>{
                try {
                    window[varName] = data;
                } catch (error) {
                    console.log(error);
                }
            },
            args: [
                data,
                (0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES
            ]
        });
        else // \u542f\u7528Mock\u4e14\u811a\u672c\u5df2\u63d2\u5165: \u6062\u590d\u8def\u7531
        chrome.scripting.executeScript({
            target: {
                tabId
            },
            world: "MAIN",
            func: async (data, varName)=>{
                try {
                    window[varName] = data;
                } catch (error) {
                    console.log(error);
                }
            },
            args: [
                data,
                (0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES
            ]
        });
        injectMap.set(tag, true);
    }
    // \u672a\u542f\u7528Mock: \u6e05\u7a7a\u8def\u7531
    if (!mockEnabled && enableInTab) chrome.scripting.executeScript({
        target: {
            tabId
        },
        world: "MAIN",
        func: async (varName)=>{
            try {
                window[varName] = [];
            } catch (error) {
                console.log(error);
            }
        },
        args: [
            (0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES
        ]
    });
    console.log("injectMap:", injectMap);
});
// \u6fc0\u6d3btab
const onActivated = async (e)=>{
    const { windowId, tabId } = e;
    inject(windowId, tabId);
};
// \u9875\u9762\u5237\u65b0
const onUpdated = function(tabId, changeInfo, tab) {
    const { windowId } = tab;
    const tag = `mock-${windowId}-${tabId}`;
    if (injectMap.has(tag)) injectMap.delete(tag);
    if (tab.url.startsWith("http")) inject(windowId, tabId);
};
// \u5173\u95ed\u6d4f\u89c8\u5668
const onRemoved = (windowId)=>{
    injectMap.forEach((value, key)=>{
        if (key.startsWith(`mock-${windowId}-`)) {
            if (injectMap.has(key)) injectMap.delete(key);
        }
    });
};
// \u5173\u95edtab
const onTabRemove = (tabId, removeInfo)=>{
    const { windowId } = removeInfo;
    const tag = `mock-${windowId}-${tabId}`;
    if (injectMap.has(tag)) injectMap.delete(tag);
};
// \u6fc0\u6d3btab
if (!chrome.tabs.onActivated.hasListener(onActivated)) chrome.tabs.onActivated.addListener(onActivated);
if (!chrome.tabs.onUpdated.hasListener(onUpdated)) // \u5237\u65b0\u9875\u9762
chrome.tabs.onUpdated.addListener(onUpdated);
if (!chrome.windows.onRemoved.hasListener(onRemoved)) // \u76d1\u542c\u5173\u95ed\u6d4f\u89c8\u5668
chrome.windows.onRemoved.addListener(onRemoved);
if (!chrome.tabs.onRemoved.hasListener(onTabRemove)) // \u76d1\u542c\u5173\u95ed\u6807\u7b7e\u9875
chrome.tabs.onRemoved.addListener(onTabRemove);
const handler = async (req, res)=>{
    const { enable } = req.body;
    const [tab] = await chrome.tabs.query({
        active: true
    });
    const enableInTab = tab?.url?.startsWith("http");
    if (enable && enableInTab) {
        // \u5f53\u524dtab\u5373\u65f6\u542f\u52a8
        const { windowId, id } = tab;
        inject(windowId, id);
    }
    if (!enable && enableInTab) {
        const { id } = tab;
        chrome.scripting.executeScript({
            target: {
                tabId: id
            },
            world: "MAIN",
            func: async (varName)=>{
                try {
                    window[varName] = [];
                } catch (error) {
                    console.log(error);
                }
            },
            args: [
                (0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES
            ]
        });
    }
    res.send({});
};
exports.default = handler;

},{"radash":"f9uNF","~app/constants":"1MGZ2","~app/utils/store":"2ItQY","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"1MGZ2":[function(require,module,exports) {
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

},{"~app/utils":"l0ZWn","./httpStatus":"72uZv","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"l0ZWn":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"72uZv":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"iYn52":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("~app/constants");
var _store = require("~app/utils/store");
var _storeDefault = parcelHelpers.interopDefault(_store);
const handler = async (req, res)=>{
    const resourceTypes = [
        (0, _constants.ResourceType).MAIN_FRAME,
        (0, _constants.ResourceType).XMLHTTPREQUEST,
        (0, _constants.ResourceType).SCRIPT,
        (0, _constants.ResourceType).STYLESHEET,
        (0, _constants.ResourceType).SUB_FRAME,
        (0, _constants.ResourceType).MEDIA,
        (0, _constants.ResourceType).WEBSOCKET,
        (0, _constants.ResourceType).OTHER,
        (0, _constants.ResourceType).CSP_REPORT,
        (0, _constants.ResourceType).FONT,
        (0, _constants.ResourceType).IMAGE,
        (0, _constants.ResourceType).PING,
        (0, _constants.ResourceType).WEBBUNDLE,
        (0, _constants.ResourceType).WEBTRANSPORT,
        (0, _constants.ResourceType).OBJECT
    ];
    const routes = await (0, _storeDefault.default).getItem((0, _store.STORE_KEY).ROUTES) ?? [];
    const config = await (0, _storeDefault.default).getItem((0, _store.STORE_KEY).GLOBAL_SWITCH_CONFIG) || {};
    const { mock } = config;
    const ruleRoutes = routes.filter((route)=>route[(0, _constants.PROXY_ROUTE_KEY).MOCK_TYPE] === (0, _constants.MOCK_TYPE).REDIRECT || route[(0, _constants.PROXY_ROUTE_KEY).MOCK_TYPE] === (0, _constants.MOCK_TYPE).MODIFY_HEADERS).filter((route)=>route[(0, _constants.PROXY_ROUTE_KEY).ENABLE] === true) || [];
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    const oldRuleIds = oldRules.map((rule)=>rule.id);
    const newRules = ruleRoutes.map((v, i)=>{
        let condition = {};
        const isRedirect = v[(0, _constants.PROXY_ROUTE_KEY).MOCK_TYPE] === (0, _constants.MOCK_TYPE).REDIRECT;
        const isModifyHeaders = v[(0, _constants.PROXY_ROUTE_KEY).MOCK_TYPE] === (0, _constants.MOCK_TYPE).MODIFY_HEADERS;
        const matchType = v[(0, _constants.PROXY_ROUTE_KEY).MATCH_TYPE];
        if (!v[(0, _constants.PROXY_ROUTE_KEY).URL] && !matchType) condition = {
            urlFilter: "*",
            resourceTypes
        };
        if (matchType === (0, _constants.MATCH_TYPE).CONTAINS) condition = {
            urlFilter: v[(0, _constants.PROXY_ROUTE_KEY).URL],
            resourceTypes
        };
        if (matchType === (0, _constants.MATCH_TYPE).EQUALS) condition = {
            regexFilter: `^${v[(0, _constants.PROXY_ROUTE_KEY).URL]}$`.replace(/\./g, "\\.").trim(),
            resourceTypes
        };
        if (matchType === (0, _constants.MATCH_TYPE).REGEXP) condition = {
            regexFilter: `.*${v[(0, _constants.PROXY_ROUTE_KEY).URL]}.*`.replace(/\./g, "\\.").trim(),
            resourceTypes
        };
        if (isRedirect) return {
            id: i + 1,
            priority: 1,
            action: {
                type: (0, _constants.RuleActionType).REDIRECT,
                redirect: {
                    url: v[(0, _constants.PROXY_ROUTE_KEY).REDIRECT_URL]
                }
            },
            condition: condition
        };
        if (isModifyHeaders) {
            const requestHeaders = (v?.[(0, _constants.PROXY_ROUTE_KEY).REQUEST_HEADERS] ?? []).map((item)=>({
                    header: item.key,
                    ...item.operationType === "remove" ? {} : {
                        value: item.value
                    },
                    operation: item.operationType
                }));
            const responseHeaders = (v?.[(0, _constants.PROXY_ROUTE_KEY).RESPONSE_HEADERS] ?? []).map((item)=>({
                    header: item.key,
                    ...item.operationType === "remove" ? {} : {
                        value: item.value
                    },
                    operation: item.operationType
                }));
            return {
                id: i + 1,
                priority: 1,
                action: {
                    type: (0, _constants.RuleActionType).MODIFY_HEADERS,
                    ...requestHeaders?.length ? {
                        requestHeaders
                    } : {},
                    ...responseHeaders?.length ? {
                        responseHeaders
                    } : {}
                },
                condition: condition
            };
        }
    });
    console.log("rules", [
        ...mock ? newRules : []
    ]);
    const result = await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRuleIds,
        addRules: [
            ...mock ? newRules : []
        ]
    });
    res.send({
        result
    });
};
exports.default = handler;

},{"~app/constants":"1MGZ2","~app/utils/store":"2ItQY","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"dNGms":[function(require,module,exports) {
var _notification = require("./notification");
var _ctxMenu = require("./ctx-menu");

},{"./notification":"9DmBP","./ctx-menu":"5S0p9"}],"9DmBP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _iconPng = require("data-base64:/assets/icon.png");
var _iconPngDefault = parcelHelpers.interopDefault(_iconPng);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.notifications) {
        const id = `my-notification${new Date()}`;
        chrome.notifications.create(id, {
            type: "basic",
            iconUrl: (0, _iconPngDefault.default),
            title: "My Notification",
            message: "Hello, world!" // \u901a\u77e5\u5185\u5bb9
        }, ()=>{
        // console.log("Last error:", chrome.runtime.lastError)
        });
        // \u53d1\u9001\u6d88\u606f\u56de\u590d\u7ed9popup\u9875\u9762
        sendResponse({
            farewell: "Goodbye from background"
        });
        chrome.notifications.clear(id);
    }
});

},{"data-base64:/assets/icon.png":"7G57o","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"7G57o":[function(require,module,exports) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeF7tnUusZcd1nuvcbnbLYosCRcU2RQZNJIEsCQgHIgWQghDeTuJBkhFhTx0BehEOMhCsDJKJ2Z1BMpAIKM6AoIQICBAkGohwEiAjAepWoFci0khogKIdJGjaJJu0GMmiJYVsNe%2BJ69zet8899zzqsVbVqqrvALRM3nrtb606%2F7%2Brau8zc3wgAIEmCFw7fd%2F%2B8kAPDtzRv%2B%2FN5o%2Fsuoj5%2FFb5XWVnM3dlU5mD%2Beyby3%2Fb2zte9u4bVzfW3dUvf4cABMoRmJXrip4gAIF1BJaFfRL1SdBjRNsi3clILJsGbxgwCRajxZhGI4ABGC3iXG8VApPIe4FfvltvXeAlYHqTgEGQIEkbEIgjgAGI40VpCGwlsE7oEfn0pFk2B6wcpHOkJgTWEcAAkBcQSCCwKvSIfALEjCrLxuCeg6sXM5qiKgSGJYABGDb0XHgMAS%2F40%2FI9Yh9DrlzZuZtd8r2xUlCOOT21TQAD0Hb8GL0CgaNDefP54755BF8BcqEmMQWFQNNNkwQwAE2GjUFLElgWfMRekqy9tjAE9mLCiOoRwADUY0%2FPlQgg%2BJXAG%2Bx2MgScIzAYHIakTgADoI6YDmoTYEm%2FdgTa6R9D0E6sGGk%2BAQxAPkNaMEiAu3yDQWlsSNOTBqwONBY4hhtMAAMQjIqC1gksRJ%2BDe9bD1Oz4%2FOoATxg0Gz4GvoYABoC0aJoAot90%2BJodPFsFzYaOgS8RwACQDs0RmESfE%2FvNha7LAWMGugzrEBeFARgizO1fJKLffgxHuAK2CUaIcj%2FXiAHoJ5bdXQlv3%2BsupENdkDcDHCAcKuTNXSwGoLmQ9T9g7vb7j%2FFIV8jTBCNFu61rxQC0Fa9uR4vodxtaLmyJAOcFSAdLBDAAlqIx4Fhe3rvv4t5s%2FggH%2BgYM%2FuCXzBbB4Alg4PIxAAaCMNoQuNsfLeJc7zYCHBwkP2oRwADUIj9gvwj%2FgEHnkoMJcFYgGBUFhQhgAIRA0sx6AtNJ%2Fpk7%2FGldPhCAwG4CbA%2FsZkSJfAIYgHyGtLCGAHf7pAUE8glwaDCfIS1sJoABIDtECSD8ojhpDAILAhgBEkGDAAZAg%2BqAbSL8AwadSy5OgHMCxZF33SEGoOvw6l8cwq%2FPmB4gsI4A5wTIi1wCGIBcgoPWR%2FgHDTyXbY4ARsBcSJoZEAagmVDZGCjCbyMOjAICqwQwAuRELAEMQCyxQcsj%2FIMGnstujgBGoLmQVRswBqAa%2BjY6RvjbiBOjhAArAuRALAEMQCyxQcoj%2FIMEmsvsmgCPD3Yd3uyLwwBkI%2ByrAYS%2Fr3hyNRDwBNgWIA%2FWEcAAkBdHBK6dOn%2BZX%2BUjISDQLwGMQL%2BxTbkyDEAKtc7q%2BJ%2Fk5V39nQWVy4HAFgIYAdLDE8AADJwHfrl%2FfjC%2FPDACLh0CQxPACAwdfgzAiOFnn3%2FEqHPNEFhPwL9e2M1ml%2B6%2BcfUKjMYiwArAWPF2LPcPFnAuFwKBBFgNCATVUTEMQEfB3HYpLPcPEmguEwKZBDACmQAbqo4BaChYKUNluT%2BFGnUgMDYBTMAY8ccAdBxnlvs7Di6XBoECBDACBSBX7AIDUBG%2BVtfc9WuRpV0IjEkAI9Bn3DEAncWVl%2Fl0FlAuBwJGCGACjARCcBgYAEGYNZvikF9N%2BvQNgXEIYAT6iTUGoINYstffQRC5BAg0RAAT0FCwtgwVA9BwHNnrbzh4DB0CHRDACLQdRAxAo%2FHjrr%2FRwDFsCHRGABPQbkAxAI3Fjrv%2BxgLGcCEwAAFeJ9xmkDEADcWNu%2F6GgsVQITAgAVYD2go6BqCBeHHX30CQGCIEILAggAloJxEwAMZjxeN9xgPE8CAAgbUEMAL2EwMDYDhGLPkbDg5DgwAEdhLABOxEVLUABqAq%2Fs2d80Y%2Fo4FhWBCAQBQBf0Dw7rdfvBBVicJFCGAAimAO74Ql%2F3BWlIQABNohwGqAvVhhAAzFhCV%2FQ8FgKBCAgDgBTIA40qwGMQBZ%2BOQqs%2BQvx5KWIAABuwQwAXZigwGoHAse8ascALqHAASqEJjtzS7cfePqlSqd0%2BmCAAagYiKw5F8RPl1DAALVCbAaUDcEGIBK%2FBH%2FSuDpFgIQMEUAE1AvHBiACuzZ768AnS4hAAGzBDABdUKDASjInf3%2BgrDpCgIQaIoAPyhUPlwYgELMeb6%2FEGi6gQAEmibA4cBy4cMAFGDNfn8ByHQBAQh0Q4AtgTKhxAAoc0b8lQHTPAQg0CUBTIB%2BWDEAiowRf0W4NA0BCHRPABOgG2IMgBJfTvorgaVZCEBgKAL8mJBeuDEAwmw56S8MlOYgAIHhCfCEgE4KYAAEuXLSXxAmTUEAAhBYIcATArIpgQEQ4on4C4GkGQhAAAJbCGAC5NIDAyDAEvEXgEgTEIAABAIJYAICQe0ohgHI5Ij4ZwKkOgQgAIEEAjwhkABtdUslv4lxW%2BAxv3Fjz5VDAAL1CWAC8mLACkAiP8Q%2FERzVIAABCAgSwASkw8QAJLBD%2FBOgUQUCEICAEgFMQBpYDEAkN8Q%2FEhjFIQABCBQggAmIh4wBiGCG%2BEfAoigEIACBwgQwAXHAMQCBvBD%2FQFAUgwAEIFCRACYgHD4GIIAV4h8AiSIQgAAEjBDABIQFAgOwgxPiH5ZIlIIABCBgiQAmYHc0MABbGCH%2BuxOIEhCAAASsEsAEbI8MBmADH8Tf6pRmXBCAAATCCWACNrPCAKxhg%2FiHTy5KQgACELBOgN8OWB8hDMAKF97tb30qMz4IQAAC8QQwASeZYQCWmCD%2B8ZOKGhCAAARaIYAJOB4pDMBNHoh%2FK1OYcUIAAhBIJ4AJuMUOA%2BCcQ%2FzTJxM1IQABCLRGABNwGDEMgDcAp85fns%2FdfmtJzHghAAEIQCCewGzmrtz99osX4mv2VWN4A4D495XQXA0EIACBEAKYgMFXAHjcL2SaUAYCfRA488hDRxdydv8ht%2Fzvu67w%2Bje%2Fd1TkrSvfc8v%2Fvqsuf7dLYPR3BAy7AoD4252UjAwCOQQmYX%2FX4589aiZG7GP69kZgMgMYgxhydsqObAKGNACIv53Jx0ggIEHAC%2Fwk%2BFpiHzPOn%2F7zLy6K%2F8Wlw%2F%2FlY5vAqCZgOAPAiX%2FbE5HRQSCEgDXB3zZmzEBIROuXGfHJgKEMAOJff5IxAgikEphE38Idfuo1TFsGrAykEtStN5oJGMsA8Lif7uyhdQgoEOhB%2BNdheebd97p7fnpagRhNphIY7cmAYQwA%2B%2F6pU4J6EKhDwO%2Fpn%2FvdWwf56oxCp9dv%2Feaj7vXvfMfdcX3PffDHZ3U6odUkAiOZgCEMAOKfNA%2BoBIHiBHq9218GOYn%2F9N8wAcXTbGeHoxwK7N4AIP47c50CEKhOYATh95BXxR8TUD31Ng5gBBPQtQHg0J%2FdycXIIDAR6Hmpf9ud%2F2oGsBJgb070fiiwawPwyt75ub2UYkQQgIAnMMpd%2F7Y7f0yA7bnQ%2B3mAbg0AS%2F%2B2JxajG5fASMIfI%2F5sB9icEz2bgC4NAOJvcyIxKgiMstw%2FRXrTnv%2BuTGA7YBehsn%2Fv9TxAdwYA8ZedGHd946uLpVr%2FNjNeXiLLdqTWRrvrT7nzZzvA9ozo8TxAdwaAfX%2B5STSJ%2F9QiJkCO7UgtjXbXLyH%2BbAfYnCHvO3ixK83s6mKu8aY%2FsVmzKv7LDWMExDB33xDinx9itgPyGUq10Nt5gG4MAEv%2FUinu3DbxxwjIce69pdA86olD6p7%2FLgaYgF2Eyv29p%2FMAXRgAxF8u%2BWO%2FtPlxEzn2PbUUm0c9XLuW%2BLMdYC87ejkP0IUBYN9fZoLkfGmzLSATg9Zb8Yf9fB6N9tEWf0yAvYzqwQQ0bwC4%2B5eZGDniz7aATAxabwXxLxNBtgPKcN7VSw%2FnAZo2AIj%2FrhQN%2B7uU%2BGMEwnj3WGrEw34%2BjqXu%2FFdzBhNgYxa1fh6gWQPAe%2F5lJsDZ%2F%2Fxv3Hv%2Bwd%2BRaWylFbYFVLCaaxTxrxMSTEAd7qu9trwV0K4B4JG%2F7Oyffe1J5x7%2BsDt37pw7d%2B727PY2NYARUENbvWHEv24IMAF1%2BfveW94KaNIAsPSfn%2FST%2BE8taZsA3w9GID9ullpgz99GNDAB9ePQ6lZAcwYA8c9P9lXxL2kCeGwwP34WWkD8LUTh1hgwAfXj0eJWQHMGgEf%2B8hJ9k%2FiXNAGsBuTF0ELtu9%2B%2BamEYRcdQ68Bf6EViAkJJ6ZRrcSugKQPA3X9e4u4S%2F9ImACOQF89atTWeGql1LaH9Whf%2F6TowAaER1SnX2lZAMwYA8c9L2FDxr2ECMAJ5sS1Ze8RDf62IPyag5EzY3FdLWwHNGACW%2FtOTO1b8MQHprHuuifi3E11WAurGqpVfDWzCAHD3n57MqeJfywSwGpAea82aiL8mXZ22MQE6XENabeU8gHkDgPiHpNuW5aiX%2F1teA86pvydg0wB5bDA7dGINjHbor7Vl%2F02BxgSITYHohlrYCjBvAFj6j867YxVmn%2Fu0c7%2FzqbxGKpoAHhvMDl12A6Pd%2Ffci%2FpwJyE79rAZaWAUwbQC4%2B8%2FKv6PKudsANbcDpr5ZDZDJhdhWEP9YYjbLsxJQJy7WnwowbQC4%2BxdK2oc%2F7BYmQOBT4o2B24aJERAIYkQTIy3993bnvxpmTEBE4gsWtbwVYNYAcPcvmIH%2BfdU33%2Fsv0WptE%2BCvASMgEcntbYx099%2B7%2BLMdoD9fNvVgeSvApAFA%2FBWSVXAVwI%2FOggl45t33unt%2BeloBFk0i%2Fv3mACsB5WNrdRXApAFg6V8nQaUOBFo4E%2BDH4O%2Fa3vH172MCFNJllLf9jXLnz3aAwiSJbNLiuwHMGQDu%2FiOzKrL4TOCxwOUua64EvPDEF9wLT3ze3fuz2zABkXmwrfgod%2F%2Bjij%2FbAYKTJaIpiwcCTRmAa6fv258fzC9HMKVoLAHhrYCa2wGvf%2Fc77lu%2F8eiCACYgNhE2lx%2Fh4N%2Fo4o8JkJsvMS1Z2wqwZQBOnb88n7v9GKCUjScgeSCw9nbAf3zfrxwBwATE58JqjRHu%2FhH%2F41HnTED%2BvAltwdqBQDMGgKX%2F0BQSKKewClBrJWD1yxwTkJcfvd%2F9I%2F7r8wMTkDdvYmpbWgUwYwA4%2BBeTQvllNVYBapiA5W2AiQomIC0%2Fer%2F7R%2Fy35wUmIG3epNSyciDQhAHg7j8lhTLrKK0ClDYB6wyAHwMmID4%2Fer77R%2FzD8gETEMYpt5SVA4EmDAB3%2F7nplFZf%2BrHA5VGUfDpg05c7JiA8L3q%2B%2B0f8w%2FPAl8QExPFKLW1hFaC6AeDuPzV9ZOppbQWUXAnY9gWPCQjLk14NwPSoaBgFSk0EMAH6uWDhQGB1A8Ddv36ibe1BcSuglAnYtA3AmYCw3OpV%2FP3VYwDCcmBdKUxAOrvQmrUPBFY1ANz9h6aJbjnNVYBSJmD5ccB1tFgJ2JxDPRuAXeZQd2a13fq9j%2F22c9%2F9A3fP159r%2B0IMj772KkA1A4D4G8pK5VWAEiYgZJ8XE7A%2B53o%2B%2FIcBSPue8eLv%2F3nj2WfcSx%2F%2FlPvgj8%2BmNUStnQRqrgJgAHaGZ4wCmgcCJ4KaBwNDv%2BgxAcfzuee7f3%2BloXkxxiwPu8pJ%2FKfS3%2Fvw%2FRwMDEOXVKrmKkAVA8Ddf1KeqFeS%2Fp2AdQPWMgExX%2FSYgFuRwQCoT6umOlgVfz%2F45z%2FzSffGM9%2FHBChGstYqQBUDwME%2FxUzKabrAVoDmdkDINsCEBxNwSKLn5X9WAOK%2BDNaJv2%2FBbwM8%2F%2BlPLBrjYGAc09DStVYBihsA7v5DU6JOOe0DgZrbATEGwI9jdBNw5pGHnP%2FZ394%2Fuw6I9n79Ide3SfxXDQAmIIRmWpkaqwDFDQB3%2F2nJUaxWoVUAjZWAmG0AVgKc6335f4oxBmD7t8c28Z9qTtsA07%2BzEiD%2FjVxjFaCoAeDuXz5pNFostQqgYQJSvuxHXQnoffkfA7D72yFE%2FNetArASsJttSonSqwBFDQB3%2FykpUaFOwVUAaRMQuw0w8krAKAYgNScqzLyiXYaK%2FyYDgAmQD1fpVYBiBoC7f%2Flk0WyxxGOBy%2BOXejogZRtgGod%2F1tkvbY7wGWX538cSA3Ayo2PEf9M2ANsBOt8UJVcBihkA7v51kkWz1ZJbAVIrATkGwI9hFBOAAdCcObbbThF%2Ff0Wr5wCWr5IzAXIxL7kKUMQAcPcvlxxFWyq8FSBlAlLOASxzHcEE%2BNP%2F%2FimAET6sANyKcqr4%2BxZeeurJxT%2BbPpgAudlUahWgiAHg7l8uMUq3VHoVQMIESHzh924CRtn%2FZwtARvx9K8vvA8AE6H4Tl1oFUDcA3P3rJop66xVWAXJNQO42wMS0VxMwyvP%2FUxz5RUC3eK%2F%2F4sd9Mj4hBsA3z0pABuSlqiVWAdQNwLVT5y%2FP525fBgmt1CBQ%2BkDgdI05BwNztwF6NgEj7f%2F7OI5uACTEf5oP%2FncBQj6YgBBK28uUWAVQNQDc%2FecngZUWSvxOwLprTTUBkl%2F6va0EYACszCr9cUiKvx%2FttoOAq1eDCciPr%2FYqAAYgP0ZDtHD2n%2F0jd%2F0ff7zKtWICZLGPZgCktoRko6DfmrT4xxoAtgPyY6y9CqBmALj7zw%2B%2BtRZqHAjM3Q5gJeBkFo30BIC%2F%2BhENgIb4e5a7ngRY953FSkDeN7nmKgAGIC82Y9WudCAQEyCbZiM9ATCiAdASf88y9CAg2wFyc1ZzFUDNAPDon1wCWGqp5iqA58B2QH42YADyGVptQVP8cwwA2wF5GaO1CqBiAFj%2Bzwu26dqVVwEwAXnZMdojgBMtqadC8ujr1tYW%2F2n0oU8CsB0gF%2B%2B5m1265%2BDqRbkWD1tSMQDc%2FUuHyVZ7tR4LXKbASkBaTmAA0rhZr1VK%2FD2HHAPASkB6Jr3v4EVxvRZvkLv%2F9AC3VPPlczec%2B51PLYac%2B4KR1OvGBMSTwwDEM7Neo6T4SxgATEBaRmlsA4gbAF78kxbcFmt5E%2FDS7b9YDP2OBz%2Fi7njgwaP%2FLXU9mIA40hiAOF7WS5cWfykDgAmIzyyNw4CiBuDa6fv25wfzy%2FGXRo1WCSybgOVrmFYFSqwOYALCs2dUAyDx%2BxDhlMuUrCH%2BkgYAExCfJ9KrAKIGgOX%2F%2BID2UGOTCShpCDABYZmEAQjjZL1ULfGXNgCYgLhMk14FEDUAHP6LC2ZPpUNMwHS9WtsFmIDdGYUB2M3Ieoma4q9hADABcRkneRhQzABw9x8XxB5Lx5gArdUBTMD2zBrtNcATjV62AGqLv5YBwASEK4LkI4FiBoC7%2F%2FAA9lwy1QRIrg5gAjZn2KgGQPKV0LXmrwXx1zQAmICwzJLcBhAxANz9hwVulFK5JmCZ04e%2B%2FJXF0wWxH0zAemKjbgG0bgCsiL%2B2AcAEhH3TSR0GxACE8aZUJAFMwCEwaz8ljAGITGQDxS2JfwkDgAnYnXRSqwAiBoDl%2F90BG7EEJsCeCRjVALT6i4DWxL%2BUAcAE7FYMicOA2QaA5f%2FdgRq5BCbAngkY7ceAfARaNAAWxT%2F11wBTvwP5KeHN5CS2AbINAG%2F%2BS03tcephAmyZAAyA%2FblnUfw9tZeeenLxT8kPJmA9bYltgGwDwPJ%2FyanQbl%2BYADsm4K5vfNX5rYCRPi2tAFgV%2F1oGgO0AvVWALAPA8v9IX6H514oJsGECMAD5uazVgmXxr2kAMAHrMy73nQBZBoC7f62vgX7bxQTUNwEjGoDr16%2B75%2F7lvzgxsfye9vR545nvV5141sXfw3n%2BM590NTmxHXA8RXO3AZINAD%2F8U%2FW7ounOMQHO1fwiG%2B1lQF78f%2FSjH0fPmV3mYNffYzpsQfwtGABWAk5mVc5hwGQDwPJ%2FzPSm7CoBTEA9EzCSAUgVf4kZu80gLP%2FNv%2BiqxK9mSlzT9z58v0Qz2W3UNNDZgxduIGcVINkAsPwvHMUBm8ME1DEBo7wLoKb49zqdrRgAVgKOZ1jqOwGSDAB3%2F71O7%2FLXhQmoYwJ6fxQQ8Zefy6XfARByBawEHFJK3QbAAIRkGWVUCWACypuAng8CIv4607XGOwBCrgQT4FzqNkCSAWD5PyQtKRNDABNQ1gT0eg4A8Y%2BZdXFlaz8BsG20mADnUrYBog0Ay%2F9xk4bS4QQwAeVMQI%2FnABD%2F8LmWUtLS%2Fv%2B68Y9uAlK2ATAAKTOBOmoEMAHlTEBP5wAQf7UpuWjY6vL%2F6lWPbAJStgGiDQDL%2F7oTjdadwwSUMQG9nANA%2FPW%2FNVoxAJ7EqCZA3QDw8h%2F9iUYPhwQwAfpfZD0YAMS%2FzDeG5f1%2FtgNuEYjdBohaAWD%2Fv8xkoxdMwJQDmnczrZ8DQPzLfVNY3%2F%2FHBBwSiF0FiDIALP%2BXm3D0hAkoYQJaPQeA%2BJf7hmhp%2BX%2F0MwEYgHLzgp4KEWA7QGc7oNUtAMS%2F0MS72U3LBmDEMwEx2wDBKwAs%2F5eddPR2nAAmQNYEIP7MsFACLS7%2Fj7wSoGIArp06f3k%2Bd%2FuhSUM5CEgTwATImADEXzoz%2B22v9bv%2F5chonqexlAEx2wDBKwDs%2F1sK8bhjwQTkmQDEf9y5k3LlrZ3%2B33WNw5iAvdmFu29cvbKLR5ABYPl%2FF0b%2BXpIAJiDNBCD%2BJbO0%2Fb56uvsfbSUgdBsAA9D%2BPB3yCjABcSYA8R9ymmRddK8GYISDgaHbAEEGgOX%2FrHlEZSUCmIAwE4D4KyVg5832cPhvW4h63g7AAHQ%2BObm8QwKYgO0mAPFnpqQQ6Pnuf5TtgJBtgJ0rAOz%2Fp0wf6pQkgAlYbwIQ%2F5JZ2Fdfvd%2F9j2ACMAB9zUmuZgsBTMBxE4D4M11SCYxy99%2B7CQjZBti5AsD%2Bf%2Bo0ol5pApiAQxPwsad%2F3%2Fn3%2FLf24Q1%2FNiI20t1%2F7ybgfQcvbtX4rX%2Fk1%2F9sTEhGEU5gdBPgxf%2B9D380HJiRkoi%2FjUCMePffswnYtQ2w1QCw%2F29jUjKKOAKjmgDEPy5PKH2SwKh3%2F72aAAwAs3xIAqOZAMR%2FyDQXvejR7%2F57NAG7zgFsXQFg%2F190ftFYYQKjmADEv3Biddgd4n8yqL28J2DbOYCNBoD9%2Fw5n%2BYCX1LsJQPwHTGqFS%2B7tnf9SiHowAdu2ATYaAPb%2FpVKIdmoT6NUEaIv%2FpRtz9%2FjpnQ8KRYeXA3%2FRyFQrcPe%2FHW%2FrJgADoDp9aLwFAm%2BcOXA%2FuPMtkaF%2B6MtfcXc88GB0W%2BfOnXPnzt0eXe%2BFJ77gXnji88fqlRD%2Fizfmbn9v5i6fkTMBiH90%2BNUrcPBvN%2BKWTcC2cwAbZzb7%2F7uTghJtEejFBJQS%2Fym6F0%2FPRFYCEH9784W7%2F%2FCYtGoCMADhMaZk5wRaNwHv%2FehHVZ%2Fz98v%2B%2Fs5%2F9XP5zJ7b30tPDsQ%2FnZ1WTcQ%2FnmyrJmDTQcC1KwAcAIxPDGq0Q6BlE6BJeZP4%2Bz5ztgIQf82opbfN0n8auxZNwKZzAGsNAAcA0xKDWu0QwAQcj9U28c%2FZCkD8bc4JTv3nxaU1EzB3s0v3HFy9uHrVGIC8PKB2wwQwAYfBCxH%2FKcwxWwGIv83JgfjLxKUlE7DpHMBaA8ABQJkEoRX7BEY3ATHiH2MCEH%2Bbuc%2B%2Bv2xcWjIB684BYABk84HWGiQwqglIEf8QE4D425wEiL9OXFoxAevOAZwwAOz%2F6yQJrdomMJoJyBF%2FH8lNhwIRf5t5jvjrxqUFE4AB0M0BWm%2BcwCgmIFf8pzCvmgDE3%2BYEeOPZZ9zzn%2F6EzcF1NCrrJmDdQcATKwDXTp2%2FPJ%2B7%2FY7iwqVAIJhAbRPwnvfc6c6cORM83tiCUuK%2FagIQ%2F9hIlCmP%2BJfhPPVi2QSsOwh4wgBwALBswtCbPQK1TEBr4j9F7uKN6%2B6xn%2F7EXiAZkePEf%2FkksGwCVg8CYgDK5wc9NkCgtAloVfzdm2%2B52Wuvuc%2B94zb3ubOnG4jsGEPkzr9unK2agK0GgDcA1k0aerdFoJQJaF38p6h99PSe%2B9rtZ20FccDRIP42gm7RBKweBDy2AsATADYSh1HYIaBtAnoRf0yAjZzltL%2BNOFg9E4ABsJUfjKYBAlomoDfxXw7l07efdQ%2Bfzvj1oAbywtoQEX9rETkcj6WVgNUnAY6tAPAEgM0EYlT1CUibgPt%2B%2FdebOu1%2FFIGbe%2F4hEcEEhFCSKYP4y3DUasWKCVh9EuCYAeAJAK3w024PBKRMwMee%2Fv0qP%2BmbHYMI8Z%2F64nBgNvWdDXDSfyciEwUsmAAMgIlUYBCtEsg1ASOJPyZAN8v9YT9%2F5%2F%2FGM9%2FX7YjWxQhYMAHLTwIcrQDwBIBYjGmocwKpJmBE8V9OBVYD5CYGS%2F5yLEu3VNsELB8EPDIAPAFQOg3or2UCsSZgdPFnNUAm27nrl%2BFYu5WaJgADUDv69N8FgVATgPifDPcr7%2F6lLnKg5EVw11%2BStn5ftUzA8pMArADox5keOiawywQg%2FieDz9MBcROCF%2FvE8WqpdA0TsHwQ8NYZAH4EqKW8YayGCGwyAYg%2F4p%2BTpiz359Brp25pE7DWAPAIYDsJw0jtEVg1AYg%2F4p%2BapQh%2FKrl265U0ARiAdvOEkRsmMJkAxB%2FxT0lThD%2BFWj91SpqA6VHAoy0AVgD6SSSupB6Bu77xVXfmkYfUBnDpxtxd%2FMt%2FxD8JL%2FkJHQN7%2FttJIfyhmdR%2FuVImYHoSYGEAeAdA%2F4nFFeoTQPy584%2FJMoQ%2FhtY4ZUuYgGMGgHcAjJNcXKkOAcQf8Q%2FJLEQ%2FhBJltE0ABoAcg4AQAcS%2FvPj7Z%2BL9544HP%2BLueOBBoUjKN%2BMF3394Za88295b1DQB07sAFlsArAD0nkpcnxYBxL%2BO%2BE8GYOp9MgIWDIEX%2FTNnbnP%2F51%2F%2FHu%2Fp15p4g7SrZQKOGQB%2BBniQbOIyRQkg%2FjbEf11Qlw3BYqVAYZVgurv3P8az%2FP%2BLJhmNDU9AwwRMjwIeHgLkJUDDJxkA4ggg%2FnbFf1ckvTlYNQXTf%2FP%2Ffduv6yH0u%2Bjydw0C0ibgmAHgEUCNkNFmrwQQ%2F3bFv9ec5Lr6JyBtAvy7ABYrABiA%2FpOHK5QhgPgj%2FjKZRCsQiCcgaQIwAPH8qTEwAcQf8R84%2Fbl0IwSkTMDCAPASICNRZRimCSD%2BiL%2FpBGVwQxGQMAH%2BXQAYgKG%2BT8QCAAAgAElEQVTShotNIYD4I%2F4peUMdCGgSyDUBGADN6NB2FwQQf8S%2Fi0TmIrokkGMCMABdpgQXJUUA8Uf8pXKJdiCgRSDVBCwMAG8B1AoL7bZMAPFH%2FFvOX8Y%2BFoEUE%2BDfBogBGCtPuNoAAog%2F4h%2BQJhSBgCkCsSYAA2AqfAzGAgHEH%2FG3kIeMAQIpBGJMAAYghTB1uiWA%2BCP%2B3SY3FzYMgVAT4F8HPON3AIbJCy50CwHEH%2FFngkCgFwIhJgAD0Eu0uY4sAog%2F4p%2BVQFSGgEECu0wABsBg0BhSWQKIP%2BJfNuPoDQLlCGwzARiAcnGgJ4MEEH%2FE32BaMiQIiBLYZAIwAKKYaawlAog%2F4t9SvjJWCOQQWGcCMAA5RKnbLAHEv7z4v%2FmH%2F9P9j4%2F%2FVrM5w8Ah0DqBVROAAWg9oow%2FmgDiX178z507586du9298MQX3AtPfD46ZlSAAARkCCybgIUBeGXv%2FFymaVqBgG0CiH898Z96xgTYniOMrn8CkwnAAPQfa67wJgHEv774YwKYjhCwQeDIBLACYCMgjEKPAOJvR%2FwxAXp5TssQiCHgTQBbADHEKNscAcTfnvhjApqbRgy4UwIYgE4Dy2U5h%2FjbFX9MADMUAvUJYADqx4ARKBBA%2FMuL%2F5kzZ9x73nNndDQ1DgZ%2B4O%2Ff5t77N%2Fbct37vrejxUAECoxDAAIwS6YGuE%2FEvL%2F5Tj9Mjf7HpJmkCvPh%2F4O%2BdXgzh9f91IG4CPvCZ%2B91dD%2FyK%2B%2FZjX4%2B9TMpDwBQBDICpcDCYXAKIfz3xt2AClsV%2FGo%2BkCfDi%2F2ufuf%2FQXDz7GiYgd8JSvyoBDEBV%2FHQuSQDxry%2F%2BNU3AOvGXNAHL4n%2FULiZAcgrTVmECGIDCwOlOhwDib0f8a5iAbeIvYQLWiT8mQGcu02o5AhiAcqzpSYkA4m9P%2FEuagBDxzzEB28QfE6A0qWm2CIHZtVPnL8%2Fnbr9Ib3QCAWECiL9d8S9hAmLEP8UEhIg%2FJkB4UtNcEQKLFwFhAIqwphMFAoi%2FffHXNAEp4h9jAmLEHxOgMMFpUpnA7AoGQBkxzesQQPzLi%2F9LTz3p%2FD8f%2BvJX3B0PPBgdWMlHBHPEP8QEpIg%2FJiA6JahQlQAGoCp%2BOk8jgPjXE%2F%2Bp55omQEL8t5mAHPHHBKTNaWrVIIABqEGdPjMIIP71xb%2BmCXA%2F%2BOLRS34y0uhY1eX3BEiIPyZAKjK0o0sAA6DLl9ZFCSD%2BdsS%2Figl4%2FovOGwCNjzcBr7%2F5a0cv%2BZHqg5cFSZGkHXkCGAB5prSoQgDxtyf%2BRU2AovgvruOvfsjN7%2F2gSu5iAlSw0mg2AQxANkIa0CeA%2BNsV%2FyImoGHxZztA%2F%2FuBHlIJYABSyVGvEAHE3774q5qADsQfE1Doy4Ju4gjM3KXZy3v3XZy5%2BeNxNSkNAX0CiH874q9iAjoSf0yA%2FvcFPUQSwABEAqN4MQKIf3viL2oCOhR%2FTECxrw86CiGAAQihRJnSBBD%2FdsVfxAT8yZfVTvsvxqd44C90rnAwMJQU5dQIeANw7fR9%2B%2FOD%2BWW1TmgYAhEEEP%2F2xT%2FHBLzzv37anXnjD9w77jwdkTURRQ2IPysBEfGiqB6B%2Bd4FDIAeXlqOJID49yP%2BKSbAi%2F%2F8xf%2B%2BqHr2ztPyJsCQ%2BGMCIr8cKC5PAAMgz5QW0wgg%2Fv2Jf4wJWBb%2FqZ6oCTAo%2FpiAtO8KagkRwAAIgaSZLAKIf7%2FiH2IC1om%2FqAkwLP6YgKyvDipnEHjoh%2B%2B8MPP1X9k7P89oh6oQSCaA%2BPcv%2FttMwDbxFzEBDYg%2FJiD564OKGQQevfZnMwxABkCq5hFA%2FMcR%2F3UmIET8s0xAQ%2BKPCcj7LqF2PAEMQDwzaggRQPzHE%2F9lE%2FCrP3vq6MBfaEpFnQloUPwxAaGZQDkJAkcG4Nqp85fnc7cv0ShtQGAXAcR%2FXPH3V%2F6Rf3jKnbvrYFearP17kAloWPwxAUlpQaVoArMrj1577fAMAAYgmh4VEgkg%2Foh%2FqvgHbQd0IP6YgMQvF6pFEFgyAPweQAQ3iiYTQPwR%2F1zx32oCOhJ%2FTEDy1wwVQwjM3KVHX%2Fmzi4sVAAxACDHK5BBA%2FBF%2FKfFfawI6FH9MQM43DnW3Elg2ALwOmGTRJID4I%2F7S4n%2FMBNx%2Fv5vf%2B0HNFK7eNr8dUD0EfQ0AA9BXPK1eDeKP%2BGuJvyd77qHz7tQv%2F7Kbv%2Bv9VqeA2LgwAWIoaWi%2Bd%2BHRV1%2B9cngIkB8EIiEUCCD%2BiL%2B6%2BP%2FSnx9Cftf7MQEKc5gm%2ByTgHwH0V7b4P%2F7D2wD7DHStq0L8Ef9i4j%2BhxgTUmu702xiBEwaARwEbi6Dh4SL%2BiH9x8ccEGP5GYGjWCGAArEWkk%2FEg%2Foh%2FNfHHBHTyLcJl6BI4fAfAsS0AVgB0kY%2FQOuKP%2BFcXf0zACF81XGMOgZtPABwzALwLIIcodRH%2FscX%2F%2FEN77q89rPejoovT%2FtOBv9DpxpmAUFKUG4nAOgPAkwAjZYDstSL%2BY4v%2FdPVaJiBJ%2FFkJkJ3ktNYPAQxAP7GsfSWIP%2BK%2FTEDaBGSJPyag9tcD%2FVskcPMdAMe2APy%2F8CigxWjZHRPij%2Fivy04pEyAi%2FpgAu18gjKwKgekJgBMGgIOAVeLRZKeIP%2BK%2FLXFzTYCo%2BGMCmvyOYdA6BDAAOlyHaRXxR%2FxDkj3VBKiIPyYgJGSU6Z7ArUcAT6wA8CRA99HPvkDEH%2FGPSaJYE6Aq%2FpiAmNBRtkcCSwcAT24B8JsAPYZc7JoQf8Q%2FJZlCTUAR8ccEpISQOr0QwAD0Esmy14H4I%2F45GbfLBBQVf0xATiip2zKBpScATqwA%2BP%2FAkwAtR1dn7Ig%2F4i%2BRWZtMQBXxxwRIhJQ2GiOwfAAQA9BY8GoMF%2FFH%2FCXzbtUEVBV%2FTIBkaGmrAQI7DQCPAjYQxUJDRPwRf41Um0yACfHHBGiEmDZNEjj%2BBMDaFQCeBDAZueKDQvwRf82k%2B7tfus%2Bd%2B9U%2F1%2Bwivm1%2BOyCeGTXaIbByAHCtAeA3AdqJp9ZIEX%2FEXyu3fLsf%2B8J59973%2F0Szi%2FS2MQHp7KhpmwAGwHZ8LIwO8Uf8NfPQtPizHaAZetquTWDlCYC1KwD%2BP%2FIkQO1I1ekf8Uf8NTOvCfHHBGimAG1XJLB6AHCjAeAgYMUoVeoa8Uf8NVOvKfHHBGimAm1XIXDyAOBGA8BBwCoRqtYp4o%2F4ayZfk%2BKPCdBMCdouTWDN%2Fv%2FmFQBeCVw6PNX6Q%2FwRf83ka1r8MQGaqUHbJQnEGAA%2FLs4BlIxOnb4Qf8RfM%2FO6EH9MgGaK0HYhAuv2%2FzeuAPg%2FcA6gUGQqdYP4I%2F6aqdeV%2BGMCNFOFtgsQwAAUgNxKF4g%2F4q%2BZq12KPyZAM2VoW5PAhuX%2F7SsAnAPQDEm1thF%2FxF8z%2BboWf0yAZurQthYBDIAW2bbaRfwRf82M%2Feu%2F8Vfc3%2Fz4LzS7sNM2bwy0EwtGsp3AmhcATRVm22pyELCfzEL8Ef8S2YwJKEG5bB%2BvP%2Fua%2B%2FZjXy%2FbKb2JEdi0%2F791C8D%2FkYOAYjGo2hDij%2FiXTEBMQEnaZfrCBJThLN%2FL%2BhcABa0A8MNA8uEo3SLij%2FiXzjnfHyagBnXdPjEBunxVWt%2By%2F797BYCDgCoxKdUo4o%2F4l8q1df1gAmrS1%2BkbE6DDVa3VLfv%2FOw2AL8A5ALXQqDaM%2BCP%2BqgkW2DgmIBBUQ8UwAe0Ea9v%2Bf5AB4BxAO8GeRor4I%2F6WshYTYCkaMmPBBMhw1G1l%2B%2F5%2FmAFgG0A3RsKtI%2F6Iv3BKiTSHCRDBaKoRTICpcJwczI79fwyA8fjFDg%2FxR%2Fxjc6ZkeUxASdpl%2BsIElOGc1MuO%2Ff8gA%2BALsQ2QhL9oJcQf8S%2BacImdYQISwRmuhgmwGZxd%2B%2F8YAJtxix4V4o%2F4RydNxQqYgIrwlbrGBCiBTW02YPk%2F3ABwDiA1DOr1EH%2FEXz3JFDrABChArdwkJqByAJa7xwAYCobSUBB%2FxF8ptYo0iwkogrloJ5iAorg3dhay%2FB%2B8AuALcg7ARmCnUSD%2BiL%2BtjEwbDSYgjZvlWpiA2tHZ%2FfjfNMKtPwa0fBm8Frh2UG%2F1j%2Fgj%2FnayMX8kmIB8htZawARUjEjg8n%2FcCgDnACpGFPHfBv%2Fp28%2B6h0%2FvqcXnpaeedP4fPnoEMAF6bGu1jAmoRD7g8b%2FoFQC2ASoFc6lb7vy586%2BfhXojwATosa3VMiagPPnQ%2Ff%2BoFQAMQPlALveI%2BCP%2BdTOwTO%2BYgDKcS%2FaCCShIO2L5P94AsA1QMJIs%2B7PsXyXdqneKCageAvEBYALEka5vUNMAsApQKIgs%2B28FzZ5%2F%2BTws3SMmoDRx%2Ff7%2B6EvPuRe%2B9Jx%2BRwP3ELP8H70CgAEom1ks%2B7PsXzbjbPWGCbAVD4nRYAIkKG5oI%2FLuP80AsA2gGEGW%2FVn2L5JezXSCCWgmVMED%2FfZjX3d%2BS4CPMIESBsAP%2BZW983PhodMcy%2F4s%2BzML1hLABPSXGP%2FpwX%2FX30VVvqLY5f%2BkFQC2AXSjzLI%2Fy%2F66GdZm65iANuO2adQcChSOZ8Ldf7oBYBtAOHqHzSH%2BiL9KYnXSKCagk0DevAy2AgTjWdIAsA0gGLibTb3r8c%2B6c7%2F7WfmGb7Z46cbcXfzLf8Q%2Fb77lZq%2Fp7Odx2l88Ws03iAloPoRHF8AqgFwsU5b%2Fk1cA2AaQC5xvCfHnzl82o%2FpuDRPQT3xZBRCIZeLdf54BYBtAIHKI%2FzqI3PmLpFbXjWAC%2BggvqwACcaxhAFgFEAicc%2B7ut6%2FKNLSmFZb9T0Lhh33U0q14w5iA4shVOmQVIA9r6vJ%2F1gqAr%2Fzy3n0XZ27%2BeN7wx62tufSP%2BCP%2BI8wsTED7UWYVICOGGXf%2F2QbgGtsAGZHTu%2FtH%2FBH%2FrMRsrDImoLGArQwXA5ARv5oGgG2A9MBp3f0j%2Foh%2Fela2WxMT0G7s%2FMjZBkiLX87yf%2FYKwMIAsAqQFDmNvX%2FEH%2FFPSsZOKmEC2g0kBiAhdpl3%2FyIGwDfCq4HjgydtAK4cOHfh%2BkH8QHbV4Dn%2FXYT4uyECmABDwYgYCtsAEbBuFs29%2BxczANdOnb88n7v9%2BEsYs4bG8v%2FsTcR%2FOZs47T%2Fm3PJXjQloM%2Fb8PkBE3ATu%2FuUMANsAEZGTf%2BWvytI%2Fd%2F5RMaWwLQKYAFvxCBkNBiCE0s0ylgyAHxKrAOHBk17%2Bv3B97q4cCL7mF%2FEPDyYlzRLABJgNzdqBcQ4gPF4Sy%2F9iKwC%2BId4JEB48aQMguvyP%2BIcHkpLmCWACzIfoaIAYgMBYCd39ixoA3xiHAXcH8MwjDy1%2B9U%2FqI7r8j%2FhLhYV2DBHABBgKxpahYADC4iR19y9uANgG2B1AswYA8d8dPEo0SwATYD90GICAGAne%2FcsbAA4D7oyg9BMAIisAiP%2FOuFGgfQKYANsx%2FKMvPede%2BNJztgdZe3SWDYBnwyrA9gyRNgDZBwAR%2F9pTmv4LEsAEFIQd2RUrALuBSS7%2Fi68ALAwAqwBbo2hqCwDx3z3jKNEdAUyAzZBiAHbERfjuX8UA%2BEY5DLg5kGYMAOJv81uQURUhgAkogjmqE94DsB2X9N2%2FmgHgkcByBiDpFcCIf9QXE4X7JIAJsBVXDMCWeCjc%2FasZALYBtk%2Bsqu8BQPxtfesxmqoEMAFV8R%2FrHAOwORYad%2F9qBmBxFoDfB9gYTf8eAL8VIPUJPgiI%2BEshp52OCGAC6geTJwDK3%2F3rGgAOA26MqPQ5gEUgd%2F0YEOJf%2F1uOEZglgAmoGxoMQGcGgFWAzQHVMABb3weA%2BNf9dqP3JghgAuqFieX%2FDeyV9v6n3maaIecswGa60tsAvqe1WwGIv2aK03ZnBDABdQKKAejQALAKsHkySb8QaOrpmAlA%2FOt8m9Fr0wQwAWXDx%2FL%2FZt5ah%2F%2BKrAAsDABnATZGV%2FppgGMm4Odvutlrr6nM5KdvP%2BsePr2n0rZv9KWnnlz8wwcCtQhgAsqR5wVAde7%2Bfa%2BqWwDTZfFEwPoAa60CXL9%2B3f3tP33VfefGgfgsRvzFkdKgUQKYAP3AcPdf7%2B6%2FnAFgFaDYKoAX%2Fx%2F96MeL%2Fn7zZ2%2BJmgDEX%2F8LkR5sEcAE6MYDA1Dv7r%2BYAVhsBfBegLWRlnwiYFn8p86eeOuGe%2BLNX2TN4o%2Be3nOfO3sby%2F5ZFKncKgFMgE7kEP%2B6d%2F9lDQCrABujLbEVsE78JUyAF%2F%2Bv3X5W5xvgZqvs%2BavipXEBApgAAYgrTWAA6t79FzUArAJsn0A5jwVuE%2F%2Bp1%2B%2FeOHDfefsgeDWgxF2%2FHxviL%2F%2FFSos6BDABclwR%2F%2Fp3%2F%2BUNAKsAW2dQigkIEf%2FVTv22gP9898bbR2cEvOD7j1%2Fq9x%2FNU%2F7TeBB%2FuS9UWipDABMgw5nn%2Fuvf%2FRc3AKwCbJ88secBUsRfZvrmt4L45zOkhToEMAF53Hnsz8bdfx0DwCrA1tkTagIQ%2F7wvIWpDIIcAJiCNHkv%2FW7gpv%2FZ3Xc9F3gOw2jFPBOStBCD%2BaV8%2B1IKAJAFMQBxNxH87L%2B23%2FtkxAKwC7Jw5m1YCEP%2Bd6CgAgWIEMAFhqBH%2FHZwq3P1X2QKYMLAKsHvirJoAxH83M0pAoDQBTMB24q8%2F%2B5rz%2B%2F58NhOocfdf1wCwChA0HyYTgPgH4aIQBKoQwASsx474B6Rjpbv%2FqgbAd84qQEByOOe8CfjFv%2F9XYYWNleK0v7GAMBw1ApiA42gR%2F5BUm1159NprF0JKapSpcgjwaBuAVYDwmD78YTf7Wlu%2FkIf4h4eXkn0QwAQcxhHxD8zninf%2F1VcAWAUITJKpWEMmAPGPjC3FuyEwuglA%2FANTubL4mzAAfhCv7J2fByKjWAMmAPEnTUcnMKoJQPzDM7%2FWwb%2FlEVbdApgG8vLefRdnbv54OLrBSxo2AYj%2F4LnJ5R8RGM0E%2FPCP381p%2F9D8N3D3b2YFgFWA0KxZKmfQBCD%2BCXGkStcERjEBv7j%2BLvdffvNPu46l5MVZuPs3ZQCucSAwPr8MmQDEPz581BiDQO8mAPGPzGMjd%2F%2BmDIAfDI8FRiaSc%2B6NMweLpwPueODB%2BMpCNRB%2FIZA00y2BXk0A4h%2BbsnUf%2B1sdrYkzANOgWAWITabD8t4E%2FMU%2F%2FYS797HfTmsgo9bzn%2Fmke%2BOZ72e0QFUIjEGgNxOA%2BCfkraG7f3MrAH5AHAhMSKoKJuCNZ59xz3%2F6E2mDpRYEBiXQiwlA%2FBMS2Jj4mzQAflA8FpiQXDdNwA%2FufGuxEqC1GuCF3y%2F5c9efFiNqQaB1E4D4p%2BWwlYN%2Fy6M3tQXAVkBaYi3X8tsB3gT4j6QRQPjzY0MLEJgItGoCEP%2FEHDZ49292BcAPjAOBiYm2tBIwtTCtBsSuCnjR93f60%2F%2Bmj4iaEIDAKoHWTADin5rDtg7%2BmV8BWBgAHgtMzbZFveWVgOWG7njwI8eeGPD%2FPn2mZX0v%2BIs2ONyXFQMqQyCEwMe%2BcN699%2F0%2FCSlarczrf%2Fxu961%2F8mK1%2FpvueL534dFXX71i8RpMbgFMoDgQmJcym0xAXqvUhgAEpAlYNgGIf0a0jS79T1dk2gAsVgJOnb88n7v9jBAMXRUTMHT4ufiGCFg0AX%2F4b29z%2F%2FvpHzZE0dZQLR78WyZk3wCwFZCd0ZiAbIQ0AIEiBKycC%2FD7%2FS%2F8hzcR%2F5yoG7%2F795dm3gCwCpCTgbfqYgJkONIKBEoQqLUagPALRbcB8W%2FGAPiB8m6A%2FMTEBOQzpAUIlCRQyggg%2FLJRtb70P11tEysAi1UAtgJEMhQTIIKRRiBQlIA3Av4j%2FbQAwq8Qxkbu%2FptaAfCD5akAmWTFBMhwpBUI1CCQYwa84P%2Fk6p679t2fs7%2BvEbyGxL85A7BYCeCpAJG0xQSIYKQRCFQn4A8OTp%2B7H37n0f%2F%2F82s%2Fcz%2B5emuRl9P8%2BqFqZem%2FuS2AacBsBcglMSZAjiUtQQACgxNo7O6%2FyRUAtgJkJxkmQJYnrUEAAgMSaFD8mzUAbAXITjBMgCxPWoMABEYiYPdd%2F7ui0MxTAKsXwlbArtDG%2FR0TEMeL0hCAAAQWBAy%2F639XhJo1AGwF7Apt%2FN8xAfHMqAEBCAxMoNGl%2FyliTRsAtgLkJx4mQJ4pLUIAAh0SaFz8fUTaNwC8IEh8ZmECxJHSIAQg0BmB1h75W4e%2FeQOwWAXABIhPLUyAOFIahAAEeiHQwd1%2FFysAUz7xlkD5mYUJkGdKixCAQOMEOhH%2FrgwA5wF0JhUmQIcrrUIAAi0SaPeRv263AJYvjF8NlJ9UmAB5prQIAQg0SKDhR%2F6GMACcB9CZVJgAHa60CgEINEKgo6X%2FiXgXhwBX04fzADoTChOgw5VWIQAB4wQ6FP%2FuzgAspxC%2FGqgzoTABOlxpFQIQMEqgU%2FHv2gD4i8ME6EwoTIAOV1qFAATsEejhef9NVLvcApgulvMAepMJE6DHlpYhAAEjBDo79LdKtWsD4C%2BW8wB6EwkToMeWliEAgcoEOl76n8h2bwAwAbqTCBOgy5fWIQCBCgQGEP%2FuzwAspw3nAfQmESZAjy0tQwACpQn09bKfbfSGWAE4OhNw6vzl%2Bdztl06nEfrDBIwQZa4RAv0T6PnQ33BnAI6tAvCjQaqzFxOgipfGIQABbQKdH%2Fob2gD4i%2BfJAN0ZhAnQ5UvrEICAEoFB9v2X6Q21BTBdOE8GKE2gm81iAnT50joEICBMYEDx9wSHNAD%2BwjEBwhNopTlMgC5fWocABIQIDCr%2BQxsATIDQ5NnSDCZAnzE9QAACGQQGFv%2FhDYAHwOOBGZMnoComIAASRSAAgQoExnncbxPcYbcAloFgAnTnHiZAly%2BtQwACsQQQf1YAbuYMTwbETp748piAeGbUgAAEdAg89MN3Xrj7xtUrOq230yorAJiAYtmKCSiGmo4gAIFNBAZ71n9bImAAluiwEqD%2FnYEJ0GdMDxCAwAYCiP8xMBiAlTzBBOh%2FdWAC9BnTAwQgsEIA8T%2BREhiANbMEE6D%2F1YEJ0GdMDxCAwE0Cgz%2FutykPMAAbyPCiIP2vDkyAPmN6gMDwBBD%2FjSmAAdgyOzAB%2Bl8dmAB9xvQAgWEJIP5bQ48B2DEzMAH6Xx2YAH3G9ACB4Qgg%2FjtDjgHYiYjfDQhAlF0EE5CNkAYgAIGJAOIflAsYgCBMmIBATFnFMAFZ%2BKgMAQh4Aoh%2FcB5gAIJRYQIiUCUXxQQko6MiBCCA%2BEflAAYgChcmIBJXUnFMQBI2KkFgbAKIf3T8MQDRyDABCciiq2ACopFRAQLjEkD8k2KPAUjChglIxBZVDRMQhYvCEBiTAOKfHHcMQDI6TEAGuuCqmIBgVBSEwHgEEP%2BsmGMAsvBhAjLxBVXHBARhohAExiKA%2BGfHGwOQjdA5fjtAAOKOJjAB%2BozpAQLNEOCHfURChQEQwYgJEMK4tRlMQAnK9AEB4wQQf7EAYQDEUGICBFFubAoTUIIyfUDAKAHEXzQwGABRnIcmwM3nj8%2Fnbl%2B4aZq7SQATQCpAYDQCsytuPrv06KuvXhntyjWvFwOgRPfaqfOXMQFKcJ1zmAA9trQMAVsEZlcevfbaBVtj6mM0GADFOPJLgopwMQG6cGkdAhYIcNJfNQoYAFW8PCaojJeVAG3AtA%2BBWgQQf3XyGAB1xJgAbcRsB2gTpn0IFCaA%2BBcBjgEogpknBLQxYwK0CdM%2BBAoR4KR%2FIdD%2Bl5P5FCPAEwK6qDEBunxpHQK6BDjpr8v3ZOsYgNLEHVsCmsgxAZp0aRsCWgQ46a9Fdlu7GIAa1DEBqtQxAap4aRwCsgTY75flGdEaBiAClnRRHhOUJnqrPUyAHltahoAYAcRfDGVKQxiAFGqCdfghIUGYK01hAvTY0jIE8giw35%2FHT6Y2BkCGY3YrrAZkI1zbACZAhyutQiCdAPv96exka2IAZHlmtYYJyMK3sTImQIcrrUIgmgBL%2FtHINCtgADTpJrSNCUiAFlAFExAAiSIQ0CTA8%2F2adJPaxgAkYdOvxI8JyTPGBMgzpUUI7CbAfv9uRnVKYADqcA%2FqldWAIExRhTABUbgoDIE8Aiz55%2FFTro0BUAac2zwmIJfgyfqYAHmmtAiBEwRY8jefFBgA8yE6HCBGQDZQmABZnrQGgVsEWPJvJRswAK1EChMgHilMgDhSGhydAEv%2BTWUABqCpcB3%2BqqCbzx%2Bfz91%2BY0M3OVxMgMmwMKjmCHDX31zIHL8G2GLM2BIQjhomQBgozY1FgLv%2BZuPNCkCzoeNcgGToMAGSNGlrGAIc9Gs61BiApsN3OHgOCMoEERMgw5FWRiDA63x7iDIGoIcoYgLEoogJEENJQ70S4K6%2Fm8hiALoJJasBUqHEBEiRpJ2eCNz15qkrf%2BvH1y70dE2jXwsGoMMMYEsgP6iYgHyGtNALAU749xLJ1evAAPQaWbYFsiOLCchGSAOtE%2BCEf%2BsR3Dp%2BDEDX4WVbIDe8mIBcgtRvkwB3%2FW3GLW7UGIA4Xs2WZlsgPXSYgHR21GyQAHf9DQYtbcgYgDRuzdbCCKSFDhOQxo1aLRHgrr%2BlaEmMFQMgQbGxNnidcFrAMAFp3KhlnQDCbz1CWuPDAGiRbaBdVgPig4QJiGdGDcMEeKbfcHD0h4YB0GdsvgeMQFyIMAFxvChtkAD7%2FAaDUn5IGIDyzM32iBEIDw0mIJwVJS0RYLnfUjRqjwUDUDsCBvvHCIQFBRMQxolSFggg%2FBaiYG0MGABrETEyHm8C%2FFBmbv64kSGZHAYmwGRYGNQRAYSfZNhMAANAdmwlwGrA7gTBBOxmRInSBBD%2B0sRb7A8D0GLUKowZI7AdOiagQlLS5RoCCD9pEU4AAxDOipL8vsDWHMAEMEWqEuBkf1X8LXaOAWgxagbGzIrA%2BiBgAgwk52hDQPhHi7jY9WIAxFCO2RBG4GTcMQFjzoXiV43wF0feW4cYgN4iWul6vBHYm80fmc%2FdfqUhmOoWE2AqHB0Nhj3%2BjoJZ%2FVIwANVD0NcAeHzwVjwxAX3ldt2rQfjr8u%2BzdwxAn3GtflUYgcMQYAKqp2LjA0D4Gw%2Bg6eFjAEyHp4%2FBjX5OABPQRx6XvQqEvyzvMXvDAIwZ9ypXPfI5AUxAlZRrr1MO9rUXs4ZHjAFoOHzVVVgAAAKASURBVHitDv3a6fv2Dw7c%2FmivGcYEtJqx2uPmbl%2BbMO2vJ4ABIDOqEhhtewATUDXdDHU%2Bu%2BJm82%2B6g70rj7766hVDA2MoAxHAAAwUbMuXOtKhQUyA5UzUHht3%2B9qEaT%2BcAAYgnBUlCxEY4awAJqBQMpnohrt9E2FgECcIYABICtMEet4iwASYTj2BwXG3LwCRJhQJYAAU4dK0HIFeDw5iAuRyxEZLiL6NODCKEAIYgBBKlDFFoLfzApgAU%2BmVMBhEPwEaVQwQwAAYCAJDSCfQixnABKTnQJ2aiH4d7vQqSQADIEmTtqoSaH2bABNQNX0COkf0AyBRpCECGICGgsVQ4wi0%2BDQBJiAuxrqlZ4fP589nl3hWX5c0rdchgAGow51eCxNoaasAE1A4OY51d3iX%2F9Dr73B337jKC3pqhoK%2B1QlgANQR04FFAtYNASagVNbwjH4p0vRjjwAGwF5MGFFhAtPZAd%2Btpd8nwARoJAKCr0GVNtskgAFoM26MWpGAJUOACcgJ9K09fN8K%2B%2Fg5LKnbIwEMQI9R5ZrECdQ0BZiA0HAi%2BKGkKAeBwxVPPhCAQBKB6RzB3mz%2ByHzu9pMaCayECbgF6o7re%2B6NM%2FOjX9Pj7j4wiSgGgRUCGABSAgKCBJZXCqSNwZgmgLt6wfSkKQgcI4ABICEgUIDAsjHw3aWag%2F5MwE2BX6xHzr%2FpDvaOHr1jz75AYtLF0AQwAEOHn4u3QmCdQfBjW7e10IoJOFqqnyAj8FbSjXFAYEEAA0AiQKARAt4kTEP9k3de33%2Fl3I1jI7%2Fr%2F516xP%2BH%2F%2FuOgxNXdMf12aKuNw%2B7P0t35ZsKezGfPkt37bxAZzddSkDACoH%2FD7m5nWNdA8TDAAAAAElFTkSuQmCC";

},{}],"5S0p9":[function(require,module,exports) {
chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id: "openSidePanel",
        title: "\u4fa7\u8fb9\u680f",
        contexts: [
            "all"
        ]
    });
});
chrome.contextMenus.onClicked.addListener((info, tab)=>{
    if (info.menuItemId === "openSidePanel") // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({
        windowId: tab.windowId
    });
});

},{}]},["6hEXZ","l1O93"], "l1O93", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBR0EsUUFBUTtBQUNSLElBQUksQ0FBQyxPQUFPLEtBQUssWUFBWSxZQUFZLGNBQ3ZDLE9BQU8sS0FBSyxZQUFZLFlBQVk7QUFFdEMsSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLFlBQVksWUFDckMsT0FBTztBQUNQLE9BQU8sS0FBSyxVQUFVLFlBQVk7QUFFcEMsSUFBSSxDQUFDLE9BQU8sUUFBUSxVQUFVLFlBQVksWUFDeEMsVUFBVTtBQUNWLE9BQU8sUUFBUSxVQUFVLFlBQVk7QUFFdkMsSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLFlBQVksY0FDckMsVUFBVTtBQUNWLE9BQU8sS0FBSyxVQUFVLFlBQVk7QUFHcEMsTUFBTSxVQUEwQyxPQUFPLEtBQUs7SUFDMUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUk7SUFDdkIsSUFBSSxRQUFRO1FBQ1YsWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxPQUFPLEtBQUssTUFBTTtZQUNwQyxRQUFRO1FBQ1Y7UUFDQSxJQUFJLEtBQUs7WUFDUCxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHO1lBQ3pCLE9BQU8sVUFBVTtRQUNuQjtJQUNGO0lBQ0EsSUFBSSxLQUFLLENBQUM7QUFDWjtrQkFFZTs7Ozs7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTtBO0E7QTs7Ozs7QSw4QztBLDJDO0EsNkM7QSw4QztBLDBDO0EsNkM7QSw0QztBLDZDO0EsOEM7QUdqQlIsU0FBUyxNQUFBLEdBQVMsS0FBb0M7SUFDM0QsT0FBTyxDQUFBLEdBQUk7UUFDVCxPQUFPLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtB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LFNBQVMsTUFBTSxPQUFPLHNCQUFzQixtQkFBbUI7UUFDbkUsZUFBZTtRQUNmLFVBQVU7ZUFBSyxPQUFPLFdBQVcsRUFBRTtTQUFFO0lBQ3ZDO0lBQ0EsSUFBSSxLQUFLO1FBQ1A7SUFDRjtBQUNGO2tCQUVlOzs7QUNoSGY7QUFDQTs7OztBQ0RBOztBQUNBLE9BQU8sUUFBUSxVQUFVLFlBQVksU0FBVSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVk7SUFDMUUsSUFBSSxRQUFRLGVBQWU7UUFDekIsTUFBTSxLQUFLLENBQUMsZUFBZSxFQUFFLElBQUksT0FBTyxDQUFDO1FBQ3pDLE9BQU8sY0FBYyxPQUNuQixJQUNBO1lBQ0UsTUFBTTtZQUNOLFNBQVMsQ0FBQSxHQUFBLHVCQUFJO1lBQ2IsT0FBTztZQUNQLFNBQVMsZ0JBQWdCLE9BQU87UUFDbEMsR0FDQTtRQUNFLHVEQUF1RDtRQUN6RDtRQUVGLGlCQUFpQjtRQUNqQixhQUFhO1lBQUUsVUFBVTtRQUEwQjtRQUNuRCxPQUFPLGNBQWMsTUFBTTtJQUM3QjtBQUNGOzs7QUNwQkEsT0FBTyxVQUFVOzs7QUNBakIsT0FBTyxRQUFRLFlBQVksWUFBWTtJQUNyQyxPQUFPLGFBQWEsT0FBTztRQUN6QixJQUFJO1FBQ0osT0FBTztRQUNQLFVBQVU7WUFBQztTQUFNO0lBQ25CO0FBQ0Y7QUFFQSxPQUFPLGFBQWEsVUFBVSxZQUFZLENBQUMsTUFBTTtJQUMvQyxJQUFJLEtBQUssZUFBZSxpQkFDdEIsbUVBQW1FO0lBQ25FLE9BQU8sVUFBVSxLQUFLO1FBQUUsVUFBVSxJQUFJO0lBQVM7QUFFbkQiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4wL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLTdkNGE4NDY5ODNkNGU1MDIuanMiLCJjaHJvbWUtZXh0LXRvb2xzLy5wbGFzbW8vc3RhdGljL2JhY2tncm91bmQvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzLy5wbGFzbW8vc3RhdGljL2JhY2tncm91bmQvbWVzc2FnaW5nLnRzIiwiY2hyb21lLWV4dC10b29scy9zcmMvYmFja2dyb3VuZC9tZXNzYWdlcy9lbmFibGVDb3B5LnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL3JhZGFzaEAxMi4xLjAvbm9kZV9tb2R1bGVzL3JhZGFzaC9kaXN0L2VzbS9pbmRleC5tanMiLCJub2RlX21vZHVsZXMvLnBucG0vcmFkYXNoQDEyLjEuMC9ub2RlX21vZHVsZXMvcmFkYXNoL2Rpc3QvZXNtL2N1cnJ5Lm1qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9yYWRhc2hAMTIuMS4wL25vZGVfbW9kdWxlcy9yYWRhc2gvc3JjL2N1cnJ5LnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrdHJhbnNmb3JtZXItanNAMi45LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrcnVudGltZS1qc0AyLjguM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvcnVudGltZS1qcy9saWIvcnVudGltZS1kNWQwMWU5OGI0ZTk2ZTYzLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrcnVudGltZS1qc0AyLjguM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvcnVudGltZS1qcy9saWIvaGVscGVycy9idW5kbGUtdXJsLmpzIiwiY2hyb21lLWV4dC10b29scy9zcmMvYXBwL3V0aWxzL3N0b3JlLnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwbGFzbW9ocStzdG9yYWdlQDEuMTAuMF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9zdG9yYWdlL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vcGlmeUA2LjEuMC9ub2RlX21vZHVsZXMvcGlmeS9pbmRleC5qcyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2JhY2tncm91bmQvbWVzc2FnZXMvZW5hYmxlTW9jay50cyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2FwcC9jb25zdGFudHMvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9hcHAvdXRpbHMvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9hcHAvY29uc3RhbnRzL2h0dHBTdGF0dXMudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9iYWNrZ3JvdW5kL21lc3NhZ2VzL3VwZGF0ZVJ1bGVzLnRzIiwiY2hyb21lLWV4dC10b29scy9zcmMvYmFja2dyb3VuZC9pbmRleC50cyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2JhY2tncm91bmQvbm90aWZpY2F0aW9uLnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrcnVudGltZS1qc0AyLjguM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvcnVudGltZS1qcy9saWIvYnVuZGxlcy9ydW50aW1lLWY1NzA1ZWJmMWY0NjMzYzguanMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9iYWNrZ3JvdW5kL2N0eC1tZW51LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB1PXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W107dmFyIGg9KCk9PnR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgQj1uZXcgU2V0KHUpLF89ZT0+Qi5oYXMoZSksRz11LmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFU9XyhcIi0tZHJ5LXJ1blwiKSxnPSgpPT5fKFwiLS12ZXJib3NlXCIpfHxoKCkuVkVSQk9TRT09PVwidHJ1ZVwiLE49ZygpO3ZhciBtPShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB5PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksYj0oLi4uZSk9Pm0oXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxmPSguLi5lKT0+bShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLE09MCxpPSguLi5lKT0+ZygpJiZtKGBcXHV7MUY3RTF9ICR7TSsrfWAsLi4uZSk7dmFyIHY9KCk9PntsZXQgZT1nbG9iYWxUaGlzLmJyb3dzZXI/LnJ1bnRpbWV8fGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lLHQ9KCk9PnNldEludGVydmFsKGUuZ2V0UGxhdGZvcm1JbmZvLDI0ZTMpO2Uub25TdGFydHVwLmFkZExpc3RlbmVyKHQpLHQoKX07dmFyIG49e1wiaXNDb250ZW50U2NyaXB0XCI6ZmFsc2UsXCJpc0JhY2tncm91bmRcIjp0cnVlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJiYWNrZ3JvdW5kLXNlcnZpY2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvVXNlcnMvZnJlZGh1L0Rlc2t0b3AvSXRlbXMvZnJlZC1pdGVtcy9jaHJvbWUtZXh0LXRvb2xzLy5wbGFzbW8vc3RhdGljL2JhY2tncm91bmQvaW5kZXgudHNcIixcImJ1bmRsZUlkXCI6XCJlZTA1ZmZlNjYzYTI3NGNhXCIsXCJlbnZIYXNoXCI6XCJkOTlhNWZmYTU3YWNkNjM4XCIsXCJ2ZXJib3NlXCI6XCJmYWxzZVwiLFwic2VjdXJlXCI6ZmFsc2UsXCJzZXJ2ZXJQb3J0XCI6NTM4MjJ9O21vZHVsZS5idW5kbGUuSE1SX0JVTkRMRV9JRD1uLmJ1bmRsZUlkO2dsb2JhbFRoaXMucHJvY2Vzcz17YXJndjpbXSxlbnY6e1ZFUkJPU0U6bi52ZXJib3NlfX07dmFyIEQ9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU7ZnVuY3Rpb24gSChlKXtELmNhbGwodGhpcyxlKSx0aGlzLmhvdD17ZGF0YTptb2R1bGUuYnVuZGxlLmhvdERhdGFbZV0sX2FjY2VwdENhbGxiYWNrczpbXSxfZGlzcG9zZUNhbGxiYWNrczpbXSxhY2NlcHQ6ZnVuY3Rpb24odCl7dGhpcy5fYWNjZXB0Q2FsbGJhY2tzLnB1c2godHx8ZnVuY3Rpb24oKXt9KX0sZGlzcG9zZTpmdW5jdGlvbih0KXt0aGlzLl9kaXNwb3NlQ2FsbGJhY2tzLnB1c2godCl9fSxtb2R1bGUuYnVuZGxlLmhvdERhdGFbZV09dm9pZCAwfW1vZHVsZS5idW5kbGUuTW9kdWxlPUg7bW9kdWxlLmJ1bmRsZS5ob3REYXRhPXt9O3ZhciBjPWdsb2JhbFRoaXMuYnJvd3Nlcnx8Z2xvYmFsVGhpcy5jaHJvbWV8fG51bGw7ZnVuY3Rpb24gUigpe3JldHVybiFuLmhvc3R8fG4uaG9zdD09PVwiMC4wLjAuMFwiP2xvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpPT09MD9sb2NhdGlvbi5ob3N0bmFtZTpcImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiB4KCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/XCJsb2NhbGhvc3RcIjpuLmhvc3R9ZnVuY3Rpb24gZCgpe3JldHVybiBuLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIFA9XCJfX3BsYXNtb19ydW50aW1lX3BhZ2VfXCIsUz1cIl9fcGxhc21vX3J1bnRpbWVfc2NyaXB0X1wiO3ZhciBPPWAke24uc2VjdXJlP1wiaHR0cHNcIjpcImh0dHBcIn06Ly8ke1IoKX06JHtkKCl9L2A7YXN5bmMgZnVuY3Rpb24gayhlPTE0NzApe2Zvcig7Oyl0cnl7YXdhaXQgZmV0Y2goTyk7YnJlYWt9Y2F0Y2h7YXdhaXQgbmV3IFByb21pc2Uobz0+c2V0VGltZW91dChvLGUpKX19aWYoYy5ydW50aW1lLmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbj09PTMpe2xldCBlPWMucnVudGltZS5nZXRVUkwoXCIvX19wbGFzbW9faG1yX3Byb3h5X18/dXJsPVwiKTtnbG9iYWxUaGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJmZXRjaFwiLGZ1bmN0aW9uKHQpe2xldCBvPXQucmVxdWVzdC51cmw7aWYoby5zdGFydHNXaXRoKGUpKXtsZXQgcz1uZXcgVVJMKGRlY29kZVVSSUNvbXBvbmVudChvLnNsaWNlKGUubGVuZ3RoKSkpO3MuaG9zdG5hbWU9PT1uLmhvc3QmJnMucG9ydD09PWAke24ucG9ydH1gPyhzLnNlYXJjaFBhcmFtcy5zZXQoXCJ0XCIsRGF0ZS5ub3coKS50b1N0cmluZygpKSx0LnJlc3BvbmRXaXRoKGZldGNoKHMpLnRoZW4ocj0+bmV3IFJlc3BvbnNlKHIuYm9keSx7aGVhZGVyczp7XCJDb250ZW50LVR5cGVcIjpyLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpPz9cInRleHQvamF2YXNjcmlwdFwifX0pKSkpOnQucmVzcG9uZFdpdGgobmV3IFJlc3BvbnNlKFwiUGxhc21vIEhNUlwiLHtzdGF0dXM6MjAwLHN0YXR1c1RleHQ6XCJUZXN0aW5nXCJ9KSl9fSl9ZnVuY3Rpb24gRShlLHQpe2xldHttb2R1bGVzOm99PWU7cmV0dXJuIG8/ISFvW3RdOiExfWZ1bmN0aW9uIEMoZT1kKCkpe2xldCB0PXgoKTtyZXR1cm5gJHtuLnNlY3VyZXx8bG9jYXRpb24ucHJvdG9jb2w9PT1cImh0dHBzOlwiJiYhL2xvY2FsaG9zdHwxMjcuMC4wLjF8MC4wLjAuMC8udGVzdCh0KT9cIndzc1wiOlwid3NcIn06Ly8ke3R9OiR7ZX0vYH1mdW5jdGlvbiBUKGUpe3R5cGVvZiBlLm1lc3NhZ2U9PVwic3RyaW5nXCImJnkoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrZS5tZXNzYWdlKX1mdW5jdGlvbiBMKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChDKE51bWJlcihkKCkpKzEpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTthd2FpdCBlKHMpfSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixUKSx0fWZ1bmN0aW9uIEEoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcz1KU09OLnBhcnNlKG8uZGF0YSk7aWYocy50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShzLmFzc2V0cykscy50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgciBvZiBzLmRpYWdub3N0aWNzLmFuc2kpe2xldCBsPXIuY29kZWZyYW1lfHxyLnN0YWNrO2YoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrci5tZXNzYWdlK2BcbmArbCtgXG5cbmArci5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFQpLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2IoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0ZWQgdG8gSE1SIHNlcnZlciBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT57ZihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgaXMgY2xvc2VkIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHR9dmFyIHc9bW9kdWxlLmJ1bmRsZS5wYXJlbnQsYT17YnVpbGRSZWFkeTohMSxiZ0NoYW5nZWQ6ITEsY3NDaGFuZ2VkOiExLHBhZ2VDaGFuZ2VkOiExLHNjcmlwdFBvcnRzOm5ldyBTZXQscGFnZVBvcnRzOm5ldyBTZXR9O2FzeW5jIGZ1bmN0aW9uIHAoZT0hMSl7aWYoZXx8YS5idWlsZFJlYWR5JiZhLnBhZ2VDaGFuZ2VkKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIFBhZ2VcIik7Zm9yKGxldCB0IG9mIGEucGFnZVBvcnRzKXQucG9zdE1lc3NhZ2UobnVsbCl9aWYoZXx8YS5idWlsZFJlYWR5JiYoYS5iZ0NoYW5nZWR8fGEuY3NDaGFuZ2VkKSl7aShcIkJHU1cgUnVudGltZSAtIHJlbG9hZGluZyBDU1wiKTtsZXQgdD1hd2FpdCBjPy50YWJzLnF1ZXJ5KHthY3RpdmU6ITB9KTtmb3IobGV0IG8gb2YgYS5zY3JpcHRQb3J0cyl7bGV0IHM9dC5zb21lKHI9PnIuaWQ9PT1vLnNlbmRlci50YWI/LmlkKTtvLnBvc3RNZXNzYWdlKHtfX3BsYXNtb19jc19hY3RpdmVfdGFiX186c30pfWMucnVudGltZS5yZWxvYWQoKX19aWYoIXd8fCF3LmlzUGFyY2VsUmVxdWlyZSl7digpO2xldCBlPUEoYXN5bmMgdD0+e2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBITVIgVXBkYXRlXCIpLGEuYmdDaGFuZ2VkfHw9dC5maWx0ZXIocz0+cy5lbnZIYXNoPT09bi5lbnZIYXNoKS5zb21lKHM9PkUobW9kdWxlLmJ1bmRsZSxzLmlkKSk7bGV0IG89dC5maW5kKHM9PnMudHlwZT09PVwianNvblwiKTtpZihvKXtsZXQgcz1uZXcgU2V0KHQubWFwKGw9PmwuaWQpKSxyPU9iamVjdC52YWx1ZXMoby5kZXBzQnlCdW5kbGUpLm1hcChsPT5PYmplY3QudmFsdWVzKGwpKS5mbGF0KCk7YS5iZ0NoYW5nZWR8fD1yLmV2ZXJ5KGw9PnMuaGFzKGwpKX1wKCl9KTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntsZXQgdD1zZXRJbnRlcnZhbCgoKT0+ZS5zZW5kKFwicGluZ1wiKSwyNGUzKTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT5jbGVhckludGVydmFsKHQpKX0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsYXN5bmMoKT0+e2F3YWl0IGsoKSxwKCEwKX0pfUwoYXN5bmMgZT0+e3N3aXRjaChpKFwiQkdTVyBSdW50aW1lIC0gT24gQnVpbGQgUmVwYWNrYWdlZFwiKSxlLnR5cGUpe2Nhc2VcImJ1aWxkX3JlYWR5XCI6e2EuYnVpbGRSZWFkeXx8PSEwLHAoKTticmVha31jYXNlXCJjc19jaGFuZ2VkXCI6e2EuY3NDaGFuZ2VkfHw9ITAscCgpO2JyZWFrfX19KTtjLnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKGZ1bmN0aW9uKGUpe2xldCB0PWUubmFtZS5zdGFydHNXaXRoKFApLG89ZS5uYW1lLnN0YXJ0c1dpdGgoUyk7aWYodHx8byl7bGV0IHM9dD9hLnBhZ2VQb3J0czphLnNjcmlwdFBvcnRzO3MuYWRkKGUpLGUub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57cy5kZWxldGUoZSl9KSxlLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihyKXtpKFwiQkdTVyBSdW50aW1lIC0gT24gc291cmNlIGNoYW5nZWRcIixyKSxyLl9fcGxhc21vX2NzX2NoYW5nZWRfXyYmKGEuY3NDaGFuZ2VkfHw9ITApLHIuX19wbGFzbW9fcGFnZV9jaGFuZ2VkX18mJihhLnBhZ2VDaGFuZ2VkfHw9ITApLHAoKX0pfX0pO2MucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQuX19wbGFzbW9fZnVsbF9yZWxvYWRfXyYmKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiB0b3AtbGV2ZWwgY29kZSBjaGFuZ2VkXCIpLHAoKSksITB9KTtcbiIsImltcG9ydCBcIi4vbWVzc2FnaW5nXCJcbmltcG9ydCBcIi4uLy4uLy4uL3NyYy9iYWNrZ3JvdW5kL2luZGV4XCIiLCIvLyBAdHMtbm9jaGVja1xuZ2xvYmFsVGhpcy5fX3BsYXNtb0ludGVybmFsUG9ydE1hcCA9IG5ldyBNYXAoKVxuXG5pbXBvcnQgeyBkZWZhdWx0IGFzIG1lc3NhZ2VzRW5hYmxlQ29weSB9IGZyb20gXCJ+YmFja2dyb3VuZC9tZXNzYWdlcy9lbmFibGVDb3B5XCJcbmltcG9ydCB7IGRlZmF1bHQgYXMgbWVzc2FnZXNFbmFibGVNb2NrIH0gZnJvbSBcIn5iYWNrZ3JvdW5kL21lc3NhZ2VzL2VuYWJsZU1vY2tcIlxuaW1wb3J0IHsgZGVmYXVsdCBhcyBtZXNzYWdlc1VwZGF0ZVJ1bGVzIH0gZnJvbSBcIn5iYWNrZ3JvdW5kL21lc3NhZ2VzL3VwZGF0ZVJ1bGVzXCJcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlRXh0ZXJuYWwuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIHN3aXRjaCAocmVxdWVzdD8ubmFtZSkge1xuICAgIFxuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHRydWVcbn0pXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgc3dpdGNoIChyZXF1ZXN0Lm5hbWUpIHtcbiAgICBjYXNlIFwiZW5hYmxlQ29weVwiOlxuICBtZXNzYWdlc0VuYWJsZUNvcHkoe1xuICAgIC4uLnJlcXVlc3QsXG4gICAgc2VuZGVyXG4gIH0sIHtcbiAgICBzZW5kOiAocCkgPT4gc2VuZFJlc3BvbnNlKHApXG4gIH0pXG4gIGJyZWFrXG5jYXNlIFwiZW5hYmxlTW9ja1wiOlxuICBtZXNzYWdlc0VuYWJsZU1vY2soe1xuICAgIC4uLnJlcXVlc3QsXG4gICAgc2VuZGVyXG4gIH0sIHtcbiAgICBzZW5kOiAocCkgPT4gc2VuZFJlc3BvbnNlKHApXG4gIH0pXG4gIGJyZWFrXG5jYXNlIFwidXBkYXRlUnVsZXNcIjpcbiAgbWVzc2FnZXNVcGRhdGVSdWxlcyh7XG4gICAgLi4ucmVxdWVzdCxcbiAgICBzZW5kZXJcbiAgfSwge1xuICAgIHNlbmQ6IChwKSA9PiBzZW5kUmVzcG9uc2UocClcbiAgfSlcbiAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59KVxuXG5jaHJvbWUucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocG9ydCkge1xuICBnbG9iYWxUaGlzLl9fcGxhc21vSW50ZXJuYWxQb3J0TWFwLnNldChwb3J0Lm5hbWUsIHBvcnQpXG4gIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICBzd2l0Y2ggKHBvcnQubmFtZSkge1xuICAgICAgXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSlcbn0pXG5cbiIsImltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcInJhZGFzaFwiXG5pbXBvcnQgY29weSBmcm9tICd1cmw6fmFwcC9zY3JpcHRzL2NvcHkudHMnXG5pbXBvcnQgdHlwZSB7IFBsYXNtb01lc3NhZ2luZyB9IGZyb20gXCJAcGxhc21vaHEvbWVzc2FnaW5nXCJcblxuaW1wb3J0IHN0b3JlLCB7IFNUT1JFX0tFWSB9IGZyb20gXCJ+YXBwL3V0aWxzL3N0b3JlXCJcblxuY29uc3QgaW5qZWN0TWFwID0gbmV3IE1hcCgpXG5cbmNvbnN0IGluamVjdCA9IGRlYm91bmNlKHsgZGVsYXk6IDIwMCB9LCBhc3luYyAod2luZG93SWQ6IG51bWJlciwgdGFiSWQ6IG51bWJlcikgPT4ge1xuICBjb25zdCBjb25maWc6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0gYXdhaXQgc3RvcmUuZ2V0KFNUT1JFX0tFWS5HTE9CQUxfU1dJVENIX0NPTkZJRylcbiAgY29uc3QgY29weUVuYWJsZWQgPSBjb25maWc/LmNvcHkgPz8gZmFsc2VcbiAgaWYgKGNvcHlFbmFibGVkKSB7XG4gICAgY29uc3QgdGFnID0gYGNvcHktJHt3aW5kb3dJZH0tJHt0YWJJZH1gXG4gICAgaWYgKCFpbmplY3RNYXAuaGFzKHRhZykgfHwgaW5qZWN0TWFwLmdldCh0YWcpID09PSBmYWxzZSkge1xuICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KFxuICAgICAgICB7XG4gICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICB0YWJJZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgd29ybGQ6IFwiTUFJTlwiLCAvLyBNQUlOIGluIG9yZGVyIHRvIGFjY2VzcyB0aGUgd2luZG93IG9iamVjdFxuICAgICAgICAgIGZpbGVzOiBbY29weS5zcGxpdCgnLycpLnBvcCgpLnNwbGl0KCc/JylbMF1dXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyDmiJDlip/lm57osINcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImluamVjdGVkIHN1Y2Nlc3NmdWxseVwiKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBpbmplY3RlZFwiKVxuICAgIH1cbiAgICBpbmplY3RNYXAuc2V0KHRhZywgdHJ1ZSlcbiAgfVxufSlcbi8vIOa/gOa0u3RhYlxuY29uc3Qgb25BY3RpdmF0ZWQgPSBhc3luYyAoZSkgPT4ge1xuICBjb25zdCB7IHdpbmRvd0lkLCB0YWJJZCB9ID0gZVxuICBpbmplY3Qod2luZG93SWQsIHRhYklkKVxufVxuLy8g6aG16Z2i5Yi35pawXG5jb25zdCBvblVwZGF0ZWQgPSBmdW5jdGlvbiAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikge1xuICBjb25zdCB7IHdpbmRvd0lkIH0gPSB0YWJcbiAgY29uc3QgdGFnID0gYGNvcHktJHt3aW5kb3dJZH0tJHt0YWJJZH1gXG4gIGlmIChpbmplY3RNYXAuaGFzKHRhZykpIHtcbiAgICBpbmplY3RNYXAuZGVsZXRlKHRhZylcbiAgfVxuICBpZiAodGFiLnVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSAmJiBjaGFuZ2VJbmZvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiICYmIHRhYi5zdGF0dXMgPT09IFwiY29tcGxldGVcIikge1xuICAgIGluamVjdCh3aW5kb3dJZCwgdGFiSWQpXG4gIH1cbn1cbi8vIOWFs+mXrea1j+iniOWZqFxuY29uc3Qgb25SZW1vdmVkID0gKHdpbmRvd0lkKSA9PiB7XG4gIGluamVjdE1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKGBjb3B5LSR7d2luZG93SWR9LWApKSB7XG4gICAgICBpZiAoaW5qZWN0TWFwLmhhcyhrZXkpKSB7XG4gICAgICAgIGluamVjdE1hcC5kZWxldGUoa2V5KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbi8vIOWFs+mXrXRhYlxuY29uc3Qgb25UYWJSZW1vdmUgPSAodGFiSWQsIHJlbW92ZUluZm8pID0+IHtcbiAgY29uc3QgeyB3aW5kb3dJZCB9ID0gcmVtb3ZlSW5mb1xuICBjb25zdCB0YWcgPSBgY29weS0ke3dpbmRvd0lkfS0ke3RhYklkfWBcbiAgaWYgKGluamVjdE1hcC5oYXModGFnKSkge1xuICAgIGluamVjdE1hcC5kZWxldGUodGFnKVxuICB9XG59XG5cblxuLy8g5r+A5rS7dGFiXG5pZiAoIWNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmhhc0xpc3RlbmVyKG9uQWN0aXZhdGVkKSkge1xuICBjaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihvbkFjdGl2YXRlZClcbn1cbmlmICghY2hyb21lLnRhYnMub25VcGRhdGVkLmhhc0xpc3RlbmVyKG9uVXBkYXRlZCkpIHtcbiAgLy8g5Yi35paw6aG16Z2iXG4gIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihvblVwZGF0ZWQpXG59XG5pZiAoIWNocm9tZS53aW5kb3dzLm9uUmVtb3ZlZC5oYXNMaXN0ZW5lcihvblJlbW92ZWQpKSB7XG4gIC8vIOebkeWQrOWFs+mXrea1j+iniOWZqFxuICBjaHJvbWUud2luZG93cy5vblJlbW92ZWQuYWRkTGlzdGVuZXIob25SZW1vdmVkKVxufVxuaWYgKCFjaHJvbWUudGFicy5vblJlbW92ZWQuaGFzTGlzdGVuZXIob25UYWJSZW1vdmUpKSB7XG4gIC8vIOebkeWQrOWFs+mXreagh+etvumhtVxuICBjaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIob25UYWJSZW1vdmUpXG59XG5cbmNvbnN0IGhhbmRsZXI6IFBsYXNtb01lc3NhZ2luZy5NZXNzYWdlSGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGVuYWJsZSB9ID0gcmVxLmJvZHlcbiAgaWYgKGVuYWJsZSkge1xuICAgIC8vIOW9k+WJjXRhYuWNs+aXtuWQr+WKqFxuICAgIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgYWN0aXZlOiB0cnVlXG4gICAgfSlcbiAgICBpZiAodGFiKSB7XG4gICAgICBjb25zdCB7IHdpbmRvd0lkLCBpZCB9ID0gdGFiXG4gICAgICBpbmplY3Qod2luZG93SWQsIGlkKVxuICAgIH1cbiAgfVxuICByZXMuc2VuZCh7fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlclxuIiwiZXhwb3J0IHsgYWxwaGFiZXRpY2FsLCBib2lsLCBjbHVzdGVyLCBjb3VudGluZywgZGlmZiwgZmlyc3QsIGZsYXQsIGZvcmssIGdyb3VwLCBpbnRlcnNlY3RzLCBpdGVyYXRlLCBsYXN0LCBsaXN0LCBtYXgsIG1lcmdlLCBtaW4sIG9iamVjdGlmeSwgcmFuZ2UsIHJlcGxhY2UsIHJlcGxhY2VPckFwcGVuZCwgc2VsZWN0LCBzaGlmdCwgc2lmdCwgc29ydCwgc3VtLCB0b2dnbGUsIHVuaXF1ZSwgemlwLCB6aXBUb09iamVjdCB9IGZyb20gJy4vYXJyYXkubWpzJztcbmV4cG9ydCB7IGFsbCwgZGVmZXIsIGd1YXJkLCBtYXAsIHBhcmFsbGVsLCByZWR1Y2UsIHJldHJ5LCBzbGVlcCwgdHJ5aXQgYXMgdHJ5LCB0cnlpdCB9IGZyb20gJy4vYXN5bmMubWpzJztcbmV4cG9ydCB7IGNhbGxhYmxlLCBjaGFpbiwgY29tcG9zZSwgZGVib3VuY2UsIG1lbW8sIHBhcnRpYWwsIHBhcnRvYiwgcHJveGllZCwgdGhyb3R0bGUgfSBmcm9tICcuL2N1cnJ5Lm1qcyc7XG5leHBvcnQgeyBpblJhbmdlLCB0b0Zsb2F0LCB0b0ludCB9IGZyb20gJy4vbnVtYmVyLm1qcyc7XG5leHBvcnQgeyBhc3NpZ24sIGNsb25lLCBjb25zdHJ1Y3QsIGNydXNoLCBnZXQsIGludmVydCwga2V5cywgbGlzdGlmeSwgbG93ZXJpemUsIG1hcEVudHJpZXMsIG1hcEtleXMsIG1hcFZhbHVlcywgb21pdCwgcGljaywgc2V0LCBzaGFrZSwgdXBwZXJpemUgfSBmcm9tICcuL29iamVjdC5tanMnO1xuZXhwb3J0IHsgZHJhdywgcmFuZG9tLCBzaHVmZmxlLCB1aWQgfSBmcm9tICcuL3JhbmRvbS5tanMnO1xuZXhwb3J0IHsgc2VyaWVzIH0gZnJvbSAnLi9zZXJpZXMubWpzJztcbmV4cG9ydCB7IGNhbWVsLCBjYXBpdGFsaXplLCBkYXNoLCBwYXNjYWwsIHNuYWtlLCB0ZW1wbGF0ZSwgdGl0bGUsIHRyaW0gfSBmcm9tICcuL3N0cmluZy5tanMnO1xuZXhwb3J0IHsgaXNBcnJheSwgaXNEYXRlLCBpc0VtcHR5LCBpc0VxdWFsLCBpc0Zsb2F0LCBpc0Z1bmN0aW9uLCBpc0ludCwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1ByaW1pdGl2ZSwgaXNQcm9taXNlLCBpc1N0cmluZywgaXNTeW1ib2wgfSBmcm9tICcuL3R5cGVkLm1qcyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJmdW5jdGlvbiBjaGFpbiguLi5mdW5jcykge1xuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICByZXR1cm4gZnVuY3Muc2xpY2UoMSkucmVkdWNlKChhY2MsIGZuKSA9PiBmbihhY2MpLCBmdW5jc1swXSguLi5hcmdzKSk7XG4gIH07XG59XG5mdW5jdGlvbiBjb21wb3NlKC4uLmZ1bmNzKSB7XG4gIHJldHVybiBmdW5jcy5yZXZlcnNlKCkucmVkdWNlKChhY2MsIGZuKSA9PiBmbihhY2MpKTtcbn1cbmNvbnN0IHBhcnRpYWwgPSAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgcmV0dXJuICguLi5yZXN0KSA9PiBmbiguLi5bLi4uYXJncywgLi4ucmVzdF0pO1xufTtcbmNvbnN0IHBhcnRvYiA9IChmbiwgYXJnb2JqKSA9PiB7XG4gIHJldHVybiAocmVzdG9iaikgPT4gZm4oe1xuICAgIC4uLmFyZ29iaixcbiAgICAuLi5yZXN0b2JqXG4gIH0pO1xufTtcbmNvbnN0IHByb3hpZWQgPSAoaGFuZGxlcikgPT4ge1xuICByZXR1cm4gbmV3IFByb3h5KFxuICAgIHt9LFxuICAgIHtcbiAgICAgIGdldDogKHRhcmdldCwgcHJvcGVydHlOYW1lKSA9PiBoYW5kbGVyKHByb3BlcnR5TmFtZSlcbiAgICB9XG4gICk7XG59O1xuY29uc3QgbWVtb2l6ZSA9IChjYWNoZSwgZnVuYywga2V5RnVuYywgdHRsKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiBjYWxsV2l0aE1lbW8oLi4uYXJncykge1xuICAgIGNvbnN0IGtleSA9IGtleUZ1bmMgPyBrZXlGdW5jKC4uLmFyZ3MpIDogSlNPTi5zdHJpbmdpZnkoeyBhcmdzIH0pO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gY2FjaGVba2V5XTtcbiAgICBpZiAoZXhpc3RpbmcgIT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFleGlzdGluZy5leHApXG4gICAgICAgIHJldHVybiBleGlzdGluZy52YWx1ZTtcbiAgICAgIGlmIChleGlzdGluZy5leHAgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmcudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMoLi4uYXJncyk7XG4gICAgY2FjaGVba2V5XSA9IHtcbiAgICAgIGV4cDogdHRsID8gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyB0dGwgOiBudWxsLFxuICAgICAgdmFsdWU6IHJlc3VsdFxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5jb25zdCBtZW1vID0gKGZ1bmMsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICByZXR1cm4gbWVtb2l6ZSh7fSwgZnVuYywgb3B0aW9ucy5rZXkgPz8gbnVsbCwgb3B0aW9ucy50dGwgPz8gbnVsbCk7XG59O1xuY29uc3QgZGVib3VuY2UgPSAoeyBkZWxheSB9LCBmdW5jKSA9PiB7XG4gIGxldCB0aW1lciA9IHZvaWQgMDtcbiAgbGV0IGFjdGl2ZSA9IHRydWU7XG4gIGNvbnN0IGRlYm91bmNlZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGFjdGl2ZSAmJiBmdW5jKC4uLmFyZ3MpO1xuICAgICAgICB0aW1lciA9IHZvaWQgMDtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICB9XG4gIH07XG4gIGRlYm91bmNlZC5pc1BlbmRpbmcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRpbWVyICE9PSB2b2lkIDA7XG4gIH07XG4gIGRlYm91bmNlZC5jYW5jZWwgPSAoKSA9PiB7XG4gICAgYWN0aXZlID0gZmFsc2U7XG4gIH07XG4gIGRlYm91bmNlZC5mbHVzaCA9ICguLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpO1xuICByZXR1cm4gZGVib3VuY2VkO1xufTtcbmNvbnN0IHRocm90dGxlID0gKHsgaW50ZXJ2YWwgfSwgZnVuYykgPT4ge1xuICBsZXQgcmVhZHkgPSB0cnVlO1xuICBsZXQgdGltZXIgPSB2b2lkIDA7XG4gIGNvbnN0IHRocm90dGxlZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKCFyZWFkeSlcbiAgICAgIHJldHVybjtcbiAgICBmdW5jKC4uLmFyZ3MpO1xuICAgIHJlYWR5ID0gZmFsc2U7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICAgIHRpbWVyID0gdm9pZCAwO1xuICAgIH0sIGludGVydmFsKTtcbiAgfTtcbiAgdGhyb3R0bGVkLmlzVGhyb3R0bGVkID0gKCkgPT4ge1xuICAgIHJldHVybiB0aW1lciAhPT0gdm9pZCAwO1xuICB9O1xuICByZXR1cm4gdGhyb3R0bGVkO1xufTtcbmNvbnN0IGNhbGxhYmxlID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgRlVOQyA9ICgpID0+IHtcbiAgfTtcbiAgcmV0dXJuIG5ldyBQcm94eShPYmplY3QuYXNzaWduKEZVTkMsIG9iaiksIHtcbiAgICBnZXQ6ICh0YXJnZXQsIGtleSkgPT4gdGFyZ2V0W2tleV0sXG4gICAgc2V0OiAodGFyZ2V0LCBrZXksIHZhbHVlKSA9PiB7XG4gICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhcHBseTogKHRhcmdldCwgc2VsZiwgYXJncykgPT4gZm4oT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0KSkoLi4uYXJncylcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBjYWxsYWJsZSwgY2hhaW4sIGNvbXBvc2UsIGRlYm91bmNlLCBtZW1vLCBwYXJ0aWFsLCBwYXJ0b2IsIHByb3hpZWQsIHRocm90dGxlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jdXJyeS5tanMubWFwXG4iLCJleHBvcnQgZnVuY3Rpb24gY2hhaW48VDEgZXh0ZW5kcyBhbnlbXSwgVDIsIFQzPihcbiAgZjE6ICguLi5hcmc6IFQxKSA9PiBUMixcbiAgZjI6IChhcmc6IFQyKSA9PiBUM1xuKTogKC4uLmFyZzogVDEpID0+IFQzXG5leHBvcnQgZnVuY3Rpb24gY2hhaW48VDEgZXh0ZW5kcyBhbnlbXSwgVDIsIFQzLCBUND4oXG4gIGYxOiAoLi4uYXJnOiBUMSkgPT4gVDIsXG4gIGYyOiAoYXJnOiBUMikgPT4gVDMsXG4gIGYzOiAoYXJnOiBUMykgPT4gVDRcbik6ICguLi5hcmc6IFQxKSA9PiBUNFxuZXhwb3J0IGZ1bmN0aW9uIGNoYWluPFQxIGV4dGVuZHMgYW55W10sIFQyLCBUMywgVDQsIFQ1PihcbiAgZjE6ICguLi5hcmc6IFQxKSA9PiBUMixcbiAgZjI6IChhcmc6IFQyKSA9PiBUMyxcbiAgZjM6IChhcmc6IFQzKSA9PiBUNCxcbiAgZjQ6IChhcmc6IFQzKSA9PiBUNVxuKTogKC4uLmFyZzogVDEpID0+IFQ1XG5leHBvcnQgZnVuY3Rpb24gY2hhaW48VDEgZXh0ZW5kcyBhbnlbXSwgVDIsIFQzLCBUNCwgVDUsIFQ2PihcbiAgZjE6ICguLi5hcmc6IFQxKSA9PiBUMixcbiAgZjI6IChhcmc6IFQyKSA9PiBUMyxcbiAgZjM6IChhcmc6IFQzKSA9PiBUNCxcbiAgZjQ6IChhcmc6IFQzKSA9PiBUNSxcbiAgZjU6IChhcmc6IFQzKSA9PiBUNlxuKTogKC4uLmFyZzogVDEpID0+IFQ2XG5leHBvcnQgZnVuY3Rpb24gY2hhaW48VDEgZXh0ZW5kcyBhbnlbXSwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNz4oXG4gIGYxOiAoLi4uYXJnOiBUMSkgPT4gVDIsXG4gIGYyOiAoYXJnOiBUMikgPT4gVDMsXG4gIGYzOiAoYXJnOiBUMykgPT4gVDQsXG4gIGY0OiAoYXJnOiBUMykgPT4gVDUsXG4gIGY1OiAoYXJnOiBUMykgPT4gVDYsXG4gIGY2OiAoYXJnOiBUMykgPT4gVDdcbik6ICguLi5hcmc6IFQxKSA9PiBUN1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluPFQxIGV4dGVuZHMgYW55W10sIFQyLCBUMywgVDQsIFQ1LCBUNiwgVDcsIFQ4PihcbiAgZjE6ICguLi5hcmc6IFQxKSA9PiBUMixcbiAgZjI6IChhcmc6IFQyKSA9PiBUMyxcbiAgZjM6IChhcmc6IFQzKSA9PiBUNCxcbiAgZjQ6IChhcmc6IFQzKSA9PiBUNSxcbiAgZjU6IChhcmc6IFQzKSA9PiBUNixcbiAgZjY6IChhcmc6IFQzKSA9PiBUNyxcbiAgZjc6IChhcmc6IFQzKSA9PiBUOFxuKTogKC4uLmFyZzogVDEpID0+IFQ4XG5leHBvcnQgZnVuY3Rpb24gY2hhaW48VDEgZXh0ZW5kcyBhbnlbXSwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNywgVDgsIFQ5PihcbiAgZjE6ICguLi5hcmc6IFQxKSA9PiBUMixcbiAgZjI6IChhcmc6IFQyKSA9PiBUMyxcbiAgZjM6IChhcmc6IFQzKSA9PiBUNCxcbiAgZjQ6IChhcmc6IFQzKSA9PiBUNSxcbiAgZjU6IChhcmc6IFQzKSA9PiBUNixcbiAgZjY6IChhcmc6IFQzKSA9PiBUNyxcbiAgZjc6IChhcmc6IFQzKSA9PiBUOCxcbiAgZjg6IChhcmc6IFQzKSA9PiBUOVxuKTogKC4uLmFyZzogVDEpID0+IFQ5XG5leHBvcnQgZnVuY3Rpb24gY2hhaW48VDEgZXh0ZW5kcyBhbnlbXSwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNywgVDgsIFQ5LCBUMTA+KFxuICBmMTogKC4uLmFyZzogVDEpID0+IFQyLFxuICBmMjogKGFyZzogVDIpID0+IFQzLFxuICBmMzogKGFyZzogVDMpID0+IFQ0LFxuICBmNDogKGFyZzogVDMpID0+IFQ1LFxuICBmNTogKGFyZzogVDMpID0+IFQ2LFxuICBmNjogKGFyZzogVDMpID0+IFQ3LFxuICBmNzogKGFyZzogVDMpID0+IFQ4LFxuICBmODogKGFyZzogVDMpID0+IFQ5LFxuICBmOTogKGFyZzogVDMpID0+IFQxMFxuKTogKC4uLmFyZzogVDEpID0+IFQxMFxuZXhwb3J0IGZ1bmN0aW9uIGNoYWluPFxuICBUMSBleHRlbmRzIGFueVtdLFxuICBUMixcbiAgVDMsXG4gIFQ0LFxuICBUNSxcbiAgVDYsXG4gIFQ3LFxuICBUOCxcbiAgVDksXG4gIFQxMCxcbiAgVDExXG4+KFxuICBmMTogKC4uLmFyZzogVDEpID0+IFQyLFxuICBmMjogKGFyZzogVDIpID0+IFQzLFxuICBmMzogKGFyZzogVDMpID0+IFQ0LFxuICBmNDogKGFyZzogVDMpID0+IFQ1LFxuICBmNTogKGFyZzogVDMpID0+IFQ2LFxuICBmNjogKGFyZzogVDMpID0+IFQ3LFxuICBmNzogKGFyZzogVDMpID0+IFQ4LFxuICBmODogKGFyZzogVDMpID0+IFQ5LFxuICBmOTogKGFyZzogVDMpID0+IFQxMCxcbiAgZjEwOiAoYXJnOiBUMykgPT4gVDExXG4pOiAoLi4uYXJnOiBUMSkgPT4gVDExXG5leHBvcnQgZnVuY3Rpb24gY2hhaW4oLi4uZnVuY3M6ICgoLi4uYXJnczogYW55W10pID0+IGFueSlbXSkge1xuICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgcmV0dXJuIGZ1bmNzLnNsaWNlKDEpLnJlZHVjZSgoYWNjLCBmbikgPT4gZm4oYWNjKSwgZnVuY3NbMF0oLi4uYXJncykpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8XG4gIEYxUmVzdWx0LFxuICBGMUFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjFOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBMYXN0UmVzdWx0XG4+KFxuICBmMTogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGMU5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHQsXG4gIGxhc3Q6ICguLi5hcmdzOiBGMU5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4pOiAoLi4uYXJnczogRjFBcmdzKSA9PiBGMVJlc3VsdFxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxcbiAgRjFSZXN1bHQsXG4gIEYxQXJncyBleHRlbmRzIGFueVtdLFxuICBGMU5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyUmVzdWx0LFxuICBGMk5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIExhc3RSZXN1bHRcbj4oXG4gIGYxOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHQsXG4gIGYyOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IExhc3RSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjFOZXh0QXJncykgPT4gRjJSZXN1bHQsXG4gIGxhc3Q6ICguLi5hcmdzOiBGMk5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4pOiAoLi4uYXJnczogRjFBcmdzKSA9PiBGMVJlc3VsdFxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxcbiAgRjFSZXN1bHQsXG4gIEYxQXJncyBleHRlbmRzIGFueVtdLFxuICBGMU5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjJSZXN1bHQsXG4gIEYzTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjNSZXN1bHQsXG4gIExhc3RSZXN1bHRcbj4oXG4gIGYxOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHQsXG4gIGYyOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IEYzUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0LFxuICBmMzogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGM05leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IEYzUmVzdWx0LFxuICBsYXN0OiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gTGFzdFJlc3VsdFxuKTogKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHRcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8XG4gIEYxUmVzdWx0LFxuICBGMUFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjFOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGMk5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyUmVzdWx0LFxuICBGM05leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYzUmVzdWx0LFxuICBGNE5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEY0UmVzdWx0LFxuICBMYXN0UmVzdWx0XG4+KFxuICBmMTogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGMU5leHRBcmdzKSA9PiBGMlJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMUFyZ3MpID0+IEYxUmVzdWx0LFxuICBmMjogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGMk5leHRBcmdzKSA9PiBGM1Jlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMU5leHRBcmdzKSA9PiBGMlJlc3VsdCxcbiAgZjM6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gRjRSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjJOZXh0QXJncykgPT4gRjNSZXN1bHQsXG4gIGY0OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY0TmV4dEFyZ3MpID0+IExhc3RSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gRjRSZXN1bHQsXG4gIGxhc3Q6ICguLi5hcmdzOiBGNE5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4pOiAoLi4uYXJnczogRjFBcmdzKSA9PiBGMVJlc3VsdFxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxcbiAgRjFSZXN1bHQsXG4gIEYxQXJncyBleHRlbmRzIGFueVtdLFxuICBGMU5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjJSZXN1bHQsXG4gIEYzTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjNSZXN1bHQsXG4gIEY0TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjRSZXN1bHQsXG4gIEY1TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjVSZXN1bHQsXG4gIExhc3RSZXN1bHRcbj4oXG4gIGYxOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHQsXG4gIGYyOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IEYzUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0LFxuICBmMzogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGM05leHRBcmdzKSA9PiBGNFJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMk5leHRBcmdzKSA9PiBGM1Jlc3VsdCxcbiAgZjQ6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjROZXh0QXJncykgPT4gRjVSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gRjRSZXN1bHQsXG4gIGY1OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY1TmV4dEFyZ3MpID0+IExhc3RSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjROZXh0QXJncykgPT4gRjVSZXN1bHQsXG4gIGxhc3Q6ICguLi5hcmdzOiBGNU5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4pOiAoLi4uYXJnczogRjFBcmdzKSA9PiBGMVJlc3VsdFxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxcbiAgRjFSZXN1bHQsXG4gIEYxQXJncyBleHRlbmRzIGFueVtdLFxuICBGMU5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjJSZXN1bHQsXG4gIEYzTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjNSZXN1bHQsXG4gIEY0TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjRSZXN1bHQsXG4gIEY1TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjVSZXN1bHQsXG4gIEY2TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjZSZXN1bHQsXG4gIExhc3RSZXN1bHRcbj4oXG4gIGYxOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHQsXG4gIGYyOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IEYzUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0LFxuICBmMzogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGM05leHRBcmdzKSA9PiBGNFJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMk5leHRBcmdzKSA9PiBGM1Jlc3VsdCxcbiAgZjQ6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjROZXh0QXJncykgPT4gRjVSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gRjRSZXN1bHQsXG4gIGY1OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY1TmV4dEFyZ3MpID0+IEY2UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY0TmV4dEFyZ3MpID0+IEY1UmVzdWx0LFxuICBmNjogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGNk5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY1TmV4dEFyZ3MpID0+IEY2UmVzdWx0LFxuICBsYXN0OiAoLi4uYXJnczogRjZOZXh0QXJncykgPT4gTGFzdFJlc3VsdFxuKTogKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHRcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8XG4gIEYxUmVzdWx0LFxuICBGMUFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjFOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGMk5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyUmVzdWx0LFxuICBGM05leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYzUmVzdWx0LFxuICBGNE5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEY0UmVzdWx0LFxuICBGNU5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEY1UmVzdWx0LFxuICBGNk5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEY2UmVzdWx0LFxuICBGN05leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEY3UmVzdWx0LFxuICBMYXN0UmVzdWx0XG4+KFxuICBmMTogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGMU5leHRBcmdzKSA9PiBGMlJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMUFyZ3MpID0+IEYxUmVzdWx0LFxuICBmMjogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGMk5leHRBcmdzKSA9PiBGM1Jlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMU5leHRBcmdzKSA9PiBGMlJlc3VsdCxcbiAgZjM6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gRjRSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjJOZXh0QXJncykgPT4gRjNSZXN1bHQsXG4gIGY0OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY0TmV4dEFyZ3MpID0+IEY1UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYzTmV4dEFyZ3MpID0+IEY0UmVzdWx0LFxuICBmNTogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGNU5leHRBcmdzKSA9PiBGNlJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGNE5leHRBcmdzKSA9PiBGNVJlc3VsdCxcbiAgZjY6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjZOZXh0QXJncykgPT4gRjdSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjVOZXh0QXJncykgPT4gRjZSZXN1bHQsXG4gIGY3OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY3TmV4dEFyZ3MpID0+IExhc3RSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjZOZXh0QXJncykgPT4gRjdSZXN1bHQsXG4gIGxhc3Q6ICguLi5hcmdzOiBGN05leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4pOiAoLi4uYXJnczogRjFBcmdzKSA9PiBGMVJlc3VsdFxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxcbiAgRjFSZXN1bHQsXG4gIEYxQXJncyBleHRlbmRzIGFueVtdLFxuICBGMU5leHRBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYyTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjJSZXN1bHQsXG4gIEYzTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjNSZXN1bHQsXG4gIEY0TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjRSZXN1bHQsXG4gIEY1TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjVSZXN1bHQsXG4gIEY2TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjZSZXN1bHQsXG4gIEY3TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjdSZXN1bHQsXG4gIEY4TmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjhSZXN1bHQsXG4gIExhc3RSZXN1bHRcbj4oXG4gIGYxOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHQsXG4gIGYyOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IEYzUmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYxTmV4dEFyZ3MpID0+IEYyUmVzdWx0LFxuICBmMzogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGM05leHRBcmdzKSA9PiBGNFJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGMk5leHRBcmdzKSA9PiBGM1Jlc3VsdCxcbiAgZjQ6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjROZXh0QXJncykgPT4gRjVSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjNOZXh0QXJncykgPT4gRjRSZXN1bHQsXG4gIGY1OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY1TmV4dEFyZ3MpID0+IEY2UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY0TmV4dEFyZ3MpID0+IEY1UmVzdWx0LFxuICBmNjogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGNk5leHRBcmdzKSA9PiBGN1Jlc3VsdFxuICApID0+ICguLi5hcmdzOiBGNU5leHRBcmdzKSA9PiBGNlJlc3VsdCxcbiAgZjc6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjdOZXh0QXJncykgPT4gTGFzdFJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGNk5leHRBcmdzKSA9PiBGN1Jlc3VsdCxcbiAgZjg6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjhOZXh0QXJncykgPT4gTGFzdFJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGN05leHRBcmdzKSA9PiBGOFJlc3VsdCxcbiAgbGFzdDogKC4uLmFyZ3M6IEY4TmV4dEFyZ3MpID0+IExhc3RSZXN1bHRcbik6ICguLi5hcmdzOiBGMUFyZ3MpID0+IEYxUmVzdWx0XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPFxuICBGMVJlc3VsdCxcbiAgRjFBcmdzIGV4dGVuZHMgYW55W10sXG4gIEYxTmV4dEFyZ3MgZXh0ZW5kcyBhbnlbXSxcbiAgRjJOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGMlJlc3VsdCxcbiAgRjNOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGM1Jlc3VsdCxcbiAgRjROZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGNFJlc3VsdCxcbiAgRjVOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGNVJlc3VsdCxcbiAgRjZOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGNlJlc3VsdCxcbiAgRjdOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGN1Jlc3VsdCxcbiAgRjhOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGOFJlc3VsdCxcbiAgRjlOZXh0QXJncyBleHRlbmRzIGFueVtdLFxuICBGOVJlc3VsdCxcbiAgTGFzdFJlc3VsdFxuPihcbiAgZjE6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjFOZXh0QXJncykgPT4gRjJSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjFBcmdzKSA9PiBGMVJlc3VsdCxcbiAgZjI6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjJOZXh0QXJncykgPT4gRjNSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjFOZXh0QXJncykgPT4gRjJSZXN1bHQsXG4gIGYzOiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEYzTmV4dEFyZ3MpID0+IEY0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEYyTmV4dEFyZ3MpID0+IEYzUmVzdWx0LFxuICBmNDogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGNE5leHRBcmdzKSA9PiBGNVJlc3VsdFxuICApID0+ICguLi5hcmdzOiBGM05leHRBcmdzKSA9PiBGNFJlc3VsdCxcbiAgZjU6IChcbiAgICBuZXh0OiAoLi4uYXJnczogRjVOZXh0QXJncykgPT4gRjZSZXN1bHRcbiAgKSA9PiAoLi4uYXJnczogRjROZXh0QXJncykgPT4gRjVSZXN1bHQsXG4gIGY2OiAoXG4gICAgbmV4dDogKC4uLmFyZ3M6IEY2TmV4dEFyZ3MpID0+IEY3UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY1TmV4dEFyZ3MpID0+IEY2UmVzdWx0LFxuICBmNzogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGN05leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY2TmV4dEFyZ3MpID0+IEY3UmVzdWx0LFxuICBmODogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGOE5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY3TmV4dEFyZ3MpID0+IEY4UmVzdWx0LFxuICBmOTogKFxuICAgIG5leHQ6ICguLi5hcmdzOiBGOU5leHRBcmdzKSA9PiBMYXN0UmVzdWx0XG4gICkgPT4gKC4uLmFyZ3M6IEY4TmV4dEFyZ3MpID0+IEY5UmVzdWx0LFxuICBsYXN0OiAoLi4uYXJnczogRjlOZXh0QXJncykgPT4gTGFzdFJlc3VsdFxuKTogKC4uLmFyZ3M6IEYxQXJncykgPT4gRjFSZXN1bHRcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2UoLi4uZnVuY3M6ICgoLi4uYXJnczogYW55W10pID0+IGFueSlbXSkge1xuICByZXR1cm4gZnVuY3MucmV2ZXJzZSgpLnJlZHVjZSgoYWNjLCBmbikgPT4gZm4oYWNjKSlcbn1cblxuLyoqXG4gKiBUaGlzIHR5cGUgcHJvZHVjZXMgdGhlIHR5cGUgYXJyYXkgb2YgVEl0ZW1zIHdpdGggYWxsIHRoZSB0eXBlIGl0ZW1zXG4gKiBpbiBUSXRlbXNUb1JlbW92ZSByZW1vdmVkIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBhcnJheSB0eXBlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIFJlbW92ZUl0ZW1zSW5Gcm9udDxbbnVtYmVyLCBudW1iZXJdLCBbbnVtYmVyXT4gPSBbbnVtYmVyXVxuICogUmVtb3ZlSXRlbXNJbkZyb250PFtGaWxlLCBudW1iZXIsIHN0cmluZ10sIFtGaWxlLCBudW1iZXJdPiA9IFtzdHJpbmddXG4gKiBgYGBcbiAqL1xudHlwZSBSZW1vdmVJdGVtc0luRnJvbnQ8XG4gIFRJdGVtcyBleHRlbmRzIGFueVtdLFxuICBUSXRlbXNUb1JlbW92ZSBleHRlbmRzIGFueVtdXG4+ID0gVEl0ZW1zIGV4dGVuZHMgWy4uLlRJdGVtc1RvUmVtb3ZlLCAuLi5pbmZlciBUUmVzdF0gPyBUUmVzdCA6IFRJdGVtc1xuXG5leHBvcnQgY29uc3QgcGFydGlhbCA9IDxUIGV4dGVuZHMgYW55W10sIFRBIGV4dGVuZHMgUGFydGlhbDxUPiwgUj4oXG4gIGZuOiAoLi4uYXJnczogVCkgPT4gUixcbiAgLi4uYXJnczogVEFcbikgPT4ge1xuICByZXR1cm4gKC4uLnJlc3Q6IFJlbW92ZUl0ZW1zSW5Gcm9udDxULCBUQT4pID0+XG4gICAgZm4oLi4uKFsuLi5hcmdzLCAuLi5yZXN0XSBhcyBUKSlcbn1cbi8qKlxuICogTGlrZSBwYXJ0aWFsIGJ1dCBmb3IgdW5hcnkgZnVuY3Rpb25zIHRoYXQgYWNjZXB0XG4gKiBhIHNpbmdsZSBvYmplY3QgYXJndW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnRvYiA9IDxULCBLLCBQYXJ0aWFsQXJncyBleHRlbmRzIFBhcnRpYWw8VD4+KFxuICBmbjogKGFyZ3M6IFQpID0+IEssXG4gIGFyZ29iajogUGFydGlhbEFyZ3NcbikgPT4ge1xuICByZXR1cm4gKHJlc3RvYmo6IE9taXQ8VCwga2V5b2YgUGFydGlhbEFyZ3M+KTogSyA9PlxuICAgIGZuKHtcbiAgICAgIC4uLihhcmdvYmogYXMgUGFydGlhbDxUPiksXG4gICAgICAuLi4ocmVzdG9iaiBhcyBQYXJ0aWFsPFQ+KVxuICAgIH0gYXMgVClcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUHJveHkgb2JqZWN0IHRoYXQgd2lsbCBkeW5hbWljYWxseVxuICogY2FsbCB0aGUgaGFuZGxlciBhcmd1bWVudCB3aGVuIGF0dHJpYnV0ZXMgYXJlXG4gKiBhY2Nlc3NlZFxuICovXG5leHBvcnQgY29uc3QgcHJveGllZCA9IDxULCBLPihcbiAgaGFuZGxlcjogKHByb3BlcnR5TmFtZTogVCkgPT4gS1xuKTogUmVjb3JkPHN0cmluZywgSz4gPT4ge1xuICByZXR1cm4gbmV3IFByb3h5KFxuICAgIHt9LFxuICAgIHtcbiAgICAgIGdldDogKHRhcmdldCwgcHJvcGVydHlOYW1lOiBhbnkpID0+IGhhbmRsZXIocHJvcGVydHlOYW1lKVxuICAgIH1cbiAgKVxufVxuXG50eXBlIENhY2hlPFQ+ID0gUmVjb3JkPHN0cmluZywgeyBleHA6IG51bWJlciB8IG51bGw7IHZhbHVlOiBUIH0+XG5cbmNvbnN0IG1lbW9pemUgPSA8VEFyZ3MgZXh0ZW5kcyBhbnlbXSwgVFJlc3VsdD4oXG4gIGNhY2hlOiBDYWNoZTxUUmVzdWx0PixcbiAgZnVuYzogKC4uLmFyZ3M6IFRBcmdzKSA9PiBUUmVzdWx0LFxuICBrZXlGdW5jOiAoKC4uLmFyZ3M6IFRBcmdzKSA9PiBzdHJpbmcpIHwgbnVsbCxcbiAgdHRsOiBudW1iZXIgfCBudWxsXG4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNhbGxXaXRoTWVtbyguLi5hcmdzOiBhbnkpOiBUUmVzdWx0IHtcbiAgICBjb25zdCBrZXkgPSBrZXlGdW5jID8ga2V5RnVuYyguLi5hcmdzKSA6IEpTT04uc3RyaW5naWZ5KHsgYXJncyB9KVxuICAgIGNvbnN0IGV4aXN0aW5nID0gY2FjaGVba2V5XVxuICAgIGlmIChleGlzdGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWV4aXN0aW5nLmV4cCkgcmV0dXJuIGV4aXN0aW5nLnZhbHVlXG4gICAgICBpZiAoZXhpc3RpbmcuZXhwID4gbmV3IERhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMoLi4uYXJncylcbiAgICBjYWNoZVtrZXldID0ge1xuICAgICAgZXhwOiB0dGwgPyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHR0bCA6IG51bGwsXG4gICAgICB2YWx1ZTogcmVzdWx0XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtZW1vaXplZCBmdW5jdGlvbi4gVGhlIHJldHVybmVkIGZ1bmN0aW9uXG4gKiB3aWxsIG9ubHkgZXhlY3V0ZSB0aGUgc291cmNlIGZ1bmN0aW9uIHdoZW4gbm8gdmFsdWVcbiAqIGhhcyBwcmV2aW91c2x5IGJlZW4gY29tcHV0ZWQuIElmIGEgdHRsIChtaWxsaXNlY29uZHMpXG4gKiBpcyBnaXZlbiBwcmV2aW91c2x5IGNvbXB1dGVkIHZhbHVlcyB3aWxsIGJlIGNoZWNrZWRcbiAqIGZvciBleHBpcmF0aW9uIGJlZm9yZSBiZWluZyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1lbW8gPSA8VEFyZ3MgZXh0ZW5kcyBhbnlbXSwgVFJlc3VsdD4oXG4gIGZ1bmM6ICguLi5hcmdzOiBUQXJncykgPT4gVFJlc3VsdCxcbiAgb3B0aW9uczoge1xuICAgIGtleT86ICguLi5hcmdzOiBUQXJncykgPT4gc3RyaW5nXG4gICAgdHRsPzogbnVtYmVyXG4gIH0gPSB7fVxuKSA9PiB7XG4gIHJldHVybiBtZW1vaXplKHt9LCBmdW5jLCBvcHRpb25zLmtleSA/PyBudWxsLCBvcHRpb25zLnR0bCA/PyBudWxsKSBhcyAoXG4gICAgLi4uYXJnczogVEFyZ3NcbiAgKSA9PiBUUmVzdWx0XG59XG5cbmV4cG9ydCB0eXBlIERlYm91bmNlRnVuY3Rpb248VEFyZ3MgZXh0ZW5kcyBhbnlbXT4gPSB7XG4gICguLi5hcmdzOiBUQXJncyk6IHZvaWRcbiAgLyoqXG4gICAqIENhbmNlbHMgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICAgKi9cbiAgY2FuY2VsKCk6IHZvaWRcbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGVyZSBpcyBhbnkgaW52b2NhdGlvbiBkZWJvdW5jZWRcbiAgICovXG4gIGlzUGVuZGluZygpOiBib29sZWFuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gaW1tZWRpYXRlbHlcbiAgICovXG4gIGZsdXNoKC4uLmFyZ3M6IFRBcmdzKTogdm9pZFxufVxuXG5leHBvcnQgdHlwZSBUaHJvdHRsZWRGdW5jdGlvbjxUQXJncyBleHRlbmRzIGFueVtdPiA9IHtcbiAgKC4uLmFyZ3M6IFRBcmdzKTogdm9pZFxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZXJlIGlzIGFueSBpbnZvY2F0aW9uIHRocm90dGxlZFxuICAgKi9cbiAgaXNUaHJvdHRsZWQoKTogYm9vbGVhblxufVxuXG4vKipcbiAqIEdpdmVuIGEgZGVsYXkgYW5kIGEgZnVuY3Rpb24gcmV0dXJucyBhIG5ldyBmdW5jdGlvblxuICogdGhhdCB3aWxsIG9ubHkgY2FsbCB0aGUgc291cmNlIGZ1bmN0aW9uIGFmdGVyIGRlbGF5XG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBwYXNzZWQgd2l0aG91dCBhbnkgaW52b2NhdGlvbnMuXG4gKlxuICogVGhlIGRlYm91bmNlIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2RcbiAqIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgXG4gKiBtZXRob2QgdG8gaW52b2tlIHRoZW0gaW1tZWRpYXRlbHlcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gPFRBcmdzIGV4dGVuZHMgYW55W10+KFxuICB7IGRlbGF5IH06IHsgZGVsYXk6IG51bWJlciB9LFxuICBmdW5jOiAoLi4uYXJnczogVEFyZ3MpID0+IGFueVxuKSA9PiB7XG4gIGxldCB0aW1lcjogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgbGV0IGFjdGl2ZSA9IHRydWVcblxuICBjb25zdCBkZWJvdW5jZWQ6IERlYm91bmNlRnVuY3Rpb248VEFyZ3M+ID0gKC4uLmFyZ3M6IFRBcmdzKSA9PiB7XG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYWN0aXZlICYmIGZ1bmMoLi4uYXJncylcbiAgICAgICAgdGltZXIgPSB1bmRlZmluZWRcbiAgICAgIH0sIGRlbGF5KVxuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jKC4uLmFyZ3MpXG4gICAgfVxuICB9XG4gIGRlYm91bmNlZC5pc1BlbmRpbmcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRpbWVyICE9PSB1bmRlZmluZWRcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gKCkgPT4ge1xuICAgIGFjdGl2ZSA9IGZhbHNlXG4gIH1cbiAgZGVib3VuY2VkLmZsdXNoID0gKC4uLmFyZ3M6IFRBcmdzKSA9PiBmdW5jKC4uLmFyZ3MpXG5cbiAgcmV0dXJuIGRlYm91bmNlZFxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGludGVydmFsIGFuZCBhIGZ1bmN0aW9uIHJldHVybnMgYSBuZXcgZnVuY3Rpb25cbiAqIHRoYXQgd2lsbCBvbmx5IGNhbGwgdGhlIHNvdXJjZSBmdW5jdGlvbiBpZiBpbnRlcnZhbCBtaWxsaXNlY29uZHNcbiAqIGhhdmUgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGludm9jYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRocm90dGxlID0gPFRBcmdzIGV4dGVuZHMgYW55W10+KFxuICB7IGludGVydmFsIH06IHsgaW50ZXJ2YWw6IG51bWJlciB9LFxuICBmdW5jOiAoLi4uYXJnczogVEFyZ3MpID0+IGFueVxuKSA9PiB7XG4gIGxldCByZWFkeSA9IHRydWVcbiAgbGV0IHRpbWVyOiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxuXG4gIGNvbnN0IHRocm90dGxlZDogVGhyb3R0bGVkRnVuY3Rpb248VEFyZ3M+ID0gKC4uLmFyZ3M6IFRBcmdzKSA9PiB7XG4gICAgaWYgKCFyZWFkeSkgcmV0dXJuXG4gICAgZnVuYyguLi5hcmdzKVxuICAgIHJlYWR5ID0gZmFsc2VcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVhZHkgPSB0cnVlXG4gICAgICB0aW1lciA9IHVuZGVmaW5lZFxuICAgIH0sIGludGVydmFsKVxuICB9XG4gIHRocm90dGxlZC5pc1Rocm90dGxlZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdGltZXIgIT09IHVuZGVmaW5lZFxuICB9XG4gIHJldHVybiB0aHJvdHRsZWRcbn1cblxuLyoqXG4gKiBNYWtlIGFuIG9iamVjdCBjYWxsYWJsZS4gR2l2ZW4gYW4gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uXG4gKiB0aGUgcmV0dXJuZWQgb2JqZWN0IHdpbGwgYmUgYSBmdW5jdGlvbiB3aXRoIGFsbCB0aGVcbiAqIG9iamVjdHMgcHJvcGVydGllcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgY2FyID0gY2FsbGFibGUoe1xuICogICB3aGVlbHM6IDJcbiAqIH0sIHNlbGYgPT4gKCkgPT4ge1xuICogICByZXR1cm4gJ2RyaXZpbmcnXG4gKiB9KVxuICpcbiAqIGNhci53aGVlbHMgLy8gPT4gMlxuICogY2FyKCkgLy8gPT4gJ2RyaXZpbmcnXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGxhYmxlID0gPFxuICBUVmFsdWUsXG4gIFRPYmogZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sLCBUVmFsdWU+LFxuICBURnVuYyBleHRlbmRzICguLi5hcmdzOiBhbnkpID0+IGFueVxuPihcbiAgb2JqOiBUT2JqLFxuICBmbjogKHNlbGY6IFRPYmopID0+IFRGdW5jXG4pOiBUT2JqICYgVEZ1bmMgPT4ge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBjb25zdCBGVU5DID0gKCkgPT4ge31cbiAgcmV0dXJuIG5ldyBQcm94eShPYmplY3QuYXNzaWduKEZVTkMsIG9iaiksIHtcbiAgICBnZXQ6ICh0YXJnZXQsIGtleTogc3RyaW5nKSA9PiB0YXJnZXRba2V5XSxcbiAgICBzZXQ6ICh0YXJnZXQsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICA7KHRhcmdldCBhcyBhbnkpW2tleV0gPSB2YWx1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuICAgIGFwcGx5OiAodGFyZ2V0LCBzZWxmLCBhcmdzKSA9PiBmbihPYmplY3QuYXNzaWduKHt9LCB0YXJnZXQpKSguLi5hcmdzKVxuICB9KSBhcyB1bmtub3duIGFzIFRPYmogJiBURnVuY1xufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hlbHBlcnMvYnVuZGxlLXVybCcpLmdldEJ1bmRsZVVSTCgna3FaekknKSArIFwiLi4vLi4vY29weS4xZmQ3OGZhOS5qc1wiICsgXCI/XCIgKyBEYXRlLm5vdygpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYnVuZGxlVVJMID0ge307XG5cbmZ1bmN0aW9uIGdldEJ1bmRsZVVSTENhY2hlZChpZCkge1xuICB2YXIgdmFsdWUgPSBidW5kbGVVUkxbaWRdO1xuXG4gIGlmICghdmFsdWUpIHtcbiAgICB2YWx1ZSA9IGdldEJ1bmRsZVVSTCgpO1xuICAgIGJ1bmRsZVVSTFtpZF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0QnVuZGxlVVJMKCkge1xuICB0cnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YXIgbWF0Y2hlcyA9ICgnJyArIGVyci5zdGFjaykubWF0Y2goLyhodHRwcz98ZmlsZXxmdHB8KGNocm9tZXxtb3p8c2FmYXJpLXdlYiktZXh0ZW5zaW9uKTpcXC9cXC9bXilcXG5dKy9nKTtcblxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAvLyBUaGUgZmlyc3QgdHdvIHN0YWNrIGZyYW1lcyB3aWxsIGJlIHRoaXMgZnVuY3Rpb24gYW5kIGdldEJ1bmRsZVVSTENhY2hlZC5cbiAgICAgIC8vIFVzZSB0aGUgM3JkIG9uZSwgd2hpY2ggd2lsbCBiZSBhIHJ1bnRpbWUgaW4gdGhlIG9yaWdpbmFsIGJ1bmRsZS5cbiAgICAgIHJldHVybiBnZXRCYXNlVVJMKG1hdGNoZXNbMl0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnLyc7XG59XG5cbmZ1bmN0aW9uIGdldEJhc2VVUkwodXJsKSB7XG4gIHJldHVybiAoJycgKyB1cmwpLnJlcGxhY2UoL14oKD86aHR0cHM/fGZpbGV8ZnRwfChjaHJvbWV8bW96fHNhZmFyaS13ZWIpLWV4dGVuc2lvbik6XFwvXFwvLispXFwvW14vXSskLywgJyQxJykgKyAnLyc7XG59IC8vIFRPRE86IFJlcGxhY2UgdXNlcyB3aXRoIGBuZXcgVVJMKHVybCkub3JpZ2luYCB3aGVuIGllMTEgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC5cblxuXG5mdW5jdGlvbiBnZXRPcmlnaW4odXJsKSB7XG4gIHZhciBtYXRjaGVzID0gKCcnICsgdXJsKS5tYXRjaCgvKGh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcL1teL10rLyk7XG5cbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcmlnaW4gbm90IGZvdW5kJyk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlc1swXTtcbn1cblxuZXhwb3J0cy5nZXRCdW5kbGVVUkwgPSBnZXRCdW5kbGVVUkxDYWNoZWQ7XG5leHBvcnRzLmdldEJhc2VVUkwgPSBnZXRCYXNlVVJMO1xuZXhwb3J0cy5nZXRPcmlnaW4gPSBnZXRPcmlnaW47IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCJAcGxhc21vaHEvc3RvcmFnZVwiXHJcblxyXG5leHBvcnQgZW51bSBTVE9SRV9LRVkge1xyXG4gIFJPVVRFUyA9ICdyb3V0ZXMnLFxyXG4gIEdMT0JBTF9TV0lUQ0hfQ09ORklHID0gJ2dsb2JhbFN3aXRjaENvbmZpZycsXHJcbiAgTE9BRElORyA9ICdsb2FkaW5nJyxcclxuICBHUk9VUFMgPSAnZ3JvdXBzJyxcclxuICBHUk9VUFNfTUFQID0gJ2dyb3Vwc01hcCcsXHJcbn1cclxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmFnZSh7XHJcbiAgYXJlYTogXCJzeW5jXCIsXHJcbiAgY29waWVkS2V5TGlzdDogW10sXHJcbn0pXHJcblxyXG5zdG9yZS53YXRjaCh7XHJcbiAgW1NUT1JFX0tFWS5HUk9VUFNdOiAoYykgPT4ge1xyXG4gICAgY29uc3QgbWFwID0ge307XHJcbiAgICAoYz8ubmV3VmFsdWUgfHwgW10pLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIG1hcFtlbGVtZW50LnZhbHVlXSA9IGVsZW1lbnQubGFiZWxcclxuICAgIH0pO1xyXG4gICAgc3RvcmUuc2V0KFNUT1JFX0tFWS5HUk9VUFNfTUFQLCBtYXApXHJcbiAgfSxcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JlIiwiaW1wb3J0IHkgZnJvbVwicGlmeVwiO3ZhciBsPSgpPT57dHJ5e2xldCBlPShnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50KS5tYXRjaCgvKG9wZXJhfGNocm9tZXxzYWZhcml8ZmlyZWZveHxtc2llfHRyaWRlbnQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpfHxbXTtpZihlWzFdPT09XCJDaHJvbWVcIilyZXR1cm4gcGFyc2VJbnQoZVsyXSk8MTAwfHxnbG9iYWxUaGlzLmNocm9tZS5ydW50aW1lPy5nZXRNYW5pZmVzdCgpPy5tYW5pZmVzdF92ZXJzaW9uPT09Mn1jYXRjaHtyZXR1cm4hMX1yZXR1cm4hMX07dmFyIG89Y2xhc3N7I2E7I2U7Z2V0IHByaW1hcnlDbGllbnQoKXtyZXR1cm4gdGhpcy4jZX0jdDtnZXQgc2Vjb25kYXJ5Q2xpZW50KCl7cmV0dXJuIHRoaXMuI3R9I3I7Z2V0IGFyZWEoKXtyZXR1cm4gdGhpcy4jcn1nZXQgaGFzV2ViQXBpKCl7dHJ5e3JldHVybiB0eXBlb2Ygd2luZG93PFwidVwiJiYhIXdpbmRvdy5sb2NhbFN0b3JhZ2V9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUuZXJyb3IoZSksITF9fSNzPW5ldyBNYXA7I2k7Z2V0IGNvcGllZEtleVNldCgpe3JldHVybiB0aGlzLiNpfWlzQ29waWVkPWU9PnRoaXMuaGFzV2ViQXBpJiYodGhpcy5hbGxDb3BpZWR8fHRoaXMuY29waWVkS2V5U2V0LmhhcyhlKSk7I249ITE7Z2V0IGFsbENvcGllZCgpe3JldHVybiB0aGlzLiNufWdldEV4dFN0b3JhZ2VBcGk9KCk9Pmdsb2JhbFRoaXMuYnJvd3Nlcj8uc3RvcmFnZXx8Z2xvYmFsVGhpcy5jaHJvbWU/LnN0b3JhZ2U7Z2V0IGhhc0V4dGVuc2lvbkFwaSgpe3RyeXtyZXR1cm4hIXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmVycm9yKGUpLCExfX1pc1dhdGNoU3VwcG9ydGVkPSgpPT50aGlzLmhhc0V4dGVuc2lvbkFwaTtrZXlOYW1lc3BhY2U9XCJcIjtpc1ZhbGlkS2V5PWU9PmUuc3RhcnRzV2l0aCh0aGlzLmtleU5hbWVzcGFjZSk7Z2V0TmFtZXNwYWNlZEtleT1lPT5gJHt0aGlzLmtleU5hbWVzcGFjZX0ke2V9YDtnZXRVbm5hbWVzcGFjZWRLZXk9ZT0+ZS5zbGljZSh0aGlzLmtleU5hbWVzcGFjZS5sZW5ndGgpO2NvbnN0cnVjdG9yKHthcmVhOmU9XCJzeW5jXCIsYWxsQ29waWVkOnQ9ITEsY29waWVkS2V5TGlzdDpzPVtdfT17fSl7dGhpcy5zZXRDb3BpZWRLZXlTZXQocyksdGhpcy4jcj1lLHRoaXMuI249dDt0cnl7dGhpcy5oYXNXZWJBcGkmJih0fHxzLmxlbmd0aD4wKSYmKHRoaXMuI3Q9d2luZG93LmxvY2FsU3RvcmFnZSl9Y2F0Y2h7fXRyeXt0aGlzLmhhc0V4dGVuc2lvbkFwaSYmKHRoaXMuI2E9dGhpcy5nZXRFeHRTdG9yYWdlQXBpKCksbCgpP3RoaXMuI2U9eSh0aGlzLiNhW3RoaXMuYXJlYV0se2V4Y2x1ZGU6W1wiZ2V0Qnl0ZXNJblVzZVwiXSxlcnJvckZpcnN0OiExfSk6dGhpcy4jZT10aGlzLiNhW3RoaXMuYXJlYV0pfWNhdGNoe319c2V0Q29waWVkS2V5U2V0KGUpe3RoaXMuI2k9bmV3IFNldChlKX1yYXdHZXRBbGw9KCk9PnRoaXMuI2U/LmdldCgpO2dldEFsbD1hc3luYygpPT57bGV0IGU9YXdhaXQgdGhpcy5yYXdHZXRBbGwoKTtyZXR1cm4gT2JqZWN0LmVudHJpZXMoZSkuZmlsdGVyKChbdF0pPT50aGlzLmlzVmFsaWRLZXkodCkpLnJlZHVjZSgodCxbcyxhXSk9Pih0W3RoaXMuZ2V0VW5uYW1lc3BhY2VkS2V5KHMpXT1hLHQpLHt9KX07Y29weT1hc3luYyBlPT57bGV0IHQ9ZT09PXZvaWQgMDtpZighdCYmIXRoaXMuY29waWVkS2V5U2V0LmhhcyhlKXx8IXRoaXMuYWxsQ29waWVkfHwhdGhpcy5oYXNFeHRlbnNpb25BcGkpcmV0dXJuITE7bGV0IHM9dGhpcy5hbGxDb3BpZWQ/YXdhaXQgdGhpcy5yYXdHZXRBbGwoKTphd2FpdCB0aGlzLiNlLmdldCgodD9bLi4udGhpcy5jb3BpZWRLZXlTZXRdOltlXSkubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSkpO2lmKCFzKXJldHVybiExO2xldCBhPSExO2ZvcihsZXQgciBpbiBzKXtsZXQgaT1zW3JdLG49dGhpcy4jdD8uZ2V0SXRlbShyKTt0aGlzLiN0Py5zZXRJdGVtKHIsaSksYXx8PWkhPT1ufXJldHVybiBhfTtyYXdHZXQ9YXN5bmMgZT0+dGhpcy5oYXNFeHRlbnNpb25BcGk/KGF3YWl0IHRoaXMuI2UuZ2V0KGUpKVtlXTp0aGlzLmlzQ29waWVkKGUpP3RoaXMuI3Q/LmdldEl0ZW0oZSk6bnVsbDtyYXdTZXQ9YXN5bmMoZSx0KT0+KHRoaXMuaXNDb3BpZWQoZSkmJnRoaXMuI3Q/LnNldEl0ZW0oZSx0KSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jZS5zZXQoe1tlXTp0fSksbnVsbCk7Y2xlYXI9YXN5bmMoZT0hMSk9PntlJiZ0aGlzLiN0Py5jbGVhcigpLGF3YWl0IHRoaXMuI2UuY2xlYXIoKX07cmF3UmVtb3ZlPWFzeW5jIGU9Pnt0aGlzLmlzQ29waWVkKGUpJiZ0aGlzLiN0Py5yZW1vdmVJdGVtKGUpLHRoaXMuaGFzRXh0ZW5zaW9uQXBpJiZhd2FpdCB0aGlzLiNlLnJlbW92ZShlKX07cmVtb3ZlQWxsPWFzeW5jKCk9PntsZXQgZT1hd2FpdCB0aGlzLmdldEFsbCgpLHQ9T2JqZWN0LmtleXMoZSk7YXdhaXQgUHJvbWlzZS5hbGwodC5tYXAodGhpcy5yZW1vdmUpKX07d2F0Y2g9ZT0+e2xldCB0PXRoaXMuaXNXYXRjaFN1cHBvcnRlZCgpO3JldHVybiB0JiZ0aGlzLiNvKGUpLHR9OyNvPWU9Pntmb3IobGV0IHQgaW4gZSl7bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KHQpLGE9dGhpcy4jcy5nZXQocyk/LmNhbGxiYWNrU2V0fHxuZXcgU2V0O2lmKGEuYWRkKGVbdF0pLGEuc2l6ZT4xKWNvbnRpbnVlO2xldCByPShpLG4pPT57aWYobiE9PXRoaXMuYXJlYXx8IWlbc10pcmV0dXJuO2xldCBoPXRoaXMuI3MuZ2V0KHMpO2lmKCFoKXRocm93IG5ldyBFcnJvcihgU3RvcmFnZSBjb21tcyBkb2VzIG5vdCBleGlzdCBmb3IgbnNLZXk6ICR7c31gKTtQcm9taXNlLmFsbChbdGhpcy5wYXJzZVZhbHVlKGlbc10ubmV3VmFsdWUpLHRoaXMucGFyc2VWYWx1ZShpW3NdLm9sZFZhbHVlKV0pLnRoZW4oKFtwLGRdKT0+e2ZvcihsZXQgbSBvZiBoLmNhbGxiYWNrU2V0KW0oe25ld1ZhbHVlOnAsb2xkVmFsdWU6ZH0sbil9KX07dGhpcy4jYS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIociksdGhpcy4jcy5zZXQocyx7Y2FsbGJhY2tTZXQ6YSxsaXN0ZW5lcjpyfSl9fTt1bndhdGNoPWU9PntsZXQgdD10aGlzLmlzV2F0Y2hTdXBwb3J0ZWQoKTtyZXR1cm4gdCYmdGhpcy4jYyhlKSx0fTsjYyhlKXtmb3IobGV0IHQgaW4gZSl7bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KHQpLGE9ZVt0XSxyPXRoaXMuI3MuZ2V0KHMpO3ImJihyLmNhbGxiYWNrU2V0LmRlbGV0ZShhKSxyLmNhbGxiYWNrU2V0LnNpemU9PT0wJiYodGhpcy4jcy5kZWxldGUocyksdGhpcy4jYS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoci5saXN0ZW5lcikpKX19dW53YXRjaEFsbD0oKT0+dGhpcy4jaCgpOyNoKCl7dGhpcy4jcy5mb3JFYWNoKCh7bGlzdGVuZXI6ZX0pPT50aGlzLiNhLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihlKSksdGhpcy4jcy5jbGVhcigpfWFzeW5jIGdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuZ2V0KGUpfWFzeW5jIHNldEl0ZW0oZSx0KXthd2FpdCB0aGlzLnNldChlLHQpfWFzeW5jIHJlbW92ZUl0ZW0oZSl7cmV0dXJuIHRoaXMucmVtb3ZlKGUpfX0sZz1jbGFzcyBleHRlbmRzIG97Z2V0PWFzeW5jIGU9PntsZXQgdD10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSkscz1hd2FpdCB0aGlzLnJhd0dldCh0KTtyZXR1cm4gdGhpcy5wYXJzZVZhbHVlKHMpfTtzZXQ9YXN5bmMoZSx0KT0+e2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKSxhPUpTT04uc3RyaW5naWZ5KHQpO3JldHVybiB0aGlzLnJhd1NldChzLGEpfTtyZW1vdmU9YXN5bmMgZT0+e2xldCB0PXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKTtyZXR1cm4gdGhpcy5yYXdSZW1vdmUodCl9O3NldE5hbWVzcGFjZT1lPT57dGhpcy5rZXlOYW1lc3BhY2U9ZX07cGFyc2VWYWx1ZT1hc3luYyBlPT57dHJ5e2lmKGUhPT12b2lkIDApcmV0dXJuIEpTT04ucGFyc2UoZSl9Y2F0Y2godCl7Y29uc29sZS5lcnJvcih0KX19fTtleHBvcnR7byBhcyBCYXNlU3RvcmFnZSxnIGFzIFN0b3JhZ2V9O1xuIiwiY29uc3QgcHJvY2Vzc0Z1bmN0aW9uID0gKGZ1bmN0aW9uXywgb3B0aW9ucywgcHJveHksIHVud3JhcHBlZCkgPT4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0Y29uc3QgUCA9IG9wdGlvbnMucHJvbWlzZU1vZHVsZTtcblxuXHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGlmIChvcHRpb25zLm11bHRpQXJncykge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKCguLi5yZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZXJyb3JGaXJzdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHRbMF0pIHtcblx0XHRcdFx0XHRcdHJlamVjdChyZXN1bHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuc2hpZnQoKTtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZXJyb3JGaXJzdCkge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKChlcnJvciwgcmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKHJlc29sdmUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzID09PSBwcm94eSA/IHVud3JhcHBlZCA6IHRoaXM7XG5cdFx0UmVmbGVjdC5hcHBseShmdW5jdGlvbl8sIHNlbGYsIGFyZ3VtZW50c18pO1xuXHR9KTtcbn07XG5cbmNvbnN0IGZpbHRlckNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGlmeShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0ge1xuXHRcdGV4Y2x1ZGU6IFsvLisoPzpTeW5jfFN0cmVhbSkkL10sXG5cdFx0ZXJyb3JGaXJzdDogdHJ1ZSxcblx0XHRwcm9taXNlTW9kdWxlOiBQcm9taXNlLFxuXHRcdC4uLm9wdGlvbnMsXG5cdH07XG5cblx0Y29uc3Qgb2JqZWN0VHlwZSA9IHR5cGVvZiBpbnB1dDtcblx0aWYgKCEoaW5wdXQgIT09IG51bGwgJiYgKG9iamVjdFR5cGUgPT09ICdvYmplY3QnIHx8IG9iamVjdFR5cGUgPT09ICdmdW5jdGlvbicpKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYGlucHV0XFxgIHRvIGJlIGEgXFxgRnVuY3Rpb25cXGAgb3IgXFxgT2JqZWN0XFxgLCBnb3QgXFxgJHtpbnB1dCA9PT0gbnVsbCA/ICdudWxsJyA6IG9iamVjdFR5cGV9XFxgYCk7XG5cdH1cblxuXHRjb25zdCBmaWx0ZXIgPSAodGFyZ2V0LCBrZXkpID0+IHtcblx0XHRsZXQgY2FjaGVkID0gZmlsdGVyQ2FjaGUuZ2V0KHRhcmdldCk7XG5cblx0XHRpZiAoIWNhY2hlZCkge1xuXHRcdFx0Y2FjaGVkID0ge307XG5cdFx0XHRmaWx0ZXJDYWNoZS5zZXQodGFyZ2V0LCBjYWNoZWQpO1xuXHRcdH1cblxuXHRcdGlmIChrZXkgaW4gY2FjaGVkKSB7XG5cdFx0XHRyZXR1cm4gY2FjaGVkW2tleV07XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF0Y2ggPSBwYXR0ZXJuID0+ICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpID8ga2V5ID09PSBwYXR0ZXJuIDogcGF0dGVybi50ZXN0KGtleSk7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcblx0XHRjb25zdCB3cml0YWJsZU9yQ29uZmlndXJhYmxlT3duID0gKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCB8fCBkZXNjcmlwdG9yLndyaXRhYmxlIHx8IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlKTtcblx0XHRjb25zdCBpbmNsdWRlZCA9IG9wdGlvbnMuaW5jbHVkZSA/IG9wdGlvbnMuaW5jbHVkZS5zb21lKGVsZW1lbnQgPT4gbWF0Y2goZWxlbWVudCkpIDogIW9wdGlvbnMuZXhjbHVkZS5zb21lKGVsZW1lbnQgPT4gbWF0Y2goZWxlbWVudCkpO1xuXHRcdGNvbnN0IHNob3VsZEZpbHRlciA9IGluY2x1ZGVkICYmIHdyaXRhYmxlT3JDb25maWd1cmFibGVPd247XG5cdFx0Y2FjaGVkW2tleV0gPSBzaG91bGRGaWx0ZXI7XG5cdFx0cmV0dXJuIHNob3VsZEZpbHRlcjtcblx0fTtcblxuXHRjb25zdCBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkoaW5wdXQsIHtcblx0XHRhcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpIHtcblx0XHRcdGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldCh0YXJnZXQpO1xuXG5cdFx0XHRpZiAoY2FjaGVkKSB7XG5cdFx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KGNhY2hlZCwgdGhpc0FyZywgYXJncyk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHBpZmllZCA9IG9wdGlvbnMuZXhjbHVkZU1haW4gPyB0YXJnZXQgOiBwcm9jZXNzRnVuY3Rpb24odGFyZ2V0LCBvcHRpb25zLCBwcm94eSwgdGFyZ2V0KTtcblx0XHRcdGNhY2hlLnNldCh0YXJnZXQsIHBpZmllZCk7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5hcHBseShwaWZpZWQsIHRoaXNBcmcsIGFyZ3MpO1xuXHRcdH0sXG5cblx0XHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtZXh0ZW5kLW5hdGl2ZS9uby11c2UtZXh0ZW5kLW5hdGl2ZVxuXHRcdFx0aWYgKCFmaWx0ZXIodGFyZ2V0LCBrZXkpIHx8IHByb3BlcnR5ID09PSBGdW5jdGlvbi5wcm90b3R5cGVba2V5XSkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChwcm9wZXJ0eSk7XG5cblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0cmV0dXJuIGNhY2hlZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjb25zdCBwaWZpZWQgPSBwcm9jZXNzRnVuY3Rpb24ocHJvcGVydHksIG9wdGlvbnMsIHByb3h5LCB0YXJnZXQpO1xuXHRcdFx0XHRjYWNoZS5zZXQocHJvcGVydHksIHBpZmllZCk7XG5cdFx0XHRcdHJldHVybiBwaWZpZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblx0XHR9LFxuXHR9KTtcblxuXHRyZXR1cm4gcHJveHk7XG59XG4iLCJpbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3JhZGFzaCdcclxuLy8gaW1wb3J0IHhociBmcm9tICd1cmw6fmFwcC9zY3JpcHRzL3hoci50cydcclxuXHJcbmltcG9ydCB0eXBlIHsgUGxhc21vTWVzc2FnaW5nIH0gZnJvbSAnQHBsYXNtb2hxL21lc3NhZ2luZydcclxuXHJcbmltcG9ydCB7IEdMT0JBTF9WQVJJQUJMRSwgR0xPQkFMX1ZBUklBQkxFX01BUCB9IGZyb20gJ35hcHAvY29uc3RhbnRzJ1xyXG5pbXBvcnQgc3RvcmUsIHsgU1RPUkVfS0VZIH0gZnJvbSAnfmFwcC91dGlscy9zdG9yZSdcclxuXHJcbi8vIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7YWN0aW9uOiBNRVNTQUdFX1RZUEVTLk1BVENISU5HX1VQREFURX0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbi8vICAgY29uc29sZS5sb2cocmVzcG9uc2UuZmFyZXdlbGwpO1xyXG4vLyB9KTtcclxuXHJcbmNvbnN0IGluamVjdE1hcCA9IG5ldyBNYXAoKVxyXG5cclxuY29uc3QgaW5qZWN0ID0gZGVib3VuY2UoeyBkZWxheTogMjAwIH0sIGFzeW5jICh3aW5kb3dJZDogbnVtYmVyLCB0YWJJZDogbnVtYmVyKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHN0b3JlLmdldEl0ZW0oU1RPUkVfS0VZLlJPVVRFUylcclxuICBjb25zdCBbdGFiXSA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHtcclxuICAgIGFjdGl2ZTogdHJ1ZVxyXG4gIH0pXHJcbiAgY29uc3QgZW5hYmxlSW5UYWIgPSB0YWI/LnVybD8uc3RhcnRzV2l0aCgnaHR0cCcpXHJcbiAgY29uc3QgY29uZmlnOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPiA9IGF3YWl0IHN0b3JlLmdldChTVE9SRV9LRVkuR0xPQkFMX1NXSVRDSF9DT05GSUcpXHJcbiAgY29uc3QgbW9ja0VuYWJsZWQgPSBjb25maWc/Lm1vY2sgPz8gZmFsc2VcclxuICBpZiAobW9ja0VuYWJsZWQgJiYgZW5hYmxlSW5UYWIpIHtcclxuICAgIGNvbnN0IHRhZyA9IGBtb2NrLSR7d2luZG93SWR9LSR7dGFiSWR9YFxyXG4gICAgLy8g5ZCv55SoTW9ja+S4lOiEmuacquaPkuWFpTog5YWI5rOo5YWl5YWo5bGA5b6FbW9ja+i3r+eUseaVsOaNruWGjeazqOWFpeiEmuacrFxyXG4gICAgaWYgKCFpbmplY3RNYXAuaGFzKHRhZykgfHwgaW5qZWN0TWFwLmdldCh0YWcpID09PSBmYWxzZSkge1xyXG4gICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgICAgIHRhYklkXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgd29ybGQ6ICdNQUlOJywgLy8gTUFJTiBpbiBvcmRlciB0byBhY2Nlc3MgdGhlIHdpbmRvdyBvYmplY3RcclxuICAgICAgICAgIGZ1bmM6IGFzeW5jIChkYXRhLCB2YXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgd2luZG93W3Zhck5hbWVdID0gZGF0YVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXJnczogW2RhdGEsIEdMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgICAvLyBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoXHJcbiAgICAgIC8vICAge1xyXG4gICAgICAvLyAgICAgdGFyZ2V0OiB7XHJcbiAgICAgIC8vICAgICAgIHRhYklkXHJcbiAgICAgIC8vICAgICB9LFxyXG4gICAgICAvLyAgICAgd29ybGQ6ICdNQUlOJywgLy8gTUFJTiBpbiBvcmRlciB0byBhY2Nlc3MgdGhlIHdpbmRvdyBvYmplY3RcclxuICAgICAgLy8gICAgIGZpbGVzOiBbeGhyLnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJz8nKVswXV1cclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDlkK/nlKhNb2Nr5LiU6ISa5pys5bey5o+S5YWlOiDmgaLlpI3ot6/nlLFcclxuICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcclxuICAgICAgICB0YXJnZXQ6IHtcclxuICAgICAgICAgIHRhYklkXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3b3JsZDogJ01BSU4nLCAvLyBNQUlOIGluIG9yZGVyIHRvIGFjY2VzcyB0aGUgd2luZG93IG9iamVjdFxyXG4gICAgICAgIGZ1bmM6IGFzeW5jIChkYXRhLCB2YXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3dbdmFyTmFtZV0gPSBkYXRhXHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFyZ3M6IFtkYXRhLCBHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgaW5qZWN0TWFwLnNldCh0YWcsIHRydWUpXHJcbiAgfVxyXG4gIC8vIOacquWQr+eUqE1vY2s6IOa4heepuui3r+eUsVxyXG4gIGlmICghbW9ja0VuYWJsZWQgJiYgZW5hYmxlSW5UYWIpIHtcclxuICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XHJcbiAgICAgIHRhcmdldDoge1xyXG4gICAgICAgIHRhYklkXHJcbiAgICAgIH0sXHJcbiAgICAgIHdvcmxkOiAnTUFJTicsIC8vIE1BSU4gaW4gb3JkZXIgdG8gYWNjZXNzIHRoZSB3aW5kb3cgb2JqZWN0XHJcbiAgICAgIGZ1bmM6IGFzeW5jICh2YXJOYW1lKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHdpbmRvd1t2YXJOYW1lXSA9IFtdXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgYXJnczogW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdXHJcbiAgICB9KVxyXG4gIH1cclxuICBjb25zb2xlLmxvZygnaW5qZWN0TWFwOicsIGluamVjdE1hcClcclxufSlcclxuLy8g5r+A5rS7dGFiXHJcbmNvbnN0IG9uQWN0aXZhdGVkID0gYXN5bmMgKGUpID0+IHtcclxuICBjb25zdCB7IHdpbmRvd0lkLCB0YWJJZCB9ID0gZVxyXG4gIGluamVjdCh3aW5kb3dJZCwgdGFiSWQpXHJcbn1cclxuLy8g6aG16Z2i5Yi35pawXHJcbmNvbnN0IG9uVXBkYXRlZCA9IGZ1bmN0aW9uICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XHJcbiAgY29uc3QgeyB3aW5kb3dJZCB9ID0gdGFiXHJcbiAgY29uc3QgdGFnID0gYG1vY2stJHt3aW5kb3dJZH0tJHt0YWJJZH1gXHJcbiAgaWYgKGluamVjdE1hcC5oYXModGFnKSkge1xyXG4gICAgaW5qZWN0TWFwLmRlbGV0ZSh0YWcpXHJcbiAgfVxyXG4gIGlmICh0YWIudXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xyXG4gICAgaW5qZWN0KHdpbmRvd0lkLCB0YWJJZClcclxuICB9XHJcbn1cclxuLy8g5YWz6Zet5rWP6KeI5ZmoXHJcbmNvbnN0IG9uUmVtb3ZlZCA9ICh3aW5kb3dJZCkgPT4ge1xyXG4gIGluamVjdE1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYG1vY2stJHt3aW5kb3dJZH0tYCkpIHtcclxuICAgICAgaWYgKGluamVjdE1hcC5oYXMoa2V5KSkge1xyXG4gICAgICAgIGluamVjdE1hcC5kZWxldGUoa2V5KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4vLyDlhbPpl610YWJcclxuY29uc3Qgb25UYWJSZW1vdmUgPSAodGFiSWQsIHJlbW92ZUluZm8pID0+IHtcclxuICBjb25zdCB7IHdpbmRvd0lkIH0gPSByZW1vdmVJbmZvXHJcbiAgY29uc3QgdGFnID0gYG1vY2stJHt3aW5kb3dJZH0tJHt0YWJJZH1gXHJcbiAgaWYgKGluamVjdE1hcC5oYXModGFnKSkge1xyXG4gICAgaW5qZWN0TWFwLmRlbGV0ZSh0YWcpXHJcbiAgfVxyXG59XHJcblxyXG4vLyDmv4DmtLt0YWJcclxuaWYgKCFjaHJvbWUudGFicy5vbkFjdGl2YXRlZC5oYXNMaXN0ZW5lcihvbkFjdGl2YXRlZCkpIHtcclxuICBjaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihvbkFjdGl2YXRlZClcclxufVxyXG5pZiAoIWNocm9tZS50YWJzLm9uVXBkYXRlZC5oYXNMaXN0ZW5lcihvblVwZGF0ZWQpKSB7XHJcbiAgLy8g5Yi35paw6aG16Z2iXHJcbiAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKG9uVXBkYXRlZClcclxufVxyXG5pZiAoIWNocm9tZS53aW5kb3dzLm9uUmVtb3ZlZC5oYXNMaXN0ZW5lcihvblJlbW92ZWQpKSB7XHJcbiAgLy8g55uR5ZCs5YWz6Zet5rWP6KeI5ZmoXHJcbiAgY2hyb21lLndpbmRvd3Mub25SZW1vdmVkLmFkZExpc3RlbmVyKG9uUmVtb3ZlZClcclxufVxyXG5pZiAoIWNocm9tZS50YWJzLm9uUmVtb3ZlZC5oYXNMaXN0ZW5lcihvblRhYlJlbW92ZSkpIHtcclxuICAvLyDnm5HlkKzlhbPpl63moIfnrb7pobVcclxuICBjaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIob25UYWJSZW1vdmUpXHJcbn1cclxuXHJcbmNvbnN0IGhhbmRsZXI6IFBsYXNtb01lc3NhZ2luZy5NZXNzYWdlSGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIGNvbnN0IHsgZW5hYmxlIH0gPSByZXEuYm9keVxyXG4gIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe1xyXG4gICAgYWN0aXZlOiB0cnVlXHJcbiAgfSlcclxuICBjb25zdCBlbmFibGVJblRhYiA9IHRhYj8udXJsPy5zdGFydHNXaXRoKCdodHRwJylcclxuICBpZiAoZW5hYmxlICYmIGVuYWJsZUluVGFiKSB7XHJcbiAgICAvLyDlvZPliY10YWLljbPml7blkK/liqhcclxuICAgIGNvbnN0IHsgd2luZG93SWQsIGlkIH0gPSB0YWJcclxuICAgIGluamVjdCh3aW5kb3dJZCwgaWQpXHJcbiAgfVxyXG4gIGlmICghZW5hYmxlICYmIGVuYWJsZUluVGFiKSB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSB0YWJcclxuICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XHJcbiAgICAgIHRhcmdldDoge1xyXG4gICAgICAgIHRhYklkOiBpZFxyXG4gICAgICB9LFxyXG4gICAgICB3b3JsZDogJ01BSU4nLCAvLyBNQUlOIGluIG9yZGVyIHRvIGFjY2VzcyB0aGUgd2luZG93IG9iamVjdFxyXG4gICAgICBmdW5jOiBhc3luYyAodmFyTmFtZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB3aW5kb3dbdmFyTmFtZV0gPSBbXVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFyZ3M6IFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXVxyXG4gICAgfSlcclxuICB9XHJcbiAgcmVzLnNlbmQoe30pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IGNvbnZlcnREaWN0VG9BcnJheSB9IGZyb20gJ35hcHAvdXRpbHMnXG5cbmltcG9ydCB7IEhUVFBfU1RBVFVTX0NPREUsIEhUVFBfU1RBVFVTX0NPREVfRElDVCB9IGZyb20gJy4vaHR0cFN0YXR1cydcblxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfVFlQRVMgPSB7XG4gIE1BVENISU5HX1VQREFURTogJ21hdGNoaW5nVXBkYXRlJyxcbiAgU0VUX0xPQURJTkc6ICdzZXRMb2FkaW5nJyxcbiAgU0VUX1JFQ09SRDogJ3NldFJlY29yZCcsXG59XG5cbmV4cG9ydCBlbnVtIE9QRVJBVEVfVFlQRSB7XG4gIEVESVQgPSAnZWRpdCcsXG4gIERFTEVURSA9ICdkZWxldGUnLFxuICBVUERBVEVfUkVDT1JEID0gJ3VwZGF0ZVJlY29yZCcsXG4gIFRPUCA9ICd0b3AnLFxuICBDTE9ORSA9ICdjbG9uZSdcbn1cbmV4cG9ydCBlbnVtIFJFUVVFU1RfVFlQRSB7XG4gIEFMTCA9ICcqJyxcbiAgR0VUID0gJ2dldCcsXG4gIFBPU1QgPSAncG9zdCcsIC8vIOWQkeacjeWKoeWZqOaPkOS6pOaVsOaNruOAglxuICBQVVQgPSAncHV0JywgLy8g5ZCR5pyN5Yqh5Zmo5LiK5Lyg5pu05paw5pWw5o2u44CCXG4gIERFTEVURSA9ICdkZWxldGUnLCAvLyDor7fmsYLmnI3liqHlmajliKDpmaTmjIflrprnmoTotYTmupDjgIJcbiAgSEVBRCA9ICdoZWFkJywgLy8g57G75Ly85LqOIEdFVCDor7fmsYLvvIzkvYblj6rov5Tlm57pppbpg6jvvIzkuI3ov5Tlm57lrp7pmYXlhoXlrrnjgIJcbiAgT1BUSU9OUyA9ICdvcHRpb25zJywgLy8g55So5LqO5o+P6L+w5a+555uu5qCH6LWE5rqQ55qE6YCa5L+h6YCJ6aG544CCXG4gIFBBVENIID0gJ3BhdGNoJywgLy8g55So5LqO5a+56LWE5rqQ6L+b6KGM5bGA6YOo5L+u5pS577yM5Y2z5a+56LWE5rqQ55qE6YOo5YiG5YaF5a656L+b6KGM5pu05paw5oiW5L+u5pS5XG4gIFRSQUNFID0gJ3RyYWNlJyAvLyDlm57mmL7mnI3liqHlmajmlLbliLDnmoTor7fmsYLvvIzkuLvopoHnlKjkuo7mtYvor5XmiJbor4rmlq3jgIJcbn1cbmV4cG9ydCBjb25zdCBSRVFVRVNUX1RZUEVfRElDVCA9IHtcbiAgW1JFUVVFU1RfVFlQRS5BTExdOiAn5LiN6ZmQJyxcbiAgW1JFUVVFU1RfVFlQRS5HRVRdOiAnR0VUJyxcbiAgW1JFUVVFU1RfVFlQRS5QT1NUXTogJ1BPU1QnLFxuICBbUkVRVUVTVF9UWVBFLlBVVF06ICdQVVQnLFxuICBbUkVRVUVTVF9UWVBFLkRFTEVURV06ICdERUxFVEUnLFxuICBbUkVRVUVTVF9UWVBFLkhFQURdOiAnSEVBRCcsXG4gIFtSRVFVRVNUX1RZUEUuT1BUSU9OU106ICdPUFRJT05TJyxcbiAgW1JFUVVFU1RfVFlQRS5QQVRDSF06ICdQQVRDSCcsXG4gIFtSRVFVRVNUX1RZUEUuVFJBQ0VdOiAnVFJBQ0UnXG59XG5leHBvcnQgY29uc3QgUkVRVUVTVF9UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoUkVRVUVTVF9UWVBFX0RJQ1QpXG5cbmV4cG9ydCBlbnVtIFBST1hZX1JPVVRFX0tFWSB7XG4gIElEID0gJ2lkJyxcbiAgTU9DS19UWVBFID0gJ21vY2tUeXBlJyxcbiAgRU5BQkxFID0gJ2VuYWJsZScsXG4gIE1BVENIX1RZUEUgPSAnbWF0Y2hUeXBlJyxcbiAgUkVRVUVTVF9UWVBFID0gJ3JlcXVlc3RUeXBlJyxcbiAgUkVTUE9OU0VfU1RBVFVTID0gJ3Jlc3BvbnNlU3RhdHVzJyxcbiAgUkVESVJFQ1RfVVJMID0gJ3JlZGlyZWN0VXJsJyxcbiAgREVMQVkgPSAnZGVsYXknLFxuICBVUkwgPSAndXJsJyxcbiAgR1JPVVAgPSAnZ3JvdXAnLFxuICBOQU1FID0gJ25hbWUnLFxuICBSRVNQT05TRSA9ICdyZXNwb25zZScsXG4gIE1PQ0tfUkVRVUVTVF9IRUFERVJTID0gJ21vY2tSZXF1ZXN0SGVhZGVycycsXG4gIEVOQUJMRV9NT0NLX1JFUVVFU1RfSEVBREVSUyA9ICdlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnMnLFxuICBSRVFVRVNUX0hFQURFUlMgPSAncmVxdWVzdEhlYWRlcnMnLFxuICBNT0NLX1JFU1BPTlNFX0hFQURFUlMgPSAnbW9ja1Jlc3BvbnNlSGVhZGVycycsXG4gIEVOQUJMRV9NT0NLX1JFU1BPTlNFX0hFQURFUlMgPSAnZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycycsXG4gIFJFU1BPTlNFX0hFQURFUlMgPSAncmVzcG9uc2VIZWFkZXJzJ1xufVxuZXhwb3J0IHR5cGUgUFJPWFlfUk9VVEVfSVRFTSA9IHtcbiAgW1BST1hZX1JPVVRFX0tFWS5JRF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLk1PQ0tfVFlQRV06IE1PQ0tfVFlQRVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV06IGJvb2xlYW5cbiAgW1BST1hZX1JPVVRFX0tFWS5NQVRDSF9UWVBFXTogTUFUQ0hfVFlQRVxuICBbUFJPWFlfUk9VVEVfS0VZLlJFUVVFU1RfVFlQRV06IFJFUVVFU1RfVFlQRVxuICBbUFJPWFlfUk9VVEVfS0VZLlJFU1BPTlNFX1NUQVRVU106IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFRElSRUNUX1VSTF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLkRFTEFZXTogbnVtYmVyXG4gIFtQUk9YWV9ST1VURV9LRVkuVVJMXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuR1JPVVBdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5OQU1FXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVTUE9OU0VdOiB1bmRlZmluZWQgfCBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVFVRVNUX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLlJFU1BPTlNFX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLk1PQ0tfUkVRVUVTVF9IRUFERVJTXTogYW55W11cbiAgW1BST1hZX1JPVVRFX0tFWS5FTkFCTEVfTU9DS19SRVFVRVNUX0hFQURFUlNdOiBib29sZWFuXG4gIFtQUk9YWV9ST1VURV9LRVkuTU9DS19SRVNQT05TRV9IRUFERVJTXTogYW55W11cbiAgW1BST1hZX1JPVVRFX0tFWS5FTkFCTEVfTU9DS19SRVNQT05TRV9IRUFERVJTXTogYm9vbGVhblxufVxuXG5leHBvcnQgZW51bSBNT0NLX1RZUEUge1xuICBOT1JNQUwgPSAnbm9ybWFsJyxcbiAgUkVESVJFQ1QgPSAncmVkaXJlY3QnLFxuICBNT0RJRllfSEVBREVSUyA9ICdtb2RpZnlIZWFkZXJzJ1xufVxuZXhwb3J0IGNvbnN0IE1PQ0tfVFlQRV9ESUNUID0ge1xuICBbTU9DS19UWVBFLk5PUk1BTF06ICdNb2NrJyxcbiAgW01PQ0tfVFlQRS5SRURJUkVDVF06ICdSZWRpcmVjdCcsXG4gIFtNT0NLX1RZUEUuTU9ESUZZX0hFQURFUlNdOiAnTW9kaWZ5SGVhZGVycydcbn1cbmV4cG9ydCBjb25zdCBNT0NLX1RZUEVfRElDVF9TSEFET1cgPSB7XG4gIFtNT0NLX1RZUEUuTk9STUFMXTpcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICcycHggMnB4IDY4cHggMHB4IHJnYmEoMTQ1LCAxOTIsIDI1NSwgMC41KSwgaW5zZXQgLThweCAtOHB4IDE2cHggMHB4IHJnYmEoMTQ1LCAxOTIsIDI1NSwgMC42KSwgaW5zZXQgMHB4IDExcHggMjhweCAwcHggcmdiKDI1NSwgMjU1LCAyNTUpJyxcbiAgW01PQ0tfVFlQRS5SRURJUkVDVF06XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAnMnB4IDJweCA2OHB4IDBweCByZ2JhKDE4OSwgMTYsIDIyNCwgMC41KSwgaW5zZXQgLTlweCAtOXB4IDE2cHggMHB4IHJnYmEoMTg5LCAxNiwgMjI0LCAwLjYpLCBpbnNldCAwcHggMTFweCAyOHB4IDBweCByZ2IoMjU1LCAyNTUsIDI1NSknLFxuICBbTU9DS19UWVBFLk1PRElGWV9IRUFERVJTXTpcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICcycHggMnB4IDY4cHggMHB4IHJnYmEoMTg0LCAyMzMsIDEzNCwgMC41KSwgaW5zZXQgLThweCAtOHB4IDE2cHggMHB4IHJnYmEoMTg0LCAyMzMsIDEzNCwgMC42KSwgaW5zZXQgMHB4IDExcHggMjhweCAwcHggcmdiKDI1NSwgMjU1LCAyNTUpJ1xufVxuZXhwb3J0IGNvbnN0IE1PQ0tfVFlQRV9PUFRJT05TID0gY29udmVydERpY3RUb0FycmF5KE1PQ0tfVFlQRV9ESUNUKVxuXG5leHBvcnQgZW51bSBNQVRDSF9UWVBFIHtcbiAgQ09OVEFJTlMgPSAnY29udGFpbnMnLFxuICBFUVVBTFMgPSAnZXF1YWxzJyxcbiAgUkVHRVhQID0gJ3JlZ2V4cCdcbn1cbmV4cG9ydCBjb25zdCBNQVRDSF9UWVBFX0RJQ1QgPSB7XG4gIFtNQVRDSF9UWVBFLkNPTlRBSU5TXTogJ2NvbnRhaW5zJyxcbiAgW01BVENIX1RZUEUuRVFVQUxTXTogJ2VxdWFscycsXG4gIFtNQVRDSF9UWVBFLlJFR0VYUF06ICdyZWdleHAnXG59XG5cbmV4cG9ydCBlbnVtIFJlc291cmNlVHlwZSB7XG4gIE1BSU5fRlJBTUUgPSAnbWFpbl9mcmFtZScsXG4gIFNVQl9GUkFNRSA9ICdzdWJfZnJhbWUnLFxuICBTVFlMRVNIRUVUID0gJ3N0eWxlc2hlZXQnLFxuICBTQ1JJUFQgPSAnc2NyaXB0JyxcbiAgSU1BR0UgPSAnaW1hZ2UnLFxuICBGT05UID0gJ2ZvbnQnLFxuICBPQkpFQ1QgPSAnb2JqZWN0JyxcbiAgWE1MSFRUUFJFUVVFU1QgPSAneG1saHR0cHJlcXVlc3QnLFxuICBQSU5HID0gJ3BpbmcnLFxuICBDU1BfUkVQT1JUID0gJ2NzcF9yZXBvcnQnLFxuICBNRURJQSA9ICdtZWRpYScsXG4gIFdFQlNPQ0tFVCA9ICd3ZWJzb2NrZXQnLFxuICBPVEhFUiA9ICdvdGhlcicsXG4gIFdFQkJVTkRMRSA9ICd3ZWJidW5kbGUnLFxuICBXRUJUUkFOU1BPUlQgPSAnd2VidHJhbnNwb3J0J1xufVxuXG5leHBvcnQgZW51bSBSdWxlQWN0aW9uVHlwZSB7XG4gIEJMT0NLID0gJ2Jsb2NrJyxcbiAgUkVESVJFQ1QgPSAncmVkaXJlY3QnLFxuICBBTExPVyA9ICdhbGxvdycsXG4gIFVQR1JBREVfU0NIRU1FID0gJ3VwZ3JhZGVTY2hlbWUnLFxuICBNT0RJRllfSEVBREVSUyA9ICdtb2RpZnlIZWFkZXJzJyxcbiAgQUxMT1dfQUxMX1JFUVVFU1RTID0gJ2FsbG93QWxsUmVxdWVzdHMnXG59XG5cbmV4cG9ydCBjb25zdCBNQVRDSF9UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoTUFUQ0hfVFlQRV9ESUNUKVxuXG5leHBvcnQgY29uc3QgSFRUUF9TVEFUVVNfQ09ERV9PUFRJT05TID0gT2JqZWN0LmtleXMoSFRUUF9TVEFUVVNfQ09ERV9ESUNUKS5tYXAoKHYpID0+ICh7XG4gIHZhbHVlOiArdixcbiAgbGFiZWw6IGAke3Z9ICR7SFRUUF9TVEFUVVNfQ09ERV9ESUNUW3ZdfWBcbn0pKVxuXG5leHBvcnQgZW51bSBHTE9CQUxfVkFSSUFCTEUge1xuICBDSFJPTUVfUExVU19PUklHSU5BTF9YSFIgPSAnQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSJyxcbiAgQ0hST01FX1BMVVNfUkVRVUVTVF9NQVAgPSAnQ0hST01FX1BMVVNfUkVRVUVTVF9NQVAnLFxuICBDSFJPTUVfUExVU19QUk9YWV9YSFIgPSAnQ0hST01FX1BMVVNfUFJPWFlfWEhSJyxcbiAgQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTID0gJ0NIUk9NRV9QTFVTX1BST1hZX1JPVVRFUydcbn1cbmV4cG9ydCBjb25zdCBHTE9CQUxfVkFSSUFCTEVfTUFQID0ge1xuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX09SSUdJTkFMX1hIUl06ICdDSFJPTUVfUExVU19PUklHSU5BTF9YSFInLFxuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1JFUVVFU1RfTUFQXTogJ0NIUk9NRV9QTFVTX1JFUVVFU1RfTUFQJyxcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9YSFJdOiAnQ0hST01FX1BMVVNfUFJPWFlfWEhSJyxcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdOiAnQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTJ1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRVFVRVNUX0hFQURFUlNfS0VZUyA9IFtcbiAgJ0FjY2VwdCcsIC8vIEFjY2VwdGFibGUgcmVzcG9uc2UgQ29udGVudC1UeXBlc1xuICAnQWNjZXB0LUNoYXJzZXQnLCAvLyBBY2NlcHRhYmxlIGNoYXJhY3RlciBzZXRzXG4gICdBY2NlcHQtRW5jb2RpbmcnLCAvLyBBY2NlcHRhYmxlIHJlc3BvbnNlIGNvbnRlbnQgZW5jb2RpbmdcbiAgJ0FjY2VwdC1MYW5ndWFnZScsIC8vIEFjY2VwdGFibGUgcmVzcG9uc2UgY29udGVudCBsYW5ndWFnZXNcbiAgJ0FjY2VwdC1EYXRldGltZScsIC8vIEFjY2VwdGFibGUgdmVyc2lvbiBvZiB0aGUgY29udGVudCBiYXNlZCBvbiBkYXRldGltZVxuICAnQXV0aG9yaXphdGlvbicsIC8vIEF1dGhvcml6YXRpb24gaW5mb3JtYXRpb24gZm9yIGF1dGhlbnRpY2F0ZWQgcmVzb3VyY2VzXG4gICdDYWNoZS1Db250cm9sJywgLy8gQ2FjaGUgY29udHJvbCBkaXJlY3RpdmVzXG4gICdDb25uZWN0aW9uJywgLy8gUHJlZmVycmVkIHR5cGUgb2YgY29ubmVjdGlvblxuICAnQ29va2llJywgLy8gSFRUUCBDb29raWUgZnJvbSBzZXJ2ZXIncyBTZXQtQ29va2llXG4gICdDb250ZW50LUxlbmd0aCcsIC8vIExlbmd0aCBvZiB0aGUgcmVxdWVzdCBib2R5IGluIG9jdGFsXG4gICdDb250ZW50LU1ENScsIC8vIE1ENSBoYXNoIG9mIHJlcXVlc3QgYm9keSBjb250ZW50LCBCYXNlNjQgZW5jb2RlZFxuICAnQ29udGVudC1UeXBlJywgLy8gTUlNRSB0eXBlIG9mIHRoZSByZXF1ZXN0IGJvZHlcbiAgJ0RhdGUnLCAvLyBEYXRlIGFuZCB0aW1lIHRoZSBtZXNzYWdlIHdhcyBzZW50XG4gICdFeHBlY3QnLCAvLyBFeHBlY3RlZCBzZXJ2ZXIgYmVoYXZpb3JcbiAgJ0Zyb20nLCAvLyBFbWFpbCBhZGRyZXNzIG9mIHRoZSByZXF1ZXN0J3MgdXNlclxuICAnSG9zdCcsIC8vIFNlcnZlciBkb21haW4gbmFtZSBhbmQgcG9ydCBudW1iZXJcbiAgJ0lmLU1hdGNoJywgLy8gT25seSBwZXJmb3JtIHRoZSBhY3Rpb24gaWYgdGhlIGNsaWVudCdzIGVudGl0eSBtYXRjaGVzIHRoZSBzZXJ2ZXIncyBlbnRpdHlcbiAgJ0lmLU1vZGlmaWVkLVNpbmNlJywgLy8gQWxsb3dzIGEgMzA0IE5vdCBNb2RpZmllZCB0byBiZSByZXR1cm5lZCBpZiBjb250ZW50IGlzIHVuY2hhbmdlZFxuICAnSWYtTm9uZS1NYXRjaCcsIC8vIEFsbG93cyBhIDMwNCBOb3QgTW9kaWZpZWQgdG8gYmUgcmV0dXJuZWQgaWYgY29udGVudCBpcyB1bmNoYW5nZWRcbiAgJ0lmLVJhbmdlJywgLy8gU2VuZCB0aGUgcGFydHMgdGhhdCBhcmUgbWlzc2luZyBpZiB0aGUgZW50aXR5IGlzIHVuY2hhbmdlZCwgb3RoZXJ3aXNlIHNlbmQgdGhlIGVudGlyZSBuZXcgZW50aXR5XG4gICdJZi1Vbm1vZGlmaWVkLVNpbmNlJywgLy8gT25seSBzZW5kIHRoZSByZXNwb25zZSBpZiB0aGUgZW50aXR5IGhhcyBub3QgYmVlbiBtb2RpZmllZCBzaW5jZSBhIHNwZWNpZmljIHRpbWVcbiAgJ01heC1Gb3J3YXJkcycsIC8vIExpbWl0cyB0aGUgbnVtYmVyIG9mIHRpbWVzIGEgbWVzc2FnZSBjYW4gYmUgZm9yd2FyZGVkIHRocm91Z2ggcHJveGllcyBvciBnYXRld2F5c1xuICAnT3JpZ2luJywgLy8gSW5pdGlhdGVzIGEgcmVxdWVzdCBmb3IgY3Jvc3Mtb3JpZ2luIHJlc291cmNlIHNoYXJpbmcgKENPUlMpXG4gICdQcmFnbWEnLCAvLyBJbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBoZWFkZXJzIHRoYXQgbWF5IGhhdmUgdmFyaW91cyBlZmZlY3RzIGFueXdoZXJlIGFsb25nIHRoZSByZXF1ZXN0LXJlc3BvbnNlIGNoYWluXG4gICdQcm94eS1BdXRob3JpemF0aW9uJywgLy8gQXV0aG9yaXphdGlvbiBjcmVkZW50aWFscyBmb3IgY29ubmVjdGluZyB0byBhIHByb3h5XG4gICdSYW5nZScsIC8vIFJlcXVlc3QgYSBwb3J0aW9uIG9mIGFuIGVudGl0eSwgYnl0ZSBvZmZzZXRzIHN0YXJ0IGF0IHplcm9cbiAgJ1JlZmVyZXInLCAvLyBBZGRyZXNzIG9mIHRoZSBwcmV2aW91cyB3ZWIgcGFnZSBmcm9tIHdoaWNoIGEgbGluayB0byB0aGUgY3VycmVudGx5IHJlcXVlc3RlZCBwYWdlIHdhcyBmb2xsb3dlZFxuICAnVEUnLCAvLyBBY2NlcHRhYmxlIGVuY29kaW5ncyBmb3IgdHJhbnNmZXJcbiAgJ1VzZXItQWdlbnQnLCAvLyBCcm93c2VyIGlkZW50aWZpY2F0aW9uIHN0cmluZ1xuICAnVXBncmFkZScsIC8vIEFzayB0aGUgc2VydmVyIHRvIHVwZ3JhZGUgdG8gYW5vdGhlciBwcm90b2NvbFxuICAnVmlhJywgLy8gSW5mb3JtcyB0aGUgc2VydmVyIG9mIHByb3hpZXMgdGhyb3VnaCB3aGljaCB0aGUgcmVxdWVzdCB3YXMgc2VudFxuICAnV2FybmluZycgLy8gR2VuZXJhbCB3YXJuaW5nIGFib3V0IHBvc3NpYmxlIGVycm9ycyBpbiB0aGUgZW50aXR5IGJvZHlcbl1cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFU1BPTlNFX0hFQURFUlNfS0VZUyA9IFtcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsIC8vIOaMh+ekuuWTquS6m+e9keermeWPr+S7peWPguS4jui3qOa6kOiuv+mXruOAguWug+eahOWAvOWPr+S7peaYr+S4gOS4quWFt+S9k+eahFVSSe+8jOaIluiAhSrooajnpLrlhYHorrjku7vkvZXln5/nmoTorr/pl67jgIJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAvLyDmjIflrprlhYHorrjot6jmupDor7fmsYLnmoRIVFRQ5pa55rOV77yM5aaCR0VULCBQT1NULCBQVVTnrYnjgIJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLCAvLyDlnKjpooTmo4Dor7fmsYLkuK3kvb/nlKjvvIzmjIflrprlhYHorrjnmoToh6rlrprkuYnor7fmsYLlpLTjgIJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJywgLy8g6KGo56S65piv5ZCm5YWB6K645Y+R6YCBQ29va2ll44CC5Y+q5pyJ5b2T5YC85Li6dHJ1ZeaXtu+8jOa1j+iniOWZqOaJjeS8muWPkemAgUNvb2tpZeOAglxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAnQWNjZXNzLUNvbnRyb2wtRXhwb3NlLUhlYWRlcnMnLCAvLyDlhYHorrjmtY/op4jlmajorr/pl67nmoTmnI3liqHnq6/lk43lupTlpLTliJfooajvvIzpmaTkuoblha3kuKrln7rmnKznmoTlk43lupTlpLTvvIhDYWNoZS1Db250cm9sLCBDb250ZW50LUxhbmd1YWdlLCBDb250ZW50LVR5cGUsIEV4cGlyZXMsIExhc3QtTW9kaWZpZWQsIOWSjCBQcmFnbWHvvInkuYvlpJbjgIJcbiAgJ0FjY2Vzcy1Db250cm9sLU1heC1BZ2UnLCAvLyAg6KGo56S66aKE5qOA6K+35rGC55qE57uT5p6c6IO95aSf6KKr57yT5a2Y5aSa6ZW/5pe26Ze077yI5Lul56eS5Li65Y2V5L2N77yJ44CCXG4gICdBY2NlcHQtUGF0Y2gnLCAvLyBTcGVjaWZpZXMgdGhlIHBhdGNoIGRvY3VtZW50IGZvcm1hdHMgYWNjZXB0ZWQgYnkgdGhlIHNlcnZlclxuICAnQWNjZXB0LVJhbmdlcycsIC8vIFNwZWNpZmllcyB0aGUgcmFuZ2Ugb2YgYnl0ZXMgdGhhdCB0aGUgc2VydmVyIGNhbiBoYW5kbGVcbiAgJ0FnZScsIC8vIFRoZSB0aW1lLCBpbiBzZWNvbmRzLCB0aGF0IHRoZSBvYmplY3QgaGFzIGJlZW4gaW4gYSBwcm94eSBjYWNoZVxuICAnQWxsb3cnLCAvLyBWYWxpZCBhY3Rpb25zIGZvciBhIHNwZWNpZmljIHJlc291cmNlXG4gICdDYWNoZS1Db250cm9sJywgLy8gRGlyZWN0aXZlcyBmb3IgY2FjaGluZyBtZWNoYW5pc21zIGluIGJvdGggcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAnQ29ubmVjdGlvbicsIC8vIE9wdGlvbnMgZGVzaXJlZCBmb3IgdGhlIGNvbm5lY3Rpb25cbiAgJ0NvbnRlbnQtRGlzcG9zaXRpb24nLCAvLyBEaXJlY3RzIHRoZSBicm93c2VyIHRvIGRpc3BsYXkgdGhlIGZpbGUgYXMgYW4gYXR0YWNobWVudCBmb3IgZG93bmxvYWRcbiAgJ0NvbnRlbnQtRW5jb2RpbmcnLCAvLyBUaGUgdHlwZSBvZiBlbmNvZGluZyB1c2VkIG9uIHRoZSBkYXRhXG4gICdDb250ZW50LUxhbmd1YWdlJywgLy8gVGhlIGxhbmd1YWdlIHRoZSBjb250ZW50IGlzIGluXG4gICdDb250ZW50LUxlbmd0aCcsIC8vIFRoZSBsZW5ndGggb2YgdGhlIHJlc3BvbnNlIGJvZHkgaW4gb2N0ZXRzICg4LWJpdCBieXRlcylcbiAgJ0NvbnRlbnQtTG9jYXRpb24nLCAvLyBBbiBhbHRlcm5hdGUgbG9jYXRpb24gZm9yIHRoZSByZXR1cm5lZCBkYXRhXG4gICdDb250ZW50LU1ENScsIC8vIEEgQmFzZTY0LWVuY29kZWQgYmluYXJ5IE1ENSBzdW0gb2YgdGhlIGNvbnRlbnQgb2YgdGhlIHJlc3BvbnNlIChkZXByZWNhdGVkKVxuICAnQ29udGVudC1SYW5nZScsIC8vIFdoZXJlIGluIHRoZSBmdWxsIGNvbnRlbnQgdGhpcyBwYXJ0aWFsIG1lc3NhZ2UgYmVsb25nc1xuICAnQ29udGVudC1UeXBlJywgLy8gVGhlIE1JTUUgdHlwZSBvZiB0aGlzIGNvbnRlbnRcbiAgJ0RhdGUnLCAvLyBUaGUgZGF0ZSBhbmQgdGltZSBhdCB3aGljaCB0aGUgbWVzc2FnZSB3YXMgc2VudFxuICAnRVRhZycsIC8vIEFuIGlkZW50aWZpZXIgZm9yIGEgc3BlY2lmaWMgdmVyc2lvbiBvZiBhIHJlc291cmNlXG4gICdFeHBpcmVzJywgLy8gVGhlIGRhdGUvdGltZSBhZnRlciB3aGljaCB0aGUgcmVzcG9uc2UgaXMgY29uc2lkZXJlZCBzdGFsZVxuICAnTGFzdC1Nb2RpZmllZCcsIC8vIFRoZSBsYXN0IG1vZGlmaWNhdGlvbiBkYXRlIG9mIHRoZSByZXNvdXJjZSB0aGF0IHdhcyByZXF1ZXN0ZWRcbiAgJ0xpbmsnLCAvLyBVc2VkIHRvIGV4cHJlc3MgYSB0eXBlZCByZWxhdGlvbnNoaXAgd2l0aCBhbm90aGVyIHJlc291cmNlXG4gICdMb2NhdGlvbicsIC8vIFVzZWQgaW4gcmVkaXJlY3Rpb24sIG9yIHdoZW4gYSBuZXcgcmVzb3VyY2UgaGFzIGJlZW4gY3JlYXRlZFxuICAnUDNQJywgLy8gUDNQIHBvbGljeVxuICAnUHJhZ21hJywgLy8gSW1wbGVtZW50YXRpb24tc3BlY2lmaWMgaGVhZGVycyB0aGF0IG1heSBoYXZlIHZhcmlvdXMgZWZmZWN0c1xuICAnUHJveHktQXV0aGVudGljYXRlJywgLy8gUmVxdWVzdCBmb3IgYXV0aGVudGljYXRpb24gdG8gYWNjZXNzIHRoZSBwcm94eVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAnUHVibGljLUtleS1QaW5zJywgLy8gSFRUUCBQdWJsaWMgS2V5IFBpbm5pbmcsIHVzZWQgdG8gY29udmV5IGEgY29tbWl0bWVudCB0byBhIGNyeXB0b2dyYXBoaWMgaWRlbnRpdHkgZm9yIGEgY2VydGFpbiBwZXJpb2Qgb2YgdGltZVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAnUmVmcmVzaCcsIC8vIFVzZWQgZm9yIHJlZGlyZWN0aW9uIG9yIHdoZW4gYSBuZXcgcmVzb3VyY2UgaGFzIGJlZW4gY3JlYXRlZCBhbmQgc2hvdWxkIGJlIHJldHJpZXZlZCBhZnRlciBhIGNlcnRhaW4gdGltZSBpbnRlcnZhbFxuICAnUmV0cnktQWZ0ZXInLCAvLyBJbmRpY2F0ZXMgaG93IGxvbmcgdGhlIHVzZXIgYWdlbnQgc2hvdWxkIHdhaXQgYmVmb3JlIG1ha2luZyBhIGZvbGxvdy11cCByZXF1ZXN0XG4gICdTZXJ2ZXInLCAvLyBBIG5hbWUgZm9yIHRoZSBzZXJ2ZXJcbiAgJ1NldC1Db29raWUnLCAvLyBBbiBIVFRQIGNvb2tpZVxuICAnU3RhdHVzJywgLy8gQ0dJIGhlYWRlciBmaWVsZCB1c2VkIHRvIGRlZmluZSB0aGUgc3RhdHVzIG9mIGEgSFRUUCByZXNwb25zZVxuICAnVHJhaWxlcicsIC8vIFRoZSBoZWFkZXIgZmllbGRzIHByZXNlbnQgaW4gdGhlIHRyYWlsZXIgb2YgYSBtZXNzYWdlIGVuY29kZWQgd2l0aCBjaHVua2VkIHRyYW5zZmVyLWNvZGluZ1xuICAnVHJhbnNmZXItRW5jb2RpbmcnLCAvLyBUaGUgZm9ybSBvZiBlbmNvZGluZyB1c2VkIHRvIHNhZmVseSB0cmFuc2ZlciB0aGUgZW50aXR5IHRvIHRoZSB1c2VyXG4gICdVcGdyYWRlJywgLy8gQXNrIHRoZSBjbGllbnQgdG8gc3dpdGNoIHRvIGEgZGlmZmVyZW50IHByb3RvY29sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdWYXJ5JywgLy8gVGVsbHMgZG93bnN0cmVhbSBwcm94aWVzIGhvdyB0byBtYXRjaCBmdXR1cmUgcmVxdWVzdCBoZWFkZXJzIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSBjYWNoZWQgcmVzcG9uc2UgY2FuIGJlIHVzZWQgcmF0aGVyIHRoYW4gcmVxdWVzdGluZyBhIGZyZXNoIG9uZSBmcm9tIHRoZSBvcmlnaW4gc2VydmVyXG4gICdWaWEnLCAvLyBJbmZvcm1zIHRoZSBjbGllbnQgb2YgcHJveGllcyB0aHJvdWdoIHdoaWNoIHRoZSByZXNwb25zZSB3YXMgc2VudFxuICAnV2FybmluZycsIC8vIEEgZ2VuZXJhbCB3YXJuaW5nIGFib3V0IHBvc3NpYmxlIHByb2JsZW1zIHdpdGggdGhlIGVudGl0eSBib2R5XG4gICdXV1ctQXV0aGVudGljYXRlJyAvLyBJbmRpY2F0ZXMgdGhlIGF1dGhlbnRpY2F0aW9uIHNjaGVtZSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGFjY2VzcyB0aGUgcmVxdWVzdGVkIGVudGl0eVxuXVxuZXhwb3J0IGRlZmF1bHQge1xuICBQUk9YWV9ST1VURV9LRVksXG4gIE1PQ0tfVFlQRSxcbiAgTU9DS19UWVBFX0RJQ1QsXG4gIE1PQ0tfVFlQRV9PUFRJT05TLFxuICBNQVRDSF9UWVBFLFxuICBIVFRQX1NUQVRVU19DT0RFLFxuICBNRVNTQUdFX1RZUEVTLFxuICBHTE9CQUxfVkFSSUFCTEVfTUFQXG59XG4iLCJleHBvcnQgY29uc3QgbG9nID0gKGRhdGEpID0+IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cuZXZhbChgY29uc29sZS5sb2coJyR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9JylgKVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydERpY3RUb0FycmF5KFxuICBkaWN0OiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG4gIH0sXG4gIGNvbmZpZzogc3RyaW5nW10gPSBbJ3ZhbHVlJywgJ2xhYmVsJ11cbik6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1bXSB7XG4gIGNvbnN0IFtrZXlOYW1lID0gJ3ZhbHVlJywgdmFsdWVOYW1lID0gJ2xhYmVsJ10gPSBjb25maWdcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGRpY3QpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiAoe1xuICAgIFtrZXlOYW1lXToga2V5LFxuICAgIFt2YWx1ZU5hbWVdOiB2YWx1ZVxuICB9KSlcbn1cbmV4cG9ydCBmdW5jdGlvbiBqb2ludFVybCh1cmwpIHtcbiAgdHJ5IHtcbiAgICAvLyDlsJ3or5XliJvlu7rkuIDkuKpVUkzlr7nosaFcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybClcblxuICAgIC8vIOajgOafpeWNj+iuruaYr+WQpuS4umh0dHDmiJZodHRwc1xuICAgIGlmIChwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwOicgfHwgcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6Jykge1xuICAgICAgcmV0dXJuIHVybCAvLyDov5Tlm57ljp9VUkzvvIzlm6DkuLrlroPmmK/kuIDkuKrmnInmlYjnmoRIVFRQKFMp5Zyw5Z2AXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwcm90b2NvbCcpIC8vIOaKm+WHuumUmeivr++8jOWkhOeQhumdnkhUVFAoUynljY/orq5cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8g5aaC5p6cVVJM5p6E6YCg5aSx6LSl5oiW5Y2P6K6u5LiN5q2j56Gu77yM5YiZ6L+U5Zue5L+u5q2j5ZCO55qEVVJMXG4gICAgcmV0dXJuIGxvY2F0aW9uLm9yaWdpbiArIHVybFxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gbW92ZVRvVG9wKGFyciwgaW5kZXgpIHtcbiAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBhcnIubGVuZ3RoKSB7XG4gICAgLy8g5LuO5oyH5a6a57Si5byV5L2N572u56e76Zmk5YWD57SgXG4gICAgY29uc3QgW2l0ZW1dID0gYXJyLnNwbGljZShpbmRleCwgMSlcbiAgICAvLyDlsIbor6XlhYPntKDmj5LlhaXliLDmlbDnu4TnmoTlvIDlpLRcbiAgICBhcnIudW5zaGlmdChpdGVtKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNyeXB0RGVjcnlwdChpbnB1dDogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAvLyDlsIbovpPlhaXlrZfnrKbkuLLovazmjaLkuLrlrZfnrKbnoIHmlbDnu4RcbiAgY29uc3QgaW5wdXRDaGFycyA9IEFycmF5LmZyb20oaW5wdXQpLm1hcCgoY2hhcikgPT4gY2hhci5jaGFyQ29kZUF0KDApKVxuXG4gIC8vIOeUn+aIkOWvhumSpeeahOWtl+espueggeaVsOe7hFxuICBjb25zdCBrZXlDaGFycyA9IEFycmF5LmZyb20oa2V5KS5tYXAoKGNoYXIpID0+IGNoYXIuY2hhckNvZGVBdCgwKSlcblxuICAvLyDmiafooYzlvILmiJbliqDlr4bmiJbop6Plr4ZcbiAgY29uc3Qgb3V0cHV0ID0gaW5wdXRDaGFycy5tYXAoKGNoYXIsIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhciBeIGtleUNoYXJzW2luZGV4ICUga2V5Q2hhcnMubGVuZ3RoXSlcbiAgfSlcblxuICAvLyDlsIblrZfnrKbmlbDnu4TovazmjaLlm57lrZfnrKbkuLJcbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG4vLyB0eXBlIEpTT05WYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBKU09OT2JqZWN0IHwgSlNPTkFycmF5XG4vLyBpbnRlcmZhY2UgSlNPTk9iamVjdCB7XG4vLyAgIFtrZXk6IHN0cmluZ106IEpTT05WYWx1ZVxuLy8gfVxuLy8gaW50ZXJmYWNlIEpTT05BcnJheSBleHRlbmRzIEFycmF5PEpTT05WYWx1ZT4ge31cblxuLy8gZnVuY3Rpb24ganNvblRvVHlwZVNjcmlwdFR5cGUoanNvbjogSlNPTlZhbHVlLCB0eXBlTmFtZTogc3RyaW5nID0gJ1Jvb3QnKTogc3RyaW5nIHtcbi8vICAgaWYgKHR5cGVvZiBqc29uID09PSAnc3RyaW5nJykge1xuLy8gICAgIHJldHVybiAnc3RyaW5nJ1xuLy8gICB9IGVsc2UgaWYgKHR5cGVvZiBqc29uID09PSAnbnVtYmVyJykge1xuLy8gICAgIHJldHVybiAnbnVtYmVyJ1xuLy8gICB9IGVsc2UgaWYgKHR5cGVvZiBqc29uID09PSAnYm9vbGVhbicpIHtcbi8vICAgICByZXR1cm4gJ2Jvb2xlYW4nXG4vLyAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuLy8gICAgIGlmIChqc29uLmxlbmd0aCA9PT0gMCkge1xuLy8gICAgICAgcmV0dXJuICdhbnlbXSdcbi8vICAgICB9XG4vLyAgICAgY29uc3QgYXJyYXlUeXBlID0ganNvblRvVHlwZVNjcmlwdFR5cGUoanNvblswXSlcbi8vICAgICByZXR1cm4gYCR7YXJyYXlUeXBlfVtdYFxuLy8gICB9IGVsc2UgaWYgKHR5cGVvZiBqc29uID09PSAnb2JqZWN0JyAmJiBqc29uICE9PSBudWxsKSB7XG4vLyAgICAgbGV0IHJlc3VsdCA9IGBpbnRlcmZhY2UgJHt0eXBlTmFtZX0ge1xcbmBcbi8vICAgICBmb3IgKGNvbnN0IGtleSBpbiBqc29uKSB7XG4vLyAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSBqc29uVG9UeXBlU2NyaXB0VHlwZShqc29uW2tleV0sIGNhcGl0YWxpemVGaXJzdExldHRlcihrZXkpKVxuLy8gICAgICAgcmVzdWx0ICs9IGAgICR7a2V5fTogJHt2YWx1ZVR5cGV9O1xcbmBcbi8vICAgICB9XG4vLyAgICAgcmVzdWx0ICs9ICd9J1xuLy8gICAgIHJldHVybiByZXN1bHRcbi8vICAgfSBlbHNlIHtcbi8vICAgICByZXR1cm4gJ2FueSdcbi8vICAgfVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuLy8gICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG4vLyB9XG5cbi8vIC8vIOekuuS+i+eUqOazlVxuLy8gY29uc3QganNvbkRhdGEgPSB7XG4vLyAgIG5hbWU6ICdKb2huJyxcbi8vICAgYWdlOiAzMCxcbi8vICAgaXNTdHVkZW50OiBmYWxzZSxcbi8vICAgY291cnNlczogWydNYXRoJywgJ1NjaWVuY2UnXSxcbi8vICAgYWRkcmVzczoge1xuLy8gICAgIHN0cmVldDogJzEyMyBNYWluIFN0Jyxcbi8vICAgICBjaXR5OiAnQW55dG93bidcbi8vICAgfVxuLy8gfVxuXG4vLyBjb25zdCB0eXBlU2NyaXB0VHlwZSA9IGpzb25Ub1R5cGVTY3JpcHRUeXBlKGpzb25EYXRhKVxuLy8gY29uc29sZS5sb2codHlwZVNjcmlwdFR5cGUpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbnZlcnREaWN0VG9BcnJheSxcbiAgbG9nLFxuICBqb2ludFVybCxcbiAgbW92ZVRvVG9wXG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuZXhwb3J0IGVudW0gSFRUUF9TVEFUVVNfQ09ERSB7XG4gIENPTlRJTlVFID0gMTAwLFxuICBTV0lUQ0hJTkdfUFJPVE9DT0xTID0gMTAxLFxuICBQUk9DRVNTSU5HID0gMTAyLFxuXG4gIE9LID0gMjAwLFxuICBDUkVBVEVEID0gMjAxLFxuICBBQ0NFUFRFRCA9IDIwMixcbiAgTk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04gPSAyMDMsXG4gIE5PX0NPTlRFTlQgPSAyMDQsXG4gIFJFU0VUX0NPTlRFTlQgPSAyMDUsXG4gIFBBUlRJQUxfQ09OVEVOVCA9IDIwNixcblxuICBNVUxUSV9TVEFUVVMgPSAyMDcsXG4gIEFMUkVBRFlfUkVQT1JURUQgPSAyMDgsXG5cbiAgSU1fVVNFRCA9IDIyNixcblxuICBNVUxUSVBMRV9DSE9JQ0VTID0gMzAwLFxuICBNT1ZFRF9QRVJNQU5FTlRMWSA9IDMwMSxcbiAgRk9VTkQgPSAzMDIsXG4gIFNFRV9PVEhFUiA9IDMwMyxcbiAgTk9UX01PRElGSUVEID0gMzA0LFxuICBVU0VfUFJPWFkgPSAzMDUsXG4gIFRFTVBPUkFSWV9SRURJUkVDVCA9IDMwNyxcbiAgUEVSTUFORU5UX1JFRElSRUNUID0gMzA4LFxuXG4gIEJBRF9SRVFVRVNUID0gNDAwLFxuICBVTkFVVEhPUklaRUQgPSA0MDEsXG4gIFBBWU1FTlRfUkVRVUlSRUQgPSA0MDIsXG4gIEZPUkJJRERFTiA9IDQwMyxcbiAgTk9UX0ZPVU5EID0gNDA0LFxuICBNRVRIT0RfTk9UX0FMTE9XRUQgPSA0MDUsXG4gIE5PVF9BQ0NFUFRBQkxFID0gNDA2LFxuICBQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRCA9IDQwNyxcbiAgUkVRVUVTVF9USU1FT1VUID0gNDA4LFxuICBDT05GTElDVCA9IDQwOSxcbiAgR09ORSA9IDQxMCxcbiAgTEVOR1RIX1JFUVVJUkVEID0gNDExLFxuICBQUkVDT05ESVRJT05fRkFJTEVEID0gNDEyLFxuICBQQVlMT0FEX1RPT19MQVJHRSA9IDQxMyxcbiAgVVJJX1RPT19MT05HID0gNDE0LFxuICBVTlNVUFBPUlRFRF9NRURJQV9UWVBFID0gNDE1LFxuICBSQU5HRV9OT1RfU0FUSVNGSUFCTEUgPSA0MTYsXG4gIEVYUEVDVEFUSU9OX0ZBSUxFRCA9IDQxNyxcbiAgSV9BTV9BX1RFQVBPVCA9IDQxOCxcbiAgTUlTRElSRUNURURfUkVRVUVTVCA9IDQyMSxcbiAgVU5QUk9DRVNTQUJMRV9FTlRJVFkgPSA0MjIsXG4gIExPQ0tFRCA9IDQyMyxcbiAgRkFJTEVEX0RFUEVOREVOQ1kgPSA0MjQsXG4gIFVQR1JBREVfUkVRVUlSRUQgPSA0MjYsXG4gIFBSRUNPTkRJVElPTl9SRVFVSVJFRCA9IDQyOCxcbiAgVE9PX01BTllfUkVRVUVTVFMgPSA0MjksXG4gIFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UgPSA0MzEsXG4gIFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TID0gNDUxLFxuXG4gIElOVEVSTkFMX1NFUlZFUl9FUlJPUiA9IDUwMCxcbiAgTk9UX0lNUExFTUVOVEVEID0gNTAxLFxuICBCQURfR0FURVdBWSA9IDUwMixcbiAgU0VSVklDRV9VTkFWQUlMQUJMRSA9IDUwMyxcbiAgR0FURVdBWV9USU1FT1VUID0gNTA0LFxuICBIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRCA9IDUwNSxcbiAgVkFSSUFOVF9BTFNPX05FR09USUFURVMgPSA1MDYsXG4gIElOU1VGRklDSUVOVF9TVE9SQUdFID0gNTA3LFxuICBMT09QX0RFVEVDVEVEID0gNTA4LFxuICBOT1RfRVhURU5ERUQgPSA1MTAsXG4gIE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQgPSA1MTFcbn1cbmV4cG9ydCBjb25zdCBIVFRQX1NUQVRVU19DT0RFX0RJQ1QgPSB7XG4gIFtIVFRQX1NUQVRVU19DT0RFLkNPTlRJTlVFXTogXCJDb250aW51ZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TV0lUQ0hJTkdfUFJPVE9DT0xTXTogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBST0NFU1NJTkddOiBcIlByb2Nlc3NpbmdcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5PS106IFwiT0tcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ1JFQVRFRF06IFwiQ3JlYXRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5BQ0NFUFRFRF06IFwiQWNjZXB0ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT05dOiBcIk5vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PX0NPTlRFTlRdOiBcIk5vIENvbnRlbnRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkVTRVRfQ09OVEVOVF06IFwiUmVzZXQgQ29udGVudFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVJUSUFMX0NPTlRFTlRdOiBcIlBhcnRpYWwgQ29udGVudFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1VTFRJX1NUQVRVU106IFwiTXVsdGktU3RhdHVzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkFMUkVBRFlfUkVQT1JURURdOiBcIkFscmVhZHkgUmVwb3J0ZWRcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5NVUxUSVBMRV9DSE9JQ0VTXTogXCJNdWx0aXBsZSBDaG9pY2VzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1PVkVEX1BFUk1BTkVOVExZXTogXCJNb3ZlZCBQZXJtYW5lbnRseVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5GT1VORF06IFwiRm91bmRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuU0VFX09USEVSXTogXCJTZWUgT3RoZXJcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX01PRElGSUVEXTogXCJOb3QgTW9kaWZpZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVVNFX1BST1hZXTogXCJVc2UgUHJveHlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVEVNUE9SQVJZX1JFRElSRUNUXTogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEVSTUFORU5UX1JFRElSRUNUXTogXCJQZXJtYW5lbnQgUmVkaXJlY3RcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5CQURfUkVRVUVTVF06IFwiQmFkIFJlcXVlc3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5BVVRIT1JJWkVEXTogXCJVbmF1dGhvcml6ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEFZTUVOVF9SRVFVSVJFRF06IFwiUGF5bWVudCBSZXF1aXJlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5GT1JCSURERU5dOiBcIkZvcmJpZGRlblwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfRk9VTkRdOiBcIk5vdCBGb3VuZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5NRVRIT0RfTk9UX0FMTE9XRURdOiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfQUNDRVBUQUJMRV06IFwiTm90IEFjY2VwdGFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRURdOiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJFUVVFU1RfVElNRU9VVF06IFwiUmVxdWVzdCBUaW1lb3V0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkNPTkZMSUNUXTogXCJDb25mbGljdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5HT05FXTogXCJHb25lXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkxFTkdUSF9SRVFVSVJFRF06IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBSRUNPTkRJVElPTl9GQUlMRURdOiBcIlByZWNvbmRpdGlvbiBGYWlsZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEFZTE9BRF9UT09fTEFSR0VdOiBcIlBheWxvYWQgVG9vIExhcmdlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVSSV9UT09fTE9OR106IFwiVVJJIFRvbyBMb25nXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVOU1VQUE9SVEVEX01FRElBX1RZUEVdOiBcIlVuc3VwcG9ydGVkIE1lZGlhIFR5cGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkFOR0VfTk9UX1NBVElTRklBQkxFXTogXCJSYW5nZSBOb3QgU2F0aXNmaWFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRVhQRUNUQVRJT05fRkFJTEVEXTogXCJFeHBlY3RhdGlvbiBGYWlsZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSV9BTV9BX1RFQVBPVF06IFwiSSdtIGEgdGVhcG90XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1JU0RJUkVDVEVEX1JFUVVFU1RdOiBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5QUk9DRVNTQUJMRV9FTlRJVFldOiBcIlVucHJvY2Vzc2FibGUgRW50aXR5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkxPQ0tFRF06IFwiTG9ja2VkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZBSUxFRF9ERVBFTkRFTkNZXTogXCJGYWlsZWQgRGVwZW5kZW5jeVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VUEdSQURFX1JFUVVJUkVEXTogXCJVcGdyYWRlIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBSRUNPTkRJVElPTl9SRVFVSVJFRF06IFwiUHJlY29uZGl0aW9uIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlRPT19NQU5ZX1JFUVVFU1RTXTogXCJUb28gTWFueSBSZXF1ZXN0c1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFXTogXCJSZXF1ZXN0IEhlYWRlciBGaWVsZHMgVG9vIExhcmdlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TXTogXCJVbmF2YWlsYWJsZSBGb3IgTGVnYWwgUmVhc29uc1wiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLklOVEVSTkFMX1NFUlZFUl9FUlJPUl06IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9JTVBMRU1FTlRFRF06IFwiTm90IEltcGxlbWVudGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkJBRF9HQVRFV0FZXTogXCJCYWQgR2F0ZXdheVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TRVJWSUNFX1VOQVZBSUxBQkxFXTogXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkdBVEVXQVlfVElNRU9VVF06IFwiR2F0ZXdheSBUaW1lb3V0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEXTogXCJIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5WQVJJQU5UX0FMU09fTkVHT1RJQVRFU106IFwiVmFyaWFudCBBbHNvIE5lZ290aWF0ZXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSU5TVUZGSUNJRU5UX1NUT1JBR0VdOiBcIkluc3VmZmljaWVudCBTdG9yYWdlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkxPT1BfREVURUNURURdOiBcIkxvb3AgRGV0ZWN0ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0VYVEVOREVEXTogXCJOb3QgRXh0ZW5kZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRF06IFwiTmV0d29yayBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiLFxufVxuZXhwb3J0IGRlZmF1bHQge1xuICBIVFRQX1NUQVRVU19DT0RFLFxuICBIVFRQX1NUQVRVU19DT0RFX0RJQ1Rcbn0iLCJpbXBvcnQgdHlwZSB7IFBsYXNtb01lc3NhZ2luZyB9IGZyb20gXCJAcGxhc21vaHEvbWVzc2FnaW5nXCJcclxuXHJcbmltcG9ydCB0eXBlIHsgUFJPWFlfUk9VVEVfSVRFTSB9IGZyb20gXCJ+YXBwL2NvbnN0YW50c1wiXHJcbmltcG9ydCB7IE1BVENIX1RZUEUsIE1PQ0tfVFlQRSwgUFJPWFlfUk9VVEVfS0VZLCBSZXNvdXJjZVR5cGUsIFJ1bGVBY3Rpb25UeXBlIH0gZnJvbSBcIn5hcHAvY29uc3RhbnRzXCJcclxuaW1wb3J0IHN0b3JlLCB7IFNUT1JFX0tFWSB9IGZyb20gXCJ+YXBwL3V0aWxzL3N0b3JlXCJcclxuXHJcbmNvbnN0IGhhbmRsZXI6IFBsYXNtb01lc3NhZ2luZy5NZXNzYWdlSGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIGNvbnN0IHJlc291cmNlVHlwZXMgPSBbXHJcbiAgICBSZXNvdXJjZVR5cGUuTUFJTl9GUkFNRSxcclxuICAgIFJlc291cmNlVHlwZS5YTUxIVFRQUkVRVUVTVCxcclxuICAgIFJlc291cmNlVHlwZS5TQ1JJUFQsXHJcbiAgICBSZXNvdXJjZVR5cGUuU1RZTEVTSEVFVCxcclxuICAgIFJlc291cmNlVHlwZS5TVUJfRlJBTUUsXHJcbiAgICBSZXNvdXJjZVR5cGUuTUVESUEsXHJcbiAgICBSZXNvdXJjZVR5cGUuV0VCU09DS0VULFxyXG4gICAgUmVzb3VyY2VUeXBlLk9USEVSLFxyXG4gICAgUmVzb3VyY2VUeXBlLkNTUF9SRVBPUlQsXHJcbiAgICBSZXNvdXJjZVR5cGUuRk9OVCxcclxuICAgIFJlc291cmNlVHlwZS5JTUFHRSxcclxuICAgIFJlc291cmNlVHlwZS5QSU5HLFxyXG4gICAgUmVzb3VyY2VUeXBlLldFQkJVTkRMRSxcclxuICAgIFJlc291cmNlVHlwZS5XRUJUUkFOU1BPUlQsXHJcbiAgICBSZXNvdXJjZVR5cGUuT0JKRUNULFxyXG4gIF1cclxuXHJcbiAgY29uc3Qgcm91dGVzOiBQUk9YWV9ST1VURV9JVEVNW10gPSAoYXdhaXQgc3RvcmUuZ2V0SXRlbShTVE9SRV9LRVkuUk9VVEVTKSkgPz8gW11cclxuICBjb25zdCBjb25maWc6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0gYXdhaXQgc3RvcmUuZ2V0SXRlbShTVE9SRV9LRVkuR0xPQkFMX1NXSVRDSF9DT05GSUcpIHx8IHt9XHJcbiAgY29uc3QgeyBtb2NrIH0gPSBjb25maWdcclxuICBjb25zdCBydWxlUm91dGVzID1cclxuICAgIHJvdXRlc1xyXG4gICAgICAuZmlsdGVyKFxyXG4gICAgICAgIChyb3V0ZSkgPT5cclxuICAgICAgICAgIHJvdXRlW1BST1hZX1JPVVRFX0tFWS5NT0NLX1RZUEVdID09PSBNT0NLX1RZUEUuUkVESVJFQ1QgfHxcclxuICAgICAgICAgIHJvdXRlW1BST1hZX1JPVVRFX0tFWS5NT0NLX1RZUEVdID09PSBNT0NLX1RZUEUuTU9ESUZZX0hFQURFUlNcclxuICAgICAgKVxyXG4gICAgICAuZmlsdGVyKChyb3V0ZSkgPT4gcm91dGVbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV0gPT09IHRydWUpIHx8IFtdXHJcbiAgY29uc3Qgb2xkUnVsZXMgPSBhd2FpdCBjaHJvbWUuZGVjbGFyYXRpdmVOZXRSZXF1ZXN0LmdldER5bmFtaWNSdWxlcygpXHJcbiAgY29uc3Qgb2xkUnVsZUlkcyA9IG9sZFJ1bGVzLm1hcCgocnVsZSkgPT4gcnVsZS5pZClcclxuXHJcbiAgY29uc3QgbmV3UnVsZXM6IGFueVtdID0gcnVsZVJvdXRlcy5tYXAoKHYsIGkpID0+IHtcclxuICAgIGxldCBjb25kaXRpb24gPSB7fVxyXG4gICAgY29uc3QgaXNSZWRpcmVjdCA9IHZbUFJPWFlfUk9VVEVfS0VZLk1PQ0tfVFlQRV0gPT09IE1PQ0tfVFlQRS5SRURJUkVDVFxyXG4gICAgY29uc3QgaXNNb2RpZnlIZWFkZXJzID0gdltQUk9YWV9ST1VURV9LRVkuTU9DS19UWVBFXSA9PT0gTU9DS19UWVBFLk1PRElGWV9IRUFERVJTXHJcbiAgICBjb25zdCBtYXRjaFR5cGUgPSB2W1BST1hZX1JPVVRFX0tFWS5NQVRDSF9UWVBFXVxyXG4gICAgaWYgKCF2W1BST1hZX1JPVVRFX0tFWS5VUkxdICYmICFtYXRjaFR5cGUpIHsgLy8g5LiN6ZmQVVJMXHJcbiAgICAgIGNvbmRpdGlvbiA9IHtcclxuICAgICAgICB1cmxGaWx0ZXI6ICcqJyxcclxuICAgICAgICByZXNvdXJjZVR5cGVzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuQ09OVEFJTlMpIHtcclxuICAgICAgY29uZGl0aW9uID0ge1xyXG4gICAgICAgIHVybEZpbHRlcjogdltQUk9YWV9ST1VURV9LRVkuVVJMXSxcclxuICAgICAgICByZXNvdXJjZVR5cGVzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuRVFVQUxTKSB7XHJcbiAgICAgIGNvbmRpdGlvbiA9IHtcclxuICAgICAgICByZWdleEZpbHRlcjogYF4ke3ZbUFJPWFlfUk9VVEVfS0VZLlVSTF19JGAucmVwbGFjZSgvXFwuL2csIFwiXFxcXC5cIikudHJpbSgpLFxyXG4gICAgICAgIHJlc291cmNlVHlwZXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG1hdGNoVHlwZSA9PT0gTUFUQ0hfVFlQRS5SRUdFWFApIHtcclxuICAgICAgY29uZGl0aW9uID0ge1xyXG4gICAgICAgIHJlZ2V4RmlsdGVyOiBgLioke3ZbUFJPWFlfUk9VVEVfS0VZLlVSTF19LipgLnJlcGxhY2UoL1xcLi9nLCBcIlxcXFwuXCIpLnRyaW0oKSxcclxuICAgICAgICByZXNvdXJjZVR5cGVzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpc1JlZGlyZWN0KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGkgKyAxLFxyXG4gICAgICAgIHByaW9yaXR5OiAxLFxyXG4gICAgICAgIGFjdGlvbjoge1xyXG4gICAgICAgICAgdHlwZTogUnVsZUFjdGlvblR5cGUuUkVESVJFQ1QsXHJcbiAgICAgICAgICByZWRpcmVjdDogeyB1cmw6IHZbUFJPWFlfUk9VVEVfS0VZLlJFRElSRUNUX1VSTF0gfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9uOiBjb25kaXRpb25cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGlzTW9kaWZ5SGVhZGVycykge1xyXG4gICAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9ICh2Py5bUFJPWFlfUk9VVEVfS0VZLlJFUVVFU1RfSEVBREVSU10gPz8gW10pLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgICAgICBoZWFkZXI6IGl0ZW0ua2V5LFxyXG4gICAgICAgIC4uLihpdGVtLm9wZXJhdGlvblR5cGUgPT09IFwicmVtb3ZlXCIgPyB7fSA6IHsgdmFsdWU6IGl0ZW0udmFsdWUgfSksXHJcbiAgICAgICAgb3BlcmF0aW9uOiBpdGVtLm9wZXJhdGlvblR5cGVcclxuICAgICAgfSkpXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9ICh2Py5bUFJPWFlfUk9VVEVfS0VZLlJFU1BPTlNFX0hFQURFUlNdID8/IFtdKS5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAgICAgaGVhZGVyOiBpdGVtLmtleSxcclxuICAgICAgICAuLi4oaXRlbS5vcGVyYXRpb25UeXBlID09PSBcInJlbW92ZVwiID8ge30gOiB7IHZhbHVlOiBpdGVtLnZhbHVlIH0pLFxyXG4gICAgICAgIG9wZXJhdGlvbjogaXRlbS5vcGVyYXRpb25UeXBlXHJcbiAgICAgIH0pKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBpICsgMSxcclxuICAgICAgICBwcmlvcml0eTogMSxcclxuICAgICAgICBhY3Rpb246IHtcclxuICAgICAgICAgIHR5cGU6IFJ1bGVBY3Rpb25UeXBlLk1PRElGWV9IRUFERVJTLFxyXG4gICAgICAgICAgLi4uKHJlcXVlc3RIZWFkZXJzPy5sZW5ndGggPyB7IHJlcXVlc3RIZWFkZXJzIH0gOiB7fSksXHJcbiAgICAgICAgICAuLi4ocmVzcG9uc2VIZWFkZXJzPy5sZW5ndGggPyB7IHJlc3BvbnNlSGVhZGVycyB9IDoge30pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb246IGNvbmRpdGlvblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBjb25zb2xlLmxvZyhcInJ1bGVzXCIsIFsuLi4obW9jayA/IG5ld1J1bGVzIDogW10pXSlcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaHJvbWUuZGVjbGFyYXRpdmVOZXRSZXF1ZXN0LnVwZGF0ZUR5bmFtaWNSdWxlcyh7XHJcbiAgICByZW1vdmVSdWxlSWRzOiBvbGRSdWxlSWRzLFxyXG4gICAgYWRkUnVsZXM6IFsuLi4obW9jayA/IG5ld1J1bGVzIDogW10pXVxyXG4gIH0pXHJcbiAgcmVzLnNlbmQoe1xyXG4gICAgcmVzdWx0XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlclxyXG4iLCJpbXBvcnQgJy4vbm90aWZpY2F0aW9uJ1xuaW1wb3J0IFwiLi9jdHgtbWVudVwiIiwiaW1wb3J0IGltYWdlIGZyb20gXCJkYXRhLWJhc2U2NDovYXNzZXRzL2ljb24ucG5nXCJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgaWYgKHJlcXVlc3Qubm90aWZpY2F0aW9ucykge1xuICAgIGNvbnN0IGlkID0gYG15LW5vdGlmaWNhdGlvbiR7bmV3IERhdGUoKX1gXG4gICAgY2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKFxuICAgICAgaWQsIC8vIOmAmuefpeeahElE77yM55So5LqO6K+G5Yir6YCa55+lXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiYmFzaWNcIiwgLy8g6YCa55+l57G75Z6LXG4gICAgICAgIGljb25Vcmw6IGltYWdlLCAvLyDpgJrnn6Xlm77moIfnmoRVUkxcbiAgICAgICAgdGl0bGU6IFwiTXkgTm90aWZpY2F0aW9uXCIsIC8vIOmAmuefpeagh+mimFxuICAgICAgICBtZXNzYWdlOiBcIkhlbGxvLCB3b3JsZCFcIiAvLyDpgJrnn6XlhoXlrrlcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTGFzdCBlcnJvcjpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgfVxuICAgIClcbiAgICAvLyDlj5HpgIHmtojmga/lm57lpI3nu5lwb3B1cOmhtemdolxuICAgIHNlbmRSZXNwb25zZSh7IGZhcmV3ZWxsOiBcIkdvb2RieWUgZnJvbSBiYWNrZ3JvdW5kXCIgfSlcbiAgICBjaHJvbWUubm90aWZpY2F0aW9ucy5jbGVhcihpZClcbiAgfVxufSkiLCJtb2R1bGUuZXhwb3J0cyA9IFwiODE1YjQwMDI4ZGVhYmQ5M1wiOyIsImNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgIGlkOiAnb3BlblNpZGVQYW5lbCcsXG4gICAgdGl0bGU6ICfkvqfovrnmoI8nLFxuICAgIGNvbnRleHRzOiBbJ2FsbCddXG4gIH0pO1xufSk7XG5cbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKChpbmZvLCB0YWIpID0+IHtcbiAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gJ29wZW5TaWRlUGFuZWwnKSB7XG4gICAgLy8gVGhpcyB3aWxsIG9wZW4gdGhlIHBhbmVsIGluIGFsbCB0aGUgcGFnZXMgb24gdGhlIGN1cnJlbnQgd2luZG93LlxuICAgIGNocm9tZS5zaWRlUGFuZWwub3Blbih7IHdpbmRvd0lkOiB0YWIud2luZG93SWQgfSk7XG4gIH1cbn0pOyJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJpbmRleC5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);