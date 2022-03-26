<template>
  <section>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      style="max-height: 100%; width: 300px"
      fixed
      class="mt-16"
    >
      <v-container>
        <v-row>
          <v-col><h1 class="ml-2">Filter</h1></v-col>
          <v-btn class="ma-2" color="black" icon @click="closeFilter"
            ><v-icon>fas fa-times</v-icon></v-btn
          >
        </v-row>
        <v-divider></v-divider>
        <v-list-item :to="`/series/discover`" color="secondary" class="mt-2"
          ><v-icon class="mr-3" color="secondary">fas fa-random</v-icon>
          Discover</v-list-item
        >
        <v-list-item :to="`/series/trending`" color="secondary"
          ><v-icon class="mr-3" color="secondary">fas fa-fire</v-icon>
          Trending</v-list-item
        >
        <v-list-item :to="`/series/popular`" color="secondary"
          ><v-icon class="mr-3" color="secondary">fas fa-poll-h</v-icon>
          Popular</v-list-item
        >
        <v-list-item :to="`/series/playing`" color="secondary"
          ><v-icon class="mr-3" color="secondary">far fa-play-circle</v-icon
          >Playing</v-list-item
        >
        <v-list-item :to="`/series/top-rated`" color="secondary"
          ><v-icon class="mr-3" color="secondary">fas fa-star-of-life</v-icon
          >Top Rated</v-list-item
        >
        <v-list-item :to="`/series/upcoming`" color="secondary"
          ><v-icon class="mr-3" color="secondary">far fa-calendar-alt</v-icon
          >Upcoming</v-list-item
        >
        <v-list v-if="this.$route.path == '/series/discover'">
          <v-list-item-title><h1>Genres</h1></v-list-item-title>
          <v-divider></v-divider>
          <v-list-item
            @click="addGenre(genre.id)"
            v-for="genre in genres"
            :key="genre.id"
            >{{ genre.name }}</v-list-item
          >
        </v-list>
      </v-container>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviesFilters",
  data: () => ({
    genres: [
      { id: 10759, name: "Action & Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 10762, name: "Kids" },
      { id: 9648, name: "Mystery" },
      { id: 10763, name: "News" },
      { id: 10764, name: "Reality" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 10766, name: "Soap" },
      { id: 10767, name: "Talk" },
      { id: 10768, name: "War & Politics" },
      { id: 37, name: "Western" },
    ],
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    closeFilter() {
      this.setDrawerInput(false);
    },
    addGenre(id) {
      this.selectedGenres.push(id);
      console.log(this.selectedGenres);
    },
  },
  computed: {
    ...mapGetters(["drawer", "selectedGenres"]),
  },
};
</script>