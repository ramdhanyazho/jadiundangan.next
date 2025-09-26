export default function Gallery({ photos=[] }){
  if (!photos.length) return null;
  return (
    <section className="section container-narrow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Galeri</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map(p => (
          <figure key={p.id} className="overflow-hidden rounded-xl shadow">
            <img src={p.url} alt={p.caption || 'Photo'} className="w-full h-48 object-cover hover:scale-105 transition-transform" loading="lazy"/>
          </figure>
        ))}
      </div>
    </section>
  )
}
