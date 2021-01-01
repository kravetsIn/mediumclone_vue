import mutations from '@/store/mutations';
import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  UPDATE_CURRENT_USER_START,
  UPDATE_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_FAILURE,
  LOGOUT,
} = mutations;

const authStore = {
  namespaced: true,
  state: {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    validationErrors: ({ validationErrors }) => validationErrors,
    currentUser: ({ currentUser }) => currentUser,
    isLoggedIn: ({ isLoggedIn }) => Boolean(isLoggedIn),
    isAnonymous: ({ isLoggedIn }) => (isLoggedIn === false),
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
    [LOGIN_START](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [LOGIN_SUCCESS](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [LOGIN_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [GET_CURRENT_USER_START](state) {
      state.isLoading = true;
    },
    [GET_CURRENT_USER_SUCCESS](state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [GET_CURRENT_USER_FAILURE](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    [UPDATE_CURRENT_USER_START]() {
    },
    [UPDATE_CURRENT_USER_SUCCESS](state, payload) {
      state.currentUser = payload;
    },
    [UPDATE_CURRENT_USER_FAILURE]() {
    },
    [LOGOUT](state) {
      state.currentUser = null;
      state.isLoggedIn = false;
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
    login({ commit }, credentials) {
      commit(LOGIN_START);

      return new Promise((resolve) => {
        authApi.login(credentials)
          .then((response) => {
            const { data: { user } } = response;
            setItem('accessToken', user.token);
            commit(REGISTER_SUCCESS, user);
            resolve();
          })
          .catch((result) => {
            const { response: { data: { errors } } } = result;
            commit(LOGIN_FAILURE, errors);
          });
      });
    },
    getCurrentUser({ commit }) {
      commit(GET_CURRENT_USER_START);

      return new Promise((resolve) => {
        authApi.getCurrentUser()
          .then((response) => {
            const { data: { user } } = response;
            commit(GET_CURRENT_USER_SUCCESS, user);
            resolve();
          })
          .catch(() => {
            commit(GET_CURRENT_USER_FAILURE);
          });
      });
    },
    updateCurrentUser({ commit }, { currentUserInput }) {
      commit(UPDATE_CURRENT_USER_START, null, { root: true });

      return new Promise((resolve) => {
        authApi.updateCurrentUser(currentUserInput)
          .then((user) => {
            commit(UPDATE_CURRENT_USER_SUCCESS, user, { root: true });
            resolve(user);
          })
          .catch((result) => {
            commit(UPDATE_CURRENT_USER_FAILURE, result.response.data.errors, { root: true });
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        setItem('accessToken', '');
        commit(LOGOUT);
        resolve();
      });
    },
  },
};

export default authStore;
