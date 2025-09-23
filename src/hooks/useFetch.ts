import {useCallback, useState} from "react";
import {AxiosError} from "axios";

export const useFetch = <U, T>(fetchFunction: (params: U) => Promise<T>) =>
{
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params: U) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(params);
        setData(result);
        return result;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMessage = error?.response?.data?.message || "Ocorreu um erro na aplicação";

          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  return {data, loading, error, execute, setError, setData};
}