<template>
  <div>
    <!-- теги Bootstrap -->
    <BContainer>
      <h3 class="list-title">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isExist">
          <!-- необходимо указать :key, т.к. Vue отслеживает, если элементы одинаковые, то он будет пытаться оптимизировать и убрать повторяющиеся элементы -->
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @removeItem="onRemoveItem"
              @showModal="onShowMovieInfo"
            />
          </BCol>
        </template>
        <template>
          <div>Empty list</div>
        </template>
      </BRow>
      <BModal
        body-class="movie-modal-body"
        :id="movieInfoModalID"
        size="xl"
        hide-footer
        hide-header
      >
        <MovieInfoModalContent
          :movie="selectedMovie"
          @closeModal="onCloseModal"
        />
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem";
import MovieInfoModalContent from "./MovieInfoModalContent";
export default {
  name: "MoviesList",
  props: {
    // через props дочерняя компонента получает данные от родительской
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalID: "movie-info",
    selectedMovieID: "",
  }),
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    isExist() {
      // проверка, пустой ли объект (! проверки лучше выносить в computed, если они загромождают разметку)
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? "Search result" : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
    },
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure remove ${title}?`
      );
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted successful",
          variant: "success",
          title: "Success",
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
    onCloseModal() {
      this.$bvModal.hide(this.movieInfoModalID);
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
}

@media screen and (max-width: 991.5px) {
  .col-3 {
    flex: 0 0 33%;
    max-width: 33%;
  }

  .list-title {
    font-size: 40px;
  }

  .movie-title {
    font-size: 2rem;
  }
}

@media screen and (max-width: 767.5px) {
  .col-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media screen and (max-width: 575.5px) {
  .col-3 {
    flex: 0 0 48%;
    max-width: 48.5%;
    padding: 0;
    margin-left: 1%;
    margin-right: 1%;
  }
}

@media screen and (max-width: 500px) {
  .movie-item {
    height: 330px;
  }

  .list-title {
    font-size: 30px;
  }
}

@media screen and (max-width: 469px) {
  .movie-item-controls {
    flex-direction: column;
  }
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
