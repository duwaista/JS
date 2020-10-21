<template>
<div>

<AppBarComponent/>

<DrawerComponent/>

<v-card class="fix" flat>
  <v-card-title></v-card-title>
</v-card>

<!-- Sign-in dialog -->
<SignInDialog/>

<!-- Sign-up dialog -->
<SignUpDialog v-if="$store.state.upDialog"/>

<!-- Settings -->
<div v-if="enterSuccess" align="center">
  <v-card class="settings" v-bind:class="{ active: isMobile }">
    <form>
      <input id="add" @keyup.enter="addProduct" type="text" :value="productInput" placeholder="URL изображения">
      <v-btn class="shop-btn" @submit="addProduct" @click="addProduct">add</v-btn>
      <br>
      <input @keyup.enter="setAvatar" id="setAvatar" autocomplete="none" type="text" :value="userAvatar" placeholder="Set avatar URL">
      <v-btn @click="setAvatar">set</v-btn>
    </form>
  </v-card>
</div>

<div v-if="$store.state.loading" align="center">
  <v-progress-circular color="primary" :indeterminate="true"></v-progress-circular>
</div>

<!-- Feed -->
<div v-show="!$store.state.loading" align="center">
  <div class="feed-container" v-for="(feed, index) in all" :key="feed.id">
    <v-card class="feed" v-bind:class="{ mobile: isMobile }" outlined>
      <v-list-item>
	      <v-list-item-avatar v-if="feed.avatarUrl">
			    <v-img aspect-ratio="1.0" :src= "feed.avatarUrl"></v-img>
	      </v-list-item-avatar>
        <v-card-title>{{ feed.email }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn v-if="enterSuccess && feed.uid === $store.state.user.uid" icon @click="postId = feed.id ,removeProduct(index)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
	    </v-list-item>
      <img v-bind:class="{ desPic: !isMobile , mobilePic: isMobile }" loading="lazy" :src = feed.posts @error="onError">
    </v-card>
  </div>
</div>

</div>
</template>
<script>
import AppBarComponent from '@/components/AppBarComponent.vue'
import DrawerComponent from '@/components/Drawer.vue'
import SignInDialog from '@/components/SignInDialog.vue'
const SignUpDialog = () => import('@/components/SignUpDialog.vue')

export default {
  components: {
    AppBarComponent,
    DrawerComponent,
    SignInDialog,
    SignUpDialog
  },
  data () {
    return {
      enterError: false,
      productInput: '',
      userAvatar: '',
      upDialog: false,
      postId: 0,
      isMobile: Boolean,
      imgLoaded: true,
      all: [{
        id: 0,
        posts: '',
        uid: '',
        email: '',
        avatarUrl: '',
        createdAt: ''
      }]
    }
  },

methods: {
    addProduct() {
      this.productInput = document.getElementById("add").value;
      if(this.productInput !== '') {
        this.postId = Math.random().toString(36).substring(2)
        let post = {
          id: this.postId,
          avatarUrl: this.user.photoURL,
          email: this.user.email,
          uid: this.user.uid,
          posts: this.productInput,
          createdAt: new Date().toString()
        }
        firebase.database().ref('posted/' + this.postId).set(post)
        .then(() => {
          this.all.unshift(post)
          this.productInput = ''
        })
      }
    },

    removeProduct(index) {
      delete this.all[index]
      this.all = this.all.filter(element=>element !== undefined)
      console.log(this.postId)
      firebase.database().ref('posted/' + this.postId).remove()
    },

    setAvatar() {
      this.userAvatar = document.getElementById("setAvatar").value;
      let User = firebase.auth().currentUser
    	if(this.enterSuccess && this.userAvatar !== '') {
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
      if(this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'){
        this.isMobile = true
      }else{
        this.isMobile = false
      }
    },

    getData() {
      const takePosts = firebase.database().ref('/posted/')
			  takePosts.once('value', (snapshot)=> {
			    if(snapshot.val()!==null || snapshot.val() !== this.all) {
            this.all = snapshot.val()
            let result = [];
            for (const key in this.all) {
              result.unshift(this.all[key]);
            }
            this.all = result;
            this.all.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        })
      .then( ()=> {
        this.$store.dispatch('setLoading', false)
        console.log(this.all)
      })
    },
    onError() {
      this.imgLoaded = false
    }
  },

  created() {
    window.addEventListener('resize', this.resizeUpdate, {passive: true})
    let vm = this;
    document.addEventListener('click', function () {
      vm.drawer = false;
    });
  },

  mounted(){
    this.resizeUpdate()
    this.getData()
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
div.container {
  padding: 0px;
  max-width: 100%;
}
.settings {
  width: 55%;
  margin-bottom: 10px;
}
.active {
  height: 90%;
  width: 97%;
  margin-bottom: 10px;
}
.feed {
  height: 100%;
  width: 55%;
}
.mobile {
  height: 90%;
  width: 97%;
}
.feed-container {
  margin-bottom: 10px;
}
.desPic {
  margin-bottom: 10px;
  height: 95%;
  width: 97%;
}
.mobilePic {
  height: 80%;
  width: 100%;
}
.fix {
  height: 48px;
  margin-bottom: 15px;
}
</style>


