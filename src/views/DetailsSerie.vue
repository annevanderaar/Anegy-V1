<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid style="overflow: auto">
        <v-row>
          <v-col class="d-flex justify-center align-center" md="4">
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
          <v-col md="8">
            <v-col>
              <h1>{{ data.name }}</h1>
              <h3>{{ data.tagline }}</h3>
              <p>{{ data.overview }}</p>
            </v-col>
            <v-row>
              <h4>First Air Date:</h4>
              <p>
                {{
                  new Date(data.first_air_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
                ({{ data.type }})
              </p>
            </v-row>
            <v-row>
              <h4>Last Air Date:</h4>
              <p>
                {{
                  new Date(data.last_air_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </p>
            </v-row>
            <v-row>
              <h4>Language:</h4>
              <v-avatar
                height="36"
                :color="
                  $vuetify.theme.dark ? 'grey darken-1' : 'grey lighten-3'
                "
                ><span class="text-uppercase">{{
                  data.original_language
                }}</span></v-avatar
              >
            </v-row>
            <v-row>
              <h4>Seasons:</h4>
              <v-avatar
                height="36"
                :color="
                  $vuetify.theme.dark ? 'grey darken-1' : 'grey lighten-3'
                "
                ><span>{{ data.number_of_seasons }}</span></v-avatar
              >
            </v-row>
            <v-row>
              <h4>Episodes:</h4>
              <v-avatar
                height="36"
                :color="
                  $vuetify.theme.dark ? 'grey darken-1' : 'grey lighten-3'
                "
                ><span>{{ data.number_of_episodes }}</span></v-avatar
              >
            </v-row>
            <v-row>
              <h4>Score:</h4>
              <v-avatar
                rounded
                height="36"
                color="green white--text"
                v-if="data.vote_average >= 7.5"
                >{{ data.vote_average }}</v-avatar
              >
              <v-avatar
                rounded
                height="36"
                color="orange white--text"
                v-else-if="data.vote_average >= 5"
                >{{ data.vote_average }}</v-avatar
              >
              <v-avatar rounded height="36" color="red white--text" v-else>{{
                data.vote_average
              }}</v-avatar>
            </v-row>
            <v-row>
              <h4>Genres:</h4>
              <v-chip
                v-for="item in data.genres"
                :key="item.id"
                rounded
                outlined
                class="btnText"
                >{{ item.name }}</v-chip
              >
            </v-row>
            <v-row>
              <h4>Links:</h4>
              <v-chip
                rounded
                outlined
                class="btnText"
                :href="`${data.homepage}`"
                target="_blank"
                v-if="data.homepage"
                ><v-icon>mdi-home-circle</v-icon></v-chip
              >
              <v-chip
                outlined
                rounded
                class="btnText"
                :href="`https://www.imdb.com/title/${links.imdb_id}`"
                target="_blank"
                v-if="links.imdb_id"
                ><v-icon>mdi-database</v-icon></v-chip
              >
              <v-chip
                outlined
                rounded
                class="btnText"
                :href="`https://twitter.com/${links.twitter_id}`"
                target="_blank"
                v-if="links.twitter_id"
                ><v-icon>mdi-twitter</v-icon></v-chip
              >
              <v-chip
                outlined
                rounded
                class="btnText"
                :href="`https://www.facebook.com/${links.facebook_id}`"
                target="_blank"
                v-if="links.facebook_id"
                ><v-icon>mdi-facebook</v-icon></v-chip
              >
              <v-chip
                outlined
                rounded
                class="btnText"
                :href="`https://www.instagram.com/${links.instagram_id}`"
                target="_blank"
                v-if="links.instagram_id"
                ><v-icon>mdi-instagram</v-icon></v-chip
              >
            </v-row>
            <v-row>
              <h4>Networks:</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.data.networks"
                :key="item.id"
                >{{ item.name }}
              </v-chip>
            </v-row>
            <v-row>
              <h4>Created By:</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.data.created_by"
                :key="item.id"
                >{{ item.name }}
              </v-chip>
            </v-row>
            <v-row v-if="this.providers">
              <h4>Watch (NL):</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.providers.flatrate"
                :key="item.provider_id"
              >
                {{ item.provider_name }}
              </v-chip>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.providers.buy"
                :key="item.provider_id"
              >
                {{ item.provider_name }}
              </v-chip>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.providers.rent"
                :key="item.provider_id"
              >
                {{ item.provider_name }}
              </v-chip>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.iLinks"
                :key="item.name"
                :href="item.to"
                target="_blank"
              >
                {{ item.name }}</v-chip
              >
            </v-row>
            <v-row v-else>
              <h4>Watch (NL):</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.iLinks"
                :key="item.name"
                :href="item.to"
                target="_blank"
              >
                {{ item.name }}</v-chip
              >
            </v-row>
          </v-col>
          <v-col md="12">
            <v-tabs
              color="accent"
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
            <Cast v-else-if="this.val == 'cast'" :credits="credits" />
            <Crew v-else-if="this.val == 'crew'" :credits="credits" />
            <Videos v-else-if="this.val == 'videos'" />
            <Reviews v-else-if="this.val == 'reviews'" :reviews="reviews" />
            <Similar v-else-if="this.val == 'similar'" :similar="similar" />
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
  import Similar from "@/components/Details/Similar.vue";
  import axios from "axios";
  import config from "@/Config/index.js";

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
      Similar,
    },
    data: () => ({
      id: null,
      val: "seasons",
      data: [],
      providers: [],
      links: [],
      credits: [],
      similar: [],
      reviews: [],
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
        {
          title: "Similar",
          icon: "mdi-approximately-equal-box",
          val: "similar",
        },
      ],
      iLinks: [
        {
          name: "123Movies",
          to: "https://0123movie.ru/",
        },
        {
          name: "Watch Series",
          to: "https://ww.watchseriesfree.co/",
        },
        {
          name: "Putlockers",
          to: "https://www.putlockers.tv/",
        },
      ],
    }),
    methods: {
      getDetails(id) {
        axios({
          method: "post",
          url: `${config.url}/Library/Details.php`,
          data: {
            url: `/tv/${id}`,
          },
        })
          .then((res) => {
            this.data = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getProviders(id) {
        axios({
          method: "post",
          url: `${config.url}/Library/Details.php`,
          data: {
            url: `/tv/${id}/watch/providers`,
          },
        })
          .then((res) => {
            this.providers = res.data.results.NL;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getLinks(id) {
        axios({
          method: "post",
          url: `${config.url}/Library/Details.php`,
          data: {
            url: `/tv/${id}/external_ids`,
          },
        })
          .then((res) => {
            this.links = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getCredits(id) {
        axios({
          method: "post",
          url: `${config.url}/Library/Details.php`,
          data: {
            url: `/tv/${id}/credits`,
          },
        })
          .then((res) => {
            this.credits = res.data;
            //console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getSimilar(id) {
        axios({
          method: "post",
          url: `${config.url}/Library/Details.php`,
          data: {
            url: `/tv/${id}/similar`,
          },
        })
          .then((res) => {
            this.similar = res.data;
            //console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getReviews(id) {
        axios({
          method: "post",
          url: `${config.url}/Library/Details.php`,
          data: {
            url: `/tv/${id}/reviews`,
          },
        })
          .then((res) => {
            this.reviews = res.data;
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
      this.id = this.$route.params.id;
      this.getDetails(this.$route.params.id);
      this.getProviders(this.$route.params.id);
      this.getLinks(this.$route.params.id);
      this.getCredits(this.$route.params.id);
      this.getSimilar(this.$route.params.id);
      this.getReviews(this.$route.params.id);
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