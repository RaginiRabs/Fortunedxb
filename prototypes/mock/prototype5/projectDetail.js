// Mock project-detail data for prototype5 ONLY. Mock only — no backend, no API.

// Floor-plan layout builder — derives suite/total + image path from a few inputs.
// Real plan images live at /public/images/one-by-nine/floorplans/<group>-<slug>.jpg;
// a built-in schematic placeholder renders when an image is missing.
function layout(group, name, total, outdoor, outdoorLabel = 'Balcony') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    id: `${group}-${slug}`,
    name,
    size: `${total.toLocaleString()} sqft`,
    total,
    suite: total - outdoor,
    outdoor,
    outdoorLabel,
    img: `/images/one-by-nine/floorplans/${group}-${slug}`,
  };
}

// Mirrors the reference page (fortunedxb.com — "One By Nine"). All copy/labels
// match the reference screenshots; currency rendered as "AED".

export const projectDetail = {
  slug: 'one-by-nine',
  name: 'One By Nine',
  location: 'Nad Al Sheba First',
  developer: 'Nine Developments',
  developerTag: 'Developer',
  // Developer logo — base path (any extension); falls back to initials.
  developerLogo: '/images/one-by-nine/nine-developments',
  badge: 'Project',
  type: 'Apt',

  // Top section-nav tabs (anchor ids match the section components below).
  tabs: [
    { id: 'overview', label: 'Overview' },
    { id: 'market-data', label: 'Market data' },
    { id: 'payment-plan', label: 'Payment Plan' },
    { id: 'floor-plans', label: 'Floor Plans' },
    { id: 'about', label: 'About' },
    { id: 'investment', label: 'Investment' },
    { id: 'location', label: 'Location' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'faq', label: 'FAQ' },
  ],

  // About — short factual description + key facts (no filler).
  about: {
    description:
      'One By Nine is a boutique residential development by Nine Developments in Nad Al Sheba First — 47 units ranging from studios to 2-bedroom apartments. Minutes from Meydan and Downtown Dubai, it targets investors seeking strong rental demand in an emerging freehold community.',
    keyFacts: [
      { label: 'Property type', value: 'Apartments' },
      { label: 'Ownership', value: 'Freehold' },
      { label: 'Total units', value: '47' },
      { label: 'Structure', value: 'G + 7 floors' },
      { label: 'Unit mix', value: 'Studio · 1 & 2 Bed' },
      { label: 'Completion', value: 'Q4 2025' },
    ],
  },

  // Construction timeline — key dates with status.
  timeline: [
    { id: 't1', label: 'Project Launch', date: 'Sep 2024', status: 'done' },
    { id: 't2', label: 'Construction (38.74%)', date: 'In progress', status: 'current' },
    { id: 't3', label: 'Structure Complete', date: 'Q2 2025', status: 'upcoming' },
    { id: 't4', label: 'Handover', date: 'Nov 2025', status: 'upcoming' },
  ],

  // Investment — price trend (AED/sqft) + ROI metrics.
  investment: {
    priceTrends: {
      years: ['2022', '2023', '2024', '2025', '2026'],
      area: [1180, 1320, 1480, 1620, 1750], // Nad Al Sheba area avg
      project: [null, null, 1680, 1830, 1980], // launched 2024
    },
    roi: [
      { label: 'Gross Rental Yield', value: '7.2%', hint: 'Est. annual rent ÷ price' },
      { label: 'Avg Annual Appreciation', value: '+9.4%', hint: 'Area price growth (YoY)' },
      { label: 'Est. 5-Year ROI', value: '38%', hint: 'Rent + appreciation' },
      { label: 'Service Charge', value: 'AED 14/sqft', hint: 'Per year, estimated' },
    ],
  },

  // Mortgage calculator defaults (interactive on the client).
  mortgage: {
    price: 1486000,
    downPaymentPct: 20,
    years: 25,
    rate: 4.5,
  },

  // Connectivity — drive times from the project.
  connectivity: [
    { place: 'Meydan Racecourse', time: '4 min' },
    { place: 'Meydan One Mall', time: '6 min' },
    { place: 'Kent College Dubai', time: '5 min' },
    { place: 'Ras Al Khor Sanctuary', time: '7 min' },
    { place: 'Nearest Metro (planned)', time: '8 min' },
    { place: 'Business Bay', time: '10 min' },
    { place: 'Downtown / Dubai Mall', time: '12 min' },
    { place: 'DIFC', time: '14 min' },
    { place: 'Dubai Hills Mall', time: '15 min' },
    { place: 'Dubai International Airport', time: '18 min' },
    { place: 'Dubai Marina / JBR', time: '25 min' },
    { place: 'Al Maktoum Intl Airport', time: '35 min' },
  ],

  // Developer profile.
  developerProfile: {
    name: 'Nine Developments',
    logo: '/images/one-by-nine/nine-developments',
    about:
      'Nine Developments is a Dubai-based developer focused on design-led residential communities, known for contemporary architecture and on-time delivery.',
    stats: [
      { label: 'Projects', value: '6' },
      { label: 'Units delivered', value: '1,200+' },
      { label: 'Years active', value: '8' },
      { label: 'On-time delivery', value: '98%' },
    ],
    otherProjects: [
      { id: 'op1', name: 'Nine Yards', area: 'JVC', priceFrom: 'AED 720,000' },
      { id: 'op2', name: 'The Ninth', area: 'Business Bay', priceFrom: 'AED 1.1M' },
      { id: 'op3', name: 'Nine Park', area: 'Dubai Hills', priceFrom: 'AED 1.4M' },
    ],
  },

  // FAQ — buyer questions.
  faq: [
    { q: 'What is the payment plan?', a: '10% down payment, 40% during construction, 10% on handover and 40% post-handover (Standard plan, 4 milestones).' },
    { q: 'When is handover?', a: 'Handover is scheduled for November 2025. Construction is currently 38.74% complete.' },
    { q: 'Is the property freehold?', a: 'Yes. One By Nine is freehold and open to all nationalities.' },
    { q: 'What rental yield can I expect?', a: 'Gross rental yield is estimated at around 7.2% based on current area rents.' },
    { q: 'Are there service charges?', a: 'Estimated service charge is around AED 14 per sqft per year.' },
    { q: 'Can I get a mortgage on off-plan?', a: 'Yes — banks typically finance up to 50% LTV on off-plan properties, subject to eligibility.' },
  ],

  // Similar projects (mock — same area / segment).
  similar: [
    { id: 'sp1', name: 'Sobha Hartland II', developer: 'Sobha', area: 'MBR City', priceFrom: 'AED 1.35M', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=70' },
    { id: 'sp2', name: 'Azizi Riviera', developer: 'Azizi', area: 'Meydan', priceFrom: 'AED 780K', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=70' },
    { id: 'sp3', name: 'District One West', developer: 'Nakheel', area: 'MBR City', priceFrom: 'AED 1.9M', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=70' },
  ],

  // Gallery — `src` is a base path WITHOUT extension; .webp/.jpg/.png/etc. are
  // auto-resolved. If no local file exists, the Unsplash `fallback` loads.
  gallery: [
    { id: 1, label: 'Exterior', src: '/images/one-by-nine/exterior', fallback: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80' },
    { id: 2, label: 'Living', src: '/images/one-by-nine/living', fallback: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80' },
    { id: 3, label: 'Bedroom', src: '/images/one-by-nine/bedroom', fallback: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80' },
    // Add more images by dropping files in /public/images/one-by-nine/ and
    // un-commenting (or adding) entries below:
    // { id: 4, label: 'Kitchen', src: '/images/one-by-nine/kitchen' },
    // { id: 5, label: 'Bathroom', src: '/images/one-by-nine/bathroom' },
    // { id: 6, label: 'Amenities', src: '/images/one-by-nine/amenities' },
  ],

  construction: {
    label: 'Construction progress',
    percent: 38.74,
  },

  launch: {
    label: 'Launch Price (Sep 2024)',
    price: 610000,
  },

  // Market Highlights stat cards.
  highlights: [
    { id: 'units', label: 'Total Units', value: '47', icon: 'building' },
    { id: 'launch', label: 'Launch Date', value: 'Sep 2024', icon: 'calendar' },
    { id: 'handover', label: 'Handover', value: 'Nov 2025', icon: 'check' },
    { id: 'status', label: 'Status', value: 'Off-plan', icon: 'clock' },
    { id: 'ppsf', label: 'Average Price / Sqft', value: 'AED 1,830', icon: 'dollar' },
    { id: 'volume', label: 'Sales Volume', value: '8', icon: 'activity' },
  ],

  // Amenities — labels match common reference categories.
  amenities: [
    { id: 'pool', label: 'Swimming Pool', icon: 'waves' },
    { id: 'gym', label: 'Fitness Centre', icon: 'dumbbell' },
    { id: 'parking', label: 'Covered Parking', icon: 'car' },
    { id: 'security', label: '24/7 Security', icon: 'shield' },
    { id: 'kids', label: 'Kids Play Area', icon: 'baby' },
    { id: 'garden', label: 'Landscaped Gardens', icon: 'trees' },
    { id: 'lounge', label: 'Residents Lounge', icon: 'sofa' },
    { id: 'retail', label: 'Retail & Dining', icon: 'shopping-bag' },
  ],

  payment: {
    totalCommitment: 100,
    milestonesCount: 4,
    plan: 'Standard',
    milestones: [
      { id: 1, label: 'Down Payment', percent: 10 },
      { id: 2, label: 'During Construction', percent: 40 },
      { id: 3, label: 'On Handover', percent: 10 },
      { id: 4, label: 'After Handover', percent: 40 },
    ],
  },

  // Floor Plans & Layouts — grouped by bedroom type (accordion + detail modal).
  floorPlans: [
    {
      id: 'studio',
      type: 'Studio',
      fromPrice: 'AED 1.0M',
      sizeRange: '560–666 sqft',
      count: 2,
      layouts: [
        layout('studio', 'Type B', 560, 208, 'Balcony'),
        layout('studio', 'Type A', 666, 314, 'Terrace'),
      ],
    },
    {
      id: '1bed',
      type: '1 Bed',
      fromPrice: 'AED 1.3M',
      sizeRange: '733–1,189 sqft',
      count: 6,
      layouts: [
        layout('1bed', 'Type C', 733, 87, 'Balcony'),
        layout('1bed', 'Type A', 830, 90, 'Balcony'),
        layout('1bed', 'Type D', 874, 95, 'Balcony'),
        layout('1bed', 'Type B', 930, 100, 'Balcony'),
        layout('1bed', 'Type P1', 1148, 150, 'Balcony'),
        layout('1bed', 'Type E', 1189, 160, 'Terrace'),
      ],
    },
    {
      id: '2bed',
      type: '2 Beds',
      fromPrice: 'AED 2.0M',
      sizeRange: '1,057–1,777 sqft',
      count: 9,
      layouts: [
        layout('2bed', 'Type A', 1057, 130, 'Balcony'),
        layout('2bed', 'Type B', 1188, 145, 'Balcony'),
        layout('2bed', 'Type C', 1290, 160, 'Balcony'),
        layout('2bed', 'Type D', 1377, 175, 'Balcony'),
        layout('2bed', 'Type E', 1455, 185, 'Balcony'),
        layout('2bed', 'Type F', 1560, 200, 'Balcony'),
        layout('2bed', 'Type G', 1644, 220, 'Terrace'),
        layout('2bed', 'Type H', 1710, 240, 'Terrace'),
        layout('2bed', 'Type I', 1777, 260, 'Terrace'),
      ],
    },
  ],

  // Unit Specifications — distribution + table.
  specDistribution: [
    { id: 'studio', label: 'Studio', percent: 10.64, color: '#16A34A' },
    { id: '1bed', label: '1 Bed', percent: 51.06, color: '#B0905E' },
    { id: '2bed', label: '2 Beds', percent: 38.3, color: '#0F766E' },
  ],
  specs: [
    { beds: 'Studio', sizes: '560–660', avgPrice: 'AED 837,000', perSqft: 'AED 1,490/sqft', type: 'Apt', units: 5, available: '3 left' },
    { beds: '1 Bed', sizes: '730–1,180', avgPrice: 'AED 1,486,000', perSqft: 'AED 2,000/sqft', type: 'Apt', units: 24, available: '21 left' },
    { beds: '2 Beds', sizes: '1,070–1,760', avgPrice: 'AED 2,084,000', perSqft: 'AED 1,780/sqft', type: 'Apt', units: 18, available: '12 left' },
  ],

  // Location map (mock, approximate coords near Nad Al Sheba First, Dubai).
  geo: {
    center: [25.1665, 55.321],
    zoom: 12,
    pois: {
      // category keys match the "Show" toggles in the reference.
      metros: [
        { id: 'm1', name: 'Nad Al Sheba Metro (planned)', lat: 25.183, lng: 55.302 },
        { id: 'm2', name: 'Creek Harbour Station', lat: 25.203, lng: 55.349 },
      ],
      schools: [
        { id: 's1', name: 'Kent College Dubai', lat: 25.156, lng: 55.327 },
        { id: 's2', name: 'Hartland International School', lat: 25.182, lng: 55.301 },
      ],
      medicals: [
        { id: 'h1', name: 'Mediclinic Meydan', lat: 25.171, lng: 55.305 },
        { id: 'h2', name: 'Aster Clinic Nad Al Sheba', lat: 25.158, lng: 55.336 },
      ],
      landmarks: [
        { id: 'l1', name: 'Meydan Racecourse', lat: 25.158, lng: 55.302, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=160&q=70' },
        { id: 'l2', name: 'The Track, Meydan Golf', lat: 25.173, lng: 55.296, img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=160&q=70' },
        { id: 'l3', name: 'Dubai Mall & Burj Khalifa', lat: 25.197, lng: 55.279, img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=160&q=70' },
      ],
    },
    // Approximate metro line paths + stations (mock, illustrative — follows the
    // real Dubai corridors closely enough to read like investmentmap.ai).
    metroLines: [
      {
        id: 'red', label: 'Red Line', color: '#E5484D', stations: true,
        path: [
          [25.2540, 55.3490], [25.2470, 55.3460], [25.2390, 55.3370], [25.2330, 55.3300],
          [25.2280, 55.3090], [25.2230, 55.2940], [25.2180, 55.2830], [25.2080, 55.2790],
          [25.1980, 55.2790], [25.1870, 55.2740], [25.1760, 55.2620], [25.1500, 55.2380],
          [25.1180, 55.2050], [25.0920, 55.1760], [25.0700, 55.1450], [25.0540, 55.1300],
          [25.0410, 55.1170], [25.0270, 55.1070],
        ],
      },
      {
        id: 'green', label: 'Green Line', color: '#30A46C', stations: true,
        path: [
          [25.2900, 55.3760], [25.2820, 55.3700], [25.2750, 55.3550], [25.2700, 55.3450],
          [25.2650, 55.3370], [25.2600, 55.3280], [25.2560, 55.3180], [25.2520, 55.3100],
          [25.2480, 55.3070], [25.2440, 55.3110], [25.2470, 55.3200], [25.2530, 55.3280],
          [25.2600, 55.3340],
        ],
      },
      {
        id: 'orange', label: 'Orange (Tram)', color: '#F76808', stations: true,
        path: [
          [25.0760, 55.1340], [25.0820, 55.1380], [25.0900, 55.1430], [25.0990, 55.1460],
          [25.1010, 55.1530], [25.0930, 55.1560], [25.0850, 55.1490], [25.0820, 55.1430],
        ],
      },
      {
        id: 'golden', label: 'Golden Line', color: '#D4AF37', note: 'In progress', dashed: true,
        path: [[25.2050, 55.2700], [25.1900, 55.2900], [25.1750, 55.3050], [25.1600, 55.3250]],
      },
      {
        id: 'blue', label: 'Blue Line', color: '#3E63DD', note: 'In progress', dashed: true, stations: true,
        path: [
          [25.2050, 55.3490], [25.1960, 55.3700], [25.1820, 55.3950], [25.1640, 55.4030],
          [25.1480, 55.4080], [25.1320, 55.4180], [25.1180, 55.4250],
        ],
      },
    ],
  },

  transactions: [
    { date: '11-12-2025', seller: 'Developer', beds: '2 Beds', size: '1,143 sqft', price: 'AED 2,023,680' },
    { date: '11-12-2025', seller: 'Developer', beds: '1 Bed', size: '883 sqft', price: 'AED 1,675,000' },
    { date: '11-12-2025', seller: 'Developer', beds: '1 Bed', size: '737 sqft', price: 'AED 1,469,000' },
    { date: '17-11-2025', seller: 'Developer', beds: '2 Beds', size: '1,546 sqft', price: 'AED 2,505,636' },
    { date: '15-10-2025', seller: 'Developer', beds: '2 Beds', size: '1,545 sqft', price: 'AED 2,505,458' },
    { date: '29-08-2025', seller: 'Developer', beds: '2 Beds', size: '1,142 sqft', price: 'AED 2,022,720' },
    { date: '31-07-2025', seller: 'Developer', beds: '1 Bed', size: '735 sqft', price: 'AED 1,486,000' },
    { date: '12-06-2025', seller: 'Developer', beds: 'Studio', size: '562 sqft', price: 'AED 1,063,000' },
  ],
};

// Chess View — per-tower unit grid (mock, deterministic so server + client match).
// Floors = rows, units = columns. Each unit is either sold (has a last price)
// or "Never Sold"; trailing missing units render as empty cells.
function genTower(name, seed) {
  const floorCount = 12;
  const maxUnits = 6;
  const floors = [];
  let total = 0;
  let sold = 0;
  for (let f = 0; f < floorCount; f++) {
    const floorNo = floorCount - f; // top floor first
    const drop = (seed + floorNo) % 7 === 0 ? 2 : (seed + floorNo) % 4 === 0 ? 1 : 0;
    const unitCount = maxUnits - drop;
    const units = [];
    for (let u = 0; u < maxUnits; u++) {
      if (u >= unitCount) {
        units.push({ id: `${floorNo}-${u}`, empty: true });
        continue;
      }
      const k = (seed + f * 7 + u * 13) % 100;
      const sqft = 560 + ((k * 17) % 1240); // 560–1800
      const perSqft = 1080 + ((k * 9) % 1000); // ~1080–2080
      const isSold = (k + u * 3) % 100 < 23; // ~23% sold
      const price = isSold ? Math.round((sqft * perSqft) / 10000) * 10000 : null;
      total += 1;
      if (isSold) sold += 1;
      units.push({ id: `${floorNo}-${u}`, label: `${floorNo}-${u + 1}`, sqft, perSqft, sold: isSold, price });
    }
    floors.push({ floor: floorNo, units });
  }
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
    maxUnits,
    floors,
    salesPercent: Math.round((sold / total) * 1000) / 10,
  };
}

projectDetail.chess = {
  towers: [
    genTower('One By Nine — Tower A', 7),
    genTower('One By Nine — Tower B', 23),
    genTower('One By Nine — Podium', 41),
  ],
};

// Keyed lookup so the dynamic route can resolve a project by slug.
export const projectsBySlug = {
  [projectDetail.slug]: projectDetail,
};
