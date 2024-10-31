// this is the api to make http requst to the server
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { REFRESH_TOKEN } from "../constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (refreshToken) {
        const response = await api.post("/login/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        api.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
