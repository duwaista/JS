import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.use(Vuetify)
const vuetifyOptions = { }
Vue.config.productionTip = false
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify(vuetifyOptions),
})

  /*new Vuetify({
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    dark: true
  })*/