"use client";
export default function Demo() {
  const d = {
    names: "Anya & Reza",
    date: "Sabtu, 12 Juli 2026",
    venue: "Bandung",
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-slate-800">
      {/* Header klasik */}
      <section className="relative overflow-hidden rounded-b-[2rem] border-b border-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_70%_0%,rgba(129,140,248,0.2),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-xs tracking-[0.25em] text-indigo-800">INDIGO CLASSIC</p>
          <h1 className="mt-3 text-4xl font-serif text-indigo-950">{d.names}</h1>
          <p className="mt-3 text-indigo-900">
            {d.date} · {d.venue}
          </p>
          <a
            href="#jadwal"
            className="mt-6 inline-block rounded-full border border-indigo-300 px-5 py-2 text-indigo-900 hover:bg-indigo-50"
          >
            Lihat Jadwal
          </a>
        </div>
      </section>

      {/* Cards jadwal */}
      <section id="jadwal" className="mx-auto max-w-3xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-indigo-200 bg-white p-5">
            <h3 className="font-semibold text-indigo-950">Akad</h3>
            <p className="mt-1 text-sm text-slate-600">09:00 WIB · Bandung</p>
            <a className="mt-3 inline-block text-sm text-indigo-900 underline" href="#">
              Buka Maps
            </a>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-white p-5">
            <h3 className="font-semibold text-indigo-950">Resepsi</h3>
            <p className="mt-1 text-sm text-slate-600">19:00 WIB · Bandung</p>
            <a className="mt-3 inline-block text-sm text-indigo-900 underline" href="#">
              Buka Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
