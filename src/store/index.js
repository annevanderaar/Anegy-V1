import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

const API_KEY = "api_key=bcf92184fb403a95217a5f2d32a0a8df";
const BASE_URL = "https://api.themoviedb.org/3";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    currentPage: 1,
    totalPages: 100,
    data: [],
  },
  mutations: {
    setDrawerInput: (state, value) => (state.drawer = value),
  },
  actions: {
    setDrawerInput: ({ commit }, input) => commit('setDrawerInput', input),
    getMovies() {
      axios
        .get(BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPopularMovies() {
      axios
        .get(BASE_URL + "/movie/popular?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPlayingMovies() {
      axios
        .get(BASE_URL + "/movie/now_playing?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTopRatedMovies() {
      axios
        .get(BASE_URL + "/movie/top_rated?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUpcomingMovies() {
      axios
        .get(BASE_URL + "/movie/upcoming?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSeries() {
      axios
        .get(BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPopularSeries() {
      axios
        .get(BASE_URL + "/tv/popular?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTopRatedSeries() {
      axios
        .get(BASE_URL + "/tv/top_rated?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAiringSeries() {
      axios
        .get(BASE_URL + "/tv/airing_today?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOnAirSeries() {
      axios
        .get(BASE_URL + "/tv/on_the_air?" + API_KEY)
        .then((res) => {
          this.state.currentPage = res.data.page;
          this.state.totalPages = res.data.total_pages;
          this.state.data = res.data;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    drawer: (state) => state.drawer,
    data: (state) => state.data,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
  }
})