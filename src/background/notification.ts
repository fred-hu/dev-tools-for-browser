import image from 'data-base64:/assets/icon.png';

chrome.runtime.id && chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.notifications) {
    const id = `my-notification${new Date()}`;
    chrome.notifications.create(
      id, // 通知的ID，用于识别通知
      {
        type: 'basic', // 通知类型
        iconUrl: image, // 通知图标的URL
        title: 'My Notification', // 通知标题
        message: 'Hello, world!', // 通知内容
      },
      () => {
        // console.log("Last error:", chrome.runtime.lastError)
      }
    );
    // 发送消息回复给popup页面
    sendResponse({ farewell: 'Goodbye from background' });
    chrome.notifications.clear(id);
  }
});
