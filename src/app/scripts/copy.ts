// 解除网页复制限制脚本
document.addEventListener(
  'copy',
  (event) => {
    event.stopImmediatePropagation();
  },
  true
);

document.addEventListener(
  'paste',
  (event) => {
    event.stopImmediatePropagation();
  },
  true
);

document.addEventListener(
  'cut',
  (event) => {
    event.stopImmediatePropagation();
  },
  true
);

document.body.style.userSelect = 'auto';
document.querySelectorAll('*').forEach((el) => {
  if (el instanceof HTMLElement) {
    el.style.userSelect = 'auto';
  }
});
