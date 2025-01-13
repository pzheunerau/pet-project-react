import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export const useCreateItem = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccess, setSeccess] = useState(false);

  const request = useCallback(async (album) => {
    setLoading(true);
    setError(null);
    setSeccess(false);

    try {
      const response = await apiClient.post('albums', {
        title: album.title,
        userId: album.userId,
      });
      setSeccess(true);
      setData(response.data);
      return response.data;
    } catch(error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    request,
    loading,
    error,
    seccess
  }
}