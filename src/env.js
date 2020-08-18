export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function getOpenWeatherApiKey() {
  return process.env.VUE_APP_OPEN_WEATHER_API_KEY;
}
