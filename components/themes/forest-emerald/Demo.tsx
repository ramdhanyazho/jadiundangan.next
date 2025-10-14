"use client";
export default function Demo() {
  const d = {
    names: "Dian & Fajar",
    date: "Minggu, 3 Mei 2026",
    venue: "Bogor",
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-50 to-white text-slate-800">
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-4xl font-serif text-emerald-900">{d.names}</h1>
        <p className="mt-2 text-emerald-800">
          {d.date} · {d.venue}
        </p>
        <a
          href="#jadwal"
          className="mt-6 inline-block rounded-full bg-emerald-700 px-5 py-2 text-white"
        >
          Lihat Jadwal
        </a>
      </section>
      <section id="jadwal" className="mx-auto max-w-3xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-5">
            <h3 className="font-semibold text-emerald-900">Akad</h3>
            <p className="mt-1 text-sm text-slate-600">10:00 WIB · Bogor</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-5">
            <h3 className="font-semibold text-emerald-900">Resepsi</h3>
            <p className="mt-1 text-sm text-slate-600">19:00 WIB · Bogor</p>
          </div>
        </div>
      </section>
    </main>
  );
}
