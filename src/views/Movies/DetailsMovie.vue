<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <!-- Hier komen de details van de film. De cast. trailers. en meer-->
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import axios from "axios";

export default {
  name: "DetailsMovie",
  components: {
    HomeAppBar,
    WebsiteFooter,
  },
  data: () => ({
    url: "/movie/",
  }),
  methods: {
    getDetails(id) {
      axios({
        method: "post",
        url: "http://localhost/Library/Details.php",
        data: {
          url: this.url,
          id: id,
        },
      })
        .then((res) => {
          //this.data = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDetails(this.$route.params.id);
  },
};
</script>