// this is the axios instance for the location api

import axios from "axios";
import applyAuthInterceptor from "./applyAuthInterceptor";

const locationApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    });

applyAuthInterceptor(locationApi);

export default locationApi;