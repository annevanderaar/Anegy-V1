<template>
  <div>
    <v-btn-toggle mandatory tile group color="accent" v-model="values">
      <v-btn>Cast</v-btn>
      <v-btn>Crew</v-btn>
    </v-btn-toggle>
    <Cards
      v-if="this.value == 'cast'"
      :data="personSeries.cast"
      :faves="faves"
      :watcheds="watcheds"
    />
    <Cards
      v-if="this.value == 'crew'"
      :data="personSeries.crew"
      :faves="faves"
      :watcheds="watcheds"
    />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";

export default {
  data: () => ({
    value: "",
    values: "",
    faves: [],
    watcheds: [],
  }),
  props: ["personSeries"],
  components: {
    Cards,
  },
  watch: {
    values(val) {
      if (val == 0) {
        this.value = "cast";
      }
      if (val == 1) {
        this.value = "crew";
      }
    },
  },
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