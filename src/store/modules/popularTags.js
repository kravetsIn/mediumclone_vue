import mutations from '@/store/mutations';
import tagsApi from '@/api/popularTagsApi';

const {
  GET_TAGS_START,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
} = mutations;

const tagsStore = {
  namespaced: true,
  state: {
    tags: null,
    isLoading: false,
    error: null,
  },
  getters: {
    getTags: ({ tags }) => tags,
    isLoading: ({ isLoading }) => isLoading,
    error: ({ error }) => error,
  },
  mutations: {
    [GET_TAGS_START](state) {
      state.isLoading = true;
      state.tags = null;
    },
    [GET_TAGS_SUCCESS](state, payload) {
      state.isLoading = false;
      state.tags = payload;
    },
    [GET_TAGS_FAILURE](state, error) {
      state.isLoading = false;
      state.error = error;
    },
  },
  actions: {
    getPopularTags({ commit }) {
      commit(GET_TAGS_START);
      return new Promise((resolve) => {
        tagsApi.getPopularTags()
          .then((response) => {
            const { data: { tags } } = response;

            const notEmptyTags = tags.filter((tag) => {
              let isTag = false;
              [...tag].forEach((char) => { if (char !== '\u200c') isTag = true; });
              return isTag;
            });

            commit(GET_TAGS_SUCCESS, notEmptyTags);
            resolve(tags);
          })
          .catch((err) => {
            commit(GET_TAGS_FAILURE, err);
            console.log('ERROR: Get Tags Error', err);
          });
      });
    },
  },
};

export default tagsStore;
