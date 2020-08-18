<template>
<div class="weather-app">
  <NotificationContainer>
    <router-view></router-view>
  </NotificationContainer>
</div>
</template>

<script>
import NotificationContainer from './components/notifications/NotificationContainer'
export default {
  name: 'WeatherApp',
  components: {
    NotificationContainer,
  }
}

</script>

<style lang="scss">
html, body, #app {
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
