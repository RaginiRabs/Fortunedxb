'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import DataTable from '@/components/admin/DataTable';
import LoadingScreen from '@/components/admin/LoadingScreen';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [sortBy, setSortBy] = useState('user_id');
  const [sortOrder, setSortOrder] = useState('DESC');

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/users?limit=${rowsPerPage}&offset=${page * rowsPerPage}&sort_by=${sortBy}&sort_order=${sortOrder}`
      );
      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
        setTotal(Number.isFinite(data.total) ? data.total : 0);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch users');
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

  const handleEdit = (user) => {
    router.push(`/admin/users/${user.user_id}`);
  };

  const handleDelete = (user) => {
    setDeleteDialog({ open: true, user });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${deleteDialog.user.user_id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setUsers(users.filter((u) => u.user_id !== deleteDialog.user.user_id));
        setDeleteDialog({ open: false, user: null });
        setTotal(total - 1);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      field: 'user_name',
      headerName: 'Name',
      renderCell: (value) => (
        <Typography sx={{ fontWeight: 500 }}>{value}</Typography>
      ),
    },
    {
      field: 'user_email',
      headerName: 'Email',
    },
    {
      field: 'user_phone',
      headerName: 'Phone',
      renderCell: (value) => value || '-',
    },
    {
      field: 'user_role',
      headerName: 'Role',
      renderCell: (value) => (
        <Chip
          label={value?.charAt(0).toUpperCase() + value?.slice(1)}
          size="small"
          sx={{
            bgcolor: value === 'admin' ? 'primary.main' : 'grey.200',
            color: value === 'admin' ? 'common.white' : 'text.primary',
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: 'created_at',
      headerName: 'Created',
      renderCell: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={() => router.push('/admin/users/add')}
            sx={{
              bgcolor: 'primary.main',
              color: 'common.white',
              px: 3,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Add User
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingScreen message="Loading users..." />
        ) : (
          <DataTable
            columns={columns}
            data={users.map((u) => ({ ...u, id: u.user_id }))}
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onRequestSort={handleRequestSort}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyTitle="No users found"
            emptyDescription="Get started by adding your first user."
            emptyActionLabel="Add User"
            onEmptyAction={() => router.push('/admin/users/add')}
          />
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, user: null })}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteDialog.user?.user_name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteDialog({ open: false, user: null })}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            disabled={deleting}
            sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
          >
            {deleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}