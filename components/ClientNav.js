import Link from 'next/link';
export default function ClientNav(){
  const items = [
    ['/', '← Beranda'],
    ['/client', 'Dashboard'],
    ['/client/website', 'Pengaturan Website'],
    ['/client/guests', 'Buku Tamu'],
    ['/client/metrics', 'Riwayat Pengunjung'],
    ['/client/testimonials', 'Testimoni'],
    ['/client/support', 'Hubungi Kami'],
  ];
  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur z-20 border-b">
      <div className="container-narrow py-3 flex gap-3 flex-wrap">
        {items.map(([href, label]) => (
          <Link key={href} href={href} className="px-3 py-1.5 rounded-lg hover:bg-gray-100">{label}</Link>
        ))}
      </div>
    </nav>
  );
}
