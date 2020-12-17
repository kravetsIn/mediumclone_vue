import mutations from '@/store/mutations';
import feedApi from '@/api/article';

const {
  GET_ARTICLE_START,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE,
  DELETE_ARTICLE_START,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
} = mutations;

const articleStore = {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  getters: {
    data: ({ data }) => data,
    isLoading: ({ isLoading }) => isLoading,
    error: ({ error }) => error,
  },
  mutations: {
    [GET_ARTICLE_START](state) {
      state.isLoading = true;
      state.data = null;
    },
    [GET_ARTICLE_SUCCESS](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [GET_ARTICLE_FAILURE](state) {
      state.isLoading = false;
    },
    [DELETE_ARTICLE_START]() {},
    [DELETE_ARTICLE_SUCCESS]() {},
    [DELETE_ARTICLE_FAILURE]() {},
  },
  actions: {
    getArticle({ commit }, { slug }) {
      commit(GET_ARTICLE_START);
      return new Promise((resolve) => {
        feedApi.getArticle(slug)
          .then((article) => {
            commit(GET_ARTICLE_SUCCESS, article);
            resolve(article);
          })
          .catch((err) => {
            commit(GET_ARTICLE_FAILURE);
            console.log('ERROR: Get Article Error', err);
          });
      });
    },
    deleteArticle({ commit }, { slug }) {
      commit(DELETE_ARTICLE_START);
      return new Promise((resolve) => {
        feedApi.deleteArticle(slug)
          .then(() => {
            commit(DELETE_ARTICLE_SUCCESS);
            resolve();
          })
          .catch((err) => {
            commit(DELETE_ARTICLE_FAILURE);
            console.log('ERROR: Get Article Error', err);
          });
      });
    },
  },
};

export default articleStore;
