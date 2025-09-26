'use client';
export default function Gifts({ gifts=[] }){
  if (!gifts.length) return null;
  const copy = (txt) => { if (navigator?.clipboard) { navigator.clipboard.writeText(txt).catch(()=>{}); } };
  return (
    <section className="section container-narrow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Gift & Amplop Digital</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {gifts.map((g) => (
          <div key={g.id} className="card">
            <div className="text-sm opacity-70">{g.bank_name}</div>
            <div className="mt-1 text-lg font-semibold">{g.account_number}</div>
            {g.account_name ? <div className="opacity-80">{g.account_name}</div> : null}
            <div className="mt-3 flex gap-2">
              <button onClick={()=>copy(g.account_number)} className="px-3 py-1.5 rounded-lg bg-brand text-white text-sm">Salin No. Rekening</button>
              {g.qr_image_url ? <a href={g.qr_image_url} target="_blank" className="px-3 py-1.5 rounded-lg border text-sm">Lihat QR</a> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
