'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Slider,
  Paper,
  Grid,
  IconButton,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Calculator, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const ROICalculatorDialog = ({
  open,
  onClose,
  investmentAmount,
  setInvestmentAmount,
  expectedRoi,
  setExpectedRoi,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: { xs: 2, sm: 3 },
          maxHeight: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Calculator size={20} color={theme.palette.common.white} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            ROI Calculator
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Estimate your potential returns on Dubai off-plan property investment.
          </Typography>

          {/* Investment Amount Slider */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                color: 'text.primary',
              }}
            >
              Investment Amount:{' '}
              <Box component="span" sx={{ fontWeight: 700, color: 'gold.main' }}>
                {formatPrice(investmentAmount)}
              </Box>
            </Typography>
            <Slider
              value={investmentAmount}
              onChange={(e, v) => setInvestmentAmount(v)}
              min={500000}
              max={20000000}
              step={100000}
              sx={{
                color: 'gold.main',
                '& .MuiSlider-thumb': {
                  bgcolor: 'gold.main',
                  '&:hover': {
                    boxShadow: `0 0 0 8px ${alpha(theme.palette.gold.main, 0.16)}`,
                  },
                },
                '& .MuiSlider-track': {
                  bgcolor: 'gold.main',
                },
                '& .MuiSlider-rail': {
                  bgcolor: 'divider',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                AED 500K
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                AED 20M
              </Typography>
            </Box>
          </Box>

          {/* Expected ROI Slider */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                color: 'text.primary',
              }}
            >
              Expected Annual ROI:{' '}
              <Box component="span" sx={{ fontWeight: 700, color: 'gold.main' }}>
                {expectedRoi}%
              </Box>
            </Typography>
            <Slider
              value={expectedRoi}
              onChange={(e, v) => setExpectedRoi(v)}
              min={4}
              max={15}
              step={0.5}
              sx={{
                color: 'gold.main',
                '& .MuiSlider-thumb': {
                  bgcolor: 'gold.main',
                  '&:hover': {
                    boxShadow: `0 0 0 8px ${alpha(theme.palette.gold.main, 0.16)}`,
                  },
                },
                '& .MuiSlider-track': {
                  bgcolor: 'gold.main',
                },
                '& .MuiSlider-rail': {
                  bgcolor: 'divider',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                4%
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                15%
              </Typography>
            </Box>
          </Box>

          {/* Results */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: (theme) => alpha(theme.palette.gold.main, 0.08),
              borderRadius: 2,
              border: (theme) => `1px solid ${alpha(theme.palette.gold.main, 0.2)}`,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  Annual Return
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'success.main',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  {formatPrice((investmentAmount * expectedRoi) / 100)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  5-Year Return
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'success.main',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  {formatPrice(((investmentAmount * expectedRoi) / 100) * 5)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
            color: 'common.white',
            borderRadius: 1,
            px: 3,
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
            },
          }}
        >
          Get Detailed Analysis
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ROICalculatorDialog;