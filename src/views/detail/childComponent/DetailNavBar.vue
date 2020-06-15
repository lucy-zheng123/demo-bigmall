<template>
  <nav-bar class="detail-nav-bar">
    <!--左边部分-->
    <template v-slot:left>
      <div class="back-box">
        <img src="~assets/img/common/back.svg" class="back-img" width="20" height="20" @click="backClick">
      </div>
    </template>
    <!--中间部分-->
    <template v-slot:center>
      <ul class="title-list">
        <li v-for="(item,index) in titles" class="title-item"
            :class="{'active-title':currIndex==index}"
            @click="titleClick(index)">{{item}}
        </li>
      </ul>

    </template>
    <!--右边部分-->
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        currIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default: []
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currIndex = index
      },
      backClick() {
        //返回 也可以go（-1）
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title-list {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 13px;
  }

  .back-box {
    overflow: hidden;
    height: 44px;
    line-height: 55px;
  }

  .active-title {
    color: var(--color-high-text);
  }

</style>
