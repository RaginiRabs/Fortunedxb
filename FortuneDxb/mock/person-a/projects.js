// Mock data for person-a ONLY. Do not import this from any other zone.
// Shape mirrors the real API ({ success, data }) so swapping to the live
// endpoint later is a one-line change in the page.

export const mockProjects = [
  {
    id: 1,
    name: 'Marina Heights',
    developer: 'Emaar',
    area: 'Dubai Marina',
    price_from: 1850000,
    status: 'New Launch',
    image: '/placeholder/project-1.jpg',
  },
  {
    id: 2,
    name: 'Palm Vista Residences',
    developer: 'Nakheel',
    area: 'Palm Jumeirah',
    price_from: 4200000,
    status: 'Under Construction',
    image: '/placeholder/project-2.jpg',
  },
  {
    id: 3,
    name: 'Downtown Pulse',
    developer: 'DAMAC',
    area: 'Downtown Dubai',
    price_from: 2650000,
    status: 'Ready',
    image: '/placeholder/project-3.jpg',
  },
];
