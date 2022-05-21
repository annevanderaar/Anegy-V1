<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container fluid>
        <h1 style="text-align: center">Your favorites</h1>
        <Cards :data="data.results" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";

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
    getFavorites(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "fave",
          id: id,
        },
      })
        .then((res) => {
          //this.data = res.data[0];
          console.log(res.data);
          res.data.forEach((item) => {
            if (item.type == "movie") {
              console.log("movie");
            } else if (item.type == "serie") {
              console.log("serie");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getFavorites(this.$session.get("id"));
  },
};
</script>
