<template>
  <div>
    <div v-if="isLoading">Loading tags...</div>
    <div v-if="error" class="post-preview">Something bad happened</div>

    <div v-if="tags" class="sidebar">
      <p>Popular Tags</p>

      <div class="tag-list">
        <router-link v-for="tag in tags"
                     :key="tag"
                     :to="{ name: 'tag', params: { slug: tag } }"
                     class="tag-default tag-pill"
        >
          {{ tag }}
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'McvPopularTags',
  computed: {
    ...mapGetters('tagsStore', ['getTags', 'isLoading', 'error']),
    tags() {
      if (!this.getTags) return null;
      return this.getTags;
    },
  },
  methods: {
    ...mapActions('tagsStore', ['getPopularTags']),
    fetchTags() {
      return this.getPopularTags();
    },
  },
  mounted() {
    this.fetchTags();
  },
};
</script>

<style scoped>

</style>
