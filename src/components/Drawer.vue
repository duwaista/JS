<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list>
      <v-list-item v-if="$store.state.enterSuccess" link>
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content><v-list-item-title> {{$store.state.user.email}} </v-list-item-title></v-list-item-content>
          <v-btn icon @click.stop="dark = !dark"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
      </v-list-item> 
      <v-list-item dense link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content><v-list-item-title> Home </v-list-item-title></v-list-item-content>
        <v-btn v-if="!$store.state.enterSuccess" icon @click.stop="dark = !dark"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
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
  name: 'drawerComponent',
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