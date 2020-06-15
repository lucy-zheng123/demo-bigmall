<template>
  <div class="detail-desc-box" v-if="computedItemP">
    <!--尺寸-->
    <table class="rule-tab">
      <tr v-for="item in itemParams.sizes[0]">
        <td>{{item[0]}}</td>
        <td>{{item[1]}}</td>
        <td>{{item[2]}}</td>
        <td>{{item[3]}}</td>
        <td>{{item[4]}}</td>
      </tr>
    </table>
    <!--描述-->
    <ul class="desc-list">
      <li class="desc-item" v-for="item in itemParams.infos">
        <span class="desc-key">{{item.key}}</span>
        <span class="desc-val">{{item.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "DetailDescInfo",
    props: {
      itemParams: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      computedItemP() {
        return Object.keys(this.itemParams).length !== 0
      }
    }
  }
</script>
<style scoped>
  .detail-desc-box {
    margin: 20px 0;
    padding: 0 .3rem;
  }

  /*尺寸表格*/
  .rule-tab {
    width: 100%;
    font-size: 14px;
    border-bottom: 2px solid #eee;
  }

  .rule-tab > tr {
    height: 40px;
    border-bottom: 1px solid #eee;
  }

  .rule-tab > tr:nth-last-child(1) {
    border-bottom: 0;
  }

  /*商品信息*/
  .desc-item {
    height: 40px;
    border-bottom: 1px solid #eee;
  }

  .desc-key, .desc-val {
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 40px;
    font-size: 14px;
  }

  .desc-key {
    width: 30%;
  }

  .desc-val {
    width: 70%;
    color: var(--color-high-text);
  }
</style>
