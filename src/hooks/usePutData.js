import { useState } from 'react';
import api from "../api/api";

/** this custom hook is used to make put request to the server using axios */ 
const usePutData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // we must pass the data that will put and the endpoint
  const putData = async (endpoint, putData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(endpoint, putData);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
};

export default usePutData;