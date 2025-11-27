import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Gift,
  FileText,
  Calculator,
  Scale,
  Headphones,
  Languages,
  Rocket,
} from 'lucide-react';

const FirstTimeBuyerSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #F8F4E8 0%, #FFF9E6 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Chip
              icon={<Gift size={16} />}
              label="First-Time Buyers"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                mb: 2,
              }}
            />
            <Typography variant="h2" sx={{ color: 'secondary.main', mb: 3 }}>
              New to Dubai Real Estate?
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
              We make it simple for first-time buyers to navigate the Dubai property market.
              Our comprehensive guides and dedicated support ensure a smooth journey from inquiry to handover.
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              {[
                { icon: FileText, text: 'Step-by-step buying guides' },
                { icon: Calculator, text: 'Mortgage & payment calculators' },
                { icon: Scale, text: 'Legal documentation support' },
                { icon: Headphones, text: 'Dedicated buyer consultant' },
                { icon: Languages, text: 'Multilingual support (15+ languages)' },
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: 'rgba(198, 169, 98, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <item.icon size={20} color="#C6A962" />
                  </Box>
                  <Typography variant="body1">{item.text}</Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<Rocket size={20} />}
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                px: 4,
              }}
            >
              Start Your Journey
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: 'white',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Buying Process
              </Typography>
              <Stepper orientation="vertical" activeStep={-1}>
                {[
                  { label: 'Property Selection', desc: 'Browse and shortlist your dream properties' },
                  { label: 'Reservation', desc: 'Secure with a small deposit (AED 10-50K)' },
                  { label: 'SPA Signing', desc: 'Sign Sales Purchase Agreement' },
                  { label: 'Payment Plan', desc: 'Follow developer payment schedule' },
                  { label: 'Handover', desc: 'Receive keys to your new property' },
                ].map((step, index) => (
                  <Step key={index} expanded>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}
                        >
                          {index + 1}
                        </Box>
                      )}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <Box sx={{ ml: 4, pb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {step.desc}
                      </Typography>
                    </Box>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FirstTimeBuyerSection;