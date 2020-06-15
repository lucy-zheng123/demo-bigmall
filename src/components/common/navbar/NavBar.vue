<template>
  <div class="nav-bar">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-center">
      <slot name="center"></slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    overflow: hidden;
    display: flex;
    /*在使用浏览器的原生滚动时*/
/*    position: fixed;
    top: 0;*/

    height: 44px;
    width: 100%;
    max-width: 640px;
    line-height: 44px;
    font-size: 14px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    z-index: 9;
  }

  .nav-right, .nav-left {
    overflow: hidden;
    width: 60px;
    height: 100%;
  }

  .nav-center {
    flex: 1;
  }
</style>
