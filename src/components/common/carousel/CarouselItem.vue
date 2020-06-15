<template>
  <div class="carousel-slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "CarouselSwiperItem",

  }
</script>

<style scoped>
  .carousel-slide {
    height: 100%;
    overflow: hidden;
    position: relative;
    float: left;
  }

  /*用户可以通过carousel-item-box来告诉哪个是需要撑开的元素*/
  .carousel-item-box {
    display: block;
    height: 100%;
    width: 100%;
  }
</style>