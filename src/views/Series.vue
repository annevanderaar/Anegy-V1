<template>
  <v-app>
    <HomeAppBar @watched="watched" :currentSearchPage="currentSearchPage" />
    <v-main>
      <v-container fluid>
        <v-btn
          @click="openFilter"
          icon
          color="btnFilterColor"
          class="filterBtn"
          v-if="this.$vuetify.breakpoint.xs"
          ><v-icon class="ma-2 mr-8">fas fa-filter</v-icon></v-btn
        >
        <v-btn @click="openFilter" class="filterBtn" v-else>Filter</v-btn>
        <h1>{{ pageName }} Series</h1>
        <SeriesFilters @genres="selectedGenresS" />
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
import SeriesFilters from "@/components/Filters/SeriesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Series",
  components: {
    HomeAppBar,
    SeriesFilters,
    WebsiteFooter,
    Cards,
  },
  data: () => ({
    data: [],
    currentPage: 1,
    totalPages: 500,
    currentSearchPage: 1,
    totalSearchPages: 500,
    url: "/discover/tv?",
    selectedGenresSerie: [],
    pageName: "Discover",
  }),
  computed: {
    ...mapGetters(["show"]),
  },
  methods: {
    ...mapActions(["setDrawerInput", "setShow"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getSeries(page, url, genres) {
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
        this.getSeries(this.currentPage, this.url, this.selectedGenresSerie);
      }
    },
    selectedGenresS(val) {
      this.selectedGenresSerie = val;
      this.getSeries(this.currentPage, this.url, this.selectedGenresSerie);
    },
  },
  watch: {
    $route(val) {
      if (val.path == "/series/discover") {
        this.url = "/discover/tv?";
        this.pageName = "Discover";
      }
      if (val.path == "/series/trending") {
        this.url = "/trending/tv/day?";
        this.pageName = "Trending";
      }
      if (val.path == "/series/popular") {
        this.url = "/tv/popular?";
        this.pageName = "Popular";
      }
      if (val.path == "/series/top-rated") {
        this.url = "/tv/top_rated?";
        this.pageName = "Top Rated";
      }
      if (val.path == "/series/playing") {
        this.url = "/tv/on_the_air?";
        this.pageName = "Playing";
      }
      if (val.path == "/series/upcoming") {
        this.url = "/tv/airing_today?";
        this.pageName = "Upcoming";
      }

      this.getSeries(this.currentPage, this.url, this.selectedGenresSerie);
      this.setDrawerInput(false);
      this.setShow(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    currentPage(val) {
      this.getSeries(val, this.url, this.selectedGenresSerie);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    currentSearchPage() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    show(val) {
      if (val == false)
        this.getSeries(this.currentPage, this.url, this.selectedGenresMovie);
    },
  },
  mounted() {
    if (this.$route.path == "/series/discover") {
      this.url = "/discover/tv?";
      this.pageName = "Discover";
    }
    if (this.$route.path == "/series/trending") {
      this.url = "/trending/tv/day?";
      this.pageName = "Trending";
    }
    if (this.$route.path == "/series/popular") {
      this.url = "/tv/popular?";
      this.pageName = "Popular";
    }
    if (this.$route.path == "/series/top-rated") {
      this.url = "/tv/top_rated?";
      this.pageName = "Top Rated";
    }
    if (this.$route.path == "/series/playing") {
      this.url = "/tv/on_the_air?";
      this.pageName = "Playing";
    }
    if (this.$route.path == "/series/upcoming") {
      this.url = "/tv/airing_today?";
      this.pageName = "Upcoming";
    }
    this.getSeries(this.currentPage, this.url, this.selectedGenresSerie);
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
