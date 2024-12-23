import { useState, useCallback, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useFetchListItems = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async () => {
    if (!url) return;

    setLoading(true);

    try {
      const response = await apiClient.get(url);
      setData(response.data);
      setError(null);
    } catch(error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    request()
  }, [request]);

  return {
    data,
    loading,
    error,
    request,
  }
}