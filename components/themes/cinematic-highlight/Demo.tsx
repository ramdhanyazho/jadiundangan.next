"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const data = {
  couple: {
    groom: {
      name: "Rizky Adi Pratama",
      parents: "Putra dari Bpk. Sunarto & Ibu Sulastri",
    },
    bride: {
      name: "Aurelia Sasmita",
      parents: "Putri dari Bpk. Hendra & Ibu Ratna",
    },
    date: "Minggu, 21 Juni 2026",
    venue: "The Grand Royal Hall · Jakarta",
    greeting:
      "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami.",
  },
  timeline: [
    {
      title: "Pertama Bertemu",
      description: "Di kampus seni pada tahun 2016, ketika mengikuti proyek film pendek pertama kami.",
      time: "2016",
    },
    {
      title: "Lamaran",
      description: "Pertunangan hangat di rumah keluarga Rizky sebagai awal babak baru kami.",
      time: "2024",
    },
    {
      title: "Akad & Resepsi",
      description: "Mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberi doa terbaik.",
      time: "21 Juni 2026",
    },
  ],
  events: [
    {
      title: "Akad Nikah",
      datetime: "Minggu, 21 Juni 2026 · 09.00 WIB",
      location: "Masjid Al-Hambra · Jakarta",
    },
    {
      title: "Resepsi Malam",
      datetime: "Minggu, 21 Juni 2026 · 19.00 WIB",
      location: "The Grand Royal Hall · Jakarta",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1520854221050-0f4caff449fb",
    "https://images.unsplash.com/photo-1520854221050-0facaff449fd",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    "https://images.unsplash.com/photo-1543248939-ff40856f65d4",
    "https://images.unsplash.com/photo-1520854221050-0f4caff449fb",
  ],
  gift: {
    bank: "BCA",
    number: "1234567890",
    name: "Aurelia Sasmita",
  },
};

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
  const target = "2026-06-21T09:00:00+07:00";
  const { d, h, m, s } = useCountdown(target);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const videoSrc = "/videos/cinematic.mp4";
  const fallbackBackground =
    "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_60%)]";

  const handleVideoError = () => setVideoAvailable(false);
  const handleVideoLoaded = () => setVideoAvailable(true);

  const countdownBlocks = useMemo(
    () => [
      { v: d, l: "Hari" },
      { v: h, l: "Jam" },
      { v: m, l: "Menit" },
      { v: s, l: "Detik" },
    ],
    [d, h, m, s],
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative h-[100svh] overflow-hidden">
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoAvailable ? "opacity-100" : "opacity-0"
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
        {!videoAvailable && (
          <div className={`absolute inset-0 ${fallbackBackground} bg-slate-900`} aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">Cinematic Highlight</p>
          <h1 className="mt-6 text-5xl font-semibold sm:text-6xl">Rizky &amp; Aurelia</h1>
          <p className="mt-4 max-w-2xl text-balance text-sm text-white/70 sm:text-base">
            {data.couple.greeting}
          </p>
          <p className="mt-6 text-lg text-white/80">{data.couple.date}</p>
          <p className="text-sm text-white/60">{data.couple.venue}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {countdownBlocks.map((item) => (
              <div
                key={item.l}
                className="min-w-[80px] rounded-2xl bg-white/10 px-4 py-4 backdrop-blur-md"
              >
                <div className="text-3xl font-semibold tabular-nums">{item.v}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
                  {item.l}
                </div>
              </div>
            ))}
          </div>
          <a
            href="#events"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
          >
            Lihat Jadwal
          </a>
          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
            <div className="flex flex-col items-center text-[11px] uppercase tracking-[0.4em] text-white/40">
              <span>Scroll</span>
              <span className="mt-2 h-10 w-px animate-pulse bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* OPENING */}
      <section className="relative border-y border-white/5 bg-black py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)] opacity-60" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Assalamu&apos;alaikum Warahmatullahi Wabarakatuh</p>
          <h2 className="mt-4 text-3xl font-semibold">The Wedding of Rizky &amp; Aurelia</h2>
          <p className="mt-4 text-balance text-sm text-white/70 sm:text-base">
            Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
            hadir untuk memberikan doa restu pada hari bahagia kami.
          </p>
        </div>
      </section>

      {/* COUPLE */}
      <section className="bg-black py-20" id="couple">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 text-center sm:grid-cols-2">
            {[data.couple.groom, data.couple.bride].map((person) => (
              <div
                key={person.name}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-white/80"
              >
                <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-3xl" />
                <div className="relative">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10 text-3xl font-semibold text-white">
                    {person.name
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{person.name}</h3>
                  <p className="mt-3 text-sm text-white/70">{person.parents}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="border-y border-white/5 bg-black py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Schedule</p>
            <h2 className="mt-3 text-3xl font-semibold">Jadwal Acara</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {data.events.map((event) => (
              <div
                key={event.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-white/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{event.datetime}</p>
                  <p className="mt-2 text-sm text-white/60">{event.location}</p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
                  >
                    Lihat Lokasi
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-black py-20" id="story">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Our Story</p>
            <h2 className="mt-3 text-3xl font-semibold">Jejak Perjalanan Cinta</h2>
          </div>
          <div className="mt-12 space-y-8 border-l border-white/10 pl-6 sm:pl-10">
            {data.timeline.map((item) => (
              <div key={item.title} className="relative">
                <div className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border border-white/40 bg-white" />
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">{item.time}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-y border-white/5 bg-black py-20" id="gallery">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Gallery</p>
            <h2 className="mt-3 text-3xl font-semibold">Koleksi Momen</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.gallery.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white/5"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.2), rgba(15,23,42,0.5)), url(${src}&auto=format&fit=crop&w=800&q=80)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="bg-black py-20" id="rsvp">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">RSVP</p>
          <h2 className="mt-3 text-3xl font-semibold">Konfirmasi Kehadiran</h2>
          <p className="mt-4 text-sm text-white/70">
            Mohon konfirmasi kehadiran Anda melalui tombol di bawah ini untuk memudahkan kami mempersiapkan acara.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Konfirmasi via WhatsApp
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white hover:text-white"
            >
              Kirim Ucapan
            </a>
          </div>
        </div>
      </section>

      {/* GIFT */}
      <section className="border-y border-white/5 bg-black py-20" id="gift">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Wedding Gift</p>
          <h2 className="mt-3 text-3xl font-semibold">Kirim Hadiah</h2>
          <p className="mt-4 text-sm text-white/70">
            Doa restu Anda merupakan anugerah terbaik. Namun apabila ingin mengirimkan hadiah, berikut informasi rekening kami.
          </p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">{data.gift.bank}</p>
            <p className="mt-3 text-2xl font-semibold">{data.gift.number}</p>
            <p className="mt-1 text-sm text-white/70">a.n. {data.gift.name}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12">
        <div className="mx-auto max-w-3xl px-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
          Terima kasih atas doa dan kehadirannya
        </div>
      </footer>
    </main>
  );
}
