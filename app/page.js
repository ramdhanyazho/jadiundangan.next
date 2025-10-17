import Link from 'next/link';

import Brand from '@/components/Brand';
import ThemeDemoLauncher from '@/components/ThemeDemoLauncher';

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#tema', label: 'Web Undangan' },
  { href: '#video', label: 'Video Undangan' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#kontak', label: 'Kontak' },
];

const stats = [
  { value: '25+', label: 'Tema Premium Siap Pakai' },
  { value: '120K+', label: 'RSVP & Ucapan Masuk' },
  { value: '2.5M+', label: 'Tamu Undangan Terlayani' },
];

const heroHighlights = [
  'Tampilan profesional dengan animasi lembut dan responsif di setiap perangkat.',
  'Integrasi RSVP real-time, buku tamu, dan statistik undangan dalam satu dashboard.',
  'Tim support siap membantu mulai dari pemilihan tema hingga publikasi undangan.',
];

const serviceHighlights = [
  {
    title: 'Undangan Interaktif',
    description:
      'Template web undangan yang kaya fitur dengan galeri foto, peta lokasi, countdown, dan ucapan digital.',
    icon: '💍',
  },
  {
    title: 'Desain Siap Pakai',
    description:
      'Pilih dari koleksi tema premium dan sesuaikan warna, font, serta konten tanpa perlu skill teknis.',
    icon: '🎨',
  },
  {
    title: 'Broadcast Mudah',
    description:
      'Ekspor daftar tamu untuk dikirim via WhatsApp blast lengkap dengan personalisasi nama tamu.',
    icon: '📬',
  },
  {
    title: 'Video Highlight',
    description:
      'Produksi video undangan berdurasi 60 detik dengan transisi sinematik siap dibagikan ke media sosial.',
    icon: '🎥',
  },
  {
    title: 'Custom Domain',
    description:
      'Gunakan domain .com atau .id dengan SSL otomatis untuk tampilan profesional dan aman.',
    icon: '🌐',
  },
  {
    title: 'Analitik Lengkap',
    description:
      'Pantau statistik kunjungan, RSVP, dan engagement tamu dari dashboard kapan pun dibutuhkan.',
    icon: '📊',
  },
];

const differentiators = [
  {
    title: 'Kualitas Premium',
    description:
      'Desain terinspirasi dari jadiundangan.my.id dan disempurnakan dengan standar visual terbaru.',
  },
  {
    title: 'Teknologi Modern',
    description:
      'Next.js 14, TailwindCSS, dan Supabase memastikan pengalaman cepat, aman, dan mudah dikembangkan.',
  },
  {
    title: 'Support Personal',
    description:
      'Team sukses pelanggan siap membantu setup konten, optimasi pesan siaran, hingga troubleshooting.',
  },
];

const steps = [
  {
    title: 'Pilih Tema Favorit',
    description:
      'Jelajahi katalog tema foto dan video. Setiap tema dilengkapi demo interaktif agar kamu dapat melihat detailnya.',
  },
  {
    title: 'Lengkapi Detail Acara',
    description:
      'Masukkan informasi akad & resepsi, koordinat maps, susunan keluarga, dan jadwal live streaming secara sistematis.',
  },
  {
    title: 'Bagikan & Pantau RSVP',
    description:
      'Sebarkan link undangan via WhatsApp atau media sosial, lalu pantau statistik kunjungan secara real-time.',
  },
];

const themes = [
  {
    name: 'Jawabiru',
    accent: 'from-brand/80 via-sky-200 to-white',
    description: 'Tema klasik dengan pattern batik modern dan sentuhan aksen emas yang hangat.',
    href: '/themes/jawabiru/preview',
  },
  {
    name: 'Minimal Bloom',
    accent: 'from-pink-200 via-white to-slate-100',
    description: 'Tampilan minimalis yang fokus pada tipografi elegan dan foto portrait.',
    href: '/themes/minimal/preview',
  },
  {
    name: 'Forest Emerald',
    accent: 'from-brand-emerald/80 via-emerald-200 to-white',
    description: 'Nuansa natural dengan ilustrasi daun watercolor untuk konsep intimate wedding.',
    href: '/themes/forest/preview',
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
      'Gabungan teks dan foto perjalanan cinta yang dirangkai dalam format vertical video siap unggah ke Instagram.',
  },
  {
    name: 'Live Countdown',
    description:
      'Hitung mundur ke hari-H lengkap dengan latar animasi dan QR RSVP untuk memudahkan tamu mengkonfirmasi kehadiran.',
  },
];

const testimonials = [
  {
    name: 'Rahma & Andi',
    role: 'Pengguna Paket Premium',
    quote:
      'Kami bisa mengelola RSVP dengan mudah dan tamu merasa undangannya eksklusif. Tim supportnya responsif sekali!',
  },
  {
    name: 'Maya',
    role: 'Wedding Organizer',
    quote:
      'Tema-tema JadiUndangan fleksibel untuk dikustomisasi sesuai kebutuhan klien saya. Dashboardnya lengkap.',
  },
  {
    name: 'Lia & Fajar',
    role: 'Pasangan Pengguna Video Highlight',
    quote:
      'Video undangannya sinematik dan langsung siap unggah ke Instagram. Semua prosesnya terasa profesional.',
  },
];

const blogPosts = [
  {
    title: 'Checklist Digital Wedding Invitation',
    excerpt: 'Panduan menyiapkan konten undangan digital mulai dari foto hingga penulisan sapaan tamu.',
    href: '#',
  },
  {
    title: 'Cara Maksimalkan RSVP Online',
    excerpt: 'Strategi mengirim broadcast WhatsApp yang personal dan ramah tamu sehingga konfirmasi lebih cepat.',
    href: '#',
  },
  {
    title: 'Inspirasi Tema Wedding 2024',
    excerpt: 'Palet warna dan tren dekorasi yang sedang populer untuk mempercantik undangan digital kamu.',
    href: '#',
  },
];

const pricingPerks = [
  'Trial 7 hari penuh akses dashboard dan tema premium.',
  'Undangan aktif hingga 1 tahun dengan opsi perpanjangan.',
  'Backup data RSVP & buku tamu otomatis ke Supabase.',
  'Panduan onboarding & dukungan teknis via WhatsApp setiap hari.',
];

const contactChannels = [
  {
    title: 'Customer Success',
    value: 'halo@jadiundangan.id',
    href: 'mailto:halo@jadiundangan.id',
  },
  {
    title: 'WhatsApp Support',
    value: '+62 812-3456-7890',
    href: 'https://wa.me/6281234567890',
  },
  {
    title: 'Instagram',
    value: '@jadiundangan.id',
    href: 'https://instagram.com/jadiundangan.id',
  },
];

const heroDemoThemes = [
  {
    name: 'Ulems Classic Emerald',
    accent: 'from-brand via-brand/30 to-slate-100',
    description: 'Perpaduan hijau emerald dan emas lembut dengan nuansa islami modern.',
    href: '/themes/ulems/preview',
    badge: 'Premium',
  },
  {
    name: 'Jawabiru Elegan',
    accent: 'from-sky-400/60 via-sky-200 to-white',
    description: 'Motif batik biru dengan tipografi serif yang klasik dan hangat.',
    href: '/themes/jawabiru/preview',
    badge: 'Tradisional',
  },
  {
    name: 'Minimal Bloom',
    accent: 'from-rose-200 via-white to-slate-100',
    description: 'Tema minimalis bertabur ilustrasi floral pastel yang menenangkan.',
    href: '/themes/minimal/preview',
    badge: 'Modern',
  },
  {
    name: 'Forest Emerald',
    accent: 'from-emerald-400/60 via-emerald-200 to-white',
    description: 'Nuansa forest green dengan aksen watercolor untuk acara outdoor.',
    href: '/themes/forest/preview',
    badge: 'Outdoor',
  },
  {
    name: 'Cinematic Highlight',
    accent: 'from-slate-900/80 via-slate-700/50 to-slate-200',
    description: 'Tata letak hero fullscreen dengan fokus video cinematic dan countdown.',
    href: '/themes/cinematic/preview',
    badge: 'Video',
  },
  {
    name: 'Indigo Classic',
    accent: 'from-indigo-500/60 via-indigo-200 to-white',
    description: 'Skema warna indigo mewah dengan elemen ornamen klasik kekinian.',
    href: '/themes/indigo/preview',
    badge: 'Elegan',
  },
];

export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-slate-900/95 text-xs text-white">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-2">
          <p className="font-medium">Undangan Digital Premium • Gratis trial 7 hari</p>
          <div className="flex items-center gap-4">
            <a href="mailto:halo@jadiundangan.id" className="flex items-center gap-1 text-white/80 hover:text-white">
              <span aria-hidden>✉️</span> halo@jadiundangan.id
            </a>
            <a href="https://wa.me/6281234567890" className="flex items-center gap-1 text-white/80 hover:text-white">
              <span aria-hidden>💬</span> +62 812-3456-7890
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="container-wide flex items-center justify-between py-3">
          <Brand />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/client/login"
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

      <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,53,107,0.08),_transparent_60%)]" />
        <div className="container-wide grid gap-12 py-24 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1 text-sm font-medium text-brand">
              💼 Solusi Digital Wedding Invitation
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Hadirkan Undangan Digital <span className="text-brand">Elegan</span> dengan Sentuhan Profesional
            </h1>
            <p className="mt-5 text-lg text-slate-600 md:text-xl">
              Platform Next.js + Supabase untuk menciptakan undangan digital interaktif lengkap dengan katalog tema, RSVP real-time, dan analitik tamu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/client/register"
                className="rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-xl shadow-brand/30 transition hover:bg-brand/90"
              >
                Buat Undangan Sekarang
              </Link>
              <ThemeDemoLauncher
                themes={heroDemoThemes}
                buttonClassName="rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition hover:border-brand hover:text-brand"
              />
            </div>
            <ul className="mt-10 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 shadow-sm">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-brand/70">{item.label}</dt>
                  <dd className="mt-2 text-3xl font-bold text-slate-900">{item.value}</dd>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-16 right-12 h-32 w-32 rounded-full bg-brand/20 blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-gradient-to-br from-brand via-brand/40 to-white p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">Dashboard Tamu</p>
                <p className="mt-3 text-3xl font-semibold">RSVP Update Real-time</p>
                <p className="mt-4 text-sm text-white/80">
                  Pantau jumlah tamu, status kehadiran, serta ucapan secara langsung melalui integrasi Supabase.
                </p>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Total RSVP</span>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">152</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-500">Hadir</span>
                  <span className="font-semibold text-slate-900">126</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-500">Tidak Hadir</span>
                  <span className="font-semibold text-slate-900">18</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-500">Belum Respon</span>
                  <span className="font-semibold text-slate-900">8</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Layanan Unggulan JadiUndangan</h2>
            <p className="mt-3 text-base text-slate-600">
              Solusi lengkap untuk mempersiapkan undangan pernikahan digital yang elegan dan mudah dibagikan ke seluruh tamu.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceHighlights.map((feature) => (
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
        <div className="container-wide grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Tentang Kami</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Transformasi Undangan Jadi Lebih Personal dan Modern</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              JadiUndangan menghadirkan pengalaman visual premium dengan struktur informasi lengkap. Setiap proyek kami disertai panduan konten serta dukungan teknis sehingga undangan dapat segera dibagikan tanpa kendala.
            </p>
            <div className="mt-6 space-y-4">
              {differentiators.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                    ★
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/client/register"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand/90"
              >
                Jadwalkan Demo
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand hover:text-brand"
              >
                Lihat Studi Kasus
              </Link>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-brand/20 bg-white p-6 shadow-lg shadow-brand/10">
              <p className="text-4xl font-black text-brand">98%</p>
              <p className="mt-2 text-sm text-slate-600">Pengguna puas dengan tampilan undangan dan kemudahan pengelolaan tamu.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
              <p className="text-4xl font-black text-slate-900">4.9/5</p>
              <p className="mt-2 text-sm text-slate-600">Skor rata-rata ulasan berdasarkan 150+ pasangan dan wedding organizer.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100 md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Dipercaya oleh</p>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-base font-semibold text-slate-400">
                <span>WeddingKey</span>
                <span>CintaPlanner</span>
                <span>Selaras Event</span>
                <span>StudioLensa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Alur Kerja yang Sederhana</h2>
            <p className="mt-3 text-base text-slate-600">
              Kamu dapat menyelesaikan undangan digital hanya dalam tiga langkah cepat. Seluruh proses dilengkapi template konten dan panduan.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
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
        </div>
      </section>

      <section id="tema" className="section-muted">
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Katalog Web Undangan</h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Pilih tema favoritmu dan personalisasikan dengan foto, cerita perjalanan, hingga jadwal acara. Semua tema responsif dan siap dipakai di perangkat mobile.
              </p>
            </div>
            <ThemeDemoLauncher
              themes={heroDemoThemes}
              label="Lihat Semua Tema"
              buttonClassName="self-start rounded-full border border-brand/40 px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
            />
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

      <section id="video" className="section">
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

      <section className="section-dark">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-white">Paket Harga Transparan</h2>
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

      <section id="testimoni" className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Apa Kata Pengguna Kami</h2>
            <p className="mt-3 text-base text-slate-600">
              Testimoni dari pasangan dan wedding organizer yang telah mempercayakan undangan digitalnya kepada JadiUndangan.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="card h-full">
                <blockquote className="text-sm text-slate-600">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-muted">
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

      <section className="section">
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Insight &amp; Artikel Terbaru</h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Dapatkan tips dan inspirasi untuk memaksimalkan pengalaman undangan digitalmu.
              </p>
            </div>
            <Link
              href="/blog"
              className="self-start rounded-full border border-brand/40 px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
            >
              Baca Semua Artikel
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.title} className="card h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand/70">Blog</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
                <Link href={post.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                  Baca Selengkapnya
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="section-muted">
        <div className="container-wide grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Hubungi Tim JadiUndangan</h2>
            <p className="mt-4 text-base text-slate-600">
              Sampaikan kebutuhanmu dan tim kami akan menghubungi dalam 1x24 jam untuk membantu proses pembuatan undangan digital.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {contactChannels.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm transition hover:border-brand hover:text-brand"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">{channel.title}</p>
                  <p className="mt-2 text-base font-semibold">{channel.value}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="card bg-white/90">
            <h3 className="text-lg font-semibold text-slate-900">Butuh Demo Langsung?</h3>
            <p className="mt-3 text-sm text-slate-600">
              Kami siap melakukan tur singkat dashboard melalui Google Meet atau Zoom. Pilih jadwal yang sesuai dan dapatkan rekomendasi tema terbaik.
            </p>
            <Link
              href="/client/register"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand/90"
            >
              Booking Jadwal Demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container-wide grid gap-8 md:grid-cols-[1.3fr_repeat(2,_minmax(0,_1fr))]">
          <div>
            <Brand />
            <p className="mt-4 text-sm text-slate-600">
              JadiUndangan adalah platform undangan digital modern yang memadukan tampilan elegan, fitur lengkap, dan dukungan teknis profesional untuk setiap momen istimewa.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand/70">Navigasi</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-brand">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand/70">Tetap Terhubung</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Instagram: @jadiundangan.id</li>
              <li>WhatsApp: +62 812-3456-7890</li>
              <li>Email: halo@jadiundangan.id</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} JadiUndangan. Dibuat ulang dengan Next.js 14, TailwindCSS, dan Supabase.
        </p>
      </footer>
    </main>
  );
}
