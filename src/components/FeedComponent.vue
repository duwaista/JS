<template>
  <div>
    <FullScreenDialog :picture="Picture"></FullScreenDialog>
    <BottomMenuComponent> </BottomMenuComponent>

    <div v-if="$store.state.enterSuccess" align="center">
      <v-card
        class="settings"
        :loading="loading"
        v-bind:class="{ active: isMobile }"
      >
        <form>
          <v-file-input
            value="20"
            placeholder="Click to select file (still only pics)"
            class="upload-file-input"
            show-size
            v-model="file"
            accept="image/*"
          >
          </v-file-input>
          <v-btn @click="addFile()">Upload</v-btn>
          <br/>
        </form>
      </v-card>
    </div>

    <div align="center">
      <v-card
        v-for="(feed, index) in all"
        :key="feed.id"
        class="feed"
        v-bind:class="{ mobile: isMobile }"
        outlined
      >
        <v-list-item>
          <v-list-item-avatar width="38px" height="38px">
            <img v-if="feed.avatarUrl" alt="avatar" :src="feed.avatarUrl" />
            <v-icon v-else>mdi-account-circle-outline</v-icon>
          </v-list-item-avatar>
          <v-card-title>
            {{ feed.email }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                @click.native="openBottomMenu(index, feed)"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <span>Menu</span>
          </v-tooltip>
        </v-list-item>
        <video
          v-bind:class="{ desPic: !isMobile, mobilePic: isMobile }"
          v-if="feed.type === 'video'"
          :src=feed.posts
          preload="none"
          controls
        ></video>
        <img
          v-else
          :alt="feed.posts"
          v-bind:class="{ desPic: !isMobile, mobilePic: isMobile }"
          loading="lazy"
          @click.stop="
            $store.dispatch('openFullScreenDialog', true);
            Picture = feed.posts;"
          :src="feed.posts"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { storage } from "@/plugins/firebase";
import FullScreenDialog from "@/components/FullScreenDialog";
import BottomMenuComponent from "@/components/BottomMenuComponent";

export default {
  name: "FeedComponent",
  components: {
    BottomMenuComponent,
    FullScreenDialog,
  },
  data() {
    return {
      Picture: "",
      url: "https://quiet-ridge-83792.herokuapp.com/api/feed/",
      file: [],
      loading: false,
    };
  },
  methods: {
    openBottomMenu(index, feed) {
      this.$store.dispatch("setBottomMenu", true);
      this.$store.dispatch("setDeleteProps", { index, feed });
    },
    mongoAddData(url) {
      let post = {
        avatarUrl: this.$store.state.user.photoURL,
        email: this.$store.state.user.email,
        uid: this.$store.state.user.uid,
        posts: url,
        createdAt: new Date().toString(),
      };
      axios
        .post(this.url, post)
        .then(() => {
          this.all.unshift(post);
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    addFile() {
      const maxSize = 5 * 1024 * 1024;
      this.loading = true;
      const fileRef = storage.ref();

      if (this.file.size && this.file.size < maxSize) {
        let uploadFile = fileRef.child("images/" + this.file.name);
        uploadFile
          .put(this.file)
          .then(() => {
            uploadFile
              .getDownloadURL()
              .then(async (url) => {
                await this.mongoAddData(url);
                this.file = [];
                uploadFile = [];
              })
              .catch((err) => {
                console.log(err);
                this.loading = false;
              });
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      } else {
        console.log("You died");
        this.loading = false;
      }
    },
  },
  computed: {
    all: {
      get() {
        return this.$store.state.all;
      },
      set() {},
    },
    isMobile: {
      get() {
        return this.$store.state.mobile;
      },
      set(m) {
        this.$store.dispatch("setMobile", m);
      },
    },
  },
  created() {
    this.$store.dispatch("mongoGetData");
  },
};
</script>
<style scoped>
.settings {
  width: 48%;
  margin-bottom: 8px;
}

.active {
  height: 90%;
  width: 97%;
}

.v-card__title {
  padding: 8px;
  margin-left: 4px;
}

.feed {
  margin-bottom: 8px;
  height: 100%;
  width: 48%;
}

.feed .v-application--is-ltr .v-list-item__avatar:first-child {
  margin-bottom: 4px;
  margin-top: 4px;
}

.feed-container img {
  padding: 0;
  margin-bottom: 0;
}

.v-application--is-ltr .v-list-item__avatar:first-child {
  margin-right: 0;
}

.desPic {
  height: 100%;
  width: 99%;
  cursor: pointer;
  max-height: 400px;
  object-fit: cover;
}

.mobilePic {
  object-fit: cover;
  margin-bottom: 0;
  padding-bottom: 0;
  width: 100%;
  min-height: 260px;
  max-height: 320px;
}

.upload-file-input {
  width: 90%;
}

.mobile {
  height: 90%;
  width: 97%;
}
</style>
