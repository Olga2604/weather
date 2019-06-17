import Vue from 'vue';
import Router from 'vue-router';
// Views
import Home from './views/Home';
import Error from './views/Error';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: 'error',
      component: Error,
    },
  ],
});
