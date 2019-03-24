import Vue from 'vue';
import Router from 'vue-router';
import theGame from './views/theGame.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'The Game',
      component: theGame,
    },
  ],
});
