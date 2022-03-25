<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-space-between my-4">
        <v-btn @click="openFilter" class="mx-2">Filter</v-btn>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/series/popular'"
        >
          Popular Series
        </h1>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/series/playing'"
        >
          Series Playing
        </h1>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/series/top-rated'"
        >
          Top Rated Series
        </h1>
        <h1
          class="titles mr-16 pr-16"
          v-if="this.$route.path == '/series/upcoming'"
        >
          Upcoming Series
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
  name: "Series",
  components: {
    HomeAppBar,
    Filters,
    WebsiteFooter,
    Cards,
    Pagination,
  },
  data: () => ({
    data: [],
    currentPage: 1,
    totalPages: 100,
    url: "/tv/popular?",
    filter: "series",
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getSeries() {
      axios ({
        method: "post",
        url: "http://localhost/Library/Series/Series.php",
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
    if (this.$route.path == "/series/popular") {
      this.url = "/tv/popular?";
      this.setDrawerInput(false);
      this.getSeries();
    }
    if (this.$route.path == "/series/top-rated") {
      this.url = "/tv/top_rated?";
      this.setDrawerInput(false);
      this.getSeries();
    }
    if (this.$route.path == "/series/playing") {
      this.url = "/tv/on_the_air?";
      this.setDrawerInput(false);
      this.getSeries();
    }
    if (this.$route.path == "/series/upcoming") {
      this.url = "/tv/airing_today?";
      this.setDrawerInput(false);
      this.getSeries();
    }
  },
};
</script>