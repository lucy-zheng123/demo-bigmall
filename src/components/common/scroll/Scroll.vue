<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import {throttle} from "common/utils";

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    computed: {
      throttleF(position) {
        return throttle((position) => {
          this.$emit('contentScroll', position)
        }, 200)
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 1.创建一个BScroll   const scroll = new BScroll(el,{})
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,  
        probeType: this.probeType,              //不要写死增加性能 （probeType0 1 2 手指滚动监听 3滚动监听）
        pullUpLoad: this.pullUpLoad            //上拉加载更多
      })
      // 2.实时监听滚动触发是否显示隐藏
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => { //scroll.on拿到pstion x y
          this.$emit('Scroll', position)     //自定义事件发出去 scroll通过@scroll拿到赋值
        })
        // 通过节流，增加性能
        this.scroll.on('scroll', (position) => {
          this.throttleF(position)
        })
      }
      // 3.上拉加载更多监听滚到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('监听到上拉加载');        
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(left, top, time = 300) {
        this.scroll && this.scroll.scrollTo(left, top, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();  //判断scroll有值调用 finshi
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll && this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
