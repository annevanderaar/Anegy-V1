<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container fluid>
        <h1 style="text-align: center">Your favorites</h1>
        <h3 style="text-align: center">You can add all your favorites here!</h3>
        <Cards
          :data="data"
          :faves="faves"
          :watcheds="watcheds"
          :path="this.$route.path"
          @refresh="refresh"
        />
      </v-container>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";

export default {
  name: "Favorites",
  components: {
    AccountAppBar,
    WebsiteFooter,
    Cards,
  },
  data: () => ({
    data: [],
    faves: [],
    watcheds: [],
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
          res.data.forEach((item) => {
            this.faves.push(item.ms_id);
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
            this.watcheds.push(item.ms_id);
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
    refresh(val) {
      if (val == "delete") {
        window.location.reload();
      }
    },
  },
  mounted() {
    this.getFavorites(this.$session.get("id"));
    this.getWatched(this.$session.get("id"));
    this.data.splice(0);
  },
};
</script>
