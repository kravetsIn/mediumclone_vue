import mutations from '@/store/mutations';

const {
  UPDATE_CURRENT_USER_START,
  UPDATE_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_FAILURE,
} = mutations;

const settings = {
  namespaced: true,
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  getters: {
    getSettingsErrors: ({ validationErrors }) => validationErrors,
    isSubmittingSettings: ({ isSubmitting }) => isSubmitting,
  },
  mutations: {
    [UPDATE_CURRENT_USER_START](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [UPDATE_CURRENT_USER_SUCCESS](state) {
      state.isSubmitting = false;
    },
    [UPDATE_CURRENT_USER_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {},
};

export default settings;
