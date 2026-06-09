'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import DataTable from '@/components/admin/DataTable';
import LoadingScreen from '@/components/admin/LoadingScreen';

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, lead: null });
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [sortBy, setSortBy] = useState('lead_id');
  const [sortOrder, setSortOrder] = useState('DESC');

  useEffect(() => {
    fetchLeads();
  }, [page, rowsPerPage, sortBy, sortOrder]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/leads?limit=${rowsPerPage}&offset=${page * rowsPerPage}&sort_by=${sortBy}&sort_order=${sortOrder}`
      );
      const data = await res.json();

      if (data.success) {
        setLeads(data.data);
        setTotal(Number.isFinite(data.total) ? data.total : 0);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (lead) => {
    router.push(`/admin/leads/${lead.lead_id}`);
  };

  const handleDelete = (lead) => {
    setDeleteDialog({ open: true, lead });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/leads/${deleteDialog.lead.lead_id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setLeads(leads.filter((l) => l.lead_id !== deleteDialog.lead.lead_id));
        setDeleteDialog({ open: false, lead: null });
        setTotal(total - 1);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to delete lead');
    } finally {
      setDeleting(false);
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
      field: 'lead_name',
      headerName: 'Name',
      renderCell: (value) => (
        <Typography sx={{ fontWeight: 500 }}>{value}</Typography>
      ),
    },
    {
      field: 'lead_phone',
      headerName: 'Phone',
    },
    {
      field: 'lead_email',
      headerName: 'Email',
      renderCell: (value) => value || '-',
    },
    {
      field: 'project_name',
      headerName: 'Project',
    },
    {
      field: 'lead_source',
      headerName: 'Source',
      renderCell: (value) => (
        <Chip
          label={value || 'Direct'}
          size="small"
          sx={{ bgcolor: 'grey.100' }}
        />
      ),
    },
    {
      field: 'lead_date',
      headerName: 'Date',
      renderCell: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingScreen message="Loading leads..." />
        ) : (
          <DataTable
            columns={columns}
            data={leads.map((l) => ({ ...l, id: l.lead_id }))}
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onRequestSort={handleRequestSort}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            onView={handleView}
            onDelete={handleDelete}
            emptyTitle="No leads found"
            emptyDescription="Leads will appear here when someone inquires."
          />
        )}
      </Box>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, lead: null })}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete Lead</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete lead from <strong>{deleteDialog.lead?.lead_name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteDialog({ open: false, lead: null })}>
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