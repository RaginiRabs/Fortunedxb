'use client';
import { useState, useEffect, useCallback } from 'react';
import useToast from '@/hooks/useToast';

export default function useAdminTable({
  endpoint,
  dataKey = 'data',
  defaultSortBy,
  defaultSortOrder = 'DESC',
  defaultRowsPerPage = 10,
  errorLabel = 'data',
  extraParams = '',
}) {
  const toast = useToast();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const url =
        `${endpoint}?limit=${rowsPerPage}` +
        `&offset=${page * rowsPerPage}` +
        (sortBy ? `&sort_by=${sortBy}&sort_order=${sortOrder}` : '') +
        (extraParams ? `&${extraParams}` : '');
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setRows(data[dataKey] || []);
        setTotal(Number.isFinite(data.total) ? data.total : 0);
      } else {
        toast.error(data.message || `Failed to fetch ${errorLabel}`);
      }
    } catch {
      toast.error(`Failed to fetch ${errorLabel}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint, dataKey, page, rowsPerPage, sortBy, sortOrder, extraParams, errorLabel, toast]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const requestSort = useCallback(
    (field) => {
      const isAsc = sortBy === field && sortOrder === 'ASC';
      setSortBy(field);
      setSortOrder(isAsc ? 'DESC' : 'ASC');
      setPage(0);
    },
    [sortBy, sortOrder]
  );

  return {
    rows,
    setRows,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    total,
    sortBy,
    sortOrder,
    requestSort,
    refetch: fetchRows,
  };
}
