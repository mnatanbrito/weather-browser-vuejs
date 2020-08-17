<template>
  <WeatherApp />
</template>

<script>
import WeatherApp from './WeatherApp.vue';

export default {
  name: 'App',
  components: {
    WeatherApp,
  }
}
</script>

<style lang="scss">
@import '~bulma/css/bulma.min.css'
</style>
