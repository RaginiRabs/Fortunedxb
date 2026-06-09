'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    IconButton,
    Alert,
    CircularProgress,
    Grid,
    useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input';
import {
    X,
    CheckCircle,
    Clock,
} from 'lucide-react';

const ProjectLeadPopup = ({
    isOpen,
    onClose,
    projectId,
    projectName,
    leadSource,
    onSuccess,
    pendingAction,
    getSavedUserData,
    saveLeadToCookie,
    SOURCE_LABELS,
    LEAD_SOURCES,
}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [phone, setPhone] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState('+971');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const savedData = getSavedUserData();
            if (savedData && savedData.name) {
                setFormData({ name: savedData.name, email: savedData.email || '' });
                if (savedData.phone) {
                    setPhone(`${savedData.phone_ccode || '+971'} ${savedData.phone}`);
                    setPhoneCountryCode(savedData.phone_ccode || '+971');
                }
            } else {
                setFormData({ name: '', email: '' });
                setPhone('');
                setPhoneCountryCode('+971');
            }
            setErrors({});
            setSubmitError(null);
            setIsSuccess(false);
        }
    }, [isOpen, getSavedUserData]);

    const handlePhoneChange = (value, info) => {
        setPhone(value);
        if (info.countryCallingCode) {
            setPhoneCountryCode(`+${info.countryCallingCode}`);
        }
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) newErrors.phone = 'Please enter a valid phone number';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
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
                lead_source: leadSource
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
            setIsSuccess(true);

            setTimeout(() => {
                if (pendingAction) pendingAction();
                onSuccess?.();
                onClose();
            }, 1500);

        } catch (err) {
            setSubmitError(err.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSubtitle = () => {
        const savedData = getSavedUserData();
        if (savedData && savedData.name) {
            return `Welcome back, ${savedData.name.split(' ')[0]}! Confirm your details to continue`;
        }

        switch (leadSource) {
            case LEAD_SOURCES.BROCHURE_DOWNLOAD:
                return 'Get instant access to detailed brochure with pricing and floor plans';
            case LEAD_SOURCES.VIEW_FLOOR_PLAN:
                return 'View complete floor plans and unit configurations';
            case LEAD_SOURCES.REQUEST_PRICELIST:
                return 'Receive exclusive pricing and payment plans directly';
            case LEAD_SOURCES.VIDEO_CALL:
                return 'Schedule a personalized video tour with our property expert';
            default:
                return 'Our property consultant will contact you within 24 hours';
        }
    };

    // Cream input styles with prominent golden border
    const creamInputStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: `${theme.palette.navy.dark} !important`,
            // boxShadow: '0 2px 8px rgba(198, 169, 98, 0.15), inset 0 1px 2px rgba(198, 169, 98, 0.1)', // Soft golden shadow
            transition: 'all 0.3s ease',
            '& fieldset': {
                borderColor: alpha(theme.palette.gold.main, 0.6), // Visible golden border
                borderWidth: 2
            },
            '&:hover': {
                // boxShadow: '0 4px 12px rgba(198, 169, 98, 0.25), inset 0 1px 2px rgba(198, 169, 98, 0.1)',
                '& fieldset': {
                    borderColor: 'gold.main'
                }
            },
            '&.Mui-focused': {
                '& fieldset': {
                    borderColor: `${theme.palette.gold.main} !important`,
                    borderWidth: 2
                }
            }
        },
        '& .MuiOutlinedInput-input': {
            color: `${theme.palette.gold.main} !important`,
            py: 1.5,
            fontWeight: 500,
            '&::placeholder': {
                color: 'text.disabled',
                opacity: 1
            },
            '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px ${theme.palette.navy.dark} inset !important`,
                WebkitTextFillColor: `${theme.palette.gold.main} !important`
            }
        },
        '& .MuiInputLabel-root': {
            color: alpha(theme.palette.gold.main, 0.4),
            fontWeight: 500
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'gold.main',
            fontWeight: 600
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: 'error.main'
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={isSubmitting ? undefined : onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: { xs: 2, md: 3 },
                    m: { xs: 1, sm: 2 },
                    overflow: 'hidden',
                    maxWidth: 900,
                    bgcolor: 'navy.main',
                }
            }}
        >
            <Box sx={{ position: 'relative' }}>
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    disabled={isSubmitting}
                    sx={{
                        position: 'absolute',
                        top: { xs: 8, md: 16 },
                        right: { xs: 8, md: 16 },
                        bgcolor: alpha(theme.palette.common.white, 0.1),
                        backdropFilter: 'blur(10px)',
                        zIndex: 10,
                        color: 'common.white',
                        '&:hover': {
                            bgcolor: alpha(theme.palette.common.white, 0.2),
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                    }}
                >
                    <X size={20} />
                </IconButton>

                <Grid container>
                    {/* Left Side - Image (Hidden on mobile, bigger on desktop) */}
                    <Grid 
                        size={{ xs: 12, md: 7 }}
                        sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                minHeight: 520,
                                backgroundImage: 'url(/asset/placeholderproject.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}
                        >
                            {/* Gradient Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: `linear-gradient(180deg, ${alpha(theme.palette.navy.main, 0.4)} 0%, ${alpha(theme.palette.navy.main, 0.95)} 100%)`
                                }}
                            />

                            {/* Content on Image */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 32,
                                    left: 32,
                                    right: 32
                                }}
                            >
                                {/* Gradient Hero Text */}
                                <Typography
                                    sx={{
                                        fontFamily: '"Playfair Display", Georgia, serif',
                                        fontSize: { md: '1.75rem', lg: '2rem' },
                                        fontWeight: 700,
                                        fontStyle: 'italic',
                                        mb: 2,
                                        lineHeight: 1.2,
                                        background: `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${theme.palette.gold.main} 50%, ${theme.palette.gold.pale} 100%)`,
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Discover Dubai's Finest Properties
                                </Typography>

                                <Typography
                                    sx={{
                                        color: alpha(theme.palette.common.white, 0.75),
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6
                                    }}
                                >
                                    Join hundreds of smart investors who've secured their dream property with Fortune Realty
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Side - Form (Smaller width on desktop) */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box sx={{ p: { xs: 3, sm: 4 } }}>
                            {isSuccess ? (
                                // ============ SUCCESS STATE ============
                                <Box sx={{ textAlign: 'center', py: { xs: 4, md: 5 } }}>
                                    <Box
                                        sx={{
                                            width: { xs: 72, md: 96 },
                                            height: { xs: 72, md: 96 },
                                            borderRadius: '50%',
                                            bgcolor: alpha(theme.palette.success.main, 0.15),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 3
                                        }}
                                    >
                                        <CheckCircle size={48} color={theme.palette.success.main} />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '1.5rem', md: '1.75rem' },
                                            fontWeight: 700,
                                            color: 'common.white',
                                            mb: 1
                                        }}
                                    >
                                        Thank You!
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'text.disabled',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {leadSource === LEAD_SOURCES.VIDEO_CALL
                                            ? "Our team will contact you shortly to schedule your video tour."
                                            : "We'll send you the exclusive details within minutes."}
                                    </Typography>
                                </Box>
                            ) : (
                                // ============ FORM STATE ============
                                <>
                                    {/* Header */}
                                    <Box sx={{ mb: 3 }}>
                                        {/* Lead Source Label */}
                                        <Typography
                                            sx={{
                                                color: 'gold.main',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                letterSpacing: 1.5,
                                                mb: 1
                                            }}
                                        >
                                            {SOURCE_LABELS[leadSource] || 'REGISTER INTEREST'}
                                        </Typography>

                                        {/* Project Name */}
                                        <Typography
                                            sx={{
                                                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                                fontWeight: 700,
                                                fontStyle: 'italic',
                                                color: 'common.white',
                                                mb: 0.5,
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {projectName}
                                        </Typography>

                                        {/* Subtitle */}
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: 'text.disabled',
                                                lineHeight: 1.5,
                                                mb: 2
                                            }}
                                        >
                                            {getSubtitle()}
                                        </Typography>

                                        {/* Trust Indicators */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: { xs: 1.5, sm: 2 },
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <CheckCircle size={16} color={theme.palette.success.main} />
                                                <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled', fontWeight: 500 }}>
                                                    Free Consultation
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Clock size={16} color={theme.palette.success.main} />
                                                <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled', fontWeight: 500 }}>
                                                    24hr Response
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {submitError && (
                                        <Alert
                                            severity="error"
                                            sx={{
                                                mb: 2,
                                                borderRadius: 2,
                                                fontSize: '0.85rem',
                                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                                color: 'error.main',
                                                '& .MuiAlert-icon': {
                                                    color: 'error.main'
                                                }
                                            }}
                                        >
                                            {submitError}
                                        </Alert>
                                    )}

                                    {/* Form */}
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2.5
                                        }}
                                    >
                                        {/* Name Input */}
                                        <TextField
                                            fullWidth
                                            label="Your Name *"
                                            size="medium"
                                            value={formData.name}
                                            onChange={handleChange('name')}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            disabled={isSubmitting}
                                            sx={creamInputStyles}
                                        />

                                        {/* Email Input */}
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            size="medium"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange('email')}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            disabled={isSubmitting}
                                            sx={creamInputStyles}
                                        />

                                        {/* Phone Input */}
                                        <MuiTelInput
                                            fullWidth
                                            label="Phone Number *"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            defaultCountry="AE"
                                            preferredCountries={['AE', 'SA', 'IN', 'PK', 'GB', 'US']}
                                            forceCallingCode
                                            focusOnSelectCountry
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            disabled={isSubmitting}
                                            size="medium"
                                          sx={{
                                                ...creamInputStyles,
                                                '& .MuiIconButton-root': {
                                                    color: 'gold.main'
                                                },
                                                // Country code text golden
                                                '& .MuiTelInput-Typography': {
                                                    color: `${theme.palette.gold.main} !important`,
                                                    fontWeight: 600
                                                },
                                                '& .MuiTypography-root': {
                                                    color: `${theme.palette.gold.main} !important`
                                                }
                                            }}
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            sx={{
                                                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
                                                color: 'navy.main',
                                                py: 1.75,
                                                fontWeight: 700,
                                                fontSize: '0.95rem',
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                boxShadow: `0 4px 14px ${alpha(theme.palette.gold.main, 0.4)}`,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.pale} 100%)`,
                                                    boxShadow: `0 6px 20px ${alpha(theme.palette.gold.main, 0.5)}`,
                                                    transform: 'translateY(-1px)'
                                                },
                                                '&:disabled': {
                                                    background: alpha(theme.palette.gold.main, 0.3),
                                                    color: alpha(theme.palette.navy.main, 0.5)
                                                }
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <CircularProgress size={24} sx={{ color: 'navy.main' }} />
                                            ) : (
                                                SOURCE_LABELS[leadSource] || 'Get Exclusive Access'
                                            )}
                                        </Button>
                                    </Box>

                                    {/* Privacy Text */}
                                    <Typography
                                        sx={{
                                            fontSize: '0.7rem',
                                            color: 'text.secondary',
                                            mt: 2.5,
                                            textAlign: 'center',
                                            lineHeight: 1.5
                                        }}
                                    >
                                        Your information is secure and will never be shared. By submitting, you agree to our{' '}
                                        <Box component="span" sx={{ color: 'gold.main', fontWeight: 600, cursor: 'pointer' }}>
                                            Privacy Policy
                                        </Box>
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
};

export default ProjectLeadPopup;