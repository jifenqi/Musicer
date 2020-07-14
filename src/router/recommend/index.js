module.exports = {
    path:'/recommend',
    name:"recommend",
    component:() => import('@/views/recommend/'),
    children: [{
        path: '/recommend/:id',
        name:"songList",
        component: () => import('@/views/songList/')
      }]
}