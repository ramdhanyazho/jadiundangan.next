import Link from 'next/link';

const stats = [
  { value: '25+', label: 'Tema Premium Siap Pakai' },
  { value: '120K+', label: 'RSVP & Ucapan Masuk' },
  { value: '2.5M+', label: 'Tamu Undangan Terlayani' },
];

const features = [
  {
    title: 'Tema Modern & Elegan',
    description:
      'Koleksi tema interaktif dengan komposisi warna premium, tipografi rapi, dan layout responsif yang mengikuti gaya undangan kekinian.',
    icon: '🎨',
  },
  {
    title: 'RSVP Real-time',
    description:
      'Pantau kehadiran tamu lewat dashboard dengan update otomatis. Setiap RSVP langsung masuk ke database Supabase tanpa delay.',
    icon: '📬',
  },
  {
    title: 'Buku Tamu & Ucapan',
    description:
      'Kumpulkan ucapan dan doa tamu dengan tampilan yang bisa dikurasi. Admin dapat menyembunyikan, menyorot, atau membalas ucapan tertentu.',
    icon: '💌',
  },
  {
    title: 'Siaran WhatsApp',
    description:
      'Ekspor daftar tamu ke format CSV/Excel untuk dikirim via WhatsApp blast. Sertakan nama tamu secara personal dalam satu klik.',
    icon: '📱',
  },
  {
    title: 'Audio & Video Streaming',
    description:
      'Sematkan video prewedding dari YouTube atau file audio favorit secara legal dengan kontrol auto-play yang ramah perangkat.',
    icon: '🎵',
  },
  {
    title: 'Custom Domain & SSL',
    description:
      'Gunakan domain .com/.id dengan sertifikat SSL otomatis sehingga undangan tampil profesional dan aman di semua browser.',
    icon: '🔒',
  },
];

const steps = [
  {
    title: 'Pilih Tema Favorit',
    description: 'Jelajahi katalog tema foto dan video. Setiap tema dilengkapi demo sehingga kamu dapat melihat interaksi lengkap.',
  },
  {
    title: 'Lengkapi Detail Acara',
    description: 'Masukkan informasi acara akad & resepsi, koordinat maps, susunan keluarga, serta jadwal live streaming secara terstruktur.',
  },
  {
    title: 'Bagikan & Pantau RSVP',
    description: 'Sebarkan link undangan via WhatsApp, Instagram, atau email. Pantau statistik kunjungan dan kehadiran dari satu dashboard.',
  },
];

const themes = [
  {
    name: 'Jawabiru',
    accent: 'from-brand/80 via-sky-200 to-white',
    description: 'Tema klasik dengan pattern batik modern dan sentuhan aksen emas yang hangat.',
    href: '/undangan/contoh-rahmat-nisa',
  },
  {
    name: 'Minimal Bloom',
    accent: 'from-pink-200 via-white to-slate-100',
    description: 'Tampilan minimalis yang fokus pada tipografi elegan dan foto portrait.',
    href: '/undangan/contoh-rahmat-nisa',
  },
  {
    name: 'Forest Emerald',
    accent: 'from-brand-emerald/80 via-emerald-200 to-white',
    description: 'Nuansa natural dengan ilustrasi daun watercolor untuk konsep intimate wedding.',
    href: '/undangan/contoh-rahmat-nisa',
  },
];

const videoThemes = [
  {
    name: 'Cinematic Highlight',
    description:
      'Template video berdurasi 60 detik dengan transisi sinematik dan slot audio bebas untuk voice over.',
  },
  {
    name: 'Story Timeline',
    description:
      'Gabungan teks dan foto perjalanan cinta yang dirangkai dalam format vertical video siap unggah ke Instagram Reels.',
  },
  {
    name: 'Live Countdown',
    description:
      'Hitung mundur ke hari-H lengkap dengan latar animasi dan QR RSVP untuk memudahkan tamu mengkonfirmasi kehadiran.',
  },
];

const pricingPerks = [
  'Trial 7 hari penuh akses dashboard dan tema premium.',
  'Undangan aktif hingga 1 tahun dengan opsi perpanjangan.',
  'Backup data RSVP & buku tamu otomatis ke Supabase.',
  'Panduan onboarding & dukungan teknis via WhatsApp setiap hari.',
];

export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="container-wide flex items-center justify-between py-3">
          <Link href="/" className="font-bold text-xl text-brand">
            JadiUndangan
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#beranda" className="hover:text-brand">Beranda</a>
            <a href="#fitur" className="hover:text-brand">Fitur</a>
            <a href="#tema" className="hover:text-brand">Web Undangan</a>
            <a href="#video" className="hover:text-brand">Video Undangan</a>
            <a href="#harga" className="hover:text-brand">Harga</a>
            <a href="#kontak" className="hover:text-brand">Kontak</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/client"
              className="hidden rounded-full border border-brand/50 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5 md:inline-flex"
            >
              Login Akun
            </Link>
            <Link
              href="/client/register"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      </header>

      <section id="beranda" className="section relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,53,107,0.08),_transparent_60%)]" />
        <div className="container-narrow text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1 text-sm font-medium text-brand">
            💍 Undangan Digital Premium
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Buat Undangan Pernikahan Digital yang <span className="text-brand">Mewah</span> dan <span className="text-brand">Praktis</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 md:text-xl">
            Platform Next.js + Supabase untuk membuat web undangan interaktif, lengkap dengan RSVP real-time, buku tamu, dan katalog tema profesional.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/client/register"
              className="rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-xl shadow-brand/30 transition hover:bg-brand/90"
            >
              Buat Undangan Sekarang
            </Link>
            <Link
              href="/undangan/contoh-rahmat-nisa"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition hover:border-brand hover:text-brand"
            >
              Lihat Demo Tema
            </Link>
          </div>
          <dl className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="card text-left">
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand/70">{item.label}</dt>
                <dd className="mt-2 text-3xl font-bold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="fitur" className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Fitur Unggulan JadiUndangan</h2>
            <p className="mt-3 text-base text-slate-600">
              Adaptasi dari platform jadiundangan.my.id dengan tampilan modern. Semua fitur inti kami hadirkan untuk mempermudah kamu mengelola undangan digital secara end-to-end.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-2xl">
                  <span>{feature.icon}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container-wide grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="card relative h-full overflow-hidden">
              <span className="absolute -top-4 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white shadow-lg shadow-brand/30">
                {index + 1}
              </span>
              <h3 className="mt-8 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tema" className="section">
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Katalog Web Undangan</h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Pilih tema favoritmu dan personalisasikan dengan foto, cerita perjalanan, hingga jadwal acara. Semua tema responsif dan siap dipakai di perangkat mobile.
              </p>
            </div>
            <Link
              href="/undangan/contoh-rahmat-nisa"
              className="self-start rounded-full border border-brand/40 px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
            >
              Lihat Semua Tema
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {themes.map((theme) => (
              <div key={theme.name} className="card overflow-hidden">
                <div className={`h-40 rounded-2xl bg-gradient-to-br ${theme.accent}`} />
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-slate-900">{theme.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{theme.description}</p>
                  <Link href={theme.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                    Preview Tema
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="section-muted">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Paket Video Undangan</h2>
            <p className="mt-3 text-base text-slate-600">
              Adaptasi dari katalog video jadiundangan.my.id dengan format cinematic, timeline story, hingga countdown live event.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {videoThemes.map((video) => (
              <div key={video.name} className="card h-full">
                <h3 className="text-xl font-semibold text-slate-900">{video.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="harga" className="section-dark">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Paket Harga Transparan</h2>
          <p className="mt-4 text-base text-slate-100/80">
            Dapatkan semua fitur premium dengan biaya terjangkau. Kamu bebas upgrade ke custom domain kapan saja tanpa biaya tersembunyi.
          </p>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-gold">PAKET PENUH</p>
            <p className="mt-4 text-5xl font-black text-white">Rp349.000</p>
            <p className="mt-2 text-sm text-slate-100/80">Aktif 12 bulan • Support prioritas • Update tema gratis</p>
            <ul className="mt-6 space-y-3 text-left text-sm leading-relaxed text-slate-100">
              {pricingPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">✓</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/client/register"
                className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-brand-gold/40 transition hover:bg-brand-gold/90"
              >
                Ambil Paket Ini
              </Link>
              <Link
                href="/client"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Masuk Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="kontak" className="section">
        <div className="container-wide grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Siap Membuat Undangan Versi Kamu?</h2>
            <p className="mt-4 text-base text-slate-600">
              Tim support kami siap membantu proses migrasi dari jadiundangan.my.id maupun pembuatan baru. Dapatkan panduan onboarding, template pesan WhatsApp, dan tips penyebaran.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand/90"
              >
                Hubungi via WhatsApp
              </a>
              <Link
                href="mailto:halo@jadiundangan.id"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand hover:text-brand"
              >
                Kirim Email
              </Link>
            </div>
          </div>
          <div className="card bg-white/90">
            <h3 className="text-lg font-semibold text-slate-900">Kenapa memilih JadiUndangan?</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>• Infrastruktur modern (Next.js 14 + Supabase) dengan performa tinggi.</li>
              <li>• Tampilan adaptif yang mengikuti inspirasi jadiundangan.my.id namun lebih ringan.</li>
              <li>• Modul admin untuk mengatur tamu, RSVP, dan statistik kunjungan secara detail.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} JadiUndangan. Dibuat ulang dengan Next.js 14, TailwindCSS, dan Supabase.
      </footer>
    </main>
  );
}