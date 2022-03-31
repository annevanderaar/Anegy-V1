<template>
  <v-app>
    <HomeAppBar @watched="watched" />
    <v-main>
      <v-btn @click="openFilter" class="filterBtn">Filter</v-btn>
      <h1 class="titles">Trending Series</h1>
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
    getTrendingSeries(page) {
      axios({
        method: "post",
        url: "http://localhost/Library/Series.php",
        data: {
          url: "/trending/tv/day?",
          page: page,
        },
      })
        .then((res) => {
          this.currentPage = res.data.page;
          //this.totalPages = res.data.total_pages;
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
        this.getTrendingSeries(this.currentPage);
      }
    }
  },
  mounted() {
    this.getTrendingSeries(this.currentPage);
    this.setDrawerInput(false);
  },
  watch: {
    currentPage(val) {
      this.getTrendingSeries(val);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script> 