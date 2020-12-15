<template>
  <div>{{ article }}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Article',
  computed: {
    ...mapGetters('articleStore', ['data']),
    article() {
      return this.data;
    },
  },
  methods: {
    ...mapActions('articleStore', ['getArticle']),
  },
  mounted() {
    this.getArticle({ slug: this.$route.params.slug });
  },
};
</script>

<style scoped>

</style>
