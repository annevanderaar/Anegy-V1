<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/movies/popular'"
        >
          Popular Movies
        </h1>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/movies/playing'"
        >
          Movies Playing
        </h1>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/movies/top-rated'"
        >
          Top Rated Movies
        </h1>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/movies/upcoming'"
        >
          Upcoming Movies
        </h1>
        <filters :filter="filter" />
      </div>
      <cards :data="data" />
      <pagination :currentPage="currentPage" />
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import Filters from "@/components/Filters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import Pagination from "@/components/Pagination.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Movies",
  components: {
    HomeAppBar,
    Filters,
    WebsiteFooter,
    Cards,
    Pagination,
  },
  data: () => ({
    data: [],
    currentPage: 2,
    totalPages: 100,
    url: "/movie/popular?",
    filter: "movies",
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getMovies() {
      axios ({
        method: "post",
        url: "http://localhost/Library/Movies/Movies.php",
        data: {
          url: this.url,
          page: this.currentPage,
        }
      })
        .then((res) => {
          this.currentPage = res.data.page;
          this.totalPages = res.data.total_pages;
          this.data = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (this.$route.path == "/movies/popular") {
      this.url = "/movie/popular?";
      this.setDrawerInput(false);
      this.getMovies();
    }
    if (this.$route.path == "/movies/top-rated") {
      this.url = "/movie/top_rated?";
      this.setDrawerInput(false);
      this.getMovies();
    }
    if (this.$route.path == "/movies/playing") {
      this.url = "/movie/now_playing?";
      this.setDrawerInput(false);
      this.getMovies();
    }
    if (this.$route.path == "/movies/upcoming") {
      this.url = "/movie/upcoming?";
      this.setDrawerInput(false);
      this.getMovies();
    }
  },
};
</script>