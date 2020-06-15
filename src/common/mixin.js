import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      refresh:null
    }
  },
  mounted() {
    // 赋值防抖
    this.refresh = debounce(this.$refs.scroll.refresh, 150)

    //全局事件监听商品列表图片加载事件
    this.$bus.$on('itemImgDown', this.refresh)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBack: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
