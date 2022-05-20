<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container fluid> <h1>Your watchlist</h1> </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";

export default {
  name: "Watched",
  components: {
    AccountAppBar,
  },
};
</script>
