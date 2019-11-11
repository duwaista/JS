<template>
<div>
  <!--h2>{{ location.image }}</h2-->
  <article v-for="(location, idx) in locations" :key="idx">
    <img :src="location.image">
    <h1>{{location.name}}</h1>
    <v-btn @click="deleteLocation(location.id)">Delete</v-btn>
  </article>

<form @submit="addLocation(name, image)">
<input v-model="name" placeholder="Location Name">
<input v-model="image" placeholder="Location Image URL">
<v-btn type="submit">Add New Location</v-btn>
</form>

</div>
</template>

<script>
  import {db} from '@/main'
  export default {
    name: 'Login',
    data () {
      return{
        locations: [],
        name: '',
        image: '',
      }
    },
    firestore(){
      return {
        locations: db.collections('locations').orderBy('createdAt')
      } 
    },
    methods:{
      addLocation(name, image) {
        const createdAt = new Date()
        db.collection('locations').add({name, image, createdAt})
      },
      deleteLocation(id) {
        db.collection('locations').doc(id).delete()
      }
    }
  }
</script>