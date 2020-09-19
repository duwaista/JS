<template>
<div>
<div class="Header">
  
<drawerComponent/>

<v-app-bar
  app
  dense
  position: fixed
  >
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
  <template>
    <v-spacer/>
      <v-toolbar-items v-if="enterSuccess">
        <v-btn icon @click="logoutUser">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-list-item-avatar v-if="user.photoURL">
          <v-img aspect-ratio="1.0" :src= "user.photoURL"/>
        </v-list-item-avatar>
      </v-toolbar-items>
    <v-toolbar-items v-if="!enterSuccess">
      <v-btn class="d-lg-none " text @click.stop="$store.state.inDialog = true"><v-icon>mdi-login</v-icon></v-btn>
      <v-btn class="d-none d-lg-block" text @click.stop="$store.state.inDialog = true">Sign-in</v-btn>
      <v-btn class="d-none d-lg-block" text @click.stop="upDialog = true">Sign-up</v-btn>
    </v-toolbar-items>
  </template>
</v-app-bar>
</div>

<v-card flat height="48px">
  <v-card-title></v-card-title>
</v-card>
<br>

<!-- Sign-in dialog -->
<signindialog/>

<!-- Sign-up dialog -->
<signUpDialog v-if="$store.state.upDialog"/>

<!-- Settings -->
<div v-if="enterSuccess" align="center">
<v-card>
  <form>
    <input @keyup.enter="addProduct" type="text" v-model="productInput" placeholder="URL изображения">
     <v-btn class="shop-btn" @click="addProduct">Добавить</v-btn>
     <br>
    <input @keyup.enter="setAvatar" autocomplete="none" type="text" v-model="userAvatar" placeholder="Set avatar URL">
    <v-btn @click="setAvatar">set</v-btn>
  </form>
</v-card>
<br>
</div>

<div v-if="loading" align="center">
  <v-progress-circular color="primary" :indeterminate="true"></v-progress-circular>
</div>

<div v-if="!loading" align="center">
<div v-for="(feed, index) in all" :key="feed.id">
<!-- Desktop version -->
<v-card v-if="!isMobile" outlined height="100%" width="55%">
  <v-list-item>
	  <v-list-item-avatar v-if="feed.avatarUrl">
			<v-img aspect-ratio="1.0" :src= "feed.avatarUrl"></v-img>
	  </v-list-item-avatar>
    <v-card-title>{{ feed.email }}</v-card-title>
    <v-spacer></v-spacer>
    <v-btn v-if="enterSuccess && feed.uid == $store.state.user.uid" icon @click="removeProduct(index)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
	</v-list-item>
<v-img loading="lazy" height="95%" width="97%" :src = feed.posts></v-img>
</v-card>

<!-- Mobile version -->
<v-card v-if="isMobile" height="90%" width="97%">
  <v-list-item>
	  <v-list-item-avatar v-if="feed.avatarUrl">
			<v-img aspect-ratio="1.0" :src= "feed.avatarUrl"></v-img>
	  </v-list-item-avatar>
    <v-card-title>{{feed.email}}</v-card-title>
    <v-spacer></v-spacer>
    <v-btn v-if ="enterSuccess && feed.uid == $store.state.user.uid" icon @click="removeProduct(index)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
	</v-list-item>
<v-img loading="lazy" height="80%" max-width="100%" :src = feed.posts></v-img>
</v-card>
<br>
</div>
</div>

</div>
</template>
<script>
import drawerComponent from '@/components/Drawer.vue'
import signindialog from '@/components/SignInDialog.vue'
const signUpDialog = () => import('@/components/SignUpDialog.vue')
//import signUpDialog from '@/components/SignUpDialog.vue'
  export default {
    components: {
      drawerComponent,
      signindialog,
      signUpDialog
    },
  	props: {
      source: String
    },
    data () {
      return {
        enterError: false,
        productInput: '',
        userAvatar: '',
        upDialog: false,
        loading: true,
        postId: 0,
        isMobile: Boolean,

        all: [{
          id: 0,
          posts: '',
          uid: '',
          email: '',
          avatarUrl: '',
        }]
      }
  },

methods: {
    logoutUser() {
    	this.enterSuccess = false
      this.user.photoURL = ''
      this.$store.state.user.password = ''
      this.$store.state.user.uid = ''
      this.userAvatar = ''
      this.$store.state.user.email = ''
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
      })
    },

    async addProduct(index) {
      if(this.productInput !== '') {
        this.postId = this.all[0].id + 1
        this.all.unshift({id: this.postId, posts: this.productInput, uid: this.user.uid, email: this.user.email, avatarUrl: this.user.photoURL})
      }

      await firebase.database().ref('posted/').set({
        data: this.all
      })
      this.productInput=''
    },

    removeProduct(index) {
      delete this.all[index]
      this.all = this.all.filter(element=>element !== undefined)
     
      firebase.database().ref('posted/').set({
        data: this.all
      })
    },
    setAvatar() {
      let User = firebase.auth().currentUser
    	if(this.enterSuccess) {
        User.updateProfile({
          photoURL: this.userAvatar
        })
        .then(()=>{
          this.user.photoURL = User.photoURL
          this.userAvatar = ''
        })
    	}
    },
    resizeUpdate() {
      if(this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm'){
        this.isMobile = true
      }else{
        this.isMobile = false
      }
    }
  },

  created() {
    window.addEventListener('resize', this.resizeUpdate, {passive: true})
    let vm = this;
    document.addEventListener('click', function () {
      vm.drawer=false;
    });
    const takePosts = firebase.database().ref('/posted/data')
			takePosts.once('value', (snapshot)=> {
			  if(snapshot.val()!==null) {
          this.all = snapshot.val()
        }
      })
    .then( ()=> {
      this.loading = false
    })
  },

  mounted(){
    this.resizeUpdate()
  },

  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(w) {
        this.$store.state.drawer = w
      }
    },
    enterSuccess: {
      get() {
        return this.$store.state.enterSuccess
      },
      set(s) {
        this.$store.commit('enterSuccess', s)
      }
    },
    user: {
      get() {
        return this.$store.state.user
      },
      set(u) {
        this.$store.commit('setUser', u)
        this.$store.state.user = u
      }
    }
  }
}
</script>

<style>
input {
  width: 300px;
  padding: 9px;
}
div.container{
  padding: 0px;
  max-width: 100%;
}
</style>


