import axios from "axios";
import applyAuthInterceptor from "./applyAuthInterceptor";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

applyAuthInterceptor(userApi);

export default userApi;
