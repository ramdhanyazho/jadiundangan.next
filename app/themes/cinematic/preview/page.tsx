"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  CINEMATIC_POSTER_PLACEHOLDER,
  CINEMATIC_VIDEO_PLACEHOLDER,
} from "@/lib/assets/placeholders";

function useCountdown(targetISO: string) {
  const calc = useCallback(() => {
    const target = new Date(targetISO).getTime();
    const diff = Math.max(0, target - Date.now());
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 60000) % 60;
    const hours = Math.floor(diff / 3600000) % 24;
    const days = Math.floor(diff / 86400000);
    return { d: days, h: hours, m: minutes, s: seconds };
  }, [targetISO]);

  const [left, setLeft] = useState(() => calc());

  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return left;
}

export default function Page() {
  const target = "2026-06-21T09:00:00+07:00";
  const { d, h, m, s } = useCountdown(target);
  const videoSrc = useMemo(
    () => process.env.NEXT_PUBLIC_CINEMATIC_VIDEO ?? CINEMATIC_VIDEO_PLACEHOLDER,
    [],
  );
  const posterSrc = useMemo(
    () => process.env.NEXT_PUBLIC_CINEMATIC_POSTER ?? CINEMATIC_POSTER_PLACEHOLDER,
    [],
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO VIDEO */}
      <section className="relative h-svh">
        {/* NOTE: sediakan file contoh di /public/videos/cinematic.mp4 */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={videoSrc}
          poster={posterSrc}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 grid h-full place-items-center px-6 text-center">
          <div>
            <p className="text-xs tracking-[0.25em] text-white/80">CINEMATIC TEMPLATE</p>
            <h1 className="mt-3 text-5xl font-semibold">Wahyu &amp; Riski</h1>
            <p className="mt-2 text-white/85">Minggu, 21 Juni 2026 · Jakarta</p>

            <div className="mt-8 flex items-center justify-center gap-3">
              {[
                { v: d, l: "Hari" },
                { v: h, l: "Jam" },
                { v: m, l: "Menit" },
                { v: s, l: "Detik" },
              ].map((item) => (
                <div
                  key={item.l}
                  className="min-w-[72px] rounded-2xl bg-white/10 px-3 py-3 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold tabular-nums">{item.v}</div>
                  <div className="text-[10px] tracking-wide text-white/80">{item.l}</div>
                </div>
              ))}
            </div>

            <a
              href="#jadwal"
              className="mt-8 inline-block rounded-full bg-white px-6 py-2 text-black"
            >
              Lihat Jadwal
            </a>
          </div>
        </div>
      </section>

      {/* SECTION JADWAL */}
      <section id="jadwal" className="mx-auto max-w-4xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Akad Nikah</h3>
            <p className="mt-1 text-sm text-white/80">09:00 WIB · Masjid Agung Jakarta</p>
            <a className="mt-3 inline-block text-sm underline" href="#">
              Buka Maps
            </a>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Resepsi</h3>
            <p className="mt-1 text-sm text-white/80">19:00 WIB · The Royal Hall</p>
            <a className="mt-3 inline-block text-sm underline" href="#">
              Buka Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
