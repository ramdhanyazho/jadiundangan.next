const formatDate = (value: string) => {
  const date = new Date(value);
  const iso = date.toISOString().replace(/[-:]/g, '');
  return iso.slice(0, 15) + 'Z';
};

export function gcalEventUrl(
  title: string,
  startISO: string,
  endISO: string,
  location: string,
  detailsUrl: string
) {
  const base = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(startISO)}/${formatDate(endISO)}`,
    location,
    details: detailsUrl,
  });
  return `${base}?${params.toString()}`;
}
