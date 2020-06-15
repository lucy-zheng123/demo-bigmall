import Vue from 'vue'
import App from './App.vue'
import router from './router'
import responseSetting from "./common/responseSetting"
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload"

import toast from 'components/common/toast'

Vue.config.productionTip = false
responseSetting();
//事件总线 发送事件 创建$bus
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use (toast)
//解决移动端300毫秒延迟
FastClick.attach(document.body)
// 使用图片懒加载
Vue.use(VueLazyload, {
//占位符 loading加载不出显示
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
