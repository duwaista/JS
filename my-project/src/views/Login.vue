<template>
<div align="center">
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
<router-link to="/root" tag="v-btn">Root</router-link>
</div>
</template>

<script>
  //import {db} from '@/main'
  export default {
    name: 'Login',
    data () {
      return{
        locations: [],
        name: '',
        image: ''
      }
    },
    /*firestore(){
      return {
        locations: db.collection('locations').orderBy('createdAt')
      } 
    },*/
    mounted() {
      //this.location.
    },
    methods:{
      addLocation(name, image) {
        const createdAt = new Date()
        db.collection('locations').add({name, image, createdAt})
        this.locations.push({name, image, createdAt})
      },
      deleteLocation(id) {
        db.collection('locations')
        .doc(id)
        .delete()
        //this.locations.splice({name, image, createdAt})
        this.$firestoreRefs.locations.doc(id).delete()
      }
    }
  }
</script>