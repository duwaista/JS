<template>
  <div>
    <!-- Used components: -->
    <AppBarComponent />
    <SnackbarComponent />
    <DrawerComponent />
    <SignInDialog />
    <SignUpDialog v-if="$store.state.upDialog" />

    <div v-if="$store.state.loading" align="center">
      <v-progress-circular
        color="primary"
        :indeterminate="true"
      ></v-progress-circular>
    </div>

    <!-- Feed -->
    <FeedComponent v-show="!$store.state.loading"></FeedComponent>
  </div>
</template>

<script>
import { firebase } from "@/plugins/firebase";
import AppBarComponent from "@/components/AppBarComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent";
import FeedComponent from "@/components/FeedComponent";

const SignInDialog = () => import("@/components/SignInDialog");
const SignUpDialog = () => import("@/components/SignUpDialog.vue");
const DrawerComponent = () => import("@/components/Drawer.vue");

export default {
  components: {
    FeedComponent,
    AppBarComponent,
    DrawerComponent,
    SignInDialog,
    SignUpDialog,
    SnackbarComponent,
  },
  data() {
    return {
      enterError: false,
      productInput: "",
      userAvatar: "",
      upDialog: false,
      postId: 0,
      Picture: "",
      openSnackbar: false,
    };
  },

  methods: {
    setAvatar() {
      this.userAvatar = document.getElementById("setAvatar").value;
      let User = firebase.auth().currentUser;
      if (this.enterSuccess && this.userAvatar !== "") {
        User.updateProfile({
          photoURL: this.userAvatar,
        }).then(() => {
          this.user.photoURL = User.photoURL;
          this.userAvatar = "";
        });
      }
    },

    resizeUpdate() {
      if (
        this.$vuetify.breakpoint.name === "xs" ||
        this.$vuetify.breakpoint.name === "sm"
      ) {
        this.$store.dispatch("setMobile", true);
      } else {
        this.$store.dispatch("setMobile", false);
      }
    },

    getCurrentUser() {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser !== null) {
          this.user = {
            email: currentUser.email,
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
          };
          this.$store.dispatch("enterSuccess", true);
          this.$store.dispatch("setOpenSnackbar", true);
        } else {
          this.$store.dispatch("enterSuccess", false);
        }
      });
    },
  },

  created() {
    window.addEventListener("resize", this.resizeUpdate, { passive: true });
    let vm = this;
    document.addEventListener("click", function () {
      vm.drawer = false;
    });
  },

  mounted() {
    this.resizeUpdate();
    this.getCurrentUser();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeUpdate);
  },

  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(w) {
        this.$store.state.drawer = w;
      },
    },
    enterSuccess: {
      get() {
        return this.$store.state.enterSuccess;
      },
      set(s) {
        this.$store.commit("enterSuccess", s);
      },
    },
    user: {
      get() {
        return this.$store.state.user;
      },
      set(u) {
        this.$store.commit("setUser", u);
        this.$store.state.user = u;
      },
    },
  },
};
</script>
<style scoped>
.row {
  margin: 0;
}
</style>
