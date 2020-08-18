<template>
    <div v-if="visible" class="modal is-active confirmation-dialog">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <Icon v-if="icon" :icon="icon" />
            &nbsp;&nbsp;
            {{title}}
          </p>
          <button
            v-if="showCloseButton"
              class="delete"
              aria-label="close"
              @click="$emit('handle-cancel')"
            />
        </header>
        <section class="modal-card-body confirmation-dialog__body">
          <slot>
          </slot>
        </section>
        <footer class="modal-card-foot">
          <button
            :class="`button ${cancelClass || ''}`"
            @click="$emit('handle-cancel')"
          >
            {{cancelLabel}}
          </button>
          <button
            :class="`button ${confirmClass || ''}`"
            @click="$emit('handle-confirm')"
          >
            {{confirmLabel}}
          </button>
        </footer>
      </div>
    </div>
</template>

<script>
import Icon from './Icon'
export default {
    name: 'ConfirmationDialog',
    props: ['visible', 'showCloseButton', 'title', 'icon', 'confirmLabel', 'confirmClass', 'cancelLabel', 'cancelClass'],
    components: {
        Icon
    }
}
</script>