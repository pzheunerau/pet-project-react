import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

// import { toaster } from "../components/ui/toaster";

export const useCreateItem = () => {
  // const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccess, setSeccess] = useState(false);

  // useEffect(() => {
  //   if (error) {
  //     toaster.create({
  //       title: "No album created",
  //       description: "Try again",
  //       type: "error"
  //     })
  //   }
  // }, [error]);

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
      return response.data;
    } catch(error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   toaster.promise(request, {
  //     success: {
  //       title: "Successfully!",
  //       description: "Album created",
  //     },
  //     error: {
  //       title: "Failed!",
  //       description: "Something went's wrong",
  //     },
  //     loading: { 
  //       title: "Loading...",
  //       description: "Please wait" 
  //     },
  //   })
  // }, [request]);

  return {
    // data,
    request,
    loading,
    error,
    seccess
  }
}