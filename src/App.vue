<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>
<script>
export default {
  name: 'app',
  data: () => (
      {
        //
      }
  )
}
</script>
<style scoped>
input {
  width: 300px;
  padding: 9px;
  border: 2px;
}

div.container {
  padding: 0;
  max-width: 100%;
}

.row {
  margin: 0;
}
</style>
