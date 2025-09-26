import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="container-narrow flex items-center justify-between py-3">
          <div className="font-bold">JadiUndangan</div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#fitur" className="hover:opacity-80">Fitur Unggulan</a>
            <a href="#web-undangan" className="hover:opacity-80">Web Undangan</a>
          </nav>
          <Link href="/client" className="px-4 py-2 rounded-lg bg-brand text-white">Login</Link>
        </div>
      </header>
      <section className="min-h-[60vh] flex items-center">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Buat Undangan Digital <span className="text-brand">Stylish</span> & <span className="text-brand">Cepat</span>
          </h1>
          <p className="mt-4 text-lg opacity-80">Next.js + TailwindCSS + Supabase. Slug modern, tema modular, RSVP realtime.</p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/undangan/contoh-rahmat-nisa" className="px-6 py-3 rounded-xl bg-brand text-white shadow-lg hover:opacity-90">Lihat Contoh</Link>
            <a href="#fitur" className="px-6 py-3 rounded-xl bg-white shadow-lg border hover:bg-gray-50">Lihat Fitur</a>
          </div>
        </div>
      </section>
      <section id="fitur" className="section">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card">Tema Stylish</div>
            <div className="card">RSVP & Buku Tamu</div>
            <div className="card">Custom Domain</div>
          </div>
        </div>
      </section>
      <section id="web-undangan" className="section">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Web Undangan</h2>
          <div className="card">
            <p className="opacity-80">Buat undanganmu sekarang. Login untuk mulai mengatur.</p>
            <Link href="/client" className="mt-3 inline-block text-brand underline">Masuk Dashboard</Link>
          </div>
        </div>
      </section>
      <footer className="py-8 text-center text-sm opacity-70">© {new Date().getFullYear()} JadiUndangan — Dibuat dengan Next.js & TailwindCSS</footer>
    </main>
  );
}
