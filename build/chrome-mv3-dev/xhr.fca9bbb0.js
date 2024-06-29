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
})({"a3ILL":[function(require,module,exports) {
var _constants = require("~app/constants");
var _utils = require("~app/utils");
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
                        value: response ? JSON.parse(response) : null
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

},{"~app/constants":"eTO6I","~app/utils":"bTs7t"}],"eTO6I":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}]},["a3ILL"], "a3ILL", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQixrQkFBa0IsRUFBRTtJQUN0QyxDQUFDLGlCQUFpQixhQUFhLEVBQUU7SUFDakMsQ0FBQyxpQkFBaUIsdUJBQXVCLEVBQUU7SUFDM0MsQ0FBQyxpQkFBaUIsc0JBQXNCLEVBQUU7SUFDMUMsQ0FBQyxpQkFBaUIsbUJBQW1CLEVBQUU7SUFDdkMsQ0FBQyxpQkFBaUIsY0FBYyxFQUFFO0lBQ2xDLENBQUMsaUJBQWlCLG9CQUFvQixFQUFFO0lBQ3hDLENBQUMsaUJBQWlCLHFCQUFxQixFQUFFO0lBQ3pDLENBQUMsaUJBQWlCLE9BQU8sRUFBRTtJQUMzQixDQUFDLGlCQUFpQixrQkFBa0IsRUFBRTtJQUN0QyxDQUFDLGlCQUFpQixpQkFBaUIsRUFBRTtJQUNyQyxDQUFDLGlCQUFpQixzQkFBc0IsRUFBRTtJQUMxQyxDQUFDLGlCQUFpQixrQkFBa0IsRUFBRTtJQUN0QyxDQUFDLGlCQUFpQixnQ0FBZ0MsRUFBRTtJQUNwRCxDQUFDLGlCQUFpQiw4QkFBOEIsRUFBRTtJQUVsRCxDQUFDLGlCQUFpQixzQkFBc0IsRUFBRTtJQUMxQyxDQUFDLGlCQUFpQixnQkFBZ0IsRUFBRTtJQUNwQyxDQUFDLGlCQUFpQixZQUFZLEVBQUU7SUFDaEMsQ0FBQyxpQkFBaUIsb0JBQW9CLEVBQUU7SUFDeEMsQ0FBQyxpQkFBaUIsZ0JBQWdCLEVBQUU7SUFDcEMsQ0FBQyxpQkFBaUIsMkJBQTJCLEVBQUU7SUFDL0MsQ0FBQyxpQkFBaUIsd0JBQXdCLEVBQUU7SUFDNUMsQ0FBQyxpQkFBaUIscUJBQXFCLEVBQUU7SUFDekMsQ0FBQyxpQkFBaUIsY0FBYyxFQUFFO0lBQ2xDLENBQUMsaUJBQWlCLGFBQWEsRUFBRTtJQUNqQyxDQUFDLGlCQUFpQixnQ0FBZ0MsRUFBRTtBQUN0RDtrQkFDZTtJQUNiO0lBQ0E7QUFDRiIsInNvdXJjZXMiOlsiY2hyb21lLWV4dC10b29scy9zcmMvYXBwL3NjcmlwdHMveGhyLnRzIiwiY2hyb21lLWV4dC10b29scy9zcmMvYXBwL2NvbnN0YW50cy9pbmRleC50cyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2FwcC91dGlscy9pbmRleC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2FwcC9jb25zdGFudHMvaHR0cFN0YXR1cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHTE9CQUxfVkFSSUFCTEUsIE1BVENIX1RZUEUsIE1FU1NBR0VfVFlQRVMsIE1PQ0tfVFlQRSwgUkVRVUVTVF9UWVBFIH0gZnJvbSAnfmFwcC9jb25zdGFudHMnXG5pbXBvcnQgeyBqb2ludFVybCB9IGZyb20gJ35hcHAvdXRpbHMnXG5cbjsoZnVuY3Rpb24gKCkge1xuICBjb25zdCBvcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoXG4gIGNvbnN0IG9yaWdpbmFsT3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuXG4gIGNvbnN0IG9yaWdpbmFsU2VuZCA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kXG4gIGNvbnN0IG9yaWdpbmFsR2V0QWxsUmVzcG9uc2VIZWFkZXJzID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVyc1xuICBjb25zdCBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldFJlc3BvbnNlSGVhZGVyXG4gIGNvbnN0IG9yaWdpbmFsU2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyXG4gIGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24gKG1zZykge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnXG4gICAgY29uc3QgeyBhY3Rpb24sIHBheWxvYWQgfSA9IGRhdGFcbiAgICBpZiAoYWN0aW9uID09PSBNRVNTQUdFX1RZUEVTLk1BVENISU5HX1VQREFURSAmJiBwYXlsb2FkPy5zZWNyZXQgPT09ICdjb250ZW50LXRvLXhocicpIHtcbiAgICAgIHdpbmRvd1tHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXSA9IHBheWxvYWQuZGF0YSB8fCBbXVxuICAgIH1cbiAgfVxuICBjb25zdCBkZWxheVByb21pc2UgPSAobXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxuICB9XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgY2FsbGJhY2spXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgY2FsbGJhY2spXG5cbiAgY29uc3QgZW5hYmxlTW9ja0NoZWNrID0gKHJvdXRlcywgeGhyLCBtZXRob2QsIG9yaWdpbmFsVXJsKSA9PiB7XG4gICAgbGV0IHJvdXRlXG4gICAgY29uc3QgZW5hYmxlUm91dGVzID0gcm91dGVzLmZpbHRlcigoeyBlbmFibGUsIG1vY2tUeXBlIH0pID0+IGVuYWJsZSAmJiBtb2NrVHlwZSA9PT0gTU9DS19UWVBFLk5PUk1BTClcbiAgICBjb25zdCBlbmFibGUgPVxuICAgICAgcm91dGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgIGVuYWJsZVJvdXRlcy5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXJsLCBtYXRjaFR5cGUsIHJlcXVlc3RUeXBlIH0gPSBpdGVtXG4gICAgICAgIGNvbnN0IGlzTWV0aG9kTWF0Y2hlZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSByZXF1ZXN0VHlwZS50b0xvd2VyQ2FzZSgpIHx8IHJlcXVlc3RUeXBlID09PSBSRVFVRVNUX1RZUEUuQUxMXG4gICAgICAgIGlmIChpc01ldGhvZE1hdGNoZWQpIHtcbiAgICAgICAgICBpZiAoIXVybCAmJiAhbWF0Y2hUeXBlKSB7XG4gICAgICAgICAgICAvLyDkuI3pmZBVUkxcbiAgICAgICAgICAgIHJldHVybiB0cnVlICYmIChyb3V0ZSA9IGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuUkVHRVhQKSB7XG4gICAgICAgICAgICBjb25zdCBSRUcgPSBuZXcgUmVnRXhwKHVybCwgJ2cnKVxuICAgICAgICAgICAgcmV0dXJuIFJFRy50ZXN0KG9yaWdpbmFsVXJsKSAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2hUeXBlID09PSBNQVRDSF9UWVBFLkNPTlRBSU5TKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxVcmwuaW5jbHVkZXModXJsKSAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2hUeXBlID09PSBNQVRDSF9UWVBFLkVRVUFMUykge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVXJsID09PSB1cmwgJiYgKHJvdXRlID0gaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIGlmIChlbmFibGUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4aHIsICdtb2NrJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4aHIsICdtb2NrQ29uZmlnJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJvdXRlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHhociwgJ3Jlc3BvbnNlVVJMJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IG9yaWdpbmFsVXJsLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB4aHIubW9ja1xuICAgICAgZGVsZXRlIHhoci5tb2NrQ29uZmlnXG4gICAgfVxuICAgIHJldHVybiBlbmFibGVcbiAgfVxuXG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbbWV0aG9kLCB1cmxdID0gYXJnc1xuICAgIGNvbnN0IHsgcmVzcG9uc2VVUkwgfSA9IHRoaXNcbiAgICBlbmFibGVNb2NrQ2hlY2sod2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID8/IFtdLCB0aGlzLCBtZXRob2QsIHJlc3BvbnNlVVJMIHx8IGpvaW50VXJsKHVybCkpXG4gICAgb3JpZ2luYWxPcGVuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gIH1cblxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnLCByZXNwb25zZVR5cGUsIHJlc3BvbnNlVVJMIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogTUVTU0FHRV9UWVBFUy5TRVRfTE9BRElORyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlY3JldDogJ3hoci10by1jb250ZW50JyxcbiAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgIHJvdXRlOiB7IC4uLm1vY2tDb25maWcsIHVybDogcmVzcG9uc2VVUkwsIHRpbWU6IG5ldyBEYXRlKCksIHhoclR5cGU6ICd4aHInIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNvbnN0IHsgcmVzcG9uc2UsIHJlc3BvbnNlU3RhdHVzLCBkZWxheSB9ID0gbW9ja0NvbmZpZ1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyZWFkeVN0YXRlJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IDQgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc3RhdHVzJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJlc3BvbnNlU3RhdHVzID8/IDIwMCB9KVxuICAgICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnanNvbic6IHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jlc3BvbnNlJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJlc3BvbnNlID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiBudWxsIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVzcG9uc2VUZXh0JywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJlc3BvbnNlIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXM/Lm9ucmVhZHlzdGF0ZWNoYW5nZT8uKClcbiAgICAgICAgdGhpcz8ub25sb2FkZW5kPy4oKVxuICAgICAgICB0aGlzPy5vbmxvYWQ/LigpXG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgYWN0aW9uOiBNRVNTQUdFX1RZUEVTLlNFVF9MT0FESU5HLFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHNlY3JldDogJ3hoci10by1jb250ZW50JyxcbiAgICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSwgZGVsYXkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdpbmFsU2VuZC5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgZW5hYmxlTW9ja1JlcXVlc3RIZWFkZXJzLCBtb2NrUmVxdWVzdEhlYWRlcnMgfSA9IG1vY2tDb25maWdcbiAgICAgIGlmIChlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IEpTT04ucGFyc2UobW9ja1JlcXVlc3RIZWFkZXJzKVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLCBrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gaGVhZGVyc1trZXldXG4gICAgICAgICAgICBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIuYXBwbHkodGhpcywgW2tleSwgZWxlbWVudF0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIuYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cbiAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVycyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgbW9ja1Jlc3BvbnNlSGVhZGVycywgZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycyB9ID0gbW9ja0NvbmZpZ1xuICAgICAgcmV0dXJuIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnNcbiAgICAgICAgPyBKU09OLnBhcnNlKG1vY2tSZXNwb25zZUhlYWRlcnMpXG4gICAgICAgIDogb3JpZ2luYWxHZXRBbGxSZXNwb25zZUhlYWRlcnMuYXBwbHkodGhpcywgYXJncylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0QWxsUmVzcG9uc2VIZWFkZXJzLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgW2tleV0gPSBhcmdzXG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgbW9ja1Jlc3BvbnNlSGVhZGVycywgZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycyB9ID0gbW9ja0NvbmZpZ1xuICAgICAgcmV0dXJuIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnNcbiAgICAgICAgPyBKU09OLnBhcnNlKG1vY2tSZXNwb25zZUhlYWRlcnMpW2tleV1cbiAgICAgICAgOiBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG5cbiAgd2luZG93LmZldGNoID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBbdXJsLCBjb25maWcgPSB7fV0gPSBhcmdzXG4gICAgY29uc3QgeyBtZXRob2QsIGJvZHkgfSA9IGNvbmZpZ1xuICAgIGlmICh1cmwgJiYgbWV0aG9kKSB7XG4gICAgICBlbmFibGVNb2NrQ2hlY2sod2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID8/IFtdLCB0aGlzLCBtZXRob2QsIGpvaW50VXJsKHVybCkpXG4gICAgfVxuICAgIGNvbnN0IHsgbW9jaywgbW9ja0NvbmZpZywgcmVzcG9uc2VVUkwgfSA9IHRoaXNcbiAgICBpZiAobW9jaykge1xuICAgICAgY29uc3Qge1xuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgcmVzcG9uc2VTdGF0dXMsXG4gICAgICAgIGRlbGF5LFxuICAgICAgICBlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIG1vY2tSZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgbW9ja1Jlc3BvbnNlSGVhZGVyc1xuICAgICAgfSA9IG1vY2tDb25maWdcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogTUVTU0FHRV9UWVBFUy5TRVRfTE9BRElORyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlY3JldDogJ3hoci10by1jb250ZW50JyxcbiAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgIHJvdXRlOiB7IC4uLm1vY2tDb25maWcsIHVybDogcmVzcG9uc2VVUkwsIHRpbWU6IG5ldyBEYXRlKCksIHhoclR5cGU6ICdmZXRjaCcgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgYXdhaXQgZGVsYXlQcm9taXNlKGRlbGF5KVxuICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSwge1xuICAgICAgICBoZWFkZXJzOiBlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzID8gSlNPTi5wYXJzZShtb2NrUmVzcG9uc2VIZWFkZXJzKSA6IHt9LFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlU3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiAnJ1xuICAgICAgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXMsICd1cmwnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogam9pbnRVcmwodXJsKSB9KVxuICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBNRVNTQUdFX1RZUEVTLlNFVF9MT0FESU5HLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2VjcmV0OiAneGhyLXRvLWNvbnRlbnQnLFxuICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gcmVzXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhd2FpdCBvcmlnaW5hbEZldGNoKC4uLmFyZ3MpXG4gICAgfVxuICB9XG59KSgpXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgY29udmVydERpY3RUb0FycmF5IH0gZnJvbSAnfmFwcC91dGlscydcblxuaW1wb3J0IHsgSFRUUF9TVEFUVVNfQ09ERSwgSFRUUF9TVEFUVVNfQ09ERV9ESUNUIH0gZnJvbSAnLi9odHRwU3RhdHVzJ1xuXG5leHBvcnQgY29uc3QgTUVTU0FHRV9UWVBFUyA9IHtcbiAgTUFUQ0hJTkdfVVBEQVRFOiAnbWF0Y2hpbmdVcGRhdGUnLFxuICBTRVRfTE9BRElORzogJ3NldExvYWRpbmcnLFxuICBTRVRfUkVDT1JEOiAnc2V0UmVjb3JkJyxcbn1cblxuZXhwb3J0IGVudW0gT1BFUkFURV9UWVBFIHtcbiAgRURJVCA9ICdlZGl0JyxcbiAgREVMRVRFID0gJ2RlbGV0ZScsXG4gIFVQREFURV9SRUNPUkQgPSAndXBkYXRlUmVjb3JkJyxcbiAgVE9QID0gJ3RvcCcsXG4gIENMT05FID0gJ2Nsb25lJ1xufVxuZXhwb3J0IGVudW0gUkVRVUVTVF9UWVBFIHtcbiAgQUxMID0gJyonLFxuICBHRVQgPSAnZ2V0JyxcbiAgUE9TVCA9ICdwb3N0JywgLy8g5ZCR5pyN5Yqh5Zmo5o+Q5Lqk5pWw5o2u44CCXG4gIFBVVCA9ICdwdXQnLCAvLyDlkJHmnI3liqHlmajkuIrkvKDmm7TmlrDmlbDmja7jgIJcbiAgREVMRVRFID0gJ2RlbGV0ZScsIC8vIOivt+axguacjeWKoeWZqOWIoOmZpOaMh+WumueahOi1hOa6kOOAglxuICBIRUFEID0gJ2hlYWQnLCAvLyDnsbvkvLzkuo4gR0VUIOivt+axgu+8jOS9huWPqui/lOWbnummlumDqO+8jOS4jei/lOWbnuWunumZheWGheWuueOAglxuICBPUFRJT05TID0gJ29wdGlvbnMnLCAvLyDnlKjkuo7mj4/ov7Dlr7nnm67moIfotYTmupDnmoTpgJrkv6HpgInpobnjgIJcbiAgUEFUQ0ggPSAncGF0Y2gnLCAvLyDnlKjkuo7lr7notYTmupDov5vooYzlsYDpg6jkv67mlLnvvIzljbPlr7notYTmupDnmoTpg6jliIblhoXlrrnov5vooYzmm7TmlrDmiJbkv67mlLlcbiAgVFJBQ0UgPSAndHJhY2UnIC8vIOWbnuaYvuacjeWKoeWZqOaUtuWIsOeahOivt+axgu+8jOS4u+imgeeUqOS6jua1i+ivleaIluiviuaWreOAglxufVxuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVFlQRV9ESUNUID0ge1xuICBbUkVRVUVTVF9UWVBFLkFMTF06ICfkuI3pmZAnLFxuICBbUkVRVUVTVF9UWVBFLkdFVF06ICdHRVQnLFxuICBbUkVRVUVTVF9UWVBFLlBPU1RdOiAnUE9TVCcsXG4gIFtSRVFVRVNUX1RZUEUuUFVUXTogJ1BVVCcsXG4gIFtSRVFVRVNUX1RZUEUuREVMRVRFXTogJ0RFTEVURScsXG4gIFtSRVFVRVNUX1RZUEUuSEVBRF06ICdIRUFEJyxcbiAgW1JFUVVFU1RfVFlQRS5PUFRJT05TXTogJ09QVElPTlMnLFxuICBbUkVRVUVTVF9UWVBFLlBBVENIXTogJ1BBVENIJyxcbiAgW1JFUVVFU1RfVFlQRS5UUkFDRV06ICdUUkFDRSdcbn1cbmV4cG9ydCBjb25zdCBSRVFVRVNUX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShSRVFVRVNUX1RZUEVfRElDVClcblxuZXhwb3J0IGVudW0gUFJPWFlfUk9VVEVfS0VZIHtcbiAgSUQgPSAnaWQnLFxuICBNT0NLX1RZUEUgPSAnbW9ja1R5cGUnLFxuICBFTkFCTEUgPSAnZW5hYmxlJyxcbiAgTUFUQ0hfVFlQRSA9ICdtYXRjaFR5cGUnLFxuICBSRVFVRVNUX1RZUEUgPSAncmVxdWVzdFR5cGUnLFxuICBSRVNQT05TRV9TVEFUVVMgPSAncmVzcG9uc2VTdGF0dXMnLFxuICBSRURJUkVDVF9VUkwgPSAncmVkaXJlY3RVcmwnLFxuICBERUxBWSA9ICdkZWxheScsXG4gIFVSTCA9ICd1cmwnLFxuICBHUk9VUCA9ICdncm91cCcsXG4gIE5BTUUgPSAnbmFtZScsXG4gIFJFU1BPTlNFID0gJ3Jlc3BvbnNlJyxcbiAgTU9DS19SRVFVRVNUX0hFQURFUlMgPSAnbW9ja1JlcXVlc3RIZWFkZXJzJyxcbiAgRU5BQkxFX01PQ0tfUkVRVUVTVF9IRUFERVJTID0gJ2VuYWJsZU1vY2tSZXF1ZXN0SGVhZGVycycsXG4gIFJFUVVFU1RfSEVBREVSUyA9ICdyZXF1ZXN0SGVhZGVycycsXG4gIE1PQ0tfUkVTUE9OU0VfSEVBREVSUyA9ICdtb2NrUmVzcG9uc2VIZWFkZXJzJyxcbiAgRU5BQkxFX01PQ0tfUkVTUE9OU0VfSEVBREVSUyA9ICdlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzJyxcbiAgUkVTUE9OU0VfSEVBREVSUyA9ICdyZXNwb25zZUhlYWRlcnMnXG59XG5leHBvcnQgdHlwZSBQUk9YWV9ST1VURV9JVEVNID0ge1xuICBbUFJPWFlfUk9VVEVfS0VZLklEXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuTU9DS19UWVBFXTogTU9DS19UWVBFXG4gIFtQUk9YWV9ST1VURV9LRVkuRU5BQkxFXTogYm9vbGVhblxuICBbUFJPWFlfUk9VVEVfS0VZLk1BVENIX1RZUEVdOiBNQVRDSF9UWVBFXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVRVUVTVF9UWVBFXTogUkVRVUVTVF9UWVBFXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVTUE9OU0VfU1RBVFVTXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVESVJFQ1RfVVJMXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuREVMQVldOiBudW1iZXJcbiAgW1BST1hZX1JPVVRFX0tFWS5VUkxdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5HUk9VUF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLk5BTUVdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV06IHVuZGVmaW5lZCB8IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFUVVFU1RfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVTUE9OU0VfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuTU9DS19SRVFVRVNUX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV9NT0NLX1JFUVVFU1RfSEVBREVSU106IGJvb2xlYW5cbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1JFU1BPTlNFX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV9NT0NLX1JFU1BPTlNFX0hFQURFUlNdOiBib29sZWFuXG59XG5cbmV4cG9ydCBlbnVtIE1PQ0tfVFlQRSB7XG4gIE5PUk1BTCA9ICdub3JtYWwnLFxuICBSRURJUkVDVCA9ICdyZWRpcmVjdCcsXG4gIE1PRElGWV9IRUFERVJTID0gJ21vZGlmeUhlYWRlcnMnXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX0RJQ1QgPSB7XG4gIFtNT0NLX1RZUEUuTk9STUFMXTogJ01vY2snLFxuICBbTU9DS19UWVBFLlJFRElSRUNUXTogJ1JlZGlyZWN0JyxcbiAgW01PQ0tfVFlQRS5NT0RJRllfSEVBREVSU106ICdNb2RpZnlIZWFkZXJzJ1xufVxuZXhwb3J0IGNvbnN0IE1PQ0tfVFlQRV9ESUNUX1NIQURPVyA9IHtcbiAgW01PQ0tfVFlQRS5OT1JNQUxdOlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgJzJweCAycHggNjhweCAwcHggcmdiYSgxNDUsIDE5MiwgMjU1LCAwLjUpLCBpbnNldCAtOHB4IC04cHggMTZweCAwcHggcmdiYSgxNDUsIDE5MiwgMjU1LCAwLjYpLCBpbnNldCAwcHggMTFweCAyOHB4IDBweCByZ2IoMjU1LCAyNTUsIDI1NSknLFxuICBbTU9DS19UWVBFLlJFRElSRUNUXTpcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICcycHggMnB4IDY4cHggMHB4IHJnYmEoMTg5LCAxNiwgMjI0LCAwLjUpLCBpbnNldCAtOXB4IC05cHggMTZweCAwcHggcmdiYSgxODksIDE2LCAyMjQsIDAuNiksIGluc2V0IDBweCAxMXB4IDI4cHggMHB4IHJnYigyNTUsIDI1NSwgMjU1KScsXG4gIFtNT0NLX1RZUEUuTU9ESUZZX0hFQURFUlNdOlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgJzJweCAycHggNjhweCAwcHggcmdiYSgxODQsIDIzMywgMTM0LCAwLjUpLCBpbnNldCAtOHB4IC04cHggMTZweCAwcHggcmdiYSgxODQsIDIzMywgMTM0LCAwLjYpLCBpbnNldCAwcHggMTFweCAyOHB4IDBweCByZ2IoMjU1LCAyNTUsIDI1NSknXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoTU9DS19UWVBFX0RJQ1QpXG5cbmV4cG9ydCBlbnVtIE1BVENIX1RZUEUge1xuICBDT05UQUlOUyA9ICdjb250YWlucycsXG4gIEVRVUFMUyA9ICdlcXVhbHMnLFxuICBSRUdFWFAgPSAncmVnZXhwJ1xufVxuZXhwb3J0IGNvbnN0IE1BVENIX1RZUEVfRElDVCA9IHtcbiAgW01BVENIX1RZUEUuQ09OVEFJTlNdOiAnY29udGFpbnMnLFxuICBbTUFUQ0hfVFlQRS5FUVVBTFNdOiAnZXF1YWxzJyxcbiAgW01BVENIX1RZUEUuUkVHRVhQXTogJ3JlZ2V4cCdcbn1cblxuZXhwb3J0IGVudW0gUmVzb3VyY2VUeXBlIHtcbiAgTUFJTl9GUkFNRSA9ICdtYWluX2ZyYW1lJyxcbiAgU1VCX0ZSQU1FID0gJ3N1Yl9mcmFtZScsXG4gIFNUWUxFU0hFRVQgPSAnc3R5bGVzaGVldCcsXG4gIFNDUklQVCA9ICdzY3JpcHQnLFxuICBJTUFHRSA9ICdpbWFnZScsXG4gIEZPTlQgPSAnZm9udCcsXG4gIE9CSkVDVCA9ICdvYmplY3QnLFxuICBYTUxIVFRQUkVRVUVTVCA9ICd4bWxodHRwcmVxdWVzdCcsXG4gIFBJTkcgPSAncGluZycsXG4gIENTUF9SRVBPUlQgPSAnY3NwX3JlcG9ydCcsXG4gIE1FRElBID0gJ21lZGlhJyxcbiAgV0VCU09DS0VUID0gJ3dlYnNvY2tldCcsXG4gIE9USEVSID0gJ290aGVyJyxcbiAgV0VCQlVORExFID0gJ3dlYmJ1bmRsZScsXG4gIFdFQlRSQU5TUE9SVCA9ICd3ZWJ0cmFuc3BvcnQnXG59XG5cbmV4cG9ydCBlbnVtIFJ1bGVBY3Rpb25UeXBlIHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBSRURJUkVDVCA9ICdyZWRpcmVjdCcsXG4gIEFMTE9XID0gJ2FsbG93JyxcbiAgVVBHUkFERV9TQ0hFTUUgPSAndXBncmFkZVNjaGVtZScsXG4gIE1PRElGWV9IRUFERVJTID0gJ21vZGlmeUhlYWRlcnMnLFxuICBBTExPV19BTExfUkVRVUVTVFMgPSAnYWxsb3dBbGxSZXF1ZXN0cydcbn1cblxuZXhwb3J0IGNvbnN0IE1BVENIX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShNQVRDSF9UWVBFX0RJQ1QpXG5cbmV4cG9ydCBjb25zdCBIVFRQX1NUQVRVU19DT0RFX09QVElPTlMgPSBPYmplY3Qua2V5cyhIVFRQX1NUQVRVU19DT0RFX0RJQ1QpLm1hcCgodikgPT4gKHtcbiAgdmFsdWU6ICt2LFxuICBsYWJlbDogYCR7dn0gJHtIVFRQX1NUQVRVU19DT0RFX0RJQ1Rbdl19YFxufSkpXG5cbmV4cG9ydCBlbnVtIEdMT0JBTF9WQVJJQUJMRSB7XG4gIENIUk9NRV9QTFVTX09SSUdJTkFMX1hIUiA9ICdDSFJPTUVfUExVU19PUklHSU5BTF9YSFInLFxuICBDSFJPTUVfUExVU19SRVFVRVNUX01BUCA9ICdDSFJPTUVfUExVU19SRVFVRVNUX01BUCcsXG4gIENIUk9NRV9QTFVTX1BST1hZX1hIUiA9ICdDSFJPTUVfUExVU19QUk9YWV9YSFInLFxuICBDSFJPTUVfUExVU19QUk9YWV9ST1VURVMgPSAnQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTJ1xufVxuZXhwb3J0IGNvbnN0IEdMT0JBTF9WQVJJQUJMRV9NQVAgPSB7XG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSXTogJ0NIUk9NRV9QTFVTX09SSUdJTkFMX1hIUicsXG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUkVRVUVTVF9NQVBdOiAnQ0hST01FX1BMVVNfUkVRVUVTVF9NQVAnLFxuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1BST1hZX1hIUl06ICdDSFJPTUVfUExVU19QUk9YWV9YSFInLFxuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1BST1hZX1JPVVRFU106ICdDSFJPTUVfUExVU19QUk9YWV9ST1VURVMnXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVFU1RfSEVBREVSU19LRVlTID0gW1xuICAnQWNjZXB0JywgLy8gQWNjZXB0YWJsZSByZXNwb25zZSBDb250ZW50LVR5cGVzXG4gICdBY2NlcHQtQ2hhcnNldCcsIC8vIEFjY2VwdGFibGUgY2hhcmFjdGVyIHNldHNcbiAgJ0FjY2VwdC1FbmNvZGluZycsIC8vIEFjY2VwdGFibGUgcmVzcG9uc2UgY29udGVudCBlbmNvZGluZ1xuICAnQWNjZXB0LUxhbmd1YWdlJywgLy8gQWNjZXB0YWJsZSByZXNwb25zZSBjb250ZW50IGxhbmd1YWdlc1xuICAnQWNjZXB0LURhdGV0aW1lJywgLy8gQWNjZXB0YWJsZSB2ZXJzaW9uIG9mIHRoZSBjb250ZW50IGJhc2VkIG9uIGRhdGV0aW1lXG4gICdBdXRob3JpemF0aW9uJywgLy8gQXV0aG9yaXphdGlvbiBpbmZvcm1hdGlvbiBmb3IgYXV0aGVudGljYXRlZCByZXNvdXJjZXNcbiAgJ0NhY2hlLUNvbnRyb2wnLCAvLyBDYWNoZSBjb250cm9sIGRpcmVjdGl2ZXNcbiAgJ0Nvbm5lY3Rpb24nLCAvLyBQcmVmZXJyZWQgdHlwZSBvZiBjb25uZWN0aW9uXG4gICdDb29raWUnLCAvLyBIVFRQIENvb2tpZSBmcm9tIHNlcnZlcidzIFNldC1Db29raWVcbiAgJ0NvbnRlbnQtTGVuZ3RoJywgLy8gTGVuZ3RoIG9mIHRoZSByZXF1ZXN0IGJvZHkgaW4gb2N0YWxcbiAgJ0NvbnRlbnQtTUQ1JywgLy8gTUQ1IGhhc2ggb2YgcmVxdWVzdCBib2R5IGNvbnRlbnQsIEJhc2U2NCBlbmNvZGVkXG4gICdDb250ZW50LVR5cGUnLCAvLyBNSU1FIHR5cGUgb2YgdGhlIHJlcXVlc3QgYm9keVxuICAnRGF0ZScsIC8vIERhdGUgYW5kIHRpbWUgdGhlIG1lc3NhZ2Ugd2FzIHNlbnRcbiAgJ0V4cGVjdCcsIC8vIEV4cGVjdGVkIHNlcnZlciBiZWhhdmlvclxuICAnRnJvbScsIC8vIEVtYWlsIGFkZHJlc3Mgb2YgdGhlIHJlcXVlc3QncyB1c2VyXG4gICdIb3N0JywgLy8gU2VydmVyIGRvbWFpbiBuYW1lIGFuZCBwb3J0IG51bWJlclxuICAnSWYtTWF0Y2gnLCAvLyBPbmx5IHBlcmZvcm0gdGhlIGFjdGlvbiBpZiB0aGUgY2xpZW50J3MgZW50aXR5IG1hdGNoZXMgdGhlIHNlcnZlcidzIGVudGl0eVxuICAnSWYtTW9kaWZpZWQtU2luY2UnLCAvLyBBbGxvd3MgYSAzMDQgTm90IE1vZGlmaWVkIHRvIGJlIHJldHVybmVkIGlmIGNvbnRlbnQgaXMgdW5jaGFuZ2VkXG4gICdJZi1Ob25lLU1hdGNoJywgLy8gQWxsb3dzIGEgMzA0IE5vdCBNb2RpZmllZCB0byBiZSByZXR1cm5lZCBpZiBjb250ZW50IGlzIHVuY2hhbmdlZFxuICAnSWYtUmFuZ2UnLCAvLyBTZW5kIHRoZSBwYXJ0cyB0aGF0IGFyZSBtaXNzaW5nIGlmIHRoZSBlbnRpdHkgaXMgdW5jaGFuZ2VkLCBvdGhlcndpc2Ugc2VuZCB0aGUgZW50aXJlIG5ldyBlbnRpdHlcbiAgJ0lmLVVubW9kaWZpZWQtU2luY2UnLCAvLyBPbmx5IHNlbmQgdGhlIHJlc3BvbnNlIGlmIHRoZSBlbnRpdHkgaGFzIG5vdCBiZWVuIG1vZGlmaWVkIHNpbmNlIGEgc3BlY2lmaWMgdGltZVxuICAnTWF4LUZvcndhcmRzJywgLy8gTGltaXRzIHRoZSBudW1iZXIgb2YgdGltZXMgYSBtZXNzYWdlIGNhbiBiZSBmb3J3YXJkZWQgdGhyb3VnaCBwcm94aWVzIG9yIGdhdGV3YXlzXG4gICdPcmlnaW4nLCAvLyBJbml0aWF0ZXMgYSByZXF1ZXN0IGZvciBjcm9zcy1vcmlnaW4gcmVzb3VyY2Ugc2hhcmluZyAoQ09SUylcbiAgJ1ByYWdtYScsIC8vIEltcGxlbWVudGF0aW9uLXNwZWNpZmljIGhlYWRlcnMgdGhhdCBtYXkgaGF2ZSB2YXJpb3VzIGVmZmVjdHMgYW55d2hlcmUgYWxvbmcgdGhlIHJlcXVlc3QtcmVzcG9uc2UgY2hhaW5cbiAgJ1Byb3h5LUF1dGhvcml6YXRpb24nLCAvLyBBdXRob3JpemF0aW9uIGNyZWRlbnRpYWxzIGZvciBjb25uZWN0aW5nIHRvIGEgcHJveHlcbiAgJ1JhbmdlJywgLy8gUmVxdWVzdCBhIHBvcnRpb24gb2YgYW4gZW50aXR5LCBieXRlIG9mZnNldHMgc3RhcnQgYXQgemVyb1xuICAnUmVmZXJlcicsIC8vIEFkZHJlc3Mgb2YgdGhlIHByZXZpb3VzIHdlYiBwYWdlIGZyb20gd2hpY2ggYSBsaW5rIHRvIHRoZSBjdXJyZW50bHkgcmVxdWVzdGVkIHBhZ2Ugd2FzIGZvbGxvd2VkXG4gICdURScsIC8vIEFjY2VwdGFibGUgZW5jb2RpbmdzIGZvciB0cmFuc2ZlclxuICAnVXNlci1BZ2VudCcsIC8vIEJyb3dzZXIgaWRlbnRpZmljYXRpb24gc3RyaW5nXG4gICdVcGdyYWRlJywgLy8gQXNrIHRoZSBzZXJ2ZXIgdG8gdXBncmFkZSB0byBhbm90aGVyIHByb3RvY29sXG4gICdWaWEnLCAvLyBJbmZvcm1zIHRoZSBzZXJ2ZXIgb2YgcHJveGllcyB0aHJvdWdoIHdoaWNoIHRoZSByZXF1ZXN0IHdhcyBzZW50XG4gICdXYXJuaW5nJyAvLyBHZW5lcmFsIHdhcm5pbmcgYWJvdXQgcG9zc2libGUgZXJyb3JzIGluIHRoZSBlbnRpdHkgYm9keVxuXVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVTUE9OU0VfSEVBREVSU19LRVlTID0gW1xuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgLy8g5oyH56S65ZOq5Lqb572R56uZ5Y+v5Lul5Y+C5LiO6Leo5rqQ6K6/6Zeu44CC5a6D55qE5YC85Y+v5Lul5piv5LiA5Liq5YW35L2T55qEVVJJ77yM5oiW6ICFKuihqOekuuWFgeiuuOS7u+S9leWfn+eahOiuv+mXruOAglxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsIC8vIOaMh+WumuWFgeiuuOi3qOa6kOivt+axgueahEhUVFDmlrnms5XvvIzlpoJHRVQsIFBPU1QsIFBVVOetieOAglxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsIC8vIOWcqOmihOajgOivt+axguS4reS9v+eUqO+8jOaMh+WumuWFgeiuuOeahOiHquWumuS5ieivt+axguWktOOAglxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnLCAvLyDooajnpLrmmK/lkKblhYHorrjlj5HpgIFDb29raWXjgILlj6rmnInlvZPlgLzkuLp0cnVl5pe277yM5rWP6KeI5Zmo5omN5Lya5Y+R6YCBQ29va2ll44CCXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdBY2Nlc3MtQ29udHJvbC1FeHBvc2UtSGVhZGVycycsIC8vIOWFgeiuuOa1j+iniOWZqOiuv+mXrueahOacjeWKoeerr+WTjeW6lOWktOWIl+ihqO+8jOmZpOS6huWFreS4quWfuuacrOeahOWTjeW6lOWktO+8iENhY2hlLUNvbnRyb2wsIENvbnRlbnQtTGFuZ3VhZ2UsIENvbnRlbnQtVHlwZSwgRXhwaXJlcywgTGFzdC1Nb2RpZmllZCwg5ZKMIFByYWdtYe+8ieS5i+WkluOAglxuICAnQWNjZXNzLUNvbnRyb2wtTWF4LUFnZScsIC8vICDooajnpLrpooTmo4Dor7fmsYLnmoTnu5Pmnpzog73lpJ/ooqvnvJPlrZjlpJrplb/ml7bpl7TvvIjku6Xnp5LkuLrljZXkvY3vvInjgIJcbiAgJ0FjY2VwdC1QYXRjaCcsIC8vIFNwZWNpZmllcyB0aGUgcGF0Y2ggZG9jdW1lbnQgZm9ybWF0cyBhY2NlcHRlZCBieSB0aGUgc2VydmVyXG4gICdBY2NlcHQtUmFuZ2VzJywgLy8gU3BlY2lmaWVzIHRoZSByYW5nZSBvZiBieXRlcyB0aGF0IHRoZSBzZXJ2ZXIgY2FuIGhhbmRsZVxuICAnQWdlJywgLy8gVGhlIHRpbWUsIGluIHNlY29uZHMsIHRoYXQgdGhlIG9iamVjdCBoYXMgYmVlbiBpbiBhIHByb3h5IGNhY2hlXG4gICdBbGxvdycsIC8vIFZhbGlkIGFjdGlvbnMgZm9yIGEgc3BlY2lmaWMgcmVzb3VyY2VcbiAgJ0NhY2hlLUNvbnRyb2wnLCAvLyBEaXJlY3RpdmVzIGZvciBjYWNoaW5nIG1lY2hhbmlzbXMgaW4gYm90aCByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICdDb25uZWN0aW9uJywgLy8gT3B0aW9ucyBkZXNpcmVkIGZvciB0aGUgY29ubmVjdGlvblxuICAnQ29udGVudC1EaXNwb3NpdGlvbicsIC8vIERpcmVjdHMgdGhlIGJyb3dzZXIgdG8gZGlzcGxheSB0aGUgZmlsZSBhcyBhbiBhdHRhY2htZW50IGZvciBkb3dubG9hZFxuICAnQ29udGVudC1FbmNvZGluZycsIC8vIFRoZSB0eXBlIG9mIGVuY29kaW5nIHVzZWQgb24gdGhlIGRhdGFcbiAgJ0NvbnRlbnQtTGFuZ3VhZ2UnLCAvLyBUaGUgbGFuZ3VhZ2UgdGhlIGNvbnRlbnQgaXMgaW5cbiAgJ0NvbnRlbnQtTGVuZ3RoJywgLy8gVGhlIGxlbmd0aCBvZiB0aGUgcmVzcG9uc2UgYm9keSBpbiBvY3RldHMgKDgtYml0IGJ5dGVzKVxuICAnQ29udGVudC1Mb2NhdGlvbicsIC8vIEFuIGFsdGVybmF0ZSBsb2NhdGlvbiBmb3IgdGhlIHJldHVybmVkIGRhdGFcbiAgJ0NvbnRlbnQtTUQ1JywgLy8gQSBCYXNlNjQtZW5jb2RlZCBiaW5hcnkgTUQ1IHN1bSBvZiB0aGUgY29udGVudCBvZiB0aGUgcmVzcG9uc2UgKGRlcHJlY2F0ZWQpXG4gICdDb250ZW50LVJhbmdlJywgLy8gV2hlcmUgaW4gdGhlIGZ1bGwgY29udGVudCB0aGlzIHBhcnRpYWwgbWVzc2FnZSBiZWxvbmdzXG4gICdDb250ZW50LVR5cGUnLCAvLyBUaGUgTUlNRSB0eXBlIG9mIHRoaXMgY29udGVudFxuICAnRGF0ZScsIC8vIFRoZSBkYXRlIGFuZCB0aW1lIGF0IHdoaWNoIHRoZSBtZXNzYWdlIHdhcyBzZW50XG4gICdFVGFnJywgLy8gQW4gaWRlbnRpZmllciBmb3IgYSBzcGVjaWZpYyB2ZXJzaW9uIG9mIGEgcmVzb3VyY2VcbiAgJ0V4cGlyZXMnLCAvLyBUaGUgZGF0ZS90aW1lIGFmdGVyIHdoaWNoIHRoZSByZXNwb25zZSBpcyBjb25zaWRlcmVkIHN0YWxlXG4gICdMYXN0LU1vZGlmaWVkJywgLy8gVGhlIGxhc3QgbW9kaWZpY2F0aW9uIGRhdGUgb2YgdGhlIHJlc291cmNlIHRoYXQgd2FzIHJlcXVlc3RlZFxuICAnTGluaycsIC8vIFVzZWQgdG8gZXhwcmVzcyBhIHR5cGVkIHJlbGF0aW9uc2hpcCB3aXRoIGFub3RoZXIgcmVzb3VyY2VcbiAgJ0xvY2F0aW9uJywgLy8gVXNlZCBpbiByZWRpcmVjdGlvbiwgb3Igd2hlbiBhIG5ldyByZXNvdXJjZSBoYXMgYmVlbiBjcmVhdGVkXG4gICdQM1AnLCAvLyBQM1AgcG9saWN5XG4gICdQcmFnbWEnLCAvLyBJbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBoZWFkZXJzIHRoYXQgbWF5IGhhdmUgdmFyaW91cyBlZmZlY3RzXG4gICdQcm94eS1BdXRoZW50aWNhdGUnLCAvLyBSZXF1ZXN0IGZvciBhdXRoZW50aWNhdGlvbiB0byBhY2Nlc3MgdGhlIHByb3h5XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdQdWJsaWMtS2V5LVBpbnMnLCAvLyBIVFRQIFB1YmxpYyBLZXkgUGlubmluZywgdXNlZCB0byBjb252ZXkgYSBjb21taXRtZW50IHRvIGEgY3J5cHRvZ3JhcGhpYyBpZGVudGl0eSBmb3IgYSBjZXJ0YWluIHBlcmlvZCBvZiB0aW1lXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICdSZWZyZXNoJywgLy8gVXNlZCBmb3IgcmVkaXJlY3Rpb24gb3Igd2hlbiBhIG5ldyByZXNvdXJjZSBoYXMgYmVlbiBjcmVhdGVkIGFuZCBzaG91bGQgYmUgcmV0cmlldmVkIGFmdGVyIGEgY2VydGFpbiB0aW1lIGludGVydmFsXG4gICdSZXRyeS1BZnRlcicsIC8vIEluZGljYXRlcyBob3cgbG9uZyB0aGUgdXNlciBhZ2VudCBzaG91bGQgd2FpdCBiZWZvcmUgbWFraW5nIGEgZm9sbG93LXVwIHJlcXVlc3RcbiAgJ1NlcnZlcicsIC8vIEEgbmFtZSBmb3IgdGhlIHNlcnZlclxuICAnU2V0LUNvb2tpZScsIC8vIEFuIEhUVFAgY29va2llXG4gICdTdGF0dXMnLCAvLyBDR0kgaGVhZGVyIGZpZWxkIHVzZWQgdG8gZGVmaW5lIHRoZSBzdGF0dXMgb2YgYSBIVFRQIHJlc3BvbnNlXG4gICdUcmFpbGVyJywgLy8gVGhlIGhlYWRlciBmaWVsZHMgcHJlc2VudCBpbiB0aGUgdHJhaWxlciBvZiBhIG1lc3NhZ2UgZW5jb2RlZCB3aXRoIGNodW5rZWQgdHJhbnNmZXItY29kaW5nXG4gICdUcmFuc2Zlci1FbmNvZGluZycsIC8vIFRoZSBmb3JtIG9mIGVuY29kaW5nIHVzZWQgdG8gc2FmZWx5IHRyYW5zZmVyIHRoZSBlbnRpdHkgdG8gdGhlIHVzZXJcbiAgJ1VwZ3JhZGUnLCAvLyBBc2sgdGhlIGNsaWVudCB0byBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgcHJvdG9jb2xcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgJ1ZhcnknLCAvLyBUZWxscyBkb3duc3RyZWFtIHByb3hpZXMgaG93IHRvIG1hdGNoIGZ1dHVyZSByZXF1ZXN0IGhlYWRlcnMgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIGNhY2hlZCByZXNwb25zZSBjYW4gYmUgdXNlZCByYXRoZXIgdGhhbiByZXF1ZXN0aW5nIGEgZnJlc2ggb25lIGZyb20gdGhlIG9yaWdpbiBzZXJ2ZXJcbiAgJ1ZpYScsIC8vIEluZm9ybXMgdGhlIGNsaWVudCBvZiBwcm94aWVzIHRocm91Z2ggd2hpY2ggdGhlIHJlc3BvbnNlIHdhcyBzZW50XG4gICdXYXJuaW5nJywgLy8gQSBnZW5lcmFsIHdhcm5pbmcgYWJvdXQgcG9zc2libGUgcHJvYmxlbXMgd2l0aCB0aGUgZW50aXR5IGJvZHlcbiAgJ1dXVy1BdXRoZW50aWNhdGUnIC8vIEluZGljYXRlcyB0aGUgYXV0aGVudGljYXRpb24gc2NoZW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSByZXF1ZXN0ZWQgZW50aXR5XG5dXG5leHBvcnQgZGVmYXVsdCB7XG4gIFBST1hZX1JPVVRFX0tFWSxcbiAgTU9DS19UWVBFLFxuICBNT0NLX1RZUEVfRElDVCxcbiAgTU9DS19UWVBFX09QVElPTlMsXG4gIE1BVENIX1RZUEUsXG4gIEhUVFBfU1RBVFVTX0NPREUsXG4gIE1FU1NBR0VfVFlQRVMsXG4gIEdMT0JBTF9WQVJJQUJMRV9NQVBcbn1cbiIsImV4cG9ydCBjb25zdCBsb2cgPSAoZGF0YSkgPT4gY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKGBjb25zb2xlLmxvZygnJHtKU09OLnN0cmluZ2lmeShkYXRhKX0nKWApXG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RGljdFRvQXJyYXkoXG4gIGRpY3Q6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgfSxcbiAgY29uZmlnOiBzdHJpbmdbXSA9IFsndmFsdWUnLCAnbGFiZWwnXVxuKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVtdIHtcbiAgY29uc3QgW2tleU5hbWUgPSAndmFsdWUnLCB2YWx1ZU5hbWUgPSAnbGFiZWwnXSA9IGNvbmZpZ1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZGljdCkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XG4gICAgW2tleU5hbWVdOiBrZXksXG4gICAgW3ZhbHVlTmFtZV06IHZhbHVlXG4gIH0pKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGpvaW50VXJsKHVybCkge1xuICB0cnkge1xuICAgIC8vIOWwneivleWIm+W7uuS4gOS4qlVSTOWvueixoVxuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwodXJsKVxuXG4gICAgLy8g5qOA5p+l5Y2P6K6u5piv5ZCm5Li6aHR0cOaIlmh0dHBzXG4gICAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHA6JyB8fCBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonKSB7XG4gICAgICByZXR1cm4gdXJsIC8vIOi/lOWbnuWOn1VSTO+8jOWboOS4uuWug+aYr+S4gOS4quacieaViOeahEhUVFAoUynlnLDlnYBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHByb3RvY29sJykgLy8g5oqb5Ye66ZSZ6K+v77yM5aSE55CG6Z2eSFRUUChTKeWNj+iurlxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyDlpoLmnpxVUkzmnoTpgKDlpLHotKXmiJbljY/orq7kuI3mraPnoa7vvIzliJnov5Tlm57kv67mraPlkI7nmoRVUkxcbiAgICByZXR1cm4gbG9jYXRpb24ub3JpZ2luICsgdXJsXG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Ub3AoYXJyLCBpbmRleCkge1xuICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGFyci5sZW5ndGgpIHtcbiAgICAvLyDku47mjIflrprntKLlvJXkvY3nva7np7vpmaTlhYPntKBcbiAgICBjb25zdCBbaXRlbV0gPSBhcnIuc3BsaWNlKGluZGV4LCAxKVxuICAgIC8vIOWwhuivpeWFg+e0oOaPkuWFpeWIsOaVsOe7hOeahOW8gOWktFxuICAgIGFyci51bnNoaWZ0KGl0ZW0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHREZWNyeXB0KGlucHV0OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gIC8vIOWwhui+k+WFpeWtl+espuS4sui9rOaNouS4uuWtl+espueggeaVsOe7hFxuICBjb25zdCBpbnB1dENoYXJzID0gQXJyYXkuZnJvbShpbnB1dCkubWFwKChjaGFyKSA9PiBjaGFyLmNoYXJDb2RlQXQoMCkpXG5cbiAgLy8g55Sf5oiQ5a+G6ZKl55qE5a2X56ym56CB5pWw57uEXG4gIGNvbnN0IGtleUNoYXJzID0gQXJyYXkuZnJvbShrZXkpLm1hcCgoY2hhcikgPT4gY2hhci5jaGFyQ29kZUF0KDApKVxuXG4gIC8vIOaJp+ihjOW8guaIluWKoOWvhuaIluino+WvhlxuICBjb25zdCBvdXRwdXQgPSBpbnB1dENoYXJzLm1hcCgoY2hhciwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyIF4ga2V5Q2hhcnNbaW5kZXggJSBrZXlDaGFycy5sZW5ndGhdKVxuICB9KVxuXG4gIC8vIOWwhuWtl+espuaVsOe7hOi9rOaNouWbnuWtl+espuS4slxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbi8vIHR5cGUgSlNPTlZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IEpTT05PYmplY3QgfCBKU09OQXJyYXlcbi8vIGludGVyZmFjZSBKU09OT2JqZWN0IHtcbi8vICAgW2tleTogc3RyaW5nXTogSlNPTlZhbHVlXG4vLyB9XG4vLyBpbnRlcmZhY2UgSlNPTkFycmF5IGV4dGVuZHMgQXJyYXk8SlNPTlZhbHVlPiB7fVxuXG4vLyBmdW5jdGlvbiBqc29uVG9UeXBlU2NyaXB0VHlwZShqc29uOiBKU09OVmFsdWUsIHR5cGVOYW1lOiBzdHJpbmcgPSAnUm9vdCcpOiBzdHJpbmcge1xuLy8gICBpZiAodHlwZW9mIGpzb24gPT09ICdzdHJpbmcnKSB7XG4vLyAgICAgcmV0dXJuICdzdHJpbmcnXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb24gPT09ICdudW1iZXInKSB7XG4vLyAgICAgcmV0dXJuICdudW1iZXInXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb24gPT09ICdib29sZWFuJykge1xuLy8gICAgIHJldHVybiAnYm9vbGVhbidcbi8vICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4vLyAgICAgaWYgKGpzb24ubGVuZ3RoID09PSAwKSB7XG4vLyAgICAgICByZXR1cm4gJ2FueVtdJ1xuLy8gICAgIH1cbi8vICAgICBjb25zdCBhcnJheVR5cGUgPSBqc29uVG9UeXBlU2NyaXB0VHlwZShqc29uWzBdKVxuLy8gICAgIHJldHVybiBgJHthcnJheVR5cGV9W11gXG4vLyAgIH0gZWxzZSBpZiAodHlwZW9mIGpzb24gPT09ICdvYmplY3QnICYmIGpzb24gIT09IG51bGwpIHtcbi8vICAgICBsZXQgcmVzdWx0ID0gYGludGVyZmFjZSAke3R5cGVOYW1lfSB7XFxuYFxuLy8gICAgIGZvciAoY29uc3Qga2V5IGluIGpzb24pIHtcbi8vICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IGpzb25Ub1R5cGVTY3JpcHRUeXBlKGpzb25ba2V5XSwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGtleSkpXG4vLyAgICAgICByZXN1bHQgKz0gYCAgJHtrZXl9OiAke3ZhbHVlVHlwZX07XFxuYFxuLy8gICAgIH1cbi8vICAgICByZXN1bHQgKz0gJ30nXG4vLyAgICAgcmV0dXJuIHJlc3VsdFxuLy8gICB9IGVsc2Uge1xuLy8gICAgIHJldHVybiAnYW55J1xuLy8gICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4vLyAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSlcbi8vIH1cblxuLy8gLy8g56S65L6L55So5rOVXG4vLyBjb25zdCBqc29uRGF0YSA9IHtcbi8vICAgbmFtZTogJ0pvaG4nLFxuLy8gICBhZ2U6IDMwLFxuLy8gICBpc1N0dWRlbnQ6IGZhbHNlLFxuLy8gICBjb3Vyc2VzOiBbJ01hdGgnLCAnU2NpZW5jZSddLFxuLy8gICBhZGRyZXNzOiB7XG4vLyAgICAgc3RyZWV0OiAnMTIzIE1haW4gU3QnLFxuLy8gICAgIGNpdHk6ICdBbnl0b3duJ1xuLy8gICB9XG4vLyB9XG5cbi8vIGNvbnN0IHR5cGVTY3JpcHRUeXBlID0ganNvblRvVHlwZVNjcmlwdFR5cGUoanNvbkRhdGEpXG4vLyBjb25zb2xlLmxvZyh0eXBlU2NyaXB0VHlwZSlcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29udmVydERpY3RUb0FycmF5LFxuICBsb2csXG4gIGpvaW50VXJsLFxuICBtb3ZlVG9Ub3Bcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5leHBvcnQgZW51bSBIVFRQX1NUQVRVU19DT0RFIHtcbiAgQ09OVElOVUUgPSAxMDAsXG4gIFNXSVRDSElOR19QUk9UT0NPTFMgPSAxMDEsXG4gIFBST0NFU1NJTkcgPSAxMDIsXG5cbiAgT0sgPSAyMDAsXG4gIENSRUFURUQgPSAyMDEsXG4gIEFDQ0VQVEVEID0gMjAyLFxuICBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTiA9IDIwMyxcbiAgTk9fQ09OVEVOVCA9IDIwNCxcbiAgUkVTRVRfQ09OVEVOVCA9IDIwNSxcbiAgUEFSVElBTF9DT05URU5UID0gMjA2LFxuXG4gIE1VTFRJX1NUQVRVUyA9IDIwNyxcbiAgQUxSRUFEWV9SRVBPUlRFRCA9IDIwOCxcblxuICBJTV9VU0VEID0gMjI2LFxuXG4gIE1VTFRJUExFX0NIT0lDRVMgPSAzMDAsXG4gIE1PVkVEX1BFUk1BTkVOVExZID0gMzAxLFxuICBGT1VORCA9IDMwMixcbiAgU0VFX09USEVSID0gMzAzLFxuICBOT1RfTU9ESUZJRUQgPSAzMDQsXG4gIFVTRV9QUk9YWSA9IDMwNSxcbiAgVEVNUE9SQVJZX1JFRElSRUNUID0gMzA3LFxuICBQRVJNQU5FTlRfUkVESVJFQ1QgPSAzMDgsXG5cbiAgQkFEX1JFUVVFU1QgPSA0MDAsXG4gIFVOQVVUSE9SSVpFRCA9IDQwMSxcbiAgUEFZTUVOVF9SRVFVSVJFRCA9IDQwMixcbiAgRk9SQklEREVOID0gNDAzLFxuICBOT1RfRk9VTkQgPSA0MDQsXG4gIE1FVEhPRF9OT1RfQUxMT1dFRCA9IDQwNSxcbiAgTk9UX0FDQ0VQVEFCTEUgPSA0MDYsXG4gIFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEID0gNDA3LFxuICBSRVFVRVNUX1RJTUVPVVQgPSA0MDgsXG4gIENPTkZMSUNUID0gNDA5LFxuICBHT05FID0gNDEwLFxuICBMRU5HVEhfUkVRVUlSRUQgPSA0MTEsXG4gIFBSRUNPTkRJVElPTl9GQUlMRUQgPSA0MTIsXG4gIFBBWUxPQURfVE9PX0xBUkdFID0gNDEzLFxuICBVUklfVE9PX0xPTkcgPSA0MTQsXG4gIFVOU1VQUE9SVEVEX01FRElBX1RZUEUgPSA0MTUsXG4gIFJBTkdFX05PVF9TQVRJU0ZJQUJMRSA9IDQxNixcbiAgRVhQRUNUQVRJT05fRkFJTEVEID0gNDE3LFxuICBJX0FNX0FfVEVBUE9UID0gNDE4LFxuICBNSVNESVJFQ1RFRF9SRVFVRVNUID0gNDIxLFxuICBVTlBST0NFU1NBQkxFX0VOVElUWSA9IDQyMixcbiAgTE9DS0VEID0gNDIzLFxuICBGQUlMRURfREVQRU5ERU5DWSA9IDQyNCxcbiAgVVBHUkFERV9SRVFVSVJFRCA9IDQyNixcbiAgUFJFQ09ORElUSU9OX1JFUVVJUkVEID0gNDI4LFxuICBUT09fTUFOWV9SRVFVRVNUUyA9IDQyOSxcbiAgUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRSA9IDQzMSxcbiAgVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMgPSA0NTEsXG5cbiAgSU5URVJOQUxfU0VSVkVSX0VSUk9SID0gNTAwLFxuICBOT1RfSU1QTEVNRU5URUQgPSA1MDEsXG4gIEJBRF9HQVRFV0FZID0gNTAyLFxuICBTRVJWSUNFX1VOQVZBSUxBQkxFID0gNTAzLFxuICBHQVRFV0FZX1RJTUVPVVQgPSA1MDQsXG4gIEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEID0gNTA1LFxuICBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUyA9IDUwNixcbiAgSU5TVUZGSUNJRU5UX1NUT1JBR0UgPSA1MDcsXG4gIExPT1BfREVURUNURUQgPSA1MDgsXG4gIE5PVF9FWFRFTkRFRCA9IDUxMCxcbiAgTkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRCA9IDUxMVxufVxuZXhwb3J0IGNvbnN0IEhUVFBfU1RBVFVTX0NPREVfRElDVCA9IHtcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ09OVElOVUVdOiBcIkNvbnRpbnVlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNXSVRDSElOR19QUk9UT0NPTFNdOiBcIlN3aXRjaGluZyBQcm90b2NvbHNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJPQ0VTU0lOR106IFwiUHJvY2Vzc2luZ1wiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk9LXTogXCJPS1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5DUkVBVEVEXTogXCJDcmVhdGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkFDQ0VQVEVEXTogXCJBY2NlcHRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTl06IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9fQ09OVEVOVF06IFwiTm8gQ29udGVudFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SRVNFVF9DT05URU5UXTogXCJSZXNldCBDb250ZW50XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBBUlRJQUxfQ09OVEVOVF06IFwiUGFydGlhbCBDb250ZW50XCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuTVVMVElfU1RBVFVTXTogXCJNdWx0aS1TdGF0dXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQUxSRUFEWV9SRVBPUlRFRF06IFwiQWxyZWFkeSBSZXBvcnRlZFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1VTFRJUExFX0NIT0lDRVNdOiBcIk11bHRpcGxlIENob2ljZXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTU9WRURfUEVSTUFORU5UTFldOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZPVU5EXTogXCJGb3VuZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TRUVfT1RIRVJdOiBcIlNlZSBPdGhlclwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfTU9ESUZJRURdOiBcIk5vdCBNb2RpZmllZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VU0VfUFJPWFldOiBcIlVzZSBQcm94eVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5URU1QT1JBUllfUkVESVJFQ1RdOiBcIlRlbXBvcmFyeSBSZWRpcmVjdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QRVJNQU5FTlRfUkVESVJFQ1RdOiBcIlBlcm1hbmVudCBSZWRpcmVjdFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLkJBRF9SRVFVRVNUXTogXCJCYWQgUmVxdWVzdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTkFVVEhPUklaRURdOiBcIlVuYXV0aG9yaXplZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVlNRU5UX1JFUVVJUkVEXTogXCJQYXltZW50IFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZPUkJJRERFTl06IFwiRm9yYmlkZGVuXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9GT1VORF06IFwiTm90IEZvdW5kXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1FVEhPRF9OT1RfQUxMT1dFRF06IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9BQ0NFUFRBQkxFXTogXCJOb3QgQWNjZXB0YWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRF06IFwiUHJveHkgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkVRVUVTVF9USU1FT1VUXTogXCJSZXF1ZXN0IFRpbWVvdXRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ09ORkxJQ1RdOiBcIkNvbmZsaWN0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkdPTkVdOiBcIkdvbmVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTEVOR1RIX1JFUVVJUkVEXTogXCJMZW5ndGggUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJFQ09ORElUSU9OX0ZBSUxFRF06IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVlMT0FEX1RPT19MQVJHRV06IFwiUGF5bG9hZCBUb28gTGFyZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVVJJX1RPT19MT05HXTogXCJVUkkgVG9vIExvbmdcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5TVVBQT1JURURfTUVESUFfVFlQRV06IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SQU5HRV9OT1RfU0FUSVNGSUFCTEVdOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5FWFBFQ1RBVElPTl9GQUlMRURdOiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5JX0FNX0FfVEVBUE9UXTogXCJJJ20gYSB0ZWFwb3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTUlTRElSRUNURURfUkVRVUVTVF06IFwiTWlzZGlyZWN0ZWQgUmVxdWVzdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTlBST0NFU1NBQkxFX0VOVElUWV06IFwiVW5wcm9jZXNzYWJsZSBFbnRpdHlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTE9DS0VEXTogXCJMb2NrZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRkFJTEVEX0RFUEVOREVOQ1ldOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVQR1JBREVfUkVRVUlSRURdOiBcIlVwZ3JhZGUgUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJFQ09ORElUSU9OX1JFUVVJUkVEXTogXCJQcmVjb25kaXRpb24gUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVE9PX01BTllfUkVRVUVTVFNdOiBcIlRvbyBNYW55IFJlcXVlc3RzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VdOiBcIlJlcXVlc3QgSGVhZGVyIEZpZWxkcyBUb28gTGFyZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlNdOiBcIlVuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zXCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuSU5URVJOQUxfU0VSVkVSX0VSUk9SXTogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0lNUExFTUVOVEVEXTogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQkFEX0dBVEVXQVldOiBcIkJhZCBHYXRld2F5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNFUlZJQ0VfVU5BVkFJTEFCTEVdOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuR0FURVdBWV9USU1FT1VUXTogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURURdOiBcIkhUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlZBUklBTlRfQUxTT19ORUdPVElBVEVTXTogXCJWYXJpYW50IEFsc28gTmVnb3RpYXRlc1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5JTlNVRkZJQ0lFTlRfU1RPUkFHRV06IFwiSW5zdWZmaWNpZW50IFN0b3JhZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTE9PUF9ERVRFQ1RFRF06IFwiTG9vcCBEZXRlY3RlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfRVhURU5ERURdOiBcIk5vdCBFeHRlbmRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5ORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEXTogXCJOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIEhUVFBfU1RBVFVTX0NPREUsXG4gIEhUVFBfU1RBVFVTX0NPREVfRElDVFxufSJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJ4aHIuZmNhOWJiYjAuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);