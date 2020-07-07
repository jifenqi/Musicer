module.exports = {
    path:'/recommend',
    name:"recommend",
    component:() => import('@/views/recommend/'),
    children: [{
        path: '/recommend/:id',
        component: () => import('@/views/songList/')
      }]
}