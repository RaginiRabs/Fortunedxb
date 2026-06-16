// prototype4 ONLY — mock content for the home page showcase sections.
// Popular locations + popular developers (image, name, 2-line description).
// Mock only — no backend, no API.
const img = (id, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const popularLocations = [
  {
    name: 'Dubai Marina',
    image: img('photo-1526495124232-a04e1849168c'),
    projects: 42,
    blurb: 'Waterfront high-rises and yacht-lined promenades. Dubai’s most iconic address for skyline living and strong rental demand.',
  },
  {
    name: 'Palm Jumeirah',
    image: img('photo-1512917774080-9991f1c4c750'),
    projects: 28,
    blurb: 'The world-famous island of ultra-luxury beachfront villas and branded residences, each with private beach access.',
  },
  {
    name: 'Downtown Dubai',
    image: img('photo-1518684079-3c830dcef090'),
    projects: 36,
    blurb: 'Home to Burj Khalifa and Dubai Mall — the cultural heart with premium towers built for long-term capital growth.',
  },
  {
    name: 'Business Bay',
    image: img('photo-1546412414-e1885259563a'),
    projects: 31,
    blurb: 'A fast-rising canal-side district with modern apartments, high rental yields and effortless Downtown connectivity.',
  },
  {
    name: 'Dubai Creek Harbour',
    image: img('photo-1502672260266-1c1ef2d93688'),
    projects: 24,
    blurb: 'A master-planned waterfront community blending parkland, marina promenades and contemporary creek-view residences.',
  },
  {
    name: 'JBR & Bluewaters',
    image: img('photo-1577495508048-b635879837f1'),
    projects: 19,
    blurb: 'Beachfront lifestyle beside Ain Dubai, with vibrant retail, walkable promenades and sought-after sea-view apartments.',
  },
];

export const popularDevelopers = [
  {
    name: 'Emaar',
    image: img('photo-1518684079-3c830dcef090', 1000),
    projects: 120,
    areas: 14,
    fromPrice: 1850000,
    blurb: 'Dubai’s flagship master developer behind Downtown Dubai, Dubai Marina and the Burj Khalifa — a byword for quality and on-time delivery.',
  },
  {
    name: 'Nakheel',
    image: img('photo-1512917774080-9991f1c4c750', 1000),
    projects: 64,
    areas: 9,
    fromPrice: 4200000,
    blurb: 'Creator of Palm Jumeirah and the emirate’s most ambitious waterfront communities, reshaping Dubai’s coastline for two decades.',
  },
  {
    name: 'DAMAC',
    image: img('photo-1577717903315-1691ae25ab3f', 1000),
    projects: 88,
    areas: 11,
    fromPrice: 2650000,
    blurb: 'A luxury developer renowned for branded residences with Versace and Cavalli, plus premium golf-community living across Dubai.',
  },
];
