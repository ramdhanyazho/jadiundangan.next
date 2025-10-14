"use client";
import { useCallback, useEffect, useState } from "react";

function useCountdown(targetISO: string) {
  const calc = useCallback(() => {
    const t = new Date(targetISO).getTime();
    const diff = Math.max(0, t - Date.now());
    const s = Math.floor(diff / 1000) % 60;
    const m = Math.floor(diff / 60000) % 60;
    const h = Math.floor(diff / 3600000) % 24;
    const d = Math.floor(diff / 86400000);
    return { d, h, m, s };
  }, [targetISO]);
  const [left, setLeft] = useState(() => calc());
  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return left;
}

export default function Demo() {
  const target = "2026-06-21T09:00:00+07:00"; // ganti ke tanggal acara kamu
  const { d, h, m, s } = useCountdown(target);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const videoSrc = "/videos/cinematic.mp4";
  const fallbackBackground =
    "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_10%,rgba(59,130,246,0.12),transparent_60%)]";

  const handleVideoError = () => setVideoAvailable(false);
  const handleVideoLoaded = () => setVideoAvailable(true);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative h-svh">
        {/* Background video — taruh file contoh di /public/videos/cinematic.mp4 */}
        <video
          className={`absolute inset-0 h-full w-full object-cover ${
            videoAvailable ? "block" : "hidden"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={videoSrc}
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
        />
        {/* Fallback gradient when demo video asset isn't bundled */}
        {!videoAvailable && (
          <div
            className={`absolute inset-0 ${fallbackBackground} bg-slate-900`}
            aria-hidden
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Content */}
        <div className="relative z-10 grid h-full place-items-center px-6 text-center">
          <div>
            <p className="text-xs tracking-[0.25em] text-white/80">
              CINEMATIC HIGHLIGHT
            </p>
            <h1 className="mt-3 text-5xl font-semibold">Rani & Bagas</h1>
            <p className="mt-2 text-white/80">Minggu, 21 Juni 2026 · Jakarta</p>

            {/* Countdown */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {[
                { v: d, l: "Hari" },
                { v: h, l: "Jam" },
                { v: m, l: "Menit" },
                { v: s, l: "Detik" },
              ].map((x) => (
                <div
                  key={x.l}
                  className="min-w-[72px] rounded-2xl bg-white/10 px-3 py-3 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold tabular-nums">{x.v}</div>
                  <div className="text-[10px] tracking-wide text-white/80">{x.l}</div>
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

      <section id="jadwal" className="mx-auto max-w-4xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Akad Nikah</h3>
            <p className="mt-1 text-sm text-white/80">
              09:00 WIB · Masjid Agung Jakarta
            </p>
            <a className="mt-3 inline-block text-sm underline" href="#">
              Buka Maps
            </a>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Resepsi</h3>
            <p className="mt-1 text-sm text-white/80">
              19:00 WIB · The Royal Hall
            </p>
            <a className="mt-3 inline-block text-sm underline" href="#">
              Buka Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
