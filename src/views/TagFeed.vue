<template>
  <div class="home-page ng-scope">

    <McvBanner></McvBanner>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
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

import { mapGetters } from 'vuex';

export default {
  name: 'McvYourFeed',
  components: {
    McvBanner,
    McvFeed,
    McvPopularTags,
  },
  computed: {
    ...mapGetters('authStore', ['isAnonymous']),
    apiUrl() {
      const tagName = this.$route.params.slug;
      return `/articles?tag=${tagName}`;
    },
  },
};
</script>

<style scoped>

</style>
