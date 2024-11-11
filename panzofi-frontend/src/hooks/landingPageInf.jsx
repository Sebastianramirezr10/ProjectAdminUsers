// src/hooks/useLandingPageInfo.js
import { useState, useEffect } from 'react';
import { getLandingPageInfo } from '../services/api';

const useLandingPageInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLandingPageInfo = async () => {
      try {
        //trae la informacion y la almacena en data
        const data = await getLandingPageInfo();
        setData(data);
        //console.log(data)

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPageInfo();
  }, []);

  return { data, loading, error };
};

export default useLandingPageInfo;
