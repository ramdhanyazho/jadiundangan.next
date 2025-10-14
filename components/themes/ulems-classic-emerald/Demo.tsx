"use client";
export default function Demo() {
  const data = {
    names: "Aisyah & Rafi",
    date: "Sabtu, 22 November 2025",
    venue: "Masjid Agung, Jakarta",
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800">
      <section className="relative overflow-hidden rounded-b-[2rem] border-b border-emerald-100 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-xs tracking-[0.25em] text-emerald-700">
            ULEMS CLASSIC EMERALD
          </p>
          <h1 className="mt-3 text-4xl font-serif text-emerald-900">
            {data.names}
          </h1>
          <p className="mt-3 text-emerald-700">
            {data.date} · {data.venue}
          </p>
          <a
            href="#jadwal"
            className="mt-6 inline-block rounded-full border border-emerald-300 px-5 py-2 text-emerald-800 hover:bg-emerald-50"
          >
            Lihat Jadwal
          </a>
        </div>
      </section>

      <section id="jadwal" className="mx-auto max-w-3xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-5">
            <h3 className="font-semibold text-emerald-900">Akad Nikah</h3>
            <p className="mt-1 text-sm text-slate-600">
              09:00 WIB · Masjid Agung Jakarta
            </p>
            <a
              className="mt-3 inline-block text-sm text-emerald-800 underline"
              href="#"
            >
              Buka Maps
            </a>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-5">
            <h3 className="font-semibold text-emerald-900">Resepsi</h3>
            <p className="mt-1 text-sm text-slate-600">
              19:00 WIB · Gedung Serbaguna Jakarta
            </p>
            <a
              className="mt-3 inline-block text-sm text-emerald-800 underline"
              href="#"
            >
              Buka Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
