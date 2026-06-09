'use client';
import { useState } from 'react';
import { Box, Typography, Paper, IconButton, Collapse, Divider, useTheme } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProjectFAQList = ({ faqs = [] }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: { xs: '1.1rem', md: '1.25rem' }, 
          fontWeight: 700,
          color: 'text.primary',
          mb: 2
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* FAQ List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {faqs.map((faq, i) => {
          const isExpanded = expanded === i;

          return (
            <Paper 
              key={i}
              elevation={0}
              sx={{ 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: isExpanded ? 'gold.main' : 'divider',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: isExpanded ? 'gold.main' : 'grey.300'
                }
              }}
            >
              {/* Question Header */}
              <Box 
                onClick={() => setExpanded(isExpanded ? -1 : i)}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  p: 2, 
                  cursor: 'pointer', 
                  bgcolor: isExpanded ? 'background.subtle' : 'background.paper',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    bgcolor: isExpanded ? 'background.subtle' : 'grey.50'
                  }
                }}
              >
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    pr: 2,
                    flex: 1
                  }}
                >
                  {faq.question}
                </Typography>
                <IconButton 
                  size="small"
                  sx={{
                    transition: 'transform 0.3s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp size={18} color={theme.palette.gold.main} />
                  ) : (
                    <ChevronDown size={18} color={theme.palette.text.secondary} />
                  )}
                </IconButton>
              </Box>

              {/* Answer Content */}
              <Collapse in={isExpanded} timeout={300}>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Divider sx={{ mb: 1.5 }} />
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      lineHeight: 1.7 
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProjectFAQList;