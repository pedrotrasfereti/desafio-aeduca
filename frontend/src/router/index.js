// Components
import { createRouter, createWebHistory } from 'vue-router';

import DashboardLayout from '../layouts/DashboardLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import useUserStore from '../stores/userStore';

const authGuard = (_to, _from, next) => {
  const userStore = useUserStore();

  userStore.initializeAuth();

  if (userStore.isAuthenticated) {
    next();
  } else {
    next('/');
  }
};

const initializeAuth = (_to, _from, next) => {
  const userStore = useUserStore();

  userStore.initializeAuth();

  if (userStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginPage,
      },
    ],
    beforeEnter: initializeAuth,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardPage,
      },
    ],
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
