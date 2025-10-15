export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Minimal Bloom</p>
        <h1 className="mt-4 text-5xl font-serif">Wahyu &amp; Riski</h1>
        <p className="mt-3 max-w-xl text-base text-slate-600">
          Rabu, 15 Maret 2023 · Gedung Serbaguna Jakarta
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Akad Nikah</h2>
            <p className="mt-2 text-lg font-medium">09.00 WIB</p>
            <p className="mt-1 text-sm text-slate-500">Masjid Agung Jakarta</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Resepsi</h2>
            <p className="mt-2 text-lg font-medium">19.00 WIB</p>
            <p className="mt-1 text-sm text-slate-500">The Royal Hall</p>
          </div>
        </div>

        <a
          href="#"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Lihat Detail
        </a>
      </section>
    </main>
  );
}
