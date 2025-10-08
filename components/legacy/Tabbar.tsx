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
      className="navbar navbar-expand sticky-bottom rounded-top-4 border-top p-0"
      aria-label="Navigasi undangan"
    >
      <ul className="navbar-nav nav-justified w-100 align-items-center">
        {items.map(({ id, label, Icon }) => (
          <li key={id} className="nav-item">
            <Link
              href={`#${id}`}
              className="nav-link text-center d-flex flex-column align-items-center py-2"
              data-tab-target={id}
              scroll={false}
              prefetch={false}
            >
              <Icon className="tab-icon" width={20} height={20} />
              <span className="d-block" style={{ fontSize: '0.7rem' }}>
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
