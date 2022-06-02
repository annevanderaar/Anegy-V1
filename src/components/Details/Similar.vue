<template>
  <div>
    <Cards :data="similar.results" :faves="faves" :watcheds="watcheds" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";

export default {
  props: ["similar"],
  components: {
    Cards,
  },
  data: () => ({
    faves: [],
    watcheds: [],
  }),
  methods: {
    getFave(id) {
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
  },
  mounted() {
    if (this.$session.exists()) {
      this.getFave(this.$session.get("id"));
      this.getWatched(this.$session.get("id"));
    }
  },
};
</script>
