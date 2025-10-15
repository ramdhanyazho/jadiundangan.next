import Image from "next/image";

import { COUPLE_PLACEHOLDER } from "@/lib/assets/placeholders";

export default function Page() {
  return (
    <main className="min-h-screen bg-emerald-900 text-emerald-50">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <h1 className="text-4xl font-serif">Forest Emerald</h1>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Wahyu &amp; Riski</p>
          <p className="text-sm text-emerald-100/80">Sabtu, 22 Juli 2023 · Bandung</p>

          <div className="relative h-56 overflow-hidden rounded-3xl border border-emerald-700/70">
            <Image
              src={COUPLE_PLACEHOLDER}
              alt=""
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          <nav className="hidden flex-col gap-2 text-sm md:flex">
            {['Home', 'Mempelai', 'Acara', 'Galeri', 'Ucapan'].map((item) => (
              <a key={item} href="#" className="rounded-full px-3 py-1 hover:bg-emerald-800/60">
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex flex-col justify-center gap-8 rounded-3xl border border-emerald-700/60 bg-emerald-950/40 p-8 shadow-lg shadow-emerald-900/40 backdrop-blur">
          <article>
            <h2 className="text-sm uppercase tracking-[0.2em] text-emerald-200">Akad Nikah</h2>
            <p className="mt-2 text-2xl font-serif">09.00 WIB</p>
            <p className="mt-2 max-w-md text-sm text-emerald-100/80">Masjid Raya Bandung, Jl. Asia Afrika No. 3</p>
          </article>
          <article>
            <h2 className="text-sm uppercase tracking-[0.2em] text-emerald-200">Resepsi</h2>
            <p className="mt-2 text-2xl font-serif">19.00 WIB</p>
            <p className="mt-2 max-w-md text-sm text-emerald-100/80">Gedung Serbaguna, Bandung</p>
          </article>

          <button className="self-start rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-400">
            Simpan Tanggal
          </button>
        </section>
      </div>
    </main>
  );
}
