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
        <v-list-item :to="`/movies/discover`" color="secondary" class="mt-2"
          ><v-icon class="mr-3" color="secondary">fas fa-random</v-icon>
          Discover</v-list-item
        >
        <v-list-item :to="`/movies/trending`" color="secondary"
          ><v-icon class="mr-3" color="secondary">fas fa-fire</v-icon>
          Trending</v-list-item
        >
        <v-list-item :to="`/movies/popular`" color="secondary"
          ><v-icon class="mr-3" color="secondary">fas fa-poll-h</v-icon>
          Popular</v-list-item
        >
        <v-list-item :to="`/movies/playing`" color="secondary"
          ><v-icon class="mr-3" color="secondary">far fa-play-circle</v-icon
          >Playing</v-list-item
        >
        <v-list-item :to="`/movies/top-rated`" color="secondary"
          ><v-icon class="mr-3" color="secondary">fas fa-star-of-life</v-icon
          >Top Rated</v-list-item
        >
        <v-list-item :to="`/movies/upcoming`" color="secondary"
          ><v-icon class="mr-3" color="secondary">far fa-calendar-alt</v-icon
          >Upcoming</v-list-item
        >
        <v-list v-if="this.$route.path == '/movies/discover'">
          <v-list-item-group multiple>
            <v-list-item-title><h1>Genres</h1></v-list-item-title>
            <v-divider></v-divider>
            <v-list-item
              active-class="highlight"
              @click="addGenre(genre.id)"
              v-for="genre in genres"
              :key="genre.id"
              >{{ genre.name }}</v-list-item
            >
          </v-list-item-group>
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
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ],
  }),
  methods: {
    ...mapActions(["setDrawerInput"]),
    closeFilter() {
      this.setDrawerInput(false);
    },
    addGenre(id) {
      if (this.selectedGenresMovie.includes(id)) {
        let index = this.selectedGenresMovie.indexOf(id);
        this.selectedGenresMovie.splice(index, 1);
        console.log(this.selectedGenresMovie);
        //Vue.delete(this.selectedGenresMovie, index);
        this.setDrawerInput(false);
      }
      if (!this.selectedGenresMovie.includes(id)) {
        this.selectedGenresMovie.push(id);
        this.setDrawerInput(false);
      }
    },
  },
  computed: {
    ...mapGetters(["drawer", "selectedGenresMovie"]),
  },
  mounted() {
    this.selectedGenresMovie.splice(0);
  },
};
</script>
