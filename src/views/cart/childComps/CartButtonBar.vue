<template>
    <div class="button-bar" >
        <div class="check-content">
              <check-button :is-checked="isCheckAll"/>
              <span>全选</span>
        </div>
        <div class="total-text"> 合计
        </div>
        <div class="total-money">￥{{getTotalPrice}}</div>
      <button class="to-account">去结算<span class="check-piece">{{getProductCount+'件'}}</span></button>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

export default {
    name : "CartButtonBar",
    components:{
        CheckButton
    },
 computed: {
      ...mapGetters(['getCheckProduct', 'getTotalPrice', 'isCheckAll','getProductCount']),
    
    },
     methods: {
      checkAll() {
        this.$store.commit('checkAllProduct')
      }
    }
}

import CheckButton from "components/content/checkButton/CheckButton"
</script>
 
<style scoped>
 .button-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 44px;
    height: 44px;
    background: rgb(250, 250, 250);
 }
 .check-content{
     display: flex;
     align-items: center;
 }
 .check-button{
     width: 20px;
     height: 20px;
     line-height: 20px;
    
 }
  .total-text {
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    white-space: nowrap;
  }
.total-money{
     color: red;
    font-weight: bold;
    font-size: .28rem;
}
 .check-piece {
    font-size: 12px;
  }
  .to-account {
    max-width: 110px;
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 18px;
    font-size: 14px;
    font-weight: bold;
    background: #f2270c;
    color: #fff;
  }

</style>