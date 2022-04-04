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
              <h1>{{ data.title }}</h1>
              <h3>{{ data.tagline }}</h3>
              <p>{{ data.overview }}</p>
            </v-col>
            <v-row>
              <h4>Release Date:</h4>
              <p>
                {{
                  new Date(data.release_date).toLocaleDateString("en-US", {
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
              <h4>
                Production
                {{
                  data.production_companies.length > 1
                    ? "Companies"
                    : "Company"
                }}:
              </h4>
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
              <h4>
                Production
                {{
                  data.production_countries.length > 1
                    ? "Countries"
                    : "Country"
                }}:
              </h4>
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
            <v-row v-if="this.providers.results.NL">
              <h4>Watch (NL):</h4>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.providers.results.NL.flatrate"
                :key="item.provider_id"
              >
                {{ item.provider_name }}
              </v-chip>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.providers.results.NL.buy"
                :key="item.provider_id"
              >
                {{ item.provider_name }}
              </v-chip>
              <v-chip
                class="btnText"
                outlined
                v-for="item in this.providers.results.NL.rent"
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
            <Cast v-if="this.val == 'cast'" :id="id" />
            <Crew v-else-if="this.val == 'crew'" :id="id" />
            <Collection v-else-if="this.val == 'collection'" :data="data" />
            <Videos v-else-if="this.val == 'videos'" :id="id" />
            <Reviews v-else-if="this.val == 'reviews'" :id="id" />
            <Similar v-else-if="this.val == 'similar'" :id="id" />
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
import config from "../Config/index.js";

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
    getProviders(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/movie/${id}/watch/providers`,
        },
      })
        .then((res) => {
          this.providers = res.data;
          //console.log(res.data.results);
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
          //console.log(this.links);
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
