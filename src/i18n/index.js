import Vue from 'vue';
import VueI18n from 'vue-i18n';

import locales from './locales';
import messages from './messages';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: locales.EN_US,
  messages: messages,
});

export default i18n;
