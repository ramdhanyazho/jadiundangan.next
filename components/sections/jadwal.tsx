import Link from 'next/link';
import { MapPin } from 'lucide-react';

import { type EventItem } from '@/lib/types';
import { combineDateAndTime, formatIndonesianDate, formatTimeRange } from '@/lib/utils';
import { buttonStyles } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface JadwalSectionProps {
  events: EventItem[];
}

export function JadwalSection({ events }: JadwalSectionProps) {
  return (
    <section id="jadwal" aria-labelledby="jadwal-title" className="space-y-8">
      <div className="space-y-2">
        <h2 id="jadwal-title" className="text-2xl font-semibold text-white">
          Tanggal &amp; Lokasi
        </h2>
        <p className="text-sm text-slate-300">Catat tanggal penting dan temukan lokasi acara kami.</p>
      </div>
      <div className="space-y-4">
        {events.map((event) => {
          const eventDate = combineDateAndTime(event.tanggal, event.jamMulai);
          const date = formatIndonesianDate(eventDate);
          const timeRange = formatTimeRange(event.jamMulai, event.jamSelesai);
          return (
            <Card key={event.label} className="border-white/5 bg-white/5">
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-xl">{event.label}</CardTitle>
                  {event.gmapsUrl ? (
                    <Link
                      href={event.gmapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${buttonStyles('outline', 'sm')} gap-2`}
                    >
                      <MapPin className="h-4 w-4" aria-hidden />
                      Buka Maps
                    </Link>
                  ) : null}
                </div>
                <div className="grid gap-4 text-sm text-slate-200 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-200/80">Tanggal</p>
                    <p className="mt-1 font-medium text-white">{date}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-200/80">Waktu</p>
                    <p className="mt-1 font-medium text-white">{timeRange} WIB</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-200/80">Alamat</p>
                    <p className="mt-1 font-medium text-white">{event.alamat}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
