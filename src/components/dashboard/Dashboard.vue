<template>
    <section className="section">
      <div className="container">
        <div className="dashboard columns is-multiline is-vcentered">
          <div className="column is-12">
            <Logo />
          </div>
          <div className="column is-12">
            <div className="has-text-centered">
              <ApiStatus />
            </div>
          </div>
          <div className="column is-12">
            <InputField :value="searchTerm" :loading="isSearching" :placeholder="$t('citySearchInputPlaceholder')" maxLength="140" :onChange="onChange" :onSubmit="onSubmit" />
          </div>
          <div className="column is-12">
            <!-- <ResultsToggle /> -->
          </div>
          <div className="column is-12">
            <!-- <SavedCities /> -->
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

export default {
  name: 'Dashboard',
  components: {
      Logo,
      ApiStatus,
      InputField
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
      onChange: function() {

      },
      onSubmit: function() {

      }
  }
}

</script>