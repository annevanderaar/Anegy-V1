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
        <SeriesFilters />
      </div>
      <cards :data="data" />
      <pagination :currentPage="currentPage" />
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import SeriesFilters from "@/components/Filters/SeriesFilters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import Pagination from "@/components/Pagination.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Series",
  components: {
    HomeAppBar,
    SeriesFilters,
    WebsiteFooter,
    Cards,
    Pagination,
  },
  data: () => ({
    data: [],
    currentPage: 1,
    totalPages: 100,
    url: "http://localhost/Library/Series/SeriesPopular.php",
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getSeries() {
      axios
        .get(this.url)
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
    this.setDrawerInput(false);
    if (this.$route.path === "/series/popular") {
      this.url = "http://localhost/Library/Series/SeriesPopular.php";
      this.getSeries();
    }
    if (this.$route.path === "/series/top-rated") {
      this.url = "http://localhost/Library/Series/SeriesTopRated.php";
      this.getSeries();
    }
    if (this.$route.path === "/series/playing") {
      this.url = "http://localhost/Library/Series/SeriesOnAir.php";
      this.getSeries();
    }
    if (this.$route.path === "/series/upcoming") {
      this.url = "http://localhost/Library/Series/SeriesAiring.php";
      this.getSeries();
    }
  },
};
</script>