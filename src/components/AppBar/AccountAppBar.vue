<template>
  <v-app-bar app color="secondary" clipped-left>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          :to="`/movies/discover`"
          ><v-icon>mdi-movie-open</v-icon></v-btn
        >
      </template>
      <span>Movies Discover</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          :to="`/series/discover`"
          ><v-icon>mdi-television-classic</v-icon></v-btn
        >
      </template>
      <span>Series Discover</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-btn plain depressed icon :to="`/`">
      <v-img
        alt="Logo Anegy"
        contain
        src="/Anegy-logo.png"
        transition="scale-transition"
        width="40px"
        height="40px"
      ></v-img>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon class="white--text"><v-icon>fas fa-heart</v-icon></v-btn>
    <v-btn
      icon
      class="white--text"
      v-if="!$vuetify.theme.dark"
      @click="darkMode"
      ><v-icon>fas fa-moon</v-icon></v-btn
    >
    <v-btn icon class="white--text" v-else @click="darkMode"
      ><v-icon>fas fa-sun</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    //
  }),
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
  },
};
</script>
