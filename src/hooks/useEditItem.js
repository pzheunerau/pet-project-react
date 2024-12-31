import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export const useEditItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccess, setSeccess] = useState(false);

  const request = useCallback(async (album, id) => {
    setLoading(true);
    setError(null);
    setSeccess(false);

    try {
      const response = await apiClient.patch(`albums/${id}`, {
        title: album.title,
        userId: album.userId,
      });
      setSeccess(true);
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
    request,
    loading,
    error,
    seccess
  }
}