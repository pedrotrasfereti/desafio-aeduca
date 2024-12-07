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

        return { success: true, message: 'Login realizado com sucesso' };
      } catch (err) {
        return { success: false, message: err.response.data.message };
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useUserStore;
