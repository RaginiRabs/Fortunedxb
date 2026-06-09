'use client';
import { use } from 'react';
import { Box } from '@mui/material';
import OfferForm from '@/components/admin/OfferForm';

export default function EditOfferPage({ params }) {
  const { id } = use(params);
  
  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <OfferForm offerId={id} />
      </Box>
    </Box>
  );
}