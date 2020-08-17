<template>
  <router-view class="weather-app"></router-view>
</template>

<script>

export default {
  name: 'WeatherApp',
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
