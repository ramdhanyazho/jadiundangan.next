export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatIndonesianDate(date: Date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(date);
}

export function formatTimeRange(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
  const startDate = combineDateAndTime('1970-01-01', start);
  const endDate = combineDateAndTime('1970-01-01', end);
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

export function combineDateAndTime(dateISO: string, time: string) {
  return new Date(`${dateISO}T${time}:00+07:00`);
}

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat('id-ID', {
  numeric: 'auto',
});

export function formatRelativeTime(iso: string) {
  const now = new Date();
  const value = new Date(iso);
  const diff = value.getTime() - now.getTime();
  const minutes = Math.round(diff / (1000 * 60));
  const thresholds = [
    { unit: 'year', value: 60 * 24 * 365 },
    { unit: 'month', value: 60 * 24 * 30 },
    { unit: 'week', value: 60 * 24 * 7 },
    { unit: 'day', value: 60 * 24 },
    { unit: 'hour', value: 60 },
    { unit: 'minute', value: 1 },
  ] as const;

  for (const threshold of thresholds) {
    if (Math.abs(minutes) >= threshold.value || threshold.unit === 'minute') {
      const amount = Math.round(minutes / threshold.value);
      return RELATIVE_TIME_FORMATTER.format(amount, threshold.unit as Intl.RelativeTimeFormatUnit);
    }
  }
  return RELATIVE_TIME_FORMATTER.format(0, 'minute');
}
