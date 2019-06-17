<template>
  <div class="card">
    <div class="card__title mt-20">
      Weather History
    </div>
    <div>
      <table class="mt-20">
      <tr>
        <th>City</th>
        <th>Temperature</th>
        <th>Humidity</th>
      </tr>
      <tbody>
      <tr v-for="(city, index) in weatherHistoryData"
          :key="index">
        <td>{{ city.name }}</td>
        <td>{{ $utils.getTemperature(city.main.temp_max, city.main.temp_min) }}</td>
        <td>{{ city.main.humidity }}%</td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['weatherHistoryData'],
};
</script>

<style lang="scss" scoped>
  .card {
    width: 50%;
    height: 100%;
    padding-bottom: 10px;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
</style>
