import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dark: false,
        drawer: false
    },

    mutations: {
        setDark(state, d) {
            state.dark = d
        },

        setDrawer(state, r) {
            state.drawer = r
        }
    }
})