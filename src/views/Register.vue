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
              <input class="form-control form-control-lg" type="text" placeholder="Username"/>
            </fieldset>

            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email"/>
            </fieldset>

            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password"/>
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign up
            </button>
          </form>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McvRegister',
  methods: {
    onSubmit(evt) {
      console.log('On Submit', evt);
    },
  },
};
</script>

<style scoped>

</style>
