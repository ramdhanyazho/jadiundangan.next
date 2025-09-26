import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import NavAdmin from '@/components/NavAdmin';
import RoleCookieSync from '@/components/RoleCookieSync';
import { getSessionAndProfile } from '@/lib/auth/getSessionAndProfile';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { session, profile } = await getSessionAndProfile();

  if (!session) {
    redirect('/login');
  }

  if (!profile?.is_admin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <RoleCookieSync isAdmin={false} />
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold text-gray-900">403</h1>
          <p className="mt-4 text-base text-gray-600">Anda tidak memiliki akses ke halaman admin.</p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-xl bg-[#0E356B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e4ea1]"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <RoleCookieSync isAdmin />
      <NavAdmin />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}