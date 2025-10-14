"use client";
export default function Demo() {
  const d = {
    names: "Arin & Dewa",
    date: "Sabtu, 14 Februari 2026",
    venue: "Jakarta",
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-slate-800">
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">{d.names}</h1>
        <p className="mt-2 text-slate-600">
          {d.date} · {d.venue}
        </p>
        <a
          href="#jadwal"
          className="mt-6 inline-block rounded-lg border px-4 py-2 text-slate-700"
        >
          Lihat Jadwal
        </a>
      </section>
      <section id="jadwal" className="mx-auto max-w-3xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-medium">Akad</h3>
            <p className="mt-1 text-sm text-slate-600">09:00 WIB · Jakarta</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-medium">Resepsi</h3>
            <p className="mt-1 text-sm text-slate-600">19:00 WIB · Jakarta</p>
          </div>
        </div>
      </section>
    </main>
  );
}
