// import { useState, useCallback, useEffect } from "react";
import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export const useDeleteItem = (url, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async () => {
    if (!url || !id) return;

    setLoading(true);

    try {
      const response = await apiClient.delete(`${url}/${id}`);
      setData(response.data);
      setError(null);
    } catch(error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   request()
  // }, [request]);

  return {
    data,
    loading,
    error,
    request,
  }
}