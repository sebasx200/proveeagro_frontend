import { useState, useEffect } from "react";
import api from "../api/api";

/** this custom hook is used to make get request to the server using axios */
const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // it takes an axios object and an url
  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;
