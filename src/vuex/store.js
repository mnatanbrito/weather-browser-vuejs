import { createLogger } from 'vuex';

import { isDevelopment } from '../env';
import cities from '../components/city/module';
import settings from '../components/settings/module';
import notifications from '../components/notifications/module';

const createStore = (Vuex) => {
  const plugins = [];
  if (isDevelopment()) {
    plugins.push(createLogger());
  }
  const store = new Vuex.Store({
    modules: {
      cities,
      settings,
      notifications,
    },
    plugins,
  });

  return store;
};

export default createStore;
