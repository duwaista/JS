import Vue from 'vue'
import Router from 'vue-router'
// Pages
import Authentication from '@/components/pages/Authentication/Authentication'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Authentication',
      component: Authentication
    }
  ]
})