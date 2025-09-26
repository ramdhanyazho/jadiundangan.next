'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41],
});
export default function EventMap({ lat, lng, title='Lokasi Acara' }){
  if (!lat || !lng) return null;
  return (
    <div className="rounded-2xl overflow-hidden shadow">
      <MapContainer center={[lat, lng]} zoom={15} style={{height: 320, width: '100%'}} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={icon}><Popup>{title}</Popup></Marker>
      </MapContainer>
    </div>
  )
}
