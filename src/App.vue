<template>
  <div id="app">
    <!--底下的导航 如果是详情页则不显示-->
    <main-tab-bar v-if="isDetail"></main-tab-bar>
    <!-- exclude 可以排除在外 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";
  import Icon from 'components/content/Icon/Icon.vue'
  import SvgIcon from 'components/content/Icon/SvgIcon.vue'

  export default {
    name: 'App',
    components: {
      MainTabBar,Icon,SvgIcon
    },
    computed: {
      isDetail() {
        let path = this.$route.path
        return path.indexOf('detail') == -1
      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";

  #app {
    max-width: 640px;
    width: 100%;
    height: 100%;
    margin: auto;
  }
</style>
