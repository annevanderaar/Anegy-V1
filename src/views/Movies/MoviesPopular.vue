<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1 class="titles mr-16 pr-16">Popular Movies</h1>
        <MoviesFilters />
      </div>
      <cards :data="data" />
      <v-pagination
        color="secondary"
        v-model="currentPage"
        :length="6"
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
  name: "MoviesPopular",
  components: {
    HomeAppBar,
    MoviesFilters,
    WebsiteFooter,
    Cards,
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
    getPopularMovies(page) {
      axios ({
        method: "post",
        url: "http://localhost/Library/Movies/Movies.php",
        data: {
          url: '/movie/popular?',
          page: page,
        }
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
    this.getPopularMovies(this.currentPage);
    this.setDrawerInput(false);
  },
  watch: {
    currentPage(val) {
      this.getPopularMovies(val);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script> 