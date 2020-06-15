<template>
  <div class="goods-item" @click="goodsItemClick">
    <a href="javascript:;">
      <div class="goods-img-box">
        <img v-lazy="showImage" width="100%" height="100%" @load="imageLoad">
      </div>
      <p class="goods-item-title">{{goodsItem.title}}</p>
      <p class="goods-item-info">
        <span class="price">{{goodsItem.price}}￥</span>
        <span class="collect">☆ {{goodsItem.cfav}}</span>
      </p>
    </a>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      //传过来的数据放在goodsitem 可以.img 。title进行调用
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
     computed: {
      showImage() {
         return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img 
      }
    },
    methods:{
      imageLoad(){
        //事件总线发送出去
        this.$bus.$emit('itemImgDown')
      },
      //点击跳转页面到详情页 +id （动态路由）
      goodsItemClick(){
        this.$router.push('/detail/' +this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    float: left;
    flex-shrink: 1;
    width: 50%;
    overflow: hidden;
    box-sizing: border-box;
    padding: .06rem;
  }

  .goods-item > a {
    display: block;
    width: 100%;
  }

  .goods-img-box {
    overflow: hidden;
    height: 4.12rem;
    border-radius: 4px;
  }

  .goods-img-box > img {
    vertical-align: top;
  }

  .goods-item-title {
    padding: 3px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
  }

  .goods-item-info {
    width: 100%;
    text-align: center;
  }

  .goods-item-info > .price {
    padding-right: 3px;
    color: var(--color-high-text);
  }
</style>
