<template>
  <v-app>
    <HomeAppBar />
    <v-main>
      <v-container fluid style="overflow: auto">
        <v-row>
          <v-col class="d-flex justify-center" md="4">
            <v-card
              max-width="450px"
              max-height="700px"
              class="ma-10"
              :href="`https://image.tmdb.org/t/p/w500${data.profile_path}`"
              target="_blank"
            >
              <v-img
                max-width="450px"
                max-height="700px"
                :src="`https://image.tmdb.org/t/p/w500${data.profile_path}`"
                :alt="`${data.title}`"
              ></v-img>
              <v-img
                max-width="450px"
                max-height="700px"
                v-if="data.profile_path == null"
                src="http://via.placeholder.com/1080x1580"
                :alt="`${data.title}`"
              ></v-img>
            </v-card>
          </v-col>
          <v-col md="8">
            <v-col>
              <h1>{{ data.name }}</h1>
              <h3>{{ data.known_for_department }}</h3>
              <p>{{ data.biography }}</p>
            </v-col>
            <v-row>
              <h4>Date of Birth:</h4>
              <p>
                {{
                  new Date(data.birthday).toLocaleDateString("nl-NL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </p>
            </v-row>
            <v-row v-if="data.deathday">
              <h4>Date of Death:</h4>
              <p>
                {{
                  new Date(data.birthday).toLocaleDateString("nl-NL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </p>
            </v-row>
            <v-row>
              <h4>Age:</h4>
              <p>{{ this.getAge(data.birthday) }}</p>
            </v-row>
            <v-row>
              <h4>Place of Birth:</h4>
              <p>{{ data.place_of_birth }}</p>
            </v-row>
            <v-row>
              <h4>Gender:</h4>
              <p v-if="data.gender == 1">Female</p>
              <p v-if="data.gender == 2">Male</p>
            </v-row>
            <v-row>
              <h4>Known for:</h4>
              <p>{{ data.known_for_department }}</p>
            </v-row>
            <v-row>
              <h4>Links:</h4>
              <v-chip
                outlined
                rounded
                class="btnText"
                :href="`https://www.imdb.com/name/${links.imdb_id}`"
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
            <PersonMovies
              v-if="this.val == 'movies'"
              :personMovies="personMovies"
            />
            <PersonSeries
              v-if="this.val == 'series'"
              :personSeries="personSeries"
            />
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
import PersonMovies from "@/components/Details/PersonMovies.vue";
import PersonSeries from "@/components/Details/PersonSeries.vue";
import axios from "axios";
import config from "@/Config/index.js";

export default {
  components: {
    HomeAppBar,
    WebsiteFooter,
    PersonMovies,
    PersonSeries,
  },
  data: () => ({
    val: "movies",
    data: [],
    links: [],
    personSeries: [],
    personMovies: [],
    tabs: [
      {
        title: "Movies",
        icon: "mdi-movie-open",
        val: "movies",
      },
      {
        title: "Series",
        icon: "mdi-television-classic",
        val: "series",
      },
    ],
  }),
  methods: {
    show(val) {
      this.val = val;
    },
    getDetails(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/person/${id}`,
        },
      })
        .then((res) => {
          this.data = res.data;
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
          url: `/person/${id}/external_ids`,
        },
      })
        .then((res) => {
          this.links = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    getPersonMovies(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/person/${id}/movie_credits`,
        },
      })
        .then((res) => {
          this.personMovies = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPersonSeries(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Details.php`,
        data: {
          url: `/person/${id}/tv_credits`,
        },
      })
        .then((res) => {
          this.personSeries = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDetails(this.$route.params.id);
    this.getLinks(this.$route.params.id);
    this.getPersonMovies(this.$route.params.id);
    this.getPersonSeries(this.$route.params.id);
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
</style>
