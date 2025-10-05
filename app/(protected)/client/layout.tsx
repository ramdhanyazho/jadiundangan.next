import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import LogoutButton from '@/components/LogoutButton';
import NavClient from '@/components/NavClient';
import { getServerClient } from '@/lib/supabaseServer';

type Props = { children: ReactNode };

export default async function ClientLayout({ children }: Props) {
  try {
    const supabase = getServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/client/login');
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <NavClient />
            <LogoutButton />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Konfigurasi Supabase belum lengkap.';

    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-3xl px-6 py-20 text-sm text-slate-600">
          <h1 className="text-2xl font-semibold text-slate-900">Area Client</h1>
          <p className="mt-4">Navigasi client sementara tidak tersedia.</p>
          <p className="mt-2 font-medium text-rose-600">{message}</p>
          <p className="mt-2">Lengkapi konfigurasi Supabase untuk mengakses dashboard client.</p>
        </main>
      </div>
    );
  }
}
