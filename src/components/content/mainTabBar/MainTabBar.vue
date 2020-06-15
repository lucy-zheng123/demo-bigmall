<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:item-icon="slot">
        <i class="iconfont icon-ziyuan tab-bar-icon" :class="{'icon-active':slot.isActive}"></i>
      </template>
      <template v-slot:item-text="slot">
        <span :class="{'icon-active':slot.isActive}">首页</span>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-icon="slot">
        <i class="iconfont icon-gongneng tab-bar-icon" :class="{'icon-active':slot.isActive}"></i>
      </template>
      <template v-slot:item-text="slot">
        <span :class="{'icon-active':slot.isActive}">分类</span>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-icon="slot">
        <i class="iconfont icon-shangchang tab-bar-icon" :class="{'icon-active':slot.isActive}"></i>
      </template>
      <template v-slot:item-text="slot">
        <span :class="{'icon-active':slot.isActive}">购物车</span>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-icon="slot">
        <i class="iconfont icon-yonghu tab-bar-icon" :class="{'icon-active':slot.isActive}"></i>
      </template>
      <template v-slot:item-text="slot">
        <span :class="{'icon-active':slot.isActive}">用户</span>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
