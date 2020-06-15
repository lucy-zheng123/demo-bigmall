<template>
  <div class="tab-control">
    <ul class="control-t-list">
      
      <li v-for="(item,index) in titles" class="control-t-item" @click="itemClick(index)">
        <span :class="{active:index === currIndex}">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currIndex: 0 
      }
    },
    methods: {
      itemClick(index) {
        this.currIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .control-t-list {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .control-t-item {
    flex: 1;
    text-align: center;
  }

  .active {
    color: var(--color-high-text);
    padding: 0px 2px 2px;
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
