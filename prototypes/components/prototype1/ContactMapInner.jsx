'use client';

// prototype1 contact map — real Leaflet street map (ESRI), client-only. Mock only.
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CENTER = [25.0693, 55.1409]; // Jumeirah Lake Towers

const pin = L.divIcon({
  className: '',
  html: `<div style="
    width:30px;height:30px;border-radius:50% 50% 50% 0;background:#80603f;
    transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,.4);
    display:flex;align-items:center;justify-content:center;">
    <span style="transform:rotate(45deg);width:8px;height:8px;border-radius:50%;background:#fff;"></span>
  </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function ContactMapInner() {
  return (
    <MapContainer center={CENTER} zoom={14} scrollWheelZoom={false} zoomControl={false} className="h-full w-full" style={{ background: '#e8eef0' }}>
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        maxZoom={19}
      />
      <Marker position={CENTER} icon={pin} />
    </MapContainer>
  );
}
