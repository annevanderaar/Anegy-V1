<template>
  <v-app>
    <HomeAppBar @watched="watched" />
    <v-main>
      <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
      <h1 class="titles" v-if="this.$route.path == '/series/trending'">
        Trending Series
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/series/popular'">
        Popular Series
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/series/playing'">
        Series Playing
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/series/top-rated'">
        Top Rated Series
      </h1>
      <h1 class="titles" v-if="this.$route.path == '/series/upcoming'">
        Upcoming Series
      </h1>
      <SeriesFilters />
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
import SeriesFilters from "@/components/Filters/SeriesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Movies",
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
    url: "/trending/tv/day?",
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getSeries(page, url) {
      axios({
        method: "post",
        url: "http://localhost/Library/Series.php",
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
        this.getSeries(this.currentPage, this.url);
      }
    },
  },
  watch: {
    $route(val) {
      if (val.path == "/series/trending") {
        this.url = "/trending/tv/day?";
        this.getSeries(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/series/popular") {
        this.url = "/tv/popular?";
        this.getSeries(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/series/top-rated") {
        this.url = "/tv/top_rated?";
        this.getSeries(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/series/playing") {
        this.url = "/tv/on_the_air?";
        this.getSeries(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
      if (val.path == "/series/upcoming") {
        this.url = "/tv/airing_today?";
        this.getSeries(this.currentPage, this.url);
        this.setDrawerInput(false);
      }
    },
    currentPage(val) {
      this.getSeries(val, this.url);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    if (this.$route.path == "/series/trending") {
      this.url = "/trending/tv/day?";
      this.getSeries(this.currentPage, this.url);
      this.setDrawerInput(false);
    }
    if (this.$route.path == "/series/popular") {
      this.url = "/tv/popular?";
      this.setDrawerInput(false);
      this.getSeries(this.currentPage, this.url);
    }
    if (this.$route.path == "/series/top-rated") {
      this.url = "/tv/top_rated?";
      this.setDrawerInput(false);
      this.getSeries(this.currentPage, this.url);
    }
    if (this.$route.path == "/series/playing") {
      this.url = "/tv/now_playing?";
      this.setDrawerInput(false);
      this.getSeries(this.currentPage, this.url);
    }
    if (this.$route.path == "/series/upcoming") {
      this.url = "/tv/upcoming?";
      this.setDrawerInput(false);
      this.getSeries(this.currentPage, this.url);
    }
  },
};
</script>
