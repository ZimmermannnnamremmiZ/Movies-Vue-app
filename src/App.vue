<template>
  <div id="app">
    <Loader />
    <PosterBg :poster="posterBg" />
    <!-- poster из PosterBg -->
    <Header />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
    <!-- props'ы пишутся через дефис -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBg from "@/components/PosterBg";
import MoviesPagination from "@/components/MoviesPagination";
import Loader from "@/components/Loader";
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Header,
  },
  data: () => ({
    posterBg: "", // чтобы передать в :poster в <PosterBg>
  }),
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "moviesLength",
    ]),
  },
  watch: {
    // watch позволяет следить за изменениями в каком-либо объекте
    "$route.query": {
      handler: "onPageQueryChange",
      immediate: true, // при загрузке так же отрабатывает watcher
      deep: true, // отслеживать внутренние изменения и реагировать на них
    },
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    },
    onChangePoster(poster) {
      this.posterBg = poster; // переопределяется при наведении на элемент
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } }); // теперь есть query параметры
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
