<template>
<v-app-bar
  app
  dense
  elevation="2"
  >
  <v-app-bar-nav-icon @click.stop="$store.state.drawer = !$store.state.drawer"/>
  <template>
    <v-spacer/>
      <v-toolbar-items v-if="$store.state.enterSuccess">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="logoutUser">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Выйти</span>
        </v-tooltip>
        <v-list-item-avatar v-if="$store.state.user.photoURL">
          <v-img aspect-ratio="1.0" :src= "$store.state.user.photoURL"/>
        </v-list-item-avatar>
      </v-toolbar-items>
    <v-toolbar-items v-if="!$store.state.enterSuccess">
      <v-btn class="d-lg-none" text @click.stop="$store.state.inDialog = true"><v-icon>mdi-login</v-icon></v-btn>
      <v-btn class="d-none d-lg-block" text @click.stop="$store.state.inDialog = true">Sign-in</v-btn>
      <v-btn class="d-none d-lg-block" text @click.stop="$store.state.upDialog = true">Sign-up</v-btn>
    </v-toolbar-items>
  </template>
</v-app-bar>
</template>

<script>
export default {
    name: "AppBarComponent",
    methods: {
        logoutUser() {
            this.$store.commit("enterSuccess", false)
            this.$store.commit("setUser", {
                email: '',
                uid: '',
                photoURL: ''
            })
            this.userAvatar = ''
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
            })
        },
    }
}
</script>