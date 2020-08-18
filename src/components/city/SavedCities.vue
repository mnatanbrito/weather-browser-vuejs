<template>
    <fragment>
        <ConfirmationDialog
            :visible="showDeleteConfirmation"
            :title="$t('deleteModalConfirmationTitle')"
            :icon="'fa-ban'"
            :confirmLabel="$t('deleteModalConfirmationConfirmLabel')"
            :confirmClass="'is-danger'"
            :cancelLabel="$t('deleteModalConfirmationCancelLabel')"
            @handle-cancel="onHandleCancel"
            @handle-confirm="onHandleConfirm">
            <p>
                {{ $t('deleteModalConfirmationMessage')}}
            </p>
        </ConfirmationDialog>

        <section class="section mb-3">
            <SavedCity
                v-for="city in citiesPaged(pageIndex)"
                :key="city.id"
                :id="city.id"
                :name="city.name"
                :weatherDescription="weatherInfoById(city.id).description"
                :minTemp="city.main.temp_min"
                :maxTemp="city.main.temp_max"
                :icon="weatherInfoById(city.id).icon"
                @remove="onShowConfirmation" />
        </section>

        <section class="section" v-if="savedCities.length > 0">
          <div class="container">
            <Paginator
              :total="Math.ceil(savedCities.length / pageSize)"
              :current="pageIndex"
              :onPageSelected="onPageSelected"
            />
          </div>
        </section>
    </fragment>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { Fragment } from 'vue-fragment'

import ConfirmationDialog from '../shared/ConfirmationDialog'
import SavedCity from './SavedCity'
import Paginator from '../shared/Paginator'

export default {
    name: 'SavedCities',
    components: {
        Fragment,
        ConfirmationDialog,
        SavedCity,
        Paginator
    },
    data: () => ({
        cityToDelete: null,
        showDeleteConfirmation: false,
    }),
    computed: {
        ...mapState({
            pageSize: state => state.cities.pageSize,
            pageIndex: state => state.cities.pageIndex,
        }),
        ...mapGetters(['savedCities', 'citiesPaged', 'weatherInfoById']),
    },
    methods: {
        onPageSelected: function(pageIndex) {
            this.$store.dispatch('selectPageIndex', pageIndex)
        },
        onShowConfirmation: function(id) {
            this.$data.cityToDelete = id
            this.$data.showDeleteConfirmation = true
        },
        onHandleCancel: function() {
            this.$data.cityToDelete = null
            this.$data.showDeleteConfirmation = false
        },
        onHandleConfirm: function() {
            this.$store.dispatch('removeCity', this.$data.cityToDelete);
            this.onHandleCancel();
        },
    }
}
</script>