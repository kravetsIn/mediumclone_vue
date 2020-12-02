import Vue from 'vue';
import Vuex from 'vuex';
import authStore from '@/store/modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authStore,
  },
});
