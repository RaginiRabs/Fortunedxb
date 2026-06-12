// Mock data for prototype1 home page ONLY. Mock only — no backend, no API.

// Unsplash photo helper (browser-loaded at runtime).
const img = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export const ctaImage = img('1597659840241-37e2b9c2f55f', 1600);
// Hero background — Dubai projects map. Save the supplied image to this path.
export const heroImage = '/images/hero-map.png';

export const stats = [
  { id: 'projects', value: '500+', label: 'Projects' },
  { id: 'developers', value: '100+', label: 'Developers' },
  { id: 'communities', value: '50+', label: 'Communities' },
  { id: 'price', value: '500K', label: 'Starting Price', currency: true },
];

export const topDevelopers = [
  { id: 1, name: 'Emaar', count: 99 },
  { id: 2, name: 'Nakheel', count: 25 },
  { id: 3, name: 'Sobha', count: 20 },
  { id: 4, name: 'Danube', count: 15 },
  { id: 5, name: 'Binghatti', count: 24 },
  { id: 6, name: 'Azizi', count: 34 },
  { id: 7, name: 'Meraas', count: 17 },
];

export const topCommunities = [
  { id: 1, name: 'Dubai Marina', avgPrice: '1.6M', projects: 45, roi: '6.2%', img: img('1528702748617-c64d49f918af') },
  { id: 2, name: 'Downtown Dubai', avgPrice: '2.4M', projects: 38, roi: '5.8%', img: img('1512453979798-5ea266f8880c') },
  { id: 3, name: 'Palm Jumeirah', avgPrice: '4.8M', projects: 28, roi: '6.5%', img: img('1489516408517-0c0a15662682') },
  { id: 4, name: 'Jumeirah Village Circle', avgPrice: '1.1M', projects: 22, roi: '7.1%', img: img('1582672060674-bc2bd808a8b5') },
  { id: 5, name: 'Dubai Hills Estate', avgPrice: '2.2M', projects: 31, roi: '5.9%', img: img('1518684079-3c830dcef090') },
];

export const featuredProjects = [
  { id: 1, name: 'Serenia Living', area: 'Palm Jumeirah', developer: 'Nakheel', price: '2.4M', handover: '2027', featured: true, img: img('1546412414-e1885259563a') },
  { id: 2, name: 'Bayview by Address', area: 'Emaar Beachfront', developer: 'Emaar', price: '3.2M', handover: '2026', featured: false, img: img('1526495124232-a04e1849168c') },
  { id: 3, name: 'Sobha One', area: 'Sobha Hartland', developer: 'Sobha Realty', price: '2.1M', handover: '2028', featured: false, img: img('1580674684081-7617fbf3d745') },
  { id: 4, name: 'Binghatti Skyhall', area: 'Business Bay', developer: 'Binghatti', price: '1.7M', handover: '2026', featured: false, img: img('1597659840241-37e2b9c2f55f') },
];

export const marketInsights = [
  { id: 1, label: 'Price Trend', value: '+12.5%', sub: 'vs last year', accent: '#B89149' },
  { id: 2, label: 'ROI Growth', value: '+6.8%', sub: 'vs last year', accent: '#B89149' },
  { id: 3, label: 'Demand', value: 'High', sub: 'in Luxury Segment', accent: '#B89149' },
];

export const whyInvest = [
  { id: 1, title: 'High ROI', text: 'Dubai offers some of the highest rental yields globally.' },
  { id: 2, title: 'Tax Free Income', text: '0% Property Tax & Capital Gains Tax.' },
  { id: 3, title: 'World Class Infrastructure', text: 'Modern infrastructure with global connectivity.' },
  { id: 4, title: 'Golden Visa', text: 'Get 10 years Golden Visa on property investment.' },
  { id: 5, title: 'Metro Connectivity', text: 'Easy access to metro lines and major landmarks.' },
  { id: 6, title: 'Secure Investment', text: 'Strong legal framework & investor protection.' },
];

export const metroLines = [
  { id: 1, name: 'Red Line', color: '#E2342B' },
  { id: 2, name: 'Green Line', color: '#3FA94A' },
  { id: 3, name: 'Orange (Tram)', color: '#E8801F' },
  { id: 4, name: 'Golden Line', color: '#C8A227' },
  { id: 5, name: 'Blue Line', color: '#2B6CE0' },
];

// Hero map config (real Leaflet map). Approximate Dubai coordinates — mock only.
export const mapCenter = [25.115, 55.2];
export const mapZoom = 11;

// ~30 project pins scattered across Dubai's main communities.
export const projectPins = [
  [25.08, 55.14], [25.09, 55.15], [25.075, 55.13], [25.1, 55.16], [25.07, 55.145],
  [25.2, 55.27], [25.19, 55.28], [25.205, 55.275], [25.185, 55.265], [25.21, 55.28],
  [25.18, 55.24], [25.19, 55.25], [25.176, 55.235], [25.2, 55.255],
  [25.11, 55.13], [25.12, 55.14], [25.105, 55.125],
  [25.05, 55.21], [25.06, 55.22], [25.04, 55.2], [25.07, 55.23],
  [25.0, 55.24], [24.98, 55.26], [25.02, 55.27], [24.96, 55.25],
  [25.23, 55.32], [25.25, 55.33], [25.27, 55.31], [25.26, 55.34],
  [25.15, 55.22], [25.13, 55.21], [25.16, 55.3],
];

// Representative metro line paths (approximate).
export const metroPaths = [
  { color: '#E2342B', path: [[25.29, 55.37], [25.25, 55.33], [25.2, 55.27], [25.16, 55.24], [25.12, 55.2], [25.07, 55.16], [25.0, 55.1]] },
  { color: '#3FA94A', path: [[25.28, 55.32], [25.265, 55.31], [25.255, 55.295], [25.27, 55.32], [25.285, 55.34]] },
  { color: '#C8A227', path: [[25.08, 55.14], [25.05, 55.16], [25.04, 55.19], [25.06, 55.22], [25.09, 55.24]] },
];

export const partners = ['Emaar', 'Nakheel', 'Sobha', 'DAMAC', 'Binghatti', 'Azizi', 'Meraas', 'Danube'];

export const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al Mansoori',
    role: 'Investor · Dubai',
    rating: 5,
    quote:
      'Fortune Realty made my off-plan investment effortless. Their team guided me through every step and the returns have exceeded expectations.',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    role: 'Buyer · United Kingdom',
    rating: 5,
    quote:
      'Buying remotely felt risky until I worked with Fortune. Transparent advice, honest numbers, and a smooth handover. Highly recommended.',
  },
  {
    id: 3,
    name: 'Rajesh Patel',
    role: 'Investor · India',
    rating: 5,
    quote:
      'The market insights and community comparisons helped me pick the right project. Professional, responsive, and genuinely trustworthy.',
  },
];

export const footerLinks = {
  quick: ['Home', 'Projects', 'Developers', 'Communities', 'Market Insights', 'About Us', 'Contact Us'],
  categories: [
    'Off Plan Projects',
    'Ready Properties',
    'Resale Properties',
    'Distress Deals',
    'Luxury Villas',
    'Waterfront Properties',
  ],
  areas: [
    'Dubai Marina',
    'Downtown Dubai',
    'Business Bay',
    'Palm Jumeirah',
    'Dubai Hills Estate',
    'Dubai Creek Harbour',
  ],
};

export const contactInfo = {
  address: 'Office 3407, HDS Tower, Jumeirah Lake Towers, Dubai, UAE',
  phone: '+971 50 123 4567',
  email: 'info@fortunerealtydxb.com',
};

export const footerBadges = ['500+ Verified Projects', '100+ Developers', '25+ Communities', 'RERA ORN: XXXXX'];
