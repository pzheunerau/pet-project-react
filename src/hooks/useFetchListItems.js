import { useState, useCallback, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useFetchListItems = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccess, setSeccess] = useState(false);

  const request = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setSeccess(false);

    try {
      const response = await apiClient.get(url);
      setSeccess(true);
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
    seccess,
    request,
  }
}