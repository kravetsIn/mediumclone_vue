<template>
  <Header class="ng-scope ng-isolate-scope">
    <nav class="navbar navbar-light">
      <div class="container">

        <router-link class="navbar-brand ng-binding" :to="{name: 'globalFeed'}">
          MediumClone
        </router-link>

        <ul class="nav navbar-nav pull-xs-right">

          <li class="nav-item">
            <router-link :to="{name: 'globalFeed'}" active-class="active" class="nav-link" exact>
              Home
            </router-link>
          </li>

          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link :to="{name: 'createArticle'}" active-class="active" class="nav-link">
                <i class="ion-compose"></i>&nbsp;New Article
              </router-link>
            </li>

            <li class="nav-item">
              <router-link :to="{name: 'settings'}" active-class="active" class="nav-link">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link ng-binding"
                           active-class="active"
                           :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              >
                <img v-if="currentUser.image" :src="currentUser.image" class="user-pic" alt="">
                &nbsp;{{ currentUser.username }}
              </router-link>
            </li>
          </template>

          <template v-if="isAnonymous">
            <li class="nav-item">
              <router-link :to="{name: 'login'}" class="nav-link" active-class="active">
                Sign in
              </router-link>
            </li>

            <li class="nav-item">
              <router-link :to="{name: 'register'}" class="nav-link" active-class="active">
                Sign up
              </router-link>
            </li>
          </template>

        </ul>

      </div>
    </nav>
  </Header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'McvHeader',
  computed: {
    ...mapGetters('authStore', ['isLoggedIn', 'currentUser', 'isAnonymous']),
  },
};
</script>

<style scoped>

</style>
