import axios from "axios";
import applyAuthInterceptor from "./applyAuthInterceptor";

const farmApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

applyAuthInterceptor(farmApi);

export const getFarms = () => farmApi.get("/farm/farms/");
export const addFarm = (data) => farmApi.post("/farm/farms/", data);
export { farmApi }