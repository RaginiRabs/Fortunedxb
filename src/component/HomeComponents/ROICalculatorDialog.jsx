import React from 'react';
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
} from '@mui/material';
import { Calculator } from 'lucide-react';

const ROICalculatorDialog = ({
  open,
  onClose,
  investmentAmount,
  setInvestmentAmount,
  expectedRoi,
  setExpectedRoi,
}) => {
  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `AED ${(value / 1000000).toFixed(1)}M`;
    }
    return `AED ${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Calculator size={24} color="#C6A962" />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              fontWeight: 600,
            }}
          >
            ROI Calculator
          </Typography>
        </Box>
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
          
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Investment Amount: <strong>{formatPrice(investmentAmount)}</strong>
          </Typography>
          <Slider
            value={investmentAmount}
            onChange={(e, v) => setInvestmentAmount(v)}
            min={500000}
            max={20000000}
            step={100000}
            sx={{
              mb: 3,
              color: '#C6A962',
              '& .MuiSlider-thumb': {
                bgcolor: '#C6A962',
              },
              '& .MuiSlider-track': {
                bgcolor: '#C6A962',
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Expected Annual ROI: <strong>{expectedRoi}%</strong>
          </Typography>
          <Slider
            value={expectedRoi}
            onChange={(e, v) => setExpectedRoi(v)}
            min={4}
            max={15}
            step={0.5}
            sx={{
              mb: 4,
              color: '#C6A962',
              '& .MuiSlider-thumb': {
                bgcolor: '#C6A962',
              },
              '& .MuiSlider-track': {
                bgcolor: '#C6A962',
              },
            }}
          />

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'rgba(198, 169, 98, 0.1)',
              borderRadius: 1.5,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  Annual Return
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#10B981',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  {formatPrice(investmentAmount * expectedRoi / 100)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  5-Year Return
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#10B981',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  {formatPrice(investmentAmount * expectedRoi / 100 * 5)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
            color: '#FFFFFF',
            borderRadius: 1,
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
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