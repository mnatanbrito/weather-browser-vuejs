<template>
    <div>
        <slot></slot>
        <span v-if="currentNotification" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'NotificationContainer',
    methods: {
        ...mapActions(['hideNotification'])
    },
    computed: {
        ...mapGetters(['currentNotification'])
    },
    beforeUpdate: function() {
        if(this.currentNotification) {
            this.$toast.open({
                position: 'top-right',
                message: this.$t(this.currentNotification.message),
                type: this.currentNotification.notificationType,
            });

            this.hideNotification();
        }
    }
}
</script>
