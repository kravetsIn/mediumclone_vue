<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <McvFeedItem v-for="(article, index) in feed" :key="index" :article="article"></McvFeedItem>
      <McvPagination :total="total" :limit="limit" :currentPage="currentPage" :url="url">
      </McvPagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import McvFeedItem from '@/components/Feed/FeedItem.vue';
import McvPagination from '@/components/Pagination.vue';

export default {
  name: 'McvFeed',
  components: {
    McvFeedItem,
    McvPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    total: 500,
    limit: 10,
    currentPage: 5,
    url: '/',
  }),
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
