<template v-if="$store.state.fullScreenDialog">
  <div>
    <v-dialog
        v-model="$store.state.fullScreenDialog"
        :fullscreen="$vuetify.breakpoint.mobile"
        max-width="70%"
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
          <img alt="picture" loading="lazy" class="mobile-fullscreen-picture" :src="picture"/>
        </div>

      </v-card>
      <v-card flat v-else>
        <v-img width="100%" height="100%" :src="picture"></v-img>
      </v-card>

    </v-dialog>
  </div>
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
<style scoped>
.mobile-fullscreen-card {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  margin-bottom: auto;
  margin-top: auto;
  height: 100%;
}

.mobile-fullscreen-picture {
  position: relative;
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
}

.mobile-fullscreen-picture-container {
  display: flex;
  align-content: center;
  height: 100%;
}

.mobile-fullscreen-header {
  position: fixed;
  z-index: 1;
  display: flex;
  width: 100%;
  align-self: start;
  align-content: center;
  height: 56px;
  background-color: #fff;
  justify-content: flex-end;
}

.close-fullscreen-button {
  align-self: center;
  margin-right: 10px;
}
</style>
