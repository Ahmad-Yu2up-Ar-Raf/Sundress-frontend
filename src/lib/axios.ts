// lib/axios.ts
import Axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const createAxios = (): AxiosInstance => {
  const instance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || undefined,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true, // gunakan jika server support credentials
    // gunakan built-in XSRF options:
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        if (typeof window !== 'undefined') {
          const token = window.localStorage.getItem('auth_token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          // backup: manual XSRF header if cookie exists
          const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
          if (match && config.headers) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[2]);
          }
        }
      } catch (err) {
        // jangan throw di sini agar request tetap jalan
        // console.warn('axios request interceptor error', err);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response, // kembalikan full response: konsisten
    (error) => {
      // optional: log error detail during dev
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.error('Axios response error:', error?.response ?? error);
      }

      const status = error?.response?.status;
      if (status === 401 || status === 419) {
        if (typeof window !== 'undefined') {
          const url = error.config?.url || '';
          if (!url.includes('/login') && !url.includes('/register')) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const axios = createAxios();
export default axios;
