import mutations from '@/store/mutations';
import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE } = mutations;

const authStore = {
  namespaced: true,
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
  },
  mutations: {
    [REGISTER_START](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [REGISTER_SUCCESS](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [REGISTER_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    register({ commit }, credentials) {
      commit(REGISTER_START);

      return new Promise((resolve) => {
        authApi.register(credentials)
          .then((response) => {
            const { data: { user } } = response;
            setItem('accessToken', user.token);
            commit(REGISTER_SUCCESS, user);
            resolve();
          })
          .catch((result) => {
            const { response: { data: { errors } } } = result;
            commit(REGISTER_FAILURE, errors);
          });
      });
    },
  },
};

export default authStore;
