import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueToast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-default.css';
import 'bulma/css/bulma.min.css';

import router from './routes';
import createStore from './vuex/store';
import i18n from './i18n';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueToast);

new Vue({
  render: (h) => h(App),
  store: createStore(Vuex),
  router,
  i18n,
}).$mount('#app');
