<template>
  <v-app-bar app color="secondary" clipped-left>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon class="white--text" :to="`/movies/discover`"
          ><v-icon>fas fa-video</v-icon></v-btn
        >
        </template>
      <span>Movies Discover</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon class="white--text" :to="`/series/discover`"
          ><v-icon>fas fa-tv</v-icon></v-btn
        >
    </template>
      <span>Series Discover</span>
    </v-tooltip>
    <!-- <v-btn icon class="white--text" :to="`/`"
      ><v-icon>fas fa-home</v-icon></v-btn
    > -->
    <v-spacer></v-spacer>
    <v-btn plain depressed icon :to="`/`">
      <v-img
        alt="Logo Anegy"
        contain
        src="/logo.png"
        transition="scale-transition"
        width="40px"
        height="40px"
      ></v-img>
    </v-btn>
    <v-spacer></v-spacer>
    <v-text-field
      label="Search"
      solo
      rounded
      clearable
      dense
      class="mt-6 shrink"
      flat
      v-if="this.show == true"
      v-model="search"
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
    url: "/search/multi?",
    search: "",
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
  },
  watch: {
    search(val) {
      if (
        this.$route.path == "/movies/trending" ||
        this.$route.path == "/movies/popular" ||
        this.$route.path == "/movies/playing" ||
        this.$route.path == "/movies/top-rated" ||
        this.$route.path == "/movies/upcoming"
      ) {
        this.url = "/search/movie?";
      }
      if (
        this.$route.path == "/series/trending" ||
        this.$route.path == "/series/popular" ||
        this.$route.path == "/series/playing" ||
        this.$route.path == "/series/top-rated" ||
        this.$route.path == "/series/upcoming"
      ) {
        this.url = "/search/tv?";
      }
      if (this.$route.path == "/") {
        this.url = "/search/multi?";
      }
      axios({
        method: "post",
        url: "http://localhost/Library/Search.php",
        data: {
          query: val,
          url: this.url,
        },
      })
        .then((res) => {
          this.$emit('watched', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>