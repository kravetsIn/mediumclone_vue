import articleApi from '@/api/article';
import mutations from '@/store/mutations';

const {
  CREATE_ARTICLE_START,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
} = mutations;

const createArticle = {
  namespaced: true,
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  getters: {},
  mutations: {
    [CREATE_ARTICLE_START](state) {
      state.isSubmitting = true;
    },
    [CREATE_ARTICLE_SUCCESS](state) {
      state.isSubmitting = false;
    },
    [CREATE_ARTICLE_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    createArticle({ commit }, { articleInput }) {
      return new Promise((resolve) => {
        commit(CREATE_ARTICLE_START);

        articleApi.createArticle(articleInput)
          .then((article) => {
            resolve(article);
            commit(CREATE_ARTICLE_SUCCESS);
          })
          .catch((result) => {
            commit(CREATE_ARTICLE_FAILURE, result.response.data.errors);
          });
      });
    },
  },
};

export default createArticle;
