<template>
  <div id="shop-item">
    <div class="item-selector">
        <CheckButton :isChecked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <!-- 店铺名字 -->
    <div class="item-img">
        <img :src="'http:'+itemInfo.image" alt="商品图片">
    </div>
    <!-- 店铺标题信息 -->
    <div class="item-info">
        <div class="item-title">{{itemInfo.title}}</div>
        <div class="item-desc">{{itemInfo.desc}}</div>
    <!-- 商品详情数据 -->
    <div class="info-bottom">
        <div class="item-price left">{{computedTotalPrice}}</div>
        <!-- <div class="item-count right">X{{count}}</div>   -->
         <!-- 计数和按钮--> 
          <div class="counter-box clearfix">
          <button class="decrement" @click="proCountDecrement">-</button>
          <span class="pro-count">{{itemInfo.count}}</span>
          <button class="increment" @click="proCountIncrement">+</button>
          </div>
        </div>
        

    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'


  export default {
    name: "CartListItem",
    data() {
    return {
     
    }
    },
    components: {
        CheckButton ,
    },
    computed: {
      computedTotalPrice() {
      return '￥' + this.itemInfo.count * this.itemInfo.realPrice
      }
    },
    props: {
        itemInfo: {
            type: Object,
            default(){
                return{}
            }
        }
    },
    methods: {
       proCountIncrement() {
     let add = this.itemInfo.count++
        return add.toFixed(2)
      },
      proCountDecrement() {
        if (this.itemInfo.count >1) {
       let del = this.itemInfo.count--
       return del.toFixed(2)
        }
    
      },
       // 改变选中状态
      changeProStatus() {
        this.$store.commit('changeProStatus', this.product.iid)
      },

      checkClick(){
        //取反可以在选择之间
        this.itemInfo.checked =! this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
#shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    flex: 2;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .item-count .number{
    text-align: center;
    width: 50px;
    border:1px solid #EEEEEE;
  }
  .item-count input{
    width: 20px;
    height: 20px;
    background: #EEEEEE;
    border: none;
    outline: none;
  }
  /* 计数器 */
   .counter-box {
    display: inline-block;
    float: right;
  }
    .pro-count {
    display: inline-block;
    text-align: center;
    position: relative;
    bottom: 3px;
    margin: 0 1px;
    width: 30px;
    height: 20px;
    background: #f7f7f7;
    font-size: 14px;
  }

  .decrement, .increment {
    
    display: inline-block;
    border: 0;
    outline: 0;
    width: 20px;
    height: 20px;
    background: #f7f7f7;
  }

</style>
