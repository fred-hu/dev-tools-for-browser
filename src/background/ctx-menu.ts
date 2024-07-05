chrome.runtime.id && chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: '侧边栏',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
