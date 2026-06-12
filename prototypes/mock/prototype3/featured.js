// Featured listings for prototype3 home carousel — mock only, no backend.
// Mix of off-plan launches and ready resales across Dubai.
const IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80',
];

// [name, developer, area, type, priceFrom, beds, size, yield, extra]
const SEED = [
  ['Riverside Crescent', 'Sobha Realty', 'Sobha Hartland II', 'off-plan', 1280000, 'Studio – 3 Bed', '400 – 1,150 sq ft', '6.5%', { handover: 'Q4 2027', paymentPlan: '60/40' }],
  ['Bluewaters Bay', 'Meraas', 'Bluewaters Island', 'off-plan', 2650000, '1 – 4 Bed', '740 – 2,100 sq ft', '6.1%', { handover: 'Q2 2028', paymentPlan: '70/30' }],
  ['Marina Gate', 'Select Group', 'Dubai Marina', 'resale', 1950000, '1 – 3 Bed', '830 – 1,460 sq ft', '6.7%', { builtYear: '2019' }],
  ['Creek Vistas', 'Sobha Realty', 'Sobha Hartland', 'off-plan', 1150000, 'Studio – 2 Bed', '420 – 980 sq ft', '6.8%', { handover: 'Q1 2027', paymentPlan: '60/40' }],
  ['Address Residences', 'Emaar', 'Downtown Dubai', 'resale', 3300000, '1 – 3 Bed', '750 – 1,600 sq ft', '6.2%', { builtYear: '2020' }],
  ['Palm Beach Towers', 'Nakheel', 'Palm Jumeirah', 'off-plan', 2950000, '1 – 3 Bed', '780 – 1,700 sq ft', '5.9%', { handover: 'Q3 2027', paymentPlan: '80/20' }],
  ['DAMAC Lagoons', 'DAMAC', 'Dubailand', 'off-plan', 1450000, '3 – 5 Bed', '1,550 – 3,200 sq ft', '6.4%', { handover: 'Q4 2026', paymentPlan: '75/25' }],
  ['JVC Boulevard', 'Nakheel', 'JVC', 'resale', 820000, 'Studio – 1 Bed', '380 – 720 sq ft', '7.4%', { builtYear: '2021' }],
  ['Dubai Hills Estate', 'Emaar', 'Dubai Hills', 'off-plan', 1750000, '1 – 4 Bed', '700 – 2,400 sq ft', '6.3%', { handover: 'Q2 2027', paymentPlan: '60/40' }],
  ['Business Bay Heights', 'Omniyat', 'Business Bay', 'resale', 1620000, '1 – 2 Bed', '650 – 1,180 sq ft', '6.9%', { builtYear: '2018' }],
  ['Creek Gate', 'Emaar', 'Dubai Creek Harbour', 'off-plan', 1680000, '1 – 3 Bed', '700 – 1,500 sq ft', '6.6%', { handover: 'Q1 2028', paymentPlan: '70/30' }],
  ['Ellington House', 'Ellington', 'Dubai Hills', 'off-plan', 1390000, '1 – 3 Bed', '720 – 1,640 sq ft', '6.5%', { handover: 'Q3 2026', paymentPlan: '60/40' }],
  ['Binghatti Canal', 'Binghatti', 'Business Bay', 'resale', 1240000, 'Studio – 2 Bed', '410 – 1,050 sq ft', '7.1%', { builtYear: '2022' }],
  ['Azizi Riviera', 'Azizi', 'MBR City', 'off-plan', 980000, 'Studio – 2 Bed', '380 – 940 sq ft', '7.2%', { handover: 'Q4 2026', paymentPlan: '50/50' }],
  ['Meydan Horizon', 'Meydan', 'Meydan', 'off-plan', 1520000, '1 – 3 Bed', '690 – 1,580 sq ft', '6.4%', { handover: 'Q2 2028', paymentPlan: '65/35' }],
];

export const featured = SEED.map(([name, developer, area, type, priceFrom, beds, size, yld, extra], i) => ({
  id: 100 + i,
  name,
  developer,
  area,
  type,
  status: type === 'off-plan' ? 'New Launch' : 'Ready to move',
  priceFrom,
  beds,
  size,
  yield: yld,
  ...extra,
  highlight: `${type === 'off-plan' ? 'Off-plan launch' : 'Ready resale'} in ${area} by ${developer}.`,
  imageUrl: IMAGES[i % IMAGES.length],
  slug: 'marina-vista',
}));
