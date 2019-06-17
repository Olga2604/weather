<template>
  <div class="home">
    <h1>CoolWeatherApp</h1>
    <h2>Find out the weather in any city</h2>
    <div class="container search">
      <input v-model="citySearchParam"
             @keyup.enter="getCityWeather"
             class="mt-20"
             placeholder="City Or Zipcode"
             autofocus />
      <div @click="getCityWeather"
           class="button button__main">Search</div>
      <div @click="clearCityWeather"
           class="button button__danger">Clear</div>
    </div>
    <alert v-if="getAlert.id === 'error'" />
    <transition name="fade">
      <div v-if="getCurrentWeather.isLoaded || getForecast.isLoaded"
           class="container mt-20">
        <current-weather-card :currentWeatherData="getCurrentWeather.data" />
        <weather-forecast-card :forecastData="forecast"
                               class="mt-20" />
        <weather-history :weatherHistoryData="getHistory" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CurrentWeatherCard from '../components/blocks/CurrentWeatherCard';
import WeatherForecastCard from '../components/blocks/WeatherForecastCard';
import WeatherHistory from '../components/blocks/WeatherHistory';
import Alert from '../components/elements/Alert';


export default {
  data() {
    return {
      citySearchParam: '',
    };
  },
  components: { CurrentWeatherCard, WeatherForecastCard, WeatherHistory, Alert },
  computed: {
    ...mapGetters([
      'getCurrentWeather',
      'getForecast',
      'getWeatherHistory',
      'getHistory',
      'getAlert',
    ]),
    forecast() {
      return this.getForecast.data.list;
    },
  },
  methods: {
    ...mapActions([
      'loadWeatherByCity',
      'loadWeatherByZipcode',
      'clearWeather',
      'showAlert',
    ]),
    getCityWeather() {
      return /^\d+$/.test(this.citySearchParam)
        ? this.loadWeatherByZipcode({ zipCode: this.citySearchParam })
        : this.loadWeatherByCity({ cityName: this.citySearchParam });
    },
    clearCityWeather() {
      this.citySearchParam = '';
      this.clearWeather();
    },
  },
};
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    padding: 50px 20px;
    text-align: center;
  }
  h1, h2 {
    color: $white;
    text-shadow: 4px 0px 10px rgba(150, 150, 150, 1);
  }
  .search {
    padding: 10px;
    margin: 0 auto;
    width: 70%;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  .button {
    align-self: flex-end;
    margin-left: 10px;
    @media (max-width: 767px) {
      margin: 10px 0;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
