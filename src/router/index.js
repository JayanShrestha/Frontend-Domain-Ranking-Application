import { createRouter, createWebHistory } from 'vue-router';
import DomainRanking from '../views/DomainRanking.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: DomainRanking,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});