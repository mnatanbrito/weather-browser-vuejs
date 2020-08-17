import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import createStore from './vuex/store';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: createStore(Vuex),
}).$mount('#app');
