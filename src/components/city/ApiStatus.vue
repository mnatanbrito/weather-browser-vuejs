<template>
    <span v-if="hasLimitError" className="tag is-danger is-small has-text-centered">
      <span className="icon">
        <i className="fas fa-exclamation-triangle"></i>
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