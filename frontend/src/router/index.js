// Components
import { createRouter, createWebHistory } from 'vue-router';

import DashboardPage from '../pages/DashboardPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import useUserStore from '../stores/userStore';

const authGuard = (_to, _from, next) => {
  const userStore = useUserStore();

  if (userStore.isAuthenticated) {
    next();
  } else {
    next('/');
  }
};

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      userStore.initializeAuth();

      if (userStore.isAuthenticated) {
        // Redirect authenticated user to dashboard
        next('/dashboard');
      } else {
        // Allow unauthenticated user to access the login page
        next();
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
