<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid class="d-flex flex-column justify-center align-center">
        <h1 class="display-4">404</h1>
        <!-- make background of smiley transparent -->
        <v-img
          src="8-82835_sad-face-emoji-png-sad-face-emoji-transparent.png"
          width="300px"
        ></v-img>
        <h1>Page not found</h1>
        <h2>Return to <a href="/" class="secondary--text">home</a></h2>
      </v-container>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";

export default {
  name: "404",
  components: {
    HomeAppBar,
    WebsiteFooter,
  },
  data: () => ({}),
  methods: {},
  mounted() {},
};
</script>