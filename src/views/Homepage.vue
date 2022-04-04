<template>
  <v-app>
    <HomeAppBar @watched="watched" />
    <v-main>
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
      <!-- <h1 style="text-align: center">Anegy</h1>
      <h2 style="text-align: center">
        With Anegy you can discover all the movies and series ever made.
      </h2>
      <v-container fluid class="d-flex justify-center align-center flex-row">
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title style="text-align: center">First</v-card-title>
          <v-card-text style="text-align: center">Make an account</v-card-text>
          <v-btn
            elevation="0"
            color="secondary"
            class="my-2"
            :to="`/create-account`"
            >Create account</v-btn
          >
        </v-card>
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title style="text-align: center">Second</v-card-title>
          <v-card-text style="text-align: center"
            >Add your favorites to your watch list.</v-card-text
          >
          <v-btn elevation="0" color="secondary" class="my-2" :to="`/movies`"
            >Find favorites</v-btn
          >
        </v-card>
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title style="text-align: center">Third</v-card-title>
          <v-card-text style="text-align: center"
            >Cross of everything you have watched.</v-card-text
          >
          <v-btn elevation="0" color="secondary" class="my-2" :to="`/account`"
            >Go to account</v-btn
          >
        </v-card>
      </v-container> -->
      <v-container fluid>
        <h1 class="mb-5" style="text-align: center">
          Today's Trending Movies &amp; Series
        </h1>
        <cards :data="data" />
        <v-pagination
          color="secondary"
          v-model="currentPage"
          :length="totalPages"
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
import config from "@/Config/index.js";

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
    selectedGenres: [],
  }),
  methods: {
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
          this.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    watched(data) {
      // Todo: Fix page issue with search
      console.log(data);
      this.data = data;
      this.currentPage = data.page;
      if (data.total_pages <= 500) {
        this.totalPages = data.total_pages;
      }
      if (data.errors) {
        this.currentPage = 1;
        this.getTrending(this.currentPage, this.selectedGenres);
      }
    },
  },
  mounted() {
    this.getTrending(this.currentPage, this.selectedGenres);
  },
  watch: {
    currentPage(val) {
      this.getTrending(val, this.selectedGenres);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
  margin: 16px;
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
