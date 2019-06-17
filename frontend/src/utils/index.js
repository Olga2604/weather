export default {
  getTemperature(maxTemp, minTemp) {
    return `${Math.round(((maxTemp + minTemp) / 2) - 273.15)}°C`;
  },
  convertKelvinToCelsius(temp) {
    return `${Math.round(temp - 273.15)}°C`;
  },
};
