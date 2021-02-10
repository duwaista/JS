<template >
  <div @click="closeBottom()" v-if="$store.state.bottomMenu" class="bottom-menu" v-bind:class="{open: $store.state.bottomMenu}">
    <div class="bottom-menu-content">
      <v-card tile flat class="bottom-line-container">
        <div class="small-button-line">
        </div>
      </v-card>
      <BasicElementBottom v-if="$store.state.enterSuccess && $store.state.deleteProps.feed.uid === $store.state.user.uid" @click.native="deleteFeed()" text="Delete" icon="mdi-delete"/>
      <BasicElementBottom @click.native="sharePicture()" text="Share" icon='mdi-share' />
    </div>
  </div>
</template>

<script>
import BasicElementBottom from "@/components/BasicElementBottom";

export default {
  name: "BottomMenuComponent",
  components: {
    BasicElementBottom,
  },
  data() {
    return {
      feedProps: {
        index: 0,
        all: [{
          _id: 0,
          posts: '',
          uid: '',
          email: '',
          avatarUrl: '',
          createdAt: '',
        }]
      }
    }
  },
  methods: {
    closeBottom() {
      this.$store.dispatch('setBottomMenu', false);
    },
    deleteFeed() {
      this.feedProps = this.$store.state.deleteProps;
      let prpr = {
        index: this.feedProps.index,
        feed: this.feedProps.feed
      }
      this.$store.dispatch('deleteFeed', prpr);
    },
    async sharePicture() {
      const shareData = {
        title: 'MDN',
        text: 'Share',
        url: this.$store.state.deleteProps.feed.posts
      }
      try {
        await navigator.share(shareData);
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.open {
  display: flex;
  position: fixed;
  z-index: 18;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.3);
}
.bottom-menu-content {
  display: block;
  align-self: flex-end;
  background-color: #F7F7F7;
  margin-top: -50px;
  max-height: 60%;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  width: 100%;
}
.bottom-line-container {
  display: flex;
  justify-content: center;
}
.small-button-line {
  height: 5px;
  width: 46px;
  margin: 10px;
  border-radius: 12px;
  background-color: #9c9c9c;
}

</style>