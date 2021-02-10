import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '@/plugins/firebase'
import axios from "axios";

const url = "https://quiet-ridge-83792.herokuapp.com/api/feed/";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dark: false,
        loading: true,
        drawer: false,
        inDialog: false,
        upDialog: false,
        fullScreenDialog: false,
        enterSuccess: false,
        openSnackbar: false,
        mobile: Boolean,
        bottomMenu: false,
        deleteProps: {
            index: 0,
            feed: [{
                _id: 0,
                posts: '',
                uid: '',
                email: '',
                avatarUrl: '',
                createdAt: '',
            }]
        },

        auth: {
            email: '',
            password: ''
        },
        user: {
            email: '',
            uid: '',
            photoURL: '',
        },

        all: [{
            _id: 0,
            posts: '',
            uid: '',
            email: '',
            avatarUrl: '',
            createdAt: '',
        }],
    },

    mutations: {
        setDark(state, d) {
            state.dark = d;
        },
        setDrawer(state, r) {
            state.drawer = r;
        },
        setUser(state, u) {
            state.user = u;
        },
        enterSuccess(state, s) {
            state.enterSuccess = s;
        },
        openInDialog(state, i) {
            state.inDialog = i;
        },
        openUpDialog(state, p) {
            state.upDialog = p;
        },
        setLoading(state, l) {
            state.loading = l;
        },
        openFullScreenDialog(state, f) {
            state.fullScreenDialog = f;
        },
        setAuth(state, a) {
            state.auth.email = a.email;
            state.auth.password = a.password;
        },
        setOpenSnackbar(state, snackbar) {
            state.openSnackbar = snackbar;
        },
        setMobile(state, m) {
            state.mobile = m;
        },
        setBottomMenu(state, bottom) {
            state.bottomMenu = bottom;
        },
        setDeleteProps(state, props) {
            state.deleteProps = props;
        }
    },

    actions: {
        setLoading(loading, l) {
            loading.commit('setLoading', l);
        },
        setDark(dark,d) {
            dark.commit('setDark', d);
        },
        setUser(user, u) {
            user.commit('setUser', u);
        },
        enterSuccess(enterSuccess , s) {
            enterSuccess.commit('enterSuccess', s);
        },
        openInDialog(inDialog, i) {
            inDialog.commit('openInDialog', i);
        },
        openUpDialog(upDialog, p) {
            upDialog.commit('openUpDialog', p);
        },
        openFullScreenDialog(fullScreenDialog, f) {
            fullScreenDialog.commit('openFullScreenDialog', f);
        },
        setOpenSnackbar(openSnackbar, snackbar) {
            openSnackbar.commit('setOpenSnackbar', snackbar);
        },
        setMobile(mobile, m) {
            mobile.commit('setMobile', m);
        },
        setDrawer(drawer, dr) {
            drawer.commit('setDrawer', dr);
        },
        setBottomMenu(bottomMenu, bottom) {
            bottomMenu.commit('setBottomMenu', bottom);
        },
        setDeleteProps(deleteProps, props) {
            deleteProps.commit('setDeleteProps', props);
        },
        authAction(state, auth:{ email: string, password: string}) {
            if(auth.email !== null && auth.password !== null) {
                firebase.auth().signInWithEmailAndPassword(auth.email, auth.password)
                .then( (response) => {
                    if(response.user !== null) {
                        let u = {
                            email: response.user.email,
                            uid: response.user.uid,
                            photoURL: response.user.photoURL
                        };
                        this.dispatch('setLoading', false);
                        this.dispatch("setUser", u)
                            .then( () => {
                                this.commit('setAuth', {email: '', password: ''})
                            })
                        this.dispatch("openInDialog", false);
                        this.dispatch('enterSuccess', true);
                        this.dispatch('setOpenSnackbar', true);
                    }    
                })
                .catch(() => {
                    this.dispatch('enterSuccess', false);
                    this.dispatch('setLoading', false);
                })
            }else{
                this.dispatch('setLoading', false);
                this.dispatch('enterSuccess', false);
            }
        },
        mongoGetData() {
            axios.get(url)
                .then((response) => {
                    this.state.all = response.data;
                    this.state.all.reverse();
                    this.dispatch('setLoading', false);
                })
                .catch( (err) => {
                    console.log(err);
                    this.dispatch('setLoading', false);
                })
        },
        deleteFeed(state, del) {
            axios.delete(url + del.feed._id)
                .then(() => {
                    this.state.all.splice(del.index, 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
})