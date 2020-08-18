<template>
    <section class="section">
      <div class="container">
        <div class="dashboard columns is-multiline is-vcentered">
          <div class="column is-12">
            <Logo />
          </div>
          <div class="column is-12">
            <div class="has-text-centered">
              <ApiStatus />
            </div>
          </div>
          <div class="column is-12">
            <InputField :value="searchTerm" :loading="isSearching" :placeholder="$t('citySearchInputPlaceholder')" maxLength="140" :onChange="onChange" :onSubmit="onSubmit" />
          </div>
          <div class="column is-12">
            <ResultsToggle />
          </div>
          <div class="column is-12">
            <SavedCities />
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

import Logo from '../shared/Logo'
import ApiStatus from '../city/ApiStatus'
import InputField from '../shared/InputField'
import ResultsToggle from '../city/ResultsToggle'
import SavedCities from '../city/SavedCities'

export default {
  name: 'Dashboard',
  components: {
      Logo,
      ApiStatus,
      InputField,
      ResultsToggle,
      SavedCities
  },
  computed: {
      ...mapState({
          isSearching: state => state.cities.isSearching
      })
  },
  data: () => ({
      searchTerm: ''
  }),
  methods: {
      onChange: function(ev) {
        this.searchTerm = ev.target.value;
      },
      onSubmit: function() {
        this.$store.dispatch('searchCityByName', this.searchTerm);
        this.searchTerm = '';
      }
  }
}
</script>