import Image from 'next/image';
import Link from 'next/link';
import { CalendarPlus, MoveDownRight } from 'lucide-react';

import { gcalEventUrl } from '@/lib/gcal';
import { type Couple, type EventItem } from '@/lib/types';
import { cn, combineDateAndTime, formatIndonesianDate } from '@/lib/utils';
import { buttonStyles } from '@/components/ui/button';

interface HeroProps {
  couple: Couple;
  firstEvent: EventItem;
}

export function Hero({ couple, firstEvent }: HeroProps) {
  const coverUrl =
    couple.fotoCoverUrl ||
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80';
  const firstEventStart = combineDateAndTime(firstEvent.tanggal, firstEvent.jamMulai);
  const firstEventEnd = combineDateAndTime(firstEvent.tanggal, firstEvent.jamSelesai);
  const calendarUrl = gcalEventUrl(
    `${couple.panggilanPria} & ${couple.panggilanWanita}`,
    firstEventStart.toISOString(),
    firstEventEnd.toISOString(),
    firstEvent.alamat
  );
  const eventDateLabel = formatIndonesianDate(firstEventStart);

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-end overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40"
      aria-labelledby="hero-title"
    >
      <Image
        src={coverUrl}
        alt={`Foto ${couple.namaPria} dan ${couple.namaWanita}`}
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(11,18,32,0.6),_rgba(11,18,32,0.95))]" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950/80 to-slate-950" aria-hidden />
      <div className="relative z-10 w-full px-6 pb-16 pt-32 sm:px-12">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-purple-200/90">
          Undangan Pernikahan
        </span>
        <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-10">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/60 bg-white/10 shadow-[0_20px_40px_rgba(124,58,237,0.45)]">
            <Image
              src={coverUrl}
              alt={`Pasangan ${couple.panggilanPria} dan ${couple.panggilanWanita}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-left">
            <h1
              id="hero-title"
              className="text-4xl font-semibold tracking-wide text-white sm:text-5xl md:text-6xl"
            >
              {couple.panggilanPria} &amp; {couple.panggilanWanita}
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              {couple.namaPria} &amp; {couple.namaWanita}
            </p>
            <p className="text-base font-medium text-purple-200 md:text-lg">{eventDateLabel}</p>
            <Link
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonStyles('primary', 'lg'), 'mt-6 inline-flex gap-2')}
            >
              <CalendarPlus className="h-5 w-5" aria-hidden />
              Save Google Calendar
            </Link>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-3 text-slate-300">
          <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-purple-400/60 to-transparent" aria-hidden />
          <div className="flex flex-col items-center text-xs uppercase tracking-[0.2em] text-purple-200">
            <span>Scroll</span>
            <MoveDownRight
              className="mt-2 h-5 w-5 motion-safe:animate-bounce motion-reduce:animate-none"
              aria-hidden
            />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-white/40 via-purple-400/60 to-transparent" aria-hidden />
        </div>
      </div>
    </section>
  );
}
