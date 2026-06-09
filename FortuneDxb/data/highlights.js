// Project Highlights - Predefined Options with Custom Support

export const HIGHLIGHTS = [
  // Hot Selling Tags
  'Hot Selling',
  'Best Seller',
  'High Demand',
  'Limited Units',
  'Selling Fast',
  'Last Few Units',
  'Investor Favorite',
  
  // Payment & Price Related
  '0% Down Payment',
  '1% Monthly Payment',
  'Post-Handover Payment Plan',
  'Easy Payment Plan',
  'No Commission',
  'Direct from Developer',
  'Below Market Price',
  'Best Price Guarantee',
  'Flexible Payment',
  '5 Year Payment Plan',
  '10 Year Payment Plan',
  
  // Location Highlights
  'Prime Location',
  'Waterfront Living',
  'Beachfront Property',
  'Downtown Location',
  'Golf Course View',
  'Marina View',
  'Burj Khalifa View',
  'Palm Jumeirah View',
  'Sea View',
  'City View',
  'Park View',
  'Canal View',
  'Metro Adjacent',
  'Near Airport',
  'Near Schools',
  'Near Healthcare',
  
  // Project Status
  'Ready to Move',
  'Near Handover',
  'Under Construction',
  'New Launch',
  'Off-Plan',
  'Completed Project',
  
  // Premium Features
  'Luxury Living',
  'Ultra Luxury',
  'Premium Finishing',
  'Italian Kitchen',
  'European Fixtures',
  'Smart Home Technology',
  'Private Pool',
  'Private Beach Access',
  'Private Garden',
  'High Ceiling',
  'Floor to Ceiling Windows',
  'Branded Residences',
  'Serviced Apartments',
  
  // Investment Highlights
  'High ROI',
  'Guaranteed Rental Return',
  '8% ROI Guaranteed',
  'Freehold Property',
  'Golden Visa Eligible',
  'DLD Waiver',
  'No Service Charge (2 Years)',
  'No Service Charge (5 Years)',
  'Rental Pool Available',
  
  // Special Offers
  'Free Furniture Package',
  'Free Appliances',
  'Free Parking',
  'Free Storage',
  'Waived DLD Fee',
  'Early Bird Discount',
  'Launch Offer',
  'Limited Time Offer',
  
  // Property Type Tags
  'Penthouse Available',
  'Duplex Units',
  'Simplex Units',
  'Townhouse',
  'Full Floor Available',
  'Corner Unit',
  'End Unit',
  
  // Quality & Trust
  'RERA Registered',
  'Escrow Account',
  'Top Developer',
  'Award Winning Project',
  'Green Building Certified',
  'LEED Certified',
];

export const HIGHLIGHT_CATEGORIES = {
  'Hot Selling': [
    'Hot Selling',
    'Best Seller',
    'High Demand',
    'Limited Units',
    'Selling Fast',
    'Last Few Units',
    'Investor Favorite',
  ],
  'Payment & Price': [
    '0% Down Payment',
    '1% Monthly Payment',
    'Post-Handover Payment Plan',
    'Easy Payment Plan',
    'No Commission',
    'Direct from Developer',
    'Below Market Price',
    'Best Price Guarantee',
    'Flexible Payment',
    '5 Year Payment Plan',
    '10 Year Payment Plan',
  ],
  'Location': [
    'Prime Location',
    'Waterfront Living',
    'Beachfront Property',
    'Downtown Location',
    'Golf Course View',
    'Marina View',
    'Burj Khalifa View',
    'Palm Jumeirah View',
    'Sea View',
    'City View',
    'Park View',
    'Canal View',
    'Metro Adjacent',
    'Near Airport',
    'Near Schools',
    'Near Healthcare',
  ],
  'Premium Features': [
    'Luxury Living',
    'Ultra Luxury',
    'Premium Finishing',
    'Italian Kitchen',
    'European Fixtures',
    'Smart Home Technology',
    'Private Pool',
    'Private Beach Access',
    'Private Garden',
    'High Ceiling',
    'Floor to Ceiling Windows',
    'Branded Residences',
    'Serviced Apartments',
  ],
  'Investment': [
    'High ROI',
    'Guaranteed Rental Return',
    '8% ROI Guaranteed',
    'Freehold Property',
    'Golden Visa Eligible',
    'DLD Waiver',
    'No Service Charge (2 Years)',
    'No Service Charge (5 Years)',
    'Rental Pool Available',
  ],
  'Special Offers': [
    'Free Furniture Package',
    'Free Appliances',
    'Free Parking',
    'Free Storage',
    'Waived DLD Fee',
    'Early Bird Discount',
    'Launch Offer',
    'Limited Time Offer',
  ],
  'Property Type': [
    'Penthouse Available',
    'Duplex Units',
    'Simplex Units',
    'Townhouse',
    'Full Floor Available',
    'Corner Unit',
    'End Unit',
  ],
  'Quality & Trust': [
    'RERA Registered',
    'Escrow Account',
    'Top Developer',
    'Award Winning Project',
    'Green Building Certified',
    'LEED Certified',
  ],
};

// Get all highlights as flat list
export const getAllHighlights = () => {
  return HIGHLIGHTS;
};

// Search highlights
export const searchHighlights = (query) => {
  if (!query) return HIGHLIGHTS;
  const lowerQuery = query.toLowerCase();
  return HIGHLIGHTS.filter(highlight => 
    highlight.toLowerCase().includes(lowerQuery)
  );
};

// Get category for a highlight
export const getHighlightCategory = (highlight) => {
  for (const [category, highlights] of Object.entries(HIGHLIGHT_CATEGORIES)) {
    if (highlights.includes(highlight)) {
      return category;
    }
  }
  return 'Custom';
};

// Get category color for styling
export const getHighlightCategoryColor = (highlight) => {
  const category = getHighlightCategory(highlight);
  const colors = {
    'Hot Selling': '#EF4444',      // Red
    'Payment & Price': '#10B981',   // Green
    'Location': '#3B82F6',          // Blue
    'Project Status': '#8B5CF6',    // Purple
    'Premium Features': '#C6A962',  // Gold
    'Investment': '#F59E0B',        // Amber
    'Special Offers': '#EC4899',    // Pink
    'Property Type': '#06B6D4',     // Cyan
    'Quality & Trust': '#14B8A6',   // Teal
    'Custom': '#64748B',            // Gray
  };
  return colors[category] || colors['Custom'];
};