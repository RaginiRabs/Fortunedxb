// Mock Dubai map data for prototype4 ONLY. Approximate coordinates — mock, not survey-grade.
// Shaped for the LocationMap component: buildGeo(area) -> { center, zoom, metroLines, pois }.

const lmImg = (id) => `https://images.unsplash.com/${id}?w=80&h=80&q=70&auto=format&fit=crop`;

export const AREA_CENTERS = {
  'Dubai Marina': { center: [25.0805, 55.1403], zoom: 13 },
  'Palm Jumeirah': { center: [25.1124, 55.139], zoom: 13 },
  'Downtown Dubai': { center: [25.1972, 55.2744], zoom: 13 },
  'Dubai Creek': { center: [25.1985, 55.343], zoom: 13 },
};

export const METRO_LINES = [
  {
    id: 'red',
    label: 'Red Line',
    color: '#E53935',
    stations: true,
    path: [
      [25.253, 55.365], [25.248, 55.353], [25.232, 55.345], [25.226, 55.328],
      [25.223, 55.314], [25.22, 55.308], [25.211, 55.279], [25.188, 55.262],
      [25.181, 55.253], [25.17, 55.24], [25.11, 55.201], [25.057, 55.137],
      [25.043, 55.121], [24.987, 55.048], [24.953, 55.003],
    ],
  },
  {
    id: 'green',
    label: 'Green Line',
    color: '#43A047',
    stations: true,
    path: [
      [25.298, 55.372], [25.282, 55.368], [25.273, 55.365], [25.264, 55.349],
      [25.256, 55.336], [25.247, 55.332], [25.239, 55.329], [25.263, 55.299],
      [25.254, 55.296], [25.239, 55.288], [25.235, 55.297], [25.228, 55.308],
      [25.22, 55.32], [25.21, 55.33], [25.203, 55.338], [25.19, 55.345],
    ],
  },
  {
    id: 'blue',
    label: 'Blue Line',
    color: '#1E88E5',
    stations: true,
    dashed: true,
    note: ' · planned',
    path: [
      [25.203, 55.338], [25.195, 55.355], [25.188, 55.365], [25.17, 55.375],
      [25.155, 55.39], [25.165, 55.41], [25.175, 55.395],
    ],
  },
  {
    id: 'orange',
    label: 'Orange Line (Tram)',
    color: '#FB8C00',
    stations: true,
    path: [
      [25.092, 55.148], [25.085, 55.143], [25.076, 55.139], [25.068, 55.141],
      [25.078, 55.15], [25.098, 55.162], [25.105, 55.178],
    ],
  },
];

export const POIS = {
  landmarks: [
    { id: 'burj-khalifa', lat: 25.1972, lng: 55.2744, name: 'Burj Khalifa', img: lmImg('photo-1512453979798-5ea266f8880c') },
    { id: 'dubai-mall', lat: 25.1985, lng: 55.2796, name: 'The Dubai Mall', img: lmImg('photo-1546412414-e1885259563a') },
    { id: 'palm', lat: 25.1124, lng: 55.139, name: 'Palm Jumeirah', img: lmImg('photo-1582672060674-bc2bd808a8f5') },
    { id: 'burj-al-arab', lat: 25.1412, lng: 55.1853, name: 'Burj Al Arab', img: lmImg('photo-1583512603805-3cc6b41f3edb') },
  ],
  medicals: [
    { id: 'mc-marina', lat: 25.082, lng: 55.145, name: 'Mediclinic Marina' },
    { id: 'emirates-hosp', lat: 25.115, lng: 55.138, name: 'Emirates Hospital' },
    { id: 'aster-creek', lat: 25.195, lng: 55.345, name: 'Aster Clinic Creek' },
  ],
  schools: [
    { id: 'dbs', lat: 25.076, lng: 55.15, name: 'Dubai British School' },
    { id: 'gems-wellington', lat: 25.105, lng: 55.15, name: 'GEMS Wellington' },
    { id: 'deira-intl', lat: 25.208, lng: 55.338, name: 'Deira International School' },
  ],
};

export function buildGeo(area) {
  const a = AREA_CENTERS[area] || { center: [25.1972, 55.2744], zoom: 12 };
  return { center: a.center, zoom: a.zoom, metroLines: METRO_LINES, pois: POIS };
}
