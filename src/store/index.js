import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    show: false,
  },
  mutations: {
    setDrawerInput: (state, value) => (state.drawer = value),
    setShow: (state, value) => (state.show = value),
  },
  actions: {
    setDrawerInput: ({ commit }, input) => commit("setDrawerInput", input),
    setShow: ({ commit }, input) => commit("setShow", input),
  },
  getters: {
    drawer: (state) => state.drawer,
    show: (state) => state.show,
  },
});
