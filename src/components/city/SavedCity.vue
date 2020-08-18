<template>
<div class="saved-city card mb-2">
      <div class="card-content">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                {{ $t('savedCityName') }}
              </p>
              <p class="title">{{ name }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                  {{ $t('savedCityWeather') }}
              </p>
              <img
                v-if="icon"
                :alt="weatherDescription"
                :src="`http://openweathermap.org/img/w/${icon}.png`"
                width={48}
                height={48}
                />
              <p>
                <span class="tag is-primary">{{ weatherDescription }}</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                {{ $t('savedCityMinTemperature') }}
              </p>
              <p class="title">
                  {{ tempFormatted(minTemp) }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                  {{ $t('savedCityMaxTemperature') }}
              </p>
              <p class="title">
                  {{ tempFormatted(maxTemp) }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading"></p>
              <p class="title">
                <button
                  type="button"
                  :aria-label="$t('deleteCityAction')"
                  class="delete is-large"
                  :title="$t('deleteCityAction')"
                  @click="$emit('remove', id)"
                ></button>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import { formatTemperature, kelvinToCelsius } from '../../utils/temperature'
import locales from '../../i18n/locales'

export default {
    name: 'SavedCity',
    props: ['id', 'name', 'icon', 'weatherDescription', 'minTemp', 'maxTemp'],
    computed: {
        ...mapState({
            tempFormatted: state => temp => formatTemperature(
                  state.settings.language,
                  state.settings.language === locales.EN_US ? temp : kelvinToCelsius,
                  temp
                ),
        })
    }
}
</script>