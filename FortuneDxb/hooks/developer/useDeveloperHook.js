import { useState, useCallback } from 'react';
import api, { apiFormData } from '@/lib/axios';

/**
 * Create slug from developer name and ID
 * ("Emaar Properties", 5) → "emaar-properties-5"
 */
export const createDeveloperSlug = (name, id) => {
  if (!name || !id) return '';
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug}-${id}`;
};

// ============ FETCH ALL DEVELOPERS ============
export function useDevelopers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDevelopers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/developers/all');
      
      if (res.data.success) {
        setDevelopers(res.data.data);
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Failed to fetch developers');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch developers';
      setError(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchDevelopers();
  }, [fetchDevelopers]);

  return {
    developers,
    loading,
    error,
    fetchDevelopers,
    refetch,
  };
}

// ============ FETCH SINGLE DEVELOPER WITH PROJECTS ============
export function useDeveloper(slugOrId) {
  const [developer, setDeveloper] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeveloper = useCallback(async (idOrSlug = slugOrId) => {
    if (!idOrSlug) return null;
    
    setLoading(true);
    setError(null);
    try {
      // API accepts both slug and ID - extraction happens on backend
      const res = await api.get(`/api/developers/${idOrSlug}`);
      
      if (res.data.success) {
        const data = res.data.data;
        setDeveloper(data);
        setProjects(data.projects || []);
        return data;
      } else {
        throw new Error(res.data.message || 'Developer not found');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch developer';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [slugOrId]);

  return {
    developer,
    projects,
    loading,
    error,
    fetchDeveloper,
  };
}

// ============ CREATE DEVELOPER ============
export function useCreateDeveloper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createDeveloper = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFormData.post('/api/developers', formData);
      
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: res.data.message || 'Developer created successfully',
        };
      } else {
        throw new Error(res.data.message || 'Failed to create developer');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create developer';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg,
        fields: err.response?.data?.error?.fields || {},
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createDeveloper,
    loading,
    error,
  };
}

// ============ UPDATE DEVELOPER ============
export function useUpdateDeveloper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDeveloper = useCallback(async (developerId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFormData.put(`/api/developers/${developerId}`, formData);
      
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: res.data.message || 'Developer updated successfully',
        };
      } else {
        throw new Error(res.data.message || 'Failed to update developer');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update developer';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg,
        fields: err.response?.data?.error?.fields || {},
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateDeveloper,
    loading,
    error,
  };
}

// ============ DELETE DEVELOPER ============
export function useDeleteDeveloper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDeveloper = useCallback(async (developerId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/api/developers/${developerId}`);
      
      if (res.data.success) {
        return {
          success: true,
          message: res.data.message || 'Developer deleted successfully',
        };
      } else {
        throw new Error(res.data.message || 'Failed to delete developer');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete developer';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteDeveloper,
    loading,
    error,
  };
}

// ============ FETCH VERIFIED DEVELOPERS ============
export function useVerifiedDevelopers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVerifiedDevelopers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/developers/verified');
      
      if (res.data.success) {
        setDevelopers(res.data.data);
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Failed to fetch verified developers');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch verified developers';
      setError(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    developers,
    loading,
    error,
    fetchVerifiedDevelopers,
  };
}

// ============ COMBINED HOOK ============
export default function useDeveloperHook() {
  const developersHook = useDevelopers();
  const createHook = useCreateDeveloper();
  const updateHook = useUpdateDeveloper();
  const deleteHook = useDeleteDeveloper();

  return {
    // List operations
    developers: developersHook.developers,
    fetchDevelopers: developersHook.fetchDevelopers,
    developersLoading: developersHook.loading,
    developersError: developersHook.error,
    refetchDevelopers: developersHook.refetch,

    // Create operations
    createDeveloper: createHook.createDeveloper,
    createLoading: createHook.loading,
    createError: createHook.error,

    // Update operations
    updateDeveloper: updateHook.updateDeveloper,
    updateLoading: updateHook.loading,
    updateError: updateHook.error,

    // Delete operations
    deleteDeveloper: deleteHook.deleteDeveloper,
    deleteLoading: deleteHook.loading,
    deleteError: deleteHook.error,
  };
}