<template>
  <div class="auth-page ng-scope">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">

          <h1 class="text-xs-center ng-binding">Sign up</h1>

          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Have an account?</router-link>
          </p>
          <!-- Validation Errors-->
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Username"
                     v-model="username"
              />
            </fieldset>

            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="email"
                     placeholder="Email"
                     v-model="email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     v-model="password"
              />
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    :disabled="isSubmit"
            >
              Sign up
            </button>
          </form>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'McvRegister',
  data: () => ({
    email: '',
    password: '',
    username: '',
  }),
  computed: {
    ...mapGetters('authStore', ['isSubmitting']),
    isSubmit() {
      return this.isSubmitting;
    },
  },
  methods: {
    ...mapActions('authStore', ['register']),
    onSubmit(evt) {
      console.log('On Submit', evt);
      this.register({
        email: this.email,
        username: this.username,
        password: this.password,
      })
        .then(() => { this.$router.push({ name: 'home' }); });
    },
  },
};
</script>

<style scoped>

</style>
