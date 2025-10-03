import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import LogoutButton from '@/components/LogoutButton';
import NavClient from '@/components/NavClient';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

interface ClientLayoutProps {
  children: ReactNode;
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const supabase = getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
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
}