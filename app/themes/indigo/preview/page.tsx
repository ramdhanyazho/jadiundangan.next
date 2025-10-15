import Image from "next/image";

import { COUPLE_PLACEHOLDER } from "@/lib/assets/placeholders";

const quickLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Mempelai", href: "#couple" },
  { label: "Acara", href: "#event" },
  { label: "Galeri", href: "#gallery" },
  { label: "Ucapan", href: "#rsvp" },
];

const timeline = [
  {
    title: "Pertama Bertemu",
    date: "2016",
    description:
      "Saat orientasi kampus, Rehan dan Maulidan bertemu untuk pertama kalinya dan mulai saling mengenal.",
  },
  {
    title: "Lamaran",
    date: "2023",
    description:
      "Keluarga besar berkumpul di Bandung untuk prosesi lamaran yang hangat dan penuh haru.",
  },
  {
    title: "Menuju Akad",
    date: "2024",
    description:
      "Kini, mereka mengundang Anda untuk hadir menyaksikan hari bahagia yang telah lama dinanti.",
  },
];

const events = [
  {
    name: "Akad Nikah",
    time: "Minggu, 21 Juli 2024 · 09.00 WIB",
    location: "Masjid Raya Bandung",
    address: "Jl. Asia Afrika No. 1, Bandung",
  },
  {
    name: "Resepsi",
    time: "Minggu, 21 Juli 2024 · 19.00 WIB",
    location: "The Indigo Hall",
    address: "Jl. Merdeka No. 45, Bandung",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1520854221050-0f4caff449fb",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
];

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#f5f4ff] text-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),transparent_55%)]" />
      <div className="relative">
        <section
          id="hero"
          className="relative flex min-h-[720px] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 text-center"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-200/60 blur-3xl" />
            <div className="absolute -right-20 top-40 h-64 w-64 rounded-full bg-purple-200/60 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/30 bg-white/60 blur-3xl" />
          </div>

          <p className="font-semibold tracking-[0.4em] text-indigo-500">THE WEDDING OF</p>
          <h1 className="mt-6 font-serif text-5xl text-slate-900 sm:text-6xl md:text-7xl">Rehan &amp; Maulidan</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam hari yang sakral dan penuh cinta.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500">
              Buka Undangan
            </button>
            <div className="rounded-full border border-indigo-200 bg-white/60 px-6 py-3 text-sm font-medium text-indigo-700 backdrop-blur">
              Minggu, 21 Juli 2024 · Bandung
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {["100", "240", "18", "45"].map((value, index) => (
              <div key={value} className="min-w-[120px] rounded-3xl border border-white/70 bg-white/70 px-6 py-5 shadow-sm backdrop-blur">
                <p className="text-4xl font-semibold text-indigo-600">{value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500">
                  {index === 0 && "Hari"}
                  {index === 1 && "Jam"}
                  {index === 2 && "Menit"}
                  {index === 3 && "Detik"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto -mt-14 grid max-w-6xl gap-10 px-6 pb-24 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[36px] border border-indigo-100 bg-white/90 p-10 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-500">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            <h2 className="mt-6 font-serif text-4xl text-slate-900">Assalamualaikum Warahmatullahi Wabarakatuh</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara
              pernikahan kami. Kehadiran dan doa restu Anda merupakan kehormatan bagi kami sekeluarga.
            </p>

            <dl className="mt-10 grid gap-6 text-sm text-slate-700 md:grid-cols-2">
              <div>
                <dt className="font-semibold uppercase tracking-[0.35em] text-indigo-500">Lokasi</dt>
                <dd className="mt-2 leading-relaxed">
                  The Indigo Hall
                  <br />
                  Jl. Merdeka No. 45, Bandung
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.35em] text-indigo-500">Waktu</dt>
                <dd className="mt-2 leading-relaxed">
                  Minggu, 21 Juli 2024
                  <br />
                  09.00 WIB s.d. selesai
                </dd>
              </div>
            </dl>
          </div>

          <aside className="relative rounded-[36px] border border-indigo-100 bg-gradient-to-b from-white/90 via-white/70 to-indigo-50/60 p-10 text-center shadow-xl backdrop-blur">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border border-indigo-100 shadow-inner">
              <Image src={COUPLE_PLACEHOLDER} alt="Rehan & Maulidan" width={160} height={160} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-6 font-serif text-3xl text-slate-900">Rehan &amp; Maulidan</h3>
            <p className="mt-3 text-sm text-slate-600">
              Putra pertama dari Bapak Ahmad &amp; Ibu Lestari
              <br />
              Putri kedua dari Bapak Fauzi &amp; Ibu Rahma
            </p>

            <div className="mt-8 rounded-3xl border border-indigo-100 bg-white/80 px-6 py-5 text-left text-sm shadow-sm">
              <p className="font-semibold text-indigo-600">Live Streaming</p>
              <p className="mt-1 text-slate-600">Ikuti siaran langsung melalui kanal YouTube keluarga pada pukul 09.00 WIB.</p>
            </div>
          </aside>
        </section>

        <section id="couple" className="relative bg-white/70 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),transparent_60%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 md:flex-row">
            <div className="md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">MEMPELAI</p>
              <h2 className="mt-4 font-serif text-4xl text-slate-900">Pengantin yang Berbahagia</h2>
              <p className="mt-5 leading-relaxed text-slate-600">
                Dua hati yang dipertemukan dalam perjalanan panjang, kini siap melangkah ke babak baru kehidupan.
                Dengan ridho Allah SWT serta restu orang tua dan sahabat, Rehan dan Maulidan memohon doa agar rumah
                tangga yang dibangun senantiasa sakinah, mawaddah, warahmah.
              </p>
            </div>
            <div className="grid flex-1 gap-6 md:grid-cols-2">
              {["Rehan Fauzan", "Maulidan Putri"].map((name, index) => (
                <div key={name} className="group relative overflow-hidden rounded-[32px] border border-indigo-100 bg-white p-8 shadow-lg">
                  <span className="absolute right-6 top-6 text-5xl font-light text-indigo-100">{index === 0 ? "R" : "M"}</span>
                  <h3 className="text-2xl font-serif text-slate-900">{name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.35em] text-indigo-400">
                    {index === 0 ? "Putra" : "Putri"} pertama
                  </p>
                  <p className="mt-5 text-sm text-slate-600">
                    {index === 0
                      ? "Putra dari Bapak Ahmad Fauzi & Ibu Lestari"
                      : "Putri dari Bapak Rahmat Hidayat & Ibu Siti Rahma"}
                  </p>
                  <div className="mt-8 flex items-center gap-3 text-sm font-medium text-indigo-600">
                    <span className="h-10 w-10 rounded-full bg-indigo-50" />
                    <div>
                      <p className="leading-tight text-slate-900">Instagram</p>
                      <p className="text-xs text-slate-500">@{index === 0 ? "rehanfzn" : "maulidanp"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="event" className="relative px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">JADWAL ACARA</p>
              <h2 className="mt-4 font-serif text-4xl text-slate-900">Rangkaian Hari Bahagia</h2>
              <p className="mt-5 max-w-2xl text-slate-600">
                Kami menyiapkan dua rangkaian acara yang penuh makna. Mohon kehadiran dan doa restu Anda untuk
                menyempurnakan kebahagiaan kami.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <div
                  key={event.name}
                  className="relative overflow-hidden rounded-[32px] border border-indigo-100 bg-white p-10 shadow-lg"
                >
                  <span className="absolute right-8 top-6 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-200">
                    {event.name === "Akad Nikah" ? "Sakral" : "Meriah"}
                  </span>
                  <h3 className="text-2xl font-serif text-slate-900">{event.name}</h3>
                  <p className="mt-4 text-sm text-indigo-500">{event.time}</p>
                  <p className="mt-3 text-sm font-medium text-slate-700">{event.location}</p>
                  <p className="mt-1 text-sm text-slate-500">{event.address}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
                    Simpan ke Kalender
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-6 rounded-[32px] border border-indigo-100 bg-white/80 p-10 shadow-inner backdrop-blur md:grid-cols-[240px_1fr]">
              <div className="rounded-3xl bg-gradient-to-b from-indigo-500 to-indigo-700 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.4em]">Our Journey</p>
                <h3 className="mt-4 font-serif text-3xl">Cerita Cinta</h3>
              </div>
              <div className="space-y-8">
                {timeline.map((item) => (
                  <div key={item.title} className="grid gap-2 border-l-2 border-indigo-100 pl-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-400">{item.date}</p>
                    <h4 className="text-xl font-serif text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="relative bg-white/70 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.12),transparent_60%)]" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">GALERI</p>
              <h2 className="mt-4 font-serif text-4xl text-slate-900">Potret Kebersamaan</h2>
              <p className="mt-5 max-w-2xl text-slate-600">
                Beberapa kenangan yang kami abadikan dalam perjalanan cinta kami. Semoga menjadi saksi bahagia hingga
                hari pernikahan.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {galleryImages.map((src, index) => (
                <div key={`${src}-${index}`} className="group relative overflow-hidden rounded-[28px] border border-indigo-100 bg-white shadow-sm">
                  <Image
                    src={`${src}?auto=format&fit=crop&w=600&q=80`}
                    alt="Galeri Rehan dan Maulidan"
                    width={400}
                    height={420}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm text-white">
                    Kenangan #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rsvp" className="relative px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 rounded-[36px] border border-indigo-100 bg-white/90 p-10 shadow-xl backdrop-blur md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Ucapan &amp; Doa</p>
                <h2 className="mt-4 font-serif text-4xl text-slate-900">RSVP &amp; Wedding Wishes</h2>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">
                  Kirimkan ucapan dan doa terbaik untuk kami melalui formulir berikut. Kami juga menyiapkan tautan
                  live streaming dan daftar hadiah digital bagi Anda yang ingin berbagi kebahagiaan.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full bg-indigo-50" />
                    <p className="font-medium text-slate-700">Form RSVP Online</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full bg-indigo-50" />
                    <p className="font-medium text-slate-700">Live Streaming via YouTube</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full bg-indigo-50" />
                    <p className="font-medium text-slate-700">Kirim Hadiah Digital</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <input className="w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-200" placeholder="Nama Lengkap" />
                <input className="w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-200" placeholder="Alamat Email" />
                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Tulis ucapan dan doa terbaik Anda"
                />
                <button className="w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500">
                  Kirim Ucapan
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-indigo-100 py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),transparent_65%)]" />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
            <h2 className="font-serif text-4xl text-slate-900">Terima Kasih</h2>
            <p className="max-w-3xl text-sm text-slate-600">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan
              memberikan doa restu untuk kelancaran acara pernikahan kami.
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-400">Rehan &amp; Maulidan</p>
          </div>
        </footer>
      </div>

      <aside className="fixed right-8 top-1/2 hidden -translate-y-1/2 flex-col gap-3 rounded-3xl border border-indigo-100 bg-white/80 p-2 shadow-lg backdrop-blur md:flex">
        {quickLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500 transition hover:bg-indigo-50"
          >
            {link.label.charAt(0)}
          </a>
        ))}
      </aside>
    </main>
  );
}
