<template>
 <div class="cart-list">
<scroll class="content">
<!-- <li v-for="item in  getProducts">{{item}}</li> -->
<cart-list-item 
v-for="(item,index) in getProducts" 
:key="index" 
:itemInfo ="item"/>
</scroll>
   </div>  
</template>

<script>
import {mapGetters } from 'vuex'

import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
export default {
    name :  "CartList",
    components:{
      Scroll,

      CartListItem,
        
    },
   computed: {
       ...mapGetters(['getProducts'])
   },
   //先做刷新 c出问题后期检查refresh为啥调用不到

//    activated(){
//        this.$refs.Scroll.refresh()
//    }
 }
</script>
<style scoped>
.cart-list{
    height: 100vh;
    overflow: hidden;
    
    
}

.content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
}

</style>