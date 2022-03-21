<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1 class="titles mr-16 pr-16">Playing Movies</h1>
        <MoviesFilters />
      </div>
      <div class="d-flex flex-wrap justify-center">
        <v-card
          class="movie ma-4"
          v-for="item in data.results"
          :key="item.id"
          elevation="4"
        >
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          ></v-img>
          <v-img
            v-if="item.poster_path == ''"
            src="http://via.placeholder.com/1080x1580"
          ></v-img>
          <div class="movie-info d-flex justify-space-between">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-avatar
              class="ma-2"
              color="green white--text"
              v-if="item.vote_average >= 7.5"
              >{{ item.vote_average }}</v-avatar
            >
            <v-avatar
              class="ma-2"
              color="orange white--text"
              v-else-if="item.vote_average >= 5"
              >{{ item.vote_average }}</v-avatar
            >
            <v-avatar class="ma-2" color="red white--text" v-else>{{
              item.vote_average
            }}</v-avatar>
          </div>
          <v-card class="overview">
            <v-card-subtitle
              ><strong>Release Date:</strong>
              {{ item.release_date }}</v-card-subtitle
            >
            <v-card-text>{{ item.overview }}</v-card-text>
            <v-btn elevation="0" color="secondary" class="ml-2"
              >Know more</v-btn
            >
            <v-btn icon color="secondary"><v-icon>far fa-heart</v-icon></v-btn>
            <!-- <v-btn icon color="secondary"><v-icon>fas fa-heart</v-icon></v-btn> -->
          </v-card>
        </v-card>
      </div>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Movies Playing",
  components: {
    HomeAppBar,
    MoviesFilters,
    WebsiteFooter,
  },
  data: () => ({}),
  methods: {
    ...mapActions(["setDrawerInput", "getPlayingMovies"]),
    openFilter() {
      this.setDrawerInput(true);
    },
  },
  mounted() {
    this.getPlayingMovies();
  },
  computed: {
    ...mapGetters(["data", "currentPage"]),
  },
};
</script>