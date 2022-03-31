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
            <div class="d-flex flex-row justify-center">
              <h4 class="titles">Release Date:</h4>
              <p class="titlesP">{{ data.release_date }}</p>
              <h4 class="titles">Runtime:</h4>
              <p class="titlesP">{{ data.runtime }} min</p>
              <h4 class="titles">Status:</h4>
              <p class="titlesP">{{ data.status }}</p>
              <h4 class="titles">Score:</h4>
              <p class="titlesP">{{ data.vote_average }}</p>
            </div>
            <div class="d-flex flex-row justify-center align-center">
              <h4 class="titles">Genres:</h4>
              <v-btn
                v-for="item in data.genres"
                :key="item.id"
                small
                rounded
                outlined
                class="btnText"
                >{{ item.name }}</v-btn
              >
            </div>
          </div>
          <div style="width: 100%">
            <v-tabs>
              <v-tab v-for="tab in tabs" :key="tab.title"
                ><v-icon style="margin: 8px">{{ tab.icon }}</v-icon
                >{{ tab.title }}</v-tab
              >
            </v-tabs>
          </div>
        </section>
        <section>
          <v-card
            class="ma-10"
            :href="`https://image.tmdb.org/t/p/w500${data.poster_path}`"
            target="_blank"
          >
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
    tabs: [
      {
        title: "Info",
        icon: "mdi-information-variant",
      },
      {
        title: "Cast",
        icon: "mdi-account-box-multiple",
      },
      {
        title: "Crew",
        icon: "mdi-account-group",
      },
      {
        title: "Videos",
        icon: "mdi-filmstrip-box-multiple",
      },
      {
        title: "Reviews",
        icon: "mdi-android-messages",
      },
    ],
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
