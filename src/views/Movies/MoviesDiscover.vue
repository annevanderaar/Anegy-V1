<template>
  <v-app>
    <HomeAppBar @watched="watched"/>
    <v-main>
      <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
      <h1 class="titles">Discover Movies</h1>
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
import { mapActions, mapGetters } from "vuex";
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
    totalPages: 500,
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getDiscoverMovies(page, genres) {
      axios({
        method: "post",
        url: "http://localhost/Library/Discover.php",
        data: {
          url: "/discover/movie?",
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
      if(data.errors) {
        this.currentPage = 1;
        this.getDiscoverMovies(this.currentPage, this.selectedGenresMovie);
      }
    }
  },
  mounted() {
    this.getDiscoverMovies(this.currentPage, this.selectedGenresMovie);
    this.setDrawerInput(false);
  },
  watch: {
    currentPage(val) {
      this.getDiscoverMovies(val, this.selectedGenresMovie);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    selectedGenresMovie(val) {
      //console.log(val)
      this.getDiscoverMovies(this.currentPage, val);
    },
  },
  computed: {
    ...mapGetters(["selectedGenresMovie"]),
  },
};
</script> 