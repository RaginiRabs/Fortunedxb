'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Alert, Chip } from '@mui/material';
import DataTable from '@/components/admin/DataTable';
import LoadingScreen from '@/components/admin/LoadingScreen';

const PROPERTY_TYPE_LABELS = {
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  villa: 'Villa',
  luxury_villa: 'Luxury Villa',
};

const LISTING_TYPE_LABELS = {
  off_plan: 'Off-Plan',
  ready: 'Ready',
};

const formatAED = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return 'AED ' + n.toLocaleString();
};

const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function SellerLeadsPage() {
  const router = useRouter();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [sortBy, setSortBy] = useState('seller_lead_id');
  const [sortOrder, setSortOrder] = useState('DESC');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, sortOrder, searchTerm]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: String(rowsPerPage),
        offset: String(page * rowsPerPage),
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/seller-leads?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setLeads(data.data);
        setTotal(Number.isFinite(data.total) ? data.total : 0);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch seller leads');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (lead) => {
    router.push(`/admin/seller-leads/${lead.seller_lead_id}`);
  };

  const handleRequestSort = (field) => {
    if (sortBy === field) {
      setSortOrder((o) => (o === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortBy(field);
      setSortOrder('ASC');
    }
    setPage(0);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(0);
  };

  const columns = [
    {
      field: 'full_name',
      headerName: 'Name',
      renderCell: (value) => (
        <Typography sx={{ fontWeight: 500 }}>{value}</Typography>
      ),
    },
    {
      field: 'phone',
      headerName: 'Phone',
      renderCell: (value, row) => {
        const ccode = row?.phone_ccode ? `${row.phone_ccode} ` : '';
        return value ? `${ccode}${value}` : '—';
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      renderCell: (value) => value || '—',
    },
    {
      field: 'property_type',
      headerName: 'Property',
      renderCell: (value) => PROPERTY_TYPE_LABELS[value] || '—',
    },
    {
      field: 'listing_type',
      headerName: 'Status',
      renderCell: (value) =>
        value ? (
          <Chip
            label={LISTING_TYPE_LABELS[value] || value}
            size="small"
            sx={{
              borderRadius: 0.5,
              bgcolor: value === 'ready' ? '#ECFDF5' : '#FEF3C7',
              color: value === 'ready' ? '#065F46' : '#92400E',
              fontSize: '0.7rem',
              height: 22,
            }}
          />
        ) : (
          '—'
        ),
    },
    {
      field: 'asking_price',
      headerName: 'Asking Price',
      renderCell: (value) => formatAED(value),
    },
    {
      field: 'submitted_at',
      headerName: 'Submitted',
      renderCell: (value) => formatDate(value),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
        >
          Seller Leads
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Property owner listing requests.
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 1 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <LoadingScreen message="Loading seller leads..." />
      ) : (
        <DataTable
          columns={columns}
          data={leads.map((l) => ({ ...l, id: l.seller_lead_id }))}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onRequestSort={handleRequestSort}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onView={handleView}
          searchable
          onSearch={handleSearch}
          searchTerm={searchTerm}
          searchPlaceholder="Search by name, email, phone, location or reference…"
          emptyTitle="No seller leads yet"
          emptyDescription="Submissions will appear here when someone completes the seller form."
        />
      )}
    </Box>
  );
}
