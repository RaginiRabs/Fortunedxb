'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BRAND_COLORS } from '@/lib/theme';
import { MuiTelInput } from 'mui-tel-input';
import {
  Phone,
  MessageCircle,
  Download,
  CheckCircle2,
  Video,
} from 'lucide-react';

// ============ VIDEO CALL CARD ============
const VideoCallCard = ({ onScheduleClick }) => {
  const theme = useTheme();
  return (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      mt: 2
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1.5,
          bgcolor: (theme) => alpha(theme.palette.gold.main, 0.15),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Video size={16} color={theme.palette.gold.main} />
      </Box>
      <Typography
        sx={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'text.primary'
        }}
      >
        Virtual Property Tour
      </Typography>
    </Box>
    <Typography
      sx={{
        fontSize: '0.75rem',
        color: 'text.secondary',
        mb: 1.5,
        lineHeight: 1.5
      }}
    >
      Can't visit in person? Get a live video walkthrough.
    </Typography>
    <Button
      fullWidth
      variant="contained"
      startIcon={<Video size={14} />}
      onClick={onScheduleClick}
      sx={{
        bgcolor: 'navy.main',
        color: 'common.white',
        py: 0.875,
        fontWeight: 600,
        borderRadius: 1.5,
        fontSize: '0.8rem',
        '&:hover': {
          bgcolor: 'navy.light'
        }
      }}
    >
      Schedule Video Call
    </Button>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CheckCircle2 size={10} color={theme.palette.success.main} />
        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
          Free
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CheckCircle2 size={10} color={theme.palette.success.main} />
        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
          No obligation
        </Typography>
      </Box>
    </Box>
  </Paper>
  );
};

// ============ MAIN FORM COMPONENT ============
const ProjectSidebarForm = ({
  phone1,
  brochure,
  onBrochureClick,
  onWhatsAppClick,
  onVideoCallClick,
  isSubmitted,
  projectId,
  projectName,
  onLeadSuccess,
  getSavedUserData,
  saveLeadToCookie,
  LEAD_SOURCES
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [phone, setPhone] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+971');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Load saved user data on mount
  useEffect(() => {
    const savedData = getSavedUserData();
    if (savedData && savedData.name) {
      setFormData({ name: savedData.name, email: savedData.email || '' });
      if (savedData.phone) {
        setPhone(`${savedData.phone_ccode || '+971'} ${savedData.phone}`);
        setPhoneCountryCode(savedData.phone_ccode || '+971');
      }
    }
  }, [getSavedUserData]);

  const handlePhoneChange = (value, info) => {
    setPhone(value);
    if (info.countryCallingCode) setPhoneCountryCode(`+${info.countryCallingCode}`);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) newErrors.phone = 'Valid phone required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getNationalNumber = () => {
    const phoneDigits = phone.replace(/\D/g, '');
    const ccodeDigits = phoneCountryCode.replace(/\D/g, '');
    return phoneDigits.startsWith(ccodeDigits) 
      ? phoneDigits.substring(ccodeDigits.length) 
      : phoneDigits;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const leadData = {
        project_id: projectId,
        project_name: projectName,
        lead_name: formData.name.trim(),
        lead_phone: getNationalNumber(),
        lead_phone_ccode: phoneCountryCode,
        lead_email: formData.email?.trim() || null,
        lead_source: LEAD_SOURCES.REQUEST_INFORMATION
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit');
      }

      saveLeadToCookie(leadData, projectId);
      onLeadSuccess?.();
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ SUCCESS STATE ============
  if (isSubmitted) {
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'navy.main'
          }}
        >
          <Box sx={{ textAlign: 'center', py: 1 }}>
            <CheckCircle2 size={32} color={theme.palette.success.main} />
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'common.white',
                mt: 1,
                mb: 0.25
              }}
            >
              Thank You!
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: alpha(theme.palette.common.white, 0.6),
                mb: 2
              }}
            >
              Our team will contact you shortly
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<Phone size={14} />}
              href={`tel:${phone1 || '+971582335969'}`}
              sx={{
                borderColor: alpha(theme.palette.common.white, 0.2),
                color: 'common.white',
                fontWeight: 600,
                borderRadius: 1.5,
                fontSize: '0.75rem'
              }}
            >
              Call
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<MessageCircle size={14} />}
              onClick={onWhatsAppClick}
              sx={{
                borderColor: BRAND_COLORS.whatsapp,
                color: BRAND_COLORS.whatsapp,
                fontWeight: 600,
                borderRadius: 1.5,
                fontSize: '0.75rem'
              }}
            >
              WhatsApp
            </Button>
          </Box>

          {brochure && (
            <Button
              fullWidth
              variant="text"
              size="small"
              startIcon={<Download size={14} />}
              onClick={onBrochureClick}
              sx={{
                color: 'gold.main',
                fontWeight: 600,
                mt: 1.5,
                fontSize: '0.75rem'
              }}
            >
              Download Brochure
            </Button>
          )}
        </Paper>

        <VideoCallCard onScheduleClick={onVideoCallClick} />
      </Box>
    );
  }

  // ============ FORM STATE ============
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2,
          height: {xs: 380, md: 380, lg: 400},
          bgcolor: 'navy.main'
        }}
      >
        <Typography
          sx={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'common.white',
            mb: 0.25
          }}
        >
          Interested?
        </Typography>
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: alpha(theme.palette.common.white, 0.6),
            mb: 2
          }}
        >
          Get exclusive pricing and floor plans
        </Typography>

        {submitError && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2, 
              borderRadius: 1.5, 
              fontSize: '0.7rem' 
            }}
          >
            {submitError}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: {xs: 1.5, md: 1.5, lg: 2.5}
          }}
        >
          <TextField 
            fullWidth
            placeholder="Your Name *"
            size="small"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            disabled={isSubmitting}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: 'navy.dark',
                color: 'common.white',
                '& fieldset': {
                  borderColor: alpha(theme.palette.common.white, 0.1)
                },
                '&:hover fieldset': {
                  borderColor: 'gold.main'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gold.main'
                }
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: alpha(theme.palette.common.white, 0.5),
                opacity: 1
              },
              '& .MuiOutlinedInput-input': {
                color: 'common.white',
                py: 1,
                fontSize: '0.85rem'
              },
              '& .MuiFormHelperText-root': {
                color: 'error.main',
                fontSize: '0.7rem'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Email"
            size="small"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isSubmitting}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: 'navy.dark',
                color: 'common.white',
                '& fieldset': {
                  borderColor: alpha(theme.palette.common.white, 0.1)
                },
                '&:hover fieldset': {
                  borderColor: 'gold.main'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gold.main'
                }
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: alpha(theme.palette.common.white, 0.5),
                opacity: 1
              },
              '& .MuiOutlinedInput-input': {
                color: 'common.white',
                py: 1,
                fontSize: '0.85rem'
              },
              '& .MuiFormHelperText-root': {
                color: 'error.main',
                fontSize: '0.7rem'
              }
            }}
          />

          <MuiTelInput 
            fullWidth
            placeholder="Phone *"
            value={phone}
            onChange={handlePhoneChange}
            defaultCountry="AE"
            preferredCountries={['AE', 'SA', 'IN', 'PK', 'GB', 'US']}
            forceCallingCode
            focusOnSelectCountry
            error={!!errors.phone}
            helperText={errors.phone}
            disabled={isSubmitting}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: 'navy.dark',
                color: 'common.white',
                '& fieldset': {
                  borderColor: alpha(theme.palette.common.white, 0.1)
                },
                '&:hover fieldset': {
                  borderColor: 'gold.main'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gold.main'
                }
              },
              '& .MuiOutlinedInput-input': {
                color: 'common.white',
                py: 1,
                fontSize: '0.85rem'
              },
              '& .MuiFormHelperText-root': {
                color: 'error.main',
                fontSize: '0.7rem'
              },
              '& .MuiIconButton-root': {
                color: alpha(theme.palette.common.white, 0.6)
              },
              // Country calling code (+971) — always white
              '& .MuiInputAdornment-root': {
                color: 'common.white'
              },
              '& .MuiInputAdornment-root .MuiTypography-root': {
                color: 'common.white'
              }
            }}
          />

          <Button 
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: 'gold.main',
              color: 'navy.main',
              py: 1.125,
              fontWeight: 700,
              borderRadius: 1.5,
              fontSize: '0.85rem',
              '&:hover': {
                bgcolor: 'gold.light'
              },
              '&:disabled': {
                bgcolor: 'grey.500'
              }
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={20} sx={{ color: 'navy.main' }} />
            ) : (
              'Request Information'
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 2, borderColor: alpha(theme.palette.common.white, 0.1) }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<Phone size={14} />}
            href={`tel:${phone1 || '+971582335969'}`}
            sx={{
              borderColor: alpha(theme.palette.common.white, 0.2),
              color: 'common.white',
              fontWeight: 600,
              borderRadius: 1.5,
              fontSize: '0.75rem'
            }}
          >
            Call
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<MessageCircle size={14} />}
            onClick={onWhatsAppClick}
            sx={{
              borderColor: BRAND_COLORS.whatsapp,
              color: BRAND_COLORS.whatsapp,
              fontWeight: 600,
              borderRadius: 1.5,
              fontSize: '0.75rem'
            }}
          >
            WhatsApp
          </Button>
        </Box>

        {brochure && (
          <Button
            fullWidth
            variant="text"
            size="small"
            startIcon={<Download size={14} />}
            onClick={onBrochureClick}
            sx={{
              color: 'gold.main',
              fontWeight: 600,
              mt: 1.5,
              fontSize: '0.75rem'
            }}
          >
            Download Brochure
          </Button>
        )}
      </Paper>

      <VideoCallCard onScheduleClick={onVideoCallClick} />
    </Box>
  );
};

export default ProjectSidebarForm;