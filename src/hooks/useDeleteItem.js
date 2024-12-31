import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export const useDeleteItem = (url, id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccess, setSeccess] = useState(false);

  const request = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSeccess(false);

    try {
      const response = await apiClient.delete(`${url}/${id}`);
      setSeccess(true);
      return response;
    } catch(error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    request,
    loading,
    error,
    seccess
  }
}