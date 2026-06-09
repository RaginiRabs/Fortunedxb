import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/axios';

/**
 * Custom hook to fetch and manage current logged-in user data
 */
export default function useUserHook() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/auth/me');

      if (res.data.success) {
        setUser(res.data.data);
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Failed to fetch user');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch user';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Fetch user on mount
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return {
    user,
    loading,
    error,
    fetchCurrentUser,
    refetch,
  };
}