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
                <v-text-field @keyup.enter="enterUser" clearable v-model="$store.state.user.email" label="Email" type="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field @keyup.enter="enterUser" clearable v-model="$store.state.user.password" label="Password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="error" v-if="enterError">Error</v-alert>
          <v-btn justify="end" class="d-lg-none" text @click="$store.state.upDialog = true, $store.state.inDialog = false"><small>Зарегистрироваться</small></v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$store.state.inDialog = false">Close</v-btn>
          <v-btn v-if="$store.state.user.email && $store.state.user.password" color="blue darken-1" text @click="enterUser">Enter</v-btn>
          <v-btn v-else color="blue darken-1" text disabled @click="enterUser">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'signindialog',
  props: {
    enterError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    enterUser() {
      if(this.$store.state.user.email != null && this.$store.state.user.password != null){
        firebase.auth().signInWithEmailAndPassword(this.$store.state.user.email, this.$store.state.user.password)
        .then( (response)=> {
          this.$store.state.inDialog = false
          this.$store.state.user.uid = response.user.uid
          this.$store.state.user.photoURL = response.user.photoURL
          this.loading = false
          this.$store.state.enterSuccess = true
          this.enterError = false
        })
        .catch( (Error)=> {
          console.log(Error)
          this.enterError=true
          this.$store.state.enterSuccess=false
          this.loading = false
        })
      }else{
        this.enterError=true
        this.$store.state.enterSuccess=false
        this.loading = false
      }
    },
  },

  computed: {
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