/* eslint-disable @next/next/no-img-element */
import type { EventItem, Couple } from '@/lib/types';

const PLACEHOLDER = 'https://placehold.co/1200x1200/png?text=Love+Story';

type HeroProps = {
  couple: Couple;
  event: EventItem;
  gcalUrl: string;
};

export function Hero({ couple, event, gcalUrl }: HeroProps) {
  const eventDate = new Date(`${event.tanggal}T${event.jamMulai}:00+07:00`);
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(eventDate);

  const heroImage = couple.fotoCoverUrl ?? PLACEHOLDER;

  return (
    <>
      <section id="home" className="bg-light-dark position-relative overflow-hidden p-0 m-0">
        <img
          src={heroImage}
          data-src={heroImage}
          alt="bg"
          className="position-absolute opacity-25 top-50 start-50 translate-middle bg-cover-home"
        />

        <div className="position-relative text-center bg-overlay-auto" style={{ backgroundColor: 'unset' }}>
          <h1 className="font-esthetic pt-5 pb-4 fw-medium" style={{ fontSize: '2.25rem' }}>
            Undangan Pernikahan
          </h1>

          <img
            src={heroImage}
            data-src={heroImage}
            alt="Foto pasangan"
            className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto"
          />

          <h2 className="font-esthetic my-4" style={{ fontSize: '2.25rem' }}>
            {couple.panggilanPria} &amp; {couple.panggilanWanita}
          </h2>
          <p className="my-2" style={{ fontSize: '1.25rem' }}>
            {formattedDate}
          </p>

          <a
            className="btn btn-outline-auto btn-sm shadow rounded-pill px-3 py-1"
            style={{ fontSize: '0.825rem' }}
            href={gcalUrl}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-calendar-check me-2" />Save Google Calendar
          </a>

          <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
            <div className="mouse-animation border border-secondary border-2 rounded-5 px-2 py-1 opacity-50">
              <div className="scroll-animation rounded-4 bg-secondary" />
            </div>
          </div>

          <p className="pb-4 m-0 text-secondary" style={{ fontSize: '0.825rem' }}>
            Scroll Down
          </p>
        </div>
      </section>

      <div className="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </>
  );
}
