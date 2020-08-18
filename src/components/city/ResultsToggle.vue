<template>
    <div v-if="savedCities.length > 0" class="buttons has-addons is-pulled-right">
      <button
        :class="'button '+ firstPageClass + ' is-selected'"
        @click="selectFirstPageSize"
        :title="constants.pageSizes[0] + ' ' + $t('resultsPerPageLabel')"
      >
        {{ constants.pageSizes[0] }}
      </button>
      <button
        :class="'button '+ secondPageClass + ' is-selected'"
        @click="selectSecondPageSize"
        :title="constants.pageSizes[1] + ' ' + $t('resultsPerPageLabel')"
      >
        {{ constants.pageSizes[1] }}
      </button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import constants from './constants';
export default {
    name: 'ResultsToggle',
    methods: {
        selectFirstPageSize: function() {
            this.$store.dispatch('selectPageSize', constants.pageSizes[0]);
        },
        selectSecondPageSize: function() {
            this.$store.dispatch('selectPageSize', constants.pageSizes[1]);
        }
    },
    data: () => ({
        constants
    }),
    computed: {
        ...mapState({
            firstPageClass: state => `${state.cities.pageSize === constants.pageSizes[0] ? 'is-selected is-info' : ''}`,
            secondPageClass: state => `${state.cities.pageSize === constants.pageSizes[1] ? 'is-selected is-info' : ''}`
        }),
        ...mapGetters(['savedCities'])
    }
}
</script>