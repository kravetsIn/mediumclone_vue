<template>
  <div v-if="userProfile" class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-nd-1">
            <img :src="userProfile.image" :alt="userProfile.username" class="user-img">
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link v-if="isCurrentUserProfile"
                           class="btn btn-sm btn-outline-secondary action-btn"
                           :to="{name: 'settings'}"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">

          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link class="nav-link"
                             :class="{active: routeName === 'userProfile'}"
                             :to="{name: 'userProfile', params: {slug: userProfile.username}}"
                >
                  My Post
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link"
                             :class="{active: routeName === 'userProfileFavorites'}"
                             :to="{name: 'userProfileFavorites',
                             params: {slug: userProfile.username}}"
                >
                  Favotites Posts
                </router-link>
              </li>
            </ul>
          </div>

          <McvFeed :apiUrl="apiUrl"></McvFeed>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import McvFeed from '@/components/Feed/Feed.vue';

export default {
  name: 'McvUserProfile',
  components: { McvFeed },
  computed: {
    ...mapGetters('userProfile', ['userProfile', 'errorUserProfile', 'isLoadingUserProfile']),
    ...mapGetters('authStore', ['currentUser']),
    isCurrentUserProfile() {
      if (!this.currentUser || this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      if (isFavorites) {
        return `/articles?favorited=${this.userProfileSlug}`;
      }
      return `/articles?author=${this.userProfileSlug}`;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },
  watch: {
    userProfileSlug() {
      this.fetchUserProfile();
    },
  },
  methods: {
    ...mapActions('userProfile', ['getUserProfile']),
    fetchUserProfile() {
      const { slug } = this.$route.params;
      this.getUserProfile({ slug });
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
};
</script>

<style scoped>

</style>
