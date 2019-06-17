import Vue from 'vue';
import moment from 'moment';
import App from './App';
import router from './router';
import store from './store';

import utils from './utils';

Vue.config.productionTip = false;

Vue.prototype.$utils = utils;
Vue.prototype.$moment = {
  getDate(date) {
    return date ? moment.unix(date).format('DD.MM.YYYY') : '';
  },
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
