<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit('INITIALISE_WEATHER_HISTORY_LOCAL_STORAGE');
  },
};
</script>

<style lang="scss">
@import './assets/scss/style.scss';
</style>
