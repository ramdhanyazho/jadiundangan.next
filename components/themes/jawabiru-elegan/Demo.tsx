"use client";
export default function Demo() {
  const data = {
    names: "Nisa & Rahmat",
    date: "Minggu, 7 Desember 2025",
    venue: "The Royal Hall, Bandung",
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(2,132,199,.15),transparent_60%),radial-gradient(circle_at_70%_10%,rgba(29,78,216,.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-xs tracking-[0.25em] text-sky-800">JAWABIRU ELEGAN</p>
          <h1 className="mt-3 text-4xl font-serif text-sky-950">{data.names}</h1>
          <p className="mt-3 text-sky-900">
            {data.date} · {data.venue}
          </p>
          <a
            href="#jadwal"
            className="mt-6 inline-block rounded-full border border-sky-300 px-5 py-2 text-sky-900 hover:bg-sky-50"
          >
            Lihat Jadwal
          </a>
        </div>
      </section>

      <section id="jadwal" className="mx-auto max-w-3xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-sky-200 bg-white p-5">
            <h3 className="font-semibold text-sky-950">Akad</h3>
            <p className="mt-1 text-sm text-slate-600">09:00 WIB · Bandung</p>
            <a className="mt-3 inline-block text-sm text-sky-900 underline" href="#">
              Buka Maps
            </a>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-white p-5">
            <h3 className="font-semibold text-sky-950">Resepsi</h3>
            <p className="mt-1 text-sm text-slate-600">19:00 WIB · Bandung</p>
            <a className="mt-3 inline-block text-sm text-sky-900 underline" href="#">
              Buka Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
