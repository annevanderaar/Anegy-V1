<template>
  <section>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      style="max-height: 100%; width: 400px"
      absolute
    >
      <v-container>
        <v-row>
          <v-col><h1 class="ml-2">Filter</h1></v-col>
          <v-btn class="ma-2" color="black" icon @click="closeFilter"
            ><v-icon>fas fa-times</v-icon></v-btn
          >
        </v-row>
        <v-divider></v-divider>
        <v-list>
          <v-list-group color="secondary">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="'Sort By'"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item href="/movies/popular"
              ><v-icon class="mr-3" color="secondary">fas fa-fire</v-icon>
              Popular</v-list-item
            >
            <v-list-item href="/movies/playing"
              ><v-icon class="mr-3" color="secondary">far fa-play-circle</v-icon
              >Playing</v-list-item
            >
            <v-list-item href="/movies/top-rated"
              ><v-icon class="mr-3" color="secondary"
                >fas fa-star-of-life</v-icon
              >Top Rated</v-list-item
            >
            <v-list-item href="/movies/upcoming"
              ><v-icon class="mr-3" color="secondary"
                >far fa-calendar-alt</v-icon
              >Upcoming</v-list-item
            >
          </v-list-group>
        </v-list>
        <v-list>
          <v-list-group color="secondary">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="'Genres'"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item>Genres</v-list-item>
          </v-list-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviesFilters",
  data: () => ({}),
  methods: {
    ...mapActions(["setDrawerInput"]),
    closeFilter() {
      this.setDrawerInput(false);
    },
  },
  computed: {
    ...mapGetters(["drawer"]),
  },
};
</script>