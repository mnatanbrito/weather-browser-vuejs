<template>
    <nav
      class="pagination mt-3 is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <fragment v-if="!renderInline">
          <a class="pagination-previous">
            {{ $t('previousPageLabel') }}
          </a>
          <a class="pagination-next">
            {{ $t('nextPageLabel') }}
          </a>
      </fragment>

      <ul class="pagination-list">
        <Pages :current="current" :total="total" @page-selected="onPageSelected" />
      </ul>
    </nav>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Pages from './Pages'
export default {
    name: "Paginator",
    props: ['total', 'current', 'onPageSelected'],
    components: {
        Pages,
        Fragment
    },
    computed: {
        renderInline: function() {
            return this.total <= 5
        }
    }
}
</script>