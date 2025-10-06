'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import Ornament from '../components/Ornament';
import Pill from '../components/Pill';

import type { InvitationRow, MediaRow } from '@/types/db';

type CoverProps = {
  invitation: InvitationRow;
  media: MediaRow[];
  opened: boolean;
  onOpen: () => void;
};

function formatDate(dateDisplay?: string | null) {
  return dateDisplay || '';
}

export default function Cover({ invitation, media, opened, onOpen }: CoverProps) {
  const coverPhoto = useMemo(() => {
    if (invitation.cover_photo_url) {
      return invitation.cover_photo_url;
    }
    const photo = media.find((item) => item.type === 'photo' && (item.sort_index ?? 999) === 0);
    return photo?.url || media.find((item) => item.type === 'photo')?.url || null;
  }, [invitation.cover_photo_url, media]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-slate-900 text-white">
      <Ornament position="top" />
      {coverPhoto ? (
        <Image
          src={coverPhoto}
          alt={`${invitation.groom_name} & ${invitation.bride_name}`}
          fill
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          priority
        />
      ) : null}
      <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <Pill className="bg-white/20 text-white backdrop-blur">The Wedding of</Pill>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200">{formatDate(invitation.date_display)}</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold tracking-widest drop-shadow-lg">
            {invitation.groom_name} &amp; {invitation.bride_name}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-slate-100/90">
          Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan memberikan doa restu di hari bahagia kami.
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:bg-sky-400"
        >
          Buka Undangan
        </button>
      </div>

      {!opened && (
        <div className="pointer-events-auto absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur">
          <Pill className="bg-white/10 text-white">Selamat Datang</Pill>
          <h2 className="mt-6 text-4xl font-semibold tracking-[0.2em] text-white">
            {invitation.groom_name} &amp; {invitation.bride_name}
          </h2>
          <p className="mt-4 max-w-md text-center text-sm text-slate-200">
            Kami dengan senang hati mengundang Anda untuk merayakan hari pernikahan kami.
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-8 rounded-full bg-amber-400 px-10 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-900 shadow-lg transition hover:bg-amber-300"
          >
            Buka Undangan
          </button>
        </div>
      )}

      <Ornament position="bottom" />
    </div>
  );
}
