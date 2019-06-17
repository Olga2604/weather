<template>
  <div class="container">
    <div class="card">
      <div>
        <table class="mt-20">
          <tr>
            <th></th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Windspeed</th>
          </tr>
          <tbody>
          <tr v-for="(day, index) in days"
              :key="index">
            <td>{{ $moment.getDate(day[1].dt) }}</td>
            <td>{{ getAverageTemp(day) }}</td>
            <td>{{ getAverageHumidity(day) }}%</td>
            <td>{{ getAverageWindspeed(day) }}mps</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['forecastData'],
  computed: {
    days() {
      const daysArr = [];
      for (let i = 0; i < this.forecastData.length; i += 8) {
        daysArr.push(this.forecastData.slice(i, i + 8));
      }
      return daysArr;
    },
  },
  methods: {
    getAverageTemp(day) {
      const dayTemperatures = day.map(el => (el.main.temp_max + el.main.temp_min) / 2)
        .reduce((value1, value2) => (value1 + value2));
      const averageTemp = dayTemperatures / 8;
      return this.$utils.convertKelvinToCelsius(averageTemp);
    },
    getAverageHumidity(day) {
      const dayHumidities = day.map(el => el.main.humidity)
        .reduce((value1, value2) => (value1 + value2));
      const averageHumidity = dayHumidities / 8;
      return Math.round(averageHumidity);
    },
    getAverageWindspeed(day) {
      const dayWindSpeeds = day.map(el => el.wind.speed)
        .reduce((value1, value2) => (value1 + value2));
      const averageWindSpeed = dayWindSpeeds / 8;
      return Math.round(averageWindSpeed);
    },
  },
};
</script>

<style lang="scss" scoped>
  .card {
    width: 50%;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
</style>
