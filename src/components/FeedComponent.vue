<template>
  <div>
    <FullScreenDialog :picture=Picture></FullScreenDialog>
    <BottomMenuComponent>
    </BottomMenuComponent>

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
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon @click="openBottomMenu(index, feed)">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <span>Menu</span>
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
import BottomMenuComponent from "@/components/BottomMenuComponent";
import ('@/assets/styles/main.css');

export default {
  name: "FeedComponent",
  components: {
    BottomMenuComponent,
    FullScreenDialog,
  },
  data() {
    return {
      Picture: '',
      productInput: '',
      url: "https://quiet-ridge-83792.herokuapp.com/api/feed/"
    }
  },
  methods: {
    openBottomMenu(index, feed) {
      this.$store.dispatch('setBottomMenu', true);
      let temp ={
        index,
        feed
      }
      this.$store.dispatch('setDeleteProps', temp);
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
              this.productInput = '';
            })
            .catch((e) => {
              console.log(e)
            })
      }
    },
  },
  computed: {
    all: {
      get() {
        return this.$store.state.all
      },
      set() {
        this.$store.dispatch()
      }
    },
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
    this.$store.dispatch('mongoGetData')
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
