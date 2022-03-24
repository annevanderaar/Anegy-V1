<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-row class="mt-2 d-flex justify-center align-center flex-column">
        <h1 class="titles mr-4">Anegy</h1>
        <h2 class="titles">
          With Anegy you can discover all the movies and series ever made.
        </h2>
      </v-row>
      <v-container
        fluid
        class="mt-10 d-flex justify-center align-center flex-row"
      >
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title class="titles">First</v-card-title>
          <v-card-text class="titles">Make an account</v-card-text>
          <v-btn
            elevation="0"
            color="secondary"
            class="my-2"
            :to="`/create-account`"
            >Create account</v-btn
          >
        </v-card>
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title class="titles">Second</v-card-title>
          <v-card-text class="titles"
            >Add your favorites to your watch list.</v-card-text
          >
          <v-btn elevation="0" color="secondary" class="my-2" :to="`/movies`"
            >Find favorites</v-btn
          >
        </v-card>
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title class="titles">Third</v-card-title>
          <v-card-text class="titles"
            >Cross of everything you have watched.</v-card-text
          >
          <v-btn elevation="0" color="secondary" class="my-2" :to="`/account`"
            >Go to account</v-btn
          >
        </v-card>
      </v-container>
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

<style>
.cards {
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.movie {
  width: 300px;
  margin: 1rem;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.movie .v-img {
  width: 100%;
  height: 100%;
}

.overview {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  padding: 1rem;
  transform: translateY(101%);
  transition: transform 0.3s ease-in;
  overflow: auto;
}

.overview::-webkit-scrollbar {
  width: 10px;
}

.movie:hover .overview {
  transform: translateY(0);
}

.movie-info .v-avatar {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}

.serie {
  width: 300px;
  margin: 1rem;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.serie .v-img {
  width: 100%;
  height: 100%;
}

.serie:hover .overview {
  transform: translateY(0);
}

.serie-info .v-avatar {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}
</style>