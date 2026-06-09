'use client';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProjectAboutContent = ({
  projectName,
  about,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight) || 28;
      const maxHeight = lineHeight * 4;
      setNeedsExpansion(contentRef.current.scrollHeight > maxHeight + 10);
    }
  }, [about]);

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          fontWeight: 700,
          // fontFamily: 'cursive',
          color: 'text.primary',
          mb: 2,
        }}
      >
        About {projectName}
      </Typography>

      {/* About Text with Read More */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <Typography
            ref={contentRef}
            sx={{
              color: 'text.primary',
              lineHeight: 1.9,
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              overflow: 'hidden',
              textAlign: 'justify',
              display: '-webkit-box',
              WebkitLineClamp: isExpanded ? 'unset' : 4,
              WebkitBoxOrient: 'vertical',
              pr: 1,
            }}
          >
            {about}
          </Typography>
          {needsExpansion && !isExpanded && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 60,
                background: `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`
              }}
            />
          )}
        </Box>
        {needsExpansion && (
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            endIcon={isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            sx={{
              color: 'gold.main',
              fontWeight: 600,
              mt: 1.5,
              fontSize: '0.9rem',
              textTransform: 'none',
              p: 0
            }}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProjectAboutContent;