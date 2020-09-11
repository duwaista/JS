<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list>
      <v-list-item v-if="enterSuccess" link>
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content><v-list-item-title> {{email}} </v-list-item-title></v-list-item-content>
          <v-btn icon @click="dark = !dark"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
      </v-list-item> 
      <v-list-item dense link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content><v-list-item-title> Home </v-list-item-title></v-list-item-content>
        <v-btn v-if="!enterSuccess" icon @click="dark = !dark"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
      </v-list-item>
      <v-list-item dense link>
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item dense link>
        <v-list-item-action>
          <v-icon>mdi-github-circle</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title><a href="https://github.com/duwaista/JS.git">Github</a></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'dialogComponent',
    props: {
      enterSuccess: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: ''
      }
    },

  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(w) {
        this.$store.state.drawer = w
      }
    },
    dark: {
      get() {
        return this.$store.state.dark
      },
      set(v) {
        this.$store.commit('setDark', v)
        this.$vuetify.theme.dark = v
      }
    }
  }
}
</script>