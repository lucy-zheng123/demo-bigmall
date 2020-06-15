<template>
  <div class="toast" v-if="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      /* message: {
         type: String,
         default: ''
       },
       show: {
         type: Boolean,
         default: false
       },*/
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration=1500) {
        //duration = duration || 1500
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;

    padding: 10px 15px;
    transform: translateX(-50%) translateY(-50%);
    color: #fff;
    background: rgba(0, 0, 0, .6);
    z-index: 999;
  }
</style>
