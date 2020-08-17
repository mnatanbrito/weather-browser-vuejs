import cities from '../components/city/module';
import settings from '../components/settings/module';

const createStore = (Vuex) => {
  const store = new Vuex.Store({
    modules: {
      cities,
      settings,
    },
  });

  return store;
};

export default createStore;
