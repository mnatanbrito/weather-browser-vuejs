<template>
    <fragment>
        <ConfirmationDialog />

        <section className="section mb-3">
            <SavedCity
                v-for="city in savedCities"
                :key="city.id"
                :id="city.id"
                :name="city.name"
                :weatherDescription="city.id"
                :minTemp="city.main.temp_min"
                :maxTemp="city.main.temp_max"
                :icon="city.id"
                @remove="onRemove" />
        </section>
    </fragment>
</template>

<script>
import { map, find } from 'lodash/collection'
import { mapGetters } from 'vuex'
import { Fragment } from 'vue-fragment'

import ConfirmationDialog from '../shared/ConfirmationDialog'
import SavedCity from './SavedCity'

export default {
    name: 'SavedCities',
    components: {
        Fragment,
        ConfirmationDialog,
        SavedCity,
    },
    computed: {
        ...mapGetters(['savedCities']),
    },
    getters: {
        weatherInfoById: (state) => id => {
            const cities = map(state.cities.allIds, id => state.cities.byId[id]);
            return find(cities, city => city.id === id)
        }
    },
    methods: {
        onRemove: (id) => {
            console.log('onRemove', id);
        }
    }
}
</script>