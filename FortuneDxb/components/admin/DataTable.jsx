'use client';
import { useState, useEffect } from 'react';
import {
  Table,
  alpha,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Tooltip,
  TablePagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  EditOutlined,
  VisibilityOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@mui/icons-material';
import EmptyState from './EmptyState';

export default function DataTable({
  columns,
  data,
  total,
  page,
  rowsPerPage,
  sortBy,
  sortOrder,
  onRequestSort,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  // Search (optional — pass onSearch to enable the search bar)
  searchable = false,
  onSearch,
  searchPlaceholder = 'Search…',
  searchTerm = '',
  // Empty state
  emptyTitle = 'No data found',
  emptyDescription = 'Get started by creating a new item.',
  emptyActionLabel = 'Add New',
  onEmptyAction = null,
}) {
  const hasActions = onView || onEdit;

  // Add Sr. No. as fixed column
  const enhancedColumns = [
    { field: 'serial', headerName: 'Sr. No.', width: 70, sortable: false },
    ...columns,
  ];

  // ─── Debounced search ──────────────────────────────────
  const showSearch = searchable && typeof onSearch === 'function';
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (!showSearch) return;
    const t = setTimeout(() => {
      onSearch(searchInput.trim());
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, showSearch]);

  const searchBar = showSearch ? (
    <Box
      sx={{
        px: 2.5,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder={searchPlaceholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{
          maxWidth: { md: 520 },
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& fieldset': { borderColor: 'divider' },
            '&:hover fieldset': { borderColor: 'grey.300' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined sx={{ color: 'text.disabled', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchInput ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearchInput('')}
                sx={{ color: 'text.disabled' }}
              >
                <CloseOutlined sx={{ fontSize: 16 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  ) : null;

  // ─── Empty state ───────────────────────────────────────
  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {searchBar}
        <Box sx={{ p: 2 }}>
          <EmptyState
            title={searchTerm ? 'No matching results' : emptyTitle}
            description={
              searchTerm
                ? `No records match "${searchTerm}". Try a different term.`
                : emptyDescription
            }
            actionLabel={emptyActionLabel}
            onAction={onEmptyAction}
            showAction={!searchTerm && Boolean(onEmptyAction)}
          />
        </Box>
      </Paper>
    );
  }

  const from = total === 0 ? 0 : page * rowsPerPage + 1;
  const to = total === 0 ? 0 : Math.min(total, page * rowsPerPage + data.length);

  // ─── Header cell styles ────────────────────────────────
  const isActiveSort = (field) => sortBy === field;

  const sortableHeaderSx = (field) => ({
    bgcolor: isActiveSort(field)
      ? (theme) => alpha(theme.palette.gold.main, 0.12)
      : 'grey.100',
    fontWeight: 600,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: isActiveSort(field) ? 'primary.main' : 'inherit',
    py: 2,
    whiteSpace: 'nowrap',
    borderBottom: '2px solid',
    borderBottomColor: isActiveSort(field) ? 'primary.main' : 'divider',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.15s, color 0.15s',
    '&:hover': {
      bgcolor: isActiveSort(field)
        ? (theme) => alpha(theme.palette.gold.main, 0.22)
        : 'grey.200',
    },
  });

  const staticHeaderSx = {
    bgcolor: 'grey.100',
    fontWeight: 600,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    py: 2,
    whiteSpace: 'nowrap',
    borderBottom: '2px solid',
    borderBottomColor: 'divider',
  };

  const SortIndicator = ({ field }) =>
    isActiveSort(field) ? (
      <Box
        component="span"
        sx={{
          ml: 0.5,
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'primary.main',
        }}
      >
        {String(sortOrder).toUpperCase() === 'ASC' ? '↑' : '↓'}
      </Box>
    ) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Search bar (if enabled) */}
      {searchBar}

      {/* Showing info */}
      <Box
        sx={{
          px: 3,
          py: 1.5,
          bgcolor: 'grey.50',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> records
          {searchTerm && (
            <>
              {' '}
              matching{' '}
              <Box component="b" sx={{ color: 'primary.main' }}>
                "{searchTerm}"
              </Box>
            </>
          )}
        </Typography>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {enhancedColumns.map((col) => {
                const isSortable =
                  col.sortable !== false && typeof onRequestSort === 'function';
                return (
                  <TableCell
                    key={col.field}
                    sx={{
                      ...(isSortable ? sortableHeaderSx(col.field) : staticHeaderSx),
                      width: col.width,
                    }}
                    onClick={isSortable ? () => onRequestSort(col.field) : undefined}
                  >
                    {col.headerName}
                    {isSortable && <SortIndicator field={col.field} />}
                  </TableCell>
                );
              })}
              {hasActions && (
                <TableCell align="center" sx={staticHeaderSx}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  '&:last-child td': { border: 0 },
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50',
                }}
              >
                {/* Sr. No. */}
                <TableCell sx={{ py: 2.5, fontWeight: 500 }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>

                {/* Other columns */}
                {columns.map((col) => {
                  const rawValue = row[col.field];
                  const rendered = col.renderCell
                    ? col.renderCell(rawValue, row)
                    : rawValue || '-';
                  const tooltipText =
                    rawValue !== null && rawValue !== undefined && rawValue !== ''
                      ? String(rawValue)
                      : '';
                  return (
                    <TableCell key={col.field} sx={{ py: 2.5 }}>
                      {tooltipText ? (
                        <Tooltip title={tooltipText} placement="top" arrow>
                          <Box component="span" sx={{ display: 'inline-block' }}>
                            {rendered}
                          </Box>
                        </Tooltip>
                      ) : (
                        rendered
                      )}
                    </TableCell>
                  );
                })}

                {/* Actions */}
                {hasActions && (
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {onView && (
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            onClick={() => onView(row)}
                            sx={{
                              bgcolor: 'grey.100',
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'primary.main', color: 'common.white' },
                            }}
                          >
                            <VisibilityOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(row)}
                            sx={{
                              bgcolor: 'grey.100',
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'primary.main', color: 'common.white' },
                            }}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={total === 0 ? 0 : page}
        onPageChange={(e, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => {
          onRowsPerPageChange(parseInt(e.target.value, 10));
          onPageChange(0);
        }}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          '& .MuiTablePagination-displayedRows': { fontWeight: 500 },
        }}
      />
    </Paper>
  );
}
