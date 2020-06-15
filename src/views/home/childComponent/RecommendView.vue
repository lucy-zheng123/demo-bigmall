<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link" class="recommend-item">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    overflow: hidden;
    padding: .2rem 0 .4rem;
    border-bottom: 10px#f5f5f5 solid;
  }

  .recommend-item {
    display: block;
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 95%;
    margin-bottom: .1rem;
  }
</style>
