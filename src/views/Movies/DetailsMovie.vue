<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid class="d-flex flex-row justify-center">
        <section>
          <div class="ma-10">
            <h1 class="titles">{{ data.title }}</h1>
            <h3 class="titles">{{ data.tagline }}</h3>
            <p class="titlesP">{{ data.overview }}</p>
            <div class="d-flex flex-row flex-start">
              <h4 class="titles">Release Date:</h4>
              <p class="titlesP">{{ data.release_date }}</p>
              <h4 class="titles">Runtime:</h4>
              <p class="titlesP">{{ data.runtime }} min</p>
              <h4 class="titles">Status:</h4>
              <p class="titlesP">{{ data.status }}</p>
              <h4 class="titles">Score:</h4>
              <p class="titlesP">{{ data.vote_average }}</p>
            </div>
          </div>
        </section>
        <section>
          <v-card class="ma-10">
            <v-img
              :src="`https://image.tmdb.org/t/p/w500${data.poster_path}`"
              :alt="`${data.title}`"
            ></v-img>
            <v-img
              v-if="data.poster_path == null"
              src="http://via.placeholder.com/1080x1580"
              :alt="`${data.title}`"
            ></v-img>
          </v-card>
        </section>
      </v-container>
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
    data: [],
  }),
  methods: {
    getDetails(id) {
      axios({
        method: "post",
        url: "http://localhost/Library/Details.php",
        data: {
          url: "/movie/",
          id: id,
        },
      })
        .then((res) => {
          this.data = res.data;
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