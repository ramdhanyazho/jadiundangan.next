const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0];
};

export function gcalEventUrl(
  title: string,
  startISO: string,
  endISO: string,
  location: string,
  detailsUrl?: string,
) {
  const url = new URL('https://calendar.google.com/calendar/render');
  const details = detailsUrl
    ? `${detailsUrl}\n\n` + 'Tanpa mengurangi rasa hormat, kami mengundang Anda.'
    : 'Tanpa mengurangi rasa hormat, kami mengundang Anda.';

  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('dates', `${formatDate(startISO)}/${formatDate(endISO)}`);
  url.searchParams.set('location', location);
  url.searchParams.set('details', details);

  return url.toString();
}
