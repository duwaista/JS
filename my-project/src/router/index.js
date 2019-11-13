import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Authentication',
      component: ()=> import('@/views/Authentication')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/root',
      name: 'Root',
      component: () => import('@/views/Root.vue')
    },
    {
      path: '/bubu',
      name: 'Bubu',
      component: () => import('@/views/bubu.vue')
    }
  ]
})