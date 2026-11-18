import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'), //异步导入,首次访问这个路径，才会请求这个代码资源
      children:[
        {
          path:'/ticket/list',
          component: () => import('@/views/TicketList.vue'),
          meta:{
            requiredAuth:true
          }
        },
        {
          path:'/ticket/:id',
          component: () => import('@/views/TicketDetail.vue'),
          meta:{
            requiredAuth:true
          }
        },
        {
          path:'/knowledge',
          component: () => import('@/views/KnowledgeManage.vue'),
          meta:{
            requiredAuth:true,
            adminOnly:true
          }
        },
        {
          path:'/chat',
          component: () => import('@/views/ChatWindow.vue'),
          meta:{
            requiredAuth:true
          }
        },
        {
          path:'/ticket/submit',
          component: () => import('@/views/TicketSubmit.vue'),
          meta:{
            requiredAuth:true
          }
        }
      ]
    }
    ,
    {
      path: '/login',
      component: () => import('@/views/Login.vue')
    }
  ]
}) 
//导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ticket_token')
  const user = localStorage.getItem('ticket_user') 
  //这个路由没有登录，跳转到登录页面
  if(to.meta.requiredAuth && !token){
    return next('/login')
  }
  //已经登录
  if(to.path == '/login' && token){
    return next('ticket/list')
  }
  //只有管理员才能访问知识库
  if(to.meta.adminOnly && user){
    const u = JSON.parse(user)
    if(u.role !== 'admin'){
      return next('/ticket/list')
    }
  }
  //放行路由
  next()
})
export default router