<template>
<div>
    <!--div v-if="sign==='sign-in'" @addUser="isMainPage=$event.mainPage, signComplite=$event.complite, email=$event.email, uid=$event.uid">
    </div-->
<div class="Header">
    <v-app-bar
    	dark
    	flat
    	dense
    	position: fixed>
      <template v-slote:activator>
      <v-toolbar-title>
        <v-btn icon>
        <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="enterSucces">
          <v-list-item>
          {{user.email}}
          </v-list-item>
            <v-btn icon @click="enterSucces=false">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-settings</v-icon>
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            
        </v-toolbar-items>
      <v-toolbar-items v-if="!enterSucces">
        <v-list>
            <v-list-item>
            </v-list-item>
        </v-list>
        <v-btn text to="/in">Sign-in</v-btn>
        <v-btn text to="/up">Sign-up</v-btn>
      </v-toolbar-items>
      </template>
    </v-app-bar>
</div>

<v-card flat height="36px">
  <v-card-title></v-card-title>
</v-card>

<v-list
    v-if="!enterSucces" 
    position: absolute
>
    <v-list-group>
        <template v-slot:activator>
            <v-list-item>
                <!--v-list-item-avatar>
                    <img src="https://anivisual.net/avatar/01/86/32217419.jpg">
                </v-list-item-avatar-->
                <v-list-item-title>
                    Вход
                </v-list-item-title>
                <v-list-item-content>
                </v-list-item-content>
            </v-list-item>
        </template>
    <v-list>
        <template>
            <v-list-item v-if="!enterSucces" ripple>
                <v-list-item-content>
                    <v-list-item-title>
                        <v-form @submit.prevent="enterUser" class="sign-form">
                            <div class="form-group">
                                <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Login">
                            </div>
                            <div class="form-group">
                                <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" autocomplete="none">
                            </div>
                            <v-btn type="submit">Войти</v-btn>
                            <div class="alert-sucess" role="alert" v-if="enterSucces">Успешно</div>
                            <div class="alert-danger" role="alert" v-if="enterError">Упс! Что-то пошло не так</div>
                        </v-form>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</v-list-group>
</v-list>

<v-list
    v-if="!enterSucces" 
>
<v-list-group>
        <template v-slot:activator>
            <v-list-item>
                <v-list-item-title>
                    Регистрация
                </v-list-item-title>
                <v-list-item-content>
                </v-list-item-content>
            </v-list-item>
        </template>
    <v-list>
        <template>
            <v-list-item ripple>
                <v-list-item-content>
                    <v-list-item-title>
                        <template>
                            <form @submit.prevent="registerUser" autocomplete="none" class="sign-form">
                                <div class="form-group">
                                    <input v-model="newUser.email" type="email" id="email" class="form-control" placeholder="Адрес почты">
                                </div>
                                <div class="form-group">
                                    <input v-model="newUser.password" type="password" id="password" class="form-control" placeholder="Пароль" autocomplete="none">
                                </div>
                                <div class="form-group">
                                    <input v-model="newUser.confirmPassword" type="password" id="password2" class="form-control" placeholder="Повторите пароль" autocomplete="off">
                                </div>
                                <div class="alert-danger" role="alert" v-if="error">Пароли не совпадают или содержат менее 6 символов</div>
                                    <v-btn type="submit">Регистрация</v-btn>
                                <div class="alert-sucess" role="alert" v-if="succes">Успешно</div>
                            </form>
                        </template>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</v-list-group>
</v-list>

<v-btn @click="enterSucces=true">Test</v-btn>

<div class="userShop" v-if="enterSucces" >
<form class="forShop">
    <input type="text" class="shop-input" v-model="productInput" placeholder="Добавить">
    <span class="shop-input-btn">
        <v-btn class="shop-btn" @click="addProduct">Добавить</v-btn>
    </span>
</form>
<v-card flat height="80px" v-for="(product, index) in userProduct.products" :key="product" @click="removeProduct(index)">

	<v-list-item>

	<v-list-item-avatar> 
			<img src="https://sun9-10.userapi.com/c856020/v856020065/168bb9/G3wdJ-jdE8I.jpg">
	</v-list-item-avatar>
	<v-card-title>{{ product }}</v-card-title>
	
	</v-list-item>
		
</v-card>
</div>
<div v-if="enterSucces">{{ user.uid }}</div>

</div>
</template>
<script>
//import SignIn from "./Sign-in"
//import SignUp from "./Sign-up"
import '@/components/style.css'
  export default {
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
        enterSucces: false,
        enterError: false,
        error: false,
        succes: false,
        productInput: '',

        userProduct: {
            products: [],
            uid: '',
            email: ''
        }
        }
      },

methods: {
    enterUser() {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then( response=> {
        this.enterSucces=true
        this.enterError=false
        this.user.uid = response.user.uid
        this.userProduct.uid = response.user.uid
        this.userProduct.email = response.user.email
        console.log(this.user.uid)
        const sett = {
          email: response.user.email,
          uid: response.user.uid,
          complite: true,
          mainPage: true
        }
        this.$emit('addUser', sett)
        console.log(response)
      })
      .catch( (Error)=> {
        this.enterError=true
        this.enterSucces=false
        console.log(Error)
      })
    },
    registerUser() {
        if(this.newUser.password !== this.newUser.confirmPassword || this.newUser.password.length<6){
          this.error=true
          this.succes=false
        }else{

    firebase.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
        .then( ()=> {
          this.succes=true
          this.error=false
        })
        .catch( error =>{
        console.log(error)
      })
      }
    },


    addProduct(uid, product) {
        if(this.productInput !== ' ') {
           this.userProduct.products.push(this.productInput) 
        }

        firebase.database().ref('users/'+this.userProduct.uid).set({
        	data: this.userProduct
        }),
        /*db.collection('users').add(user.uid, userProduct.products[product])
        .then( ()=> {
        	console.log(fb)
        })
        .catch( ()=> {
        	console.log(fb)
        })*/

        this.productInput=' '
    },
    removeProduct(index) {
        this.userProduct.products.splice(index, 1)

        firebase.database().ref('users/'+this.userProduct.uid).set({
        	data: this.userProduct
        })
    }
  },

created() {
	//this.userProduct.products.push(0)

	if(this.enterSucces) {
		console.log("UserProd " + this.userProduct.uid)

	}


	const takeProduct = firebase.database().ref('/users/' + this.userProduct.uid + '/data')
		takeProduct.on('value', (snapshot)=> {
			if(snapshot.val()!==null) {
				this.userProduct = snapshot.val()
				
			}else{
				this.userProduct.products = ['fuck']
			}
			console.log("snapshot " + snapshot.val())
			
		})
		
		//console.log(takeProduct)

	}
}

</script>
