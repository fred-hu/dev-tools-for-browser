import store, { initStore, STORE_KEY } from '~app/utils/store';

chrome.runtime.onInstalled.addListener(async function (details) {
  if (details.reason === 'install') {
    initStore();
    console.log('Extension installed!');
    // 在这里执行安装后的初始化操作
  } else if (details.reason === 'update') {
    console.log('Extension updated!');
    // 在这里执行更新后的操作
  } else if (details.reason === 'chrome_update') {
    console.log('Chrome updated!');
    // 在这里执行Chrome更新后的操作
  } else if (details.reason === 'shared_module_update') {
    console.log('Shared module updated!');
    // 在这里执行共享模块更新后的操作
  }
});
