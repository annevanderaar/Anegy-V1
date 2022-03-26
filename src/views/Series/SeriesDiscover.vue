<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
      <h1 class="titles">Discover Series</h1>
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
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "SeriesTrending",
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
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    openFilter() {
      this.setDrawerInput(true);
    },
    getDiscoverSeries(page, genres) {
      axios({
        method: "post",
        url: "http://localhost/Library/Discover.php",
        data: {
          url: "/discover/tv?",
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
  },
  mounted() {
    this.getDiscoverSeries(this.currentPage, this.selectedGenres);
    this.setDrawerInput(false);
  },
  watch: {
    currentPage(val) {
      this.getDiscoverSeries(val, this.selectedGenres);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    selectedGenres(val) {
      this.getDiscoverSeries(this.currentPage, val);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  computed: {
    ...mapGetters(["selectedGenres"]),
  },
};
</script> 