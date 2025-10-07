import { getSiteUrl } from './getSiteUrl';

function normalizeIso(iso: string) {
  return iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function gcalEventUrl(
  title: string,
  startISO: string,
  endISO: string,
  location: string,
  detailsUrl?: string
) {
  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', title);
  params.set('dates', `${normalizeIso(startISO)}/${normalizeIso(endISO)}`);
  if (location) {
    params.set('location', location);
  }
  const fallback = getSiteUrl();
  const details = detailsUrl
    ? `${detailsUrl}\n\nTerima kasih telah berbagi kebahagiaan bersama kami.`
    : fallback;
  params.set('details', details);
  params.set('trp', 'false');
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
