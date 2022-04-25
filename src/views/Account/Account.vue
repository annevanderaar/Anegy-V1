<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <h1>
        Welkom {{ data.naam }}. Dit is je account van Anegy. Hier kan je al je
        favoriete films en series opslaan. En je kan alles afstrepen wat je hebt
        gekeken.
      </h1>
    </v-main>
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";
import axios from "axios";
import config from "@/config/index.js";

export default {
  name: "Account",
  components: {
    AccountAppBar,
  },
  data: () => ({
    data: [],
  }),
  methods: {
    getAccount() {
      axios({
        method: "get",
        url: `${config.url}/Library/Account.php`,
      })
        .then((res) => {
          this.data = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAccount();
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
.display-4,
.display-3,
.display-2,
.display-1 {
  font-family: sans-serif;
  margin: 8px;
}
</style>
