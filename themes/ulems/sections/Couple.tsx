'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import Card from '../components/Card';
import Heading from '../components/Heading';
import Section from '../components/Section';

import type { InvitationRow, MediaRow } from '@/types/db';

type CoupleProps = {
  invitation: InvitationRow;
  media: MediaRow[];
};

function splitParents(parents?: string | null) {
  if (!parents) return [];
  return parents.split(/\r?\n/).filter(Boolean);
}

export default function Couple({ invitation, media }: CoupleProps) {
  const coverPhoto = useMemo(() => {
    const sorted = [...media].filter((item) => item.type === 'photo');
    sorted.sort((a, b) => (a.sort_index ?? 999) - (b.sort_index ?? 999));
    return sorted[0]?.url ?? null;
  }, [media]);

  return (
    <Section id="couple" className="bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <Heading title={<span>Pengantin</span>} description="Bersatu dalam cinta dan doa restu keluarga" />
        <div className="grid gap-10 md:grid-cols-2">
          <Card className="text-center">
            <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image
                src={coverPhoto || '/themes/ulems/assets/ornaments/batik-top.svg'}
                alt={invitation.groom_name}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800">{invitation.groom_name}</h3>
            {invitation.groom_nickname ? (
              <p className="text-sm uppercase tracking-[0.3em] text-sky-500">{invitation.groom_nickname}</p>
            ) : null}
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              {splitParents(invitation.groom_parents).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Card>
          <Card className="text-center">
            <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image
                src={coverPhoto || '/themes/ulems/assets/ornaments/batik-bottom.svg'}
                alt={invitation.bride_name}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800">{invitation.bride_name}</h3>
            {invitation.bride_nickname ? (
              <p className="text-sm uppercase tracking-[0.3em] text-sky-500">{invitation.bride_nickname}</p>
            ) : null}
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              {splitParents(invitation.bride_parents).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
