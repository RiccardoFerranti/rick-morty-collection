import { useEffect, useState } from "react";

// const BASE_URL = 'https://rickandmortyapi.com/api/character';

const buildUrl = (baseUrl: string, pageNumber: number | null) => {
  console.log(pageNumber)
  const url = `${baseUrl}?page=${pageNumber}`;
  return url; 
}

const useFetch = (baseUrl: string, page: number | null = null ) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>([]);
  let url = baseUrl

  if (page) {
    url = buildUrl(baseUrl, page);
  }

  console.log('PAGE', page)
  
  useEffect(() => {
      if (!url || url.length === 0) return;
      const fetchData = async () => {
          setStatus('Loading');
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          setStatus('fetched');
      };

      fetchData();
  }, [url]);

  return { status, data };
};

export default useFetch;