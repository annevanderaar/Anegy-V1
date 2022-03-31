import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    selectedGenresMovie: [],
    selectedGenresSerie: [],
  },
  mutations: {
    setDrawerInput: (state, value) => (state.drawer = value),
  },
  actions: {
    setDrawerInput: ({ commit }, input) => commit("setDrawerInput", input),
  },
  getters: {
    drawer: (state) => state.drawer,
    selectedGenresMovie: (state) => state.selectedGenresMovie,
    selectedGenresSerie: (state) => state.selectedGenresSerie,
  },
});
