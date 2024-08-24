import axios from "axios";
import applyAuthInterceptor from "./applyAuthInterceptor";

const farmApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

applyAuthInterceptor(farmApi);

export const getFarms = () => farmApi.get("/farm/farms/");
export const addFarm = (data) => farmApi.post("/farm/farms/", data);
export const updateFarm = (id, data) => farmApi.put(`/farm/farms/${id}/`, data);
export const getFarmsSuppliers = () => farmApi.get("/farm/farm_suppliers/");
export { farmApi }