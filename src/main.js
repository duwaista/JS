import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')
import store from './store'

const db = firebase.initializeApp({ 
  apiKey: "AIzaSyBHXEKoASPtta_uQGwN2wb3UcXObF9GdZ8", 
  authDomain: "web-project-f0b6b.firebaseapp.com", 
  databaseURL: "https://web-project-f0b6b.firebaseio.com", 
  projectId: "web-project-f0b6b", 
  storageBucket: "web-project-f0b6b.appspot.com", 
  messagingSenderId: "269806446879", 
  appId: "1:269806446879:web:5399f33f03fe8e0df9682a"
  });

Vue.use(Vuetify)
const vuetifyOptions = { }
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify(vuetifyOptions),
})
