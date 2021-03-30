<template>
  <header class="header">
    <BNavbar type="dark" class="navbar" variant="dark">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BNavForm>
          <BFormInput
            class="mr-sm-2 search-input"
            placeholder="Search"
            v-model="searchValue"
            debouce="500"
          ></BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  data: () => ({
    searchValue: "",
  }),
  watch: {
    // в watch можно объявить те сойства из объеута data, за которыми мы хотим наблюдать и при их изменении выполнять какие-либо действия
    searchValue: "onSearchValueChanged",
  },
  methods: {
    ...mapActions("movies", [
      "searchMovies",
      "fetchMovies",
      "toggleSearchState",
    ]), // fetchMovies для возврата фильмов после удаления текста в инпуте search
    onSearchValueChanged(val) {
      if (val) {
        //для возврата фильмов после удаления текста в инпуте search
        this.searchMovies(val); //для возврата фильмов после удаления текста в инпуте search
        this.toggleSearchState(true);
      } else {
        //для возврата фильмов после удаления текста в инпуте search
        this.fetchMovies(); //для возврата фильмов после удаления текста в инпуте search
        this.toggleSearchState(false);
      }
      this.searchMovies(val);
    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}
.navbar {
  background-color: rgba(
    0,
    0,
    0,
    0.7
  ) !important; /* bootstrap задает через important фон на navbar */
}
.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}
.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}
</style>