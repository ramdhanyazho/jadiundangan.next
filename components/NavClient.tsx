'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const clientNavItems = [
  { href: '/client', label: 'Dashboard' },
  { href: '/client/website', label: 'Pengaturan Website' },
  { href: '/client/guests', label: 'Buku Tamu' },
  { href: '/client/metrics', label: 'Riwayat Pengunjung' },
  { href: '/client/testimonials', label: 'Testimoni' },
  { href: '/client/support', label: 'Hubungi Kami' },
];

const isActive = (currentPath: string, target: string) =>
  currentPath === target || currentPath.startsWith(`${target}/`);

export default function NavClient() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-600">
      {clientNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-lg px-3 py-1.5 transition ${
            isActive(pathname, item.href)
              ? 'bg-[#0E356B] text-white'
              : 'hover:bg-[#0E356B]/10 hover:text-[#0E356B]'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}