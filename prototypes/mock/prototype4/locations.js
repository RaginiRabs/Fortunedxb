// prototype4 ONLY — mock map coordinates for the project Location & Connectivity map.
// Keyed by project.area. POI coords are placed near the project for a clean,
// readable satellite view. Swap with real geocoded coords later.

// Emoji + tooltip direction per POI type (airport intentionally has no coords →
// it shows in the cards list below the map but not as a far-off map pin).
const POI_META = {
  metro:    { emoji: '🚇', dir: 'top' },
  mall:     { emoji: '🛍️', dir: 'top' },
  beach:    { emoji: '🏖️', dir: 'bottom' },
  hospital: { emoji: '🏥', dir: 'top' },
  school:   { emoji: '🎓', dir: 'right' },
};

// Per-area geometry: project pin, POI coords by type, and one metro line.
const AREAS = {
  'Dubai Marina': {
    center: [25.0810, 55.1420],
    zoom: 14,
    project: [25.0805, 55.1430],
    pois: {
      metro:    [25.0860, 55.1395],
      mall:     [25.0760, 55.1400],
      beach:    [25.0795, 55.1330],
      hospital: [25.0850, 55.1480],
      school:   [25.0890, 55.1460],
    },
    metroLines: [
      {
        name: 'Red Line',
        color: '#E53935',
        path: [[25.0700, 55.1380], [25.0860, 55.1395], [25.0930, 55.1520]],
        stations: [
          { name: 'DMCC', coords: [25.0700, 55.1380] },
          { name: 'Sobha Realty', coords: [25.0860, 55.1395] },
          { name: 'Dubai Marina', coords: [25.0930, 55.1520] },
        ],
      },
    ],
  },

  'Palm Jumeirah': {
    center: [25.1110, 55.1390],
    zoom: 14,
    project: [25.1120, 55.1380],
    pois: {
      metro:    [25.1180, 55.1385],
      mall:     [25.1135, 55.1395],
      beach:    [25.1050, 55.1460],
      hospital: [25.1190, 55.1330],
      school:   [25.1160, 55.1320],
    },
    metroLines: [
      {
        name: 'Palm Monorail',
        color: '#1E88E5',
        path: [[25.1010, 55.1490], [25.1120, 55.1380], [25.1180, 55.1385]],
        stations: [
          { name: 'Atlantis Aquaventure', coords: [25.1010, 55.1490] },
          { name: 'Al Ittihad Park', coords: [25.1120, 55.1380] },
          { name: 'Palm Gateway', coords: [25.1180, 55.1385] },
        ],
      },
    ],
  },

  'Downtown Dubai': {
    center: [25.1960, 55.2720],
    zoom: 14,
    project: [25.1960, 55.2740],
    pois: {
      metro:    [25.2010, 55.2700],
      mall:     [25.1975, 55.2790],
      beach:    [25.1900, 55.2700],
      hospital: [25.1920, 55.2660],
      school:   [25.1990, 55.2680],
    },
    metroLines: [
      {
        name: 'Red Line',
        color: '#E53935',
        path: [[25.2090, 55.2790], [25.2010, 55.2700], [25.1870, 55.2640]],
        stations: [
          { name: 'Financial Centre', coords: [25.2090, 55.2790] },
          { name: 'Burj Khalifa / Dubai Mall', coords: [25.2010, 55.2700] },
          { name: 'Business Bay', coords: [25.1870, 55.2640] },
        ],
      },
    ],
  },

  'Dubai Creek': {
    center: [25.2010, 55.3430],
    zoom: 13,
    project: [25.1980, 55.3500],
    pois: {
      metro:    [25.2080, 55.3370],
      mall:     [25.2070, 55.3540],
      beach:    [25.1955, 55.3460],
      hospital: [25.2030, 55.3380],
      school:   [25.2050, 55.3450],
    },
    metroLines: [
      {
        name: 'Red Line',
        color: '#E53935',
        path: [[25.2250, 55.3280], [25.2080, 55.3370], [25.1980, 55.3500]],
        stations: [
          { name: 'Dubai Healthcare City', coords: [25.2250, 55.3280] },
          { name: 'Al Jadaf', coords: [25.2080, 55.3370] },
          { name: 'Creek', coords: [25.1980, 55.3500] },
        ],
      },
    ],
  },
};

// Build the map payload for a project, mapping its `nearby` POIs to coords by type.
export function locationFor(project) {
  const area = AREAS[project.area] || AREAS['Dubai Marina'];

  const pois = project.nearby
    .filter((n) => area.pois[n.type] && POI_META[n.type])
    .map((n) => ({
      name: n.name,
      type: n.type,
      dist: n.dist,
      coords: area.pois[n.type],
      emoji: POI_META[n.type].emoji,
      dir: POI_META[n.type].dir,
    }));

  return {
    center: area.center,
    zoom: area.zoom,
    project: { name: project.name, coords: area.project },
    pois,
    metroLines: area.metroLines,
  };
}
