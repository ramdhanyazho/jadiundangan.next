'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/pengguna', label: 'Pengguna' },
  { href: '/admin/pembayaran', label: 'Pembayaran' },
  { href: '/admin/thema', label: 'Tema' },
  { href: '/admin/setting', label: 'Setting' },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex gap-4">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-2 py-1 text-sm ${isActive ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}
