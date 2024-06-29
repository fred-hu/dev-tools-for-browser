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
})({"7cC0G":[function(require,module,exports) {
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
                if (!url && !matchType) return route = item;
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
        console.log(222, window[(0, _constants.GLOBAL_VARIABLE).CHROME_PLUS_PROXY_ROUTES]);
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}]},["7cC0G"], "7cC0G", "parcelRequireb635")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlCLHFCQUFxQixFQUFFO0lBQ3pDLENBQUMsaUJBQWlCLE9BQU8sRUFBRTtJQUMzQixDQUFDLGlCQUFpQixrQkFBa0IsRUFBRTtJQUN0QyxDQUFDLGlCQUFpQixpQkFBaUIsRUFBRTtJQUNyQyxDQUFDLGlCQUFpQixzQkFBc0IsRUFBRTtJQUMxQyxDQUFDLGlCQUFpQixrQkFBa0IsRUFBRTtJQUN0QyxDQUFDLGlCQUFpQixnQ0FBZ0MsRUFBRTtJQUNwRCxDQUFDLGlCQUFpQiw4QkFBOEIsRUFBRTtJQUVsRCxDQUFDLGlCQUFpQixzQkFBc0IsRUFBRTtJQUMxQyxDQUFDLGlCQUFpQixnQkFBZ0IsRUFBRTtJQUNwQyxDQUFDLGlCQUFpQixZQUFZLEVBQUU7SUFDaEMsQ0FBQyxpQkFBaUIsb0JBQW9CLEVBQUU7SUFDeEMsQ0FBQyxpQkFBaUIsZ0JBQWdCLEVBQUU7SUFDcEMsQ0FBQyxpQkFBaUIsMkJBQTJCLEVBQUU7SUFDL0MsQ0FBQyxpQkFBaUIsd0JBQXdCLEVBQUU7SUFDNUMsQ0FBQyxpQkFBaUIscUJBQXFCLEVBQUU7SUFDekMsQ0FBQyxpQkFBaUIsY0FBYyxFQUFFO0lBQ2xDLENBQUMsaUJBQWlCLGFBQWEsRUFBRTtJQUNqQyxDQUFDLGlCQUFpQixnQ0FBZ0MsRUFBRTtBQUN0RDtrQkFDZTtJQUNiO0lBQ0E7QUFDRiIsInNvdXJjZXMiOlsiY2hyb21lLWV4dC10b29scy9zcmMvc2NyaXB0cy94aHIudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy9jb25zdGFudHMvaW5kZXgudHMiLCJjaHJvbWUtZXh0LXRvb2xzL3NyYy91dGlscy9pbmRleC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsImNocm9tZS1leHQtdG9vbHMvc3JjL2NvbnN0YW50cy9odHRwU3RhdHVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdMT0JBTF9WQVJJQUJMRSwgTUFUQ0hfVFlQRSwgTUVTU0FHRV9UWVBFUywgTU9DS19UWVBFLCBSRVFVRVNUX1RZUEUgfSBmcm9tICd+Y29uc3RhbnRzJ1xuaW1wb3J0IHsgam9pbnRVcmwgfSBmcm9tICd+dXRpbHMnXG5cbjsoZnVuY3Rpb24gKCkge1xuICBjb25zdCBvcmlnaW5hbE9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlblxuICBjb25zdCBvcmlnaW5hbFNlbmQgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZFxuICBjb25zdCBvcmlnaW5hbEdldEFsbFJlc3BvbnNlSGVhZGVycyA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRBbGxSZXNwb25zZUhlYWRlcnNcbiAgY29uc3Qgb3JpZ2luYWxHZXRSZXNwb25zZUhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlclxuICBjb25zdCBvcmlnaW5hbFNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlclxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1zZykge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnXG4gICAgaWYgKGRhdGEuYWN0aW9uID09PSBNRVNTQUdFX1RZUEVTLk1BVENISU5HX1VQREFURSkge1xuICAgICAgd2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID0gZGF0YS5wYXlsb2FkIHx8IFtdXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGVuYWJsZU1vY2tDaGVjayA9IChyb3V0ZXMsIHhociwgbWV0aG9kLCBvcmlnaW5hbFVybCkgPT4ge1xuICAgIGxldCByb3V0ZVxuICAgIGNvbnN0IGVuYWJsZVJvdXRlcyA9IHJvdXRlcy5maWx0ZXIoKHsgZW5hYmxlLCBtb2NrVHlwZSB9KSA9PiBlbmFibGUgJiYgbW9ja1R5cGUgPT09IE1PQ0tfVFlQRS5OT1JNQUwpXG4gICAgY29uc3QgZW5hYmxlID1cbiAgICAgIHJvdXRlcy5sZW5ndGggPiAwICYmXG4gICAgICBlbmFibGVSb3V0ZXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCB7IHVybCwgbWF0Y2hUeXBlLCByZXF1ZXN0VHlwZSB9ID0gaXRlbVxuICAgICAgICBjb25zdCBpc01ldGhvZE1hdGNoZWQgPSBtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gcmVxdWVzdFR5cGUudG9Mb3dlckNhc2UoKSB8fCByZXF1ZXN0VHlwZSA9PT0gUkVRVUVTVF9UWVBFLkFMTFxuICAgICAgICBpZiAoaXNNZXRob2RNYXRjaGVkKSB7XG4gICAgICAgICAgaWYgKCF1cmwgJiYgIW1hdGNoVHlwZSkgeyAvLyDkuI3pmZBVUkxcbiAgICAgICAgICAgIHJldHVybiB0cnVlICYmIChyb3V0ZSA9IGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXRjaFR5cGUgPT09IE1BVENIX1RZUEUuUkVHRVhQKSB7XG4gICAgICAgICAgICBjb25zdCBSRUcgPSBuZXcgUmVnRXhwKHVybCwgJ2cnKVxuICAgICAgICAgICAgcmV0dXJuIFJFRy50ZXN0KG9yaWdpbmFsVXJsKSAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2hUeXBlID09PSBNQVRDSF9UWVBFLkNPTlRBSU5TKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxVcmwuaW5jbHVkZXModXJsKSAmJiAocm91dGUgPSBpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2hUeXBlID09PSBNQVRDSF9UWVBFLkVRVUFMUykge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVXJsID09PSB1cmwgJiYgKHJvdXRlID0gaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIGlmIChlbmFibGUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4aHIsICdtb2NrJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4aHIsICdtb2NrQ29uZmlnJywgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHJvdXRlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB4aHIubW9ja1xuICAgICAgZGVsZXRlIHhoci5tb2NrQ29uZmlnXG4gICAgfVxuICAgIHJldHVybiBlbmFibGVcbiAgfVxuXG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbbWV0aG9kLCB1cmxdID0gYXJnc1xuICAgIGNvbnN0IHsgcmVzcG9uc2VVUkwgfSA9IHRoaXNcbiAgICBjb25zb2xlLmxvZygyMjIsIHdpbmRvd1tHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTXSlcbiAgICBlbmFibGVNb2NrQ2hlY2sod2luZG93W0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdID8/IFtdLCB0aGlzLCBtZXRob2QsIHJlc3BvbnNlVVJMIHx8IGpvaW50VXJsKHVybCkpXG4gICAgb3JpZ2luYWxPcGVuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gIH1cblxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgeyBtb2NrLCBtb2NrQ29uZmlnLCByZXNwb25zZVR5cGUgfSA9IHRoaXNcbiAgICBpZiAobW9jaykge1xuICAgICAgY29uc3QgeyByZXNwb25zZSwgcmVzcG9uc2VTdGF0dXMsIGRlbGF5IH0gPSBtb2NrQ29uZmlnXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JlYWR5U3RhdGUnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogNCB9KVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGF0dXMnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogcmVzcG9uc2VTdGF0dXMgPz8gMjAwIH0pXG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICBjYXNlICdqc29uJzoge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVzcG9uc2UnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogSlNPTi5wYXJzZShyZXNwb25zZSkgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyZXNwb25zZVRleHQnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogcmVzcG9uc2UgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcz8ub25yZWFkeXN0YXRlY2hhbmdlPy4oKVxuICAgICAgICB0aGlzPy5vbmxvYWRlbmQ/LigpXG4gICAgICAgIHRoaXM/Lm9ubG9hZD8uKClcbiAgICAgIH0sIGRlbGF5KVxuICAgIH0gZWxzZSB7XG4gICAgICBvcmlnaW5hbFNlbmQuYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cbiAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IHsgbW9jaywgbW9ja0NvbmZpZyB9ID0gdGhpc1xuICAgIGlmIChtb2NrKSB7XG4gICAgICBjb25zdCB7IGVuYWJsZU1vY2tSZXF1ZXN0SGVhZGVycywgbW9ja1JlcXVlc3RIZWFkZXJzIH0gPSBtb2NrQ29uZmlnXG4gICAgICBpZiAoZW5hYmxlTW9ja1JlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBKU09OLnBhcnNlKG1vY2tSZXF1ZXN0SGVhZGVycylcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycywga2V5KSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGhlYWRlcnNba2V5XVxuICAgICAgICAgICAgb3JpZ2luYWxTZXRSZXF1ZXN0SGVhZGVyLmFwcGx5KHRoaXMsIFtrZXksIGVsZW1lbnRdKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZ2luYWxTZXRSZXF1ZXN0SGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG4gIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRBbGxSZXNwb25zZUhlYWRlcnMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IHsgbW9jaywgbW9ja0NvbmZpZyB9ID0gdGhpc1xuICAgIGlmIChtb2NrKSB7XG4gICAgICBjb25zdCB7IG1vY2tSZXNwb25zZUhlYWRlcnMsIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnMgfSA9IG1vY2tDb25maWdcbiAgICAgIHJldHVybiBlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzXG4gICAgICAgID8gSlNPTi5wYXJzZShtb2NrUmVzcG9uc2VIZWFkZXJzKVxuICAgICAgICA6IG9yaWdpbmFsR2V0QWxsUmVzcG9uc2VIZWFkZXJzLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbEdldEFsbFJlc3BvbnNlSGVhZGVycy5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxuICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuZ2V0UmVzcG9uc2VIZWFkZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IFtrZXldID0gYXJnc1xuICAgIGNvbnN0IHsgbW9jaywgbW9ja0NvbmZpZyB9ID0gdGhpc1xuICAgIGlmIChtb2NrKSB7XG4gICAgICBjb25zdCB7IG1vY2tSZXNwb25zZUhlYWRlcnMsIGVuYWJsZU1vY2tSZXNwb25zZUhlYWRlcnMgfSA9IG1vY2tDb25maWdcbiAgICAgIHJldHVybiBlbmFibGVNb2NrUmVzcG9uc2VIZWFkZXJzXG4gICAgICAgID8gSlNPTi5wYXJzZShtb2NrUmVzcG9uc2VIZWFkZXJzKVtrZXldXG4gICAgICAgIDogb3JpZ2luYWxHZXRSZXNwb25zZUhlYWRlci5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZ2luYWxHZXRSZXNwb25zZUhlYWRlci5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxufSkoKVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IGNvbnZlcnREaWN0VG9BcnJheSB9IGZyb20gXCJ+dXRpbHNcIlxuaW1wb3J0IHsgSFRUUF9TVEFUVVNfQ09ERSwgSFRUUF9TVEFUVVNfQ09ERV9ESUNUIH0gZnJvbSAnLi9odHRwU3RhdHVzJ1xuXG5leHBvcnQgY29uc3QgTUVTU0FHRV9UWVBFUyA9IHtcbiAgb3BlbjogXCJvcGVuXCIsXG4gIHNlbmQ6IFwic2VuZFwiLFxuICBzZXRSZXF1ZXN0SGVhZGVyOiBcInNldFJlcXVlc3RIZWFkZXJcIixcbiAgc2V0U3RhdGU6IFwic2V0U3RhdGVcIixcbiAgaW52b2tlRnVuY3Rpb246IFwiaW52b2tlRnVuY3Rpb25cIixcbiAgTUFUQ0hJTkdfVVBEQVRFOiBcIm1hdGNoaW5nVXBkYXRlXCIsXG4gIHNldExvYWRpbmc6IFwic2V0TG9hZGluZ1wiXG59XG5cbmV4cG9ydCBlbnVtIE9QRVJBVEVfVFlQRSB7XG4gIEVESVQgPSBcImVkaXRcIixcbiAgREVMRVRFID0gXCJkZWxldGVcIixcbiAgVVBEQVRFX1JFQ09SRCA9IFwidXBkYXRlUmVjb3JkXCIsXG4gIFRPUCA9IFwidG9wXCIsXG4gIENMT05FID0gXCJjbG9uZVwiXG59XG5leHBvcnQgZW51bSBSRVFVRVNUX1RZUEUge1xuICBBTEwgPSBcIipcIixcbiAgR0VUID0gXCJnZXRcIixcbiAgUE9TVCA9IFwicG9zdFwiLCAvLyDlkJHmnI3liqHlmajmj5DkuqTmlbDmja7jgIJcbiAgUFVUID0gXCJwdXRcIiwgLy8g5ZCR5pyN5Yqh5Zmo5LiK5Lyg5pu05paw5pWw5o2u44CCXG4gIERFTEVURSA9IFwiZGVsZXRlXCIsIC8vIOivt+axguacjeWKoeWZqOWIoOmZpOaMh+WumueahOi1hOa6kOOAglxuICBIRUFEID0gXCJoZWFkXCIsIC8vIOexu+S8vOS6jiBHRVQg6K+35rGC77yM5L2G5Y+q6L+U5Zue6aaW6YOo77yM5LiN6L+U5Zue5a6e6ZmF5YaF5a6544CCXG4gIE9QVElPTlMgPSBcIm9wdGlvbnNcIiwgLy8g55So5LqO5o+P6L+w5a+555uu5qCH6LWE5rqQ55qE6YCa5L+h6YCJ6aG544CCXG4gIFBBVENIID0gXCJwYXRjaFwiLCAvLyDnlKjkuo7lr7notYTmupDov5vooYzlsYDpg6jkv67mlLnvvIzljbPlr7notYTmupDnmoTpg6jliIblhoXlrrnov5vooYzmm7TmlrDmiJbkv67mlLlcbiAgVFJBQ0UgPSBcInRyYWNlXCIgLy8g5Zue5pi+5pyN5Yqh5Zmo5pS25Yiw55qE6K+35rGC77yM5Li76KaB55So5LqO5rWL6K+V5oiW6K+K5pat44CCXG59XG5leHBvcnQgY29uc3QgUkVRVUVTVF9UWVBFX0RJQ1QgPSB7XG4gIFtSRVFVRVNUX1RZUEUuQUxMXTogXCLkuI3pmZBcIixcbiAgW1JFUVVFU1RfVFlQRS5HRVRdOiBcIkdFVFwiLFxuICBbUkVRVUVTVF9UWVBFLlBPU1RdOiBcIlBPU1RcIixcbiAgW1JFUVVFU1RfVFlQRS5QVVRdOiBcIlBVVFwiLFxuICBbUkVRVUVTVF9UWVBFLkRFTEVURV06IFwiREVMRVRFXCIsXG4gIFtSRVFVRVNUX1RZUEUuSEVBRF06IFwiSEVBRFwiLFxuICBbUkVRVUVTVF9UWVBFLk9QVElPTlNdOiBcIk9QVElPTlNcIixcbiAgW1JFUVVFU1RfVFlQRS5QQVRDSF06IFwiUEFUQ0hcIixcbiAgW1JFUVVFU1RfVFlQRS5UUkFDRV06IFwiVFJBQ0VcIlxufVxuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVFlQRV9PUFRJT05TID0gY29udmVydERpY3RUb0FycmF5KFJFUVVFU1RfVFlQRV9ESUNUKVxuXG5leHBvcnQgZW51bSBQUk9YWV9ST1VURV9LRVkge1xuICBJRCA9IFwiaWRcIixcbiAgTU9DS19UWVBFID0gXCJtb2NrVHlwZVwiLFxuICBFTkFCTEUgPSBcImVuYWJsZVwiLFxuICBNQVRDSF9UWVBFID0gXCJtYXRjaFR5cGVcIixcbiAgUkVRVUVTVF9UWVBFID0gXCJyZXF1ZXN0VHlwZVwiLFxuICBSRVNQT05TRV9TVEFUVVMgPSBcInJlc3BvbnNlU3RhdHVzXCIsXG4gIFJFRElSRUNUX1VSTCA9IFwicmVkaXJlY3RVcmxcIixcbiAgREVMQVkgPSBcImRlbGF5XCIsXG4gIFVSTCA9IFwidXJsXCIsXG4gIE5BTUUgPSBcIm5hbWVcIixcbiAgUkVTUE9OU0UgPSBcInJlc3BvbnNlXCIsXG4gIE1PQ0tfUkVRVUVTVF9IRUFERVJTID0gXCJtb2NrUmVxdWVzdEhlYWRlcnNcIixcbiAgRU5BQkxFX01PQ0tfUkVRVUVTVF9IRUFERVJTID0gXCJlbmFibGVNb2NrUmVxdWVzdEhlYWRlcnNcIixcbiAgUkVRVUVTVF9IRUFERVJTID0gXCJyZXF1ZXN0SGVhZGVyc1wiLFxuICBNT0NLX1JFU1BPTlNFX0hFQURFUlMgPSBcIm1vY2tSZXNwb25zZUhlYWRlcnNcIixcbiAgRU5BQkxFX01PQ0tfUkVTUE9OU0VfSEVBREVSUyA9IFwiZW5hYmxlTW9ja1Jlc3BvbnNlSGVhZGVyc1wiLFxuICBSRVNQT05TRV9IRUFERVJTID0gXCJyZXNwb25zZUhlYWRlcnNcIixcbn1cbmV4cG9ydCB0eXBlIFBST1hZX1JPVVRFX0lURU0gPSB7XG4gIFtQUk9YWV9ST1VURV9LRVkuSURdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1RZUEVdOiBNT0NLX1RZUEVcbiAgW1BST1hZX1JPVVRFX0tFWS5FTkFCTEVdOiBib29sZWFuXG4gIFtQUk9YWV9ST1VURV9LRVkuTUFUQ0hfVFlQRV06IE1BVENIX1RZUEVcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVFVRVNUX1RZUEVdOiBSRVFVRVNUX1RZUEVcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV9TVEFUVVNdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5SRURJUkVDVF9VUkxdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5ERUxBWV06IG51bWJlclxuICBbUFJPWFlfUk9VVEVfS0VZLlVSTF06IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLk5BTUVdOiBzdHJpbmdcbiAgW1BST1hZX1JPVVRFX0tFWS5SRVNQT05TRV06IHVuZGVmaW5lZCB8IHN0cmluZ1xuICBbUFJPWFlfUk9VVEVfS0VZLlJFUVVFU1RfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuUkVTUE9OU0VfSEVBREVSU106IGFueVtdXG4gIFtQUk9YWV9ST1VURV9LRVkuTU9DS19SRVFVRVNUX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV9NT0NLX1JFUVVFU1RfSEVBREVSU106IGJvb2xlYW5cbiAgW1BST1hZX1JPVVRFX0tFWS5NT0NLX1JFU1BPTlNFX0hFQURFUlNdOiBhbnlbXVxuICBbUFJPWFlfUk9VVEVfS0VZLkVOQUJMRV9NT0NLX1JFU1BPTlNFX0hFQURFUlNdOiBib29sZWFuXG59XG5cbmV4cG9ydCBlbnVtIE1PQ0tfVFlQRSB7XG4gIE5PUk1BTCA9IFwibm9ybWFsXCIsXG4gIFJFRElSRUNUID0gXCJyZWRpcmVjdFwiLFxuICBNT0RJRllfSEVBREVSUyA9IFwibW9kaWZ5SGVhZGVyc1wiLFxufVxuZXhwb3J0IGNvbnN0IE1PQ0tfVFlQRV9ESUNUID0ge1xuICBbTU9DS19UWVBFLk5PUk1BTF06IFwiTW9ja1wiLFxuICBbTU9DS19UWVBFLlJFRElSRUNUXTogXCJSZWRpcmVjdFwiLFxuICBbTU9DS19UWVBFLk1PRElGWV9IRUFERVJTXTogXCJNb2RpZnlIZWFkZXJzXCIsXG59XG5leHBvcnQgY29uc3QgTU9DS19UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoTU9DS19UWVBFX0RJQ1QpXG5cbmV4cG9ydCBlbnVtIE1BVENIX1RZUEUge1xuICBDT05UQUlOUyA9IFwiY29udGFpbnNcIixcbiAgRVFVQUxTID0gXCJlcXVhbHNcIixcbiAgUkVHRVhQID0gXCJyZWdleHBcIlxufVxuZXhwb3J0IGNvbnN0IE1BVENIX1RZUEVfRElDVCA9IHtcbiAgW01BVENIX1RZUEUuQ09OVEFJTlNdOiBcImNvbnRhaW5zXCIsXG4gIFtNQVRDSF9UWVBFLkVRVUFMU106IFwiZXF1YWxzXCIsXG4gIFtNQVRDSF9UWVBFLlJFR0VYUF06IFwicmVnZXhwXCJcbn1cblxuZXhwb3J0IGVudW0gUmVzb3VyY2VUeXBlIHtcbiAgTUFJTl9GUkFNRSA9IFwibWFpbl9mcmFtZVwiLFxuICBTVUJfRlJBTUUgPSBcInN1Yl9mcmFtZVwiLFxuICBTVFlMRVNIRUVUID0gXCJzdHlsZXNoZWV0XCIsXG4gIFNDUklQVCA9IFwic2NyaXB0XCIsXG4gIElNQUdFID0gXCJpbWFnZVwiLFxuICBGT05UID0gXCJmb250XCIsXG4gIE9CSkVDVCA9IFwib2JqZWN0XCIsXG4gIFhNTEhUVFBSRVFVRVNUID0gXCJ4bWxodHRwcmVxdWVzdFwiLFxuICBQSU5HID0gXCJwaW5nXCIsXG4gIENTUF9SRVBPUlQgPSBcImNzcF9yZXBvcnRcIixcbiAgTUVESUEgPSBcIm1lZGlhXCIsXG4gIFdFQlNPQ0tFVCA9IFwid2Vic29ja2V0XCIsXG4gIE9USEVSID0gXCJvdGhlclwiLFxuICBXRUJCVU5ETEUgPSBcIndlYmJ1bmRsZVwiLFxuICBXRUJUUkFOU1BPUlQgPSBcIndlYnRyYW5zcG9ydFwiLFxufVxuXG5leHBvcnQgZW51bSBSdWxlQWN0aW9uVHlwZSB7XG4gIEJMT0NLID0gXCJibG9ja1wiLFxuICBSRURJUkVDVCA9IFwicmVkaXJlY3RcIixcbiAgQUxMT1cgPSBcImFsbG93XCIsXG4gIFVQR1JBREVfU0NIRU1FID0gXCJ1cGdyYWRlU2NoZW1lXCIsXG4gIE1PRElGWV9IRUFERVJTID0gXCJtb2RpZnlIZWFkZXJzXCIsXG4gIEFMTE9XX0FMTF9SRVFVRVNUUyA9IFwiYWxsb3dBbGxSZXF1ZXN0c1wiXG59XG5cbmV4cG9ydCBjb25zdCBNQVRDSF9UWVBFX09QVElPTlMgPSBjb252ZXJ0RGljdFRvQXJyYXkoTUFUQ0hfVFlQRV9ESUNUKVxuXG5leHBvcnQgY29uc3QgSFRUUF9TVEFUVVNfQ09ERV9PUFRJT05TID0gT2JqZWN0LmtleXMoSFRUUF9TVEFUVVNfQ09ERV9ESUNUKS5tYXAoKHYpID0+ICh7XG4gIHZhbHVlOiArdixcbiAgbGFiZWw6IGAke3Z9ICR7SFRUUF9TVEFUVVNfQ09ERV9ESUNUW3ZdfWBcbn0pKVxuXG5leHBvcnQgZW51bSBHTE9CQUxfVkFSSUFCTEUge1xuICBDSFJPTUVfUExVU19PUklHSU5BTF9YSFIgPSBcIkNIUk9NRV9QTFVTX09SSUdJTkFMX1hIUlwiLFxuICBDSFJPTUVfUExVU19SRVFVRVNUX01BUCA9IFwiQ0hST01FX1BMVVNfUkVRVUVTVF9NQVBcIixcbiAgQ0hST01FX1BMVVNfUFJPWFlfWEhSID0gXCJDSFJPTUVfUExVU19QUk9YWV9YSFJcIixcbiAgQ0hST01FX1BMVVNfUFJPWFlfUk9VVEVTID0gXCJDSFJPTUVfUExVU19QUk9YWV9ST1VURVNcIixcbn1cbmV4cG9ydCBjb25zdCBHTE9CQUxfVkFSSUFCTEVfTUFQID0ge1xuICBbR0xPQkFMX1ZBUklBQkxFLkNIUk9NRV9QTFVTX09SSUdJTkFMX1hIUl06IFwiQ0hST01FX1BMVVNfT1JJR0lOQUxfWEhSXCIsXG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUkVRVUVTVF9NQVBdOiBcIkNIUk9NRV9QTFVTX1JFUVVFU1RfTUFQXCIsXG4gIFtHTE9CQUxfVkFSSUFCTEUuQ0hST01FX1BMVVNfUFJPWFlfWEhSXTogXCJDSFJPTUVfUExVU19QUk9YWV9YSFJcIixcbiAgW0dMT0JBTF9WQVJJQUJMRS5DSFJPTUVfUExVU19QUk9YWV9ST1VURVNdOiBcIkNIUk9NRV9QTFVTX1BST1hZX1JPVVRFU1wiLFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFBST1hZX1JPVVRFX0tFWSxcbiAgTU9DS19UWVBFLFxuICBNT0NLX1RZUEVfRElDVCxcbiAgTU9DS19UWVBFX09QVElPTlMsXG4gIE1BVENIX1RZUEUsXG4gIEhUVFBfU1RBVFVTX0NPREUsXG4gIE1FU1NBR0VfVFlQRVMsXG4gIEdMT0JBTF9WQVJJQUJMRV9NQVBcbn1cbiIsImV4cG9ydCBjb25zdCBsb2cgPSAoZGF0YSkgPT5cbiAgY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKGBjb25zb2xlLmxvZygnJHtKU09OLnN0cmluZ2lmeShkYXRhKX0nKWApXG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RGljdFRvQXJyYXkoXG4gIGRpY3Q6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgfSxcbiAgY29uZmlnOiBzdHJpbmdbXSA9IFtcInZhbHVlXCIsIFwibGFiZWxcIl0sXG4pOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9W10ge1xuICBjb25zdCBba2V5TmFtZSA9IFwidmFsdWVcIiwgdmFsdWVOYW1lID0gXCJsYWJlbFwiXSA9IGNvbmZpZ1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZGljdCkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XG4gICAgW2tleU5hbWVdOiBrZXksXG4gICAgW3ZhbHVlTmFtZV06IHZhbHVlXG4gIH0pKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGpvaW50VXJsKHVybCkge1xuICB0cnkge1xuICAgIC8vIOWwneivleWIm+W7uuS4gOS4qlVSTOWvueixoVxuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwodXJsKVxuXG4gICAgLy8g5qOA5p+l5Y2P6K6u5piv5ZCm5Li6aHR0cOaIlmh0dHBzXG4gICAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCA9PT0gXCJodHRwOlwiIHx8IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xuICAgICAgcmV0dXJuIHVybCAvLyDov5Tlm57ljp9VUkzvvIzlm6DkuLrlroPmmK/kuIDkuKrmnInmlYjnmoRIVFRQKFMp5Zyw5Z2AXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcHJvdG9jb2xcIikgLy8g5oqb5Ye66ZSZ6K+v77yM5aSE55CG6Z2eSFRUUChTKeWNj+iurlxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyDlpoLmnpxVUkzmnoTpgKDlpLHotKXmiJbljY/orq7kuI3mraPnoa7vvIzliJnov5Tlm57kv67mraPlkI7nmoRVUkxcbiAgICByZXR1cm4gbG9jYXRpb24ub3JpZ2luICsgdXJsXG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Ub3AoYXJyLCBpbmRleCkge1xuICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGFyci5sZW5ndGgpIHtcbiAgICAvLyDku47mjIflrprntKLlvJXkvY3nva7np7vpmaTlhYPntKBcbiAgICBjb25zdCBbaXRlbV0gPSBhcnIuc3BsaWNlKGluZGV4LCAxKVxuICAgIC8vIOWwhuivpeWFg+e0oOaPkuWFpeWIsOaVsOe7hOeahOW8gOWktFxuICAgIGFyci51bnNoaWZ0KGl0ZW0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29udmVydERpY3RUb0FycmF5LFxuICBsb2csXG4gIGpvaW50VXJsLFxuICBtb3ZlVG9Ub3Bcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5leHBvcnQgZW51bSBIVFRQX1NUQVRVU19DT0RFIHtcbiAgQ09OVElOVUUgPSAxMDAsXG4gIFNXSVRDSElOR19QUk9UT0NPTFMgPSAxMDEsXG4gIFBST0NFU1NJTkcgPSAxMDIsXG5cbiAgT0sgPSAyMDAsXG4gIENSRUFURUQgPSAyMDEsXG4gIEFDQ0VQVEVEID0gMjAyLFxuICBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTiA9IDIwMyxcbiAgTk9fQ09OVEVOVCA9IDIwNCxcbiAgUkVTRVRfQ09OVEVOVCA9IDIwNSxcbiAgUEFSVElBTF9DT05URU5UID0gMjA2LFxuXG4gIE1VTFRJX1NUQVRVUyA9IDIwNyxcbiAgQUxSRUFEWV9SRVBPUlRFRCA9IDIwOCxcblxuICBJTV9VU0VEID0gMjI2LFxuXG4gIE1VTFRJUExFX0NIT0lDRVMgPSAzMDAsXG4gIE1PVkVEX1BFUk1BTkVOVExZID0gMzAxLFxuICBGT1VORCA9IDMwMixcbiAgU0VFX09USEVSID0gMzAzLFxuICBOT1RfTU9ESUZJRUQgPSAzMDQsXG4gIFVTRV9QUk9YWSA9IDMwNSxcbiAgVEVNUE9SQVJZX1JFRElSRUNUID0gMzA3LFxuICBQRVJNQU5FTlRfUkVESVJFQ1QgPSAzMDgsXG5cbiAgQkFEX1JFUVVFU1QgPSA0MDAsXG4gIFVOQVVUSE9SSVpFRCA9IDQwMSxcbiAgUEFZTUVOVF9SRVFVSVJFRCA9IDQwMixcbiAgRk9SQklEREVOID0gNDAzLFxuICBOT1RfRk9VTkQgPSA0MDQsXG4gIE1FVEhPRF9OT1RfQUxMT1dFRCA9IDQwNSxcbiAgTk9UX0FDQ0VQVEFCTEUgPSA0MDYsXG4gIFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEID0gNDA3LFxuICBSRVFVRVNUX1RJTUVPVVQgPSA0MDgsXG4gIENPTkZMSUNUID0gNDA5LFxuICBHT05FID0gNDEwLFxuICBMRU5HVEhfUkVRVUlSRUQgPSA0MTEsXG4gIFBSRUNPTkRJVElPTl9GQUlMRUQgPSA0MTIsXG4gIFBBWUxPQURfVE9PX0xBUkdFID0gNDEzLFxuICBVUklfVE9PX0xPTkcgPSA0MTQsXG4gIFVOU1VQUE9SVEVEX01FRElBX1RZUEUgPSA0MTUsXG4gIFJBTkdFX05PVF9TQVRJU0ZJQUJMRSA9IDQxNixcbiAgRVhQRUNUQVRJT05fRkFJTEVEID0gNDE3LFxuICBJX0FNX0FfVEVBUE9UID0gNDE4LFxuICBNSVNESVJFQ1RFRF9SRVFVRVNUID0gNDIxLFxuICBVTlBST0NFU1NBQkxFX0VOVElUWSA9IDQyMixcbiAgTE9DS0VEID0gNDIzLFxuICBGQUlMRURfREVQRU5ERU5DWSA9IDQyNCxcbiAgVVBHUkFERV9SRVFVSVJFRCA9IDQyNixcbiAgUFJFQ09ORElUSU9OX1JFUVVJUkVEID0gNDI4LFxuICBUT09fTUFOWV9SRVFVRVNUUyA9IDQyOSxcbiAgUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRSA9IDQzMSxcbiAgVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMgPSA0NTEsXG5cbiAgSU5URVJOQUxfU0VSVkVSX0VSUk9SID0gNTAwLFxuICBOT1RfSU1QTEVNRU5URUQgPSA1MDEsXG4gIEJBRF9HQVRFV0FZID0gNTAyLFxuICBTRVJWSUNFX1VOQVZBSUxBQkxFID0gNTAzLFxuICBHQVRFV0FZX1RJTUVPVVQgPSA1MDQsXG4gIEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEID0gNTA1LFxuICBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUyA9IDUwNixcbiAgSU5TVUZGSUNJRU5UX1NUT1JBR0UgPSA1MDcsXG4gIExPT1BfREVURUNURUQgPSA1MDgsXG4gIE5PVF9FWFRFTkRFRCA9IDUxMCxcbiAgTkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRCA9IDUxMVxufVxuZXhwb3J0IGNvbnN0IEhUVFBfU1RBVFVTX0NPREVfRElDVCA9IHtcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ09OVElOVUVdOiBcIkNvbnRpbnVlXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNXSVRDSElOR19QUk9UT0NPTFNdOiBcIlN3aXRjaGluZyBQcm90b2NvbHNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJPQ0VTU0lOR106IFwiUHJvY2Vzc2luZ1wiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk9LXTogXCJPS1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5DUkVBVEVEXTogXCJDcmVhdGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkFDQ0VQVEVEXTogXCJBY2NlcHRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTl06IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9fQ09OVEVOVF06IFwiTm8gQ29udGVudFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SRVNFVF9DT05URU5UXTogXCJSZXNldCBDb250ZW50XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlBBUlRJQUxfQ09OVEVOVF06IFwiUGFydGlhbCBDb250ZW50XCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuTVVMVElfU1RBVFVTXTogXCJNdWx0aS1TdGF0dXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQUxSRUFEWV9SRVBPUlRFRF06IFwiQWxyZWFkeSBSZXBvcnRlZFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1VTFRJUExFX0NIT0lDRVNdOiBcIk11bHRpcGxlIENob2ljZXNcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTU9WRURfUEVSTUFORU5UTFldOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZPVU5EXTogXCJGb3VuZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5TRUVfT1RIRVJdOiBcIlNlZSBPdGhlclwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfTU9ESUZJRURdOiBcIk5vdCBNb2RpZmllZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VU0VfUFJPWFldOiBcIlVzZSBQcm94eVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5URU1QT1JBUllfUkVESVJFQ1RdOiBcIlRlbXBvcmFyeSBSZWRpcmVjdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QRVJNQU5FTlRfUkVESVJFQ1RdOiBcIlBlcm1hbmVudCBSZWRpcmVjdFwiLFxuXG4gIFtIVFRQX1NUQVRVU19DT0RFLkJBRF9SRVFVRVNUXTogXCJCYWQgUmVxdWVzdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTkFVVEhPUklaRURdOiBcIlVuYXV0aG9yaXplZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVlNRU5UX1JFUVVJUkVEXTogXCJQYXltZW50IFJlcXVpcmVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkZPUkJJRERFTl06IFwiRm9yYmlkZGVuXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9GT1VORF06IFwiTm90IEZvdW5kXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk1FVEhPRF9OT1RfQUxMT1dFRF06IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLk5PVF9BQ0NFUFRBQkxFXTogXCJOb3QgQWNjZXB0YWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRF06IFwiUHJveHkgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUkVRVUVTVF9USU1FT1VUXTogXCJSZXF1ZXN0IFRpbWVvdXRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQ09ORkxJQ1RdOiBcIkNvbmZsaWN0XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLkdPTkVdOiBcIkdvbmVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTEVOR1RIX1JFUVVJUkVEXTogXCJMZW5ndGggUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJFQ09ORElUSU9OX0ZBSUxFRF06IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5QQVlMT0FEX1RPT19MQVJHRV06IFwiUGF5bG9hZCBUb28gTGFyZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVVJJX1RPT19MT05HXTogXCJVUkkgVG9vIExvbmdcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5TVVBQT1JURURfTUVESUFfVFlQRV06IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5SQU5HRV9OT1RfU0FUSVNGSUFCTEVdOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5FWFBFQ1RBVElPTl9GQUlMRURdOiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5JX0FNX0FfVEVBUE9UXTogXCJJJ20gYSB0ZWFwb3RcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTUlTRElSRUNURURfUkVRVUVTVF06IFwiTWlzZGlyZWN0ZWQgUmVxdWVzdFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5VTlBST0NFU1NBQkxFX0VOVElUWV06IFwiVW5wcm9jZXNzYWJsZSBFbnRpdHlcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTE9DS0VEXTogXCJMb2NrZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuRkFJTEVEX0RFUEVOREVOQ1ldOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlVQR1JBREVfUkVRVUlSRURdOiBcIlVwZ3JhZGUgUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuUFJFQ09ORElUSU9OX1JFUVVJUkVEXTogXCJQcmVjb25kaXRpb24gUmVxdWlyZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVE9PX01BTllfUkVRVUVTVFNdOiBcIlRvbyBNYW55IFJlcXVlc3RzXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VdOiBcIlJlcXVlc3QgSGVhZGVyIEZpZWxkcyBUb28gTGFyZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlNdOiBcIlVuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zXCIsXG5cbiAgW0hUVFBfU1RBVFVTX0NPREUuSU5URVJOQUxfU0VSVkVSX0VSUk9SXTogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTk9UX0lNUExFTUVOVEVEXTogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuQkFEX0dBVEVXQVldOiBcIkJhZCBHYXRld2F5XCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlNFUlZJQ0VfVU5BVkFJTEFCTEVdOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuR0FURVdBWV9USU1FT1VUXTogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuSFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURURdOiBcIkhUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkXCIsXG4gIFtIVFRQX1NUQVRVU19DT0RFLlZBUklBTlRfQUxTT19ORUdPVElBVEVTXTogXCJWYXJpYW50IEFsc28gTmVnb3RpYXRlc1wiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5JTlNVRkZJQ0lFTlRfU1RPUkFHRV06IFwiSW5zdWZmaWNpZW50IFN0b3JhZ2VcIixcbiAgW0hUVFBfU1RBVFVTX0NPREUuTE9PUF9ERVRFQ1RFRF06IFwiTG9vcCBEZXRlY3RlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5OT1RfRVhURU5ERURdOiBcIk5vdCBFeHRlbmRlZFwiLFxuICBbSFRUUF9TVEFUVVNfQ09ERS5ORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEXTogXCJOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIEhUVFBfU1RBVFVTX0NPREUsXG4gIEhUVFBfU1RBVFVTX0NPREVfRElDVFxufSJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJ4aHIuZWUxZjZiZWMuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);