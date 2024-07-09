import { MESSAGE_TYPES } from '~app/constants';

chrome.runtime.id &&
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'parentMenu',
      title: 'DevTools',
      contexts: ['all'],
    });
    chrome.contextMenus.create({
      id: 'jsonToTsType',
      parentId: 'parentMenu',
      title: 'JSON to TS type',
      contexts: ['all'],
    });
    chrome.contextMenus.create({
      id: 'qrCode',
      parentId: 'parentMenu',
      title: '生成二维码',
      contexts: ['all'],
    });
  });

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'parentMenu') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
  if (info.menuItemId === 'jsonToTsType') {
    if (info.selectionText) {
      let json = null;
      try {
        json = JSON.parse(info.selectionText);

        chrome.windows.getAll({ populate: true }, async (windows) => {
          const panelUrl = `chrome-extension://${chrome.runtime.id}/tabs/jsontots.html`;
          let existingPanel = null;
          // 遍历所有窗口，查找是否已经存在具有相同 URL 的面板
          for (const window of windows) {
            if (window.type === 'popup') {
              for (const tab of window.tabs) {
                if (tab.url.includes(panelUrl)) {
                  existingPanel = window;
                  break;
                }
              }
            }
            if (existingPanel) break;
          }
          const callback = function (request, sender, sendResponse) {
            if (request.action === MESSAGE_TYPES.SET_JSON_TO_TYPES_READY) {
              if (request.payload.secret === 'jsontotype-to-popup' && request.payload.data) {
                sendResponse({ data: info.selectionText });
              }
            }
          };
          if (existingPanel) {
            // 如果已经存在具有相同 URL 的面板，则激活该窗口
            await chrome.windows.update(existingPanel.id, { focused: true });
            chrome.tabs.sendMessage(existingPanel.tabs[0].id, { data: info.selectionText });
          } else {
            if (chrome.runtime?.id) {
              chrome.runtime.onMessage.removeListener(callback);
              chrome.runtime.onMessage.addListener(callback);
            }
            // 如果不存在，则创建一个新的面板
            const tab = await chrome.windows.create({
              url: panelUrl,
              type: 'panel',
              width: 600,
              height: 750,
            });
          }
        });
      } catch (error) {}
    }
  }
  if (info.menuItemId === 'qrCode') {
    // 获取页面选中的内容，并生成二维码
    if (info.selectionText) {
      chrome.windows.getAll({ populate: true }, async (windows) => {
        const panelUrl = `chrome-extension://${chrome.runtime.id}/tabs/qrcode.html`;
        let existingPanel = null;
        // 遍历所有窗口，查找是否已经存在具有相同 URL 的面板
        for (const window of windows) {
          if (window.type === 'popup') {
            for (const tab of window.tabs) {
              if (tab.url.includes(panelUrl)) {
                existingPanel = window;
                break;
              }
            }
          }
          if (existingPanel) break;
        }
        const callback = function (request, sender, sendResponse) {
          if (request.action === MESSAGE_TYPES.SET_QR_CODE_READY) {
            if (request.payload.secret === 'qrcode-to-popup' && request.payload.data) {
              sendResponse({ data: info.selectionText });
            }
          }
        };
        if (existingPanel) {
          // 如果已经存在具有相同 URL 的面板，则激活该窗口
          await chrome.windows.update(existingPanel.id, { focused: true });
          chrome.tabs.sendMessage(existingPanel.tabs[0].id, { data: info.selectionText });
        } else {
          if (chrome.runtime?.id) {
            chrome.runtime.onMessage.removeListener(callback);
            chrome.runtime.onMessage.addListener(callback);
          }
          // 如果不存在，则创建一个新的面板
          const tab = await chrome.windows.create({
            url: panelUrl,
            type: 'panel',
            width: 400,
            height: 400,
          });
        }
      });
    }
  }
});
