'use client';
import { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { SaveOutlined, Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

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
    if (!formData.current_password || !formData.new_password || !formData.confirm_password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      setError('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    if (formData.new_password.length < 6) {
      setError('New password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: formData.current_password,
          new_password: formData.new_password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setFormData({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>

      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Card
          elevation={0}
          sx={{ 
            p: 4, 
            borderRadius: 3, 
            border: '1px solid', 
            borderColor: 'grey.200',
            maxWidth: 500,
            width: '100%',
          }}
        >
          {/* Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LockOutlined sx={{ color: 'common.white', fontSize: 28 }} />
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Enter your current password and choose a new password
          </Typography>

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
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  type={showCurrentPassword ? 'text' : 'password'}
                  label="Current Password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  type={showNewPassword ? 'text' : 'password'}
                  label="New Password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  helperText="Minimum 6 characters"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm New Password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={loading ? null : <SaveOutlined />}
                disabled={loading}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  py: 1.5,
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'common.white' }} />
                ) : (
                  'Update Password'
                )}
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </Box>
  );
}