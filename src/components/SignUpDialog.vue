<template>
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
          <v-btn v-if="newUser.email && newUser.password && newUser.confirmPassword" color="blue darken-1" text @click="registerUser">Register</v-btn>
          <v-btn v-else color="blue darken-1" text disabled @click="registerUser">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name: 'SignUpDialog',
    data() {
        return {
            newUser: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: false,
            success: false
        }
    },
    methods: {
        registerUser() {
            if(this.newUser.password !== this.newUser.confirmPassword || this.newUser.password.length<6 || this.newUser.password == '' || this.newUser.confirmPassword == '' || this.newUser.email == ''){
                this.error = true
                this.success = false
            }else{

            firebase.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
                .then( ()=> {
                    this.success=true
                    this.error=false
                    this.newUser = {
                      password: '',
                      confirmPassword: '',
                      email: ''
                    }
                })
                .catch( error =>{
                })
            }
        },
    },

    computed: {
        upDialog: {
            get() {
                return this.$store.state.upDialog
            },
            set(p) {
                this.$store.commit('openUpDialog', p)
            }
        }
    }
}
</script>