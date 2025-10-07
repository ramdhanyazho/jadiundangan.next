'use client';

import type { ComponentType, SVGProps } from 'react';
import { useEffect, useState } from 'react';
import { CalendarDays, GalleryHorizontalEnd, Home, MessageCircleHeart, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

type TabItem = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'mempelai', label: 'Mempelai', icon: Users },
  { id: 'jadwal', label: 'Tanggal', icon: CalendarDays },
  { id: 'galeri', label: 'Galeri', icon: GalleryHorizontalEnd },
  { id: 'ucapan', label: 'Ucapan', icon: MessageCircleHeart },
];

export function Tabbar() {
  const [active, setActive] = useState('home');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (intersecting[0]) {
          setActive(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '-50% 0px -45%',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    TABS.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-4 z-40 mx-auto flex max-w-lg justify-center px-4"
      aria-label="Navigasi undangan"
    >
      <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleClick(id)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400',
                isActive ? 'text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-transform',
                  isActive ? 'text-purple-300' : 'text-slate-400'
                )}
                aria-hidden
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
