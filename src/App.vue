<template>
  <div id="app">
    <header-link></header-link>
    <tab></tab>
    <div class="content">
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
  }
};
</script>
<style>
@import url('./assets/iconfont/iconfont.css');
@import url('./assets/CSS/reset.css');
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
