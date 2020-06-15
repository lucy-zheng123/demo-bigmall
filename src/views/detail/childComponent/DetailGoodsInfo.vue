<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length>0">
    <!--商品描述-->
    <div class="desc-box">
      <div class="start-line"></div>
      <p class="desc-text">{{detailInfo.desc}}</p>
      <div class="end-line"></div>
    </div>
    <h3 class="desc-key">{{detailInfo.detailImage[0].key}}</h3>
    <!--展示的图片-->
    <ul class="detail-img-box">
      <li class="detail-img-item" v-for="item in detailInfo.detailImage[0].list">
        <img :src="'http:'+item" width="100%" @load="detailImgLoad">
      </li>
    </ul>

  </div>
</template>

<script>

  export default {
    name: "DetailCommentInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      detailImgLoad() {
        //直接发送事件不考虑性能
        this.$emit('detailImgLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    border-bottom: 4px solid #eee;
  }

  .desc-box {
    padding: 20px .25rem 15px;
  }

  /*两条线*/
  .start-line, .end-line {
    width: 30%;
    border-bottom: 1px solid black;
  }

  .start-line::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 2px solid black;
  }

  .end-line {
    position: relative;
    float: right;
  }

  .end-line::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 2px solid black;
  }

  .desc-text {
    font-size: 14px;
    padding: 10px 0;
  }

  .desc-key {
    padding: 0 .25rem 15px;
  }
</style>
