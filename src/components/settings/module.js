import { SELECT_LANGUAGE } from './actionTypes';

import locales from '../../i18n/locales';

const settingsModule = {
  state: () => ({
    language: locales.EN,
  }),
  mutations: {
    [SELECT_LANGUAGE](state, language) {
      return {
        ...state,
        language,
      };
    },
  },
  actions: {
    selectLanguage({ commit, state }, language) {
      if (state.settings.language !== language) {
        commit(SELECT_LANGUAGE, language);
      }
    },
  },
};

export default settingsModule;
