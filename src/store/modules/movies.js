import IDs from '@/store/mock/imdb_top250';
import axios from "@/plugins/axios";

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage:  12,
    currentPage: 1
  },
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies(context) {
      console.log(context);
      const responce = await axios.get("/", {
        params: {
          i: "tt0111161",
        },
      });
      console.log(responce);
    },
  },
};

export default moviesStore;
