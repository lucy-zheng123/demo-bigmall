<template>
<!-- 导航条 -->
<div class="cart">
  
<nav-bar class="nav-bar">
  <div slot="left">
    <img src="~assets/img/common/back.svg" class="back-img" width="20" height="20" @click="backClick">
  </div>
    <div slot="center">
      购物车{{length}}
    </div>
  </nav-bar>
 
  <!-- 商品列表 -->
  <!-- <scroll class="content"> -->
   <cart-list/>

  <!-- </scroll> -->

  <!-- 底部汇总 -->
  <cart-button-bar/>
</div>
  
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

 import NavBar from "components/common/navbar/NavBar"
 import CartList from "./childComps/CartList"
 import CartButtonBar from "./childComps/CartButtonBar"

//  import {getProductCount, getProducts} from "store/getters"
 import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components :{
      NavBar,
      CartList,
      CartButtonBar,

      Scroll
    
    },
    computed:{
      ...mapGetters({
        length: 'getProductCount',
        
        }),
    },
    methods: {
        backClick() {
        //返回 也可以go（-1）
        this.$router.back()
      }
    }

  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
  font-size: 15px;
}
.back-img{
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 10px;
    top: 12px;
    
}
.car{
    position: relative;
    overflow: hidden;
    height: 100%;
    background: #faf1ff;
}
/* 滑动 */
.content{
   position: absolute;
    top: 44px;
    bottom: calc(49px + 44px);
    left: 0;
    right: 0;
}


</style>
