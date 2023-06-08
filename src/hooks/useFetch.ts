import { useState } from "react";

type UseFetchType = [() => Promise<void>, boolean, string];
export const useFetch = <T>(callback: () => Promise<T>): UseFetchType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
