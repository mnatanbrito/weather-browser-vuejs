<template>
    <fragment>
        <li v-for="(item, index) in numberOfPages" :key="item">
            <a
                :class="`pagination-link ${current === index ? 'is-current' : ''}`"
                :title="$t('pageLabel') + ' ' + (index + 1)"
                :aria-label="'Goto to page ' + (index + 1)"
                @click="$emit('page-selected', index)"
            >
                {{ index + 1 }}
            </a>
        </li>
    </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
export default {
    name: 'Pages',
    components: {
        Fragment,
    },
    props: ['current', 'total'],
    computed: {
        numberOfPages: function () {
            return new Array(this.total)
        }
    }
}
</script>