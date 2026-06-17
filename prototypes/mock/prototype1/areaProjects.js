// prototype4 ONLY — deterministic mock project lists per community, used by the
// market-map drawer when a project-number badge is clicked. Mock only — no backend.
const SUFFIXES = ['Residences', 'Heights', 'Towers', 'Gardens', 'Vista', 'Pearl', 'Bay', 'Plaza', 'Square', 'Boulevard', 'Park', 'Terraces'];
const DEVELOPERS = ['Emaar', 'Nakheel', 'DAMAC', 'Sobha', 'Meraas', 'Azizi', 'Binghatti', 'Ellington'];
const BEDS = ['Studio', '1 BR', '2 BR', '3 BR', '4 BR'];
const STATUS = ['Off-Plan', 'Ready'];
const IMAGES = [
  'photo-1512453979798-5ea266f8880c',
  'photo-1545324418-cc1a3fa10c00',
  'photo-1546412414-e1885259563a',
  'photo-1502672260266-1c1ef2d93688',
  'photo-1564013799919-ab600027ffc6',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1493809842364-78817add7ffb',
  'photo-1560448204-e02f11c3d0e2',
];

const img = (id) => `https://images.unsplash.com/${id}?w=200&q=70&auto=format&fit=crop`;

// FNV-1a string hash → 32-bit seed
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 — deterministic PRNG from a seed
function rngFrom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Cap how many rows we render in the drawer (badge counts can be large).
export const AREA_PROJECT_CAP = 12;

// Deterministic list of mock projects for a community (same name → same list).
export function projectsForArea(name = '', count = 0) {
  const n = Math.min(Math.max(count | 0, 0), AREA_PROJECT_CAP);
  const rand = rngFrom(hashStr(name));
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const prefix = name.split(' ')[0];
  const used = new Set();
  const out = [];
  for (let i = 0; i < n; i++) {
    let projName;
    let guard = 0;
    do {
      projName = `${prefix} ${pick(SUFFIXES)}`;
      guard++;
    } while (used.has(projName) && guard < 10);
    used.add(projName);
    out.push({
      id: String(hashStr(name + i)),
      name: projName,
      developer: pick(DEVELOPERS),
      beds: pick(BEDS),
      status: pick(STATUS),
      handover: 2026 + Math.floor(rand() * 5),
      priceFrom: Math.round((800000 + rand() * 7200000) / 10000) * 10000,
      image: img(IMAGES[Math.floor(rand() * IMAGES.length)]),
    });
  }
  return out;
}
