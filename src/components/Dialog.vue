<template>
<v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
      	 <v-list-item v-if="enterSuccess" link>
          <v-list-item-content>
            <v-list-item-title>{{email}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        <v-list-item dense link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="align-end" >
          <a href="https://github.com/duwaista/JS.git">Github</a>
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
      }
    }
}

</script>