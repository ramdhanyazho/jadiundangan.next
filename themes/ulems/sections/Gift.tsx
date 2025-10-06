'use client';

import { useCallback, useState } from 'react';
import { Copy, GiftIcon, QrCode } from 'lucide-react';
import Image from 'next/image';

import Card from '../components/Card';
import Heading from '../components/Heading';
import Section from '../components/Section';

import type { GiftRow } from '@/types/db';

type GiftProps = {
  gift: GiftRow | null;
};

export default function Gift({ gift }: GiftProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!gift?.account_number) return;
    try {
      await navigator.clipboard.writeText(gift.account_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy account number', error);
    }
  }, [gift?.account_number]);

  if (!gift) return null;

  return (
    <Section id="gift" className="bg-white">
      <div className="mx-auto max-w-4xl">
        <Heading
          title="Hadiah Digital"
          description="Doa restu sudah sangat berarti. Namun jika ingin mengirim hadiah, berikut informasi rekening kami."
        />
        <Card className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <GiftIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{gift.bank_name}</p>
              <p className="text-2xl font-semibold text-slate-800">{gift.account_number}</p>
              <p className="text-sm text-slate-500">a.n. {gift.account_name}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            {gift.qr_image_url ? (
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow">
                <Image src={gift.qr_image_url} alt="QR Code" width={160} height={160} className="h-40 w-40 object-contain" />
              </div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-slate-400">
                <QrCode className="h-10 w-10" />
              </div>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-700"
            >
              <Copy className="h-4 w-4" /> {copied ? 'Tersalin!' : 'Salin Rekening'}
            </button>
          </div>
        </Card>
      </div>
    </Section>
  );
}
