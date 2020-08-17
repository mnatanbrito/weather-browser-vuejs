<template>
    <div>
    <p class="is-size-3-mobile is-size-1-tablet has-text-centered">
        <span class="is-inline has-text-grey-light">Weather</span>&nbsp;
        <span class="is-inline has-text-grey">Browser</span>
      </p>
      <p class="has-text-centered">
        <img
          :src="usaFlag"
          :alt="$t('englishVersion')"
          :title="$t('englishVersion')"
          :class="'clickable ' +  usaFlagBackground"
          :style="{width: '32px', height: '20px', padding: usaFlagPadding + 'px'}"
          @click="changeToEnglish"
        />
        &nbsp; &nbsp;
        <img
          :src="brazilFlag"
          :alt="$t('portugueseVersion')"
          :title="$t('portugueseVersion')"
          :class="'clickable ' +  brazilFlagBackground"
          :style="{width: '32px', height: '20px', padding: brazilFlagPadding + 'px'}"
          @click="changeToPortuguese"
        />
      </p>

      </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import locales from '../../i18n/locales'
import usaFlag from  '../../assets/icons/usa-flag.png'
import brazilFlag from  '../../assets/icons/brazil-flag.png'
export default {
  name: 'Logo',
  data: () => ({
      usaFlag,
      brazilFlag,
  }),
  computed: {
      ...mapState({
          settings: state => state.settings,
          usaFlagBackground: state=> `${state.settings.language === locales.EN_US ? 'has-background-grey-lighter' : ''}`,
          usaFlagPadding: state=> state.settings.language === locales.EN_US ? 3 : 0,
          brazilFlagBackground: state=> `${state.settings.language === locales.PT_BR ? 'has-background-grey-lighter' : ''}`,
          brazilFlagPadding: state=> state.settings.language === locales.PT_BR ? 3 : 0,
      }),
  },
  actions: {
      ...mapActions({
        //   changeLanguage: ({ store }, language) => {
        //       store.commit('selectLanguage', language)
        //   }
      })
  },
  methods: {
      changeToEnglish: function() {
          this.$store.dispatch('selectLanguage', locales.EN_US)
      },
      changeToPortuguese: function() {
          this.$store.dispatch('selectLanguage', locales.PT_BR)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
