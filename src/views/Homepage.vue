<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <div class="d-flex justify-center">
        <h1 class="titles mr-4">Anegy</h1>
      </div>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";

export default {
  name: "Homepage",
  components: {
    HomeAppBar,
    WebsiteFooter,
  },
  data: () => ({}),
  methods: {},
  mounted() {},
};
</script>