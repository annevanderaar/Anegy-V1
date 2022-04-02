<template>
  <div>
    <h2 v-if="data.belongs_to_collection == null">Not part of a collection</h2>
    <h2 v-else>{{ data.belongs_to_collection.name }}</h2>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../Config/index.js";

export default {
  props: ["data"],
  methods: {
    getDetails(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/movie/${id}`,
        },
      })
        .then((res) => {
          this.data = res.data;
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>