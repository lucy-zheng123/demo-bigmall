/**
 * 工具函数 封装getCss setCss...
 * @type {{css: *, setCss: *, getCss: *, setGroupCss: *}}
 */

/**
 * 获取元素的样式值，并且把单位去掉
 * @param ele  获取的元素
 * @param attr 需要获取哪个样式
 */
let getCss = function (ele, attr) {
  let val = null,
      re = /^-?(\d+)\.?(\d)+(em|px|rem)$/;//=>正则用来匹配是否带单位
  if ('getComputedStyle' in window) {
    let val = window.getComputedStyle(ele, null)[attr];
    if (re.test(val)) {
      val = parseFloat(val);
    }
    return val;
  }

};
/**
 * 设置元素的样式值
 * @param ele   需要设置的元素
 * @param attr  需要设置的属性
 * @param val   设置属性的值
 */
let setCss = function (ele, attr, val) {
  //给数字加单位
  if (!isNaN(val)) {
    //如果是Z-INDEX OPACITY则不需要加单位
    if (attr !== 'zIndex' && attr !== 'opacity') {
      val += 'px';
    }
  }
  ele.style[attr] = val;
}
/**
 * 批量设置元素的样式
 * @param ele       需要修改样式的元素
 * @param options   需要修改的样式 以键值对的方式传递
 */
let setGroupCss = function (ele, options = {}) {
  for (let attr in options) {
    //如果不是自己私有的属性则直接跳出循环
    if (!options.hasOwnProperty(attr)) break;
    setCss(ele, attr, options[attr]);
  }
}
/**
 * 将三个方法合并为一个，方便调用
 * @param arg
 */
let css = function (...arg) {
  let len = arg.length,
      second = arg[1], //=>获取第二个参数和参数的长度，判断需要执行哪个方法
      fn = setCss;
  //=>如果长度是2 说明执行的是   getCss 和 setGroupCss
  if (len === 2) {
    if (typeof second === 'object') {
      fn = setGroupCss;
    } else {
      fn = getCss;
    }
  }
  return fn(...arg);
}

export default {
  setCss: setCss,
  getCss: getCss,
  setGroupCss: setGroupCss,
  css: css
}