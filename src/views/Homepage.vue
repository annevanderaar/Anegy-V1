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
      <!-- <h1 class="titles mr-4">Anegy</h1>
      <h2 class="titles">
        With Anegy you can discover all the movies and series ever made.
      </h2> -->
      <!-- <v-container fluid class="d-flex justify-center align-center flex-row">
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title class="titles">First</v-card-title>
          <v-card-text class="titles">Make an account</v-card-text>
          <v-btn
            elevation="0"
            color="secondary"
            class="my-2"
            :to="`/create-account`"
            >Create account</v-btn
          >
        </v-card>
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title class="titles">Second</v-card-title>
          <v-card-text class="titles"
            >Add your favorites to your watch list.</v-card-text
          >
          <v-btn elevation="0" color="secondary" class="my-2" :to="`/movies`"
            >Find favorites</v-btn
          >
        </v-card>
        <v-card class="cards" elevation="4" outlined width="100%">
          <v-card-title class="titles">Third</v-card-title>
          <v-card-text class="titles"
            >Cross of everything you have watched.</v-card-text
          >
          <v-btn elevation="0" color="secondary" class="my-2" :to="`/account`"
            >Go to account</v-btn
          >
        </v-card>
      </v-container> -->
      <v-container fluid>
        <h1 class="titles mb-5">Today's Trending Movies &amp; Series</h1>
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
        url: "http://localhost/Library/Discover.php",
        data: {
          url: "/trending/all/day?",
          page: page,
          genres: encodeURI(genres.join(",")),
        },
      })
        .then((res) => {
          this.currentPage = res.data.page;
          //this.totalPages = res.data.total_pages;
          this.data = res.data;
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    watched(data) {
      //console.log(data)
      this.data = data;
      this.currentPage = data.page;
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
.display-4 {
  font-family: "Fredoka", sans-serif;
}

.titles {
  font-family: "Fredoka", sans-serif;
  font-weight: 700;
  margin: 14px;
  text-align: center;
}

.titlesP {
  font-family: "Fredoka", sans-serif;
  font-weight: 400;
  margin: 14px;
  text-align: center;
}

.btnText {
  font-family: "Fredoka", sans-serif;
  font-weight: 400;
  padding: 8px;
  margin: 8px;
}

.filterBtn {
  position: fixed;
  margin: 16px;
}

.highlight {
  background-color: #f32b2b;
}

.cards {
  margin: 8px;
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
