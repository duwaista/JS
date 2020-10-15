<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.inDialog" persistent max-width="500px">
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
          <v-btn justify="end" class="d-lg-none" text @click="$store.state.upDialog = true, $store.state.inDialog = false"><small>Зарегистрироваться</small></v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$store.state.inDialog = false">Close</v-btn>
          <v-btn v-if="user.email && user.password" color="blue darken-1" text @click="enterUser">Enter</v-btn>
          <v-btn v-else color="blue darken-1" text disabled @click="enterUser">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'SignInDialog',
  props: {
    enterError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    enterUser() {
      if(this.user.email != null && this.user.password != null){
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
        .then( (response)=> {
          let u = {
            email: this.user.email,
            uid: response.user.uid,
            photoURL: response.user.photoURL
          }
          this.$store.commit("setUser", u)
          
          this.$store.commit("openInDialog", false)
          this.loading = false
          this.$store.state.enterSuccess = true
          this.enterError = false
        })
        .catch( (Error)=> {
          console.log(Error)
          this.enterError=true
          this.$store.state.enterSuccess = false
          this.loading = false
        })
      }else{
        this.enterError=true
        this.$store.state.enterSuccess=false
        this.loading = false
      }
    },
  }
}
</script>