<template>
  <div class="home-page ng-scope">

    <McvBanner></McvBanner>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <McvFeedToggler></McvFeedToggler>
          <McvFeed :apiUrl="apiUrl"></McvFeed>
        </div>

        <div class="col-md-3">
          <McvPopularTags></McvPopularTags>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed/Feed.vue';
import McvPopularTags from '@/components/PopularTags.vue';
import McvBanner from '@/components/Banner.vue';
import McvFeedToggler from '@/components/FeedToggler.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'McvYourFeed',
  components: {
    McvFeedToggler,
    McvBanner,
    McvFeed,
    McvPopularTags,
  },
  data: () => ({
    apiUrl: '/articles/feed',
  }),
  computed: {
    ...mapGetters('authStore', ['isAnonymous']),
  },
};
</script>

<style scoped>

</style>
