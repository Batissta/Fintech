import React from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// const useFetch =  (url: RequestInfo | URL, options?: RequestInit): FetchState<T> => {
function useFetch<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): FetchState<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      try {
        setLoading(true);
        setData(null);
        const response = await fetch(url, {
          signal,
          ...optionsRef,
        });
        if (!response.ok) throw new Error(`erro: ${response.status}`);
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json);
      } catch (e) {
        if (!signal.aborted && e instanceof Error) setError(e.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
