import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/in',
      name: 'Sign-in',
      component: ()=> import('@/views/Sign-in')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'Root',
      component: () => import('@/views/Root.vue')
    },
    {
      path: '/up',
      name: 'Sign-up',
      component: () => import('@/views/Sign-up')
    }
  ]
})