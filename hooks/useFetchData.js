import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
    };
  }, [url]);

  return { data, setData, error, isLoading };
};