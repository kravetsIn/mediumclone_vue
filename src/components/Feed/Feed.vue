<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <McvFeedItem v-for="(article, index) in feed" :key="index" :article="article"></McvFeedItem>
      PAGINATION
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import McvFeedItem from '@/components/Feed/FeedItem.vue';

export default {
  name: 'McvFeed',
  components: { McvFeedItem },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('feedStore', ['data', 'isLoading', 'error']),
    feed() {
      if (!this.data) return null;
      const { articles } = this.data;
      return articles;
    },
  },
  methods: {
    ...mapActions('feedStore', ['getFeed']),

  },
  mounted() {
    this.getFeed({ apiUrl: this.apiUrl });
  },
};
</script>

<style scoped>

</style>
