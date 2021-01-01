<template>
  <button @click="handleLike"
          :class="classObject"
  >
    <i class="ion-heart"></i>
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'McvAddToFavorite',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  computed: {
    classObject() {
      return {
        btn: true,
        'btn-sm': true,
        'btn-primary': this.isFavoritedOptimistic,
        'btn-outline-primary': !this.isFavoritedOptimistic,
      };
    },
  },
  methods: {
    ...mapActions('addToFavorites', ['addToFavorites']),
    handleLike() {
      this.addToFavorites({ slug: this.articleSlug, isFavorited: this.isFavoritedOptimistic });

      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1;
      } else {
        this.favoritesCountOptimistic += 1;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>

<style scoped>

</style>
