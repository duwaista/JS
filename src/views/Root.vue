<template>
<div>
<div class="Header">
  
<dialogComponent 
  :enterSuccess = this.enterSuccess 
  :email = this.user.email
>
</dialogComponent>

<v-app-bar
  app
  dense
  position: fixed
  >
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
  <template>
  <v-toolbar-title>
    </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items v-if="enterSuccess">
            <v-btn icon @click="logoutUser">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-list-item-avatar v-if="photoUrl">
              <img :src= "photoUrl">
            </v-list-item-avatar>
        </v-toolbar-items>
      <v-toolbar-items v-if="!enterSuccess">
        <v-btn class="d-lg-none " text @click.stop="inDialog = true"><v-icon>mdi-login</v-icon></v-btn>
        <v-btn class="d-none d-lg-block" text @click.stop="inDialog = true">Sign-in</v-btn>
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
  <v-row justify="center">
    <v-dialog v-model="inDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Sign-in</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field @keyup.enter="enterUser" clearable v-model="user.email" label="Email" type="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field @keyup.enter="enterUser" clearable v-model="user.password" label="Password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="error" v-if="enterError">Error</v-alert>
          <v-btn justify="end" class="d-lg-none" text @click="upDialog = true, inDialog = false"><small>Зарегистрироваться</small></v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1" text @click="inDialog = false, enterError = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="enterUser">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

<!-- Sign-up dialog -->
  <v-row justify="center">
    <v-dialog v-model="upDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Sign-up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field clearable v-model="newUser.email" label="Email" type="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field clearable v-model="newUser.password" label="Password" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field textContentType = 'password' clearable v-model="newUser.confirmPassword" label="Confirm password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="success" v-if="success">Успешно. Теперь вы можете войти в систему!</v-alert>
          <v-alert type="error" v-if="error">Пароли не совпадают или содержат менее 6 символов</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="upDialog = false, success = false, error = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="registerUser">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

<!-- Settings -->
<div v-if="enterSuccess" align="center">
<v-card>
  <form>
    <input @keyup.enter="addProduct" type="text" v-model="productInput" placeholder="URL изображения">
     <v-btn class="shop-btn" @click="addProduct">Добавить</v-btn>
     <br>
    <input @keyup.enter="setAvatar" autocomplete="none" type="text" v-model="userAvatar" placeholder="Set avatar URL">
    <v-btn @click="setAvatar">set</v-btn>
    <v-btn @click="dark = !dark">Dark</v-btn>
  </form>
</v-card>
<br>

<div align="center" v-for="(index) in userFeed" :key="index.posts">
<!-- Desktop version with auth -->
<v-card outlined class="d-none d-lg-block" height="100%" width="55%">
  <v-list-item>
	  <v-list-item-avatar v-if="index.avatarUrl">
			<img :src= "index.avatarUrl">
	  </v-list-item-avatar>
    <v-card-title>{{index.email}}</v-card-title>
      <v-spacer></v-spacer>
    <v-btn icon @click="removeProduct(index)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
	</v-list-item>
  <v-img height="95%" width="97%" :src = index.posts></v-img>
</v-card>

<!-- Mobile version with auth -->
<v-card class="d-lg-none" height="90%" width="97%">  
	<v-list-item>
	  <v-list-item-avatar v-if="index.avatarUrl">
			<img :src= "index.avatarUrl">
	  </v-list-item-avatar>
      {{index.email}}
      <v-spacer></v-spacer>
    <v-btn icon @click="removeProduct(index)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
	</v-list-item>
  <v-img height="80%" max-width="100%" :src = index.posts></v-img>
</v-card>
<br>
</div>
</div>

<div v-if="loading" align="center">
<v-progress-circular color="primary" :indeterminate="true"></v-progress-circular>
</div>

<div v-if="!loading" v-show="!enterSuccess" align="center">
<div v-for="(index) in all" :key="index.posts">
<!-- Desktop version -->
<v-card outlined class="d-none d-lg-block" height="100%" width="55%">
  <v-list-item>
	  <v-list-item-avatar v-if="index.avatarUrl">
			<img :src= "index.avatarUrl">
	  </v-list-item-avatar>
    <v-card-title>{{ index.email }}</v-card-title>
    
	</v-list-item>
<v-img height="95%" width="97%" :src = index.posts></v-img>
</v-card>

<!-- Mobile version -->
<v-card class="d-lg-none" height="90%" width="97%">
  <v-list-item>
	  <v-list-item-avatar v-if="index.avatarUrl">
			<img :src= "index.avatarUrl">
	  </v-list-item-avatar>
    <v-card-title>{{index.email}}</v-card-title>
	</v-list-item>
<v-img height="80%" max-width="100%" :src = index.posts></v-img>
</v-card>
<br>
</div>
</div>

</div>
</template>
<script>
import '@/components/style.css'
import dialogComponent from '@/components/Dialog.vue'
  export default {
    components: {
      dialogComponent
    },
  	props: {
      source: String
    },
      data () {
          return {
        user: {
          email: '',
          password: '',
          uid: ''
        },
        newUser: {
          email: '',
          password: '',
          confirmPassword: ''
        },

        enterSuccess: false,
        enterError: false,
        error: false,
        success: false,
        productInput: '',
        userAvatar: '',
        photoUrl: '',
        inDialog: false,
        upDialog: false,
        loading: true,

        userFeed: [{
          posts: '',
          uid: '',
          email: '',
          avatarUrl: '',
        }],

        all: [{
          posts: '',
          uid: '',
          email: '',
          avatarUrl: '',
        }]
      }
  },

methods: {
    async enterUser() {
      if(this.user.email != null || this.user.password != null){
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then( (response)=> {
        this.enterSuccess = true
        this.enterError = false
        this.inDialog = false
        this.user.uid = response.user.uid
        this.user.email = response.user.email
        this.photoUrl = response.user.photoURL

        const takeProduct = firebase.database().ref('/posted/data')
			  takeProduct.once('value', (snapshot)=> {
			    if(snapshot.val()!==null) {
            this.userFeed = snapshot.val()
          }else{
            console.log("no data")
          }
        })
      })
      .catch( (Error)=> {
        console.log(Error)
        this.enterError=true
        this.enterSuccess=false
      })

      }else{
        this.enterError=true
        this.enterSuccess=false
      }
    },

    registerUser() {
        if(this.newUser.password !== this.newUser.confirmPassword || this.newUser.password.length<6 || this.newUser.password == '' || this.newUser.confirmPassword == '' || this.newUser.email == ''){
          this.error = true
          this.success = false
        }else{

      firebase.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
        .then( ()=> {
          this.success=true
          this.error=false
          this.newUser.password = ''
          this.newUser.confirmPassword = ''
          this.newUser.email = ''
        })
        .catch( error =>{
        })
      }
    },

    logoutUser() {
    	this.enterSuccess = false
      this.photoUrl = ''
      this.user.password = ''
      this.user.uid = ''
      this.userAvatar = ''
      this.user.email = ''
      this.userFeed = [{}]
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
      })
    },

    async addProduct(index) {
        if(this.productInput !== '') {
          this.userFeed.unshift({posts: this.productInput, uid: this.user.uid, email: this.user.email, avatarUrl: this.photoUrl})
          this.all.unshift({posts: this.productInput, uid: this.user.uid, email: this.user.email, avatarUrl: this.photoUrl})
        }

        await firebase.database().ref('posted/').set({
        	data: this.all
        }),

        firebase.database().ref('postos/').set({
        	data: this.userFeed
        }),
        this.productInput=''
    },

    async removeProduct(index) {
      this.userFeed.splice(index.posts, 1)
      this.all.splice(index.posts, 1)
        
      firebase.database().ref('postos/').set({
        data: this.userFeed
      }),
      await firebase.database().ref('posted/').set({
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
          this.photoUrl = User.photoURL
          this.userAvatar = ''
        })
    	}
    },
  },

  created() {
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

  computed: {
    dark: {
      get() {
        return this.$store.state.dark
      },
      set(v) {
        this.$store.commit('setDark', v)
        this.$vuetify.theme.dark = v
      }
    },

    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(w) {
        this.$store.state.drawer = w

      }
    }
  }
}

</script>

