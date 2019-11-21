<template>
  <form @submit.prevent="registerUser" autocomplete="none" class="sign-form">
    <div class="form-group">
    <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Login">
    </div>
    <div class="form-group">
    <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" autocomplete="none">
    </div>
    <div class="form-group">
    <input v-model="user.confirmPassword" type="password" id="password2" class="form-control" placeholder="Replay Password" autocomplete="none">
    </div>
    <div class="alert-danger" role="alert" v-if="error">Пароли не совпадают или содержат менее 6 символов</div>
    <v-btn type="submit">Add user</v-btn>
    <div class="alert-sucess" role="alert" v-if="succes">Успешно</div>
  </form>
</template>

<script>
//import {db} from '@/main'
import { error } from 'util'
  export default {
    name: 'sign-up',
    data () {
      return{
        user: {
          email: '',
          password: '',
          confirmPassword: ''
        },
       error: false,
       succes: false
      }
    },

    methods:{
      registerUser() {
        if(this.user.password !== this.user.confirmPassword || this.user.password.length<6){
          this.error=true
        }else{
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then( ()=> {
          this.succes=true
        })
        .catch( error =>{
        console.log(error)
      })
      }
    }
  }
  }
</script>
<style>
.sign-form{
text-align: center
}
.alert-danger{
  color: red
}
.alert-sucess{
  color: green
}
</style>