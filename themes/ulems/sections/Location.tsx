'use client';

import { useEffect, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { MapContainerProps } from 'react-leaflet';
import L from 'leaflet';

import Card from '../components/Card';
import Heading from '../components/Heading';
import Section from '../components/Section';

import type { EventRow } from '@/types/db';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

type LocationProps = {
  events: EventRow[];
};

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
});

export default function Location({ events }: LocationProps) {
  const eventsWithCoordinates = useMemo(
    () =>
      events.filter((event) => typeof event.latitude === 'number' && typeof event.longitude === 'number').map((event) => ({
        ...event,
        latitude: Number(event.latitude),
        longitude: Number(event.longitude),
      })),
    [events]
  );

  const fallbackEvent = useMemo(() => events.find((event) => event.map_url), [events]);

  useEffect(() => {
    import('leaflet/dist/leaflet.css');
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  if (!eventsWithCoordinates.length && !fallbackEvent) return null;

  const center = eventsWithCoordinates.length
    ? [eventsWithCoordinates[0].latitude, eventsWithCoordinates[0].longitude] as MapContainerProps['center']
    : undefined;

  return (
    <Section id="location" className="bg-slate-100">
      <div className="mx-auto max-w-5xl">
        <Heading
          title="Lokasi"
          description="Kami menantikan kehadiran Anda di lokasi acara"
        />
        {eventsWithCoordinates.length ? (
          <Card className="overflow-hidden p-0">
            <MapContainer center={center} zoom={15} scrollWheelZoom={false} style={{ height: 400, width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {eventsWithCoordinates.map((event) => (
                <Marker key={event.id} position={[event.latitude, event.longitude]}>
                  <Popup>
                    <div className="space-y-1">
                      <strong>{event.title || event.type}</strong>
                      {event.location ? <p className="text-sm">{event.location}</p> : null}
                      {event.map_url ? (
                        <a
                          href={event.map_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-sky-500 hover:underline"
                        >
                          Buka di Google Maps
                        </a>
                      ) : null}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card>
        ) : null}
        {!eventsWithCoordinates.length && fallbackEvent ? (
          <Card className="flex flex-col items-center gap-4 text-center">
            <MapPin className="h-10 w-10 text-sky-500" />
            <p className="text-sm text-slate-600">
              Koordinat lokasi belum tersedia. Klik tombol di bawah untuk membuka peta.
            </p>
            <a
              href={fallbackEvent.map_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-700"
            >
              Lihat Peta
            </a>
          </Card>
        ) : null}
      </div>
    </Section>
  );
}
