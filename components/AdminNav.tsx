'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/pengguna', label: 'Pengguna' },
  { href: '/admin/pembayaran', label: 'Pembayaran' },
  { href: '/admin/thema', label: 'Tema' },
  { href: '/admin/setting', label: 'Setting' },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <div className="flex gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm px-2 py-1 rounded-md ${pathname === l.href ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}
