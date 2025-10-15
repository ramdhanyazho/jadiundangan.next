import Image from "next/image";

import { COUPLE_PLACEHOLDER } from "@/lib/assets/placeholders";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[1fr_440px]">
        {/* LEFT background lembut */}
        <section className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_10%_20%,rgba(99,102,241,.08),transparent_60%)]" />
          <div className="grid h-full place-items-center p-8">
            <div className="text-center">
              <h1 className="text-4xl font-serif">Wahyu &amp; Riski</h1>
              <p className="mt-2 text-slate-600">Rabu, 15 Maret 2023</p>
            </div>
          </div>
        </section>

        {/* RIGHT panel */}
        <aside className="relative border-l border-slate-100 bg-white">
          <div className="sticky top-0 h-svh overflow-y-auto px-8 py-10">
            <p className="text-2xl font-serif text-slate-900">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>

            <p className="mt-6 text-slate-700">
              Assalamualaikum Warahmatullahi Wabarakatuh. Tanpa mengurangi rasa hormat,
              kami mengundang Anda untuk menghadiri acara pernikahan kami:
            </p>

            <div className="relative mx-auto mt-8 h-36 w-36 overflow-hidden rounded-full ring-2 ring-white shadow">
              <Image
                src={COUPLE_PLACEHOLDER}
                alt=""
                fill
                sizes="144px"
                className="object-cover"
                unoptimized
              />
            </div>

            <h2 className="mt-6 text-3xl font-serif">Nama Wahyu Siapa</h2>

            {/* dummy bottom nav */}
            <nav className="fixed bottom-4 right-8 left-auto rounded-2xl border bg-white/90 px-3 py-2 shadow">
              <ul className="flex items-center gap-4 text-xs">
                <li>Home</li>
                <li>Mempelai</li>
                <li>Tanggal</li>
                <li>Galeri</li>
                <li>Ucapan</li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
