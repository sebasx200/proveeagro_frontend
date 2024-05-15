// this file is used to apply the auth interceptor to the axios instance
import { ACCESS_TOKEN } from "../constants";

function applyAuthInterceptor(api){
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
  }

export default applyAuthInterceptor;