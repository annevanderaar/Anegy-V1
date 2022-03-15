<template>
    <v-app-bar app color="secondary" clipped-left>
      <div>
        <v-btn icon class="white--text"><v-icon>fas fa-video</v-icon></v-btn>
        <v-btn icon class="white--text"><v-icon>fas fa-tv</v-icon></v-btn>
      </div>
      <v-spacer></v-spacer>
      <a class="ml-16" href="/"><v-img alt="Logo Anne's Movies and Series website" contain src="/Naamloos-1.png" transition="scale-transition" width="40px" height="40px"/></a>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon class="white--text"><v-icon>fas fa-search</v-icon></v-btn>
        <v-btn icon class="white--text" @click="openAccount"><v-icon>fas fa-user-astronaut</v-icon></v-btn>
        <v-btn icon class="white--text"><v-icon>fas fa-heart</v-icon></v-btn>
        <v-btn icon class="white--text" v-if="!$vuetify.theme.dark" @click="darkMode"><v-icon>fas fa-moon</v-icon></v-btn>
        <v-btn icon class="white--text" v-else @click="darkMode"><v-icon>fas fa-sun</v-icon></v-btn>
      </div>
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
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
};
</script>