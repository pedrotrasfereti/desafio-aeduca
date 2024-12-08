import axios from 'axios';
import { defineStore } from 'pinia';

const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  }),

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.post('/api/auth/login', credentials);

        this.user = { login: data.login, role: data.role };
        this.token = data.token;
        this.isAuthenticated = true;

        // Persist token in local storage
        localStorage.setItem('token', data.token);

        return { success: true, message: 'Login realizado com sucesso' };
      } catch (err) {
        return { success: false, message: err.response.data.message };
      } finally {
        this.loading = false;
      }
    },

    initializeAuth() {
      const token = localStorage.getItem('token');

      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      } else {
        this.token = null;
        this.isAuthenticated = false;
      }
    },
  },
});

export default useUserStore;
