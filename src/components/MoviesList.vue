<template>
  <div>
    <!-- теги Bootstrap -->
    <BContainer>
      <h3 class="list-title">IMDB Top 250</h3>
      <BRow>
        <template v-if="isExist">
          <!-- необходимо указать :key, т.к. Vue отслеживает, если элементы одинаковые, то он будет пытаться оптимизировать и убрать повторяющиеся элементы -->
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
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
    isExist() {
      // проверка, пустой ли объект (! проверки лучше выносить в computed, если они загромождают разметку)
      return Boolean(Object.keys(this.list).length);
    },
  },
  methods: {
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
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
