<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <!-- Hier komen de details van de film. De cast. trailers. en meer-->
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";

export default {
  name: "DetailsMovie",
  components: {
    HomeAppBar,
    WebsiteFooter,
  },
  data: () => ({}),
  methods: {},
  mounted() {},
};
</script>