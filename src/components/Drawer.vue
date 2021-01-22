<template>
  <v-navigation-drawer
      v-model="drawer"
      app
  >
    <template v-slot:prepend>
      <v-list>
        <v-list-item v-if="$store.state.enterSuccess" link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ $store.state.user.email }}</v-list-item-title>
          </v-list-item-content>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click.stop="changeTheme">
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-btn>
            </template>
            <span>Изменить тему</span>
          </v-tooltip>
        </v-list-item>
        <v-list-item dense link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Home</v-list-item-title>
          </v-list-item-content>
          <v-tooltip v-if="!$store.state.enterSuccess" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click.stop="changeTheme">
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-btn>
            </template>
            <span>Изменить тему</span>
          </v-tooltip>
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
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DrawerComponent',
  data() {
    return {
      dark: false
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(w) {
        this.$store.state.drawer = w;
      }
    }
  },

  methods: {
    changeTheme() {
      this.dark = !this.dark
      this.$vuetify.theme.dark = this.dark
      this.$store.dispatch('setDark', this.dark)
    }
  },

  mounted() {
    if (localStorage.dark === 'true') {
      this.$store.dispatch('setDark', true);
      this.$vuetify.theme.dark = true;
      this.dark = true;
    } else {
      this.$store.dispatch('setDark', false);
      this.$vuetify.theme.dark = false;
      this.dark = false;
    }
  },
  watch: {
    dark(newDark) {
      localStorage.dark = newDark;
    }
  }
}
</script>