'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { CalendarIcon } from './Icon/CalendarIcon';
import { GalleryIcon } from './Icon/GalleryIcon';
import { HeartIcon } from './Icon/HeartIcon';
import { HomeIcon } from './Icon/HomeIcon';
import { MessageIcon } from './Icon/MessageIcon';

const items = [
  { id: 'home', label: 'Beranda', Icon: HomeIcon },
  { id: 'mempelai', label: 'Mempelai', Icon: HeartIcon },
  { id: 'tanggal', label: 'Tanggal & Lokasi', Icon: CalendarIcon },
  { id: 'galeri', label: 'Galeri', Icon: GalleryIcon },
  { id: 'ucapan', label: 'Ucapan', Icon: MessageIcon },
] as const;

export function Tabbar() {
  const pathname = usePathname();

  useEffect(() => {
    const first = document.querySelector<HTMLAnchorElement>(
      '#undangan4x [data-tab-target="home"]'
    );
    if (first && !document.querySelector('#undangan4x [data-tab-target].active')) {
      first.classList.add('active');
    }
  }, [pathname]);

  return (
    <nav
      id="navbar-menu"
      className="position-fixed bottom-0 start-50 translate-middle-x w-100 px-3 pb-3"
      aria-label="Navigasi undangan"
    >
      <ul className="nav nav-pills bg-overlay-auto shadow rounded-4 justify-content-around py-2">
        {items.map(({ id, label, Icon }) => (
          <li key={id} className="nav-item">
            <Link
              href={`#${id}`}
              className="nav-link text-center d-flex flex-column align-items-center gap-1 px-2"
              data-tab-target={id}
              scroll={false}
            >
              <Icon className="tab-icon" width={20} height={20} />
              <span className="small">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
