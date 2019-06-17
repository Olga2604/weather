import http from '../http';


export default {
  state: {
    currentWeather: {
      isLoaded: false,
      data: [],
    },
    forecast: {
      isLoaded: false,
      data: [],
    },
    weatherHistory: [],
  },
  actions: {
    loadWeatherByCity({ commit, dispatch }, { cityName }) {
      http
        .get('/api/weather/forecast', {
          params: {
            q: cityName,
          },
        })
        .then(({ data }) => {
          commit('SET_CURRENT_WEATHER', data[0]);
          commit('SET_FORECAST', data[1]);
          commit('SET_WEATHER_HISTORY', data[0]);
        })
        .catch(() => {
          dispatch('showAlert', {
            id: 'error',
            color: 'danger',
            text: 'Ooops! Seems like you typed a nonexistent city name. Check it again.',
          });
        });
    },
    loadWeatherByZipcode({ commit, dispatch }, { zipCode }) {
      http
        .get('/api/weather/forecast', {
          params: {
            zip: zipCode,
          },
        })
        .then(({ data }) => {
          commit('SET_CURRENT_WEATHER', data[0]);
          commit('SET_FORECAST', data[1]);
          commit('SET_WEATHER_HISTORY', data[0]);
        })
        .catch(() => {
          dispatch('showAlert', {
            id: 'error',
            color: 'danger',
            text: 'Ooops! Seems like this zipcode is wrong. Check it again.',
          });
        });
    },
    clearWeather({ commit }) {
      commit('CLEAR_WEATHER');
    },
  },
  mutations: {
    SET_CURRENT_WEATHER(state, data) {
      state.currentWeather = {
        isLoaded: true,
        data,
      };
    },
    SET_FORECAST(state, data) {
      state.forecast = {
        isLoaded: true,
        data,
      };
    },
    SET_WEATHER_HISTORY(state, data) {
      state.weatherHistory.push(data);
      localStorage.setItem('history', JSON.stringify(state.weatherHistory));
    },
    CLEAR_WEATHER(state) {
      state.currentWeather = {
        isLoaded: false,
        data: [],
      };
      state.forecast = {
        isLoaded: false,
        data: [],
      };
    },
    INITIALISE_WEATHER_HISTORY_LOCAL_STORAGE(state) {
      if (localStorage.getItem('history')) {
        state.weatherHistory = Object.assign(state.weatherHistory, JSON.parse(localStorage.getItem('history')));
      }
    },
  },
  getters: {
    getCurrentWeather(state) {
      return state.currentWeather;
    },
    getForecast(state) {
      return state.forecast;
    },
    getHistory(state) {
      return state.weatherHistory;
    },
  },
};
