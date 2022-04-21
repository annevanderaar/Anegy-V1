<template>
  <v-app>
    <HomeAppBar @watched="watched" :currentSearchPage="currentSearchPage" />
    <v-main>
      <v-container fluid>
        <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
        <h1 v-if="this.$route.path == '/movies/discover'">Discover Movies</h1>
        <h1 v-if="this.$route.path == '/movies/trending'">Trending Movies</h1>
        <h1 v-if="this.$route.path == '/movies/popular'">Popular Movies</h1>
        <h1 v-if="this.$route.path == '/movies/playing'">Movies Playing</h1>
        <h1 v-if="this.$route.path == '/movies/top-rated'">Top Rated Movies</h1>
        <h1 v-if="this.$route.path == '/movies/upcoming'">Upcoming Movies</h1>
        <MoviesFilters @genres="selectedGenresM" />
        <cards :data="data.results" />
        <v-pagination
          v-if="this.show == false"
          color="secondary"
          v-model="currentPage"
          :length="totalPages"
          :total-visible="10"
          class="my-4"
        ></v-pagination>
        <v-pagination
          v-if="this.show == true"
          color="secondary"
          v-model="currentSearchPage"
          :length="totalSearchPages"
          :total-visible="10"
          class="my-4"
        ></v-pagination>
      </v-container>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import MoviesFilters from "@/components/Filters/MoviesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Movies",
  components: {
    HomeAppBar,
    MoviesFilters,
    WebsiteFooter,
    Cards,
  },
  data: () => ({
    data: [],
    currentPage: 1,
    totalPages: 500,
    currentSearchPage: 1,
    totalSearchPages: 500,
    url: "/discover/movie?",
    selectedGenresMovie: [],
  }),
  computed: {
    ...mapGetters(["show"]),
  },
  methods: {
    ...mapActions(["setDrawerInput", "setShow"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getMovies(page, url, genres) {
      axios({
        method: "post",
        url: `${config.url}/Library/Discover.php`,
        data: {
          url: url,
          page: page,
          genres: encodeURI(genres.join(",")),
        },
      })
        .then((res) => {
          if (res.data.total_pages <= 500) {
            this.totalPages = res.data.total_pages;
          }
          this.currentPage = res.data.page;
          this.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    watched(data) {
      this.data = data;
      this.currentSearchPage = data.page;
      if (data.total_pages <= 500) {
        this.totalSearchPages = data.total_pages;
      }
      if (data.errors) {
        this.currentPage = 1;
        this.currentSearchPage = 1;
        this.setShow(false);
        this.getMovies(this.currentPage, this.url, this.selectedGenresMovie);
      }
    },
    selectedGenresM(val) {
      this.selectedGenresMovie = val;
      this.getMovies(this.currentPage, this.url, this.selectedGenresMovie);
    },
  },
  watch: {
    $route(val) {
      if (val.path == "/movies/discover") this.url = "/discover/movie?";
      if (val.path == "/movies/trending") this.url = "/trending/movie/day?";
      if (val.path == "/movies/popular") this.url = "/movie/popular?";
      if (val.path == "/movies/top-rated") this.url = "/movie/top_rated?";
      if (val.path == "/movies/playing") this.url = "/movie/now_playing?";
      if (val.path == "/movies/upcoming") this.url = "/movie/upcoming?";
      this.getMovies(this.currentPage, this.url, this.selectedGenresMovie);
      this.setDrawerInput(false);
      this.setShow(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    currentPage(val) {
      this.getMovies(val, this.url, this.selectedGenresMovie);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    currentSearchPage() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    show(val) {
      if (val == false)
        this.getMovies(this.currentPage, this.url, this.selectedGenresMovie);
    },
  },
  mounted() {
    if (this.$route.path == "/movies/discover") this.url = "/discover/movie?";
    if (this.$route.path == "/movies/trending")
      this.url = "/trending/movie/day?";
    if (this.$route.path == "/movies/popular") this.url = "/movie/popular?";
    if (this.$route.path == "/movies/top-rated") this.url = "/movie/top_rated?";
    if (this.$route.path == "/movies/playing") this.url = "/movie/now_playing?";
    if (this.$route.path == "/movies/upcoming") this.url = "/movie/upcoming?";
    this.getMovies(this.currentPage, this.url, this.selectedGenresMovie);
    this.setDrawerInput(false);
    this.setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
