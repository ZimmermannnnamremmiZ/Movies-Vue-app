import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import loader from "./modules/loader";

Vue.use(Vuex);

const store = new Vuex.Store({
  // инициализируется рутовая store общая
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loader,
  },
});

store.dispatch("initMoviesStore");

export default store;
