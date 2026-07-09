import axios from 'axios';
import { useAuthStore } from '../../features/auth/store';

const API_URL = import.meta.env.VITE_API_URL?.trim() || 'https://digischool-h347.onrender.com/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken, setAccessToken } = useAuthStore.getState();
        if (!refreshToken) {
          // No refresh token available — only logout for non-GET requests
          // GET requests are likely background refetches and should fail silently
          if (originalRequest.method !== 'get') {
            useAuthStore.getState().logout();
          }
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { accessToken: newAccessToken } = response.data.data;

        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — only logout for non-GET requests
        if (originalRequest.method !== 'get') {
          useAuthStore.getState().logout();
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
