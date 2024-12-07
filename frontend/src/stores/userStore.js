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

        this.user = data.user;
        this.token = data.token;
        this.isAuthenticated = true;
      } catch (err) {
        return { success: false, message: err };
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useUserStore;
