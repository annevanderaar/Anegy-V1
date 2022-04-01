<template>
  <v-app>
    <HomeAppBar @watched="watched" />
    <v-main>
      <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
      <h1 class="titles" v-if="this.$route.path == '/movies/trending'">
        Trending Movies
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/movies/popular'">
        Popular Movies
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/movies/playing'">
        Movies Playing
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/movies/top-rated'">
        Top Rated Movies
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/movies/upcoming'">
        Upcoming Movies
      </h1>
      <MoviesFilters />
      <cards :data="data" />
      <v-pagination
        color="secondary"
        v-model="currentPage"
        :length="totalPages"
        :total-visible="10"
        class="my-4"
      ></v-pagination>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import MoviesFilters from "@/components/Filters/MoviesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import { mapActions } from "vuex";
import axios from "axios";

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
    url: "/trending/movie/day?",
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getMovies(page, url) {
      axios({
        method: "post",
        url: "http://localhost/Library/Movies.php",
        data: {
          url: url,
          page: page,
        },
      })
        .then((res) => {
          if (res.data.total_pages <= 500) {
            this.totalPages = res.data.total_pages;
          }
          this.currentPage = res.data.page;
          this.data = res.data;
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    watched(data) {
      //console.log(data)
      this.data = data;
      this.currentPage = data.page;
      if (data.errors) {
        this.currentPage = 1;
        this.getMovies(this.currentPage, this.url);
      }
    },
  },
  watch: {
    $route(val) {
      console.log(val.path);
      if (val.path == "/movies/trending") {
        this.url = "/trending/movie/day?";
        this.getMovies(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/movies/popular") {
        this.url = "/movie/popular?";
        this.getMovies(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/movies/top-rated") {
        this.url = "/movie/top_rated?";
        this.getMovies(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/movies/playing") {
        this.url = "/movie/now_playing?";
        this.getMovies(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/movies/upcoming") {
        this.url = "/movie/upcoming?";
        this.getMovies(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
    },
    currentPage(val) {
      this.getMovies(val, this.url);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    if (this.$route.path == "/movies/trending") {
      this.url = "/trending/movie/day?";
      this.getMovies(this.currentPage, this.url);
      this.setDrawerInput(false);
    }
    if (this.$route.path == "/movies/popular") {
      this.url = "/movie/popular?";
      this.setDrawerInput(false);
      this.getMovies(this.currentPage, this.url);
    }
    if (this.$route.path == "/movies/top-rated") {
      this.url = "/movie/top_rated?";
      this.setDrawerInput(false);
      this.getMovies(this.currentPage, this.url);
    }
    if (this.$route.path == "/movies/playing") {
      this.url = "/movie/now_playing?";
      this.setDrawerInput(false);
      this.getMovies(this.currentPage, this.url);
    }
    if (this.$route.path == "/movies/upcoming") {
      this.url = "/movie/upcoming?";
      this.setDrawerInput(false);
      this.getMovies(this.currentPage, this.url);
    }
  },
};
</script>
