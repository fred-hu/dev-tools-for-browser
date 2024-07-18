import { debounce } from 'radash';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import { GLOBAL_VARIABLE, WHITE_URLS } from '~app/constants';
import store, { STORE_KEY, dataStore } from '~app/utils/store';

import { onTabCallback } from '../tools';

const injectMap = new Map();

const inject = debounce({ delay: 200 }, async (windowId: number, tabId: number) => {
  const data = (await dataStore.getItem(STORE_KEY.ROUTES)) || [];
  const [tab] = await chrome.tabs.query({
    active: true,
  });
  const enableInTab = tab?.url?.startsWith('http') && !WHITE_URLS.some((v) => tab?.url?.includes(v));
  const config: Record<string, boolean> = await store.get(STORE_KEY.GLOBAL_CONFIG);
  const mockEnabled = config?.mock ?? false;
  if (mockEnabled && enableInTab) {
    const tag = `mock-${windowId}-${tabId}`;
    // 启用Mock且脚未插入: 先注入全局待mock路由数据再注入脚本
    if (!injectMap.has(tag) || injectMap.get(tag) === false) {
      try {
        chrome.scripting.executeScript({
          target: {
            tabId,
          },
          world: 'MAIN', // MAIN in order to access the window object
          func: async (data, varName: string) => {
            try {
              window[varName] = data;
            } catch (error) {
              console.log(error);
            }
          },
          args: [data, GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES],
        });
      } catch (error) {
        console.log('enableMock:', error);
      }
    } else {
      // 启用Mock且脚本已插入: 恢复路由
      try {
        chrome.scripting.executeScript({
          target: {
            tabId,
          },
          world: 'MAIN', // MAIN in order to access the window object
          func: async (data, varName: string) => {
            try {
              window[varName] = data;
            } catch (error) {
              console.log(error);
            }
          },
          args: [data, GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES],
        });
      } catch (error) {
        console.log('enableMock:', error);
      }
    }
    injectMap.set(tag, true);
  }
  // 未启用Mock: 清空路由
  if (!mockEnabled && enableInTab) {
    try {
      chrome.scripting.executeScript({
        target: {
          tabId,
        },
        world: 'MAIN', // MAIN in order to access the window object
        func: async (varName) => {
          try {
            window[varName] = [];
          } catch (error) {
            console.log(error);
          }
        },
        args: [GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES],
      });
    } catch (error) {
      console.log('enableMock:', error);
    }
  }
  console.log('injectMap:', injectMap);
});
// 激活tab
const onActivated = async (e) => {
  const { windowId, tabId } = e;
  const tab = await chrome.tabs.get(tabId);
  if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
    inject(windowId, tabId);
  }
};
// 页面刷新
const onUpdated = function (tabId, changeInfo, tab) {
  const { windowId } = tab;
  const tag = `mock-${windowId}-${tabId}`;
  if (injectMap.has(tag)) {
    injectMap.delete(tag);
  }
  if (tab.url.startsWith('http')) {
    inject(windowId, tabId);
  }
};
// 关闭浏览器
const onRemoved = (windowId) => {
  injectMap.forEach((value, key) => {
    if (key.startsWith(`mock-${windowId}-`)) {
      if (injectMap.has(key)) {
        injectMap.delete(key);
      }
    }
  });
};
// 关闭tab
const onTabRemove = (tabId, removeInfo) => {
  const { windowId } = removeInfo;
  const tag = `mock-${windowId}-${tabId}`;
  if (injectMap.has(tag)) {
    injectMap.delete(tag);
  }
};

// 激活tab
if (!chrome.tabs.onActivated.hasListener(onActivated)) {
  chrome.tabs.onActivated.addListener(onActivated);
}
if (!chrome.tabs.onUpdated.hasListener(onUpdated)) {
  // 刷新页面
  chrome.tabs.onUpdated.addListener(onUpdated);
}
if (!chrome.windows.onRemoved.hasListener(onRemoved)) {
  // 监听关闭浏览器
  chrome.windows.onRemoved.addListener(onRemoved);
}
if (!chrome.tabs.onRemoved.hasListener(onTabRemove)) {
  // 监听关闭标签页
  chrome.tabs.onRemoved.addListener(onTabRemove);
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { enable } = req.body;
  const [tab] = await chrome.tabs.query({
    active: true,
  });
  const enableInTab = tab?.url?.startsWith('http') && !WHITE_URLS.some((v) => tab?.url?.includes(v));
  if (enable && enableInTab) {
    // 当前tab即时启动
    const { windowId, id } = tab;
    onTabCallback(id, () => {
      inject(windowId, id);
    });
  }
  if (!enable && enableInTab) {
    const { id } = tab;
    onTabCallback(id, () => {
      try {
        chrome.scripting.executeScript({
          target: {
            tabId: id,
          },
          world: 'MAIN', // MAIN in order to access the window object
          func: async (varName) => {
            try {
              window[varName] = [];
            } catch (error) {
              console.log(error);
            }
          },
          args: [GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES],
        });
      } catch (error) {
        console.log('enableMock:', error);
      }
    });
  }
  res.send({});
};

export default handler;
