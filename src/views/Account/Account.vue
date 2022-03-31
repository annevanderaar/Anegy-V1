<template>
  <v-app>
    <AccountAppBar />
    <v-main></v-main>
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";

export default {
  name: "Account",
  components: {
    AccountAppBar,
  },
  data: () => ({
    //
  }),
};
</script>
