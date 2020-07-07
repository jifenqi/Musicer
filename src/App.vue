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
  },
  data() {
    return {
    }
  }
};
</script>
<style>
@import url('./iconfont/iconfont.css');

* {
  box-sizing: border-box;
}
body {
  background: #f4f4f4;
}
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
dd {
  margin: 0;
  font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
  color: #333;
}
a {
  text-decoration: none;
}
ul,
li,
dl,
dt,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
form,
input,
button,
textarea {
  margin: 0;
  padding: 0;
  outline: none;
}
.clearFloat:after {
  content: "";
  display: block;
  clear: both;
}
img {
  display: block;
  border: 0;
}
.content {
  height: calc(100vh - 124px);
  overflow-y: auto;
  padding-bottom:50px;
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
