import axios from 'axios';
import { defineStore } from 'pinia';

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
      try {
        const { data } = await apiClient.post('/students', studentData);
        return data;
      } catch (err) {
        return { success: false, message: err.response.data.message };
      }
    },

    async updateStudent(ra, studentData) {
      try {
        const { data } = await apiClient.put(`/students/${ra}`, studentData);
        return data;
      } catch (err) {
        return { success: false, message: err.response.data.message };
      }
    },

    async deleteStudent(ra) {
      try {
        const { data } = await apiClient.delete(`/students/${ra}`);
        return data;
      } catch (err) {
        return { success: false, message: err.response.data.message };
      }
    },
  },
});

export default useStudentStore;
