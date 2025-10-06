'use client';

import { QRCodeSVG } from 'qrcode.react';
import { LinkIcon } from 'lucide-react';

import Card from '../components/Card';
import Heading from '../components/Heading';
import Section from '../components/Section';

type QRCodeProps = {
  slug: string;
  guestName?: string;
};

const getInvitationUrl = (slug: string, guestName?: string) => {
  if (typeof window === 'undefined') {
    return `https://jadiundangan.id/u/${slug}`;
  }
  const origin = window.location.origin;
  const url = new URL(`/u/${slug}`, origin);
  if (guestName) {
    url.searchParams.set('to', guestName);
  }
  return url.toString();
};

export default function QRCode({ slug, guestName }: QRCodeProps) {
  const qrValue = getInvitationUrl(slug, guestName);

  return (
    <Section id="qrcode" className="bg-white">
      <div className="mx-auto max-w-3xl">
        <Heading
          title="Bagikan Undangan"
          description="Scan QR berikut untuk membuka undangan secara instan"
        />
        <Card className="flex flex-col items-center gap-4">
          <QRCodeSVG value={qrValue} size={220} level="M" />
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-slate-600">
              <LinkIcon className="h-4 w-4 text-sky-500" />
              {qrValue}
            </span>
          </div>
        </Card>
      </div>
    </Section>
  );
}
