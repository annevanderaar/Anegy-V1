<template>
  <v-app-bar app color="secondary" clipped-left>
    <v-btn icon class="white--text" :to="`/movies/popular`"
      ><v-icon>fas fa-video</v-icon></v-btn
    >
    <v-btn icon class="white--text" :to="`/series/popular`"
      ><v-icon>fas fa-tv</v-icon></v-btn
    >
    <v-btn icon class="white--text" :to="`/`"
      ><v-icon>fas fa-home</v-icon></v-btn
    >
    <v-spacer></v-spacer>
    <!-- <v-img
      alt="Logo Anegy"
      contain
      src="/Naamloos-1.png"
      transition="scale-transition"
      width="40px"
      height="40px"
    ></v-img>
    <v-spacer></v-spacer> -->
    <v-text-field
      label="Search"
      solo
      rounded
      dense
      class="mt-6 shrink"
      flat
      v-if="this.show == true"
    ></v-text-field>
    <v-btn icon class="white--text" @click="showSearch"
      ><v-icon>fas fa-search</v-icon></v-btn
    >
    <!-- <v-btn icon class="white--text" @click="openAccount"
      ><v-icon>fas fa-user-astronaut</v-icon></v-btn
    >
    <v-btn icon class="white--text"><v-icon>fas fa-heart</v-icon></v-btn> -->
    <v-btn
      icon
      class="white--text"
      v-if="!$vuetify.theme.dark"
      @click="darkMode"
      ><v-icon>fas fa-moon</v-icon></v-btn
    >
    <v-btn icon class="white--text" v-else @click="darkMode"
      ><v-icon>fas fa-sun</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
import axios from "axios";

export default {
  name: "AppBar",
  data: () => ({
    show: false,
  }),
  methods: {
    openAccount() {
      this.$router.push({ path: `/account` });
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    showSearch() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    searchMulti(search) {
      axios({
        method: "post",
        url: "http://localhost/Library/Search/Search.php",
        data: {
          query: search,
          url: "/search/multi?",
        },
      })
        .then((res) => {
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>