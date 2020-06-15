<template>
  <div v-if="checkGoods" class="detail-base-box">
    <p class="detail-title">{{goods.title}}</p>
    <!--价格区域-->
    <div class="price-box">
      <span class="now-price">{{goods.newPrice}}</span>
      <span class="old-price"><s>{{goods.oldPrice}}</s></span>
      <span class="desc-price" :style="{backgroundColor:goods.discountBgColor}">{{goods.discount}}</span>
    </div>
    <!--信息描述-->
    <div class="info-box">
      <span class="detail-sales">{{goods.columns[0]}}</span>
      <span class="detail-collect">{{goods.columns[1]}}</span>
      <span class="detail-desc">{{goods.columns[2]}}</span>
    </div>
    <!--快递信息描述-->
    <div class="desc-box">
      <span class="desc-serve" v-for="item in goods.services">
        <img :src="'http:'+item.icon" class="serve-icon" >
        {{item.name}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      checkGoods() {
        return Object.keys(this.goods).length !== 0
      }
    }
  }
</script>


<style scoped>
  .detail-base-box {
    padding: .1rem;
    padding-bottom: .3rem;
    border-bottom: 4px solid #eee;
  }

  /*标题*/
  .detail-title {
    font-size: .27rem;
    line-height: .4rem;
  }

  /*价格*/
  .price-box {
    padding: 5px 0 15px;
  }

  .price-box > span {
    margin-right: 5px;
  }

  .now-price {
    font-size: 15px;
    color: var(--color-high-text);
  }

  .old-price {
    font-size: 13px;
    color: #999;
  }

  .desc-price {
    display: inline-block;
    text-align: center;
    color: #fff;
    background: #f13e3a;
    position: relative;
    bottom: 4px;

    min-width: 30px;
    font-size: 12px;
    padding: 0 5px;
    line-height: 20px;
    border-radius: 6px;
  }

  /*信息描述*/
  .info-box {
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1px solid lightgray;
  }

  .info-box > span {
    display: block;
    color: #bbb;
    flex: 1;
  }

  .detail-collect {
    text-align: center;
  }

  .detail-desc {
    text-align: right;
  }

  /*快递描述*/
  .desc-box {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
  }

  .desc-serve {
    font-size: 12px;
    margin-top: 5px;
    flex: 0 0 50%;
  }

  .desc-serve:nth-of-type(2n+2) {
    text-align: right;
  }

  .serve-icon {
    height: 12px;
    width: 12px;
  }
</style>
