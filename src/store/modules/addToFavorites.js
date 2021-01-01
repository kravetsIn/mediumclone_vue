import mutations from '@/store/mutations';
import addToFavoriteApi from '@/api/addToFavorite';

const {
  ADD_TO_FAVORITE_START,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
} = mutations;

const addToFavorites = {
  namespaced: true,
  mutations: {
    [ADD_TO_FAVORITE_START]() {},
    [ADD_TO_FAVORITE_SUCCESS]() {},
    [ADD_TO_FAVORITE_FAILURE]() {},
  },
  actions: {
    addToFavorites({ commit }, { slug, isFavorited }) {
      return new Promise((resolve) => {
        commit(ADD_TO_FAVORITE_START);
        const promise = isFavorited ? addToFavoriteApi.removeToFavorites(slug)
          : addToFavoriteApi.addToFavorites(slug);
        promise
          .then((article) => {
            commit(ADD_TO_FAVORITE_SUCCESS, article);
            resolve(article);
          })
          .catch(() => {
            commit(ADD_TO_FAVORITE_FAILURE);
          });
      });
    },
  },
};

export default addToFavorites;
