import Vue from 'vue';
import Vuex from 'vuex';
import authStore from '@/store/modules/auth';
import feedStore from '@/store/modules/feed';
import tagsStore from '@/store/modules/popularTags';
import articleStore from '@/store/modules/article';
import createArticle from '@/store/modules/createArticle';
import editArticle from '@/store/modules/editArticle';
import settings from '@/store/modules/settings';
import addToFavorites from '@/store/modules/addToFavorites';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authStore,
    feedStore,
    tagsStore,
    articleStore,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
  },
});
