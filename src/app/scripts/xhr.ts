import { GLOBAL_VARIABLE, MATCH_TYPE, MESSAGE_TYPES, MOCK_TYPE, REQUEST_TYPE } from '~app/constants';
import { jointUrl } from '~app/utils';

(function () {
  const originalFetch = window.fetch;
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  const originalGetAllResponseHeaders = XMLHttpRequest.prototype.getAllResponseHeaders;
  const originalGetResponseHeader = XMLHttpRequest.prototype.getResponseHeader;
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  const callback = function (msg) {
    const { data } = msg;
    const { action, payload } = data;
    if (action === MESSAGE_TYPES.MATCHING_UPDATE && payload?.secret === 'content-to-xhr') {
      window[GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES] = payload.data || [];
    }
  };
  const delayPromise = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  window.removeEventListener('message', callback);
  window.addEventListener('message', callback);

  const enableMockCheck = (routes, xhr, method, originalUrl) => {
    let route;
    const enableRoutes = routes.filter(({ enable, mockType }) => enable && mockType === MOCK_TYPE.NORMAL);
    const enable =
      routes.length > 0 &&
      enableRoutes.some((item) => {
        const { url, matchType, requestType } = item;
        const isMethodMatched = method.toLowerCase() === requestType.toLowerCase() || requestType === REQUEST_TYPE.ALL;
        if (isMethodMatched) {
          if (!url && !matchType) {
            // 不限URL
            return true && (route = item);
          }
          if (matchType === MATCH_TYPE.REGEXP) {
            const REG = new RegExp(url, 'g');
            return REG.test(originalUrl) && (route = item);
          }
          if (matchType === MATCH_TYPE.CONTAINS) {
            return originalUrl.includes(url) && (route = item);
          }
          if (matchType === MATCH_TYPE.EQUALS) {
            return originalUrl === url && (route = item);
          }
        }
        return false;
      });
    if (enable) {
      Object.defineProperty(xhr, 'mock', { writable: true, value: true, enumerable: false, configurable: true });
      Object.defineProperty(xhr, 'mockConfig', { writable: true, value: route, enumerable: false, configurable: true });
      // eslint-disable-next-line max-len
      Object.defineProperty(xhr, 'responseURL', {
        writable: true,
        value: originalUrl,
        enumerable: false,
        configurable: true,
      });
    } else {
      delete xhr.mock;
      delete xhr.mockConfig;
    }
    return enable;
  };

  XMLHttpRequest.prototype.open = function (...args) {
    const [method, url] = args;
    const { responseURL } = this;
    enableMockCheck(window[GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES] ?? [], this, method, responseURL || jointUrl(url));
    originalOpen.apply(this, args);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    const { mock, mockConfig, responseType, responseURL } = this;
    if (mock) {
      window.postMessage({
        action: MESSAGE_TYPES.SET_LOADING,
        payload: {
          secret: 'xhr-to-content',
          data: true,
          route: { ...mockConfig, url: responseURL, time: new Date(), xhrType: 'xhr' },
        },
      });
      const { response, responseStatus, delay } = mockConfig;
      Object.defineProperty(this, 'readyState', { writable: true, value: 4 });
      Object.defineProperty(this, 'status', { writable: true, value: responseStatus ?? 200 });
      switch (responseType) {
        case 'json': {
          Object.defineProperty(this, 'response', { writable: true, value: response ? JSON.parse(response) : null });
          break;
        }
        case 'text': {
          Object.defineProperty(this, 'responseText', { writable: true, value: response });
          break;
        }
        default: {
          Object.defineProperty(this, 'responseText', { writable: true, value: response });
          break;
        }
      }
      setTimeout(() => {
        this?.onreadystatechange?.();
        this?.onloadend?.();
        this?.onload?.();
        window.postMessage({
          action: MESSAGE_TYPES.SET_LOADING,
          payload: {
            secret: 'xhr-to-content',
            data: false,
          },
        });
      }, delay);
    } else {
      originalSend.apply(this, args);
    }
  };
  XMLHttpRequest.prototype.setRequestHeader = function (...args) {
    const { mock, mockConfig } = this;
    if (mock) {
      const { enableMockRequestHeaders, mockRequestHeaders } = mockConfig;
      if (enableMockRequestHeaders) {
        const headers = JSON.parse(mockRequestHeaders);
        for (const key in headers) {
          if (Object.prototype.hasOwnProperty.call(headers, key)) {
            const element = headers[key];
            originalSetRequestHeader.apply(this, [key, element]);
          }
        }
      }
    } else {
      return originalSetRequestHeader.apply(this, args);
    }
  };
  XMLHttpRequest.prototype.getAllResponseHeaders = function (...args) {
    const { mock, mockConfig } = this;
    if (mock) {
      const { mockResponseHeaders, enableMockResponseHeaders } = mockConfig;
      return enableMockResponseHeaders
        ? JSON.parse(mockResponseHeaders)
        : originalGetAllResponseHeaders.apply(this, args);
    } else {
      return originalGetAllResponseHeaders.apply(this, args);
    }
  };
  XMLHttpRequest.prototype.getResponseHeader = function (...args) {
    const [key] = args;
    const { mock, mockConfig } = this;
    if (mock) {
      const { mockResponseHeaders, enableMockResponseHeaders } = mockConfig;
      return enableMockResponseHeaders
        ? JSON.parse(mockResponseHeaders)[key]
        : originalGetResponseHeader.apply(this, args);
    } else {
      return originalGetResponseHeader.apply(this, args);
    }
  };

  window.fetch = async (...args) => {
    const [url, config = {}] = args;
    const { method, body } = config ?? {};
    if (url && method) {
      enableMockCheck(window[GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES] ?? [], this, method, jointUrl(url));
    }
    const { mock, mockConfig, responseURL } = this;
    if (mock) {
      const {
        response,
        responseStatus,
        delay,
        enableMockRequestHeaders,
        enableMockResponseHeaders,
        mockRequestHeaders,
        mockResponseHeaders,
      } = mockConfig;
      window.postMessage({
        action: MESSAGE_TYPES.SET_LOADING,
        payload: {
          secret: 'xhr-to-content',
          data: true,
          route: { ...mockConfig, url: responseURL, time: new Date(), xhrType: 'fetch' },
        },
      });
      await delayPromise(delay);
      const res = new Response(JSON.stringify(response), {
        headers: enableMockResponseHeaders ? JSON.parse(mockResponseHeaders) : {},
        status: responseStatus,
        statusText: '',
      });
      Object.defineProperty(res, 'url', { writable: true, value: jointUrl(url) });
      window.postMessage({
        action: MESSAGE_TYPES.SET_LOADING,
        payload: {
          secret: 'xhr-to-content',
          data: false,
        },
      });
      return res;
    } else {
      return await originalFetch(...args);
    }
  };
})();
