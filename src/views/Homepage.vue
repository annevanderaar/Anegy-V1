<template>
    <v-app>
        <HomeAppBar />
        <v-main>
          <v-btn @click="openFilter" class="ma-2">Filter</v-btn>
          <Filters />
          <div class="d-flex flex-wrap justify-center">
            <v-card class="ma-4" max-width="260px" v-for="item in data.results" :key="item.id" elevation="4">
              <div class="d-flex justify-space-between">
                <v-card-title>{{item.title}}</v-card-title>
                <v-avatar tile class="voteA">{{item.vote_average}}</v-avatar>
              </div>
              <v-card-subtitle><strong>Release Date:</strong> {{item.release_date}}</v-card-subtitle>
              <v-img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"></v-img>
              <div class="mb-2">
                <v-card-text>{{item.overview}}</v-card-text>
                <v-btn elevation="0" color="secondary" class="ml-2">Know more</v-btn>
                <v-btn icon color="secondary"><v-icon>far fa-heart</v-icon></v-btn>
                <!-- <v-btn icon color="secondary"><v-icon>fas fa-heart</v-icon></v-btn> -->
              </div>
            </v-card>
          </div>
          <v-pagination color="secondary" v-model="currentPage" :length="6"></v-pagination>
        </v-main>
        <WebsiteFooter />
    </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import Filters from "@/components/Filters.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import {mapActions} from "vuex";
import axios from "axios";

export default {
  name: 'Homepage',
  components: {
    HomeAppBar,
    Filters,
    WebsiteFooter,
  },
  data: () => ({
    currentPage: 1,
    data: [],
    totalPages: 100,
  }),
  methods: {
    ...mapActions(['setDrawerInput']),
    openFilter() {this.setDrawerInput(true)},
    // getColor(vote) {
    //   if (vote >= 8) {
    //       this.color = '#09F800';
    //   } else if (vote >= 5) {
    //       this.color = '#F8A000'
    //   } else {
    //       this.color = '#FF0101'
    //   }
    // },
  },
  mounted() {
    axios.get('http://localhost/Call.php').then((res) => {
      this.currentPage = res.data.page;
      this.totalPages = res.data.total_pages;
      this.data = res.data;
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  },
};
</script>