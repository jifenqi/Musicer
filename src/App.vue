<template>
  <div id="app">
    <header-link></header-link>
    <tab></tab>
    <div class="content" :style="{'padding-bottom':!$store.state.show&&songList.length?'50px':'0px'}">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <song-player></song-player>
  </div>
</template>
<script>
import HeaderLink from "@/components/header";
import Tab from "@/components/tab";
import songPlayer from "@/components/songPlayer";

export default {
  components: {
    HeaderLink,
    Tab,
    songPlayer,
  },
  computed:{
    songList(){
      return this.$store.state.songList
    }
  }
};
</script>
<style>
@import url('./assets/iconfont/iconfont.css');
@import url('./assets/CSS/reset.css');
#app{
  width: 100vw;
  height: 100vh;
}

.content {
  height: calc(100vh - 124px);
  overflow-y: auto;
  background:#fcfcfd;
}
.rotate{
    animation:rotate 12s linear infinite normal;
}
@keyframes rotate {
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
</style>
