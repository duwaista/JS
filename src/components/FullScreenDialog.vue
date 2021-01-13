<template>
  <v-row justify="center" align="center" align-content="center">
    <v-dialog
    v-model="$store.state.fullScreenDialog"
    @input="v => v || $store.dispatch('openFullScreenDialog', false)"
    :fullscreen="$vuetify.breakpoint.mobile"
    width="70%"
    height="70%"
    >
      <v-card v-if="$vuetify.breakpoint.mobile">
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="$store.dispatch('openFullScreenDialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pic-container">
          <v-card flat >
            <v-img :src="picture"></v-img>
          </v-card>
        </div>
      </v-card>

      <v-card flat v-else>
        <v-img :src="picture"></v-img>
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
<style>
.pic-container {

}
</style>
