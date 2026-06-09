import { useState, useCallback } from 'react';
import api from '@/lib/axios';

/**
 * Custom hook for fetching filter options (localities, highlights)
 */
export function useFilters() {
  const [localities, setLocalities] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFilters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/filters');

      if (res.data.success) {
        setLocalities(res.data.data.localities || []);
        setHighlights(res.data.data.highlights || []);
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Failed to fetch filters');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch filters';
      setError(errorMsg);
      return { localities: [], highlights: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    localities,
    highlights,
    loading,
    error,
    fetchFilters,
  };
}

export default useFilters;