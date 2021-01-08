<template>
  <div class="text-center">
    <v-snackbar
        v-model="$store.state.openSnackbar"
        :timeout="2500"
        absolute
    >
    Вы вошли как {{ $store.state.user.email }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="$store.dispatch('setOpenSnackbar', false)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
    name: "SnackbarComponent"
}
</script>