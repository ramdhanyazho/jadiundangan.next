export default function Location({ events }: { events: any[] }) {
  const main = events?.find((ev) => ev.type === 'resepsi') || events?.[0];
  if (!main) return null;
  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-semibold">Lokasi</h2>
        <p className="mt-4 text-base">{main.location}</p>
        {main.map_url ? (
          <a
            href={main.map_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2 text-white shadow"
          >
            Buka Peta
          </a>
        ) : null}
      </div>
    </section>
  );
}
