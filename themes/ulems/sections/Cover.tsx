'use client';
import { useState } from 'react';

export default function Cover({ invitation, media }: { invitation: any; media: any[] }) {
  const cover = media?.find((m) => m.type === 'photo' && m.sort_index === 0)?.url;
  const [opened, setOpened] = useState(false);

  return (
    <section className={`relative min-h-[70vh] grid place-items-center overflow-hidden ${opened ? '' : 'snap-start'}`}>
      <div className="absolute inset-0 -z-10">
        {/* gunakan next/image jika mau; untuk demo cukup img biasa */}
        <img
          src={
            cover ||
            'https://images.unsplash.com/photo-1522673607200-164d1b6ee97d?auto=format&fit=crop&w=1600&q=80'
          }
          alt="Cover"
          className="w-full h-full object-cover opacity-90"
          loading="eager"
        />
      </div>
      <div className="text-center text-white drop-shadow">
        <p className="uppercase tracking-[0.35em] text-xs">The Wedding of</p>
        <h1 className="text-4xl md:text-5xl font-semibold my-2">
          {invitation.groom_name} &amp; {invitation.bride_name}
        </h1>
        <p className="opacity-90">{invitation.date_display}</p>
        <button onClick={() => setOpened(true)} className="mt-6 px-5 py-2 rounded bg-white/90 text-slate-900">
          Buka Undangan
        </button>
      </div>
    </section>
  );
}
