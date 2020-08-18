<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'NotificationContainer',
    methods: {
        ...mapActions(['hideNotification'])
    },
    computed: {
        ...mapState({
            notification: state => state.notifications.notification
        })
    },
    updated: function() {
        if(this.notification) {
            console.log(`new notification`, this.notification);

            this.hideNotification();
        }
    }
}
</script>
