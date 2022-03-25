<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid class="d-flex flex-column justify-center align-center">
        <h1 class="display-4">404</h1>
        <h1>Page not found</h1>
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