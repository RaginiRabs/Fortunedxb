'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import DataTable from '@/components/admin/DataTable';
import LoadingScreen from '@/components/admin/LoadingScreen';
import useToast from '@/hooks/useToast';

const statusColors = {
  'New Launch': { bg: '#E3F2FD', color: '#1565C0' },
  'Under Construction': { bg: '#FFF3E0', color: '#E65100' },
  'Ready': { bg: '#E8F5E9', color: '#2E7D32' },
};

export default function ProjectsPage() {
  const router = useRouter();
  const toast = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [sortBy, setSortBy] = useState('project_id');
  const [sortOrder, setSortOrder] = useState('DESC');

  useEffect(() => {
    fetchProjects();
  }, [page, rowsPerPage, sortBy, sortOrder]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/projects?limit=${rowsPerPage}&offset=${page * rowsPerPage}&sort_by=${sortBy}&sort_order=${sortOrder}`
      );
      const data = await res.json();

      if (data.success) {
        setProjects(data.data);
       setTotal(Number.isFinite(data.total) ? data.total : 0);
      } else {
        toast.error(data.message || 'Failed to fetch projects');
      }
    } catch {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (field) => {
    const isAsc = sortBy === field && sortOrder === 'ASC';
    setSortBy(field);
    setSortOrder(isAsc ? 'DESC' : 'ASC');
    setPage(0);
  };

const columns = [
    {
      field: 'project_id',
      headerName: 'Project ID',
      width: 110,
    },
    {
      field: 'project_name',
      headerName: 'Project Name',
      renderCell: (value, row) => (
        <Box>
          <Typography fontWeight={500}>{value}</Typography>
          <Typography variant="caption" color="text.secondary">
            {row.locality ? `${row.locality}, ` : ''}
            {row.city || 'Dubai'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'developer_name',
      headerName: 'Developer',
    },
    {
      field: 'project_status',
      headerName: 'Status',
      renderCell: (value) => {
        const style = statusColors[value];
        return value ? (
          <Chip
            label={value}
            size="small"
            sx={{ bgcolor: style?.bg, color: style?.color }}
          />
        ) : '-';
      },
    },
    {
      field: 'usage_type',
      headerName: 'Type',
    },
    {
      field: 'featured',
      headerName: 'Featured',
      renderCell: (value) => (
        <Chip
          label={value ? 'Yes' : 'No'}
          size="small"
          sx={{
            bgcolor: value ? 'primary.main' : 'grey.200',
            color: value ? 'common.white' : 'text.secondary',
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => router.push('/admin/projects/add')}
        >
          Add Project
        </Button>
      </Box>

      {loading ? (
        <LoadingScreen message="Loading projects..." />
      ) : (
        <DataTable
          columns={columns}
          data={projects.map(p => ({ ...p, id: p.project_id }))}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onRequestSort={handleRequestSort}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onView={(row) => router.push(`/admin/projects/view/${row.project_id}`)}
          onEdit={(row) => router.push(`/admin/projects/edit/${row.project_id}/basic`)}
          emptyTitle="No projects found"
          emptyDescription="Start by adding your first project."
          emptyActionLabel="Add Project"
          onEmptyAction={() => router.push('/admin/projects/add')}
        />
      )}
    </>
  );
}
