<template>
  <v-app>
    <HomeAppBar @watched="watched" :currentSearchPage="currentSearchPage" />
    <v-main>
      <v-container fluid>
        <!-- <v-icon color="black" class="ml-4" style="position: fixed; top: 65px"
          >fas fa-arrow-up</v-icon
        >
        <v-icon
          color="black"
          class="ml-7"
          style="position: fixed; left: 37px; top: 65px"
          >fas fa-arrow-up</v-icon
        >
        <h3 class="ml-2" style="position: fixed; top: 90px">Click here!</h3> -->
        <h1 style="text-align: center">Anegy</h1>
        <h2 style="text-align: center">
          With Anegy you can discover all the movies and series ever made
        </h2>
        <v-row justify="center" v-if="!this.$session.exists()">
          <v-col>
            <v-card class="cards" elevation="4" outlined>
              <v-card-title style="text-align: center">First</v-card-title>
              <v-card-text style="text-align: center"
                >Make an account</v-card-text
              >
              <v-btn
                elevation="0"
                color="secondary"
                class="my-2"
                :to="`/create-account`"
                >Create account</v-btn
              >
            </v-card>
          </v-col>
          <v-col>
            <v-card class="cards" elevation="4" outlined>
              <v-card-title style="text-align: center">Second</v-card-title>
              <v-card-text style="text-align: center"
                >Add your favorites to your watch list.</v-card-text
              >
              <v-btn
                elevation="0"
                color="secondary"
                class="my-2"
                :to="`/movies/discover`"
                >Find favorites</v-btn
              >
            </v-card>
          </v-col>
          <v-col>
            <v-card class="cards" elevation="4" outlined>
              <v-card-title style="text-align: center">Third</v-card-title>
              <v-card-text style="text-align: center"
                >Cross of everything you have watched.</v-card-text
              >
              <v-btn
                elevation="0"
                color="secondary"
                class="my-2"
                :to="`/account/watched`"
                >Go to watchlist</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
        <h1 class="my-5" style="text-align: center">
          Today's Trending Movies &amp; Series
        </h1>
        <Cards
          :data="data"
          :faves="faves"
          :watcheds="watcheds"
          @refresh="refresh"
        />
        <v-pagination
          v-if="this.show == false"
          color="secondary"
          v-model="currentPage"
          :length="totalPages"
          :total-visible="10"
          class="my-4"
        ></v-pagination>
        <v-pagination
          v-if="this.show == true"
          color="secondary"
          v-model="currentSearchPage"
          :length="totalSearchPages"
          :total-visible="10"
          class="my-4"
        ></v-pagination>
      </v-container>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";
import Cards from "@/components/Cards.vue";
import axios from "axios";
import config from "@/config/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Homepage",
  components: {
    HomeAppBar,
    WebsiteFooter,
    Cards,
  },
  data: () => ({
    data: [],
    currentPage: 1,
    totalPages: 500,
    currentSearchPage: 1,
    totalSearchPages: 500,
    selectedGenres: [],
    faves: [],
    watcheds: [],
  }),
  computed: {
    ...mapGetters(["show"]),
  },
  methods: {
    ...mapActions(["setShow"]),
    getTrending(page, genres) {
      axios({
        method: "post",
        url: `${config.url}/Library/Discover.php`,
        data: {
          url: "/trending/all/day?",
          page: page,
          genres: encodeURI(genres.join(",")),
        },
      })
        .then((res) => {
          this.currentPage = res.data.page;
          if (res.data.total_pages <= 500) {
            this.totalPages = res.data.total_pages;
          }
          this.data = res.data.results;
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
    watched(data) {
      this.data = data.results;
      this.currentSearchPage = data.page;
      localStorage.currentSearchPage = this.currentSearchPage;
      if (data.total_pages <= 500) {
        this.totalSearchPages = data.total_pages;
      }
      if (data.errors) {
        this.currentPage = 1;
        this.currentSearchPage = 1;
        this.setShow(false);
        this.getTrending(this.currentPage, this.selectedGenres);
      }
    },
    refresh(val) {
      if (val == "add") {
        this.getFave(this.$session.get("id"));
        this.getWatched(this.$session.get("id"));
      }
    },
  },
  mounted() {
    if (localStorage.currentPage) {
      this.currentPage = parseInt(localStorage.currentPage);
    }
    this.getTrending(this.currentPage, this.selectedGenres);
    if (this.$session.exists()) {
      this.getFave(this.$session.get("id"));
      this.getWatched(this.$session.get("id"));
    }
    this.setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  watch: {
    currentPage(val) {
      localStorage.currentPage = val;
      this.getTrending(val, this.selectedGenres);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    currentSearchPage() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    show(val) {
      if (val == false) this.getTrending(this.currentPage, this.selectedGenres);
    },
  },
};
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
.display-4,
.display-3,
.display-2,
.display-1 {
  font-family: "Fredoka", sans-serif;
  margin: 8px;
}

.btnText {
  margin: 4px;
}

.filterBtn {
  position: fixed;
  margin: 4px;
  font-weight: 400;
}

.highlight {
  background-color: #23a9a7;
}

.cards {
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.movie {
  width: 300px;
  margin: 1rem;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.movie .v-img {
  width: 100%;
  height: 100%;
}

.overview {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  padding: 1rem;
  transform: translateY(101%);
  transition: transform 0.3s ease-in;
  overflow: auto;
}

.overview::-webkit-scrollbar {
  width: 10px;
}

.movie:hover .overview {
  transform: translateY(0);
}

.movie-info .v-avatar {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}

.serie {
  width: 300px;
  margin: 1rem;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.serie .v-img {
  width: 100%;
  height: 100%;
}

.serie:hover .overview {
  transform: translateY(0);
}

.serie-info .v-avatar {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}
</style>
