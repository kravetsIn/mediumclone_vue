<template>
  <div id="app">
    <McvHeader></McvHeader>
    <router-view/>
  </div>
</template>
<script>
import McvHeader from '@/components/Header.vue';
import { mapActions } from 'vuex';

export default {
  components: { McvHeader },
  methods: {
    ...mapActions('authStore', ['getCurrentUser']),
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>
