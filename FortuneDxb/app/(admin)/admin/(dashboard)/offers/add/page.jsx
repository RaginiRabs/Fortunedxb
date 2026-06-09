'use client';
import { Box } from '@mui/material';
import OfferForm from '@/components/admin/OfferForm';

export default function AddOfferPage() {
  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <OfferForm />
      </Box>
    </Box>
  );
}