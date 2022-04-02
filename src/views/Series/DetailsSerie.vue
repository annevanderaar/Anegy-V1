<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid style="overflow: auto">
        <v-row justify="center">
          <v-col>
            <v-card
              max-width="450px"
              max-height="700px"
              class="ma-10"
              :href="`https://image.tmdb.org/t/p/w500${data.poster_path}`"
              target="_blank"
            >
              <v-img
                max-width="450px"
                max-height="700px"
                :src="`https://image.tmdb.org/t/p/w500${data.poster_path}`"
                :alt="`${data.title}`"
              ></v-img>
              <v-img
                max-width="450px"
                max-height="700px"
                v-if="data.poster_path == null"
                src="http://via.placeholder.com/1080x1580"
                :alt="`${data.title}`"
              ></v-img>
            </v-card>
          </v-col>
          <v-col>
            <h1>{{ data.name }}</h1>
            <h3>{{ data.tagline }}</h3>
            <p>{{ data.overview }}</p>
            <div class="flexs">
              <h4>First Air Date:</h4>
              <p>{{ data.first_air_date }}</p>
            </div>
            <div class="flexs">
              <h4>Last Air Date:</h4>
              <p>{{ data.last_air_date }}</p>
            </div>
            <div class="flexs">
              <h4>Score:</h4>
              <p>{{ data.vote_average }}</p>
            </div>
            <div class="flexs">
              <h4>Genres:</h4>
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
          </v-col>
          <v-col>
            <v-tabs
              color="secondary"
              icons-and-text
              center-active
              fixed-tabs
              centered
            >
              <v-tab v-for="tab in tabs" :key="tab.title" @click="show(tab.val)"
                >{{ tab.title }}<v-icon>{{ tab.icon }}</v-icon></v-tab
              >
            </v-tabs>
            <Seasons v-if="this.val == 'seasons'" />
            <Cast v-else-if="this.val == 'cast'" />
            <Crew v-else-if="this.val == 'crew'" />
            <Videos v-else-if="this.val == 'videos'" />
            <Reviews v-else-if="this.val == 'reviews'" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Seasons from "@/components/Details/Seasons.vue";
import Cast from "@/components/Details/Cast.vue";
import Crew from "@/components/Details/Crew.vue";
import Videos from "@/components/Details/Videos.vue";
import Reviews from "@/components/Details/Reviews.vue";
import axios from "axios";
import config from "../../Config/index.js";

export default {
  name: "DetailsSerie",
  components: {
    HomeAppBar,
    WebsiteFooter,
    Seasons,
    Cast,
    Crew,
    Videos,
    Reviews,
  },
  data: () => ({
    val: "seasons",
    data: [],
    tabs: [
      {
        title: "Seasons",
        icon: "mdi-cards-variant",
        val: "seasons",
      },
      {
        title: "Cast",
        icon: "mdi-account-box-multiple",
        val: "cast",
      },
      {
        title: "Crew",
        icon: "mdi-account-group",
        val: "crew",
      },
      {
        title: "Videos",
        icon: "mdi-filmstrip-box-multiple",
        val: "videos",
      },
      {
        title: "Reviews",
        icon: "mdi-android-messages",
        val: "reviews",
      },
    ],
  }),
  methods: {
    getDetails(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: "/tv/",
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
    show(val) {
      this.val = val;
    },
  },
  mounted() {
    this.getDetails(this.$route.params.id);
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
p {
  text-align: center;
}
.flexs {
  display: flex;
  flex-direction: row;
}
</style>
