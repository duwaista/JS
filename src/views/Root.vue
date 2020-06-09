/*eslint-disable*/
<template>
<div>
<div class="Header">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
      	<v-list-item v-if="enterSucces" link>
          <v-list-item-content>
            <v-list-item-title>{{user.email}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

<v-app-bar
  app
  dense
  position: fixed
  >
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
  <template v-slote:activator>
  <v-toolbar-title>
    </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items v-if="enterSucces">
            <v-btn icon @click="logoutUser">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-list-item-avatar v-if="userProduct.avatarUrl">
              <img :src= "userProduct.avatarUrl">
            </v-list-item-avatar>
        </v-toolbar-items>
      <v-toolbar-items v-if="!enterSucces">
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
<template class="sign-in">
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
                <v-text-field clearable v-model="user.email" label="Email" type="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field clearable v-model="user.password" label="Password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small role="alert" class="alert-sucess" v-if="enterSucces">Успешно!</small>
          <small class="alert-danger" v-if="enterError">Упс. Что-то пошло не так!</small>
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
</template>

<!-- Sign-up dialog -->
<template class="sign-up">
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
          <small role="alert" class="alert-sucess" v-if="succes">Успешно. Теперь вы можете войти в систему!</small>
          <small class="alert-danger" v-if="error">Пароли не совпадают или содержат менее 6 символов</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="upDialog = false, succes = false, error = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="registerUser">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<div v-if="enterSucces" align="center">
<v-card>
  <form>
    <input type="text" class="shop-input" v-model="productInput" placeholder="URL изображения">
     <v-btn class="shop-btn" @click="addProduct">Добавить</v-btn>
  </form>
  <input type="text" v-model="userAvatar" placeholder="Set avatar URL">
  <v-btn @click="setAvatar">set</v-btn>
  <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark">Dark</v-btn>
</v-card>
<br>



<div align="center" v-for="(pic, index) in userProduct.pics" :key="pic">
<!-- Desktop version -->
<v-card outlined class="d-none d-lg-block" height="100%" width="55%">
  <v-list-item>
	  <v-list-item-avatar v-if="userProduct.avatarUrl">
			<img :src= "userProduct.avatarUrl">
	  </v-list-item-avatar>
    <v-card-title>{{user.email}}</v-card-title>
      <v-spacer></v-spacer>
    <v-btn icon @click="removeProduct(index)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
	</v-list-item>
  <v-img height="95%" width="97%" :src = pic></v-img>
</v-card>

<!-- Mobile version -->
<v-card class="d-lg-none" height="90%" width="99%">  
	<v-list-item>
	  <v-list-item-avatar v-if="userProduct.avatarUrl">
			<img :src= "userProduct.avatarUrl">
	  </v-list-item-avatar>
      {{user.email}}
      <v-spacer></v-spacer>
    <v-btn icon @click="removeProduct(index)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
	</v-list-item>
  <v-img height="80%" max-width="100%" :src = pic></v-img>
</v-card>
<br>
</div>
</div>

</div>
</template>
<script>
import '@/components/style.css'
  export default {
  	props: {
      source: String,
    },
      data () {
          return {
        user: {
          email: '',
          password: '',
          uid: '',
          resUid: ''
        },
        newUser: {
          email: '',
          password: '',
          confirmPassword: ''
        },

        enterSucces: false,
        enterError: false,
        error: false,
        succes: false,
        productInput: '',
        drawer: false,
        userAvatar: '',
        inDialog: false,
        upDialog: false,

        userProduct: {
          pics: [],
          uid: '',
          email: '',
          avatarUrl: '',
        },
      }
  },

methods: {
    async enterUser() {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then( response=> {
        this.enterSucces = true
        this.enterError = false
        this.inDialog = false
        this.user.uid = response.user.uid
        this.user.resUid = response.user.uid
        this.userProduct.uid = response.user.uid
        this.userProduct.email = response.user.email
        
        const takeProduct = firebase.database().ref('/users/'+ this.user.resUid.toString() +'/data/')
			    takeProduct.once('value', (snapshot)=> {
			    if(snapshot.val()!==null) {
            this.userProduct = snapshot.val()
			    }else{
            console.log("no data")
			    }
		    })
      })
      .catch( (Error)=> {
        this.enterError=true
        this.enterSucces=false
        console.log(Error)
      })
    },

    registerUser() {
        if(this.newUser.password !== this.newUser.confirmPassword || this.newUser.password.length<6 || this.newUser.password == '' || this.newUser.confirmPassword == '' || this.newUser.email == ''){
          this.error = true
          this.succes = false
        }else{

      firebase.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
        .then( ()=> {
          this.succes=true
          this.error=false
          this.newUser.password = ''
          this.newUser.confirmPassword = ''
          this.newUser.email = ''
          console.log(this.newUser)

        })
        .catch( error =>{
        console.log(error)
      })
      }
    },

    logoutUser() {
    	this.enterSucces = false
      this.userProduct.email = ''
      this.userProduct.password = ''
      this.user.email = ''
      this.user.password = ''
    	this.userProduct.pics = []
    },

    addProduct(uid, pic) {
      if(!this.userProduct.pics){
        this.userProduct.pics = []
      }else{
        if(this.productInput !== '') {
           this.userProduct.pics.unshift(this.productInput)
        }
        firebase.database().ref('users/'+this.userProduct.uid).set({
        	data: this.userProduct
        }),
        this.productInput=' '
      }
    },

    removeProduct(index) {
        this.userProduct.pics.splice(index, 1)

        firebase.database().ref('users/'+this.userProduct.uid).set({
        	data: this.userProduct
        })
        
    },

    setAvatar() {
    	if(this.enterSucces) {
        this.userProduct.avatarUrl = this.userAvatar

    		firebase.database().ref('users/'+this.userProduct.uid).set({
        	data: this.userProduct
        })
        this.userAvatar = ' '
    	}

    },
  }
}

</script>

