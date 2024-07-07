import { useState, useEffect } from "react";

interface FetchResult<T> {
  data: T | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data: T) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err: Error) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
