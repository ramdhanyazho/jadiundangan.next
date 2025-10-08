'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { InvitationSchedule } from '@/lib/types';

interface Props {
  schedules: InvitationSchedule[];
  headline: string;
  description: string;
  dressCode: string;
  mapUrl: string;
  venue: string;
}

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (value: number) => value.toString().padStart(2, '0');

export function SectionTanggal({
  schedules,
  headline,
  description,
  dressCode,
  mapUrl,
  venue,
}: Props) {
  const targetDate = useMemo(() => new Date(schedules[0]?.start ?? Date.now()), [schedules]);
  const [countdown, setCountdown] = useState<Countdown>(() => ({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  }));

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  return (
    <section className="bg-white-black pb-5" id="tanggal" data-section-id="tanggal">
      <div className="container text-center py-5">
        <h2 className="font-esthetic py-4 m-0" style={{ fontSize: '2.25rem' }}>
          {headline}
        </h2>
        <div className="border rounded-pill shadow py-2 px-4 mt-2 mb-4">
          <div className="row justify-content-center">
            <div className="col-3 p-1">
              <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>
                {countdown.days}
              </p>
              <small className="ms-1">Hari</small>
            </div>
            <div className="col-3 p-1">
              <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>
                {countdown.hours}
              </p>
              <small className="ms-1">Jam</small>
            </div>
            <div className="col-3 p-1">
              <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>
                {countdown.minutes}
              </p>
              <small className="ms-1">Menit</small>
            </div>
            <div className="col-3 p-1">
              <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>
                {countdown.seconds}
              </p>
              <small className="ms-1">Detik</small>
            </div>
          </div>
        </div>
        <p className="py-2 m-0" style={{ fontSize: '0.95rem' }}>
          {description}
        </p>
        <div className="overflow-x-hidden">
          {schedules.map((schedule) => (
            <div key={schedule.title} className="py-3" style={{ fontSize: '0.95rem' }}>
              <h3 className="font-esthetic m-0 py-2" style={{ fontSize: '2rem' }}>
                {schedule.title}
              </h3>
              <p className="m-0">{schedule.timeLabel}</p>
            </div>
          ))}
        </div>
        <p className="py-2 m-0" style={{ fontSize: '0.95rem' }}>
          Demi kehangatan bersama, kami memohon kesediaan Anda untuk mengenakan dress code berikut:
        </p>
        <div className="py-2">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="shadow rounded-circle border border-secondary" style={{ width: '3rem', height: '3rem', backgroundColor: 'white' }} />
            <div className="shadow rounded-circle border border-secondary" style={{ width: '3rem', height: '3rem', backgroundColor: 'aquamarine', marginLeft: '-1rem' }} />
            <div className="shadow rounded-circle border border-secondary" style={{ width: '3rem', height: '3rem', backgroundColor: 'limegreen', marginLeft: '-1rem' }} />
          </div>
          <p style={{ fontSize: '0.95rem' }}>{dressCode}</p>
        </div>
        <div className="py-2">
          <Link
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-auto btn-sm rounded-pill shadow mb-2 px-3"
          >
            Buka Maps
          </Link>
          <small className="d-block my-1">{venue}</small>
        </div>
      </div>
    </section>
  );
}
