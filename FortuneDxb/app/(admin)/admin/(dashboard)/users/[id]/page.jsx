'use client';
import { use } from 'react';
import { Box } from '@mui/material';
import UserForm from '@/components/admin/UserForm';

export default function EditUserPage({ params }) {
  const { id } = use(params);
  
  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <UserForm userId={id} />
      </Box>
    </Box>
  );
}