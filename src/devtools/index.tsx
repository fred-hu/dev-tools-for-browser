import React from "react"
import html from "url:./mock-record/index.html"
import icon from "/assets/svg/devtool-icon.svg"
// import fontPropertiesHTML from "url:./font-properties/index.html"
import { log } from '../app/utils'
chrome.devtools.panels.create(
  "Mock Record",
  icon.split('/').pop(),
  // See: https://github.com/PlasmoHQ/plasmo/issues/106#issuecomment-1188539625
  html.split("/").pop(),
  function (panel) {
    // 当面板激活时输出调试信息
    panel.onShown.addListener(function (window) {
      log(html)
    })
  }
)

// chrome.devtools.panels.elements.createSidebarPane(
//   "Font Properties",
//   function (sidebar) {
//     sidebar.setPage(fontPropertiesHTML.split("/").pop())
//   }
// )

function IndexDevtools() {
  return (
    <h2>
      Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
    </h2>
  )
}

export default IndexDevtools
