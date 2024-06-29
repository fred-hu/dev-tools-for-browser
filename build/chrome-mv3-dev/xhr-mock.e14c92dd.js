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
})({"dtgim":[function(require,module,exports) {
var _constants = require("~constants");
var _utils = require("~utils");
(function() {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalGetAllResponseHeaders = XMLHttpRequest.prototype.getAllResponseHeaders;
    const originalGetResponseHeader = XMLHttpRequest.prototype.getResponseHeader;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    window.addEventListener("message", function(msg) {
        const { data } = msg;
        if (data.action === (0, _constants.MESSAGE_TYPES).MATCHING_UPDATE) window[(0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES] = data.payload || [];
    });
    const enableMockCheck = (routes, xhr, method, originalUrl)=>{
        let route;
        const enableRoutes = routes.filter(({ enable, mockType })=>enable && mockType === (0, _constants.MOCK_TYPE).NORMAL);
        const enable = routes.length > 0 && enableRoutes.some((item)=>{
            const { url, matchType, requestType } = item;
            const isMethodMatched = method.toLowerCase() === requestType.toLowerCase() || requestType === (0, _constants.REQUEST_TYPE).ALL;
            if (isMethodMatched) {
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
        const { mock, mockConfig, responseType } = this;
        if (mock) {
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
})();

},{"~constants":"8KODc","~utils":"9Ea3L"}],"8KODc":[function(require,module,exports) {
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
parcelHelpers.export(exports, "MOCK_TYPE_OPTIONS", ()=>MOCK_TYPE_OPTIONS);
parcelHelpers.export(exports, "MATCH_TYPE", ()=>MATCH_TYPE);
parcelHelpers.export(exports, "MATCH_TYPE_DICT", ()=>MATCH_TYPE_DICT);
parcelHelpers.export(exports, "ResourceType", ()=>ResourceType);
parcelHelpers.export(exports, "RuleActionType", ()=>RuleActionType);
parcelHelpers.export(exports, "MATCH_TYPE_OPTIONS", ()=>MATCH_TYPE_OPTIONS);
parcelHelpers.export(exports, "HTTP_STATUS_CODE_OPTIONS", ()=>HTTP_STATUS_CODE_OPTIONS);
parcelHelpers.export(exports, "GLOBAL_VARIABLE", ()=>GLOBAL_VARIABLE);
parcelHelpers.export(exports, "GLOBAL_VARIABLE_MAP", ()=>GLOBAL_VARIABLE_MAP);
var _utils = require("~utils");
var _httpStatus = require("./httpStatus");
const MESSAGE_TYPES = {
    open: "open",
    send: "send",
    setRequestHeader: "setRequestHeader",
    setState: "setState",
    invokeFunction: "invokeFunction",
    MATCHING_UPDATE: "matchingUpdate",
    UPDATE_ROUTES: "updateRoutes",
    setLoading: "setLoading"
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

},{"~utils":"9Ea3L","./httpStatus":"bjRjc","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"9Ea3L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
parcelHelpers.export(exports, "convertDictToArray", ()=>convertDictToArray);
parcelHelpers.export(exports, "jointUrl", ()=>jointUrl);
parcelHelpers.export(exports, "moveToTop", ()=>moveToTop);
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
exports.default = {
    convertDictToArray,
    log,
    jointUrl,
    moveToTop
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

},{}],"bjRjc":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}]},["dtgim"], "dtgim", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUJBQWlCLEVBQUU7SUFDckMsQ0FBQyxpQkFBaUIsc0JBQXNCLEVBQUU7SUFDMUMsQ0FBQyxpQkFBaUIsa0JBQWtCLEVBQUU7SUFDdEMsQ0FBQyxpQkFBaUIsZ0NBQWdDLEVBQUU7SUFDcEQsQ0FBQyxpQkFBaUIsOEJBQThCLEVBQUU7SUFFbEQsQ0FBQyxpQkFBaUIsc0JBQXNCLEVBQUU7SUFDMUMsQ0FBQyxpQkFBaUIsZ0JBQWdCLEVBQUU7SUFDcEMsQ0FBQyxpQkFBaUIsWUFBWSxFQUFFO0lBQ2hDLENBQUMsaUJBQWlCLG9CQUFvQixFQUFFO0lBQ3hDLENBQUMsaUJBQWlCLGdCQUFnQixFQUFFO0lBQ3BDLENBQUMsaUJBQWlCLDJCQUEyQixFQUFFO0lBQy9DLENBQUMsaUJBQWlCLHdCQUF3QixFQUFFO0lBQzVDLENBQUMsaUJBQWlCLHFCQUFxQixFQUFFO0lBQ3pDLENBQUMsaUJBQWlCLGNBQWMsRUFBRTtJQUNsQyxDQUFDLGlCQUFpQixhQUFhLEVBQUU7SUFDakMsQ0FBQyxpQkFBaUIsZ0NBQWdDLEVBQUU7QUFDdEQ7a0JBQ2U7SUFDYjtJQUNBO0FBQ0YiLCJzb3VyY2VzIjpbImNocm9tZS1leHQtdG9vbHMvc3JjL3NjcmlwdHMveGhyLW1vY2sudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9jb25zdGFudHMvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy91dGlscy9pbmRleC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2NvbnN0YW50cy9odHRwU3RhdHVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdMT0JBTF9WQVJJQUJMRSwgTUFUQ0hfVFlQRSwgTUVTU0FHRV9UWVBFUywgTU9DS19UWVBFLCBSRVFVRVNUX1RZUEUgfSBmcm9tICd+Y29uc3RhbnRzJ1xuaW1wb3J0IHsgam9pbnRVcmwgfSBmcm9tICd+dXRpbHMnXG5cbjsoZnVuY3Rpb24gKCkge1xuICBjb25zdCBvcmlnaW5hbE9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlblxuICBjb25zdCBvcmlnaW5hbFNlbmQgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZFxuICBjb25zdCBvcmlnaW5hbEdldEFsbFJlc3BvbnNlSGVhZGVycyA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRBbGxSZXNwb25zZUhlYWRlcnNcbiAgY29uc3Qgb3JpZ2luYWxHZXRSZXNwb25zZUhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlclxuICBjb25zdCBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlclxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1zZykge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnXG4gICAgaWYgKGRhdGEuYWN0aW9uID09PSBNRVNTQUdFX1RZUEVTLk1BVENISU5HX1VQREFURSkge1xuICAgICAgd2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID0gZGF0YS5wYXlsb2FkIHx8IFtdXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGVuYWJsZU1vY2tDaGVjayA9IChyb3V0ZXMsIHhociwgbWV0aG9kLCBvcmlnaW5hbFVybCkgPT4ge1xuICAgIGxldCByb3V0ZVxuICAgIGNvbnN0IGVuYWJsZVJvdXRlcyA9IHJvdXRlcy5maWx0ZXIoKHsgZW5hYmxlLCBtb2NrVHlwZSB9KSA9PiBlbmFibGUgJiYgbW9ja1R5cGUgPT09IE1PQ0tfVFlQRS5OT1JNQUwpXG4gICAgY29uc3QgZW5hYmxlID1cbiAgICAgIHJvdXRlcy5sZW5ndGggPiAwICYmXG4gICAgICBlbmFibGVSb3V0ZXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCB7IHVybCwgbWF0Y2hUeXBlLCByZXF1ZXN0VHlwZSB9ID0gaXRlbVxuICAgICAgICBjb25zdCBpc01ldGhvZE1hdGNoZWQgPSBtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gcmVxdWVzdFR5cGUudG9Mb3dlckNhc2UoKSB8fCByZXF1ZXN0VHlwZSA9PT0gUkVRVUVTVF9UWVBFLkFMTFxuICAgICAgICBpZiAoaXNNZXRob2RNYXRjaGVkKSB7XG4gICAgICAgICAgaWYgKG1hdGNoVHlwZSA9PT0gTUFUQ0hfVFlQRS5SRUdFWFApIHtcbiAgICAgICAgICAgIGNvbnN0IFJFRyA9IG5ldyBSZWdFeHAodXJsLCAnZycpXG4gICAgICAgICAgICByZXR1cm4gUkVHLnRlc3Qob3JpZ2luYWxVcmwpICYmIChyb3V0ZSA9IGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuQ09OVEFJTlMpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbFVybC5pbmNsdWRlcyh1cmwpICYmIChyb3V0ZSA9IGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuRVFVQUxTKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxVcmwgPT09IHVybCAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0pXG4gICAgaWYgKGVuYWJsZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHhociwgJ21vY2snLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHhociwgJ21vY2tDb25maWcnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogcm91dGUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHhoci5tb2NrXG4gICAgICBkZWxldGUgeGhyLm1vY2tDb25maWdcbiAgICB9XG4gICAgcmV0dXJuIGVuYWJsZVxuICB9XG5cbiAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IFttZXRob2QsIHVybF0gPSBhcmdzXG4gICAgY29uc3QgeyByZXNwb25zZVVSTCB9ID0gdGhpc1xuICAgIGVuYWJsZU1vY2tDaGVjayh3aW5kb3dbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1BST1hZX1JPVVRFU10gPz8gW10sIHRoaXMsIG1ldGhvZCwgcmVzcG9uc2VVUkwgfHwgam9pbnRVcmwodXJsKSlcbiAgICBvcmlnaW5hbE9wZW4uYXBwbHkodGhpcywgYXJncylcbiAgfVxuXG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7IG1vY2ssIG1vY2tDb25maWcsIHJlc3BvbnNlVHlwZSB9ID0gdGhpc1xuICAgIGlmIChtb2NrKSB7XG4gICAgICBjb25zdCB7IHJlc3BvbnNlLCByZXNwb25zZVN0YXR1cywgZGVsYXkgfSA9IG1vY2tDb25maWdcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhZHlTdGF0ZScsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiA0IH0pXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N0YXR1cycsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiByZXNwb25zZVN0YXR1cyA/PyAyMDAgfSlcbiAgICAgIHN3aXRjaCAocmVzcG9uc2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2pzb24nOiB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyZXNwb25zZScsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBKU09OLnBhcnNlKHJlc3BvbnNlKSB9KVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jlc3BvbnNlVGV4dCcsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiByZXNwb25zZSB9KVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzPy5vbnJlYWR5c3RhdGVjaGFuZ2U/LigpXG4gICAgICAgIHRoaXM/Lm9ubG9hZGVuZD8uKClcbiAgICAgICAgdGhpcz8ub25sb2FkPy4oKVxuICAgICAgfSwgZGVsYXkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdpbmFsU2VuZC5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgZW5hYmxlTW9ja1JlcXVlc3RIZWFkZXJzLCBtb2NrUmVxdWVzdEhlYWRlcnMgfSA9IG1vY2tDb25maWdcbiAgICAgIGlmIChlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IEpTT04ucGFyc2UobW9ja1JlcXVlc3RIZWFkZXJzKVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLCBrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gaGVhZGVyc1trZXldXG4gICAgICAgICAgICBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIuYXBwbHkodGhpcywgW2tleSwgZWxlbWVudF0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIuYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cbiAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVycyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgbW9ja1Jlc3BvbnNlSGVhZGVycywgZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycyB9ID0gbW9ja0NvbmZpZ1xuICAgICAgcmV0dXJuIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnNcbiAgICAgICAgPyBKU09OLnBhcnNlKG1vY2tSZXNwb25zZUhlYWRlcnMpXG4gICAgICAgIDogb3JpZ2luYWxHZXRBbGxSZXNwb25zZUhlYWRlcnMuYXBwbHkodGhpcywgYXJncylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0QWxsUmVzcG9uc2VIZWFkZXJzLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgW2tleV0gPSBhcmdzXG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnIH0gPSB0aGlzXG4gICAgaWYgKG1vY2spIHtcbiAgICAgIGNvbnN0IHsgbW9ja1Jlc3BvbnNlSGVhZGVycywgZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVycyB9ID0gbW9ja0NvbmZpZ1xuICAgICAgcmV0dXJuIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnNcbiAgICAgICAgPyBKU09OLnBhcnNlKG1vY2tSZXNwb25zZUhlYWRlcnMpW2tleV1cbiAgICAgICAgOiBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbEdldFJlc3BvbnNlSGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG59KSgpXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgY29udmVydERpY3RUb0FycmF5IH0gZnJvbSBcIn51dGlsc1wiXG5pbXBvcnQgeyBIVFRQX1NUQVRVU19DT0RFLCBIVFRQX1NUQVRVU19DT0RFX0RJQ1QgfSBmcm9tICcuL2h0dHBTdGF0dXMnXG5cbmV4cG9ydCBjb25zdCBNRVNTQUdFX1RZUEVTID0ge1xuICBvcGVuOiBcIm9wZW5cIixcbiAgc2VuZDogXCJzZW5kXCIsXG4gIHNldFJlcXVlc3RIZWFkZXI6IFwic2V0UmVxdWVzdEhlYWRlclwiLFxuICBzZXRTdGF0ZTogXCJzZXRTdGF0ZVwiLFxuICBpbnZva2VGdW5jdGlvbjogXCJpbnZva2VGdW5jdGlvblwiLFxuICBNQVRDSElOR19VUERBVEU6IFwibWF0Y2hpbmdVcGRhdGVcIixcbiAgVVBEQVRFX1JPVVRFUzogXCJ1cGRhdGVSb3V0ZXNcIixcbiAgc2V0TG9hZGluZzogXCJzZXRMb2FkaW5nXCJcbn1cblxuZXhwb3J0IGVudW0gT1BFUkFURV9UWVBFIHtcbiAgRURJVCA9IFwiZWRpdFwiLFxuICBERUxFVEUgPSBcImRlbGV0ZVwiLFxuICBVUERBVEVfUkVDT1JEID0gXCJ1cGRhdGVSZWNvcmRcIixcbiAgVE9QID0gXCJ0b3BcIixcbiAgQ0xPTkUgPSBcImNsb25lXCJcbn1cbmV4cG9ydCBlbnVtIFJFUVVFU1RfVFlQRSB7XG4gIEFMTCA9IFwiKlwiLFxuICBHRVQgPSBcImdldFwiLFxuICBQT1NUID0gXCJwb3N0XCIsIC8vIOWQkeacjeWKoeWZqOaPkOS6pOaVsOaNruOAglxuICBQVVQgPSBcInB1dFwiLCAvLyDlkJHmnI3liqHlmajkuIrkvKDmm7TmlrDmlbDmja7jgIJcbiAgREVMRVRFID0gXCJkZWxldGVcIiwgLy8g6K+35rGC5pyN5Yqh5Zmo5Yig6Zmk5oyH5a6a55qE6LWE5rqQ44CCXG4gIEhFQUQgPSBcImhlYWRcIiwgLy8g57G75Ly85LqOIEdFVCDor7fmsYLvvIzkvYblj6rov5Tlm57pppbpg6jvvIzkuI3ov5Tlm57lrp7pmYXlhoXlrrnjgIJcbiAgT1BUSU9OUyA9IFwib3B0aW9uc1wiLCAvLyDnlKjkuo7mj4/ov7Dlr7nnm67moIfotYTmupDnmoTpgJrkv6HpgInpobnjgIJcbiAgUEFUQ0ggPSBcInBhdGNoXCIsIC8vIOeUqOS6juWvuei1hOa6kOi/m+ihjOWxgOmDqOS/ruaUue+8jOWNs+Wvuei1hOa6kOeahOmDqOWIhuWGheWuuei/m+ihjOabtOaWsOaIluS/ruaUuVxuICBUUkFDRSA9IFwidHJhY2VcIiAvLyDlm57mmL7mnI3liqHlmajmlLbliLDnmoTor7fmsYLvvIzkuLvopoHnlKjkuo7mtYvor5XmiJbor4rmlq3jgIJcbn1cbmV4cG9ydCBjb25zdCBSRVFVRVNUX1RZUEVfRElDVCA9IHtcbiAgW1JFUVVFU1RfVFlQRS5BTExdOiBcIuS4jemZkFwiLFxuICBbUkVRVUVTVF9UWVBFLkdFVF06IFwiR0VUXCIsXG4gIFtSRVFVRVNUX1RZUEUuUE9TVF06IFwiUE9TVFwiLFxuICBbUkVRVUVTVF9UWVBFLlBVVF06IFwiUFVUXCIsXG4gIFtSRVFVRVNUX1RZUEUuREVMRVRFXTogXCJERUxFVEVcIixcbiAgW1JFUVVFU1RfVFlQRS5IRUFEXTogXCJIRUFEXCIsXG4gIFtSRVFVRVNUX1RZUEUuT1BUSU9OU106IFwiT1BUSU9OU1wiLFxuICBbUkVRVUVTVF9UWVBFLlBBVENIXTogXCJQQVRDSFwiLFxuICBbUkVRVUVTVF9UWVBFLlRSQUNFXTogXCJUUkFDRVwiXG59XG5leHBvcnQgY29uc3QgUkVRVUVTVF9UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoUkVRVUVTVF9UWVBFX0RJQ1QpXG5cbmV4cG9ydCBlbnVtIFBST1hZX1JPVVRFX0tFWSB7XG4gIElEID0gXCJpZFwiLFxuICBNT0NLX1RZUEUgPSBcIm1vY2tUeXBlXCIsXG4gIEVOQUJMRSA9IFwiZW5hYmxlXCIsXG4gIE1BVENIX1RZUEUgPSBcIm1hdGNoVHlwZVwiLFxuICBSRVFVRVNUX1RZUEUgPSBcInJlcXVlc3RUeXBlXCIsXG4gIFJFU1BPTlNFX1NUQVRVUyA9IFwicmVzcG9uc2VTdGF0dXNcIixcbiAgUkVESVJFQ1RfVVJMID0gXCJyZWRpcmVjdFVybFwiLFxuICBERUxBWSA9IFwiZGVsYXlcIixcbiAgVVJMID0gXCJ1cmxcIixcbiAgTkFNRSA9IFwibmFtZVwiLFxuICBSRVNQT05TRSA9IFwicmVzcG9uc2VcIixcbiAgTU9DS19SRVFVRVNUX0hFQURFUlMgPSBcIm1vY2tSZXF1ZXN0SGVhZGVyc1wiLFxuICBFTkFCTEVfTU9DS19SRVFVRVNUX0hFQURFUlMgPSBcImVuYWJsZU1vY2tSZXF1ZXN0SGVhZGVyc1wiLFxuICBSRVFVRVNUX0hFQURFUlMgPSBcInJlcXVlc3RIZWFkZXJzXCIsXG4gIE1PQ0tfUkVTUE9OU0VfSEVBREVSUyA9IFwibW9ja1Jlc3BvbnNlSGVhZGVyc1wiLFxuICBFTkFCTEVfTU9DS19SRVNQT05TRV9IRUFERVJTID0gXCJlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzXCIsXG4gIFJFU1BPTlNFX0hFQURFUlMgPSBcInJlc3BvbnNlSGVhZGVyc1wiLFxufVxuZXhwb3J0IHR5cGUgUFJPWFlfUk9VVEVfSVRFTSA9IHtcbiAgW1BST1hZX1JPVVRFX0tFWS5JRF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLk1PQ0tfVFlQRV06IE1PQ0tfVFlQRVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV06IGJvb2xlYW5cbiAgW1BST1hZX1JPVVRFX0tFWS5NQVRDSF9UWVBFXTogTUFUQ0hfVFlQRVxuICBbUFJPWFlfUk9VVEVfS0VZLlJFUVVFU1RfVFlQRV06IFJFUVVFU1RfVFlQRVxuICBbUFJPWFlfUk9VVEVfS0VZLlJFU1BPTlNFX1NUQVRVU106IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFRElSRUNUX1VSTF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLkRFTEFZXTogbnVtYmVyXG4gIFtQUk9YWV9ST1VURV9LRVkuVVJMXTogc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuTkFNRV06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFU1BPTlNFXTogdW5kZWZpbmVkIHwgc3RyaW5nXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVRVUVTVF9IRUFERVJTXTogYW55W11cbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV9IRUFERVJTXTogYW55W11cbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1JFUVVFU1RfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuRU5BQkxFX01PQ0tfUkVRVUVTVF9IRUFERVJTXTogYm9vbGVhblxuICBbUFJPWFlfUk9VVEVfS0VZLk1PQ0tfUkVTUE9OU0VfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuRU5BQkxFX01PQ0tfUkVTUE9OU0VfSEVBREVSU106IGJvb2xlYW5cbn1cblxuZXhwb3J0IGVudW0gTU9DS19UWVBFIHtcbiAgTk9STUFMID0gXCJub3JtYWxcIixcbiAgUkVESVJFQ1QgPSBcInJlZGlyZWN0XCIsXG4gIE1PRElGWV9IRUFERVJTID0gXCJtb2RpZnlIZWFkZXJzXCIsXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX0RJQ1QgPSB7XG4gIFtNT0NLX1RZUEUuTk9STUFMXTogXCJNb2NrXCIsXG4gIFtNT0NLX1RZUEUuUkVESVJFQ1RdOiBcIlJlZGlyZWN0XCIsXG4gIFtNT0NLX1RZUEUuTU9ESUZZX0hFQURFUlNdOiBcIk1vZGlmeUhlYWRlcnNcIixcbn1cbmV4cG9ydCBjb25zdCBNT0NLX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShNT0NLX1RZUEVfRElDVClcblxuZXhwb3J0IGVudW0gTUFUQ0hfVFlQRSB7XG4gIENPTlRBSU5TID0gXCJjb250YWluc1wiLFxuICBFUVVBTFMgPSBcImVxdWFsc1wiLFxuICBSRUdFWFAgPSBcInJlZ2V4cFwiXG59XG5leHBvcnQgY29uc3QgTUFUQ0hfVFlQRV9ESUNUID0ge1xuICBbTUFUQ0hfVFlQRS5DT05UQUlOU106IFwiY29udGFpbnNcIixcbiAgW01BVENIX1RZUEUuRVFVQUxTXTogXCJlcXVhbHNcIixcbiAgW01BVENIX1RZUEUuUkVHRVhQXTogXCJyZWdleHBcIlxufVxuXG5leHBvcnQgZW51bSBSZXNvdXJjZVR5cGUge1xuICBNQUlOX0ZSQU1FID0gXCJtYWluX2ZyYW1lXCIsXG4gIFNVQl9GUkFNRSA9IFwic3ViX2ZyYW1lXCIsXG4gIFNUWUxFU0hFRVQgPSBcInN0eWxlc2hlZXRcIixcbiAgU0NSSVBUID0gXCJzY3JpcHRcIixcbiAgSU1BR0UgPSBcImltYWdlXCIsXG4gIEZPTlQgPSBcImZvbnRcIixcbiAgT0JKRUNUID0gXCJvYmplY3RcIixcbiAgWE1MSFRUUFJFUVVFU1QgPSBcInhtbGh0dHByZXF1ZXN0XCIsXG4gIFBJTkcgPSBcInBpbmdcIixcbiAgQ1NQX1JFUE9SVCA9IFwiY3NwX3JlcG9ydFwiLFxuICBNRURJQSA9IFwibWVkaWFcIixcbiAgV0VCU09DS0VUID0gXCJ3ZWJzb2NrZXRcIixcbiAgT1RIRVIgPSBcIm90aGVyXCIsXG4gIFdFQkJVTkRMRSA9IFwid2ViYnVuZGxlXCIsXG4gIFdFQlRSQU5TUE9SVCA9IFwid2VidHJhbnNwb3J0XCIsXG59XG5cbmV4cG9ydCBlbnVtIFJ1bGVBY3Rpb25UeXBlIHtcbiAgQkxPQ0sgPSBcImJsb2NrXCIsXG4gIFJFRElSRUNUID0gXCJyZWRpcmVjdFwiLFxuICBBTExPVyA9IFwiYWxsb3dcIixcbiAgVVBHUkFERV9TQ0hFTUUgPSBcInVwZ3JhZGVTY2hlbWVcIixcbiAgTU9ESUZZX0hFQURFUlMgPSBcIm1vZGlmeUhlYWRlcnNcIixcbiAgQUxMT1dfQUxMX1JFUVVFU1RTID0gXCJhbGxvd0FsbFJlcXVlc3RzXCJcbn1cblxuZXhwb3J0IGNvbnN0IE1BVENIX1RZUEVfT1BUSU9OUyA9IGNvbnZlcnREaWN0VG9BcnJheShNQVRDSF9UWVBFX0RJQ1QpXG5cbmV4cG9ydCBjb25zdCBIVFRQX1NUQVRVU19DT0RFX09QVElPTlMgPSBPYmplY3Qua2V5cyhIVFRQX1NUQVRVU19DT0RFX0RJQ1QpLm1hcCgodikgPT4gKHtcbiAgdmFsdWU6ICt2LFxuICBsYWJlbDogYCR7dn0gJHtIVFRQX1NUQVRVU19DT0RFX0RJQ1Rbdl19YFxufSkpXG5cbmV4cG9ydCBlbnVtIEdMT0JBTF9WQVJJQUJMRSB7XG4gIENIUk9NRV9QTFVTX09SSUdJTkFMX1hIUiA9IFwiQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSXCIsXG4gIENIUk9NRV9QTFVTX1JFUVVFU1RfTUFQID0gXCJDSFJPTUVfUExVU19SRVFVRVNUX01BUFwiLFxuICBDSFJPTUVfUExVU19QUk9YWV9YSFIgPSBcIkNIUk9NRV9QTFVTX1BST1hZX1hIUlwiLFxuICBDSFJPTUVfUExVU19QUk9YWV9ST1VURVMgPSBcIkNIUk9NRV9QTFVTX1BST1hZX1JPVVRFU1wiLFxufVxuZXhwb3J0IGNvbnN0IEdMT0JBTF9WQVJJQUJMRV9NQVAgPSB7XG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSXTogXCJDSFJPTUVfUExVU19PUklHSU5BTF9YSFJcIixcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19SRVFVRVNUX01BUF06IFwiQ0hST01FX1BMVVNfUkVRVUVTVF9NQVBcIixcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9YSFJdOiBcIkNIUk9NRV9QTFVTX1BST1hZX1hIUlwiLFxuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX1BST1hZX1JPVVRFU106IFwiQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXCIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUFJPWFlfUk9VVEVfS0VZLFxuICBNT0NLX1RZUEUsXG4gIE1PQ0tfVFlQRV9ESUNULFxuICBNT0NLX1RZUEVfT1BUSU9OUyxcbiAgTUFUQ0hfVFlQRSxcbiAgSFRUUF9TVEFUVVNfQ09ERSxcbiAgTUVTU0FHRV9UWVBFUyxcbiAgR0xPQkFMX1ZBUklBQkxFX01BUFxufVxuIiwiZXhwb3J0IGNvbnN0IGxvZyA9IChkYXRhKSA9PlxuICBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LmV2YWwoYGNvbnNvbGUubG9nKCcke0pTT04uc3RyaW5naWZ5KGRhdGEpfScpYClcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnREaWN0VG9BcnJheShcbiAgZGljdDoge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICB9LFxuICBjb25maWc6IHN0cmluZ1tdID0gW1widmFsdWVcIiwgXCJsYWJlbFwiXSxcbik6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1bXSB7XG4gIGNvbnN0IFtrZXlOYW1lID0gXCJ2YWx1ZVwiLCB2YWx1ZU5hbWUgPSBcImxhYmVsXCJdID0gY29uZmlnXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhkaWN0KS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcbiAgICBba2V5TmFtZV06IGtleSxcbiAgICBbdmFsdWVOYW1lXTogdmFsdWVcbiAgfSkpXG59XG5leHBvcnQgZnVuY3Rpb24gam9pbnRVcmwodXJsKSB7XG4gIHRyeSB7XG4gICAgLy8g5bCd6K+V5Yib5bu65LiA5LiqVVJM5a+56LGhXG4gICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTCh1cmwpXG5cbiAgICAvLyDmo4Dmn6XljY/orq7mmK/lkKbkuLpodHRw5oiWaHR0cHNcbiAgICBpZiAocGFyc2VkVXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgfHwgcGFyc2VkVXJsLnByb3RvY29sID09PSBcImh0dHBzOlwiKSB7XG4gICAgICByZXR1cm4gdXJsIC8vIOi/lOWbnuWOn1VSTO+8jOWboOS4uuWug+aYr+S4gOS4quacieaViOeahEhUVFAoUynlnLDlnYBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwcm90b2NvbFwiKSAvLyDmipvlh7rplJnor6/vvIzlpITnkIbpnZ5IVFRQKFMp5Y2P6K6uXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIOWmguaenFVSTOaehOmAoOWksei0peaIluWNj+iuruS4jeato+ehru+8jOWImei/lOWbnuS/ruato+WQjueahFVSTFxuICAgIHJldHVybiBsb2NhdGlvbi5vcmlnaW4gKyB1cmxcbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1RvcChhcnIsIGluZGV4KSB7XG4gIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgYXJyLmxlbmd0aCkge1xuICAgIC8vIOS7juaMh+Wumue0ouW8leS9jee9ruenu+mZpOWFg+e0oFxuICAgIGNvbnN0IFtpdGVtXSA9IGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgLy8g5bCG6K+l5YWD57Sg5o+S5YWl5Yiw5pWw57uE55qE5byA5aS0XG4gICAgYXJyLnVuc2hpZnQoaXRlbSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb252ZXJ0RGljdFRvQXJyYXksXG4gIGxvZyxcbiAgam9pbnRVcmwsXG4gIG1vdmVUb1RvcFxufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmV4cG9ydCBlbnVtIEhUVFBfU1RBVFVTX0NPREUge1xuICBDT05USU5VRSA9IDEwMCxcbiAgU1dJVENISU5HX1BST1RPQ09MUyA9IDEwMSxcbiAgUFJPQ0VTU0lORyA9IDEwMixcblxuICBPSyA9IDIwMCxcbiAgQ1JFQVRFRCA9IDIwMSxcbiAgQUNDRVBURUQgPSAyMDIsXG4gIE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OID0gMjAzLFxuICBOT19DT05URU5UID0gMjA0LFxuICBSRVNFVF9DT05URU5UID0gMjA1LFxuICBQQVJUSUFMX0NPTlRFTlQgPSAyMDYsXG5cbiAgTVVMVElfU1RBVFVTID0gMjA3LFxuICBBTFJFQURZX1JFUE9SVEVEID0gMjA4LFxuXG4gIElNX1VTRUQgPSAyMjYsXG5cbiAgTVVMVElQTEVfQ0hPSUNFUyA9IDMwMCxcbiAgTU9WRURfUEVSTUFORU5UTFkgPSAzMDEsXG4gIEZPVU5EID0gMzAyLFxuICBTRUVfT1RIRVIgPSAzMDMsXG4gIE5PVF9NT0RJRklFRCA9IDMwNCxcbiAgVVNFX1BST1hZID0gMzA1LFxuICBURU1QT1JBUllfUkVESVJFQ1QgPSAzMDcsXG4gIFBFUk1BTkVOVF9SRURJUkVDVCA9IDMwOCxcblxuICBCQURfUkVRVUVTVCA9IDQwMCxcbiAgVU5BVVRIT1JJWkVEID0gNDAxLFxuICBQQVlNRU5UX1JFUVVJUkVEID0gNDAyLFxuICBGT1JCSURERU4gPSA0MDMsXG4gIE5PVF9GT1VORCA9IDQwNCxcbiAgTUVUSE9EX05PVF9BTExPV0VEID0gNDA1LFxuICBOT1RfQUNDRVBUQUJMRSA9IDQwNixcbiAgUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQgPSA0MDcsXG4gIFJFUVVFU1RfVElNRU9VVCA9IDQwOCxcbiAgQ09ORkxJQ1QgPSA0MDksXG4gIEdPTkUgPSA0MTAsXG4gIExFTkdUSF9SRVFVSVJFRCA9IDQxMSxcbiAgUFJFQ09ORElUSU9OX0ZBSUxFRCA9IDQxMixcbiAgUEFZTE9BRF9UT09fTEFSR0UgPSA0MTMsXG4gIFVSSV9UT09fTE9ORyA9IDQxNCxcbiAgVU5TVVBQT1JURURfTUVESUFfVFlQRSA9IDQxNSxcbiAgUkFOR0VfTk9UX1NBVElTRklBQkxFID0gNDE2LFxuICBFWFBFQ1RBVElPTl9GQUlMRUQgPSA0MTcsXG4gIElfQU1fQV9URUFQT1QgPSA0MTgsXG4gIE1JU0RJUkVDVEVEX1JFUVVFU1QgPSA0MjEsXG4gIFVOUFJPQ0VTU0FCTEVfRU5USVRZID0gNDIyLFxuICBMT0NLRUQgPSA0MjMsXG4gIEZBSUxFRF9ERVBFTkRFTkNZID0gNDI0LFxuICBVUEdSQURFX1JFUVVJUkVEID0gNDI2LFxuICBQUkVDT05ESVRJT05fUkVRVUlSRUQgPSA0MjgsXG4gIFRPT19NQU5ZX1JFUVVFU1RTID0gNDI5LFxuICBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFID0gNDMxLFxuICBVTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OUyA9IDQ1MSxcblxuICBJTlRFUk5BTF9TRVJWRVJfRVJST1IgPSA1MDAsXG4gIE5PVF9JTVBMRU1FTlRFRCA9IDUwMSxcbiAgQkFEX0dBVEVXQVkgPSA1MDIsXG4gIFNFUlZJQ0VfVU5BVkFJTEFCTEUgPSA1MDMsXG4gIEdBVEVXQVlfVElNRU9VVCA9IDUwNCxcbiAgSFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQgPSA1MDUsXG4gIFZBUklBTlRfQUxTT19ORUdPVElBVEVTID0gNTA2LFxuICBJTlNVRkZJQ0lFTlRfU1RPUkFHRSA9IDUwNyxcbiAgTE9PUF9ERVRFQ1RFRCA9IDUwOCxcbiAgTk9UX0VYVEVOREVEID0gNTEwLFxuICBORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEID0gNTExXG59XG5leHBvcnQgY29uc3QgSFRUUF9TVEFUVVNfQ09ERV9ESUNUID0ge1xuICBbSFRUUF9TVEFUVVNfQ09ERS5DT05USU5VRV06IFwiQ29udGludWVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuU1dJVENISU5HX1BST1RPQ09MU106IFwiU3dpdGNoaW5nIFByb3RvY29sc1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QUk9DRVNTSU5HXTogXCJQcm9jZXNzaW5nXCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuT0tdOiBcIk9LXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkNSRUFURURdOiBcIkNyZWF0ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQUNDRVBURURdOiBcIkFjY2VwdGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OXTogXCJOb24tQXV0aG9yaXRhdGl2ZSBJbmZvcm1hdGlvblwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT19DT05URU5UXTogXCJObyBDb250ZW50XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJFU0VUX0NPTlRFTlRdOiBcIlJlc2V0IENvbnRlbnRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUEFSVElBTF9DT05URU5UXTogXCJQYXJ0aWFsIENvbnRlbnRcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5NVUxUSV9TVEFUVVNdOiBcIk11bHRpLVN0YXR1c1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5BTFJFQURZX1JFUE9SVEVEXTogXCJBbHJlYWR5IFJlcG9ydGVkXCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuTVVMVElQTEVfQ0hPSUNFU106IFwiTXVsdGlwbGUgQ2hvaWNlc1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5NT1ZFRF9QRVJNQU5FTlRMWV06IFwiTW92ZWQgUGVybWFuZW50bHlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRk9VTkRdOiBcIkZvdW5kXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNFRV9PVEhFUl06IFwiU2VlIE90aGVyXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9NT0RJRklFRF06IFwiTm90IE1vZGlmaWVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVTRV9QUk9YWV06IFwiVXNlIFByb3h5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlRFTVBPUkFSWV9SRURJUkVDVF06IFwiVGVtcG9yYXJ5IFJlZGlyZWN0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBFUk1BTkVOVF9SRURJUkVDVF06IFwiUGVybWFuZW50IFJlZGlyZWN0XCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuQkFEX1JFUVVFU1RdOiBcIkJhZCBSZXF1ZXN0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVOQVVUSE9SSVpFRF06IFwiVW5hdXRob3JpemVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBBWU1FTlRfUkVRVUlSRURdOiBcIlBheW1lbnQgUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRk9SQklEREVOXTogXCJGb3JiaWRkZW5cIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0ZPVU5EXTogXCJOb3QgRm91bmRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTUVUSE9EX05PVF9BTExPV0VEXTogXCJNZXRob2QgTm90IEFsbG93ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0FDQ0VQVEFCTEVdOiBcIk5vdCBBY2NlcHRhYmxlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEXTogXCJQcm94eSBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SRVFVRVNUX1RJTUVPVVRdOiBcIlJlcXVlc3QgVGltZW91dFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5DT05GTElDVF06IFwiQ29uZmxpY3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuR09ORV06IFwiR29uZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5MRU5HVEhfUkVRVUlSRURdOiBcIkxlbmd0aCBSZXF1aXJlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QUkVDT05ESVRJT05fRkFJTEVEXTogXCJQcmVjb25kaXRpb24gRmFpbGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBBWUxPQURfVE9PX0xBUkdFXTogXCJQYXlsb2FkIFRvbyBMYXJnZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VUklfVE9PX0xPTkddOiBcIlVSSSBUb28gTG9uZ1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTlNVUFBPUlRFRF9NRURJQV9UWVBFXTogXCJVbnN1cHBvcnRlZCBNZWRpYSBUeXBlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJBTkdFX05PVF9TQVRJU0ZJQUJMRV06IFwiUmFuZ2UgTm90IFNhdGlzZmlhYmxlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkVYUEVDVEFUSU9OX0ZBSUxFRF06IFwiRXhwZWN0YXRpb24gRmFpbGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLklfQU1fQV9URUFQT1RdOiBcIkknbSBhIHRlYXBvdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5NSVNESVJFQ1RFRF9SRVFVRVNUXTogXCJNaXNkaXJlY3RlZCBSZXF1ZXN0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVOUFJPQ0VTU0FCTEVfRU5USVRZXTogXCJVbnByb2Nlc3NhYmxlIEVudGl0eVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5MT0NLRURdOiBcIkxvY2tlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5GQUlMRURfREVQRU5ERU5DWV06IFwiRmFpbGVkIERlcGVuZGVuY3lcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVVBHUkFERV9SRVFVSVJFRF06IFwiVXBncmFkZSBSZXF1aXJlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QUkVDT05ESVRJT05fUkVRVUlSRURdOiBcIlByZWNvbmRpdGlvbiBSZXF1aXJlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5UT09fTUFOWV9SRVFVRVNUU106IFwiVG9vIE1hbnkgUmVxdWVzdHNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRV06IFwiUmVxdWVzdCBIZWFkZXIgRmllbGRzIFRvbyBMYXJnZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OU106IFwiVW5hdmFpbGFibGUgRm9yIExlZ2FsIFJlYXNvbnNcIixcblxuICBbSFRUUF9TVEFUVVNfQ09ERS5JTlRFUk5BTF9TRVJWRVJfRVJST1JdOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfSU1QTEVNRU5URURdOiBcIk5vdCBJbXBsZW1lbnRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5CQURfR0FURVdBWV06IFwiQmFkIEdhdGV3YXlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuU0VSVklDRV9VTkFWQUlMQUJMRV06IFwiU2VydmljZSBVbmF2YWlsYWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5HQVRFV0FZX1RJTUVPVVRdOiBcIkdhdGV3YXkgVGltZW91dFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5IVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRF06IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVkFSSUFOVF9BTFNPX05FR09USUFURVNdOiBcIlZhcmlhbnQgQWxzbyBOZWdvdGlhdGVzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLklOU1VGRklDSUVOVF9TVE9SQUdFXTogXCJJbnN1ZmZpY2llbnQgU3RvcmFnZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5MT09QX0RFVEVDVEVEXTogXCJMb29wIERldGVjdGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9FWFRFTkRFRF06IFwiTm90IEV4dGVuZGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRURdOiBcIk5ldHdvcmsgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIixcbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSFRUUF9TVEFUVVNfQ09ERSxcbiAgSFRUUF9TVEFUVVNfQ09ERV9ESUNUXG59Il0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6Inhoci1tb2NrLmUxNGM5MmRkLmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);