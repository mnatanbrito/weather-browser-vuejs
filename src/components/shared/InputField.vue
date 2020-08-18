<template>
    <form novalidate @submit="submit">
      <div
        :class="'inputfield control has-icons-left has-icons-right' +  isSearching"
      >
        <input
          ref="inputField"
          class="inputfield--input input is-large"
          type="text"
          :placeholder="placeholder"
          @input="onChange"
          :value="value"
          :maxlength="maxLength"
        />
        <span v-if="!loading" class="icon is-medium is-right">
            <i class="fas fa-search"></i>
        </span>
      </div>
    </form>
</template>

<script>
export default {
    name: 'InputField',
    props: ['value', 'loading', 'placeholder', 'onChange', 'onSubmit', 'maxLength'],
    computed: {
        isSearching: function() {
            return `${this.$props.loading ? 'is-loading' : ''}`;
        }
    },
    methods: {
        submit: function(e) {
            e.preventDefault();

            this.$props.onSubmit();
        }
    },
    mounted() {
      this.$refs.inputField.focus();
    }
}
</script>

<style lang="sass">

</style>