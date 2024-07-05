import React from 'react';
import html from 'url:./mock-record/index.html';

import { log } from '../app/utils';
import icon from '/assets/svg/devtool-icon.svg';

chrome.devtools.panels.create('Mock Record', icon.split('/').pop(), html.split('/').pop(), function (panel) {
  // 当面板激活时输出调试信息
  panel.onShown.addListener(function (window) {
    log(html);
  });
});

function IndexDevtools() {
  return <h2>devtools</h2>;
}

export default IndexDevtools;
