'use client';

import Section from '../components/Section';

export default function Footer() {
  return (
    <Section id="footer" className="bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center text-sm">
        <p>Terima kasih atas doa dan kehadiran Anda.</p>
        <p className="opacity-70">Dibuat dengan penuh cinta oleh JadiUndangan</p>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] opacity-60">
          <a href="https://instagram.com/jadiundangan" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
            Instagram
          </a>
          <span>•</span>
          <a href="https://jadiundangan.id" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
            Website
          </a>
        </div>
      </div>
    </Section>
  );
}
