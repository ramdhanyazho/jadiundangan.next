'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/client', label: 'Dashboard' },
  { href: '/client/settings', label: 'Pengaturan Website' },
  { href: '/client/guests', label: 'Buku Tamu' },
  { href: '/client/visitors', label: 'Riwayat Pengunjung' },
  { href: '/client/testimonials', label: 'Testimoni' },
  { href: '/client/contact', label: 'Hubungi Kami' },
];

export default function ClientNav() {
  const p = usePathname();

  if (p === '/client/login' || p === '/client/register') {
    return null;
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap gap-4 py-3 text-sm">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`px-3 py-1.5 rounded ${
                  p === it.href ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
                }`}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
