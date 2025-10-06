'use client';

import { CalendarDays, Clock3, MapPin } from 'lucide-react';

import Card from '../components/Card';
import Heading from '../components/Heading';
import Section from '../components/Section';

import type { EventRow } from '@/types/db';

type EventProps = {
  events: EventRow[];
};

export default function Event({ events }: EventProps) {
  const filtered = events.filter((event) => event.type === 'akad' || event.type === 'resepsi' || !event.type);

  if (!filtered.length) return null;

  return (
    <Section id="event" className="bg-white">
      <div className="mx-auto max-w-5xl">
        <Heading
          title="Rangkaian Acara"
          description="Mohon kehadiran dan doa restu Anda dalam setiap rangkaian acara pernikahan kami"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((event) => (
            <Card key={event.id} className="flex h-full flex-col gap-5">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-500">
                <CalendarDays className="h-5 w-5 text-amber-500" />
                {event.title || event.type?.toUpperCase()}
              </div>
              <div className="space-y-2">
                {event.date_display ? <p className="text-lg font-medium text-slate-800">{event.date_display}</p> : null}
                {event.time ? (
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock3 className="h-4 w-4 text-sky-500" /> {event.time}
                  </p>
                ) : null}
                {event.location ? (
                  <p className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="mt-1 h-4 w-4 text-sky-500" />
                    <span>{event.location}</span>
                  </p>
                ) : null}
                {event.note ? <p className="text-sm text-slate-500">{event.note}</p> : null}
              </div>
              {event.map_url ? (
                <a
                  href={event.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-slate-700"
                >
                  Lihat Peta
                </a>
              ) : null}
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
