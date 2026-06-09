'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { SaveOutlined, ArrowBackOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

export default function UserForm({ userId = null }) {
  const router = useRouter();
  const isEdit = Boolean(userId);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_role: 'user',
    password: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();

      if (data.success) {
        setFormData({
          user_name: data.data.user_name || '',
          user_email: data.data.user_email || '',
          user_phone: data.data.user_phone || '',
          user_role: data.data.user_role || 'user',
          password: '', // Never show existing password
        });
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Failed to fetch user');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.user_name || !formData.user_email || !formData.user_role) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    // Password required for new user
    if (!isEdit && !formData.password) {
      setError('Password is required for new user');
      setLoading(false);
      return;
    }

    // Password required if reset checkbox is checked
    if (isEdit && resetPassword && !formData.password) {
      setError('Please enter new password');
      setLoading(false);
      return;
    }

    try {
      const url = isEdit ? `/api/users/${userId}` : '/api/users';
      const method = isEdit ? 'PUT' : 'POST';

      // Prepare data - only include password if provided
      const submitData = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        user_role: formData.user_role,
      };

      // Include password only for new user OR if reset checkbox is checked
      if (!isEdit || (isEdit && resetPassword && formData.password)) {
        submitData.password = formData.password;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          router.push('/admin/users');
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              required
              label="Full Name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="e.g., john@example.com"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="e.g., +971 58 233 5969"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="user_role"
                value={formData.user_role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Password Section */}
          {isEdit ? (
            <>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={resetPassword}
                      onChange={(e) => {
                        setResetPassword(e.target.checked);
                        if (!e.target.checked) {
                          setFormData({ ...formData, password: '' });
                        }
                      }}
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': { color: 'primary.main' },
                      }}
                    />
                  }
                  label="Reset Password"
                />
              </Grid>
              {resetPassword && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="New Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
            </>
          ) : (
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlined />}
            onClick={() => router.push('/admin/users')}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={loading ? null : <SaveOutlined />}
            disabled={loading}
            sx={{
              bgcolor: 'primary.main',
              color: 'common.white',
              px: 4,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'common.white' }} />
            ) : isEdit ? (
              'Update User'
            ) : (
              'Add User'
            )}
          </Button>
        </Box>
      </form>
    </Card>
  );
}