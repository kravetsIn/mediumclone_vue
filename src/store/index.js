import Vue from 'vue';
import Vuex from 'vuex';
import authStore from '@/store/modules/auth';
import feedStore from '@/store/modules/feed';
import tagsStore from '@/store/modules/popularTags';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authStore,
    feedStore,
    tagsStore,
  },
});
