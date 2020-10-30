<template>
  <v-row justify="center" align="center">
    <v-dialog
    v-model="$store.state.fullScreenDialog"
    fullscreen
    hide-overlay
    >
      <v-card>
        <v-toolbar>
          <v-btn
              icon
              @click="$store.dispatch('openFullScreenDialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-img :src="picture"></v-img>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'FullScreenDialog',
  props: {
    picture: {
      type: String,
      default: ''
    }
  }
}
</script>
