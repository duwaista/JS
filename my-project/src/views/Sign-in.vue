<template>
<div class="block-form">
<form @submit.prevent="enterUser" class="sign-form">
  <div class="form-group">
    <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Login">
    </div>
    <div class="form-group">
    <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" autocomplete="none">
    </div>
    <v-btn type="submit">Войти</v-btn>
    <div class="alert-sucess" role="alert" v-if="enterSucces">Успешно</div>
    <div class="alert-danger" role="alert" v-if="enterError">Упс! Что-то пошло не так</div>
</form>
</div>
</template>
<script>
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
        //$emit(enterUser, sett)
      })
      .catch( ()=> {
        this.enterError=true
        this.enterSucces=false
      })
    }
  }
}
</script>
<style>
.sign-form{
text-align: center;
}
.alert-danger{
  color: red;
  font-size: 17px;
}
.alert-sucess{
  color: green;
  font-size: 17px;
}
input{
  width: 300px;
  padding: 12px;
}

</style>