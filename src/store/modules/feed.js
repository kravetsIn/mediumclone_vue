import mutations from '@/store/mutations';
import feedApi from '@/api/feed';

const {
  GET_FEED_START,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
} = mutations;

const feedStore = {
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
    [GET_FEED_START](state) {
      state.isLoading = true;
      state.data = null;
    },
    [GET_FEED_SUCCESS](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [GET_FEED_FAILURE](state) {
      state.isLoading = false;
    },
  },
  actions: {
    getFeed({ commit }, { apiUrl }) {
      commit(GET_FEED_START);
      return new Promise((resolve) => {
        feedApi.getFeed(apiUrl)
          .then((response) => {
            const { data } = response;
            commit(GET_FEED_SUCCESS, data);
            resolve(data);
          })
          .catch((err) => {
            commit(GET_FEED_FAILURE);
            console.log('ERROR: Get Feed Error', err);
          });
      });
    },
  },
};

export default feedStore;
