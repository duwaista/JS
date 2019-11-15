<template>
<div align="center">
<input v-model="email" type="email" placeholder="Login">
<input v-model="password" type="password" placeholder="Password">
<v-btn type="submit">Add user</v-btn>
<div>

</div>
</div>
</template>

<script>
  import {db} from '@/main'
import { error } from 'util'
  export default {
    name: 'Login',
    data () {
      return{
        user: {
          email: '',
          password: ''
        }
       
      }
    },

    methods:{
      registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      .catch( error =>{
        console.log(error)
      })
      }
    }
  }
</script>