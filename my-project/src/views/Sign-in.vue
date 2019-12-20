<template>
<div class="block-form">
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
    <v-btn class="rootButton" v-if="enterSucces" to="/">К главной</v-btn>
</v-form>
</div>
</template>
<script>
import '@/components/style.css'
export default {
  data () {
      return{
        user: {
          email: '',
          password: ''
        },
        enterSucces: false,
        enterError: false
      }
  },
  methods: {
    enterUser() {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then( response=> {
        this.enterSucces=true
        this.enterError=false
        const sett = {
          email: response.email,
          uid: response.uid,
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
    }
  }
}
</script>
