<template>
    <v-app>
        <HomeAppBar />
        <v-main>
          <v-btn @click="openFilter">Filter</v-btn>
          <Filters />

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

export default {
  name: 'Homepage',
  components: {
    HomeAppBar,
    Filters,
    WebsiteFooter,
  },
  data: () => ({
    currentPage: 1,
  }),
  methods: {
    ...mapActions(['setDrawerInput']),
    openFilter() {this.setDrawerInput(true)},
  },
  mounted() {
    //Hier doe je de request om de movies en series op te halen. En om ze te showen maybe?
  }
};
</script>