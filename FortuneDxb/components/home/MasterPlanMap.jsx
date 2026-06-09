'use client';

import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Circle,
  CircleMarker,
  Tooltip,
} from 'react-leaflet';
import { useTheme } from '@mui/material/styles';

// ---- Static infrastructure data (indicative coordinates) ----
const METRO_STATIONS = [
  { name: 'Creek Interchange', pos: [25.228, 55.336] },
  { name: 'Dubai Creek Harbour', pos: [25.198, 55.349] },
  { name: 'Ras Al Khor', pos: [25.18, 55.357] },
  { name: 'International City', pos: [25.165, 55.408] },
  { name: 'Dubai Silicon Oasis', pos: [25.121, 55.378] },
  { name: 'Academic City', pos: [25.11, 55.418] },
];

const METRO_BLUE_LINE = METRO_STATIONS.map((s) => s.pos);

// Al Maktoum International / Dubai World Central (DWC)
const DWC_CENTER = [24.896, 55.161];
const DWC_RADIUS_M = 12000; // ~12 km catchment

// Dubai Metro "Blue Line" brand-identity color (fixed, not theme-driven)
const BLUE = '#3B82F6';

export default function MasterPlanMap({ activeLayer = 'all' }) {
  const theme = useTheme();
  const GOLD = theme.palette.gold.main; // lib/theme.js
  const WHITE = theme.palette.common.white;
  const BLACK = theme.palette.common.black;

  const showMetro = activeLayer === 'all' || activeLayer === 'metro';
  const showAirport = activeLayer === 'all' || activeLayer === 'airport';

  return (
    <MapContainer
      center={[25.05, 55.25]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', background: BLACK }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={['a', 'b', 'c', 'd']}
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />

      {/* Layer 1 — Dubai Metro Blue Line */}
      {showMetro && (
        <>
          {/* glow underlay */}
          <Polyline
            positions={METRO_BLUE_LINE}
            pathOptions={{ color: BLUE, weight: 10, opacity: 0.22 }}
          />
          <Polyline
            positions={METRO_BLUE_LINE}
            pathOptions={{ color: BLUE, weight: 3, opacity: 0.95 }}
          />
          {METRO_STATIONS.map((s) => (
            <CircleMarker
              key={s.name}
              center={s.pos}
              radius={5}
              pathOptions={{ color: WHITE, weight: 1.5, fillColor: BLUE, fillOpacity: 1 }}
            >
              <Tooltip direction="top">{s.name}</Tooltip>
            </CircleMarker>
          ))}
        </>
      )}

      {/* Layer 2 — Al Maktoum (DWC) catchment */}
      {showAirport && (
        <>
          <Circle
            center={DWC_CENTER}
            radius={DWC_RADIUS_M}
            pathOptions={{ color: GOLD, weight: 1.5, opacity: 0.6, fillColor: GOLD, fillOpacity: 0.1 }}
          />
          <CircleMarker
            center={DWC_CENTER}
            radius={6}
            pathOptions={{ color: BLACK, weight: 1.5, fillColor: GOLD, fillOpacity: 1 }}
          >
            <Tooltip direction="top">Al Maktoum International (DWC)</Tooltip>
          </CircleMarker>
        </>
      )}
    </MapContainer>
  );
}
