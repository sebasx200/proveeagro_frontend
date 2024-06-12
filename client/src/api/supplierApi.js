import axios from "axios";
import applyAuthInterceptor from "./applyAuthInterceptor";

const supplierApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

applyAuthInterceptor(supplierApi);

export const getDepartments = () => supplierApi.get("/location/department/departments/");
export const getCities = () => supplierApi.get("/location/city/cities/");
export const getSuppliers = () => supplierApi.get("/supplier/suppliers/");
export const updateSupplier = (id, data) => supplierApi.put(`/supplier/suppliers/${id}/`, data);
export const addSupplier = (data) => supplierApi.post("/supplier/suppliers/", data);
export { supplierApi }