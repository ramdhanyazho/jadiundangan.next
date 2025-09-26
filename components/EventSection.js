import dynamic from 'next/dynamic';
const EventMap = dynamic(() => import('./EventMap'), { ssr: false });
export default function EventSection({ events=[] }){
  if (!events.length) return null;
  return (
    <section className="section container-narrow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Acara</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {events.map(ev => (
          <div key={ev.id} className="card">
            <h3 className="text-xl font-semibold">{ev.title || ev.type}</h3>
            <div className="mt-2 text-sm opacity-80">{ev.date_display || ev.date} {ev.time ? `• ${ev.time}` : ''}</div>
            {ev.location ? <div className="mt-2">{ev.location}</div> : null}
            {ev.map_url ? <a className="mt-3 inline-block text-brand underline" href={ev.map_url} target="_blank" rel="noreferrer">Lihat di Google Maps</a> : null}
            {ev.note ? <p className="mt-3 text-sm opacity-80">{ev.note}</p> : null}
            {ev.latitude && ev.longitude ? (<div className="mt-4"><EventMap lat={Number(ev.latitude)} lng={Number(ev.longitude)} title={ev.title || ev.type}/></div>) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
