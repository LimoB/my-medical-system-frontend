// File: src/services/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3030/api',
  withCredentials: true,
});

// Attach Authorization token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Attaching token:', token);
      }
    } else {
      console.warn('⚠️ No token found. Skipping Authorization header.');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
