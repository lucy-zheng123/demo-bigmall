<template>
    <div class="detail-bottom-bar">
        <!-- 左边三个图标 -->
        <div class="bar-left">
            <div class="bar-left-item">
                <i class="icon service"></i>
                <span class="text">客户</span>
            </div>
             <div class="bar-left-item">
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
             <div class="bar-left-item">
                <i class="icon"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <!-- 右边两个按钮 -->
        <div class="bar-right">
            <button @click="addCar">加入购物车</button>
            <button>购买</button>
        </div>

    </div>
</template>
<script>
export default {
    name : "DetailBottomBar",
    methods:{
      addCar(){
      this.$emit('addCart');
        
      }
    }
}
</script>
<style scoped>
 /* @import "~assets/css/dbiconfont.css"; */
.detail-bottom-bar{
     height: 55px;
     background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

 .bar-right, .bar-left {
    display: flex;
    flex: 1;
  }
   .bar-left-item {
    flex: 1;
    text-align: center;
  }
  .bar-right {
    justify-content: space-around;
  }
  
  /* 图标样式 */
    .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 0px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
   .bar-left .service {
    background-position:0 -54px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

   .bar-left-item > i {
    display: block;
  }

.bar-right > button {
    display: block;
    height: 30px;
    width: 48%;
    border: 0;
    border-radius: 15px;
    color: #fff;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
   .bar-right > button:nth-of-type(1){
    background: linear-gradient(135deg,#ffba0d,#ffc30d 70%,#ffcf0d);
  }
  .bar-right > button:nth-of-type(2){
    background: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);
  }
  

</style>