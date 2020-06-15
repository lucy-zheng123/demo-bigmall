<template>
  <div class="detail-shop-info">
    <!--logo+店名-->
    <div class="log-box">
      <img :src="'http:'+shop.logo" class="shop-log">
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <!--商店描述-->
    <div class="info-box">
      <div class="left-box">
        <div class="cells-box">
          <h3 class="info-v">{{computedTotalSells}}</h3>
          <p class="info-name">总销量</p>
        </div>
        <div class="goods-c-box">
          <h3 class="info-v">{{shop.goodsCount}}</h3>
          <p class="info-name">全部宝贝</p>
        </div>
      </div>
      <ul class="right-box">
        <li class="score-info" v-for="item in shop.score">
          <span>{{item.name}}</span>
          <span :class="{'high-text':item.isBetter}">{{item.score}}</span>
          <span :class="{better:item.isBetter}">{{isBetter(item.isBetter)}}</span>
        </li>
      </ul>
    </div>
    <!--进点按钮-->
    <a href="javascript:;" class="link-shop">进店逛逛</a>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      computedTotalSells() {
        let sells = this.shop.sells
        return sells >= 10000 ? parseFloat(sells / 10000).toFixed(1) + '万' : sells
      }
    },
    methods: {
      isBetter(better) {
        return better === true ? '高' : '低'
      }
    }
  }
</script>

<style scoped>
  .detail-shop-info {
    border-bottom: 4px solid #eee;
  }

  .log-box {
    position: relative;
    padding-left: 8px;
    margin-top: 30px;
  }

  .shop-log {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
  }

  .shop-name {
    position: absolute;
    top: 50%;
    margin-left: 7px;
    font-size: .33rem;
    margin-top: -.15rem;
    color: #888;
  }

  /*商家描述*/
  .info-box {
    display: flex;
    padding: 0 15px;
    align-items: center;
  }

  .left-box, .right-box {
    flex: 1;
  }

  .left-box {
    border-right: 2px solid #eeee;
  }

  .right-box {
    text-align: right;
  }

  .info-v {
    font-size: .35rem;
    font-weight: normal;
  }

  .info-name {
    text-align: center;
  }

  .cells-box, .goods-c-box {
    text-align: center;
    width: 50%;
  }

  /*右边评分*/
  .info-name {
    font-size: .26rem;
    margin-top: 5px;
  }

  .left-box {
    display: flex;
  }

  .score-info {
    margin-top: 14px;
  }

  .score-info > span {
    font-size: .24rem;
    display: inline-block;
    text-align: left;
  }

  .score-info > span:nth-of-type(1) {
    width: 1.3rem;
  }

  .score-info > span:nth-of-type(2) {
    color: greenyellow;
    width: .65rem;
  }

  .score-info > span:nth-of-type(2).high-text {
    color: lightcoral;
  }

  .score-info > span:nth-of-type(3) {
    width: .3rem;
    color: #fff;
    background: greenyellow;
    text-align: center;
  }

  .score-info > span:nth-of-type(3).better {
    background: lightcoral;
  }

  /*进店按钮*/
  .link-shop {
    display: block;
    width: 130px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin: 20px auto;

    text-align: center;
    background: #d4e7f1;
    color: #fff;
  }
</style>
