'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    Button,
    Typography,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Snackbar,
    CircularProgress,
    IconButton,
    useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
    AddOutlined,
    CloseOutlined,
    FormatQuoteOutlined,
    EditOutlined,
} from '@mui/icons-material';
import { Star, Building2 } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import LoadingScreen from '@/components/admin/LoadingScreen';
import useTestimonialsHook from '@/hooks/testimonial/useTestimonialsHook';

export default function TestimonialsPage() {
    const router = useRouter();
    const theme = useTheme();

    const {
        testimonials,
        total: hookTotal,
        fetchTestimonials,
        testimonialsLoading,
        testimonialsError,
        deleteTestimonial,
        deleteLoading,
    } = useTestimonialsHook();

    // Pagination and sorting state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState('testimonial_id');
    const [sortOrder, setSortOrder] = useState('DESC');

    // Local state
    const [viewModalOpen, setViewModalOpen] = useState(false);

    // Update total when hook returns it
    useEffect(() => {
        setTotal(hookTotal);
    }, [hookTotal]);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Fetch testimonials on mount and when pagination/sorting changes
    useEffect(() => {
        fetchTestimonials({
            active: 'all',
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            sort_by: sortBy,
            sort_order: sortOrder,
        });
    }, [page, rowsPerPage, sortBy, sortOrder, fetchTestimonials]);

    // Get image path
    const getImagePath = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return path.startsWith('/') ? path : `/${path}`;
    };

    // Handle add
    const handleAdd = () => {
        router.push('/admin/testimonials/add');
    };

    // Handle edit
    const handleEdit = (testimonial) => {
        router.push(`/admin/testimonials/edit/${testimonial.testimonial_id}`);
    };

    // Handle view
    const handleView = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setViewModalOpen(true);
    };

    // Handle delete click
    const handleDeleteClick = (testimonial) => {
        setTestimonialToDelete(testimonial);
        setDeleteDialogOpen(true);
    };

    // Handle delete confirm
    const handleDeleteConfirm = async () => {
        if (!testimonialToDelete) return;

        const result = await deleteTestimonial(testimonialToDelete.testimonial_id);

        if (result.success) {
            setSnackbar({
                open: true,
                message: 'Testimonial deleted successfully!',
                severity: 'success',
            });
            setTotal(total - 1);
            fetchTestimonials({
                active: 'all',
                limit: rowsPerPage,
                offset: page * rowsPerPage,
                sort_by: sortBy,
                sort_order: sortOrder,
            });
        } else {
            setSnackbar({
                open: true,
                message: result.error || 'Failed to delete testimonial',
                severity: 'error',
            });
        }

        setDeleteDialogOpen(false);
        setTestimonialToDelete(null);
    };

    const handleRequestSort = (field) => {
        const isAsc = sortBy === field && sortOrder === 'ASC';
        setSortBy(field);
        setSortOrder(isAsc ? 'DESC' : 'ASC');
        setPage(0);
    };

    // Table columns
    const columns = [
        {
            field: 'client_image',
            headerName: 'Image',
            sortable: false,
            renderCell: (value, row) => (
                <Avatar
                    src={getImagePath(value)}
                    sx={{ width: 40, height: 40, bgcolor: 'gold.main' }}
                >
                    {row.client_name?.charAt(0)}
                </Avatar>
            ),
        },
        {
            field: 'client_name',
            headerName: 'Client Name',
            renderCell: (value, row) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {value}
                    </Typography>
                    {row.client_designation && (
                        <Typography variant="caption" color="text.secondary">
                            {row.client_designation}
                        </Typography>
                    )}
                </Box>
            ),
        },
        {
            field: 'client_location',
            headerName: 'Location',
        },
        {
            field: 'rating',
            headerName: 'Rating',
            renderCell: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            fill={i < value ? theme.palette.warning.main : 'transparent'}
                            color={theme.palette.warning.main}
                        />
                    ))}
                </Box>
            ),
        },
        {
            field: 'is_featured',
            headerName: 'Featured',
            renderCell: (value) => (
                <Chip
                    label={value === 1 ? 'Yes' : 'No'}
                    size="small"
                    color={value === 1 ? 'primary' : 'default'}
                    sx={{ fontSize: '0.7rem' }}
                />
            ),
        },
        {
            field: 'is_active',
            headerName: 'Status',
            renderCell: (value) => (
                <Chip
                    label={value === 1 ? 'Active' : 'Inactive'}
                    size="small"
                    color={value === 1 ? 'success' : 'default'}
                    sx={{ fontSize: '0.7rem' }}
                />
            ),
        },
    ];

    return (
        <Box>
            {/* Add Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    onClick={() => router.push('/admin/testimonials/add')}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        px: 3,
                        '&:hover': { bgcolor: 'primary.dark' },
                    }}
                >
                    Add Testimonial
                </Button>
            </Box>

            {/* Error Alert */}
            {testimonialsError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {testimonialsError}
                </Alert>
            )}

            {/* Data Table */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    overflow: 'hidden',
                }}
            >
                {testimonialsLoading ? (
                    <LoadingScreen message="Loading testimonials..." />
                ) : (
                    <DataTable
                        columns={columns}
                        data={testimonials.map((t) => ({ ...t, id: t.testimonial_id }))}
                        total={total}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onRequestSort={handleRequestSort}
                        onPageChange={setPage}
                        onRowsPerPageChange={setRowsPerPage}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        emptyTitle="No testimonials yet"
                        emptyDescription="Add your first client testimonial to showcase on your website."
                        emptyActionLabel="Add Testimonial"
                        onEmptyAction={handleAdd}
                    />
                )}
            </Card>

            {/* View Modal */}
            <Dialog
                open={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        overflow: 'hidden',
                    },
                }}
            >
                <DialogContent sx={{ p: 0 }}>
                    {selectedTestimonial && (
                        <Box sx={{ p: 3 }}>
                            {/* Close Button */}
                            <IconButton
                                onClick={() => setViewModalOpen(false)}
                                sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    color: 'text.disabled',
                                    '&:hover': { bgcolor: 'grey.100' }
                                }}
                            >
                                <CloseOutlined />
                            </IconButton>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
                                <Box>
                                    {/* Client Info - start */}
                                    <Box sx={{ textAlign: 'initial', mb: 3 }}>
                                        <Avatar
                                            src={getImagePath(selectedTestimonial.client_image)}
                                            sx={{
                                                width: 72,
                                                height: 72,
                                                bgcolor: 'navy.main',
                                                fontSize: '1.5rem',
                                                fontWeight: 600,
                                                mx: 'auto',
                                                mb: 1.5,
                                            }}
                                        >
                                            {selectedTestimonial.client_name?.charAt(0)}
                                        </Avatar>
                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'text.primary' }}>
                                            {selectedTestimonial.client_name}
                                        </Typography>
                                        {selectedTestimonial.client_designation && (
                                            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mt: 0.25 }}>
                                                {selectedTestimonial.client_designation}
                                            </Typography>
                                        )}
                                        {selectedTestimonial.client_location && (
                                            <Typography sx={{ fontSize: '0.8rem', color: 'text.disabled', mt: 0.25 }}>
                                                {selectedTestimonial.client_location}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Rating - start */}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 0.5, mb: 3 }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                fill={i < selectedTestimonial.rating ? theme.palette.warning.main : theme.palette.divider}
                                                color={i < selectedTestimonial.rating ? theme.palette.warning.main : theme.palette.divider}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                                {/* Review Text */}
                                <Box sx={{
                                    bgcolor: 'background.subtle',
                                    borderRadius: 2,
                                    p: 2.5,
                                    mb: 2.5,
                                }}>
                                    <Typography sx={{
                                        fontSize: '0.95rem',
                                        lineHeight: 1.8,
                                        color: 'grey.600',
                                        textAlign: 'center',
                                        fontStyle: 'italic',
                                    }}>
                                        "{selectedTestimonial.review_text}"
                                    </Typography>
                                </Box>
                            </Box>
                            {/* Status + Project Row */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {selectedTestimonial.is_featured === 1 && (
                                        <Chip
                                            label="Featured"
                                            size="small"
                                            sx={{
                                                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.15),
                                                color: 'warning.dark',
                                                fontWeight: 500,
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    )}
                                    <Chip
                                        label={selectedTestimonial.is_active === 1 ? 'Active' : 'Inactive'}
                                        size="small"
                                        sx={{
                                            bgcolor: (theme) => selectedTestimonial.is_active === 1 ? alpha(theme.palette.success.main, 0.12) : theme.palette.grey[100],
                                            color: selectedTestimonial.is_active === 1 ? 'success.main' : 'text.secondary',
                                            fontWeight: 500,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                </Box>

                                {selectedTestimonial.project_name && (
                                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                                        Project: <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>{selectedTestimonial.project_name}</Box>
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600 }}>Delete Testimonial</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete the testimonial from{' '}
                        <strong>{testimonialToDelete?.client_name}</strong>? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: 'text.secondary' }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? <CircularProgress size={20} sx={{ color: 'common.white' }} /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ borderRadius: 2 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}