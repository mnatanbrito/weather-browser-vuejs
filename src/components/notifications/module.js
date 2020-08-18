import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes';

const notificationsModule = {
  state: () => ({
    notification: null,
  }),
  mutations: {
    [SHOW_NOTIFICATION](state, notification) {
      state.notification = notification;

      return state;
    },
    [HIDE_NOTIFICATION](state) {
      state.notification = null;

      return state;
    },
  },
  actions: {
    showNotification({ commit }, { notificationType, message }) {
      commit(SHOW_NOTIFICATION, { notificationType, message });
    },
    hideNotification({ commit }) {
      commit(HIDE_NOTIFICATION);
    },
  },
  getters: {
    currentNotification: (state) => state.notification,
  },
};

export default notificationsModule;
