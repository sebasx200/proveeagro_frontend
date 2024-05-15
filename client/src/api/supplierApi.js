import axios from "axios";
import applyAuthInterceptor from "./applyAuthInterceptor";

const supplierApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

applyAuthInterceptor(supplierApi);

export default supplierApi;
