<template>
  <div>
    <FullScreenDialog :picture=Picture></FullScreenDialog>

    <div v-if="$store.state.enterSuccess" align="center">
      <v-card class="settings" v-bind:class="{ active: isMobile }">
        <form>
          <input id="add" @keyup.enter="mongoAddData" type="text" :value="productInput" placeholder="URL изображения">
          <v-btn class="shop-btn" @submit="mongoAddData" @click="mongoAddData">add</v-btn>
          <br>
<!--          <input @keyup.enter="setAvatar" id="setAvatar" autocomplete="none" type="text" :value="userAvatar" placeholder="Set avatar URL">-->
<!--          <v-btn @click="setAvatar">set</v-btn>-->
        </form>
      </v-card>
    </div>

    <div align="center">
      <div class="feed-container" v-for="(feed, index) in all" :key="feed.id">
        <v-card class="feed" v-bind:class="{ mobile: isMobile }" outlined>
          <v-list-item>
            <v-list-item-avatar v-if="feed.avatarUrl">
              <v-img aspect-ratio="1.0" :src="feed.avatarUrl"></v-img>
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
              :src=feed.posts
          >
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FullScreenDialog from "@/components/FullScreenDialog";
import ('@/assets/styles/main.css');

export default {
  name: "FeedComponent",
  components: {
    FullScreenDialog
  },
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
      url: ""
    }
  },
  methods: {
    mongoGetData() {
      this.all = axios.get(this.url)
          .then((response) => {
            this.all = response.data;
            this.all.reverse();
            this.$store.dispatch('setLoading', false);
          })
          .catch( (err) => {
            console.log(err);
            this.$store.dispatch('setLoading', false);
          })
    },
    mongoDelete(index, _id) {
      axios.delete(this.url + _id)
          .then(() => {
            this.all.splice(index, 1)
          })
          .catch((error) => {
            console.log(error)
          })
    },

    mongoAddData() {
      this.productInput = document.getElementById("add").value;
      if (this.productInput !== '') {
        let post = {
          avatarUrl: this.$store.state.user.photoURL,
          email: this.$store.state.user.email,
          uid: this.$store.state.user.uid,
          posts: this.productInput,
          createdAt: new Date().toString()
        }
        axios.post(this.url, post)
            .then(() => {
              this.all.unshift(post);
              this.productInput = ''
            })
            .catch((e) => {
              console.log(e)
            })
      }
    },
  },
  computed: {
    isMobile: {
      get() {
        return this.$store.state.mobile;
      },
      set(m) {
        this.$store.dispatch('setMobile', m);
      }
    }
  },
  mounted() {
    this.mongoGetData();
  },
  beforeDestroy() {
    this.all = [{}];
  }
}
</script>
<style>
.row {
  margin: 0px;
}
</style>
