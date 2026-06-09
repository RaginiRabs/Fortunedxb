'use client';
import { useState, useRef } from 'react';
import { Box, Typography, Paper, IconButton, Tabs, Tab, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectDocumentsTabs = ({
  floorPlans = [],
  paymentPlanFiles = [],
  taxSheetFiles = [],
  isLeadSubmitted = false,
  onUnlockClick,
  onOpenFloorPlan,
  onOpenPaymentPlan,
  onOpenTaxSheet,
}) => {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const [tab, setTab] = useState(0);

  // Only include tabs that actually have files
  const tabs = [];
  if (floorPlans.length) tabs.push({ label: 'Floor Plans', single: 'Floor Plan', files: floorPlans, onOpen: onOpenFloorPlan });
  if (paymentPlanFiles.length) tabs.push({ label: 'Payment Plan', single: 'Payment Plan', files: paymentPlanFiles, onOpen: onOpenPaymentPlan });
  if (taxSheetFiles.length) tabs.push({ label: 'Tax Sheet', single: 'Tax Sheet', files: taxSheetFiles, onOpen: onOpenTaxSheet });

  if (tabs.length === 0) return null;

  const safeTab = Math.min(tab, tabs.length - 1);
  const active = tabs[safeTab];
  const files = active.files;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, color: 'text.primary', mb: 2 }}
      >
        Documents
      </Typography>

      {/* Tabs */}
      <Tabs
        value={safeTab}
        onChange={(e, v) => setTab(v)}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: 0,
          mb: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            minHeight: 0,
            py: 1.25,
            color: 'text.secondary',
            '&.Mui-selected': { color: 'gold.main' },
          },
          '& .MuiTabs-indicator': { backgroundColor: 'gold.main', height: 2 },
        }}
      >
        {tabs.map((t, i) => (
          <Tab key={i} label={`${t.label} (${t.files.length})`} />
        ))}
      </Tabs>

      {/* Cards */}
      <Box sx={{ position: 'relative' }}>
        {files.length > 4 && (
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
              bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: 36, height: 36,
              display: { xs: 'none', md: 'flex' }, '&:hover': { bgcolor: 'background.subtle' },
            }}
          >
            <ChevronLeft size={20} color={theme.palette.text.primary} />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex', gap: 2, overflowX: 'auto', overflowY: 'hidden', pb: 1,
            scrollbarWidth: 'none', msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch',
          }}
        >
          {files.map((doc, idx) => {
            const isPDF = doc.file_path?.toLowerCase().endsWith('.pdf');
            const filePath = doc.file_path?.startsWith('/') ? doc.file_path : `/${doc.file_path}`;

            return (
              <Paper
                key={doc.file_id || idx}
                elevation={0}
                sx={{
                  height: 200, width: 240, flexShrink: 0, borderRadius: 2, overflow: 'hidden',
                  border: '1px solid', borderColor: 'divider', cursor: 'pointer', transition: 'all 0.3s ease',
                  bgcolor: 'background.subtle',
                  '&:hover': {
                    borderColor: 'gold.main', transform: 'translateY(-4px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.gold.main, 0.2)}`,
                  },
                }}
                onClick={() => (isLeadSubmitted ? active.onOpen?.(idx) : onUnlockClick?.())}
              >
                {isPDF ? (
                  <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}>
                    <Box sx={{ fontSize: '3rem', filter: isLeadSubmitted ? 'none' : 'blur(8px)' }}>📄</Box>
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={filePath}
                    alt={`${active.single} ${idx + 1}`}
                    sx={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      filter: isLeadSubmitted ? 'none' : 'blur(4px)', transition: 'filter 0.3s ease',
                    }}
                  />
                )}
              </Paper>
            );
          })}
        </Box>

        {files.length > 4 && (
          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
              bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: 36, height: 36,
              display: { xs: 'none', md: 'flex' }, '&:hover': { bgcolor: 'background.subtle' },
            }}
          >
            <ChevronRight size={20} color={theme.palette.text.primary} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ProjectDocumentsTabs;
