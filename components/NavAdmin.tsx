'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LogoutButton from '@/components/LogoutButton';

type NavAdminProps = {
  supabaseUrl: string;
  supabaseAnon: string;
  hasUrl: boolean;
  hasAnon: boolean;
};

const adminNavItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Pengguna' },
  { href: '/admin/payments', label: 'Pembayaran' },
  { href: '/admin/themes', label: 'Tema' },
  { href: '/admin/settings', label: 'Setting' },
];

const isActive = (currentPath: string, target: string) =>
  currentPath === target || currentPath.startsWith(`${target}/`);

export default function NavAdmin({ supabaseUrl, supabaseAnon, hasUrl, hasAnon }: NavAdminProps) {
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
        <LogoutButton
          supabaseUrl={supabaseUrl}
          supabaseAnon={supabaseAnon}
          hasUrl={hasUrl}
          hasAnon={hasAnon}
        />
      </div>
    </header>
  );
}