<template>
  <div class="container">
    <div class="city">{{ currentWeatherData.name }}</div>
    <div class="city__weather__description">
      {{ currentWeatherData.weather[0].description }}
    </div>
    <div class="city__weather__temp-value mt-10">
      {{ $utils.getTemperature(currentWeatherData.main.temp_max, currentWeatherData.main.temp_min) }}
    </div>
    <div class="city__weather__info">
      <table>
        <tr>
          <td>Humidity</td>
          <td>{{ currentWeatherData.main.humidity }}%</td>
        </tr>
        <tr>
          <td>Windspeed</td>
          <td>{{ currentWeatherData.wind.speed }}mps</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentWeatherData'],
};
</script>

<style lang="scss" scoped>
  .container {
    color: $dark;
    padding: 10px;
  }
  .city {
    width: 100%;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 18px;
    &__weather {
      &__description {
        width: 100%;
        text-transform: capitalize;
        font-size: 12px;
      }
      &__temp-value {
        font-size: 25px;
      }
      &__info {
        width: 100%;
        table {
          width: 50%;
          margin: 0 auto;
          @media (max-width: 767px) {
            width: 100%;
          }
        }
      }
    }
  }
</style>
