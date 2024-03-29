<template>
  <v-app-bar app color="secondary" clipped-left>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          @click="resetMoviesPage"
          ><v-icon>mdi-movie-open</v-icon></v-btn
        >
      </template>
      <span>Movies Discover</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          @click="resetSeriesPage"
          ><v-icon>mdi-television-classic</v-icon></v-btn
        >
      </template>
      <span>Series Discover</span>
    </v-tooltip>
    <!-- <v-btn icon class="white--text" :to="`/`"
      ><v-icon>fas fa-home</v-icon></v-btn
    > -->
    <v-spacer></v-spacer>
    <v-btn plain depressed icon @click="resetPage">
      <v-img
        alt="Logo Anegy"
        contain
        src="/Anegy-logo.png"
        transition="scale-transition"
        width="40px"
        height="40px"
      ></v-img>
    </v-btn>
    <v-spacer></v-spacer>
    <v-text-field
      ref="textField"
      label="Search"
      solo
      rounded
      dense
      class="mt-6 shrink"
      flat
      v-if="this.show == true"
      v-model="search"
    ></v-text-field>
    <v-btn
      disabled
      icon
      class="white--text"
      v-if="
        this.$route.path == `/movies/details/${this.$route.params.id}` ||
        this.$route.path == `/series/details/${this.$route.params.id}` ||
        this.$route.path == `/people/${this.$route.params.id}`
      "
      ><v-icon></v-icon
    ></v-btn>
    <v-btn icon class="white--text" @click="showSearch" v-else
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
import config from "@/config/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppBar",
  props: ["currentSearchPage"],
  data: () => ({
    url: "/search/multi?",
    search: "",
  }),
  computed: {
    ...mapGetters(["show"]),
  },
  methods: {
    ...mapActions(["setShow"]),
    openAccount() {
      this.$router.push({ path: `/account` });
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    showSearch() {
      if (this.show == false) {
        this.setShow(true);
      } else {
        this.setShow(false);
      }
    },
    getSearch(page, val, url) {
      axios({
        method: "post",
        url: `${config.url}/Library/Search.php`,
        data: {
          page: page,
          query: val,
          url: url,
        },
      })
        .then((res) => {
          this.$emit("watched", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetPage() {
      localStorage.currentPage = 1;
      localStorage.currentSearchPage = 1;
      if (this.$route.path == "/") {
        window.location.reload();
      } else {
        this.$router.push({ path: "/" });
      }
    },
    resetMoviesPage() {
      localStorage.currentPage = 1;
      localStorage.currentSearchPage = 1;
      if (this.$route.path == "/movies/discover") {
        window.location.reload();
      } else {
        this.$router.push({ path: "/movies/discover" });
      }
    },
    resetSeriesPage() {
      localStorage.currentPage = 1;
      localStorage.currentSearchPage = 1;
      if (this.$route.path == "/series/discover") {
        window.location.reload();
      } else {
        this.$router.push({ path: "/series/discover" });
      }
    },
  },
  watch: {
    search(val) {
      this.search = val;
      if (
        this.$route.path == "/movies/trending" ||
        this.$route.path == "/movies/popular" ||
        this.$route.path == "/movies/playing" ||
        this.$route.path == "/movies/top-rated" ||
        this.$route.path == "/movies/upcoming" ||
        this.$route.path == "/movies/discover"
      ) {
        this.url = "/search/movie?";
      }
      if (
        this.$route.path == "/series/trending" ||
        this.$route.path == "/series/popular" ||
        this.$route.path == "/series/playing" ||
        this.$route.path == "/series/top-rated" ||
        this.$route.path == "/series/upcoming" ||
        this.$route.path == "/series/discover"
      ) {
        this.url = "/search/tv?";
      }
      if (this.$route.path == "/") {
        this.url = "/search/multi?";
      }
      this.getSearch(this.currentSearchPage, this.search, this.url);
    },
    currentSearchPage(val) {
      this.getSearch(val, this.search, this.url);
    },
  },
};
</script>
