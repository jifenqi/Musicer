<template>
  <div class="loading">
    <img width="64" height="64" src="./Spinner.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载中...'
      }
    }
  }
</script>
<style scoped>
  .loading{
    width: 100%;
    text-align: center;
  }
  .loading img{
    margin:0 auto;
  }
  .desc{
    line-height: 20px;
    font-size: 14px;
    color: black;
  }
</style>
 