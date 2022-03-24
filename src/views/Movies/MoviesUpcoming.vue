<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1 class="titles mr-16 pr-16">Upcoming Movies</h1>
        <MoviesFilters />
      </div>
      <cards :data="data" />
      <pagination :currentPage="currentPage" />
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import MoviesFilters from "@/components/Filters/MoviesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import Pagination from "@/components/Pagination.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "MoviesUpcoming",
  components: {
    HomeAppBar,
    MoviesFilters,
    WebsiteFooter,
    Cards,
    Pagination,
  },
  data: () => ({
    data: [],
    currentPage: 1,
    totalPages: 100,
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getUpcomingMovies() {
      axios
        .get("http://localhost/Library/Movies/MoviesUpcoming.php")
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
    this.getUpcomingMovies();
    this.setDrawerInput(false);
  },
};
</script>