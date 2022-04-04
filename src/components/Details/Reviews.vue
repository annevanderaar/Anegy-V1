<template>
  <div>
    <h1>Reviews</h1>
  </div>
</template>

<script>
  import axios from "axios";
  import config from "@/Config/index.js";

  export default {
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
