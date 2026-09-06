import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; errors?: string[] }>) => {
    const message = error.response?.data?.errors?.[0] ?? error.response?.data?.error;
    error.message = message ?? error.message;
    return Promise.reject(error);
  },
);

export default api;