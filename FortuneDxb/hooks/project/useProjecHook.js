import { useState, useCallback } from 'react';
import api, { apiFormData } from '@/lib/axios';

/**
 * Custom hook for Project API operations
 * Provides CRUD operations with loading and error states
 */

// Fetch all projects - UPDATED to support all filters
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //UPDATED: Now accepts filters object instead of just developerId
  const fetchProjects = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Build params from filters object
      const params = {};
      
      // Support both old format (developerId) and new format (filters object)
      if (typeof filters === 'string' || typeof filters === 'number') {
        // Old format: fetchProjects(developerId)
        params.developer_id = filters;
      } else {
        // New format: fetchProjects({ search, status, developer, ... })
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            params[key] = value;
          }
        });
      }

      // console.log('Fetching projects with params:', params);

      const res = await api.get('/api/projects', { params });
      
      if (res.data.success) {
        setProjects(res.data.data);
        // console.log('Projects fetched:', res.data.data.length);
        if (res.data.filters_applied) {
          // console.log('Filters applied:', res.data.filters_applied);
        }
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Failed to fetch projects');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch projects';
      setError(errorMsg);
      console.error('Error fetching projects:', errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    refetch,
  };
}

// Fetch single project
export function useProject(projectId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async (id = projectId) => {
    if (!id) return null;
    
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/projects/${id}`);
      
      if (res.data.success) {
        setProject(res.data.data);
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Project not found');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch project';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  return {
    project,
    loading,
    error,
    fetchProject,
  };
}

// Create project mutation
export function useCreateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFormData.post('/api/projects', formData);
      
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: res.data.message || 'Project created successfully',
        };
      } else {
        throw new Error(res.data.message || 'Failed to create project');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create project';
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
    createProject,
    loading,
    error,
  };
}

// Update project mutation
export function useUpdateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProject = useCallback(async (projectId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFormData.put(`/api/projects/${projectId}`, formData);
      
      if (res.data.success) {
        return {
          success: true,
          message: res.data.message || 'Project updated successfully',
        };
      } else {
        throw new Error(res.data.message || 'Failed to update project');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update project';
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
    updateProject,
    loading,
    error,
  };
}

// Delete project mutation
export function useDeleteProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProject = useCallback(async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/api/projects/${projectId}`);
      
      if (res.data.success) {
        return {
          success: true,
          message: res.data.message || 'Project deleted successfully',
        };
      } else {
        throw new Error(res.data.message || 'Failed to delete project');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete project';
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
    deleteProject,
    loading,
    error,
  };
}

// Get next sequence for project code
export function useProjectSequence() {
  const [loading, setLoading] = useState(false);

  const getNextSequence = useCallback(async (year, city) => {
    setLoading(true);
    try {
      const res = await api.get('/api/projects/next-sequence', {
        params: { year, city }
      });
      
      if (res.data.success) {
        return res.data.sequence;
      }
      return 1;
    } catch (err) {
      console.error('Failed to get sequence:', err);
      return 1;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getNextSequence,
    loading,
  };
}

export function useFeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 1,
    per_page: 8,
    total_pages: 0,
    has_next: false,
    has_prev: false,
  });

  const fetchFeaturedProjects = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Build params
      const params = {};
      
      // Extract filters
      const { status, limit = 8, offset = 0 } = filters;
      
      if (status) params.status = status;
      params.limit = limit;
      params.offset = offset;

      const res = await api.get('/api/projects/is-featured', { params });
      
      if (res.data.success) {
        setFeaturedProjects(res.data.data);
        setPagination(res.data.pagination || pagination);
        return res.data.data;
      } else {
        throw new Error(res.data.message || 'Failed to fetch featured projects');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch featured projects';
      setError(errorMsg);
      console.error('Error fetching featured projects:', errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    featuredProjects,
    loading,
    error,
    pagination,
    fetchFeaturedProjects,
  };
}


// Combined hook with all operations
export default function useProjectHook() {
  const projectsHook = useProjects();
  const createHook = useCreateProject();
  const updateHook = useUpdateProject();
  const deleteHook = useDeleteProject();
  const sequenceHook = useProjectSequence();
  const featuredHook = useFeaturedProjects();

  return {
    // List operations
    projects: projectsHook.projects,
    fetchProjects: projectsHook.fetchProjects,
    projectsLoading: projectsHook.loading,
    projectsError: projectsHook.error,
    refetchProjects: projectsHook.refetch,

    // Featured operations - ADD THIS SECTION
    featuredProjects: featuredHook.featuredProjects,
    fetchFeaturedProjects: featuredHook.fetchFeaturedProjects,
    featuredLoading: featuredHook.loading,
    featuredError: featuredHook.error,
    featuredPagination: featuredHook.pagination,

    // Create operations
    createProject: createHook.createProject,
    createLoading: createHook.loading,
    createError: createHook.error,

    // Update operations
    updateProject: updateHook.updateProject,
    updateLoading: updateHook.loading,
    updateError: updateHook.error,

    // Delete operations
    deleteProject: deleteHook.deleteProject,
    deleteLoading: deleteHook.loading,
    deleteError: deleteHook.error,

    // Sequence
    getNextSequence: sequenceHook.getNextSequence,
  };
}