import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

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
    searchMulti() {
      axios
        .get("http://localhost/Library/Search.php" + 'spiderman')
        .then((res) => {
          //this.state.currentPage = res.data.page;
          //this.state.totalPages = res.data.total_pages;
          //this.state.data = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMovies() {
      axios
        .get("http://localhost/Library/Movies/Movies.php")
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
        .get("http://localhost/Library/Movies/MoviesPopular.php")
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
        .get("http://localhost/Library/Movies/MoviesPlaying.php")
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
        .get("http://localhost/Library/Movies/MoviesTopRated.php")
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
        .get("http://localhost/Library/Movies/MoviesUpcoming.php")
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
        .get("http://localhost/Library/Series/Series.php")
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
        .get("http://localhost/Library/Series/SeriesPopular.php")
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
        .get("http://localhost/Library/Series/SeriesTopRated.php")
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
        .get("http://localhost/Library/Series/SeriesAiring.php")
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
        .get("http://localhost/Library/Series/SeriesOnAir.php")
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