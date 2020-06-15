<template>
  <div id="detail">
    <!--导航栏-->
    <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']" class="detail-nav-bar" @titleClick="titleClick"></detail-nav-bar>

    <scroll class="content" 
            ref="scroll"
            :probeType="3"
            :pullUpLoad="true"
            @contentScroll="observedScroll">
            <div>{{$store.state.cartList.lenght}}</div>
      <detail-carousel :topImages="topImages"></detail-carousel>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" 
                         @detailImgLoad="detailImgLoad"/>
      <detail-desc-info :itemParams="itemParams" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
     

      
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBack"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import DetailCarousel from "./childComponent/DetailCarousel";
  import DetailBaseInfo from "./childComponent/DetailBaseInfo";
  import DetailShopInfo from "./childComponent/DetailShopInfo";
  import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
  import DetailDescInfo from "./childComponent/DetailDescInfo";
  import DetailCommentInfo from "./childComponent/DetailCommentInfo";
  import DetailBottomBar from "./childComponent/DetailBottomBar"

  import { getRecommend,getDetail, GoodsInfo, Shop, GoodsPram,CommentInfo} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import{mapActions } from "vuex";
 
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  export default {
    name: "Detail",
    components: {
      DetailDescInfo,
      DetailShopInfo,
      DetailNavBar,
      DetailCarousel,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      BackTop,
      GoodsList,
      GoodsListItem 
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},    //不要默认null
        shop: {},
        detailInfo: {},
        refresh: null,
        itemParams: {},
        isShowBack: false,
        commentInfo: {},
        recommendInfo: [],
        themeTopYs: [],
        productCount: 1,
        //  show: false
      }
    },
    created() {
      // 1.保存商品的iid
      this.iid = this.$route.params.iid && this.$route.params.iid

      // 2.根据iid请求详情页的数据
      getDetail(this.iid).then(res => {
        
        
        // 1.获取顶部的轮播数据
        let data = res.result
        
        this.topImages = data.itemInfo.topImages
      
        

        // 2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
           
           
        // 3.获取店铺数据
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品详情信息
        this.detailInfo = data.detailInfo

        // 5.保存商品的尺寸参数信息
        this.itemParams = new GoodsPram(data.itemParams.info, data.itemParams.rule);

        // 6.保存评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = new CommentInfo(data.rate)
        }
      })
       
      //3请求推数据
      getRecommend().then(res =>{
        this.recommendInfo = res.data.list
      })
     // 给themeTopYs绑定防抖
      this.themeTopYsFn = debounce(() => {
        // 保存四个组件的offsetTop值
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
      }, 100)
    
    },
    mounted() {
      // 赋值防抖函数  闭包
      this.refresh = debounce(this.$refs.scroll.refresh, 200)
    },
    methods: {
      ...mapActions(['addCart']),


      /*监听事件*/ 
      detailImgLoad() {
        this.refresh() //混值
      },
      //回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      observedScroll(position) {
        let scrollY = position.y
        this.isShowBack = scrollY < -1000
      },
      titleClick(index) {
        this.currIndex = index
        this.$emit('titleClick', index)
      },
      addToCart(){
        //1.获取商品展示信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc  = this.goods.desc
        product.price = this.goods.newPrice
        product.iid   = this.iid
        product.realPrice = this.goods.realPrice
        product.count = this.productCount 
         // 2.将商品添加到购物车(1.promise 2.mapactions)
        let pro = this.$store.dispatch('addCart', product)
         
          // console.log(this.$toast);
        // 3.添加购物车弹窗toast
        pro.then(res => {
        
          
          this.$toast.show(res,1500)
        })
   }
    },
       destroyed() {
      this.$bus.$off('itemImgDown', this.refresh)
    }
  
  }
</script>

<style scoped>
  #detail {
    /* 盖上之前的商品栏
     */
    position: relative;
    z-index: 100;
    height: 100%; 
    /* 不设置高度，会被撑开 */
    background: #fff;
  }
/* better-scroll 必要高度 或者 calc(100%-44px) */
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

</style>
