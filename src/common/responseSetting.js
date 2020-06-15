/*
* 页面响应方法
* des:默认设计稿大小640px
* fSize:默认字体大小100px
* */
export default function (des = 640, fSize = 100) {
  let computedSize = function () {
    let HTML = document.documentElement,
      winW = parseFloat(HTML.offsetWidth);

    if (winW >= des) {
      HTML.style.fontSize = fSize + 'px'
      return
    }

    HTML.style.fontSize = (winW / des * fSize) + 'px'
  }
  computedSize();
  window.onresize = computedSize;
}
