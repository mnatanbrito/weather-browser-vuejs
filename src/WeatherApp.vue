<template>
  <div class="weather-app">
      <h2>Hello World</h2>
      <span>{{ settings.language }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WeatherApp',
  computed: mapState({
      settings: state => state.settings
  })
}

</script>

<style lang="scss">
html, body, #root {
    height: 100vh;
    width: 100vw;
}

.weather-app {
    height: 100vh;
    position: absolute;
    left: 0;
    width: 100vw;
    font-family: 'Roboto', sans-serif;
}

.clickable {
    cursor: pointer;
}
</style>
