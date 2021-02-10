<template v-if="$store.state.fullScreenDialog">
  <div>
    <v-dialog
        v-model="$store.state.fullScreenDialog"
        @input="v => v || $store.dispatch('openFullScreenDialog', false)"
        :fullscreen="$vuetify.breakpoint.mobile"
        width="70%"
        height="70%"
    >
      <v-card class="mobile-fullscreen-card" v-if="$vuetify.breakpoint.mobile">
        <v-card flat class="mobile-fullscreen-header">
          <v-spacer></v-spacer>
          <v-btn
              class="close-fullscreen-button"
              icon
              @click="$store.dispatch('openFullScreenDialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
        <div class="mobile-fullscreen-picture-container">
          <v-img class="mobile-fullscreen-picture" :src="picture"></v-img>
        </div>

      </v-card>
      <v-card flat v-else>
        <v-img width="100%" height="100%" :src="picture"></v-img>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import ('../assets/styles/main.css');

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
<style>

</style>
