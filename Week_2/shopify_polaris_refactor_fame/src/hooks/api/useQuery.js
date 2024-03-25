import { useEffect, useState } from "react";

/**
 *
 * @param {{name: string; defaultData?: any; url: string; enabled?: boolean; onSuccess?: Function}} ctx
 * @returns {{data, setData, refetch, loading, error}}
 */

export default function useQuery(ctx) {
  const { url, defaultData, enabled = true, onSuccess } = ctx;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState();
  const [refetchKey, setRefetchKey] = useState(0);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchApi = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      onSuccess && onSuccess();
      setTimeout(() => {
        setIsLoading(true);
        setHasFetched(true);
      }, 50);
    }
  };
  useEffect(() => {
    if (isLoading && !hasFetched && enabled) {
      fetchApi();
    }
  }, [refetchKey, isLoading, hasFetched]);

  const refetch = () => {
    setRefetchKey((prevKey) => prevKey + 1);
    setHasFetched(false);
  };

  return { data, setData, refetch, isLoading, error };
}