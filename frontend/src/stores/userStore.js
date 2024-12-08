import axios from 'axios';
import { defineStore } from 'pinia';

const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.post('/api/auth/login', credentials);

        this.user = { login: data.data.login, role: data.data.role };
        this.isAuthenticated = true;

        // Persist token in local storage
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', data.data.token);

        return { success: true, message: 'Login realizado com sucesso' };
      } catch (err) {
        return { success: false, message: err.response.data.message };
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token'); // Clear token
      localStorage.removeItem('user'); // Clear user
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (token) {
        this.user = user;
        this.isAuthenticated = true;
      } else {
        this.user = null;
        this.isAuthenticated = false;
      }
    },
  },
});

export default useUserStore;
