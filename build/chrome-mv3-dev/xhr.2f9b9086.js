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
})({"38Gkg":[function(require,module,exports) {
var _constants = require("~constants");
var _utils = require("~utils");
(function() {
    const originalFetch = window.fetch;
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalGetAllResponseHeaders = XMLHttpRequest.prototype.getAllResponseHeaders;
    const originalGetResponseHeader = XMLHttpRequest.prototype.getResponseHeader;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    const callback = function(msg) {
        const { data } = msg;
        const { action, payload } = data;
        if (action === (0, _constants.MESSAGE_TYPES).MATCHING_UPDATE && payload?.secret === "content-to-xhr") window[(0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES] = payload.data || [];
    };
    const delayPromise = (ms)=>{
        return new Promise((resolve)=>setTimeout(resolve, ms));
    };
    window.removeEventListener("message", callback);
    window.addEventListener("message", callback);
    const enableMockCheck = (routes, xhr, method, originalUrl)=>{
        let route;
        const enableRoutes = routes.filter(({ enable, mockType })=>enable && mockType === (0, _constants.MOCK_TYPE).NORMAL);
        const enable = routes.length > 0 && enableRoutes.some((item)=>{
            const { url, matchType, requestType } = item;
            const isMethodMatched = method.toLowerCase() === requestType.toLowerCase() || requestType === (0, _constants.REQUEST_TYPE).ALL;
            if (isMethodMatched) {
                if (!url && !matchType) // \u4e0d\u9650URL
                return route = item;
                if (matchType === (0, _constants.MATCH_TYPE).REGEXP) {
                    const REG = new RegExp(url, "g");
                    return REG.test(originalUrl) && (route = item);
                }
                if (matchType === (0, _constants.MATCH_TYPE).CONTAINS) return originalUrl.includes(url) && (route = item);
                if (matchType === (0, _constants.MATCH_TYPE).EQUALS) return originalUrl === url && (route = item);
            }
            return false;
        });
        if (enable) {
            Object.defineProperty(xhr, "mock", {
                writable: true,
                value: true,
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(xhr, "mockConfig", {
                writable: true,
                value: route,
                enumerable: false,
                configurable: true
            });
            // eslint-disable-next-line max-len
            Object.defineProperty(xhr, "responseURL", {
                writable: true,
                value: originalUrl,
                enumerable: false,
                configurable: true
            });
        } else {
            delete xhr.mock;
            delete xhr.mockConfig;
        }
        return enable;
    };
    XMLHttpRequest.prototype.open = function(...args) {
        const [method, url] = args;
        const { responseURL } = this;
        enableMockCheck(window[(0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES] ?? [], this, method, responseURL || (0, _utils.jointUrl)(url));
        originalOpen.apply(this, args);
    };
    XMLHttpRequest.prototype.send = function(...args) {
        const { mock, mockConfig, responseType, responseURL } = this;
        if (mock) {
            window.postMessage({
                action: (0, _constants.MESSAGE_TYPES).SET_LOADING,
                payload: {
                    secret: "xhr-to-content",
                    data: true,
                    route: {
                        ...mockConfig,
                        url: responseURL,
                        time: new Date(),
                        xhrType: "xhr"
                    }
                }
            });
            const { response, responseStatus, delay } = mockConfig;
            Object.defineProperty(this, "readyState", {
                writable: true,
                value: 4
            });
            Object.defineProperty(this, "status", {
                writable: true,
                value: responseStatus ?? 200
            });
            switch(responseType){
                case "json":
                    Object.defineProperty(this, "response", {
                        writable: true,
                        value: JSON.parse(response)
                    });
                    break;
                case "text":
                    Object.defineProperty(this, "responseText", {
                        writable: true,
                        value: response
                    });
                    break;
                default:
                    break;
            }
            setTimeout(()=>{
                this?.onreadystatechange?.();
                this?.onloadend?.();
                this?.onload?.();
                window.postMessage({
                    action: (0, _constants.MESSAGE_TYPES).SET_LOADING,
                    payload: {
                        secret: "xhr-to-content",
                        data: false
                    }
                });
            }, delay);
        } else originalSend.apply(this, args);
    };
    XMLHttpRequest.prototype.setRequestHeader = function(...args) {
        const { mock, mockConfig } = this;
        if (mock) {
            const { enableMockRequestHeaders, mockRequestHeaders } = mockConfig;
            if (enableMockRequestHeaders) {
                const headers = JSON.parse(mockRequestHeaders);
                for(const key in headers)if (Object.prototype.hasOwnProperty.call(headers, key)) {
                    const element = headers[key];
                    originalSetRequestHeader.apply(this, [
                        key,
                        element
                    ]);
                }
            }
        } else return originalSetRequestHeader.apply(this, args);
    };
    XMLHttpRequest.prototype.getAllResponseHeaders = function(...args) {
        const { mock, mockConfig } = this;
        if (mock) {
            const { mockResponseHeaders, enableMockResponseHeaders } = mockConfig;
            return enableMockResponseHeaders ? JSON.parse(mockResponseHeaders) : originalGetAllResponseHeaders.apply(this, args);
        } else return originalGetAllResponseHeaders.apply(this, args);
    };
    XMLHttpRequest.prototype.getResponseHeader = function(...args) {
        const [key] = args;
        const { mock, mockConfig } = this;
        if (mock) {
            const { mockResponseHeaders, enableMockResponseHeaders } = mockConfig;
            return enableMockResponseHeaders ? JSON.parse(mockResponseHeaders)[key] : originalGetResponseHeader.apply(this, args);
        } else return originalGetResponseHeader.apply(this, args);
    };
    window.fetch = async (...args)=>{
        const [url, config = {}] = args;
        const { method, body } = config;
        if (url && method) enableMockCheck(window[(0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES] ?? [], this, method, (0, _utils.jointUrl)(url));
        const { mock, mockConfig, responseURL } = this;
        if (mock) {
            const { response, responseStatus, delay, enableMockRequestHeaders, enableMockResponseHeaders, mockRequestHeaders, mockResponseHeaders } = mockConfig;
            window.postMessage({
                action: (0, _constants.MESSAGE_TYPES).SET_LOADING,
                payload: {
                    secret: "xhr-to-content",
                    data: true,
                    route: {
                        ...mockConfig,
                        url: responseURL,
                        time: new Date(),
                        xhrType: "fetch"
                    }
                }
            });
            await delayPromise(delay);
            const res = new Response(JSON.stringify(response), {
                headers: enableMockResponseHeaders ? JSON.parse(mockResponseHeaders) : {},
                status: responseStatus,
                statusText: ""
            });
            Object.defineProperty(res, "url", {
                writable: true,
                value: (0, _utils.jointUrl)(url)
            });
            window.postMessage({
                action: (0, _constants.MESSAGE_TYPES).SET_LOADING,
                payload: {
                    secret: "xhr-to-content",
                    data: false
                }
            });
            return res;
        } else return await originalFetch(...args);
    };
})();

},{"~constants":"bnIr9","~utils":"2lJc1"}],"bnIr9":[function(require,module,exports) {
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
var _utils = require("~utils");
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

},{"~utils":"2lJc1","./httpStatus":"kojaN","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"2lJc1":[function(require,module,exports) {
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

},{}],"kojaN":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}]},["38Gkg"], "38Gkg", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWdCLEVBQUU7SUFDcEMsQ0FBQyxpQkFBaUIsMkJBQTJCLEVBQUU7SUFDL0MsQ0FBQyxpQkFBaUIsd0JBQXdCLEVBQUU7SUFDNUMsQ0FBQyxpQkFBaUIscUJBQXFCLEVBQUU7SUFDekMsQ0FBQyxpQkFBaUIsY0FBYyxFQUFFO0lBQ2xDLENBQUMsaUJBQWlCLGFBQWEsRUFBRTtJQUNqQyxDQUFDLGlCQUFpQixnQ0FBZ0MsRUFBRTtBQUN0RDtrQkFDZTtJQUNiO0lBQ0E7QUFDRiIsInNvdXJjZXMiOlsiY2hyb21lLWV4dC10b29scy9zcmMvc2NyaXB0cy94aHIudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9jb25zdGFudHMvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy91dGlscy9pbmRleC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2NvbnN0YW50cy9odHRwU3RhdHVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdMT0JBTF9WQVJJQUJMRSwgTUFUQ0hfVFlQRSwgTUVTU0FHRV9UWVBFUywgTU9DS19UWVBFLCBSRVFVRVNUX1RZUEUgfSBmcm9tICd+Y29uc3RhbnRzJ1xuaW1wb3J0IHsgam9pbnRVcmwgfSBmcm9tICd+dXRpbHMnXG5cbjsoZnVuY3Rpb24gKCkge1xuICBjb25zdCBvcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoXG4gIGNvbnN0IG9yaWdpbmFsT3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuXG4gIGNvbnN0IG9yaWdpbmFsU2VuZCA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kXG4gIGNvbnN0IG9yaWdpbmFsR2V0QWxsUmVzcG9uc2VIZWFkZXJzID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVyc1xuICBjb25zdCBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldFJlc3BvbnNlSGVhZGVyXG4gIGNvbnN0IG9yaWdpbmFsU2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyXG4gIGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24gKG1zZykge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnXG4gICAgY29uc3QgeyBhY3Rpb24sIHBheWxvYWQgfSA9IGRhdGFcbiAgICBpZiAoYWN0aW9uID09PSBNRVNTQUdFX1RZUEVTLk1BVENISU5HX1VQREFURSAmJiBwYXlsb2FkPy5zZWNyZXQgPT09ICdjb250ZW50LXRvLXhocicpIHtcbiAgICAgIHdpbmRvd1tHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXSA9IHBheWxvYWQuZGF0YSB8fCBbXVxuICAgIH1cbiAgfVxuICBjb25zdCBkZWxheVByb21pc2UgPSAobXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxuICB9XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgY2FsbGJhY2spXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgY2FsbGJhY2spXG5cbiAgY29uc3QgZW5hYmxlTW9ja0NoZWNrID0gKHJvdXRlcywgeGhyLCBtZXRob2QsIG9yaWdpbmFsVXJsKSA9PiB7XG4gICAgbGV0IHJvdXRlXG4gICAgY29uc3QgZW5hYmxlUm91dGVzID0gcm91dGVzLmZpbHRlcigoeyBlbmFibGUsIG1vY2tUeXBlIH0pID0+IGVuYWJsZSAmJiBtb2NrVHlwZSA9PT0gTU9DS19UWVBFLk5PUk1BTClcbiAgICBjb25zdCBlbmFibGUgPVxuICAgICAgcm91dGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgIGVuYWJsZVJvdXRlcy5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXJsLCBtYXRjaFR5cGUsIHJlcXVlc3RUeXBlIH0gPSBpdGVtXG4gICAgICAgIGNvbnN0IGlzTWV0aG9kTWF0Y2hlZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSByZXF1ZXN0VHlwZS50b0xvd2VyQ2FzZSgpIHx8IHJlcXVlc3RUeXBlID09PSBSRVFVRVNUX1RZUEUuQUxMXG4gICAgICAgIGlmIChpc01ldGhvZE1hdGNoZWQpIHtcbiAgICAgICAgICBpZiAoIXVybCAmJiAhbWF0Y2hUeXBlKSB7XG4gICAgICAgICAgICAvLyDkuI3pmZBVUkxcbiAgICAgICAgICAgIHJldHVybiB0cnVlICYmIChyb3V0ZSA9IGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuUkVHRVhQKSB7XG4gICAgICAgICAgICBjb25zdCBSRUcgPSBuZXcgUmVnRXhwKHVybCwgJ2cnKVxuICAgICAgICAgICAgcmV0dXJuIFJFRy50ZXN0KG9yaWdpbmFsVXJsKSAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2hUeXBlID09PSBNQVRDSF9UWVBFLkNPTlRBSU5TKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxVcmwuaW5jbHVkZXModXJsKSAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2hUeXBlID09PSBNQVRDSF9UWVBFLkVRVUFMUykge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVXJsID09PSB1cmwgJiYgKHJvdXRlID0gaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIGlmIChlbmFibGUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4aHIsICdtb2NrJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4aHIsICdtb2NrQ29uZmlnJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJvdXRlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHhociwgJ3Jlc3BvbnNlVVJMJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IG9yaWdpbmFsVXJsLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB4aHIubW9ja1xuICAgICAgZGVsZXRlIHhoci5tb2NrQ29uZmlnXG4gICAgfVxuICAgIHJldHVybiBlbmFibGVcbiAgfVxuXG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbbWV0aG9kLCB1cmxdID0gYXJnc1xuICAgIGNvbnN0IHsgcmVzcG9uc2VVUkwgfSA9IHRoaXNcbiAgICBlbmFibGVNb2NrQ2hlY2sod2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID8/IFtdLCB0aGlzLCBtZXRob2QsIHJlc3BvbnNlVVJMIHx8IGpvaW50VXJsKHVybCkpXG4gICAgb3JpZ2luYWxPcGVuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gIH1cblxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnLCByZXNwb25zZVR5cGUsIHJlc3BvbnNlVVJMIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogTUVTU0FHRV9UWVBFUy5TRVRfTE9BRElORyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlY3JldDogJ3hoci10by1jb250ZW50JyxcbiAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgIHJvdXRlOiB7IC4uLm1vY2tDb25maWcsIHVybDogcmVzcG9uc2VVUkwsIHRpbWU6IG5ldyBEYXRlKCksIHhoclR5cGU6ICd4aHInIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNvbnN0IHsgcmVzcG9uc2UsIHJlc3BvbnNlU3RhdHVzLCBkZWxheSB9ID0gbW9ja0NvbmZpZ1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyZWFkeVN0YXRlJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IDQgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc3RhdHVzJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJlc3BvbnNlU3RhdHVzID8/IDIwMCB9KVxuICAgICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnanNvbic6IHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jlc3BvbnNlJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IEpTT04ucGFyc2UocmVzcG9uc2UpIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVzcG9uc2VUZXh0JywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJlc3BvbnNlIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXM/Lm9ucmVhZHlzdGF0ZWNoYW5nZT8uKClcbiAgICAgICAgdGhpcz8ub25sb2FkZW5kPy4oKVxuICAgICAgICB0aGlzPy5vbmxvYWQ/LigpXG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgYWN0aW9uOiBNRVNTQUdFX1RZUEVTLlNFVF9MT0FESU5HLFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHNlY3JldDogJ3hoci10by1jb250ZW50JyxcbiAgICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSwgZGVsYXkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdpbmFsU2VuZC5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgZW5hYmxlTW9ja1JlcXVlc3RIZWFkZXJzLCBtb2NrUmVxdWVzdEhlYWRlcnMgfSA9IG1vY2tDb25maWdcbiAgICAgIGlmIChlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IEpTT04ucGFyc2UobW9ja1JlcXVlc3RIZWFkZXJzKVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLCBrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gaGVhZGVyc1trZXldXG4gICAgICAgICAgICBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIuYXBwbHkodGhpcywgW2tleSwgZWxlbWVudF0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIuYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cbiAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVycyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgbW9ja1Jlc3BvbnNlSGVhZGVycywgZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycyB9ID0gbW9ja0NvbmZpZ1xuICAgICAgcmV0dXJuIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnNcbiAgICAgICAgPyBKU09OLnBhcnNlKG1vY2tSZXNwb25zZUhlYWRlcnMpXG4gICAgICAgIDogb3JpZ2luYWxHZXRBbGxSZXNwb25zZUhlYWRlcnMuYXBwbHkodGhpcywgYXJncylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0QWxsUmVzcG9uc2VIZWFkZXJzLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgW2tleV0gPSBhcmdzXG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgbW9ja1Jlc3BvbnNlSGVhZGVycywgZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycyB9ID0gbW9ja0NvbmZpZ1xuICAgICAgcmV0dXJuIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnNcbiAgICAgICAgPyBKU09OLnBhcnNlKG1vY2tSZXNwb25zZUhlYWRlcnMpW2tleV1cbiAgICAgICAgOiBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG5cbiAgd2luZG93LmZldGNoID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBbdXJsLCBjb25maWcgPSB7fV0gPSBhcmdzXG4gICAgY29uc3QgeyBtZXRob2QsIGJvZHkgfSA9IGNvbmZpZ1xuICAgIGlmICh1cmwgJiYgbWV0aG9kKSB7XG4gICAgICBlbmFibGVNb2NrQ2hlY2sod2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID8/IFtdLCB0aGlzLCBtZXRob2QsIGpvaW50VXJsKHVybCkpXG4gICAgfVxuICAgIGNvbnN0IHsgbW9jaywgbW9ja0NvbmZpZywgcmVzcG9uc2VVUkwgfSA9IHRoaXNcbiAgICBpZiAobW9jaykge1xuICAgICAgY29uc3Qge1xuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgcmVzcG9uc2VTdGF0dXMsXG4gICAgICAgIGRlbGF5LFxuICAgICAgICBlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIG1vY2tSZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgbW9ja1Jlc3BvbnNlSGVhZGVyc1xuICAgICAgfSA9IG1vY2tDb25maWdcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogTUVTU0FHRV9UWVBFUy5TRVRfTE9BRElORyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlY3JldDogJ3hoci10by1jb250ZW50JyxcbiAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgIHJvdXRlOiB7IC4uLm1vY2tDb25maWcsIHVybDogcmVzcG9uc2VVUkwsIHRpbWU6IG5ldyBEYXRlKCksIHhoclR5cGU6ICdmZXRjaCcgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgYXdhaXQgZGVsYXlQcm9taXNlKGRlbGF5KVxuICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSwge1xuICAgICAgICBoZWFkZXJzOiBlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzID8gSlNPTi5wYXJzZShtb2NrUmVzcG9uc2VIZWFkZXJzKSA6IHt9LFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlU3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiAnJ1xuICAgICAgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXMsICd1cmwnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogam9pbnRVcmwodXJsKSB9KVxuICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBNRVNTQUdFX1RZUEVTLlNFVF9MT0FESU5HLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2VjcmV0OiAneGhyLXRvLWNvbnRlbnQnLFxuICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gcmVzXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhd2FpdCBvcmlnaW5hbEZldGNoKC4uLmFyZ3MpXG4gICAgfVxuICB9XG59KSgpXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgY29udmVydERpY3RUb0FycmF5IH0gZnJvbSAnfnV0aWxzJ1xuXG5pbXBvcnQgeyBIVFRQX1NUQVRVU19DT0RFLCBIVFRQX1NUQVRVU19DT0RFX0RJQ1QgfSBmcm9tICcuL2h0dHBTdGF0dXMnXG5cbmV4cG9ydCBjb25zdCBNRVNTQUdFX1RZUEVTID0ge1xuICBNQVRDSElOR19VUERBVEU6ICdtYXRjaGluZ1VwZGF0ZScsXG4gIFNFVF9MT0FESU5HOiAnc2V0TG9hZGluZycsXG4gIFNFVF9SRUNPUkQ6ICdzZXRSZWNvcmQnLFxufVxuXG5leHBvcnQgZW51bSBPUEVSQVRFX1RZUEUge1xuICBFRElUID0gJ2VkaXQnLFxuICBERUxFVEUgPSAnZGVsZXRlJyxcbiAgVVBEQVRFX1JFQ09SRCA9ICd1cGRhdGVSZWNvcmQnLFxuICBUT1AgPSAndG9wJyxcbiAgQ0xPTkUgPSAnY2xvbmUnXG59XG5leHBvcnQgZW51bSBSRVFVRVNUX1RZUEUge1xuICBBTEwgPSAnKicsXG4gIEdFVCA9ICdnZXQnLFxuICBQT1NUID0gJ3Bvc3QnLCAvLyDlkJHmnI3liqHlmajmj5DkuqTmlbDmja7jgIJcbiAgUFVUID0gJ3B1dCcsIC8vIOWQkeacjeWKoeWZqOS4iuS8oOabtOaWsOaVsOaNruOAglxuICBERUxFVEUgPSAnZGVsZXRlJywgLy8g6K+35rGC5pyN5Yqh5Zmo5Yig6Zmk5oyH5a6a55qE6LWE5rqQ44CCXG4gIEhFQUQgPSAnaGVhZCcsIC8vIOexu+S8vOS6jiBHRVQg6K+35rGC77yM5L2G5Y+q6L+U5Zue6aaW6YOo77yM5LiN6L+U5Zue5a6e6ZmF5YaF5a6544CCXG4gIE9QVElPTlMgPSAnb3B0aW9ucycsIC8vIOeUqOS6juaPj+i/sOWvueebruagh+i1hOa6kOeahOmAmuS/oemAiemhueOAglxuICBQQVRDSCA9ICdwYXRjaCcsIC8vIOeUqOS6juWvuei1hOa6kOi/m+ihjOWxgOmDqOS/ruaUue+8jOWNs+Wvuei1hOa6kOeahOmDqOWIhuWGheWuuei/m+ihjOabtOaWsOaIluS/ruaUuVxuICBUUkFDRSA9ICd0cmFjZScgLy8g5Zue5pi+5pyN5Yqh5Zmo5pS25Yiw55qE6K+35rGC77yM5Li76KaB55So5LqO5rWL6K+V5oiW6K+K5pat44CCXG59XG5leHBvcnQgY29uc3QgUkVRVUVTVF9UWVBFX0RJQ1QgPSB7XG4gIFtSRVFVRVNUX1RZUEUuQUxMXTogJ+S4jemZkCcsXG4gIFtSRVFVRVNUX1RZUEUuR0VUXTogJ0dFVCcsXG4gIFtSRVFVRVNUX1RZUEUuUE9TVF06ICdQT1NUJyxcbiAgW1JFUVVFU1RfVFlQRS5QVVRdOiAnUFVUJyxcbiAgW1JFUVVFU1RfVFlQRS5ERUxFVEVdOiAnREVMRVRFJyxcbiAgW1JFUVVFU1RfVFlQRS5IRUFEXTogJ0hFQUQnLFxuICBbUkVRVUVTVF9UWVBFLk9QVElPTlNdOiAnT1BUSU9OUycsXG4gIFtSRVFVRVNUX1RZUEUuUEFUQ0hdOiAnUEFUQ0gnLFxuICBbUkVRVUVTVF9UWVBFLlRSQUNFXTogJ1RSQUNFJ1xufVxuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVFlQRV9PUFRJT05TID0gY29udmVydERpY3RUb0FycmF5KFJFUVVFU1RfVFlQRV9ESUNUKVxuXG5leHBvcnQgZW51bSBQUk9YWV9ST1VURV9LRVkge1xuICBJRCA9ICdpZCcsXG4gIE1PQ0tfVFlQRSA9ICdtb2NrVHlwZScsXG4gIEVOQUJMRSA9ICdlbmFibGUnLFxuICBNQVRDSF9UWVBFID0gJ21hdGNoVHlwZScsXG4gIFJFUVVFU1RfVFlQRSA9ICdyZXF1ZXN0VHlwZScsXG4gIFJFU1BPTlNFX1NUQVRVUyA9ICdyZXNwb25zZVN0YXR1cycsXG4gIFJFRElSRUNUX1VSTCA9ICdyZWRpcmVjdFVybCcsXG4gIERFTEFZID0gJ2RlbGF5JyxcbiAgVVJMID0gJ3VybCcsXG4gIEdST1VQID0gJ2dyb3VwJyxcbiAgTkFNRSA9ICduYW1lJyxcbiAgUkVTUE9OU0UgPSAncmVzcG9uc2UnLFxuICBNT0NLX1JFUVVFU1RfSEVBREVSUyA9ICdtb2NrUmVxdWVzdEhlYWRlcnMnLFxuICBFTkFCTEVfTU9DS19SRVFVRVNUX0hFQURFUlMgPSAnZW5hYmxlTW9ja1JlcXVlc3RIZWFkZXJzJyxcbiAgUkVRVUVTVF9IRUFERVJTID0gJ3JlcXVlc3RIZWFkZXJzJyxcbiAgTU9DS19SRVNQT05TRV9IRUFERVJTID0gJ21vY2tSZXNwb25zZUhlYWRlcnMnLFxuICBFTkFCTEVfTU9DS19SRVNQT05TRV9IRUFERVJTID0gJ2VuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnMnLFxuICBSRVNQT05TRV9IRUFERVJTID0gJ3Jlc3BvbnNlSGVhZGVycydcbn1cbmV4cG9ydCB0eXBlIFBST1hZX1JPVVRFX0lURU0gPSB7XG4gIFtQUk9YWV9ST1VURV9LRVkuSURdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1RZUEVdOiBNT0NLX1RZUEVcbiAgW1BST1hZX1JPVVRFX0tFWS5FTkFCTEVdOiBib29sZWFuXG4gIFtQUk9YWV9ST1VURV9LRVkuTUFUQ0hfVFlQRV06IE1BVENIX1RZUEVcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVFVRVNUX1RZUEVdOiBSRVFVRVNUX1RZUEVcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV9TVEFUVVNdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5SRURJUkVDVF9VUkxdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5ERUxBWV06IG51bWJlclxuICBbUFJPWFlfUk9VVEVfS0VZLlVSTF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLkdST1VQXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuTkFNRV06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFU1BPTlNFXTogdW5kZWZpbmVkIHwgc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVRVUVTVF9IRUFERVJTXTogYW55W11cbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV9IRUFERVJTXTogYW55W11cbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1JFUVVFU1RfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuRU5BQkxFX01PQ0tfUkVRVUVTVF9IRUFERVJTXTogYm9vbGVhblxuICBbUFJPWFlfUk9VVEVfS0VZLk1PQ0tfUkVTUE9OU0VfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuRU5BQkxFX01PQ0tfUkVTUE9OU0VfSEVBREVSU106IGJvb2xlYW5cbn1cblxuZXhwb3J0IGVudW0gTU9DS19UWVBFIHtcbiAgTk9STUFMID0gJ25vcm1hbCcsXG4gIFJFRElSRUNUID0gJ3JlZGlyZWN0JyxcbiAgTU9ESUZZX0hFQURFUlMgPSAnbW9kaWZ5SGVhZGVycydcbn1cbmV4cG9ydCBjb25zdCBNT0NLX1RZUEVfRElDVCA9IHtcbiAgW01PQ0tfVFlQRS5OT1JNQUxdOiAnTW9jaycsXG4gIFtNT0NLX1RZUEUuUkVESVJFQ1RdOiAnUmVkaXJlY3QnLFxuICBbTU9DS19UWVBFLk1PRElGWV9IRUFERVJTXTogJ01vZGlmeUhlYWRlcnMnXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX0RJQ1RfU0hBRE9XID0ge1xuICBbTU9DS19UWVBFLk5PUk1BTF06XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAnMnB4IDJweCA2OHB4IDBweCByZ2JhKDE0NSwgMTkyLCAyNTUsIDAuNSksIGluc2V0IC04cHggLThweCAxNnB4IDBweCByZ2JhKDE0NSwgMTkyLCAyNTUsIDAuNiksIGluc2V0IDBweCAxMXB4IDI4cHggMHB4IHJnYigyNTUsIDI1NSwgMjU1KScsXG4gIFtNT0NLX1RZUEUuUkVESVJFQ1RdOlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgJzJweCAycHggNjhweCAwcHggcmdiYSgxODksIDE2LCAyMjQsIDAuNSksIGluc2V0IC05cHggLTlweCAxNnB4IDBweCByZ2JhKDE4OSwgMTYsIDIyNCwgMC42KSwgaW5zZXQgMHB4IDExcHggMjhweCAwcHggcmdiKDI1NSwgMjU1LCAyNTUpJyxcbiAgW01PQ0tfVFlQRS5NT0RJRllfSEVBREVSU106XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAnMnB4IDJweCA2OHB4IDBweCByZ2JhKDE4NCwgMjMzLCAxMzQsIDAuNSksIGluc2V0IC04cHggLThweCAxNnB4IDBweCByZ2JhKDE4NCwgMjMzLCAxMzQsIDAuNiksIGluc2V0IDBweCAxMXB4IDI4cHggMHB4IHJnYigyNTUsIDI1NSwgMjU1KSdcbn1cbmV4cG9ydCBjb25zdCBNT0NLX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShNT0NLX1RZUEVfRElDVClcblxuZXhwb3J0IGVudW0gTUFUQ0hfVFlQRSB7XG4gIENPTlRBSU5TID0gJ2NvbnRhaW5zJyxcbiAgRVFVQUxTID0gJ2VxdWFscycsXG4gIFJFR0VYUCA9ICdyZWdleHAnXG59XG5leHBvcnQgY29uc3QgTUFUQ0hfVFlQRV9ESUNUID0ge1xuICBbTUFUQ0hfVFlQRS5DT05UQUlOU106ICdjb250YWlucycsXG4gIFtNQVRDSF9UWVBFLkVRVUFMU106ICdlcXVhbHMnLFxuICBbTUFUQ0hfVFlQRS5SRUdFWFBdOiAncmVnZXhwJ1xufVxuXG5leHBvcnQgZW51bSBSZXNvdXJjZVR5cGUge1xuICBNQUlOX0ZSQU1FID0gJ21haW5fZnJhbWUnLFxuICBTVUJfRlJBTUUgPSAnc3ViX2ZyYW1lJyxcbiAgU1RZTEVTSEVFVCA9ICdzdHlsZXNoZWV0JyxcbiAgU0NSSVBUID0gJ3NjcmlwdCcsXG4gIElNQUdFID0gJ2ltYWdlJyxcbiAgRk9OVCA9ICdmb250JyxcbiAgT0JKRUNUID0gJ29iamVjdCcsXG4gIFhNTEhUVFBSRVFVRVNUID0gJ3htbGh0dHByZXF1ZXN0JyxcbiAgUElORyA9ICdwaW5nJyxcbiAgQ1NQX1JFUE9SVCA9ICdjc3BfcmVwb3J0JyxcbiAgTUVESUEgPSAnbWVkaWEnLFxuICBXRUJTT0NLRVQgPSAnd2Vic29ja2V0JyxcbiAgT1RIRVIgPSAnb3RoZXInLFxuICBXRUJCVU5ETEUgPSAnd2ViYnVuZGxlJyxcbiAgV0VCVFJBTlNQT1JUID0gJ3dlYnRyYW5zcG9ydCdcbn1cblxuZXhwb3J0IGVudW0gUnVsZUFjdGlvblR5cGUge1xuICBCTE9DSyA9ICdibG9jaycsXG4gIFJFRElSRUNUID0gJ3JlZGlyZWN0JyxcbiAgQUxMT1cgPSAnYWxsb3cnLFxuICBVUEdSQURFX1NDSEVNRSA9ICd1cGdyYWRlU2NoZW1lJyxcbiAgTU9ESUZZX0hFQURFUlMgPSAnbW9kaWZ5SGVhZGVycycsXG4gIEFMTE9XX0FMTF9SRVFVRVNUUyA9ICdhbGxvd0FsbFJlcXVlc3RzJ1xufVxuXG5leHBvcnQgY29uc3QgTUFUQ0hfVFlQRV9PUFRJT05TID0gY29udmVydERpY3RUb0FycmF5KE1BVENIX1RZUEVfRElDVClcblxuZXhwb3J0IGNvbnN0IEhUVFBfU1RBVFVTX0NPREVfT1BUSU9OUyA9IE9iamVjdC5rZXlzKEhUVFBfU1RBVFVTX0NPREVfRElDVCkubWFwKCh2KSA9PiAoe1xuICB2YWx1ZTogK3YsXG4gIGxhYmVsOiBgJHt2fSAke0hUVFBfU1RBVFVTX0NPREVfRElDVFt2XX1gXG59KSlcblxuZXhwb3J0IGVudW0gR0xPQkFMX1ZBUklBQkxFIHtcbiAgQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSID0gJ0NIUk9NRV9QTFVTX09SSUdJTkFMX1hIUicsXG4gIENIUk9NRV9QTFVTX1JFUVVFU1RfTUFQID0gJ0NIUk9NRV9QTFVTX1JFUVVFU1RfTUFQJyxcbiAgQ0hST01FX1BMVVNfUFJPWFlfWEhSID0gJ0NIUk9NRV9QTFVTX1BST1hZX1hIUicsXG4gIENIUk9NRV9QTFVTX1BST1hZX1JPVVRFUyA9ICdDSFJPTUVfUExVU19QUk9YWV9ST1VURVMnXG59XG5leHBvcnQgY29uc3QgR0xPQkFMX1ZBUklBQkxFX01BUCA9IHtcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19PUklHSU5BTF9YSFJdOiAnQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSJyxcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19SRVFVRVNUX01BUF06ICdDSFJPTUVfUExVU19SRVFVRVNUX01BUCcsXG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfWEhSXTogJ0NIUk9NRV9QTFVTX1BST1hZX1hIUicsXG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXTogJ0NIUk9NRV9QTFVTX1BST1hZX1JPVVRFUydcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVRVUVTVF9IRUFERVJTX0tFWVMgPSBbXG4gICdBY2NlcHQnLCAvLyBBY2NlcHRhYmxlIHJlc3BvbnNlIENvbnRlbnQtVHlwZXNcbiAgJ0FjY2VwdC1DaGFyc2V0JywgLy8gQWNjZXB0YWJsZSBjaGFyYWN0ZXIgc2V0c1xuICAnQWNjZXB0LUVuY29kaW5nJywgLy8gQWNjZXB0YWJsZSByZXNwb25zZSBjb250ZW50IGVuY29kaW5nXG4gICdBY2NlcHQtTGFuZ3VhZ2UnLCAvLyBBY2NlcHRhYmxlIHJlc3BvbnNlIGNvbnRlbnQgbGFuZ3VhZ2VzXG4gICdBY2NlcHQtRGF0ZXRpbWUnLCAvLyBBY2NlcHRhYmxlIHZlcnNpb24gb2YgdGhlIGNvbnRlbnQgYmFzZWQgb24gZGF0ZXRpbWVcbiAgJ0F1dGhvcml6YXRpb24nLCAvLyBBdXRob3JpemF0aW9uIGluZm9ybWF0aW9uIGZvciBhdXRoZW50aWNhdGVkIHJlc291cmNlc1xuICAnQ2FjaGUtQ29udHJvbCcsIC8vIENhY2hlIGNvbnRyb2wgZGlyZWN0aXZlc1xuICAnQ29ubmVjdGlvbicsIC8vIFByZWZlcnJlZCB0eXBlIG9mIGNvbm5lY3Rpb25cbiAgJ0Nvb2tpZScsIC8vIEhUVFAgQ29va2llIGZyb20gc2VydmVyJ3MgU2V0LUNvb2tpZVxuICAnQ29udGVudC1MZW5ndGgnLCAvLyBMZW5ndGggb2YgdGhlIHJlcXVlc3QgYm9keSBpbiBvY3RhbFxuICAnQ29udGVudC1NRDUnLCAvLyBNRDUgaGFzaCBvZiByZXF1ZXN0IGJvZHkgY29udGVudCwgQmFzZTY0IGVuY29kZWRcbiAgJ0NvbnRlbnQtVHlwZScsIC8vIE1JTUUgdHlwZSBvZiB0aGUgcmVxdWVzdCBib2R5XG4gICdEYXRlJywgLy8gRGF0ZSBhbmQgdGltZSB0aGUgbWVzc2FnZSB3YXMgc2VudFxuICAnRXhwZWN0JywgLy8gRXhwZWN0ZWQgc2VydmVyIGJlaGF2aW9yXG4gICdGcm9tJywgLy8gRW1haWwgYWRkcmVzcyBvZiB0aGUgcmVxdWVzdCdzIHVzZXJcbiAgJ0hvc3QnLCAvLyBTZXJ2ZXIgZG9tYWluIG5hbWUgYW5kIHBvcnQgbnVtYmVyXG4gICdJZi1NYXRjaCcsIC8vIE9ubHkgcGVyZm9ybSB0aGUgYWN0aW9uIGlmIHRoZSBjbGllbnQncyBlbnRpdHkgbWF0Y2hlcyB0aGUgc2VydmVyJ3MgZW50aXR5XG4gICdJZi1Nb2RpZmllZC1TaW5jZScsIC8vIEFsbG93cyBhIDMwNCBOb3QgTW9kaWZpZWQgdG8gYmUgcmV0dXJuZWQgaWYgY29udGVudCBpcyB1bmNoYW5nZWRcbiAgJ0lmLU5vbmUtTWF0Y2gnLCAvLyBBbGxvd3MgYSAzMDQgTm90IE1vZGlmaWVkIHRvIGJlIHJldHVybmVkIGlmIGNvbnRlbnQgaXMgdW5jaGFuZ2VkXG4gICdJZi1SYW5nZScsIC8vIFNlbmQgdGhlIHBhcnRzIHRoYXQgYXJlIG1pc3NpbmcgaWYgdGhlIGVudGl0eSBpcyB1bmNoYW5nZWQsIG90aGVyd2lzZSBzZW5kIHRoZSBlbnRpcmUgbmV3IGVudGl0eVxuICAnSWYtVW5tb2RpZmllZC1TaW5jZScsIC8vIE9ubHkgc2VuZCB0aGUgcmVzcG9uc2UgaWYgdGhlIGVudGl0eSBoYXMgbm90IGJlZW4gbW9kaWZpZWQgc2luY2UgYSBzcGVjaWZpYyB0aW1lXG4gICdNYXgtRm9yd2FyZHMnLCAvLyBMaW1pdHMgdGhlIG51bWJlciBvZiB0aW1lcyBhIG1lc3NhZ2UgY2FuIGJlIGZvcndhcmRlZCB0aHJvdWdoIHByb3hpZXMgb3IgZ2F0ZXdheXNcbiAgJ09yaWdpbicsIC8vIEluaXRpYXRlcyBhIHJlcXVlc3QgZm9yIGNyb3NzLW9yaWdpbiByZXNvdXJjZSBzaGFyaW5nIChDT1JTKVxuICAnUHJhZ21hJywgLy8gSW1wbGVtZW50YXRpb24tc3BlY2lmaWMgaGVhZGVycyB0aGF0IG1heSBoYXZlIHZhcmlvdXMgZWZmZWN0cyBhbnl3aGVyZSBhbG9uZyB0aGUgcmVxdWVzdC1yZXNwb25zZSBjaGFpblxuICAnUHJveHktQXV0aG9yaXphdGlvbicsIC8vIEF1dGhvcml6YXRpb24gY3JlZGVudGlhbHMgZm9yIGNvbm5lY3RpbmcgdG8gYSBwcm94eVxuICAnUmFuZ2UnLCAvLyBSZXF1ZXN0IGEgcG9ydGlvbiBvZiBhbiBlbnRpdHksIGJ5dGUgb2Zmc2V0cyBzdGFydCBhdCB6ZXJvXG4gICdSZWZlcmVyJywgLy8gQWRkcmVzcyBvZiB0aGUgcHJldmlvdXMgd2ViIHBhZ2UgZnJvbSB3aGljaCBhIGxpbmsgdG8gdGhlIGN1cnJlbnRseSByZXF1ZXN0ZWQgcGFnZSB3YXMgZm9sbG93ZWRcbiAgJ1RFJywgLy8gQWNjZXB0YWJsZSBlbmNvZGluZ3MgZm9yIHRyYW5zZmVyXG4gICdVc2VyLUFnZW50JywgLy8gQnJvd3NlciBpZGVudGlmaWNhdGlvbiBzdHJpbmdcbiAgJ1VwZ3JhZGUnLCAvLyBBc2sgdGhlIHNlcnZlciB0byB1cGdyYWRlIHRvIGFub3RoZXIgcHJvdG9jb2xcbiAgJ1ZpYScsIC8vIEluZm9ybXMgdGhlIHNlcnZlciBvZiBwcm94aWVzIHRocm91Z2ggd2hpY2ggdGhlIHJlcXVlc3Qgd2FzIHNlbnRcbiAgJ1dhcm5pbmcnIC8vIEdlbmVyYWwgd2FybmluZyBhYm91dCBwb3NzaWJsZSBlcnJvcnMgaW4gdGhlIGVudGl0eSBib2R5XG5dXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRVNQT05TRV9IRUFERVJTX0tFWVMgPSBbXG4gICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAvLyDmjIfnpLrlk6rkupvnvZHnq5nlj6/ku6Xlj4LkuI7ot6jmupDorr/pl67jgILlroPnmoTlgLzlj6/ku6XmmK/kuIDkuKrlhbfkvZPnmoRVUknvvIzmiJbogIUq6KGo56S65YWB6K645Lu75L2V5Z+f55qE6K6/6Zeu44CCXG4gICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgLy8g5oyH5a6a5YWB6K646Leo5rqQ6K+35rGC55qESFRUUOaWueazle+8jOWmgkdFVCwgUE9TVCwgUFVU562J44CCXG4gICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJywgLy8g5Zyo6aKE5qOA6K+35rGC5Lit5L2/55So77yM5oyH5a6a5YWB6K6455qE6Ieq5a6a5LmJ6K+35rGC5aS044CCXG4gICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscycsIC8vIOihqOekuuaYr+WQpuWFgeiuuOWPkemAgUNvb2tpZeOAguWPquacieW9k+WAvOS4unRydWXml7bvvIzmtY/op4jlmajmiY3kvJrlj5HpgIFDb29raWXjgIJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgJ0FjY2Vzcy1Db250cm9sLUV4cG9zZS1IZWFkZXJzJywgLy8g5YWB6K645rWP6KeI5Zmo6K6/6Zeu55qE5pyN5Yqh56uv5ZON5bqU5aS05YiX6KGo77yM6Zmk5LqG5YWt5Liq5Z+65pys55qE5ZON5bqU5aS077yIQ2FjaGUtQ29udHJvbCwgQ29udGVudC1MYW5ndWFnZSwgQ29udGVudC1UeXBlLCBFeHBpcmVzLCBMYXN0LU1vZGlmaWVkLCDlkowgUHJhZ21h77yJ5LmL5aSW44CCXG4gICdBY2Nlc3MtQ29udHJvbC1NYXgtQWdlJywgLy8gIOihqOekuumihOajgOivt+axgueahOe7k+aenOiDveWkn+iiq+e8k+WtmOWkmumVv+aXtumXtO+8iOS7peenkuS4uuWNleS9je+8ieOAglxuICAnQWNjZXB0LVBhdGNoJywgLy8gU3BlY2lmaWVzIHRoZSBwYXRjaCBkb2N1bWVudCBmb3JtYXRzIGFjY2VwdGVkIGJ5IHRoZSBzZXJ2ZXJcbiAgJ0FjY2VwdC1SYW5nZXMnLCAvLyBTcGVjaWZpZXMgdGhlIHJhbmdlIG9mIGJ5dGVzIHRoYXQgdGhlIHNlcnZlciBjYW4gaGFuZGxlXG4gICdBZ2UnLCAvLyBUaGUgdGltZSwgaW4gc2Vjb25kcywgdGhhdCB0aGUgb2JqZWN0IGhhcyBiZWVuIGluIGEgcHJveHkgY2FjaGVcbiAgJ0FsbG93JywgLy8gVmFsaWQgYWN0aW9ucyBmb3IgYSBzcGVjaWZpYyByZXNvdXJjZVxuICAnQ2FjaGUtQ29udHJvbCcsIC8vIERpcmVjdGl2ZXMgZm9yIGNhY2hpbmcgbWVjaGFuaXNtcyBpbiBib3RoIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgJ0Nvbm5lY3Rpb24nLCAvLyBPcHRpb25zIGRlc2lyZWQgZm9yIHRoZSBjb25uZWN0aW9uXG4gICdDb250ZW50LURpc3Bvc2l0aW9uJywgLy8gRGlyZWN0cyB0aGUgYnJvd3NlciB0byBkaXNwbGF5IHRoZSBmaWxlIGFzIGFuIGF0dGFjaG1lbnQgZm9yIGRvd25sb2FkXG4gICdDb250ZW50LUVuY29kaW5nJywgLy8gVGhlIHR5cGUgb2YgZW5jb2RpbmcgdXNlZCBvbiB0aGUgZGF0YVxuICAnQ29udGVudC1MYW5ndWFnZScsIC8vIFRoZSBsYW5ndWFnZSB0aGUgY29udGVudCBpcyBpblxuICAnQ29udGVudC1MZW5ndGgnLCAvLyBUaGUgbGVuZ3RoIG9mIHRoZSByZXNwb25zZSBib2R5IGluIG9jdGV0cyAoOC1iaXQgYnl0ZXMpXG4gICdDb250ZW50LUxvY2F0aW9uJywgLy8gQW4gYWx0ZXJuYXRlIGxvY2F0aW9uIGZvciB0aGUgcmV0dXJuZWQgZGF0YVxuICAnQ29udGVudC1NRDUnLCAvLyBBIEJhc2U2NC1lbmNvZGVkIGJpbmFyeSBNRDUgc3VtIG9mIHRoZSBjb250ZW50IG9mIHRoZSByZXNwb25zZSAoZGVwcmVjYXRlZClcbiAgJ0NvbnRlbnQtUmFuZ2UnLCAvLyBXaGVyZSBpbiB0aGUgZnVsbCBjb250ZW50IHRoaXMgcGFydGlhbCBtZXNzYWdlIGJlbG9uZ3NcbiAgJ0NvbnRlbnQtVHlwZScsIC8vIFRoZSBNSU1FIHR5cGUgb2YgdGhpcyBjb250ZW50XG4gICdEYXRlJywgLy8gVGhlIGRhdGUgYW5kIHRpbWUgYXQgd2hpY2ggdGhlIG1lc3NhZ2Ugd2FzIHNlbnRcbiAgJ0VUYWcnLCAvLyBBbiBpZGVudGlmaWVyIGZvciBhIHNwZWNpZmljIHZlcnNpb24gb2YgYSByZXNvdXJjZVxuICAnRXhwaXJlcycsIC8vIFRoZSBkYXRlL3RpbWUgYWZ0ZXIgd2hpY2ggdGhlIHJlc3BvbnNlIGlzIGNvbnNpZGVyZWQgc3RhbGVcbiAgJ0xhc3QtTW9kaWZpZWQnLCAvLyBUaGUgbGFzdCBtb2RpZmljYXRpb24gZGF0ZSBvZiB0aGUgcmVzb3VyY2UgdGhhdCB3YXMgcmVxdWVzdGVkXG4gICdMaW5rJywgLy8gVXNlZCB0byBleHByZXNzIGEgdHlwZWQgcmVsYXRpb25zaGlwIHdpdGggYW5vdGhlciByZXNvdXJjZVxuICAnTG9jYXRpb24nLCAvLyBVc2VkIGluIHJlZGlyZWN0aW9uLCBvciB3aGVuIGEgbmV3IHJlc291cmNlIGhhcyBiZWVuIGNyZWF0ZWRcbiAgJ1AzUCcsIC8vIFAzUCBwb2xpY3lcbiAgJ1ByYWdtYScsIC8vIEltcGxlbWVudGF0aW9uLXNwZWNpZmljIGhlYWRlcnMgdGhhdCBtYXkgaGF2ZSB2YXJpb3VzIGVmZmVjdHNcbiAgJ1Byb3h5LUF1dGhlbnRpY2F0ZScsIC8vIFJlcXVlc3QgZm9yIGF1dGhlbnRpY2F0aW9uIHRvIGFjY2VzcyB0aGUgcHJveHlcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgJ1B1YmxpYy1LZXktUGlucycsIC8vIEhUVFAgUHVibGljIEtleSBQaW5uaW5nLCB1c2VkIHRvIGNvbnZleSBhIGNvbW1pdG1lbnQgdG8gYSBjcnlwdG9ncmFwaGljIGlkZW50aXR5IGZvciBhIGNlcnRhaW4gcGVyaW9kIG9mIHRpbWVcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgJ1JlZnJlc2gnLCAvLyBVc2VkIGZvciByZWRpcmVjdGlvbiBvciB3aGVuIGEgbmV3IHJlc291cmNlIGhhcyBiZWVuIGNyZWF0ZWQgYW5kIHNob3VsZCBiZSByZXRyaWV2ZWQgYWZ0ZXIgYSBjZXJ0YWluIHRpbWUgaW50ZXJ2YWxcbiAgJ1JldHJ5LUFmdGVyJywgLy8gSW5kaWNhdGVzIGhvdyBsb25nIHRoZSB1c2VyIGFnZW50IHNob3VsZCB3YWl0IGJlZm9yZSBtYWtpbmcgYSBmb2xsb3ctdXAgcmVxdWVzdFxuICAnU2VydmVyJywgLy8gQSBuYW1lIGZvciB0aGUgc2VydmVyXG4gICdTZXQtQ29va2llJywgLy8gQW4gSFRUUCBjb29raWVcbiAgJ1N0YXR1cycsIC8vIENHSSBoZWFkZXIgZmllbGQgdXNlZCB0byBkZWZpbmUgdGhlIHN0YXR1cyBvZiBhIEhUVFAgcmVzcG9uc2VcbiAgJ1RyYWlsZXInLCAvLyBUaGUgaGVhZGVyIGZpZWxkcyBwcmVzZW50IGluIHRoZSB0cmFpbGVyIG9mIGEgbWVzc2FnZSBlbmNvZGVkIHdpdGggY2h1bmtlZCB0cmFuc2Zlci1jb2RpbmdcbiAgJ1RyYW5zZmVyLUVuY29kaW5nJywgLy8gVGhlIGZvcm0gb2YgZW5jb2RpbmcgdXNlZCB0byBzYWZlbHkgdHJhbnNmZXIgdGhlIGVudGl0eSB0byB0aGUgdXNlclxuICAnVXBncmFkZScsIC8vIEFzayB0aGUgY2xpZW50IHRvIHN3aXRjaCB0byBhIGRpZmZlcmVudCBwcm90b2NvbFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAnVmFyeScsIC8vIFRlbGxzIGRvd25zdHJlYW0gcHJveGllcyBob3cgdG8gbWF0Y2ggZnV0dXJlIHJlcXVlc3QgaGVhZGVycyB0byBkZWNpZGUgd2hldGhlciB0aGUgY2FjaGVkIHJlc3BvbnNlIGNhbiBiZSB1c2VkIHJhdGhlciB0aGFuIHJlcXVlc3RpbmcgYSBmcmVzaCBvbmUgZnJvbSB0aGUgb3JpZ2luIHNlcnZlclxuICAnVmlhJywgLy8gSW5mb3JtcyB0aGUgY2xpZW50IG9mIHByb3hpZXMgdGhyb3VnaCB3aGljaCB0aGUgcmVzcG9uc2Ugd2FzIHNlbnRcbiAgJ1dhcm5pbmcnLCAvLyBBIGdlbmVyYWwgd2FybmluZyBhYm91dCBwb3NzaWJsZSBwcm9ibGVtcyB3aXRoIHRoZSBlbnRpdHkgYm9keVxuICAnV1dXLUF1dGhlbnRpY2F0ZScgLy8gSW5kaWNhdGVzIHRoZSBhdXRoZW50aWNhdGlvbiBzY2hlbWUgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBhY2Nlc3MgdGhlIHJlcXVlc3RlZCBlbnRpdHlcbl1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUFJPWFlfUk9VVEVfS0VZLFxuICBNT0NLX1RZUEUsXG4gIE1PQ0tfVFlQRV9ESUNULFxuICBNT0NLX1RZUEVfT1BUSU9OUyxcbiAgTUFUQ0hfVFlQRSxcbiAgSFRUUF9TVEFUVVNfQ09ERSxcbiAgTUVTU0FHRV9UWVBFUyxcbiAgR0xPQkFMX1ZBUklBQkxFX01BUFxufVxuIiwiZXhwb3J0IGNvbnN0IGxvZyA9IChkYXRhKSA9PlxuICBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LmV2YWwoYGNvbnNvbGUubG9nKCcke0pTT04uc3RyaW5naWZ5KGRhdGEpfScpYClcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnREaWN0VG9BcnJheShcbiAgZGljdDoge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICB9LFxuICBjb25maWc6IHN0cmluZ1tdID0gW1widmFsdWVcIiwgXCJsYWJlbFwiXSxcbik6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1bXSB7XG4gIGNvbnN0IFtrZXlOYW1lID0gXCJ2YWx1ZVwiLCB2YWx1ZU5hbWUgPSBcImxhYmVsXCJdID0gY29uZmlnXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhkaWN0KS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcbiAgICBba2V5TmFtZV06IGtleSxcbiAgICBbdmFsdWVOYW1lXTogdmFsdWVcbiAgfSkpXG59XG5leHBvcnQgZnVuY3Rpb24gam9pbnRVcmwodXJsKSB7XG4gIHRyeSB7XG4gICAgLy8g5bCd6K+V5Yib5bu65LiA5LiqVVJM5a+56LGhXG4gICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTCh1cmwpXG5cbiAgICAvLyDmo4Dmn6XljY/orq7mmK/lkKbkuLpodHRw5oiWaHR0cHNcbiAgICBpZiAocGFyc2VkVXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgfHwgcGFyc2VkVXJsLnByb3RvY29sID09PSBcImh0dHBzOlwiKSB7XG4gICAgICByZXR1cm4gdXJsIC8vIOi/lOWbnuWOn1VSTO+8jOWboOS4uuWug+aYr+S4gOS4quacieaViOeahEhUVFAoUynlnLDlnYBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwcm90b2NvbFwiKSAvLyDmipvlh7rplJnor6/vvIzlpITnkIbpnZ5IVFRQKFMp5Y2P6K6uXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIOWmguaenFVSTOaehOmAoOWksei0peaIluWNj+iuruS4jeato+ehru+8jOWImei/lOWbnuS/ruato+WQjueahFVSTFxuICAgIHJldHVybiBsb2NhdGlvbi5vcmlnaW4gKyB1cmxcbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1RvcChhcnIsIGluZGV4KSB7XG4gIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgYXJyLmxlbmd0aCkge1xuICAgIC8vIOS7juaMh+Wumue0ouW8leS9jee9ruenu+mZpOWFg+e0oFxuICAgIGNvbnN0IFtpdGVtXSA9IGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgLy8g5bCG6K+l5YWD57Sg5o+S5YWl5Yiw5pWw57uE55qE5byA5aS0XG4gICAgYXJyLnVuc2hpZnQoaXRlbSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5jcnlwdERlY3J5cHQoaW5wdXQ6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgLy8g5bCG6L6T5YWl5a2X56ym5Liy6L2s5o2i5Li65a2X56ym56CB5pWw57uEXG4gIGNvbnN0IGlucHV0Q2hhcnMgPSBBcnJheS5mcm9tKGlucHV0KS5tYXAoY2hhciA9PiBjaGFyLmNoYXJDb2RlQXQoMCkpO1xuICBcbiAgLy8g55Sf5oiQ5a+G6ZKl55qE5a2X56ym56CB5pWw57uEXG4gIGNvbnN0IGtleUNoYXJzID0gQXJyYXkuZnJvbShrZXkpLm1hcChjaGFyID0+IGNoYXIuY2hhckNvZGVBdCgwKSk7XG4gIFxuICAvLyDmiafooYzlvILmiJbliqDlr4bmiJbop6Plr4ZcbiAgY29uc3Qgb3V0cHV0ID0gaW5wdXRDaGFycy5tYXAoKGNoYXIsIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhciBeIGtleUNoYXJzW2luZGV4ICUga2V5Q2hhcnMubGVuZ3RoXSk7XG4gIH0pO1xuXG4gIC8vIOWwhuWtl+espuaVsOe7hOi9rOaNouWbnuWtl+espuS4slxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbnZlcnREaWN0VG9BcnJheSxcbiAgbG9nLFxuICBqb2ludFVybCxcbiAgbW92ZVRvVG9wXG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuZXhwb3J0IGVudW0gSFRUUF9TVEFUVVNfQ09ERSB7XG4gIENPTlRJTlVFID0gMTAwLFxuICBTV0lUQ0hJTkdfUFJPVE9DT0xTID0gMTAxLFxuICBQUk9DRVNTSU5HID0gMTAyLFxuXG4gIE9LID0gMjAwLFxuICBDUkVBVEVEID0gMjAxLFxuICBBQ0NFUFRFRCA9IDIwMixcbiAgTk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04gPSAyMDMsXG4gIE5PX0NPTlRFTlQgPSAyMDQsXG4gIFJFU0VUX0NPTlRFTlQgPSAyMDUsXG4gIFBBUlRJQUxfQ09OVEVOVCA9IDIwNixcblxuICBNVUxUSV9TVEFUVVMgPSAyMDcsXG4gIEFMUkVBRFlfUkVQT1JURUQgPSAyMDgsXG5cbiAgSU1fVVNFRCA9IDIyNixcblxuICBNVUxUSVBMRV9DSE9JQ0VTID0gMzAwLFxuICBNT1ZFRF9QRVJNQU5FTlRMWSA9IDMwMSxcbiAgRk9VTkQgPSAzMDIsXG4gIFNFRV9PVEhFUiA9IDMwMyxcbiAgTk9UX01PRElGSUVEID0gMzA0LFxuICBVU0VfUFJPWFkgPSAzMDUsXG4gIFRFTVBPUkFSWV9SRURJUkVDVCA9IDMwNyxcbiAgUEVSTUFORU5UX1JFRElSRUNUID0gMzA4LFxuXG4gIEJBRF9SRVFVRVNUID0gNDAwLFxuICBVTkFVVEhPUklaRUQgPSA0MDEsXG4gIFBBWU1FTlRfUkVRVUlSRUQgPSA0MDIsXG4gIEZPUkJJRERFTiA9IDQwMyxcbiAgTk9UX0ZPVU5EID0gNDA0LFxuICBNRVRIT0RfTk9UX0FMTE9XRUQgPSA0MDUsXG4gIE5PVF9BQ0NFUFRBQkxFID0gNDA2LFxuICBQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRCA9IDQwNyxcbiAgUkVRVUVTVF9USU1FT1VUID0gNDA4LFxuICBDT05GTElDVCA9IDQwOSxcbiAgR09ORSA9IDQxMCxcbiAgTEVOR1RIX1JFUVVJUkVEID0gNDExLFxuICBQUkVDT05ESVRJT05fRkFJTEVEID0gNDEyLFxuICBQQVlMT0FEX1RPT19MQVJHRSA9IDQxMyxcbiAgVVJJX1RPT19MT05HID0gNDE0LFxuICBVTlNVUFBPUlRFRF9NRURJQV9UWVBFID0gNDE1LFxuICBSQU5HRV9OT1RfU0FUSVNGSUFCTEUgPSA0MTYsXG4gIEVYUEVDVEFUSU9OX0ZBSUxFRCA9IDQxNyxcbiAgSV9BTV9BX1RFQVBPVCA9IDQxOCxcbiAgTUlTRElSRUNURURfUkVRVUVTVCA9IDQyMSxcbiAgVU5QUk9DRVNTQUJMRV9FTlRJVFkgPSA0MjIsXG4gIExPQ0tFRCA9IDQyMyxcbiAgRkFJTEVEX0RFUEVOREVOQ1kgPSA0MjQsXG4gIFVQR1JBREVfUkVRVUlSRUQgPSA0MjYsXG4gIFBSRUNPTkRJVElPTl9SRVFVSVJFRCA9IDQyOCxcbiAgVE9PX01BTllfUkVRVUVTVFMgPSA0MjksXG4gIFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UgPSA0MzEsXG4gIFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TID0gNDUxLFxuXG4gIElOVEVSTkFMX1NFUlZFUl9FUlJPUiA9IDUwMCxcbiAgTk9UX0lNUExFTUVOVEVEID0gNTAxLFxuICBCQURfR0FURVdBWSA9IDUwMixcbiAgU0VSVklDRV9VTkFWQUlMQUJMRSA9IDUwMyxcbiAgR0FURVdBWV9USU1FT1VUID0gNTA0LFxuICBIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRCA9IDUwNSxcbiAgVkFSSUFOVF9BTFNPX05FR09USUFURVMgPSA1MDYsXG4gIElOU1VGRklDSUVOVF9TVE9SQUdFID0gNTA3LFxuICBMT09QX0RFVEVDVEVEID0gNTA4LFxuICBOT1RfRVhURU5ERUQgPSA1MTAsXG4gIE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQgPSA1MTFcbn1cbmV4cG9ydCBjb25zdCBIVFRQX1NUQVRVU19DT0RFX0RJQ1QgPSB7XG4gIFtIVFRQX1NUQVRVU19DT0RFLkNPTlRJTlVFXTogXCJDb250aW51ZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TV0lUQ0hJTkdfUFJPVE9DT0xTXTogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBST0NFU1NJTkddOiBcIlByb2Nlc3NpbmdcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5PS106IFwiT0tcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ1JFQVRFRF06IFwiQ3JlYXRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5BQ0NFUFRFRF06IFwiQWNjZXB0ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT05dOiBcIk5vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PX0NPTlRFTlRdOiBcIk5vIENvbnRlbnRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkVTRVRfQ09OVEVOVF06IFwiUmVzZXQgQ29udGVudFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVJUSUFMX0NPTlRFTlRdOiBcIlBhcnRpYWwgQ29udGVudFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1VTFRJX1NUQVRVU106IFwiTXVsdGktU3RhdHVzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkFMUkVBRFlfUkVQT1JURURdOiBcIkFscmVhZHkgUmVwb3J0ZWRcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5NVUxUSVBMRV9DSE9JQ0VTXTogXCJNdWx0aXBsZSBDaG9pY2VzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1PVkVEX1BFUk1BTkVOVExZXTogXCJNb3ZlZCBQZXJtYW5lbnRseVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5GT1VORF06IFwiRm91bmRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuU0VFX09USEVSXTogXCJTZWUgT3RoZXJcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX01PRElGSUVEXTogXCJOb3QgTW9kaWZpZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVVNFX1BST1hZXTogXCJVc2UgUHJveHlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVEVNUE9SQVJZX1JFRElSRUNUXTogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEVSTUFORU5UX1JFRElSRUNUXTogXCJQZXJtYW5lbnQgUmVkaXJlY3RcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5CQURfUkVRVUVTVF06IFwiQmFkIFJlcXVlc3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5BVVRIT1JJWkVEXTogXCJVbmF1dGhvcml6ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEFZTUVOVF9SRVFVSVJFRF06IFwiUGF5bWVudCBSZXF1aXJlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5GT1JCSURERU5dOiBcIkZvcmJpZGRlblwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfRk9VTkRdOiBcIk5vdCBGb3VuZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5NRVRIT0RfTk9UX0FMTE9XRURdOiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfQUNDRVBUQUJMRV06IFwiTm90IEFjY2VwdGFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRURdOiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJFUVVFU1RfVElNRU9VVF06IFwiUmVxdWVzdCBUaW1lb3V0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkNPTkZMSUNUXTogXCJDb25mbGljdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5HT05FXTogXCJHb25lXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkxFTkdUSF9SRVFVSVJFRF06IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBSRUNPTkRJVElPTl9GQUlMRURdOiBcIlByZWNvbmRpdGlvbiBGYWlsZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEFZTE9BRF9UT09fTEFSR0VdOiBcIlBheWxvYWQgVG9vIExhcmdlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVSSV9UT09fTE9OR106IFwiVVJJIFRvbyBMb25nXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVOU1VQUE9SVEVEX01FRElBX1RZUEVdOiBcIlVuc3VwcG9ydGVkIE1lZGlhIFR5cGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkFOR0VfTk9UX1NBVElTRklBQkxFXTogXCJSYW5nZSBOb3QgU2F0aXNmaWFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRVhQRUNUQVRJT05fRkFJTEVEXTogXCJFeHBlY3RhdGlvbiBGYWlsZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSV9BTV9BX1RFQVBPVF06IFwiSSdtIGEgdGVhcG90XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1JU0RJUkVDVEVEX1JFUVVFU1RdOiBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5QUk9DRVNTQUJMRV9FTlRJVFldOiBcIlVucHJvY2Vzc2FibGUgRW50aXR5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkxPQ0tFRF06IFwiTG9ja2VkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZBSUxFRF9ERVBFTkRFTkNZXTogXCJGYWlsZWQgRGVwZW5kZW5jeVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VUEdSQURFX1JFUVVJUkVEXTogXCJVcGdyYWRlIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBSRUNPTkRJVElPTl9SRVFVSVJFRF06IFwiUHJlY29uZGl0aW9uIFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlRPT19NQU5ZX1JFUVVFU1RTXTogXCJUb28gTWFueSBSZXF1ZXN0c1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFXTogXCJSZXF1ZXN0IEhlYWRlciBGaWVsZHMgVG9vIExhcmdlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TXTogXCJVbmF2YWlsYWJsZSBGb3IgTGVnYWwgUmVhc29uc1wiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLklOVEVSTkFMX1NFUlZFUl9FUlJPUl06IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9JTVBMRU1FTlRFRF06IFwiTm90IEltcGxlbWVudGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkJBRF9HQVRFV0FZXTogXCJCYWQgR2F0ZXdheVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TRVJWSUNFX1VOQVZBSUxBQkxFXTogXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkdBVEVXQVlfVElNRU9VVF06IFwiR2F0ZXdheSBUaW1lb3V0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEXTogXCJIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5WQVJJQU5UX0FMU09fTkVHT1RJQVRFU106IFwiVmFyaWFudCBBbHNvIE5lZ290aWF0ZXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSU5TVUZGSUNJRU5UX1NUT1JBR0VdOiBcIkluc3VmZmljaWVudCBTdG9yYWdlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkxPT1BfREVURUNURURdOiBcIkxvb3AgRGV0ZWN0ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0VYVEVOREVEXTogXCJOb3QgRXh0ZW5kZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRF06IFwiTmV0d29yayBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiLFxufVxuZXhwb3J0IGRlZmF1bHQge1xuICBIVFRQX1NUQVRVU19DT0RFLFxuICBIVFRQX1NUQVRVU19DT0RFX0RJQ1Rcbn0iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLjJmOWI5MDg2LmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);