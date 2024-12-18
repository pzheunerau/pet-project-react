import { useState, useCallback } from "react";
import axios from "axios";
import { AXIOS_BASE_URL } from "../libs/consts";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: AXIOS_BASE_URL,
  });

  const request = useCallback(async (url) => {
    setLoading(true);

    try {
      const response = await api.get(url);

      // if (response.status !== 200) {
      //   throw new Error(`Could not fetch ${url}, status: ${response.status}`)
      // }

      const data = response.data;
      setLoading(false);
      return data;
    } catch(e) {
      setLoading(false);
      setError(e.message);
      throw e
    }

  }, []);

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    loading,
    error,
    request,
    clearError
  }
}