/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = <T>(
  fetchFunction: (page: number, perPage: number) => Promise<T[]>,
  perPage: number = 10
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async () => {
    if (!hasMore) return;
    setLoading(true);
    setError("");
    try {
      const newData = await fetchFunction(page, perPage);
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...newData]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { data, loading, error, hasMore, setPage, setData, setHasMore };
};

export default useInfiniteScroll;
