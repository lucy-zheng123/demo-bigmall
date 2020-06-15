<template>
  <div class="detail-comment-box" v-if="Object.keys(commentInfo).length > 0">
    <!--描述-->
    <div class="box-desc">
      <span>用户评论</span>
      <span>更多 <img src="~assets/img/common/back.svg"></span>
    </div>
    <!--用户信息-->
    <div class="user-info">
      <img :src="'http:'+commentInfo.uhead" class="user-head">
      <span class="user-name">{{commentInfo.uname}}</span>
    </div>
    <!--评论-->
    <p class="comment">{{commentInfo.content}}</p>
      <!--时间-->
    <div class="other-info">
      <span class="time">{{formatDate(commentInfo.date)}}</span>
      <span class="goods-info">{{commentInfo.style}}</span>
    </div>

      <!--评论的图片-->
    <ul class="img-box" v-if="commentInfo.images">
      <li v-for="item in commentInfo.images">
        <img :src="'http:'+item" alt="">
      </li>
    </ul>
  
  
  </div>
</template>

<script>
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      //处理时间转换为xxx-xx-xx
      formatDate(millise) {
        let date = new Date(millise),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            formatDate = year + '-' + month + '-' + day
        return formatDate
      }
    }
  }
</script>

<style scoped>
  .detail-comment-box {
    padding: 0 10px 25px;
    border-bottom: 4px solid #eee;
    margin-top: 15px;
    overflow: hidden;
  }

  /*描述*/
  .box-desc {
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    overflow: hidden;
  }

  .box-desc > span {
    display: block;
  }

  .box-desc > span:nth-of-type(1) {
    float: left;
    font-size: 15px;
  }

  .box-desc > span:nth-of-type(2) {
    float: right;
    font-size: 13px;
  }

  .box-desc > span:nth-of-type(2) > img {
    width: 10px;
    height: 10px;
    transform: rotate(180deg);
  }

  /*用户信息*/
  .user-info {
    position: relative;
    margin-top: 10px;
    height: 50px;
  }

  .user-head {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .user-name {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
    font-size: 15px;
  }

  /*评论*/
  .comment {
    
    margin-top: 25px;
    color: #777;
    font-size: 13.5px;
  }

  /*其他信息*/
  .other-info {
    margin-top: 15px;
    color: #bbb;
  }

  .goods-info {
    margin-left: 15px;
  }

  /*评论图*/
  .img-box {
    margin-top: 5px;
  }

  .img-box > li {
    width: 60px;
    height: 60px;
    overflow: hidden;
    float: left;
    text-align: center;
  }

  .img-box > li > img {
    width: 100%;
  }
</style>
