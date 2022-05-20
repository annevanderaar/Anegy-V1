<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container fluid>
        <h1>Your favorites</h1>
        <Cards :data="data.results" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";
import Cards from "@/components/Cards.vue";

export default {
  name: "Favorites",
  components: {
    AccountAppBar,
    Cards,
  },
  data: () => ({
    data: {},
  }),
  methods: {
    getFavorites() {
      console.log("favorites");
    },
  },
  mounted() {
    console.log("mounted");
  },
};
</script>
