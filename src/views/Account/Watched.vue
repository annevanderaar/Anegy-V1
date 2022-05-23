<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container fluid>
        <h1 style="text-align: center">Your watchlist</h1>
        <Cards :data="data" />
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
  name: "Watched",
  components: {
    AccountAppBar,
    Cards,
  },
  data: () => ({
    data: [],
  }),
  methods: {
    getWatched(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "watched",
          id: id,
        },
      })
        .then((res) => {
          res.data.forEach((item) => {
            if (item.type == "movie") {
              this.getDetails("movie", item.ms_id);
            } else if (item.type == "tv") {
              this.getDetails("tv", item.ms_id);
            } else if (item.type == "person") {
              this.getDetails("person", item.ms_id);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDetails(url, id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/${url}/${id}`,
        },
      })
        .then((res) => {
          this.data.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getWatched(this.$session.get("id"));
    this.data.splice(0);
  },
};
</script>
