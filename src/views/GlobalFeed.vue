<template>
  <div class="home-page ng-scope">

    <!-- Splash banner that only shows when not logged in -->
    <div v-if="!isAnonymous" class="banner">
      <div class="container">
        <h1 class="logo-font ng-binding">MediumClone</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

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
import { mapGetters } from 'vuex';

export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
    McvPopularTags,
  },
  data: () => ({
    apiUrl: '/articles',
  }),
  computed: {
    ...mapGetters('authStore', ['isAnonymous']),
  },
};
</script>

<style scoped>

</style>
