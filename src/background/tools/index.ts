export const onTabCallback = (tabId: number, callback) => chrome.tabs.get(tabId, function(tab) {
  if (chrome.runtime.lastError) {
      return;
  }
  callback?.();
});