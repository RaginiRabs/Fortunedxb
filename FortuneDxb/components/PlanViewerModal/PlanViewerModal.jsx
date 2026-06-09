'use client';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';

const PlanViewerModal = ({
  isOpen,
  onClose,
  plans = [], // Array of { path, isPDF, name }
  title = 'Plan',
  subtitle = 'PLAN',
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  if (!plans || plans.length === 0) return null;

  const currentPlan = plans[currentIndex];
  const isPDF = currentPlan?.isPDF;
  const filePath = currentPlan?.path;
  const fileName = currentPlan?.name || `Plan ${currentIndex + 1}`;

  const handlePrev = () => setCurrentIndex((prev) =>
    prev === 0 ? plans.length - 1 : prev - 1
  );

  const handleNext = () => setCurrentIndex((prev) =>
    prev === plans.length - 1 ? 0 : prev + 1
  );

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.click();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: { xs: 1, md: 2 },
          maxHeight: '95vh',
          bgcolor: 'navy.main',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: 'gold.main',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {subtitle}
            </Typography>
            <Typography
              sx={{
                color: 'common.white',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleDownload}
              sx={{
                color: 'gold.main',
                '&:hover': { bgcolor: (theme) => alpha(theme.palette.gold.main, 0.12) },
              }}
            >
              <Download size={20} />
            </IconButton>
            {plans.length > 1 && (
              <Chip
                label={`${currentIndex + 1} / ${plans.length}`}
                size="small"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.gold.main, 0.2),
                  color: 'gold.main',
                  fontWeight: 600,
                }}
              />
            )}
            <IconButton onClick={onClose} sx={{ color: 'common.white' }}>
              <X size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 2,
            position: 'relative',
            minHeight: { xs: 300, md: 500 },
          }}
        >
          {isPDF ? (
            // PDF View — rendered directly inside the modal
            <Box
              sx={{
                height: { xs: '60vh', md: '78vh' },
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.05),
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="iframe"
                src={`${filePath}#toolbar=0&navpanes=0`}
                title={`Plan ${currentIndex + 1}`}
                sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            </Box>
          ) : (
            // Image View
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: '60vh', md: '78vh' },
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.02),
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={filePath}
                alt={fileName}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}

          {/* Navigation Arrows - Only if multiple plans */}
          {plans.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: { xs: 8, md: 16 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'gold.main',
                  color: 'navy.main',
                  '&:hover': {
                    bgcolor: 'gold.light',
                  },
                }}
              >
                <ChevronLeft size={24} />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: { xs: 8, md: 16 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'gold.main',
                  color: 'navy.main',
                  '&:hover': {
                    bgcolor: 'gold.light',
                  },
                }}
              >
                <ChevronRight size={24} />
              </IconButton>
            </>
          )}
        </Box>

      </Box>
    </Dialog>
  );
};

export default PlanViewerModal;