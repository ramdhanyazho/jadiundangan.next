import Image from 'next/image';
import Link from 'next/link';
import type { InvitationHero } from '@/lib/types';
import { CalendarIcon } from './Icon/CalendarIcon';

export function Hero({ hero }: { hero: InvitationHero }) {
  return (
    <section
      id="home"
      data-section-id="home"
      className="bg-light-dark position-relative overflow-hidden p-0 m-0"
      style={{ minHeight: '100vh' }}
    >
      <Image
        src={hero.backgroundImage}
        alt={hero.backgroundAlt}
        fill
        sizes="100vw"
        className="position-absolute opacity-25 top-50 start-50 translate-middle bg-cover-home"
        priority
      />
      <div className="position-relative text-center bg-overlay-auto" style={{ backgroundColor: 'unset' }}>
        <h1 className="font-esthetic pt-5 pb-4 fw-medium" style={{ fontSize: '2.25rem' }}>
          Undangan Pernikahan
        </h1>
        <Image
          src={hero.avatarImage}
          alt={hero.avatarAlt}
          width={208}
          height={208}
          className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto cursor-pointer"
          data-gallery-image
          data-full={hero.avatarImage}
        />
        <h2 className="font-esthetic my-4" style={{ fontSize: '2.25rem' }}>
          {hero.title}
        </h2>
        <p className="my-2" style={{ fontSize: '1.25rem' }}>
          {hero.subtitle}
        </p>
        <Link
          href={hero.googleCalendarUrl}
          className="btn btn-outline-auto btn-sm shadow rounded-pill px-3 py-1 d-inline-flex align-items-center justify-content-center gap-2"
          style={{ fontSize: '0.825rem' }}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarIcon width={16} height={16} />
          <span>Save Google Calendar</span>
        </Link>
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
  );
}
