export default {
  state: {
    alert: {
      isShow: false,
    },
  },
  actions: {
    showAlert({ commit }, payload) {
      commit('SHOW_ALERT', payload);
      setTimeout(() => {
        commit('HIDE_ALERT');
      }, 4000);
    },
  },
  mutations: {
    SHOW_ALERT(state, { color = '', text = '', id = '' }) {
      state.alert = {
        isShow: true,
        color,
        text,
        id,
      };
    },
    HIDE_ALERT(state) {
      state.alert = {
        isShow: false,
      };
    },
  },
  getters: {
    getAlert(state) {
      return state.alert;
    },
  },
};
