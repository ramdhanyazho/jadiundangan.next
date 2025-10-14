'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

interface ThemeOption {
  name: string;
  href: string;
  description: string;
  accent?: string;
  badge?: string;
}

interface ThemeDemoLauncherProps {
  themes: ThemeOption[];
  label?: string;
  buttonClassName?: string;
}

export default function ThemeDemoLauncher({
  themes,
  label = 'Lihat Demo Tema',
  buttonClassName,
}: ThemeDemoLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          buttonClassName ??
          'rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition hover:border-brand hover:text-brand'
        }
      >
        {label}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Pilih Demo Tema</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Jelajahi katalog tema unggulan dan buka pratinjau demo sesuai konsep acara impianmu.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              >
                <span aria-hidden>✕</span>
                <span>Tutup</span>
              </button>
            </div>

            <div className="grid max-h-[70vh] gap-4 overflow-y-auto px-6 py-6 sm:grid-cols-2">
              {themes.map((theme) => (
                <Link
                  key={theme.name}
                  href={theme.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg"
                >
                  <div className={`h-28 w-full bg-gradient-to-br ${theme.accent ?? 'from-brand/20 via-white to-slate-100'}`} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-lg font-semibold text-slate-900">{theme.name}</h4>
                      {theme.badge ? (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                          {theme.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{theme.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-3">
                      Buka Demo <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-500">
              Semua demo akan terbuka di tab baru sehingga kamu tetap berada di halaman utama JadiUndangan.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
