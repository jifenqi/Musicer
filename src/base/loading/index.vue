<template>
  <div class="loading">
    <img width='30' height='30' src="./Spinner.gif" alt="">
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
    position: fixed;
    top: 0;
    left: 0;
    z-index:999999;
    width: 100%;
    height: 100vh;
    padding-top:124px;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    pointer-events:none;
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
 