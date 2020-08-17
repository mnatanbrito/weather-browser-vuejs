import { SELECT_LANGUAGE } from './actionTypes';
import i18n from '../../i18n';
import locales from '../../i18n/locales';

const settingsModule = {
  state: () => ({
    language: locales.EN_US,
  }),
  mutations: {
    [SELECT_LANGUAGE](state, language) {
      i18n.locale = language;

      state.language = language;

      return state;
    },
  },
  actions: {
    selectLanguage({ commit, state }, language) {
      if (state.language !== language) {
        commit(SELECT_LANGUAGE, language);
      }
    },
  },
};

export default settingsModule;
