<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
      <h1 class="titles">Upcoming Movies</h1>
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
  name: "MoviesUpcoming",
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
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getUpcomingMovies(page) {
      axios({
        method: "post",
        url: "http://localhost/Library/Movies.php",
        data: {
          url: "/movie/upcoming?",
          page: page,
        },
      })
        .then((res) => {
          this.currentPage = res.data.page;
          this.totalPages = res.data.total_pages;
          this.data = res.data;
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUpcomingMovies(this.currentPage);
    this.setDrawerInput(false);
  },
  watch: {
    currentPage(val) {
      this.getUpcomingMovies(val);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script> 