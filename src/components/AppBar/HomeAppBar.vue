<template>
    <v-app-bar app color="primary">
      <a href="/"><v-img alt="Logo Anne's Movies and Series website" contain src="/Naamloos-1.png" transition="scale-transition" width="40px" height="40px"/></a>
      <h1>nne's Movies and Series Website</h1>
      <v-spacer></v-spacer>
      <v-btn icon color="accent"><v-icon>fas fa-search</v-icon></v-btn>
      <v-btn icon color="accent" @click="openAccount"><v-icon>fas fa-user-astronaut</v-icon></v-btn>
      <v-btn icon color="accent"><v-icon>fas fa-heart</v-icon></v-btn>
      <!-- <v-btn icon v-if="!$vuetify.theme.dark" @click="darkMode" color="accent"><v-icon>fas fa-moon</v-icon></v-btn>
      <v-btn icon v-else @click="darkMode" color="accent"><v-icon>fas fa-sun</v-icon></v-btn> -->
    </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  data: () => ({
    //
  }),
  methods: {
    openAccount() {
      this.$router.push({ path: `/account`})
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      //localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
};
</script>