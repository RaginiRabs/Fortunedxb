'use client';
import { Box } from '@mui/material';
import UserForm from '@/components/admin/UserForm';

export default function AddUserPage() {
  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <UserForm />
      </Box>
    </Box>
  );
}