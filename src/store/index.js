import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dark: false,
        drawer: false,
        inDialog: false,
        user: {
            email: '',
            password: '',
            uid: '',
            photoURL: '',
        },
        enterSuccess: false
    },

    mutations: {
        setDark(state, d) {
            state.dark = d
        },

        setDrawer(state, r) {
            state.drawer = r
        },
        setUser(state, u) {
            state.user = u
        },
        enterSuccess(state, s) {
            state.enterSuccess = s
        },
        openInDialog(state, i) {
            state.inDialog = i
        }
    }
})