import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http.js'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.use(VueLazyload, {
  loading: require('./assets/small.png'),
  error: require('./assets/small.png')
  })

new Vue({
  router,
  store,
  data:{
    songid:''   //当前播放音乐的id
  },
  render: h => h(App)
}).$mount('#app')
