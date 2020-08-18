<template>
    <span v-if="hasLimitError" class="tag is-danger is-small has-text-centered">
      <span class="icon">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
      <FormattedMessage id="apiLimitMessage" />
    </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ApiStatus',
    computed: {
        ...mapGetters(['hasLimitError'])
    }
}
</script>

<style lang="sass">

</style>