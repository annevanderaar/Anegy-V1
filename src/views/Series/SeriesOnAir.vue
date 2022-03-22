<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1 class="titles mr-16 pr-16">Playing Series</h1>
        <SeriesFilters />
      </div>
      <div class="d-flex flex-wrap justify-center">
        <v-card
          class="serie ma-4"
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
          <div class="serie-info d-flex justify-space-between">
            <v-card-title>{{ item.name }}</v-card-title>
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
              ><strong>First Air Date:</strong>
              {{ item.first_air_date }}</v-card-subtitle
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
import SeriesFilters from "@/components/Filters/SeriesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Series On Air",
  components: {
    HomeAppBar,
    SeriesFilters,
    WebsiteFooter,
  },
  data: () => ({}),
  methods: {
    ...mapActions(["setDrawerInput", "getOnAirSeries"]),
    openFilter() {
      this.setDrawerInput(true);
    },
  },
  mounted() {
    this.getOnAirSeries();
    this.setDrawerInput(false);
  },
  computed: {
    ...mapGetters(["data", "currentPage"]),
  },
};
</script>