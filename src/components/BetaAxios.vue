<template>
  <div>

    <AppBarComponent/>
    <DrawerComponent/>
    <SignInDialog/>
    <SignUpDialog/>
    <FullScreenDialog :picture = Picture></FullScreenDialog>

    <v-card class="fix" flat>
      <v-card-title></v-card-title>
    </v-card>
    <form v-if="this.$store.state.enterSuccess" align="center">
      <input id="add" @keyup.enter="mongoAddData" type="text" :value="productInput" placeholder="URL изображения">
      <v-btn class="shop-btn" @submit="mongoAddData" @click="mongoAddData">add</v-btn>
    </form>


    <div align="center">
      <div class="feed-container" v-for="(feed, index) in all" :key="feed.id">
        <v-card class="feed" v-bind:class="{ mobile: isMobile }" outlined>
          <v-list-item>
            <v-list-item-avatar v-if="feed.avatarUrl">
              <v-img aspect-ratio="1.0" :src= "feed.avatarUrl"></v-img>
            </v-list-item-avatar>
            <v-card-title>
              {{ feed.email }}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom v-if="feed.uid === $store.state.user.uid">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon @click="mongoDelete(index, feed._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Удалить</span>
            </v-tooltip>
          </v-list-item>
          <v-img
              aspect-ratio="1.2"
              @click.stop="$store.dispatch('openFullScreenDialog', true); Picture = feed.posts"
              loading="lazy"
              v-bind:class="{ desPic: !isMobile , mobilePic: isMobile }"
              :src = feed.posts
          >
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppBarComponent from "@/components/AppBarComponent";
import DrawerComponent from "@/components/Drawer";
import SignInDialog from "@/components/SignInDialog";
import FullScreenDialog from "@/components/FullScreenDialog";
import SignUpDialog from "@/components/SignUpDialog";
import '@/assets/styles/main.css';

export default {
name: "BetaAxios",
  components: {SignUpDialog, FullScreenDialog, SignInDialog, DrawerComponent, AppBarComponent},
  data() {
    return {
      all: [{
        id: 0,
        posts: '',
        uid: '',
        email: '',
        avatarUrl: '',
        createdAt: '',
      }],
      Picture: '',
      productInput: '',
      isMobile: Boolean
    }
  },
  methods: {
     mongoGetData() {
      this.all = axios.get('http://localhost:3000/feed')
      .then((response)=> {
          this.all = response.data
          this.all.reverse()
      })
    },
    mongoDelete(index, _id) {
      axios.delete('http://localhost:3000/feed/' + _id)
      .then(() => {
        this.all.splice(index, 1)
      })
      .catch( (error) => {
        console.log(error)
      })
    },

    mongoAddData() {
      this.productInput = document.getElementById("add").value;
      if(this.productInput !== '') {
        let post = {
          avatarUrl: this.$store.state.user.photoURL,
          email: this.$store.state.user.email,
          uid: this.$store.state.user.uid,
          posts: this.productInput,
          createdAt: new Date().toString()
        }
        axios.post('http://localhost:3000/feed', post)
            .then(() => {
              this.all.unshift(post)
            })
            .catch((e) => {
              console.log(e)
            })
      }
    },

    resizeUpdate() {
      if(this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'){
        this.isMobile = true
      }else{
        this.isMobile = false
      }
    },

  },
  mounted() {
    this.mongoGetData();
    this.resizeUpdate()
  },
  created() {
    window.addEventListener('resize', this.resizeUpdate, {passive: true})
  }
}
</script>
