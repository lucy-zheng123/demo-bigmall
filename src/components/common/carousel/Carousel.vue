<template>
  <div class="carousel-container" :style="computedContainerSize" :id="'container'+elId" ref="carouselContainer">
    <div class="carousel-wrapper" ref="wrapper" :style="{width:computedWrapperWidth,left:'-'+computedSlideWidth}"
         @touchmove="wrapperTouchMove" @touchstart="wrapperTouchStart" @touchend="wrapperTouchEnd">
      <slot></slot>
    </div>
    <ul class="focus-list" v-if="focus" ref="focusBox">
      <!--动态绑定：后期动态绑定-->
      <li class="focus-item" v-for="(item,index) in slides" :class="{active:checkActiveFocus(index)}"></li>
    </ul>
  </div>
</template>

<script>
  import {animate} from "./animate";
  import utils from "./utils.js"

  export default {
    name: "Carousel",
    data() {
      return {
        // 里面slide是由里面的元素自动撑开的 用户可以通过iHeight和iWidth传入
        computedContainerSize: {height: this.iHeight, width: this.iWidth},
        slides: null, // 元素集合 slides
        wrapper: null,// 元素wrapper
        moveTimer: null,// 定时器
        curIndex: this.beginIndex + 1,// 当前正在播放的索引
        sliding: false,//为了解决在自动滑动时可以滑动的问题
        isStart: false,//为了解决滑动重叠
        waitTimer: null,
        focusList: null
      }
    },
    props: {
      iHeight: {
        default: 'auto'
      },// 容器的高度
      iWidth: {
        default: '100%'
      },// 容器的宽度
      elId: {
        type: Number
      }, //每个轮播组件的唯一标识
      interval: {
        type: Number,
        default: 2000
      },//每个多少秒切换依次
      beginIndex: {
        type: Number,
        default: 0
      },// 开始显示第几张
      moveRatio: {
        type: Number,
        default: 0.25
      },// 每次要移动的距离
      autoPlay: {
        type: Boolean,
        default: false
      },//是否自动轮播
      autoPlayWaitTime: {
        type: Number,
        default: 3000
      },//当手指滑动到下一次再自动轮播 需要等待的时间
      focus: {
        type: Boolean,
        default: true
      }// 是否需要焦点
    },
    // 组件装载完成后，执行初始化函数
    mounted() {
      this.carouselInit()
    },
    computed: {
      // 计算wrapper的宽度
      computedWrapperWidth() {
        if (!this.slides) return
        // 如果用户传入的是百分比
        let reg = /^\d+%$/
        if (reg.test(this.iWidth)) {
          let wWidth = document.documentElement.querySelector('#container' + this.elId).offsetWidth
          return ((this.slides.length + 2) * (wWidth * parseFloat(this.iWidth) / 100)) + 'px'
        }
        return (this.slides.length * parseFloat(this.iWidth)) + 'px'
      },
      // 计算单个slide的宽度
      computedSlideWidth() {
        if (!this.slides) return;
        return (parseFloat(this.computedWrapperWidth) / (this.slides.length + 2)) + 'px'
      },
      // 检测哪个focus是动态的
      checkActiveFocus() {
        return (index) => {
          let curIndex = this.curIndex - 1
          return index === curIndex
        }
      }
    },
    methods: {
      // 初始化
      carouselInit() {
        let container = this.$refs.carouselContainer
        this.wrapper = this.$refs.wrapper
        this.slides = this.wrapper.querySelectorAll('.carousel-slide')
        this.focusBox = this.$refs.focusBox

        this.setSlideWidth()
        this.cloneSlide()
        this.autoPlay ? this.autoMove() : null
      },
      // 设置slide宽度
      setSlideWidth() {
        if (!this.slides) return
        for (let slide of this.slides) {
          slide.style.width = this.computedSlideWidth;
        }
      },
      //为了让轮播图不间断播放 需要克隆最后一张在第一个，最后一个克隆到第一个
      cloneSlide() {
        if (this.slides.length >= 1) {
          // 先拿到最后一个和第一个
          let lastSlide = this.slides[this.slides.length - 1].cloneNode(true),
              firstSlide = this.slides[0].cloneNode(true)
          // 放入到slides中
          this.wrapper.appendChild(firstSlide)
          this.wrapper.insertBefore(lastSlide, this.slides[0]);
        }
      },
      // 像前移动的方法 (具体动画)
      forwardMove(duration) {
        if (this.sliding) return
        this.curIndex++;
        this.sliding = true
        // 调用动画，当动画执行完成将sliding改为false
        animate(this.wrapper, {left: -(this.curIndex * parseFloat(this.computedSlideWidth))}, duration, () => {
          // 如果轮播到最后一张则跳到第一张继续执行
          if (this.curIndex >= this.slides.length + 1) {
            utils.setCss(this.wrapper, 'left', '-' + this.computedSlideWidth)
            this.curIndex = 1
          }
          this.sliding = false
        })
      },
      // 像后移动一张的方法(具体动画)
      backMove(duration) {
        if (this.sliding) return
        this.curIndex--;
        this.sliding = true
        animate(this.wrapper, {left: -(this.curIndex * parseFloat(this.computedSlideWidth))}, duration, () => {
          // 如果轮播到最后一张则跳到第一张继续执行
          if (this.curIndex <= 0) {
            utils.setCss(this.wrapper, 'left', '-' + (parseFloat(this.computedSlideWidth) * (this.slides.length)))
            this.curIndex = this.slides.length
          }
          this.sliding = false
        })
      },
      // 通过定时器，让图片自动轮播
      autoMove() {
        // 获取this指向
        let _this = this
        this.moveTimer = setInterval(function () {
          _this.forwardMove(500);
        }, this.interval)
      },
      //判断是否能正常触发手指事件
      isNormalTouch(ev) {
        // 两个手指滑动 正在滚动 不做处理
        if (this.sliding) return false
        if (ev.changedTouches >= 2) return false
        return true
      },
      // 操作手指的方法
      wrapperTouchStart(ev) {
        // 判断能否正常滑动
        ev.stopPropagation()
        if (!this.isNormalTouch(ev)) return
        let event = ev.changedTouches[0]
        // preX是变值 用来滑动时移动
        this.preX = this.pageX = event.pageX
        this.preL = parseFloat(utils.getCss(this.wrapper, 'left'))
        this.isStart = true

        // 当用户手指滑动 清除自动轮播
        clearInterval(this.moveTimer)
        clearTimeout(this.waitTimer)
      },
      wrapperTouchMove(ev) {
        ev.stopPropagation()
        if (!this.isStart) return

        let event = ev.changedTouches[0],
            diffX = this.preX - this.pageX,
            preL = this.preL,
            curL = preL + diffX

        utils.css(this.wrapper, 'left', curL)
        this.preX = event.pageX
      },
      wrapperTouchEnd(ev) {
        // 判断能否正常滑动
        ev.stopPropagation()
        if (!this.isStart) return

        let event = ev.changedTouches[0],
            diffX = event.pageX - this.pageX,
            slideWidth = parseFloat(this.computedSlideWidth),
            _this = this

        // 当滑动距离是slide的4/1时
        if (diffX >= slideWidth * this.moveRatio) {
          this.backMove(150)
          // 用户向后滑动
        } else if (diffX < slideWidth * -this.moveRatio) {
          this.forwardMove(150)
        } else {
          // 如果没有达到要切换到下一张的拖动距离
          this.sliding = true
          animate(this.wrapper, {left: this.preL}, 200, () => {
            this.sliding = false
          })
        }
        // 需要等待下一次touchStar才能触发
        this.isStart = false

        // 滑动完成后继续自动轮播
        this.waitTimer = setTimeout(function () {
          _this.autoMove()
        }, this.autoPlayWaitTime)
      },
    }
  }
</script>

<style scoped>
  .carousel-container {
    position: relative;
    overflow: hidden;
  }

  .carousel-wrapper {
    position: relative;
    overflow: hidden;
    height: auto;
  }

  .focus-list {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);

  }

  .focus-item {
    opacity: .9;
    flex: 1;
    margin: 0 3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
  }

  .focus-item.active {
    background: lightcoral;
  }
</style>
