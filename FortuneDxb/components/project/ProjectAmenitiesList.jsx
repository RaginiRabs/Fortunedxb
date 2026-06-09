'use client';
import { Box, Typography } from '@mui/material';
import { AMENITY_CATEGORIES, getAmenityCategory } from '@/data/amenities';

// Stable category order
const CATEGORY_ORDER = Object.keys(AMENITY_CATEGORIES);

// Keyword hints to auto-sort amenities that aren't in the predefined list.
// Checked in CATEGORY_ORDER; first category with a matching keyword wins.
const CATEGORY_KEYWORDS = {
  Recreation: ['pool', 'swim', 'tennis', 'basketball', 'squash', 'golf', 'court', 'padel', 'splash'],
  Fitness: ['gym', 'fitness', 'yoga', 'jog', 'run', 'cycle', 'cycling', 'sport', 'exercise', 'track', 'pilates'],
  Wellness: ['spa', 'sauna', 'steam', 'jacuzzi', 'wellness', 'massage', 'health', 'meditation', 'therapy'],
  Security: ['security', 'cctv', 'surveillance', 'guard', 'gated', 'access control', 'intercom', '24/7'],
  Parking: ['parking', 'valet', 'ev charg', 'garage', 'car park'],
  Lifestyle: ['beach', 'marina', 'helipad', 'waterfront', 'sky', 'infinity', 'private lift', 'panoramic', 'view deck', 'rooftop'],
  Community: ['garden', 'bbq', 'barbeque', 'kids', 'children', 'play', 'pet', 'community', 'lawn', 'picnic', 'park', 'plaza', 'courtyard'],
  Commercial: ['retail', 'shop', 'supermarket', 'restaurant', 'cafe', 'mall', 'store', 'dining', 'market'],
  Business: ['business', 'meeting', 'office', 'co-working', 'coworking', 'conference', 'workspace'],
  Entertainment: ['cinema', 'game', 'library', 'theater', 'theatre', 'music', 'club', 'lounge', 'party', 'event'],
  Services: ['reception', 'lobby', 'maid', 'maintenance', 'smart home', 'elevator', 'lift', 'prayer', 'concierge', 'shuttle', 'buggy', 'housekeeping', 'laundry', 'wifi', 'internet', 'service'],
};

// Resolve a category for any amenity: exact match first, then keyword guess,
// then a sensible catch-all — never "Custom".
const classifyAmenity = (amenity) => {
  const exact = getAmenityCategory(amenity);
  if (exact !== 'Custom') return exact;

  const a = amenity.toLowerCase();
  for (const category of CATEGORY_ORDER) {
    if (CATEGORY_KEYWORDS[category]?.some((kw) => a.includes(kw))) return category;
  }
  return 'Services';
};

const ProjectAmenitiesList = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) return null;

  // Group amenities by category (auto-classified, no "Custom")
  const grouped = amenities.reduce((acc, amenity) => {
    const category = classifyAmenity(amenity);
    (acc[category] ||= []).push(amenity);
    return acc;
  }, {});

  const categories = CATEGORY_ORDER.filter((c) => grouped[c]?.length);

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
        }}
      >
        Amenities
      </Typography>

      {/* Categories in a 4-column grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          columnGap: 4,
          rowGap: 4,
        }}
      >
        {categories.map((category) => (
          <Box key={category}>
            {/* Category Header */}
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'text.primary',
                fontFamily: '"Quicksand", sans-serif',
                pb: 1,
                mb: 1.5,
                borderBottom: '2px solid',
                borderColor: 'gold.main',
              }}
            >
              {category}
            </Typography>

            {/* Amenities — stacked under the header */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {grouped[category].map((amenity, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'gold.main',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'text.secondary',
                    }}
                  >
                    {amenity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectAmenitiesList;
