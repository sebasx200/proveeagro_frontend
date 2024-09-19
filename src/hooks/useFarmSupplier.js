import { useState } from "react";
import api from "../api/api";

/** this custom hook is used to make a post request to relate selected suppliers with selected farms */
const useFarmSupplier = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const relateFarmSupplier = async (farmId, supplierId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post("/farm/farm_suppliers/", farmId, supplierId);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, relateFarmSupplier };
};

export default useFarmSupplier;
