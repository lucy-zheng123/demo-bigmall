import utils from "./utils"
/*
* 此文件用于封装动画
* */

/**
 * 计算公式
 * @type {{linear: (function(*, *, *, *): *)}}  匀速运动
 * time:当前时间
 * duration:运动总时间
 * begin:开始位置
 * change:需要改变到的位置
 */
export let effect = {
  linear: (time, duration, begin, change) => (time / duration) * change + Number(begin)
}

/**
 * 用来封装动画的函数
 *  实现动画移动的效果
 * @param ele       要实现动画的元素
 * @param target    要实现动画的效果
 * @param duration  实现动画的时间
 * @param callback  动画完成后，支持回调函数
 */
export let animate = function (ele, target = {}, duration = 1000, callback) {
  //=>参数验证
  if (ele === null && ele.nodeType !== 1) {
    throw new ReferenceError("The first parameter must be a JS element");
  }
  if (typeof duration === 'function') {
    callback = duration;
    duration = 1000;
  }
  /*
  * begin:记录元素的开始值
  * change:计算元素改变的值
  * time:记录时间
  * */
  let begin = {},
      change = {},
      time = 0;
  /*
  * 给begin和change赋值
  * */
  for (let attr in target) {
    if (!target.hasOwnProperty(attr)) return;
    begin[attr] = utils.css(ele, attr);
    change[attr] = target[attr] - begin[attr];
  }
  // 动画之前先清除之前的定时器
  clearInterval(ele.animateTimer);
  //=>实现动画,将动画存放在元素的属性上，动画时清除元素动画，防止动画重复
  ele.animateTimer = setInterval(() => {
    //=>时间增加
    time += 13;
    //=>如果到了移动的时间，清除定时器，且把元素改变到传入的效果
    if (time >= duration) {
      utils.css(ele, target);
      clearInterval(ele.animateTimer);
      //=>回调函数处理
      callback && callback.call(null, ele);
      return;
    }
    //=>根据公式计算出当前位置
    let cur = {};
    for (let attr in target) {
      if (!target.hasOwnProperty(attr)) return;
      cur[attr] = effect.linear(time, duration, begin[attr], change[attr]);
    }
    utils.css(ele, cur);
  }, 13);
}