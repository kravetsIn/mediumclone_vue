<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">

          <h1 class="text-xs-center">Your Settings</h1>

          <McvValidationErrors v-if="getSettingsErrors" :validationErrors="getSettingsErrors"/>

          <form @submit.prevent="onSubmit">
            <fieldset>

              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       placeholder="URL of profile picture"
                       v-model="form.image"
                >
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       placeholder="Username"
                       v-model="form.username"
                >
              </fieldset>

              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          placeholder="Short bio about you"
                          v-model="form.bio"
                >
                </textarea>
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="email"
                       placeholder="Email"
                       v-model="form.email"
                >
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       placeholder="New Password"
                       v-model="form.password"
                >
              </fieldset>

              <button class="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                      :disabled="isSubmittingSettings"
              >
                Update Settings
              </button>

            </fieldset>
          </form>

          <hr>

          <button class="btn btn-outline-danger"
                  @click="logoutUser"
          >
            Or click here to logout.
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors.vue';

export default {
  name: 'McvSettings',
  components: { McvValidationErrors },
  computed: {
    ...mapGetters('settings', ['getSettingsErrors', 'isSubmittingSettings']),
    ...mapGetters('authStore', ['currentUser']),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: '',
      };
    },
  },
  methods: {
    ...mapActions('authStore', ['updateCurrentUser', 'logout']),
    onSubmit() {
      console.log('on submit');
      this.updateCurrentUser({ currentUserInput: this.form });
    },
    logoutUser() {
      console.log('logout');
      this.logout().then(() => {
        this.$router.push({ name: 'globalFeed' });
      });
    },
  },
};
</script>

<style scoped>

</style>
