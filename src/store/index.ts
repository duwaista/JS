import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dark: false,
        loading: true,
        drawer: false,
        inDialog: false,
        upDialog: false,
        enterSuccess: false,
        user: {
            email: '',
            uid: '',
            photoURL: '',
        },
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
        },
        openUpDialog(state, p) {
            state.upDialog = p
        },
        setLoading(state, l) {
            state.loading = l
        }
    },

    actions: {
        setLoading(loading, l) {
            loading.commit('setLoading', l);
        },
        setDark(dark,d) {
            dark.commit('setDark', d)
        },
        setUser(user, u) {
            user.commit('setUser', u)
        },
        enterSuccess(enterSuccess , s) {
            enterSuccess.commit('enterSuccess', s)
        },
        openInDialog(inDialog, i) {
            inDialog.commit('openInDialog', i)
        },
        openUpDialog(upDialog, p) {
            upDialog.commit('openUpDialog', p)
        },
    }
})