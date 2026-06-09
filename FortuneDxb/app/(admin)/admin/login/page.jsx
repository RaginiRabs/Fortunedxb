'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Grid,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
} from '@mui/icons-material';
import Image from 'next/image';

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function AdminLogin() {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (data.success) {
          router.push('/admin/dashboard');
        } else {
          setServerError(data.message || 'Invalid email or password');
        }
      } catch (err) {
        setServerError('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        // Hide scrollbar
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {/* Full Bleed Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/asset/placeholderproject.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.navy.main, 0.92)} 0%, ${alpha(theme.palette.navy.main, 0.85)} 50%, ${alpha(theme.palette.navy.main, 0.92)} 100%)`,
          zIndex: 1,
        }}
      />

      {/* Main Card */}
      <Card
        elevation={0}
        sx={{
          position: 'relative',
          zIndex: 2,
          width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 48px)', md: '100%' },
          maxWidth: { xs: 420, md: 900 },
          maxHeight: { xs: 'calc(100vh - 32px)', md: 'calc(100vh - 64px)' },
          borderRadius: { xs: 2, md: 3 },
          overflow: 'hidden',
          boxShadow: `0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(theme.palette.gold.main, 0.1)}`,
        }}
      >
        <Grid container sx={{ height: '100%' }}>
          {/* ============ LEFT SIDE - Image & Logo (Desktop Only) ============ */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <Box
              sx={{
                height: '100%',
                minHeight: { md: 480, lg: 520 },
                position: 'relative',
                backgroundImage: 'url(/asset/placeholderproject.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, ${alpha(theme.palette.navy.main, 0.8)} 0%, ${alpha(theme.palette.navy.main, 0.6)} 50%, ${alpha(theme.palette.navy.main, 0.9)} 100%)`,
                }}
              />

              {/* Logo & Content */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: 3,
                  py: 4,
                }}
              >
                {/* Logo */}
                <Box
                  sx={{
                    width: { md: 140, lg: 160 },
                    height: { md: 60, lg: 70 },
                    position: 'relative',
                    mb: 2,
                  }}
                >
                  <Image
                    src="/asset/logo.png"
                    alt="Fortune DXB Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>

                {/* Tagline */}
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: { md: '1.25rem', lg: '1.5rem' },
                    fontWeight: 600,
                    fontStyle: 'italic',
                    textAlign: 'center',
                    color: 'common.white',
                    mb: 1.5,
                    lineHeight: 1.3,
                  }}
                >
                  Luxury Real Estate,{' '}
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Redefined
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    color: alpha(theme.palette.common.white, 0.7),
                    fontSize: { md: '0.8rem', lg: '0.875rem' },
                    textAlign: 'center',
                    maxWidth: 260,
                    lineHeight: 1.5,
                  }}
                >
                  Manage your premium property portfolio with our admin dashboard
                </Typography>

                {/* Stats */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: { md: 3, lg: 4 },
                    mt: 'auto',
                    pt: 3,
                  }}
                >
                  {[
                    { num: '500+', label: 'Properties' },
                    { num: '50+', label: 'Developers' },
                    { num: '1000+', label: 'Clients' },
                  ].map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Typography
                        sx={{
                          color: 'gold.main',
                          fontSize: { md: '1rem', lg: '1.25rem' },
                          fontWeight: 700,
                        }}
                      >
                        {stat.num}
                      </Typography>
                      <Typography
                        sx={{
                          color: alpha(theme.palette.common.white, 0.6),
                          fontSize: '0.65rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* ============ RIGHT SIDE - Login Form ============ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: 'navy.main',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: { xs: 3, sm: 4 },
                py: { xs: 3, sm: 4 },
              }}
            >
              {/* Mobile Logo */}
              <Box
                sx={{
                  display: { xs: 'block', md: 'none' },
                  width: 100,
                  height: 45,
                  position: 'relative',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Image
                  src="/asset/logo.png"
                  alt="Fortune DXB Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>

              {/* Header */}
              <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
                <Typography
                  sx={{
                    color: 'gold.main',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 0.5,
                  }}
                >
                  ADMIN PANEL
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'common.white',
                    fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.65rem' },
                    mb: 0.5,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  sx={{
                    color: 'text.disabled',
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  }}
                >
                  Sign in to manage your properties and leads
                </Typography>
              </Box>

              {/* Server Error Alert */}
              {serverError && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    py: 0.5,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: 'error.main',
                    '& .MuiAlert-icon': {
                      color: 'error.main',
                    },
                  }}
                >
                  {serverError}
                </Alert>
              )}

              {/* Login Form */}
              <form onSubmit={formik.handleSubmit} noValidate>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  size="small"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.subtle',
                      boxShadow: `0 2px 8px ${alpha(theme.palette.gold.main, 0.15)}`,
                      '& fieldset': {
                        borderColor: alpha(theme.palette.gold.main, 0.6),
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'gold.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'gold.main',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'text.primary',
                      py: { xs: 1.25, sm: 1.5 },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'gold.main',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined
                          sx={{
                            color: formik.touched.email && formik.errors.email
                              ? 'error.main'
                              : 'text.secondary',
                            fontSize: { xs: 18, sm: 20 },
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  size="small"
                  sx={{
                    mb: { xs: 2.5, sm: 3 },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.subtle',
                      boxShadow: `0 2px 8px ${alpha(theme.palette.gold.main, 0.15)}`,
                      '& fieldset': {
                        borderColor: alpha(theme.palette.gold.main, 0.6),
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'gold.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'gold.main',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'text.primary',
                      py: { xs: 1.25, sm: 1.5 },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'gold.main',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined
                          sx={{
                            color: formik.touched.password && formik.errors.password
                              ? 'error.main'
                              : 'text.secondary',
                            fontSize: { xs: 18, sm: 20 },
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ fontSize: { xs: 18, sm: 20 }, color: 'text.secondary' }} />
                          ) : (
                            <Visibility sx={{ fontSize: { xs: 18, sm: 20 }, color: 'text.secondary' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={formik.isSubmitting || !formik.isValid}
                  sx={{
                    py: { xs: 1.25, sm: 1.5 },
                    background: theme.palette.gold.main,
                    color: 'navy.main',
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    borderRadius: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.light} 100%)`,
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: alpha(theme.palette.gold.main, 0.3),
                      color: alpha(theme.palette.navy.main, 0.5),
                    },
                  }}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress size={22} sx={{ color: 'navy.main' }} />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Footer */}
              <Typography
                sx={{
                  textAlign: 'center',
                  mt: { xs: 2.5, sm: 3 },
                  color: 'text.secondary',
                  fontSize: '0.65rem',
                }}
              >
                © 2025 Fortune DXB. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}