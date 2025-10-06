export default function Event({ events }: { events: any[] }) {
  const list = events || [];
  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Acara</h2>
      </div>
      <div className="mx-auto max-w-3xl grid md:grid-cols-2 gap-4 px-6">
        {list.map((ev: any, i: number) => (
          <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold">{ev.title}</h3>
            <p className="text-sm opacity-80">{ev.date_display}</p>
            <p className="text-sm mt-1">{ev.location}</p>
            {ev.map_url ? (
              <a href={ev.map_url} target="_blank" className="text-sky-600 text-sm mt-2 inline-block" rel="noreferrer">
                Lihat Peta
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
