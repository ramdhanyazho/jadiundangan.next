import Image from "next/image";
import { useId, type SVGProps } from "react";

import { COUPLE_PLACEHOLDER } from "@/lib/assets/placeholders";

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LeafCluster = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-hidden
      className={cn("text-emerald-300/60", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`${gradientId}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId}-leaf)`}>
        <ellipse cx="80" cy="110" rx="42" ry="88" transform="rotate(-24 80 110)" />
        <ellipse cx="128" cy="98" rx="36" ry="72" transform="rotate(16 128 98)" />
        <ellipse cx="108" cy="154" rx="30" ry="60" transform="rotate(-6 108 154)" />
        <ellipse cx="52" cy="150" rx="28" ry="52" transform="rotate(-38 52 150)" />
      </g>
      <path
        d="M54 164c32-24 68-40 108-45-44 16-74 40-90 70"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={6}
        strokeOpacity={0.35}
      />
    </svg>
  );
};

const CrescentBranch = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-hidden
      className={cn("text-emerald-200/60", className)}
      {...props}
    >
      <defs>
        <radialGradient id={`${gradientId}-moon`} cx="0.45" cy="0.35" r="0.65">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.65" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gradientId}-branch`} x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <circle cx="176" cy="144" r="130" fill={`url(#${gradientId}-moon)`} />
      <path
        d="M56 246c48-64 108-102 180-114-62 26-108 66-138 120"
        fill="none"
        stroke={`url(#${gradientId}-branch)`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={10}
      />
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = index * 18 + 12;
        const radians = (angle * Math.PI) / 180;
        const x = 170 + Math.cos(radians) * 96;
        const y = 160 - Math.sin(radians) * 96;

        return (
          <ellipse
            key={angle}
            cx={x}
            cy={y}
            rx={18}
            ry={38}
            transform={`rotate(${angle} ${x} ${y})`}
            fill={`url(#${gradientId}-branch)`}
            fillOpacity={0.7}
          />
        );
      })}
    </svg>
  );
};

const Butterfly = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 220 180"
      role="img"
      aria-hidden
      className={cn("text-emerald-300/70", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`${gradientId}-wing`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId}-wing)`} stroke="currentColor" strokeOpacity={0.35} strokeWidth={4}>
        <path d="M108 88c-36-64-96-76-96-32 0 28 30 44 60 48" />
        <path d="M112 88c36-64 96-76 96-32 0 28-30 44-60 48" />
        <path d="M108 94c-24-38-70-38-70-6 0 18 20 28 42 28" />
        <path d="M112 94c24-38 70-38 70-6 0 18-20 28-42 28" />
      </g>
      <circle cx="110" cy="92" r="8" fill="currentColor" fillOpacity={0.45} />
      <line x1="108" y1="84" x2="96" y2="40" stroke="currentColor" strokeOpacity={0.45} strokeWidth={4} />
      <line x1="112" y1="84" x2="124" y2="40" stroke="currentColor" strokeOpacity={0.45} strokeWidth={4} />
      <circle cx="96" cy="40" r="6" fill="currentColor" fillOpacity={0.6} />
      <circle cx="124" cy="40" r="6" fill="currentColor" fillOpacity={0.6} />
    </svg>
  );
};

const Bloom = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-hidden
      className={cn("text-emerald-200/60", className)}
      {...props}
    >
      <defs>
        <radialGradient id={`${gradientId}-petal`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, index) => (
        <ellipse
          key={index}
          cx="110"
          cy="110"
          rx="42"
          ry="92"
          transform={`rotate(${index * 26} 110 110)`}
          fill={`url(#${gradientId}-petal)`}
        />
      ))}
      <circle cx="110" cy="110" r="32" fill="currentColor" fillOpacity={0.35} />
    </svg>
  );
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50">
      <div className="absolute inset-0 pointer-events-none">
        <LeafCluster className="absolute -left-24 top-20 h-80 w-80 text-emerald-300/40" />
        <CrescentBranch className="absolute right-0 top-32 h-[26rem] w-[26rem] text-emerald-200/35" />
        <LeafCluster className="absolute -bottom-8 left-12 h-72 w-72 -rotate-12 text-emerald-400/35" />
        <Butterfly className="absolute left-1/2 top-24 h-40 w-56 -translate-x-1/2 text-emerald-200/60" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-24 px-6 py-24">
        <section className="relative isolate overflow-hidden rounded-[3rem] border border-emerald-700/60 bg-emerald-950/60 px-8 py-16 shadow-[0_40px_120px_-60px_rgba(16,73,52,1)] backdrop-blur-lg md:px-16">
          <div className="pointer-events-none" aria-hidden>
            <Butterfly className="absolute left-12 top-8 h-28 w-32 text-emerald-200/50" />
            <Bloom className="absolute -right-10 -top-16 h-72 w-72 text-emerald-200/45" />
            <Bloom className="absolute -left-24 bottom-6 h-80 w-80 rotate-12 text-emerald-300/30" />
          </div>

          <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-center md:text-left">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/80">The Wedding Of</p>
              <h1 className="font-serif text-5xl md:text-6xl">Wahyu &amp; Riski</h1>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Sabtu, 22 Juli 2023</p>
              <p className="text-base text-emerald-100/80">
                Bandung, Jawa Barat · Gedung Serbaguna Kota Bandung
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <button className="rounded-full border border-emerald-500/70 px-6 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20">
                  Simpan Tanggal
                </button>
                <button className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-400">
                  Buka Undangan
                </button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative overflow-hidden rounded-[3rem] border border-emerald-500/30 bg-emerald-900/70 p-6 shadow-lg">
                <Image
                  src={COUPLE_PLACEHOLDER}
                  alt=""
                  width={480}
                  height={640}
                  className="h-80 w-full rounded-[2rem] object-cover"
                  priority
                  unoptimized
                />
                <Bloom className="absolute -left-14 -top-10 h-52 w-52 text-emerald-200/45" />
                <Bloom className="absolute -right-14 bottom-0 h-64 w-64 rotate-6 text-emerald-300/35" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-3">
          {[{ title: "Akad Nikah", time: "09.00 WIB", location: "Masjid Raya Bandung, Jl. Asia Afrika No. 3" }, { title: "Resepsi", time: "19.00 WIB", location: "Gedung Serbaguna, Bandung" }, { title: "Live Streaming", time: "19.30 WIB", location: "YouTube Wahyu &amp; Riski" }].map((item) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-3xl border border-emerald-700/60 bg-emerald-950/40 p-8 shadow-[0_20px_60px_-40px_rgba(21,128,61,1)]"
            >
              <div className="pointer-events-none" aria-hidden>
                <Butterfly className="absolute -right-8 -top-6 h-24 w-28 text-emerald-200/45" />
                <LeafCluster className="absolute -left-16 bottom-0 h-36 w-36 text-emerald-300/30" />
              </div>
              <div className="relative z-10 space-y-3">
                <h2 className="text-xs uppercase tracking-[0.4em] text-emerald-300">{item.title}</h2>
                <p className="font-serif text-3xl">{item.time}</p>
                <p className="text-sm text-emerald-100/80">{item.location}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[3rem] border border-emerald-700/50 bg-emerald-950/50 p-10">
          <div className="pointer-events-none" aria-hidden>
            <CrescentBranch className="absolute -left-16 top-6 h-60 w-60 text-emerald-200/25" />
            <Butterfly className="absolute right-10 top-10 h-24 w-28 text-emerald-200/45" />
          </div>
          <div className="relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-5 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Love Story</p>
              <h2 className="font-serif text-3xl md:text-4xl">Chapter by Chapter</h2>
              <p className="text-base text-emerald-100/80 md:max-w-md">
                Perjalanan cinta kami dimulai sejak pertemuan pertama di bangku kuliah. Dari teman seperjuangan hingga akhirnya
                memutuskan untuk mengikat janji suci. Kami percaya setiap detik adalah anugerah yang patut dirayakan.
              </p>
            </div>
            <ul className="space-y-6 text-left text-sm text-emerald-100/80">
              {[{ year: "2018", text: "Pertemuan pertama sebagai teman satu organisasi." }, { year: "2020", text: "Mulai resmi menjalin hubungan dan saling bertumbuh." }, { year: "2023", text: "Lamaran keluarga yang hangat dan penuh doa." }].map((story) => (
                <li key={story.year} className="rounded-2xl border border-emerald-700/60 bg-emerald-900/40 p-5">
                  <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">{story.year}</p>
                  <p className="mt-2 font-medium text-emerald-50">{story.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[3rem] border border-emerald-700/60 bg-emerald-950/40 p-10 text-center">
          <div className="pointer-events-none" aria-hidden>
            <LeafCluster className="absolute left-10 top-8 h-44 w-44 text-emerald-300/25" />
            <CrescentBranch className="absolute -right-8 bottom-0 h-64 w-64 text-emerald-200/25" />
          </div>
          <div className="relative z-10 space-y-8">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Galeri</p>
            <h2 className="font-serif text-3xl">Momen Kebahagiaan</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-emerald-700/40 bg-emerald-900/30"
                >
                  <Image
                    src={COUPLE_PLACEHOLDER}
                    alt=""
                    width={320}
                    height={400}
                    className="h-full w-full object-cover opacity-70"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[3rem] border border-emerald-700/60 bg-gradient-to-br from-emerald-900/80 via-emerald-950 to-emerald-900/80 p-10 text-center md:text-left">
          <div className="pointer-events-none" aria-hidden>
            <LeafCluster className="absolute -left-20 top-6 h-56 w-56 text-emerald-300/30" />
            <Butterfly className="absolute right-14 top-12 h-24 w-32 text-emerald-200/45" />
          </div>
          <div className="relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">RSVP &amp; Ucapan</p>
              <h2 className="font-serif text-3xl md:text-4xl">Berikan Doa Terbaik</h2>
              <p className="text-base text-emerald-100/80 md:max-w-md">
                Kami sangat menghargai kehadiran dan doa restu Anda. Silakan konfirmasi kehadiran dan tinggalkan pesan terbaik Anda
                melalui tombol di samping.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <button className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-400">
                Konfirmasi Kehadiran
              </button>
              <button className="rounded-full border border-emerald-500/70 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20">
                Tinggalkan Ucapan
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
