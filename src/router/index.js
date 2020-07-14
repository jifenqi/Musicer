import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '@/router/recommend'
import hotSong from '@/router/hotSong'
import search from '@/router/search'
import singer from '@/router/singer'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/recommend'
    },
    recommend,
    hotSong,
    singer,
    search,
    {
      path:'*',
      redirect:'/recommend'
    }
]

const router = new VueRouter({
  routes
})

export default router