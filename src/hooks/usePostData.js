import { useState } from 'react';
import api from "../api/api";

/** this custom hook is used to make post request to the server using axios */ 
const usePostData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // we must pass the data that will post and the endpoint
  const postData = async (endpoint, postData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post(endpoint, postData);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostData;