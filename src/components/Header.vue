<template>
  <Header class="ng-scope ng-isolate-scope">
    <nav class="navbar navbar-light">
      <div class="container">

        <router-link class="navbar-brand ng-binding" :to="{name: 'home'}">MediumClone</router-link>

        <template v-if="isLoggedIn">
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" active-class="active" class="nav-link" exact>
                Home
              </router-link>
            </li>

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
          </ul>
        </template>
        <template v-else>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link" active-class="active" exact>
                Home
              </router-link>
            </li>

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
          </ul>
        </template>

      </div>
    </nav>
  </Header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'McvHeader',
  computed: {
    ...mapGetters('authStore', ['isLoggedIn', 'currentUser']),
  },
};
</script>

<style scoped>

</style>
