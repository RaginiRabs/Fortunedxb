import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import {
  Globe,
  Shield,
  TrendingUp,
  Plane,
  Banknote,
  ShieldCheck,
  Calendar,
  Calculator,
} from 'lucide-react';

const investorBenefits = [
  {
    icon: Shield,
    title: '0% Property Tax',
    description: 'Dubai offers zero property tax, maximizing your investment returns',
  },
  {
    icon: Globe,
    title: '100% Foreign Ownership',
    description: 'Full property ownership rights for international investors in freehold areas',
  },
  {
    icon: TrendingUp,
    title: 'High ROI Potential',
    description: 'Average rental yields of 6-10%, among the highest globally',
  },
  {
    icon: Plane,
    title: 'Golden Visa Eligibility',
    description: 'Property investment of AED 2M+ qualifies for 10-year Golden Visa',
  },
  {
    icon: Banknote,
    title: 'Flexible Payment Plans',
    description: 'Developer payment plans up to 80/20 post-handover',
  },
  {
    icon: ShieldCheck,
    title: 'RERA Protected',
    description: 'All transactions regulated by Dubai Real Estate Regulatory Agency',
  },
];

const WhyInvestSection = ({ setRoiCalculatorOpen }) => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<Globe size={16} />}
            label="Global Investment Hub"
            sx={{
              bgcolor: 'rgba(198, 169, 98, 0.2)',
              color: 'primary.light',
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>
            Why Invest in Dubai Real Estate?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mx: 'auto' }}>
            Dubai offers unparalleled investment opportunities with tax-free returns,
            world-class infrastructure, and a thriving economy.
          </Typography>
        </Box>

        {/* Benefits Grid */}
        <Grid container spacing={4}>
          {investorBenefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.06)',
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    bgcolor: 'rgba(198, 169, 98, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <benefit.icon size={28} color="#C6A962" />
                </Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 1.5, fontWeight: 600 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 8,
            p: 5,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(198, 169, 98, 0.2) 0%, rgba(198, 169, 98, 0.05) 100%)',
            border: '1px solid rgba(198, 169, 98, 0.3)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
            Ready to Start Your Investment Journey?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, maxWidth: 500, mx: 'auto' }}>
            Our expert consultants are ready to help you find the perfect investment opportunity.
            Book a free consultation today.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Calendar size={20} />}
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                px: 4,
              }}
            >
              Book Free Consultation
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Calculator size={20} />}
              onClick={() => setRoiCalculatorOpen(true)}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                px: 4,
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(198, 169, 98, 0.1)',
                },
              }}
            >
              ROI Calculator
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyInvestSection;