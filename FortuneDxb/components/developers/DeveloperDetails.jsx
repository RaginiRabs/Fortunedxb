'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Skeleton,
  Breadcrumbs,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BRAND_COLORS } from '@/lib/theme';
import {
  MapPin,
  Building2,
  Calendar,
  Award,
  Globe,
  Phone,
  Mail,
  ChevronRight,
  BadgeCheck,
  Trophy,
  Target,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import ProjectCard, { ProjectCardSkeleton } from '@/components/home/ProjectCard';
import { useDeveloper } from '@/hooks/developer/useDeveloperHook';

// ============ SKELETON LOADER ============
const DeveloperDetailsSkeleton = () => (
  <Box sx={{ bgcolor: 'background.subtle', minHeight: '100vh' }}>
    <Box sx={{ bgcolor: 'navy.main', pt: { xs: 10, md: 12 }, pb: { xs: 4, md: 5 } }}>
      <Container maxWidth="xl">
        <Skeleton variant="text" width={180} height={16} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1), mb: 2.5 }} />
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Skeleton variant="rounded" width={110} height={110} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1), borderRadius: 3 }} />
          <Box sx={{ flex: 1, width: '100%' }}>
            <Skeleton variant="text" width="60%" height={38} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1) }} />
            <Skeleton variant="text" width="40%" height={22} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1), mt: 0.5 }} />
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rounded" width={100} height={36} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1), borderRadius: 2 }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
   <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={2.5}>
        {[1, 2, 3].map((i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
            <ProjectCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// ============ STAT PILL ============
const StatPill = ({ icon: Icon, value, label, color }) => {
  const theme = useTheme();
  const iconColor = color || theme.palette.gold.main;
  return (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 0.5, md: 0.75 },
      bgcolor: alpha(theme.palette.common.white, 0.08),
      border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
      borderRadius: 2,
      px: { xs: 1, md: 1.5 },
      py: { xs: 0.625, md: 0.875 },
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: alpha(theme.palette.gold.main, 0.15),
        borderColor: alpha(theme.palette.gold.main, 0.3),
      },
    }}
  >
    <Icon size={14} color={iconColor} />
    <Typography sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' }, fontWeight: 700, color: 'common.white' }}>{value}</Typography>
    <Typography sx={{ fontSize: { xs: '0.6rem', md: '0.7rem' }, color: 'text.disabled', ml: -0.25 }}>{label}</Typography>
  </Box>
  );
};

// ============ SOCIAL ICON BUTTON ============
const SocialIconButton = ({ href, icon: Icon, label, color }) => (
  <Tooltip title={label} arrow>
    <IconButton
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: 36,
        height: 36,
        bgcolor: (theme) => alpha(theme.palette.common.white, 0.08),
        border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
        color: 'common.white',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: color,
          borderColor: color,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Icon size={18} />
    </IconButton>
  </Tooltip>
);

// ============ MAIN COMPONENT ============
const DeveloperDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const { id: slug } = params;
  
  const { developer, projects, loading, error, fetchDeveloper } = useDeveloper(slug);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    if (slug) fetchDeveloper(slug);
  }, [slug, fetchDeveloper]);

  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) setSavedProperties(JSON.parse(saved));
  }, []);

  const handleSaveProperty = useCallback((projectId) => {
    setSavedProperties((prev) => {
      const newSaved = prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId];
      localStorage.setItem('savedProperties', JSON.stringify(newSaved));
      return newSaved;
    });
  }, []);

  const getImagePath = (path) => path ? (path.startsWith('/') ? path : `/${path}`) : null;

  if (loading) return <DeveloperDetailsSkeleton />;

  if (error) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, mt: 10, p: 3, bgcolor: 'navy.main' }}>
        <Typography variant="h5" sx={{ color: 'error.main', textAlign: 'center' }}>{error}</Typography>
        <Link href="/developers" style={{ textDecoration: 'none' }}>
          <Button variant="contained" startIcon={<ArrowLeft size={18} />} sx={{ bgcolor: 'gold.main', color: 'navy.main', mt: 2 }}>Back to Developers</Button>
        </Link>
      </Box>
    );
  }

  if (!developer) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, mt: 10, p: 3, bgcolor: 'navy.main' }}>
        <Typography variant="h4" sx={{ color: 'common.white', textAlign: 'center' }}>Developer Not Found</Typography>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ bgcolor: 'gold.main', color: 'navy.main', mt: 2 }}>Back to Home</Button>
        </Link>
      </Box>
    );
  }

  const {
    name, logo_path, cover_image, tagline, description, established_year, headquarters,
    total_projects, completed_projects, ongoing_projects, awards_count,
    is_verified, website_url, contact_email, contact_phone, contact_phone_ccode,
    facebook_url, instagram_url, linkedin_url, youtube_url,
    awards = [],
  } = developer;

  const stats = [
    { icon: Building2, label: 'Total Projects', value: total_projects || projects?.length || 0, color: theme.palette.gold.main },
    { icon: CheckCircle2, label: 'Completed', value: completed_projects || 0, color: theme.palette.success.main },
    { icon: Target, label: 'Ongoing', value: ongoing_projects || 0, color: theme.palette.info.main },
    ...(awards_count > 0 ? [{ icon: Award, label: 'Awards', value: awards_count, color: theme.palette.warning.main }] : []),
  ];

  // Social media links
  const socialLinks = [
    { url: facebook_url, icon: Facebook, label: 'Facebook', color: BRAND_COLORS.facebook },
    { url: instagram_url, icon: Instagram, label: 'Instagram', color: BRAND_COLORS.instagram },
    { url: linkedin_url, icon: Linkedin, label: 'LinkedIn', color: BRAND_COLORS.linkedin },
    { url: youtube_url, icon: Youtube, label: 'YouTube', color: theme.palette.error.main },
  ].filter(social => social.url);

  // Default cover if none provided
  const coverBg = cover_image 
    ? getImagePath(cover_image) 
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920';

  // Check if any contact info exists
  const hasContactInfo = website_url || contact_phone || contact_email;
  const hasSocialLinks = socialLinks.length > 0;

  return (
    <Box 
      sx={{
        bgcolor: 'background.subtle',
        minHeight: '100vh',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* ============ HERO SECTION ============ */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 9, md: 11, lg: 20 },
          pb: { xs: 4, md: 5 },
          minHeight: { xs: 'auto', md: 280 },
        }}
      >
        {/* Cover Image */}
        <Box 
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundImage: `url(${coverBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, ${alpha(theme.palette.navy.main, 0.75)} 0%, ${alpha(theme.palette.navy.main, 0.92)} 100%)`,
            }
          }}
        />

        {/* Decorative Gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: -150,
            right: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.gold.main, 0.15)} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>

          {/* Main Hero Content */}
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 3.5 }, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Logo with Glow */}
            <Box
              sx={{
                width: { xs: 90, sm: 100, md: 120 },
                height: { xs: 90, sm: 100, md: 120 },
                borderRadius: 3,
                bgcolor: 'common.white',
                border: `3px solid ${alpha(theme.palette.gold.main, 0.5)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: `0 0 40px ${alpha(theme.palette.gold.main, 0.25)}`,
                flexShrink: 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'gold.main',
                  boxShadow: `0 0 50px ${alpha(theme.palette.gold.main, 0.4)}`,
                  transform: 'scale(1.02)',
                },
              }}
            >
              {logo_path ? (
                <Box component="img" src={getImagePath(logo_path)} alt={name} sx={{ width: '75%', height: '75%', objectFit: 'contain' }} />
              ) : (
                <Typography sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: 'gold.main' }}>{name?.charAt(0)}</Typography>
              )}
            </Box>

            {/* Developer Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Name + Verified */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.85rem' }, 
                    fontWeight: 700,
                    color: 'common.white',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {name}
                </Typography>
                {is_verified === 1 && (
                  <Chip
                    icon={<BadgeCheck size={12} color={theme.palette.navy.main} />}
                    label="Verified"
                    size="small"
                    sx={{
                      bgcolor: 'gold.main',
                      color: 'navy.main',
                      fontWeight: 600, 
                      fontSize: '0.65rem', 
                      height: 22,
                      '& .MuiChip-icon': { ml: 0.5 },
                    }} 
                  />
                )}
              </Box>

              {/* Tagline */}
              {tagline && (
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                    color: 'gold.main',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    mb: 0.75,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Sparkles size={14} />
                  {tagline}
                </Typography>
              )}

              {/* Location & Year */}
              <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2.5 }, flexWrap: 'wrap', mb: { xs: 1.5, md: 2 } }}>
                {headquarters && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MapPin size={14} color={theme.palette.text.disabled} />
                    <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' }, color: 'grey.300' }}>{headquarters}</Typography>
                  </Box>
                )}
                {established_year && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Calendar size={14} color={theme.palette.text.disabled} />
                    <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' }, color: 'grey.300' }}>Est. {established_year}</Typography>
                  </Box>
                )}
              </Box>

              {/* Stats Pills */}
              <Box sx={{ display: 'flex', gap: { xs: 0.75, md: 1.25 }, flexWrap: 'wrap', mb: { xs: 2, md: 2.5 } }}>
                {stats.map((stat, i) => (
                  <StatPill key={i} icon={stat.icon} value={stat.value} label={stat.label} color={stat.color} />
                ))}
              </Box>

              {/* Action Buttons & Social Links */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}>
                {/* Contact Buttons */}
                {hasContactInfo && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {website_url && (
                      <Button 
                        variant="contained" 
                        startIcon={<Globe size={16} />} 
                        href={website_url} 
                        target="_blank" 
                        sx={{
                          bgcolor: 'gold.main',
                          color: 'navy.main',
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: { xs: '0.75rem', md: '0.85rem' },
                          px: { xs: 1.5, md: 2.5 },
                          py: { xs: 0.75, md: 1 },
                          '&:hover': { bgcolor: 'gold.light' },
                        }}
                      >
                        Visit Website
                      </Button>
                    )}
                    {contact_phone && (
                      <Button 
                        variant="outlined" 
                        startIcon={<Phone size={16} />} 
                        href={`tel:${contact_phone_ccode || ''}${contact_phone}`}
                        sx={{
                          borderColor: alpha(theme.palette.common.white, 0.3),
                          color: 'common.white',
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: { xs: '0.75rem', md: '0.85rem' },
                          px: { xs: 1.5, md: 2 },
                          py: { xs: 0.75, md: 1 },
                          '&:hover': { borderColor: 'gold.main', bgcolor: alpha(theme.palette.gold.main, 0.1) },
                        }}
                      >
                        Call
                      </Button>
                    )}
                    {contact_email && (
                      <Button 
                        variant="outlined" 
                        startIcon={<Mail size={16} />} 
                        href={`mailto:${contact_email}`}
                        sx={{
                          borderColor: alpha(theme.palette.common.white, 0.3),
                          color: 'common.white',
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: { xs: '0.75rem', md: '0.85rem' },
                          px: { xs: 1.5, md: 2 },
                          py: { xs: 0.75, md: 1 },
                          '&:hover': { borderColor: 'gold.main', bgcolor: alpha(theme.palette.gold.main, 0.1) },
                        }}
                      >
                        Email
                      </Button>
                    )}
                  </Box>
                )}

                {/* Divider between buttons and social */}
                {hasContactInfo && hasSocialLinks && (
                  <Box sx={{ width: '1px', height: 28, bgcolor: (theme) => alpha(theme.palette.common.white, 0.2), display: { xs: 'none', sm: 'block' } }} />
                )}

                {/* Social Media Icons */}
                {hasSocialLinks && (
                  <Box sx={{ display: 'flex', gap: 0.75 }}>
                    {socialLinks.map((social, i) => (
                      <SocialIconButton 
                        key={i}
                        href={social.url} 
                        icon={social.icon} 
                        label={social.label}
                        color={social.color}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ============ CONTENT SECTION ============ */}
     <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* About & Awards */}
        {(description || (awards && awards.length > 0)) && (
          <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mb: { xs: 3, md: 4 } }}>
            {/* About */}
            {description && (
              <Grid size={{ xs: 12, md: awards?.length > 0 ? 7 : 12 }}>
                <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
                  About {name}
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' }, color: 'text.secondary', lineHeight: 1.9 }}>
                  {description}
                </Typography>
              </Grid>
            )}

            {/* Awards */}
            {awards && awards.length > 0 && (
              <Grid size={{ xs: 12, md: description ? 5 : 12 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Award size={20} color={theme.palette.gold.main} />
                  <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, color: 'text.primary' }}>
                    Awards & Recognition
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {awards.map((award) => (
                    <Box 
                      key={award.award_id} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        p: 1.5,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: 'background.subtle',
                          borderColor: 'gold.main',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      {award.image_path ? (
                        <Box 
                          component="img" 
                          src={award.image_path.startsWith('/') ? award.image_path : `/${award.image_path}`} 
                          alt={award.award_name} 
                          sx={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 1.5 }} 
                        />
                      ) : (
                        <Box sx={{ width: 44, height: 44, borderRadius: 1.5, bgcolor: alpha(theme.palette.gold.main, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Trophy size={20} color={theme.palette.gold.main} />
                        </Box>
                      )}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.85rem', md: '0.9rem' }, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {award.award_name}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' }, color: 'text.secondary' }}>
                          {award.awarding_body} {award.year && `• ${award.year}`}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        )}

        {/* Divider */}
        {(description || (awards && awards.length > 0)) && (
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mb: { xs: 3, md: 4 } }} />
        )}

        {/* Projects Section */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: { xs: '1.15rem', md: '1.4rem' }, fontWeight: 700, color: 'text.primary' }}>
                Projects by {name}
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.85rem' }, color: 'text.secondary', mt: 0.25 }}>
                {projects?.length || 0} {projects?.length === 1 ? 'Project' : 'Projects'} Available
              </Typography>
            </Box>
          </Box>

          {projects && projects.length > 0 ? (
            <Grid container spacing={{ xs: 2, md: 2.5 }}>
              {projects.map((project) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={project.project_id}>
                  <ProjectCard project={project} savedProperties={savedProperties} onSaveProperty={handleSaveProperty} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Building2 size={48} color={theme.palette.grey[300]} style={{ marginBottom: 16 }} />
              <Typography sx={{ color: 'text.secondary', fontSize: '1rem' }}>
                No projects available at the moment
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default DeveloperDetails;