import { defineStore } from 'pinia';

const useSnackbarStore = defineStore('snackbarStore', {
  state: () => ({
    message: '',
    color: '',
    timeout: 6000,
  }),

  actions: {
    showSnackbar({ message, color, timeout = this.timeout }) {
      this.message = message;
      this.color = color;
      this.timeout = timeout;
    },
  },
});

export default useSnackbarStore;
