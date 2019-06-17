import Vue from 'vue';
import Vuex from 'vuex';
import weather from './weather';
import alert from './alert';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { weather, alert },
});

export default store;
