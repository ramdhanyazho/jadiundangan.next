'use client';
import { useEffect } from 'react';
export default function Hero({ groom, bride, date_display, theme='jawabiru', cover_photo_url, music_url }) {
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: `rgba(var(--bg-hero), 1)` }}>
      {cover_photo_url ? (<img src={cover_photo_url} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-40" />) : null}
      <div className="absolute inset-0 opacity-20 pointer-events-none jawabiru-batik" />
      <div className="relative z-10 text-center px-6">
        <div className="text-brand-gold tracking-widest uppercase">The Wedding Of</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-display" style={{ color:`rgb(var(--text-hero))`}}>{groom} & {bride}</h1>
        {date_display ? <p className="mt-3 text-base md:text-lg opacity-80">{date_display}</p> : null}
        {music_url ? (<audio id="bg-music" className="mt-6" controls src={music_url}>Browser Anda tidak mendukung audio.</audio>) : null}
      </div>
      <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
