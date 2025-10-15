"use client";

import Image from "next/image";

import { COUPLE_PLACEHOLDER } from "@/lib/assets/placeholders";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-50 text-slate-800">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[1fr_420px]">
        {/* LEFT: hero */}
        <section className="relative isolate overflow-hidden">
          <Image
            src={COUPLE_PLACEHOLDER}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover opacity-60"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-white/40" />

          {/* petals sederhana */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute -top-10 h-2 w-2 rounded-full bg-rose-400/70"
                style={{
                  left: `${(i * 7) % 100}%`,
                  animation: `fall ${6 + (i % 5)}s linear ${(i % 5) * 0.6}s infinite`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 grid h-full place-items-center p-6">
            <div className="rounded-3xl bg-white/70 px-7 py-5 text-center shadow">
              <h1 className="text-3xl font-serif">Wahyu &amp; Riski</h1>
              <p className="mt-2 text-slate-600">Rabu, 15 Maret 2023</p>
            </div>
          </div>
        </section>

        {/* RIGHT: panel */}
        <aside className="relative border-l border-slate-100 bg-white">
          <div className="sticky top-0 h-svh overflow-y-auto p-6">
            <p className="text-xl font-serif text-slate-500">Undangan Pernikahan</p>
            <div className="relative mx-auto mt-5 h-36 w-36 overflow-hidden rounded-full ring-2 ring-white shadow">
              <Image
                src={COUPLE_PLACEHOLDER}
                alt=""
                fill
                sizes="144px"
                className="object-cover"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-3xl font-serif">Wahyu &amp; Riski</h2>
            <p className="mt-2 text-slate-600">Rabu, 15 Maret 2023</p>

            <button className="mt-4 inline-flex items-center rounded-full border px-4 py-2 text-sm">
              Save Google Calendar
            </button>

            <div className="mt-8 text-center text-xs text-slate-500">Scroll Down</div>

            {/* navigasi bawah (dummy) */}
            <nav className="fixed bottom-4 right-6 left-auto rounded-2xl border bg-white/90 px-3 py-2 shadow">
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

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-5%) scale(1); opacity: .9; }
          100% { transform: translateY(110vh) scale(.8) rotate(30deg); opacity: 0.2; }
        }
      `}</style>
    </main>
  );
}
