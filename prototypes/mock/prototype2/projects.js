// Mock data for prototype2 ONLY. Mock only — no backend, no API.
// Listing used by the home + projects pages (each links to /prototype2/[id]).
export const projects = [
  { id: 1, name: 'One By Nine', developer: 'Nine Developments', area: 'Nad Al Sheba First, Dubai', priceFrom: 610000, priceLabel: 'AED 610,000', beds: '1 - 3', units: 47, roi: '7.2%', status: 'New Launch', type: 'Apartments', availability: 'Off Plan', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'Sobha One', developer: 'Sobha Realty', area: 'Sobha Hartland, Dubai', priceFrom: 2400000, priceLabel: 'AED 2.40M', beds: '1 - 4', units: 412, roi: '6.8%', status: 'Featured', type: 'Apartments', availability: 'Off Plan', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'Binghatti Skyrise', developer: 'Binghatti', area: 'Business Bay, Dubai', priceFrom: 1700000, priceLabel: 'AED 1.70M', beds: 'Studio - 3', units: 386, roi: '7.1%', status: 'Off Plan', type: 'Apartments', availability: 'Off Plan', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'Azizi Venice', developer: 'Azizi', area: 'Dubai South, Dubai', priceFrom: 1200000, priceLabel: 'AED 1.20M', beds: 'Studio - 2', units: 268, roi: '6.5%', status: 'New Launch', type: 'Apartments', availability: 'Off Plan', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'Danube Bayz', developer: 'Danube Properties', area: 'Business Bay, Dubai', priceFrom: 1600000, priceLabel: 'AED 1.60M', beds: '1 - 3', units: 256, roi: '7.0%', status: 'Off Plan', type: 'Apartments', availability: 'Off Plan', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'Palm Beach Towers', developer: 'Nakheel', area: 'Palm Jumeirah, Dubai', priceFrom: 4800000, priceLabel: 'AED 4.80M', beds: '1 - 4', units: 320, roi: '6.2%', status: 'Featured', type: 'Apartments', availability: 'Ready', image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'The Valley', developer: 'Emaar', area: 'Dubai Land, Dubai', priceFrom: 1100000, priceLabel: 'AED 1.10M', beds: '3 - 4', units: 500, roi: '6.0%', status: 'Off Plan', type: 'Villas', availability: 'Off Plan', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'Sobha Verde', developer: 'Sobha Realty', area: 'Jumeirah Lake Towers, Dubai', priceFrom: 1500000, priceLabel: 'AED 1.50M', beds: '1 - 2', units: 182, roi: '6.7%', status: 'New Launch', type: 'Apartments', availability: 'Ready', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80' },
];

// Distress deals (discounted / repossessed listings).
export const distressDeals = [
  { id: 1, name: 'Marina Heights Tower', area: 'Dubai Marina, Dubai', price: 1250000, original: 2080000, discount: 40, below: 40, dealType: 'Bank Repossessed', beds: '2 Bed', sqft: '1,235 sqft', type: 'Apartment', secondsLeft: 311325, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'The Springs 11', area: 'The Springs, Dubai', price: 2150000, original: 3300000, discount: 35, below: 35, dealType: 'Motivated Seller', beds: '3 Bed', sqft: '2,745 sqft', type: 'Villa', secondsLeft: 202530, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'JLT Cluster P', area: 'Jumeirah Lake Towers, Dubai', price: 850000, original: 1210000, discount: 30, below: 30, dealType: 'Off Market Deal', beds: '1 Bed', sqft: '850 sqft', type: 'Apartment', secondsLeft: 132010, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'Jumeirah Village Circle', area: 'JVC, Dubai', price: 1780000, original: 2450000, discount: 28, below: 28, dealType: 'Auction Property', beds: '4 Bed', sqft: '3,100 sqft', type: 'Villa', secondsLeft: 380000, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'Burj Views A', area: 'Downtown Dubai', price: 1950000, original: 2600000, discount: 25, below: 25, dealType: 'Bank Repossessed', beds: '2 Bed', sqft: '1,100 sqft', type: 'Apartment', secondsLeft: 311285, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'Arabian Ranches 3', area: 'Arabian Ranches, Dubai', price: 1680000, original: 2150000, discount: 22, below: 22, dealType: 'Motivated Seller', beds: '3 Bed', sqft: '2,200 sqft', type: 'Townhouse', secondsLeft: 231055, image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'Business Bay Lux Tower', area: 'Business Bay, Dubai', price: 1100000, original: 1375000, discount: 20, below: 20, dealType: 'Off Market Deal', beds: 'Studio', sqft: '550 sqft', type: 'Apartment', secondsLeft: 114315, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'Executive Bay Tower', area: 'Business Bay, Dubai', price: 3400000, original: 4000000, discount: 15, below: 15, dealType: 'Auction Property', beds: 'Office', sqft: '2,100 sqft', type: 'Commercial', secondsLeft: 473140, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
];

export const dealTypeFacets = [
  { name: 'All Deals', count: 128 },
  { name: 'Bank Repossessed', count: 42 },
  { name: 'Motivated Seller', count: 36 },
  { name: 'Auction Properties', count: 18 },
  { name: 'Off Market Deals', count: 32 },
];

export const discountFacets = [
  { name: '10% - 20%', count: 28 },
  { name: '20% - 30%', count: 46 },
  { name: '30% - 40%', count: 32 },
  { name: '40%+', count: 22 },
];

// Resale (secondary-market) listings — verified, ready-to-move properties.
export const resaleProperties = [
  { id: 1, name: 'Burj Royale', area: 'Downtown Dubai', price: 2650000, original: 2950000, below: 10, beds: '2 Bed', sqft: '1,184 sq.ft', type: 'Apartment', status: 'Ready to Move', badge: 'Best Price', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'Marina Gate 2', area: 'Dubai Marina', price: 1850000, original: 2100000, below: 12, beds: '1 Bed', sqft: '876 sq.ft', type: 'Apartment', status: 'Ready to Move', badge: 'Hot Deal', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'Maple 2', area: 'Dubai Hills Estate', price: 5400000, original: 6200000, below: 13, beds: '4 Bed', sqft: '3,523 sq.ft', type: 'Villa', status: 'Vacant', badge: 'Great Value', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'Sobha Creek Vistas', area: 'Sobha Hartland', price: 1720000, original: 2000000, below: 14, beds: '1 Bed', sqft: '780 sq.ft', type: 'Apartment', status: 'Tenanted', badge: 'Urgent Sale', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'Seven Palm', area: 'Palm Jumeirah', price: 3900000, original: 4500000, below: 13, beds: '2 Bed', sqft: '1,348 sq.ft', type: 'Apartment', status: 'Ready to Move', badge: 'Negotiable', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'Arabian Ranches 3', area: 'Dubai', price: 4800000, original: 5500000, below: 13, beds: '3 Bed', sqft: '2,745 sq.ft', type: 'Townhouse', status: 'Vacant', badge: 'Vacant', image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'BLVD Heights', area: 'Downtown Dubai', price: 2300000, original: 2650000, below: 13, beds: '2 Bed', sqft: '1,098 sq.ft', type: 'Apartment', status: 'Ready to Move', badge: 'Best Price', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'Vida Residence 1', area: 'Dubai Marina', price: 2100000, original: 2450000, below: 14, beds: '2 Bed', sqft: '1,146 sq.ft', type: 'Apartment', status: 'Tenanted', badge: 'Hot Deal', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80' },
];

export const resaleTypeFacets = [
  { name: 'Apartment', count: 186 },
  { name: 'Villa', count: 42 },
  { name: 'Townhouse', count: 18 },
  { name: 'Penthouse', count: 12 },
];

export const resaleStatusFacets = [
  { name: 'Ready to Move', count: 186 },
  { name: 'Tenanted', count: 68 },
];

// Sidebar facets for the projects browser.
export const developerFacets = [
  { name: 'All Developers', count: 500 },
  { name: 'Emaar', count: 98 },
  { name: 'Nakheel', count: 76 },
  { name: 'Sobha Realty', count: 64 },
  { name: 'Danube Properties', count: 52 },
  { name: 'Binghatti', count: 45 },
];

// Full single-project detail — drives the property overview page.
export const project = {
  name: 'Breez By Danube',
  area: 'Madinat Dubai Almelaiheyah',
  developer: 'Danube',
  tag: 'Project',
  heroImage:
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80',
  construction: { label: 'Construction progress', percent: 0.04 },
  launchPrice: 1198000,
  launchLabel: 'Launch price (Sep 2025)',

  highlights: [
    { key: 'units', label: 'Total Units', value: '1,200', icon: 'building' },
    { key: 'launch', label: 'Launch Date', value: 'Sep 2025', icon: 'calendar' },
    { key: 'handover', label: 'Handover', value: 'Jun 2029', icon: 'check' },
    { key: 'status', label: 'Status', value: 'Off-plan', icon: 'clock' },
    { key: 'ppsf', label: 'Average Price / sqft', value: 'AED 3,490', icon: 'dollar' },
    { key: 'volume', label: 'Sales Volume', value: '846', icon: 'activity' },
  ],

  paymentPlan: { commitment: '100%', milestones: 3, plan: 'Standard' },
  paymentSteps: [
    { n: 1, label: 'Down Payment', percent: 20, icon: 'card' },
    { n: 2, label: 'During Construction', percent: 50, icon: 'construction' },
    { n: 3, label: 'On Handover', percent: 30, icon: 'key' },
  ],

  // Expandable floor-plan categories — each opens a layout table.
  floorPlans: [
    {
      key: 'studio',
      beds: 'Studio',
      from: 'AED 1.3M',
      range: '411–478 sqft',
      count: 4,
      layouts: [
        { name: 'Flex Studio -B', size: '411 sqft' },
        { name: 'Flex Studio -A', size: '414 sqft' },
        { name: 'Fixed Studio -D', size: '466 sqft' },
        { name: 'Flex Studio -C', size: '478 sqft' },
      ],
    },
    {
      key: '1bed',
      beds: '1 Bed',
      from: 'AED 2.0M',
      range: '394–793 sqft',
      count: 7,
      layouts: [
        { name: '1 Bed -A', size: '394 sqft' },
        { name: '1 Bed -B', size: '460 sqft' },
        { name: '1 Bed -C', size: '520 sqft' },
        { name: '1 Bed -D', size: '600 sqft' },
        { name: '1 Bed -E', size: '656 sqft' },
        { name: '1 Bed -F', size: '720 sqft' },
        { name: '1 Bed -G', size: '793 sqft' },
      ],
    },
    {
      key: '2bed',
      beds: '2 Beds',
      from: 'AED 2.4M',
      range: '1,026–1,277 sqft',
      count: 2,
      layouts: [
        { name: '2 Bed -A', size: '1,026 sqft' },
        { name: '2 Bed -B', size: '1,277 sqft' },
      ],
    },
    {
      key: '3bed',
      beds: '3 Beds',
      from: 'AED 3.8M',
      range: '1,769 sqft',
      count: 1,
      layouts: [{ name: '3 Bed -A', size: '1,769 sqft' }],
    },
  ],

  // Unit-mix distribution (segmented bar) + specifications table.
  distribution: [
    { label: 'Studio', percent: 48.86 },
    { label: '1 Bed', percent: 40.37 },
    { label: '2 Beds', percent: 8.58 },
    { label: '3 Beds', percent: 1.85 },
    { label: '4 Beds', percent: 0.34 },
  ],
  specs: [
    { beds: 'Studio', sizes: '370–480', avg: 'AED 1,397,000', ppsf: 'AED 3,490/sqft', type: 'Apt', units: 581, left: 138 },
    { beds: '1 Bed', sizes: '590–810', avg: 'AED 2,382,000', ppsf: 'AED 3,430/sqft', type: 'Apt', units: 480, left: 161 },
    { beds: '2 Beds', sizes: '1,030–1,280', avg: 'AED 3,876,000', ppsf: 'AED 3,680/sqft', type: 'Apt', units: 102, left: 40 },
    { beds: '3 Beds', sizes: '1,770–1,770', avg: 'AED 5,670,000', ppsf: 'AED 3,350/sqft', type: 'Apt', units: 22, left: 7 },
  ],

  transactions: [
    { date: '03-06-2026', seller: 'Developer', beds: 'Studio', size: '394 sqft', price: 'AED 1,280,700' },
    { date: '01-06-2026', seller: 'Developer', beds: 'Studio', size: '466 sqft', price: 'AED 1,545,460' },
    { date: '26-05-2026', seller: 'Developer', beds: 'Studio', size: '394 sqft', price: 'AED 1,395,520' },
    { date: '25-05-2026', seller: 'Developer', beds: 'Studio', size: '394 sqft', price: 'AED 1,223,780' },
    { date: '23-05-2026', seller: 'Developer', beds: 'Studio', size: '395 sqft', price: 'AED 1,284,300' },
    { date: '21-05-2026', seller: 'Developer', beds: '2 Beds', size: '1,106 sqft', price: 'AED 4,385,000' },
    { date: '18-05-2026', seller: 'Developer', beds: '1 Bed', size: '656 sqft', price: 'AED 2,318,400' },
    { date: '18-05-2026', seller: 'Developer', beds: '2 Beds', size: '1,106 sqft', price: 'AED 4,390,000' },
  ],

  nav: ['Overview', 'Market data', 'Payment Plan', 'Floor Plans', 'Amenities', 'Specifications', 'Trans'],

  // Location & connectivity for the interactive map.
  location: {
    center: [25.13, 55.21],
    zoom: 11,
    project: { name: 'Breez By Danube', coords: [25.0915, 55.1448] },
    pois: [
      { name: 'Dubai Marina', mins: '15 min', coords: [25.0805, 55.1403], emoji: '🛥️', dir: 'left' },
      { name: 'Palm Jumeirah', mins: '18 min', coords: [25.1124, 55.139], emoji: '🌴', dir: 'left' },
      { name: 'Mall of the Emirates', mins: '20 min', coords: [25.1181, 55.2003], emoji: '🛍️', dir: 'right' },
      { name: 'Downtown / Burj Khalifa', mins: '25 min', coords: [25.1972, 55.2744], emoji: '🏙️', dir: 'right' },
      { name: 'DXB Airport', mins: '32 min', coords: [25.2532, 55.3657], emoji: '✈️', dir: 'top' },
      { name: 'Expo City Dubai', mins: '12 min', coords: [24.9636, 55.1503], emoji: '🎡', dir: 'bottom' },
    ],
    // Full Dubai Metro network.
    metroLines: [
      {
        name: 'Red Line',
        color: '#C0392B',
        path: [
          [25.2335, 55.345], [25.248, 55.352], [25.253, 55.332], [25.266, 55.316],
          [25.254, 55.304], [25.227, 55.286], [25.214, 55.279], [25.202, 55.272],
          [25.188, 55.263], [25.164, 55.245], [25.119, 55.201], [25.105, 55.188],
          [25.098, 55.173], [25.08, 55.14], [25.0688, 55.139], [25.0445, 55.118],
          [25.005, 55.13], [24.9636, 55.1503],
        ],
        stations: [
          { name: 'Union (Interchange)', coords: [25.266, 55.316] },
          { name: 'Burj Khalifa / Dubai Mall', coords: [25.202, 55.272] },
          { name: 'Sobha Realty (nearest)', coords: [25.0688, 55.139] },
        ],
      },
      {
        name: 'Green Line',
        color: '#27AE60',
        path: [
          [25.279, 55.376], [25.27, 55.355], [25.268, 55.33], [25.268, 55.307],
          [25.269, 55.297], [25.263, 55.293], [25.254, 55.304], [25.238, 55.32],
          [25.225, 55.331], [25.2185, 55.337],
        ],
        stations: [
          { name: 'BurJuman (Interchange)', coords: [25.254, 55.304] },
          { name: 'Dubai Healthcare City', coords: [25.232, 55.327] },
        ],
      },
    ],
  },
};
