'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LogoutButton from '@/components/LogoutButton';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/pengguna', label: 'Pengguna' },
  { href: '/admin/pembayaran', label: 'Pembayaran' },
  { href: '/admin/thema', label: 'Tema' },
  { href: '/admin/setting', label: 'Setting' },
];

const isActive = (currentPath: string, target: string) =>
  currentPath === target || currentPath.startsWith(`${target}/`);

export default function NavAdmin() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                isActive(pathname, item.href) ? 'text-[#0E356B]' : 'hover:text-[#0E356B]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </div>
    </header>
  );
}
