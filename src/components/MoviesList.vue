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
            />
          </BCol>
        </template>
        <template>
          <div>Empty list</div>
        </template>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem";

export default {
  name: "MoviesList",
  props: {
    // через props дочерняя компонента получает данные от родительской
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    MovieItem,
  },
  computed: {
    ...mapGetters('movies', ['isSearch']),
    isExist() {
      // проверка, пустой ли объект (! проверки лучше выносить в computed, если они загромождают разметку)
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? "Search result" : "IMDB Top 250"
    }
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure remove ${title}?`
      );

      if (isConfirmed) {
        this.removeMovie(id);
      }
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
</style>
