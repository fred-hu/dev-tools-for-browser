import type { PlasmoCSConfig } from "plasmo"
import inject from "url:~app/scripts/xhr.ts"

import { MESSAGE_TYPES } from "~app/constants"
import store, { STORE_KEY } from "~app/utils/store"

const temp = document.createElement("script")
temp.setAttribute("type", "text/javascript")
temp.src = inject
temp.onload = async function () {
  // 向content xhr.ts 发消息更新PROXY_ROUTES 【加载完就同步-主动行为】
  const data = await store.getItem(STORE_KEY.ROUTES)
  const config: Record<string, boolean> = await store.get(STORE_KEY.GLOBAL_SWITCH_CONFIG)
  const mockEnabled = config?.mock ?? false
  window.postMessage({
    action: MESSAGE_TYPES.MATCHING_UPDATE,
    payload: {
      secret: 'content-to-xhr',
      data: mockEnabled ? data || [] : [],
    }
  })
  temp.parentNode.removeChild(temp)
}
document.documentElement.appendChild(temp)

// 监听来自 background script 的消息
// chrome.runtime.onMessage.addListener(
//   async function(request, sender, sendResponse) {
//     if (request.action === MESSAGE_TYPES.MATCHING_UPDATE) {
//       console.log("Received hello from background");
//       sendResponse({farewell: "goodbye"});
//     }
//     return true;  // Will respond asynchronously.
//   }
// );

store.watch({
  [STORE_KEY.ROUTES]: (c) => {
    // 向content xhr.ts 发消息更新PROXY_ROUTES 【监听到数据变化就同步-主动行为】
    window.postMessage({
      action: MESSAGE_TYPES.MATCHING_UPDATE,
      payload: {
        data: c?.newValue || [],
        secret: 'content-to-xhr'
      }
    })
  },
  [STORE_KEY.LOADING]: (c) => {
    window.postMessage({
      action: MESSAGE_TYPES.SET_LOADING,
      payload: {
        secret: 'content-to-content',
        data: c?.newValue
      } 
    })
  }
})
// 长连接和bg通信
const port = chrome.runtime.connect({ name: "knockknock" })
port.onMessage.addListener(function (msg) {
  const { data, event, id, headers } = msg
  if (event in MESSAGE_TYPES) {
    switch (event) {
      
    }
  }
})

// eslint-disable-next-line import/prefer-default-export
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  run_at: "document_start"
}