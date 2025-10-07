'use client';

import { useEffect, useState, type MouseEvent } from 'react';

type TabItem = {
  id: string;
  label: string;
  icon: string;
};

const ITEMS: TabItem[] = [
  { id: 'home', label: 'Home', icon: 'fa-house' },
  { id: 'bride', label: 'Mempelai', icon: 'fa-user-group' },
  { id: 'wedding-date', label: 'Tanggal', icon: 'fa-calendar-check' },
  { id: 'gallery', label: 'Galeri', icon: 'fa-images' },
  { id: 'comment', label: 'Ucapan', icon: 'fa-comments' },
];

export function Tabbar() {
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const sections = ITEMS.map((item) => document.getElementById(item.id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0.25, 0.5, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar navbar-expand sticky-bottom rounded-top-4 border-top p-0" id="navbar-menu">
      <ul className="navbar-nav nav-justified w-100 align-items-center">
        {ITEMS.map((item) => (
          <li key={item.id} className="nav-item">
            <a
              className={`nav-link ${active === item.id ? 'active' : ''}`}
              href={`#${item.id}`}
              onClick={(event) => handleClick(event, item.id)}
            >
              <i className={`fa-solid ${item.icon}`} />
              <span className="d-block">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
