<template>
  <div>
    <McvLoading v-if="isLoading"></McvLoading>
    <McvErrorMessage v-if="error"></McvErrorMessage>

    <div v-if="feed">
      <McvFeedItem v-for="(article, index) in feed" :key="index" :article="article"></McvFeedItem>
      <McvPagination :total="articlesCount"
                     :limit="limit"
                     :currentPage="currentPage"
                     :url="baseUrl"
      >
      </McvPagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import McvFeedItem from '@/components/Feed/FeedItem.vue';
import McvPagination from '@/components/Pagination.vue';
import config from '@/config/index';
import { stringify, parseUrl } from 'query-string';
import McvLoading from '@/components/Loading.vue';
import McvErrorMessage from '@/components/ErrorMessage.vue';

const { paginationLimit } = config;

export default {
  name: 'McvFeed',
  components: {
    McvErrorMessage,
    McvLoading,
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
    limit: paginationLimit,
  }),
  computed: {
    ...mapGetters('feedStore', ['data', 'isLoading', 'error']),
    feed() {
      if (!this.data) return null;
      const { articles } = this.data;
      return articles;
    },
    articlesCount() {
      if (!this.data) return null;
      const { articlesCount } = this.data;
      return articlesCount;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * this.limit - this.limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    ...mapActions('feedStore', ['getFeed']),
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWidthParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.getFeed({ apiUrl: apiUrlWidthParams });
    },
  },
};
</script>

<style scoped>

</style>
