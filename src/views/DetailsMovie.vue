<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid style="overflow: hidden">
        <v-row>
          <v-col class="d-flex justify-center" lg="4">
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
          <v-col lg="8">
            <v-row justify="end" class="mr-2 mt-2">
              <v-btn
                icon
                color="secondary"
                @click="deleteFave(data.id)"
                v-if="faves.includes(data.id)"
                x-large
                ><v-icon>fas fa-heart</v-icon></v-btn
              >
              <v-btn
                v-else
                icon
                color="secondary"
                @click="addFave(data.id)"
                x-large
                ><v-icon>far fa-heart</v-icon></v-btn
              >
              <v-btn
                icon
                color="accent"
                @click="deleteWatched(data.id)"
                v-if="watcheds.includes(data.id)"
                x-large
                ><v-icon>mdi-clipboard-list</v-icon></v-btn
              >
              <v-btn
                v-else
                icon
                color="accent"
                @click="addWatched(data.id)"
                x-large
                ><v-icon>mdi-clipboard-list-outline</v-icon></v-btn
              >
            </v-row>
            <v-col>
              <h1>{{ data.title }}</h1>
              <h3>{{ data.tagline }}</h3>
              <p>{{ data.overview }}</p>
            </v-col>
            <v-row>
              <h4>Release Date:</h4>
              <p>
                {{
                  new Date(data.release_date).toLocaleDateString("nl-NL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
                ({{ data.status }})
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
              <h4>Runtime:</h4>
              <p>{{ data.runtime }} min</p>
            </v-row>
            <v-row>
              <h4>Score:</h4>
              <v-avatar
                rounded
                height="36"
                color="green white--text"
                v-if="data.vote_average >= 7.5"
                >{{ data.vote_average.toFixed(1) }}</v-avatar
              >
              <v-avatar
                rounded
                height="36"
                color="orange white--text"
                v-else-if="data.vote_average >= 5"
                >{{ data.vote_average.toFixed(1) }}</v-avatar
              >
              <v-avatar rounded height="36" color="red white--text" v-else>{{
                data.vote_average.toFixed(1)
              }}</v-avatar>
            </v-row>
            <v-row>
              <h4>Budget:</h4>
              <p>${{ data.budget.toLocaleString() }}</p>
            </v-row>
            <v-row>
              <h4>Reveneu:</h4>
              <p>${{ data.revenue.toLocaleString() }}</p>
            </v-row>
            <v-row>
              <h4>Genres:</h4>
              <v-chip
                outlined
                v-for="item in data.genres"
                :key="item.id"
                rounded
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
              <h4>Production Companie(s)</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="companie in data.production_companies"
                :key="companie.id"
              >
                {{ companie.name }}
              </v-chip>
            </v-row>
            <v-row>
              <h4>Production Countrie(s)</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="country in data.production_countries"
                :key="country.iso_3166_1"
              >
                {{ country.iso_3166_1 }}
                | {{ country.name }}
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
          <v-col sm="12">
            <v-tabs
              v-if="this.$vuetify.breakpoint.xs"
              color="accent"
              icons-and-text
              center-active
              fixed-tabs
              centered
              hide-slider
              show-arrows
            >
              <v-tab v-for="tab in tabs" :key="tab.title" @click="show(tab.val)"
                >{{ tab.title }}<v-icon>{{ tab.icon }}</v-icon></v-tab
              >
            </v-tabs>
            <v-tabs
              v-else
              color="accent"
              icons-and-text
              center-active
              fixed-tabs
              centered
              hide-slider
            >
              <v-tab v-for="tab in tabs" :key="tab.title" @click="show(tab.val)"
                >{{ tab.title }}<v-icon>{{ tab.icon }}</v-icon></v-tab
              >
            </v-tabs>
            <Cast v-if="this.val == 'cast'" :credits="credits" />
            <Crew v-else-if="this.val == 'crew'" :credits="credits" />
            <Collection
              v-else-if="this.val == 'collection'"
              :collection="collection"
            />
            <Videos v-else-if="this.val == 'videos'" :videos="videos" />
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
import Cast from "@/components/Details/Cast.vue";
import Crew from "@/components/Details/Crew.vue";
import Collection from "@/components/Details/Collection.vue";
import Videos from "@/components/Details/Videos.vue";
import Reviews from "@/components/Details/Reviews.vue";
import Similar from "@/components/Details/Similar.vue";
import axios from "axios";
import config from "@/config/index.js";
import { mapActions } from "vuex";

export default {
  name: "DetailsMovie",
  components: {
    HomeAppBar,
    WebsiteFooter,
    Cast,
    Crew,
    Collection,
    Videos,
    Reviews,
    Similar,
  },
  data: () => ({
    id: null,
    val: "cast",
    data: [],
    providers: [],
    links: [],
    credits: [],
    similar: [],
    reviews: [],
    collection: [],
    videos: [],
    faves: [],
    watcheds: [],
    tabs: [
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
        title: "Collection",
        icon: "mdi-bookmark-box-multiple",
        val: "collection",
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
  metaInfo() {
    return {
      title:
        this.data.title +
        " " +
        new Date(this.data.release_date).toLocaleDateString("nl-NL", {
          year: "numeric",
        }) +
        " - Anegy",
    };
  },
  methods: {
    ...mapActions(["setShow"]),
    show(val) {
      this.val = val;
    },
    addFave(id) {
      if (!this.$session.exists()) {
        this.$toast.warning("You have to be loged in to add a favorite", {
          timeout: 3000,
        });
      } else {
        axios({
          method: "post",
          url: `${config.url}/Library/Account.php`,
          data: {
            param: "addFave",
            userid: this.$session.get("id"),
            msid: id,
            type: "movie",
          },
        })
          .then((res) => {
            if (res.data == "succes") {
              this.$toast.success("Successfully added favorite.", {
                timeout: 2000,
              });
              this.getFave(this.$session.get("id"));
            } else if (res.data == "error") {
              this.$toast.error("Something went wrong. Try again.", {
                timeout: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteFave(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "deleteFave",
          userid: this.$session.get("id"),
          msid: id,
        },
      })
        .then((res) => {
          if (res.data == "succes") {
            this.$toast.success("Successfully deleted favorite.", {
              timeout: 2000,
            });
            this.faves = [];
          } else if (res.data == "error") {
            this.$toast.error("Something went wrong. Try again.", {
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addWatched(id) {
      if (!this.$session.exists()) {
        this.$toast.warning("You have to be loged in to add to watchlist", {
          timeout: 3000,
        });
      } else {
        axios({
          method: "post",
          url: `${config.url}/Library/Account.php`,
          data: {
            param: "addWatched",
            userid: this.$session.get("id"),
            msid: id,
            type: "movie",
          },
        })
          .then((res) => {
            if (res.data == "succes") {
              this.$toast.success("Successfully added to watchlist.", {
                timeout: 2000,
              });
              this.getWatched(this.$session.get("id"));
            } else if (res.data == "error") {
              this.$toast.error("Something went wrong. Try again.", {
                timeout: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteWatched(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "deleteWatched",
          userid: this.$session.get("id"),
          msid: id,
        },
      })
        .then((res) => {
          if (res.data == "succes") {
            this.$toast.success("Successfully deleted from watchlist.", {
              timeout: 2000,
            });
            this.watcheds = [];
          } else if (res.data == "error") {
            this.$toast.error("Something went wrong. Try again.", {
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
          console.log(res.data);
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
          this.getCollection(res.data.belongs_to_collection.id);
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
          url: `/movie/${id}/watch/providers`,
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
          url: `/movie/${id}/external_ids`,
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
          url: `/movie/${id}/credits`,
        },
      })
        .then((res) => {
          this.credits = res.data;
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
          url: `/movie/${id}/similar`,
        },
      })
        .then((res) => {
          this.similar = res.data;
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
          url: `/movie/${id}/reviews`,
        },
      })
        .then((res) => {
          this.reviews = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCollection(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/collection/${id}`,
        },
      })
        .then((res) => {
          this.collection = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVideos(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/movie/${id}/videos`,
        },
      })
        .then((res) => {
          this.videos = res.data;
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
    this.id = this.$route.params.id;
    this.getDetails(this.$route.params.id);
    this.getProviders(this.$route.params.id);
    this.getLinks(this.$route.params.id);
    this.getCredits(this.$route.params.id);
    this.getSimilar(this.$route.params.id);
    this.getReviews(this.$route.params.id);
    this.getVideos(this.$route.params.id);
    this.setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getDetails(this.$route.params.id);
      this.getProviders(this.$route.params.id);
      this.getLinks(this.$route.params.id);
      this.getCredits(this.$route.params.id);
      this.getSimilar(this.$route.params.id);
      this.getReviews(this.$route.params.id);
      this.getVideos(this.$route.params.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.go(0);
    },
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
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
}
</style>
