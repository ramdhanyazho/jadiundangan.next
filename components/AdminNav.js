import Link from 'next/link';
export default function AdminNav(){
  const items = [['/admin', 'Dashboard'], ['/admin/users', 'Pengguna'], ['/admin/payments', 'Pembayaran'], ['/admin/themes', 'Tema'], ['/admin/settings', 'Setting']];
  return (<nav className="sticky top-0 bg-white/80 backdrop-blur z-20 border-b"><div className="container-narrow py-3 flex gap-3 flex-wrap">{items.map(([href, label]) => (<Link key={href} href={href} className="px-3 py-1.5 rounded-lg hover:bg-gray-100">{label}</Link>))}</div></nav>);
}
