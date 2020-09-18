import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => import(/* webpackChunkName: "root"*/'@/views/Root.vue')
    }
  ]
})