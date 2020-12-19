import articleApi from '@/api/article';
import mutations from '@/store/mutations';

const {
  EDIT_ARTICLE_START,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILURE,
  GET_EDITED_ARTICLE_START,
  GET_EDITED_ARTICLE_SUCCESS,
  GET_EDITED_ARTICLE_FAILURE,
} = mutations;

const editArticle = {
  namespaced: true,
  state: {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null,
  },
  getters: {},
  mutations: {
    [EDIT_ARTICLE_START](state) {
      state.isSubmitting = true;
    },
    [EDIT_ARTICLE_SUCCESS](state) {
      state.isSubmitting = false;
    },
    [EDIT_ARTICLE_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [GET_EDITED_ARTICLE_START](state) {
      state.isLoading = true;
    },
    [GET_EDITED_ARTICLE_SUCCESS](state, payload) {
      state.isLoading = false;
      state.article = payload;
    },
    [GET_EDITED_ARTICLE_FAILURE](state) {
      state.isLoading = false;
    },
  },
  actions: {
    updateArticle({ commit }, {
      slug,
      articleInput,
    }) {
      return new Promise((resolve) => {
        commit(EDIT_ARTICLE_START);

        articleApi
          .updateArticle(slug, articleInput)
          .then((article) => {
            resolve(article);
            commit(EDIT_ARTICLE_SUCCESS, article);
          })
          .catch((result) => {
            commit(EDIT_ARTICLE_FAILURE, result.response.data.errors);
          });
      });
    },
    getArticle({ commit }, { slug }) {
      return new Promise((resolve) => {
        commit(GET_EDITED_ARTICLE_START);

        articleApi
          .getArticle(slug)
          .then((article) => {
            resolve(article);
            commit(GET_EDITED_ARTICLE_SUCCESS, article);
          })
          .catch(() => {
            commit(GET_EDITED_ARTICLE_FAILURE);
          });
      });
    },
  },
};

export default editArticle;
