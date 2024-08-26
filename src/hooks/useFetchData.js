// this custom hook is used to make get request to the server using axios
import { useState, useEffect } from 'react';

// it takes an axios object and an url
const useFetchData = (axiosInstance, endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance, endpoint]);

  return { data, loading, error };
};

export default useFetchData;