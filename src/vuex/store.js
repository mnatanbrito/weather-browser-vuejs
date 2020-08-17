import { createLogger } from 'vuex';

import { isDevelopment } from '../env';
import cities from '../components/city/module';
import settings from '../components/settings/module';

const createStore = (Vuex) => {
  const store = new Vuex.Store({
    modules: {
      cities,
      settings,
    },
    plugins: [isDevelopment() ? createLogger() : null],
  });

  return store;
};

export default createStore;
