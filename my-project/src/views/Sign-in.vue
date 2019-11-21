<template>
<form @submit.prevent="enterUser" class="sign-form">
  <div class="form-group">
    <label for="email">Ваш логин:</label>
    <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Login">
    </div>
    <div class="form-group">
    <label for="password">Ваш пароль:</label>
    <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" autocomplete="none">
    </div>
    <v-btn small type="submit">Войти</v-btn>
    <div class="alert-sucess" role="alert" v-if="enterSucces">Успешно</div>
    <div class="alert-danger" role="alert" v-if="enterError">Упс! Что-то пошло не так</div>
</form>
  
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
        const sett = {
          email: response.email,
          uid: response.uid
        }
      })
      .catch( ()=> {
        this.enterError=true
      })
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
 /*.sign-form {
    background-image: url('../assets/images/background.jpg');
    height: 120%;
    width: 100%;
    top: 0;
    left: 0;
    position:absolute;
    overflow:auto;
    background-size: cover; 
    }*/
</style>