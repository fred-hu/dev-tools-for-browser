import { debounce } from 'radash';
import copy from 'url:~app/scripts/copy.ts';
import { onTabCallback } from '../tools'
import type { PlasmoMessaging } from '@plasmohq/messaging';

import store, { STORE_KEY } from '~app/utils/store';
import { WHITE_URLS } from '~app/constants';
const injectMap = new Map();

const inject = debounce({ delay: 200 }, async (windowId: number, tabId: number) => {
  const config: Record<string, boolean> = await store.get(STORE_KEY.GLOBAL_CONFIG);
  const copyEnabled = config?.copy ?? false;
  if (copyEnabled) {
    const tag = `copy-${windowId}-${tabId}`;
    if (!injectMap.has(tag) || injectMap.get(tag) === false) {
      chrome.scripting.executeScript(
        {
          target: {
            tabId,
          },
          world: 'MAIN', // MAIN in order to access the window object
          files: [copy.split('/').pop().split('?')[0]],
        },
        () => {
          // 成功回调
          console.log('injected successfully');
        }
      );
    } else {
      console.log('already injected');
    }
    injectMap.set(tag, true);
  }
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
  const tag = `copy-${windowId}-${tabId}`;
  if (injectMap.has(tag)) {
    injectMap.delete(tag);
  }
  if (tab.url.startsWith('http') && changeInfo.status === 'complete' && tab.status === 'complete') {
    inject(windowId, tabId);
  }
};
// 关闭浏览器
const onRemoved = (windowId) => {
  injectMap.forEach((value, key) => {
    if (key.startsWith(`copy-${windowId}-`)) {
      if (injectMap.has(key)) {
        injectMap.delete(key);
      }
    }
  });
};
// 关闭tab
const onTabRemove = (tabId, removeInfo) => {
  const { windowId } = removeInfo;
  const tag = `copy-${windowId}-${tabId}`;
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
  if (enable) {
    // 当前tab即时启动
    const [tab] = await chrome.tabs.query({
      active: true,
    });
    if (tab) {
      const { windowId, id, url } = tab;
      if (url && (url.startsWith('http://') || url.startsWith('https://')) && !WHITE_URLS.some((v) => url?.includes(v))) {
        onTabCallback(id, () => {
          inject(windowId, id);
        })
      }
    }
  }
  res.send({});
};

export default handler;
