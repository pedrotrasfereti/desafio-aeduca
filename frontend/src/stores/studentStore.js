import axios from 'axios';
import { defineStore } from 'pinia';

import useSnackbarStore from './snackbarStore';

const apiClient = axios.create({ baseURL: 'api' });

// Pass token to headers on every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = '0';
    }
    return config;
  },
  (err) => Promise.reject(err),
);

const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: [],
    loading: false,
  }),

  actions: {
    async getAllStudents() {
      this.loading = true;

      try {
        const { data } = await apiClient.get('/students');

        this.students = data.data;

        return { success: true, message: '' };
      } catch (err) {
        if (err.response.status === 401) {
          return { success: false, message: 'Sua sessão expirou' };
        }
      } finally {
        this.loading = false;
      }
    },

    async createStudent(studentData) {
      const { showSnackbar } = useSnackbarStore();

      this.loading = true;

      try {
        const { data } = await apiClient.post('/students', studentData);

        showSnackbar({ message: data.message, color: 'success' });
      } catch (err) {
        showSnackbar({
          message: err.response.data.message,
          color: 'error',
        });
      } finally {
        this.loading = false;
      }
    },

    async updateStudent(ra, studentData) {
      const { showSnackbar } = useSnackbarStore();

      this.loading = true;

      try {
        const { data } = await apiClient.put(`/students/${ra}`, studentData);

        showSnackbar({ message: data.message, color: 'success' });
      } catch (err) {
        showSnackbar({
          message: err.response.data.message,
          color: 'error',
        });
      } finally {
        this.loading = false;
      }
    },

    async deleteStudent(ra) {
      const { showSnackbar } = useSnackbarStore();

      this.loading = true;

      try {
        const { data } = await apiClient.delete(`/students/${ra}`);

        showSnackbar({ message: data.message, color: 'success' });
      } catch (err) {
        showSnackbar({
          message: err.response.data.message,
          color: 'error',
        });
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useStudentStore;
