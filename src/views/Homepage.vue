<template>
    <v-app>
        <HomeAppBar />
        <v-main>
          <v-btn @click="openFilter">Filter</v-btn>
          <Filters />
          <div id="show">{{ this.data.results[0].overview }}</div>
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
  }),
  methods: {
    ...mapActions(['setDrawerInput']),
    openFilter() {this.setDrawerInput(true)},
  },
  mounted() {
    //Hier doe je de request om de movies en series op te halen. En om ze te showen maybe?
    axios.get('http://localhost/Call.php').then((res) => {
      console.log(res.data)
      this.currentPage = res.data.page;
      this.data = res.data;
    }).catch((err) => {
      console.log(err)
    })
  }
};
</script>