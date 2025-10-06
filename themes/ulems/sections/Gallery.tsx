export default function Gallery({ media }: { media: any[] }) {
  const photos = (media || []).filter((item) => item.type === 'photo');
  if (!photos.length) return null;
  return (
    <section className="py-14 bg-slate-100">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-2xl font-semibold mb-6">Galeri</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {photos.map((photo: any, idx: number) => (
            <figure key={idx} className="overflow-hidden rounded-xl shadow-sm">
              <img src={photo.url} alt={photo.caption || `Foto ${idx + 1}`} className="w-full h-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
