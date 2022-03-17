<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1 class="titles mr-16 pr-4">Series</h1>
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
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Series",
  components: {
    HomeAppBar,
    SeriesFilters,
    WebsiteFooter,
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
  },
  mounted() {
    axios
      .get("http://localhost/Series.php")
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
};
</script>

<style scoped>
.serie {
  width: 300px;
  margin: 1rem;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.serie .v-img {
  width: 100%;
  height: 100%;
}

.overview {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  padding: 1rem;
  transform: translateY(101%);
  transition: transform 0.3s ease-in;
  overflow: auto;
}

.serie:hover .overview {
  transform: translateY(0);
}

.serie-info .v-avatar {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}
</style>