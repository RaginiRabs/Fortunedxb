'use client';
import { useState } from 'react';
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Snackbar,
  useTheme,
} from '@mui/material';
import {
  Share2,
  Play,
  X,
  Copy,
  Check,
  MessageCircle,
  Facebook,
  Linkedin,
  Mail,
} from 'lucide-react';
import { alpha } from '@mui/material/styles';

const GALLERY_HEIGHT = 500;
const GALLERY_GAP = 12;
const SMALL_IMAGE_COUNT = 2;
const SMALL_IMAGE_HEIGHT = (GALLERY_HEIGHT - (GALLERY_GAP * (SMALL_IMAGE_COUNT - 1))) / SMALL_IMAGE_COUNT;

const ProjectImageGallery = ({
  projectImages = [],
  projectName,
  status,
  statusStyle,
  videoUrl,
  onImageClick
}) => {
  const theme = useTheme();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const openShare = (e) => {
    e.stopPropagation();
    setShareOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  // Social channel colors are intentionally fixed (BRAND_COLORS exception); Email uses brand navy.
  const shareTargets = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      href: `https://wa.me/?text=${encodeURIComponent(`${projectName} - ${shareUrl}`)}`
    },
    {
      label: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      label: 'Email',
      icon: Mail,
      color: theme.palette.navy.main,
      href: `mailto:?subject=${encodeURIComponent(projectName)}&body=${encodeURIComponent(shareUrl)}`
    }
  ];

  // Calculate remaining images for "+X More" overlay
  const remainingImages = projectImages.length > 3 ? projectImages.length - 3 : 0;

  // Get image or placeholder
  const getImageSrc = (index) => {
    return projectImages[index] || '/asset/placeholderproject.jpg';
  };

  return (
    <>
      {/* Gallery Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 1.5 }}>
        {/* Main Image */}
        <Box
          onClick={() => onImageClick?.(0)}
          sx={{
            position: 'relative',
            height: { xs: 280, sm: 350, md: GALLERY_HEIGHT },
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            bgcolor: 'navy.main',
            '&:hover img': { transform: 'scale(1.03)' }
          }}
        >
          <Box
            component="img"
            src={getImageSrc(0)}
            alt={projectName}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: (theme) => `linear-gradient(180deg, ${alpha(theme.palette.navy.main, 0.1)} 0%, ${alpha(theme.palette.navy.main, 0.5)} 100%)`
            }}
          />

          {/* Share Button (top-right) */}
          <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
            <IconButton
              onClick={openShare}
              sx={{
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.95),
                width: 36,
                height: 36,
                '&:hover': { bgcolor: 'common.white' }
              }}
            >
              <Share2 size={16} color={theme.palette.navy.main} />
            </IconButton>
          </Box>

          {/* Bottom Buttons */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* Video Button — only when a video is available */}
            {videoUrl ? (
              <Button
                component="a"
                href={videoUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                startIcon={<Play size={14} fill={theme.palette.navy.main} color={theme.palette.navy.main} />}
                sx={{
                  bgcolor: 'gold.main',
                  color: 'navy.main',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.75,
                  '&:hover': { bgcolor: 'gold.light' }
                }}
              >
                Watch Video
              </Button>
            ) : (
              <Box />
            )}
          </Box>
        </Box>

        {/* Small Images - Desktop Only */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: `${GALLERY_GAP}px`,
            height: GALLERY_HEIGHT
          }}
        >
          {[0, 1].map((idx) => {
            const imageIndex = idx + 1;
            const imageSrc = getImageSrc(imageIndex);
            const isLast = idx === 1;
            const isPlaceholder = !projectImages[imageIndex];

            return (
              <Box
                key={idx}
                onClick={() => {
                  if (!isPlaceholder) onImageClick?.(imageIndex);
                }}
                sx={{
                  position: 'relative',
                  height: SMALL_IMAGE_HEIGHT,
                  minHeight: SMALL_IMAGE_HEIGHT,
                  maxHeight: SMALL_IMAGE_HEIGHT,
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: isPlaceholder ? 'default' : 'pointer',
                  bgcolor: 'navy.main',
                  '&:hover img': {
                    transform: isPlaceholder ? 'none' : 'scale(1.08)'
                  },
                }}
              >
                <Box
                  component="img"
                  src={imageSrc}
                  alt={isPlaceholder ? 'No image' : `${projectName} ${imageIndex + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    opacity: isPlaceholder ? 0.3 : 1
                  }}
                />

                {/* +X More Overlay - Only on last image if more images exist */}
                {isLast && remainingImages > 0 && !isPlaceholder && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: (theme) => alpha(theme.palette.navy.main, 0.7),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 0.5
                    }}
                  >
                    <Box sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'common.white' }}>
                      +{remainingImages}
                    </Box>
                    <Box sx={{ color: 'gold.main', fontSize: '0.7rem', fontWeight: 600 }}>
                      More Photos
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Share Modal */}
      <Dialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, bgcolor: 'background.paper' } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'text.primary' }}>
              Share this project
            </Typography>
            <IconButton size="small" onClick={() => setShareOpen(false)} sx={{ color: 'text.secondary' }}>
              <X size={18} />
            </IconButton>
          </Box>

          {/* Social targets */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 2.5 }}>
            {shareTargets.map((t) => (
              <Box
                key={t.label}
                component="a"
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  flex: 1,
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75,
                  py: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: t.color, bgcolor: 'background.subtle' }
                }}
              >
                <t.icon size={22} color={t.color} />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.primary' }}>
                  {t.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Copy link */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={shareUrl}
              InputProps={{ readOnly: true, sx: { fontSize: '0.8rem', color: 'text.secondary' } }}
            />
            <Button
              onClick={handleCopyLink}
              variant="contained"
              startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
              sx={{
                bgcolor: copied ? 'success.main' : 'gold.main',
                color: 'navy.main',
                fontWeight: 700,
                borderRadius: 1.5,
                whiteSpace: 'nowrap',
                px: 2,
                '&:hover': { bgcolor: copied ? 'success.main' : 'gold.light' }
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default ProjectImageGallery;
