import mutations from '@/store/mutations';
import userProfileApi from '@/api/userProfile';

const {
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
} = mutations;

const userProfile = {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  getters: {
    userProfile: ({ data }) => data,
    isLoadingUserProfile: ({ isLoading }) => isLoading,
    errorUserProfile: ({ error }) => error,
  },
  mutations: {
    [GET_USER_PROFILE_START](state) {
      state.isLoading = true;
      state.data = null;
    },
    [GET_USER_PROFILE_SUCCESS](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [GET_USER_PROFILE_FAILURE](state, error) {
      state.isLoading = false;
      state.error = error;
    },
  },
  actions: {
    getUserProfile({ commit }, { slug }) {
      commit(GET_USER_PROFILE_START);
      return new Promise((resolve) => {
        userProfileApi
          .getUserProfile(slug)
          .then((profile) => {
            commit(GET_USER_PROFILE_SUCCESS, profile);
            resolve(profile);
          })
          .catch(() => {
            commit(GET_USER_PROFILE_FAILURE);
          });
      });
    },
  },
};

export default userProfile;
