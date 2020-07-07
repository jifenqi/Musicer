import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '@/router/recommend'
import singer from '@/router/singer'
import search from '@/router/search'
Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/recommend'
    },
    recommend,
    singer,
    search
]

const router = new VueRouter({
  routes
})

export default router
