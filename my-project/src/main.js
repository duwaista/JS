// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')
import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase.initializeApp({ 
	apiKey: "AIzaSyBHXEKoASPtta_uQGwN2wb3UcXObF9GdZ8",
    authDomain: "web-project-f0b6b.firebaseapp.com",
	projectId: 'web-project-f0b6b' })
.firestore()
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

    data: () => ({ todos: [] }),

  created() {
    const todosRef = db.ref('todos')
    // setup adding childs and save the callback to remove it later
    this.todosRef.on(
      'child_added',
      (snapshot, previousKey) => {
        this.todos.splice(
          // this function is omitted for simplicity reasons
          // it would find the position the new element should
          // be inserted at
          findIndexByKey(this.todos, previousKey) + 1,
          0,
          // get the actual value
          snapshot.val()
        )
      },
      // we are omitting this function for simplicity reasons
      onErrorHandler
    )

    // do the same for items being removed
    this.todosRef.on(
      'child_removed',
      snapshot => {
        // remove the child from the array
        this.todos.splice(findIndexByKey(this.todos, snapshot.key), 1)
      },
      onErrorHandler
    )

    // do the same for items being modified
    this.todosRef.on(
      'child_changed',
      snapshot => {
        // replace the child with the new value
        this.todos.splice(
          findIndexByKey(this.todos, snapshot.key),
          1,
          snapshot.val()
        )
      },
      onErrorHandler
    )

    // and last but not least handle elements being moved
    // this is useful when ordering items
    this.todosRef.on(
      'child_moved',
      (snapshot, previousKey) => {
        // retrieve the item being moved
        const record = this.todos.splice(
          findIndexByKey(this.todos, snapshot.key),
          1
        )[0]
        // add it to the place it should be
        this.todos.splice(
          findIndexByKey(this.todos, previousKey) + 1,
          0,
          // we could also use snapshot.val()
          record
        )
      },
      onErrorHandler
    )
  },
})

