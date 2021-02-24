<template>
  <div class="header">
    <v-app-bar
        app
        dense
        elevation="2"
    >
      <v-app-bar-nav-icon @click.stop="$store.state.drawer = !$store.state.drawer"/>
      <template>
        <v-spacer @click="scrollOnTop()" class="scroll-on-top-header"/>
        <v-toolbar-items v-if="$store.state.enterSuccess">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-avatar class="toolbar-container" v-if="$store.state.user.photoURL">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-img aspect-ratio="1.0" :src="$store.state.user.photoURL"/>
                </v-btn>
              </v-list-item-avatar>
            </template>
            <v-list class="menu-button">
              <v-list-item class="dropdown-menu">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon @click="logoutUser">
                      <v-icon>mdi-logout</v-icon>
                    </v-btn>
                    Выйти
                  </template>
                  <span>Выйти</span>
                </v-tooltip>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn
              v-if="$store.state.enterSuccess === false && !$store.state.mobile"
              class="d-none d-lg-block"
              text
              @click.stop="$store.state.inDialog = true">
            Sign-in
          </v-btn>
          <v-btn
              v-if="$store.state.enterSuccess === false && !$store.state.mobile"
              class="d-none d-lg-block"
              text
              @click.stop="$store.state.upDialog = true">
            Sign-up
          </v-btn>
          <v-btn
              v-if="!$store.state.enterSuccess && $store.state.mobile"
              class="d-lg-none"
              text
              @click.stop="$store.state.inDialog = true">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-toolbar-items>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import {firebase} from '@/plugins/firebase'

export default {
  name: "AppBarComponent",
  methods: {
    async logoutUser() {
      await firebase.auth().signOut()
          .then(() => {
            this.$store.dispatch("enterSuccess", false);
            this.$store.dispatch("setUser", {
              email: '',
              uid: '',
              photoURL: ''
            });
            this.userAvatar = '';
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    scrollOnTop() {
      window.scroll({
        top: 0,
        left: 0,
      })
    }
  }
}
</script>

<style scoped>
.v-application--is-ltr .v-list-item__avatar:first-child {
  margin-right: 0;
}

.toolbar-container {
  margin-right: 0;
}

.scroll-on-top-header {
  height: 100%;
  width: 30%;
}

.dropdown-menu {
  padding: 0 8px;
}

.header {
  margin-bottom: 54px;
}

.menu-button {
  padding: 0 0;
  margin: 0;
}
</style>