<template>
  <div class="tab-bar-item" @click="tabItemClick">
    <slot name="item-icon" :isActive="isActive"></slot>
    <slot name="item-text" :isActive="isActive"></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) > -1;
      }
    },
    props: {
      path: String,
    },
    methods: {
      tabItemClick() {
        this.$router.push(this.path);
      }
    }
  }
</script>

<style scoped>
  .tab-bar-icon {
    display: block;
  }

  .icon-active {
    color: red;
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
  }
</style>
