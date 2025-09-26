export default function RSVPList({ entries=[] }){
  if (!entries.length) return null;
  return (
    <section className="section container-narrow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Ucapan & Doa</h2>
      <div className="space-y-4">
        {entries.map((e)=> (
          <div key={e.id} className="card">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{e.name}</div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {e.status === 'yes' ? 'Hadir' : e.status === 'no' ? 'Berhalangan' : 'Belum Pasti'}
              </span>
            </div>
            {e.message ? <p className="mt-2 opacity-90">{e.message}</p> : null}
            <div className="mt-2 text-xs opacity-60">{new Date(e.created_at).toLocaleString('id-ID')}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
