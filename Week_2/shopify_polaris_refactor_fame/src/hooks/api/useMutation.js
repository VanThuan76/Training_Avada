import { useCallback, useMemo, useState } from "react";

/**
 *
 * @returns {{ post, put, patch, delete: del, loading, error}}
 */
const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method, body = null) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : null,
        });
        const data = await response.json();
        setLoading(false);
        return data;
      } catch (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const post = useCallback(
    async (url, body) => {
      return request(url, "POST", body);
    },
    [request]
  );

  const put = useCallback(
    async (url, body) => {
      return request(url, "PUT", body);
    },
    [request]
  );

  const patch = useCallback(
    async (url, body) => {
      return request(url, "PATCH", body);
    },
    [request]
  );

  const del = useCallback(
    async (url) => {
      return request(url, "DELETE");
    },
    [request]
  );

  return useMemo(
    () => ({
      post,
      put,
      patch,
      delete: del,
      loading,
      error,
    }),
    [post, put, patch, del, loading, error]
  );
};

export default useMutation;
