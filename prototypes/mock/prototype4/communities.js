// MOCK Dubai community polygons for prototype4 ONLY (MapLibre choropleth).
// Replace COMMUNITIES with real GeoJSON later:
//   Dubai Pulse / ArcGIS Hub "Dubai Communities" → flat props per feature:
//   { name, community_number, avgPrice, salesVolume, supply, projectCount, center:[lng,lat] }

const RAMP = ['#F1E4CF', '#E3C79B', '#C9A06B', '#A8794E', '#6E4B30', '#3A2A20'];

export const METRICS = {
  avgPrice: { label: 'Avg Price', unit: 'AED/sqft', stops: [900, 1200, 1500, 1900, 2400], fmt: (v) => `AED ${v.toLocaleString()}` },
  salesVolume: { label: 'Sales Volume', unit: 'sales/yr', stops: [300, 700, 1200, 2000, 3000], fmt: (v) => v.toLocaleString() },
  supply: { label: 'Upcoming Supply', unit: 'units', stops: [1000, 3000, 6000, 10000, 15000], fmt: (v) => v.toLocaleString() },
};

export { RAMP };

// MapLibre interpolate expression: value → ramp colour for the chosen metric.
export function rampExpression(metric) {
  const { stops } = METRICS[metric];
  const expr = ['interpolate', ['linear'], ['get', metric], 0, RAMP[0]];
  stops.forEach((s, i) => expr.push(s, RAMP[i + 1]));
  return expr;
}

// rectangle ring in GeoJSON [lng,lat] order
const poly = (lng, lat, dx, dy) => [[
  [lng - dx, lat + dy], [lng + dx, lat + dy], [lng + dx, lat - dy], [lng - dx, lat - dy], [lng - dx, lat + dy],
]];

const feat = (name, code, lng, lat, avgPrice, salesVolume, supply, projectCount, dx = 0.02, dy = 0.016) => ({
  type: 'Feature',
  properties: { name, community_number: code, avgPrice, salesVolume, supply, projectCount, center: [lng, lat] },
  geometry: { type: 'Polygon', coordinates: poly(lng, lat, dx, dy) },
});

export const COMMUNITIES = {
  type: 'FeatureCollection',
  features: [
    feat('Downtown Dubai', 345, 55.274, 25.196, 2350, 2900, 14000, 17),
    feat('Business Bay', 346, 55.262, 25.186, 1850, 2400, 11000, 36, 0.022, 0.018),
    feat('DIFC', 343, 55.281, 25.214, 2100, 1500, 3000, 6, 0.014, 0.012),
    feat('Dubai Marina', 392, 55.142, 25.080, 1700, 3100, 6200, 10, 0.018, 0.02),
    feat('JBR', 393, 55.133, 25.078, 1900, 1200, 800, 8, 0.012, 0.012),
    feat('Palm Jumeirah', 391, 55.138, 25.112, 2400, 900, 2100, 4, 0.03, 0.018),
    feat('JVC (Jumeirah Village Circle)', 640, 55.209, 25.058, 980, 3000, 15000, 80, 0.026, 0.022),
    feat('Dubai Hills', 671, 55.245, 25.103, 1450, 1800, 9000, 17, 0.026, 0.02),
    feat('Al Jaddaf', 329, 55.143, 25.222, 1300, 700, 5200, 21, 0.016, 0.014),
    feat('Dubai Creek Harbour', 326, 55.345, 25.197, 1900, 1600, 8800, 12, 0.024, 0.02),
    feat('MBR City', 695, 55.300, 25.170, 1550, 1100, 12000, 16, 0.03, 0.024),
    feat('Meydan', 698, 55.300, 25.135, 1400, 600, 6000, 1, 0.026, 0.02),
  ],
};

export const DUBAI = { center: [55.235, 25.155], zoom: 10.4 }; // [lng, lat]

// ── Real-GeoJSON drop-in ─────────────────────────────────────────────
// Save a real Dubai community-boundary GeoJSON at:
//   prototypes/public/mock/prototype4/communities.geojson
// The map fetches it at runtime; normalizeFeatures() extracts the name from
// any common field and assigns MOCK metrics (real DLD metrics join later).
const NAME_FIELDS = ['NAME_EN', 'CNAME_E', 'COMM_E', 'ENG_NAME', 'name', 'Name', 'community'];
const CODE_FIELDS = ['COMM_NUM', 'community_number', 'OBJECTID', 'comm_num'];

function pick(props, fields) {
  for (const f of fields) if (props[f] != null && props[f] !== '') return props[f];
  return undefined;
}

function centroid(geom) {
  const ring = geom.type === 'Polygon' ? geom.coordinates[0] : geom.coordinates[0][0];
  let x = 0, y = 0;
  ring.forEach(([lng, lat]) => { x += lng; y += lat; });
  return [x / ring.length, y / ring.length];
}

export function normalizeFeatures(geojson) {
  const feats = (geojson.features || []).filter((f) => f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon'));
  return {
    type: 'FeatureCollection',
    features: feats.map((f, i) => {
      const p = f.properties || {};
      const r = (n) => ((i * 9301 + 49297 + n * 7919) % 233280) / 233280;
      return {
        type: 'Feature',
        geometry: f.geometry,
        properties: {
          name: pick(p, NAME_FIELDS) || `Community ${i + 1}`,
          community_number: pick(p, CODE_FIELDS) || i + 1,
          center: centroid(f.geometry),
          avgPrice: Math.round(900 + r(1) * 1700),
          salesVolume: Math.round(200 + r(2) * 3000),
          supply: Math.round(500 + r(3) * 15000),
          projectCount: Math.round(1 + r(4) * 80),
        },
      };
    }),
  };
}

export function bounds(geojson) {
  let minX = 180, minY = 90, maxX = -180, maxY = -90;
  const each = ([lng, lat]) => {
    if (lng < minX) minX = lng; if (lng > maxX) maxX = lng;
    if (lat < minY) minY = lat; if (lat > maxY) maxY = lat;
  };
  geojson.features.forEach((f) => {
    const c = f.geometry.coordinates;
    if (f.geometry.type === 'Polygon') c.forEach((ring) => ring.forEach(each));
    else c.forEach((poly) => poly.forEach((ring) => ring.forEach(each)));
  });
  return [[minX, minY], [maxX, maxY]];
}
