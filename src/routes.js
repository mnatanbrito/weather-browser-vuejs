import VueRouter from 'vue-router';

import Dashboard from './components/dashboard/Dashboard.vue';

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
