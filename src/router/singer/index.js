module.exports = {
    path:'/singer',
    name:"singer",
    component:() => import('@/views/singer/'),
    children:[{
        path: '/singer/:id',
        name:'singerList',
        component:()=>import('@/base/singerList')
    }]
}