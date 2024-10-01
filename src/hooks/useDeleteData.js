import { useState } from "react";
import api from "../api/api";

/** this custom hook is used to make delete request to the server using axios */
const useDeleteData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // we must pass the endpoint of the data that will be deleted
  const deleteData = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(endpoint);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
};

export default useDeleteData;
