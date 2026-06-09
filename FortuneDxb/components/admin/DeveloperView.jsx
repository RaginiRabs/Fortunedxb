'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  Button,
  Grid,
  Typography,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Skeleton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  ArrowBackOutlined,
  EditOutlined,
  BusinessOutlined,
  VerifiedOutlined,
  CalendarTodayOutlined,
  LocationOnOutlined,
  EmailOutlined,
  PhoneOutlined,
  LanguageOutlined,
  EmojiEventsOutlined,
  PublicOutlined,
  FacebookOutlined,
  Instagram,
  LinkedIn,
  YouTube,
  OpenInNewOutlined,
  ApartmentOutlined,
  CheckCircleOutlined,
  PendingOutlined,
} from '@mui/icons-material';
import api from '@/lib/axios';
import useToast from '@/hooks/useToast';
import { BRAND_COLORS } from '@/lib/theme';

export default function DeveloperView({ developerId }) {
  const router = useRouter();
  const toast = useToast();

  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (developerId) {
      fetchDeveloper();
    }
  }, [developerId]);

  const fetchDeveloper = async () => {
    try {
      const res = await api.get(`/api/developers/${developerId}`);
      if (res.data.success) {
        setDeveloper(res.data.data);
      } else {
        setError('Developer not found');
      }
    } catch (err) {
      setError('Failed to fetch developer details');
      toast.error('Failed to fetch developer');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DeveloperViewSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.push('/admin/developers')}
          sx={{ mb: 2 }}
        >
          Back to Developers
        </Button>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!developer) return null;

  return (
    <Box>
      {/* Header Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.push('/admin/developers')}
          sx={{ color: 'text.secondary' }}
        >
          Back to Developers
        </Button>
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => router.push(`/admin/developers/${developerId}`)}
          sx={{ bgcolor: 'primary.main' }}
        >
          Edit Developer
        </Button>
      </Box>

      {/* Cover Image & Logo Section */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{
            height: 200,
            bgcolor: 'grey.100',
            backgroundImage: developer.cover_image ? `url(/${developer.cover_image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {!developer.cover_image && (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessOutlined sx={{ fontSize: 64, color: 'grey.300' }} />
            </Box>
          )}
        </Box>

        {/* Developer Info */}
        <Box sx={{ p: 3, position: 'relative' }}>
          {/* Logo */}
          <Avatar
            src={developer.logo_path ? `/${developer.logo_path}` : undefined}
            alt={developer.name}
            variant="rounded"
            sx={{
              width: 100,
              height: 100,
              border: '4px solid',
              borderColor: 'background.paper',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              bgcolor: 'primary.50',
              color: 'primary.main',
              position: 'absolute',
              top: -50,
              left: 24,
            }}
          >
            <BusinessOutlined sx={{ fontSize: 48 }} />
          </Avatar>

          <Box sx={{ ml: { xs: 0, sm: 16 }, mt: { xs: 7, sm: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {developer.name}
              </Typography>
              {developer.is_verified && (
                <Tooltip title="Verified Developer">
                  <VerifiedOutlined sx={{ color: 'primary.main', fontSize: 24 }} />
                </Tooltip>
              )}
              <Chip
                label={developer.is_verified ? 'Verified' : 'Unverified'}
                size="small"
                sx={{
                  bgcolor: developer.is_verified ? 'primary.50' : 'grey.100',
                  color: developer.is_verified ? 'primary.main' : 'text.secondary',
                  fontWeight: 500,
                }}
              />
            </Box>

            {developer.tagline && (
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {developer.tagline}
              </Typography>
            )}

            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
              {developer.established_year && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayOutlined sx={{ fontSize: 18, color: 'grey.500' }} />
                  <Typography variant="body2" color="text.secondary">
                    Est. {developer.established_year}
                  </Typography>
                </Box>
              )}
              {developer.headquarters && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnOutlined sx={{ fontSize: 18, color: 'grey.500' }} />
                  <Typography variant="body2" color="text.secondary">
                    {developer.headquarters}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PublicOutlined sx={{ fontSize: 18, color: 'grey.500' }} />
                <Typography variant="body2" color="text.secondary">
                  {developer.countries_present || 1} {developer.countries_present > 1 ? 'Countries' : 'Country'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{xs: 12, md: 8}}>
          {/* About Section */}
          {developer.description && (
            <Card
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                About
              </Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {developer.description}
              </Typography>
            </Card>
          )}

          {/* Statistics Section */}
          <Card
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{xs: 6, sm: 3}}>
                <StatCard
                  icon={<ApartmentOutlined />}
                  label="Total Projects"
                  value={developer.total_projects || 0}
                  color="primary"
                />
              </Grid>
              <Grid size={{xs: 6, sm: 3}}>
                <StatCard
                  icon={<CheckCircleOutlined />}
                  label="Completed"
                  value={developer.completed_projects || 0}
                  color="success"
                />
              </Grid>
              <Grid size={{xs: 6, sm: 3}}>
                <StatCard
                  icon={<PendingOutlined />}
                  label="Ongoing"
                  value={developer.ongoing_projects || 0}
                  color="warning"
                />
              </Grid>
              <Grid size={{xs: 6, sm: 3}}>
                <StatCard
                  icon={<EmojiEventsOutlined />}
                  label="Awards"
                  value={developer.awards_count || 0}
                  color="secondary"
                />
              </Grid>
            </Grid>
          </Card>

          {/* Awards Section */}
          {developer.awards && developer.awards.length > 0 && (
            <Card
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Awards & Recognition
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Award</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Awarding Body</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Year</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {developer.awards.map((award, index) => (
                      <TableRow key={award.award_id || index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmojiEventsOutlined sx={{ color: 'warning.main', fontSize: 20 }} />
                            <Typography sx={{ fontWeight: 500 }}>{award.award_name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.secondary">
                            {award.awarding_body || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.secondary">
                            {award.year || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {award.image_path ? (
                            <Avatar
                              src={`/${award.image_path}`}
                              variant="rounded"
                              sx={{ width: 48, height: 48 }}
                            />
                          ) : (
                            <Typography color="text.secondary">-</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </Grid>

        {/* Right Column */}
        <Grid size={{xs: 12, md: 4}}>
          {/* Contact Info */}
          <Card
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Information
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {developer.contact_email && (
                <ContactItem
                  icon={<EmailOutlined />}
                  label="Email"
                  value={developer.contact_email}
                  href={`mailto:${developer.contact_email}`}
                />
              )}

              {developer.contact_phone && (
                <ContactItem
                  icon={<PhoneOutlined />}
                  label="Phone"
                  value={developer.contact_phone}
                  href={`tel:${developer.contact_phone}`}
                />
              )}

              {developer.website_url && (
                <ContactItem
                  icon={<LanguageOutlined />}
                  label="Website"
                  value={developer.website_url.replace(/^https?:\/\//, '')}
                  href={developer.website_url}
                  external
                />
              )}

              {!developer.contact_email && !developer.contact_phone && !developer.website_url && (
                <Typography color="text.secondary" variant="body2">
                  No contact information available
                </Typography>
              )}
            </Box>
          </Card>

          {/* Social Links */}
          {(developer.facebook_url || developer.instagram_url || developer.linkedin_url || developer.youtube_url) && (
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Social Media
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {developer.facebook_url && (
                  <SocialButton
                    icon={<FacebookOutlined />}
                    href={developer.facebook_url}
                    color={BRAND_COLORS.facebook}
                    label="Facebook"
                  />
                )}
                {developer.instagram_url && (
                  <SocialButton
                    icon={<Instagram />}
                    href={developer.instagram_url}
                    color={BRAND_COLORS.instagram}
                    label="Instagram"
                  />
                )}
                {developer.linkedin_url && (
                  <SocialButton
                    icon={<LinkedIn />}
                    href={developer.linkedin_url}
                    color={BRAND_COLORS.linkedin}
                    label="LinkedIn"
                  />
                )}
                {developer.youtube_url && (
                  <SocialButton
                    icon={<YouTube />}
                    href={developer.youtube_url}
                    color="#FF0000"
                    label="YouTube"
                  />
                )}
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, color }) {
  const colorMap = {
    primary: { bg: 'primary.50', text: 'primary.main' },
    success: { bg: 'success.50', text: 'success.main' },
    warning: { bg: 'warning.50', text: 'warning.main' },
    secondary: { bg: 'secondary.50', text: 'secondary.main' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: colors.bg,
        textAlign: 'center',
      }}
    >
      <Box sx={{ color: colors.text, mb: 1 }}>{icon}</Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: colors.text }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

// Contact Item Component
function ContactItem({ icon, label, value, href, external }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
      <Box sx={{ color: 'grey.500', mt: 0.25 }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {label}
        </Typography>
        <Typography
          component="a"
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            wordBreak: 'break-all',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {value}
          {external && <OpenInNewOutlined sx={{ fontSize: 14 }} />}
        </Typography>
      </Box>
    </Box>
  );
}

// Social Button Component
function SocialButton({ icon, href, color, label }) {
  return (
    <Tooltip title={label}>
      <IconButton
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          bgcolor: `${color}15`,
          color: color,
          '&:hover': {
            bgcolor: `${color}25`,
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

// Skeleton Loader
function DeveloperViewSkeleton() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Skeleton width={150} height={36} />
        <Skeleton width={140} height={36} />
      </Box>

      <Card elevation={0} sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height={200} />
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="rounded" width={100} height={100} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" height={32} />
              <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid size={{xs: 12, md: 8}}>
          <Card elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Skeleton width="30%" height={28} sx={{ mb: 2 }} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="90%" height={20} />
            <Skeleton width="80%" height={20} />
          </Card>
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Skeleton width="50%" height={28} sx={{ mb: 2 }} />
            <Skeleton width="100%" height={48} sx={{ mb: 1 }} />
            <Skeleton width="100%" height={48} sx={{ mb: 1 }} />
            <Skeleton width="100%" height={48} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}