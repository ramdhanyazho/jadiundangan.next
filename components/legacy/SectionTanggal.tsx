'use client';

import { useEffect, useMemo, useState } from 'react';

import type { EventItem } from '@/lib/types';

function combineDateTime(event: EventItem) {
  return new Date(`${event.tanggal}T${event.jamMulai}:00+07:00`);
}

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type SectionTanggalProps = {
  events: EventItem[];
};

export function SectionTanggal({ events }: SectionTanggalProps) {
  const targetEvent = useMemo(() => events[0], [events]);
  const targetDate = useMemo(() => (targetEvent ? combineDateTime(targetEvent) : null), [targetEvent]);

  const [countdown, setCountdown] = useState<Countdown>({ days: '0', hours: '0', minutes: '0', seconds: '0' });

  useEffect(() => {
    if (!targetDate) return;

    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setCountdown({
        days: String(days),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <section className="bg-white-black pb-2" id="wedding-date">
        <div className="container text-center">
          <h2 className="font-esthetic py-4 m-0" style={{ fontSize: '2.25rem' }}>
            Moment Bahagia
          </h2>

          <div className="border rounded-pill shadow py-2 px-4 mt-2 mb-4">
            <div className="row justify-content-center">
              <div className="col-3 p-1">
                <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }} id="day">
                  {countdown.days}
                </p>
                <small className="ms-1 me-0 my-0 p-0 d-inline">Hari</small>
              </div>
              <div className="col-3 p-1">
                <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }} id="hour">
                  {countdown.hours}
                </p>
                <small className="ms-1 me-0 my-0 p-0 d-inline">Jam</small>
              </div>
              <div className="col-3 p-1">
                <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }} id="minute">
                  {countdown.minutes}
                </p>
                <small className="ms-1 me-0 my-0 p-0 d-inline">Menit</small>
              </div>
              <div className="col-3 p-1">
                <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }} id="second">
                  {countdown.seconds}
                </p>
                <small className="ms-1 me-0 my-0 p-0 d-inline">Detik</small>
              </div>
            </div>
          </div>

          <p className="py-2 m-0" style={{ fontSize: '0.95rem' }}>
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, insyaAllah kami akan menyelenggarakan acara:
          </p>

          <div className="position-relative">
            <div className="position-absolute" style={{ top: '0%', right: '5%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z" />
              </svg>
            </div>
          </div>

          <div className="overflow-x-hidden">
            {events.map((event) => {
              const startTime = `${event.jamMulai} WIB`;
              const endTime = event.jamSelesai ? `${event.jamSelesai} WIB` : '';
              const formattedDate = new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Jakarta',
              }).format(new Date(`${event.tanggal}T00:00:00+07:00`));

              return (
                <div key={`${event.label}-${event.tanggal}`} className="py-2">
                  <h2 className="font-esthetic m-0 py-2" style={{ fontSize: '2rem' }}>
                    {event.label}
                  </h2>
                  <p style={{ fontSize: '0.95rem' }}>
                    {formattedDate}
                    <br />
                    {startTime}
                    {endTime ? ` - ${endTime}` : ''}
                  </p>
                  <p className="mx-auto" style={{ fontSize: '0.95rem', maxWidth: '32rem' }}>
                    {event.alamat}
                  </p>
                  {event.gmapsUrl ? (
                    <a
                      href={event.gmapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-auto btn-sm rounded-pill shadow mb-2 px-3"
                    >
                      <i className="fa-solid fa-map-location-dot me-2" />Buka Maps
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>
    </>
  );
}
