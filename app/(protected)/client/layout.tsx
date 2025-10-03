import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import LogoutButton from '@/components/LogoutButton';
import NavClient from '@/components/NavClient';
import { getPublicSupabaseEnv } from '@/lib/publicEnv';
import { getServerClient } from '@/lib/supabaseServer';

type Props = { children: ReactNode };

export default async function ClientLayout({ children }: Props) {
  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const env = getPublicSupabaseEnv();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavClient />
          <LogoutButton
            supabaseUrl={env.url}
            supabaseAnon={env.anon}
            hasUrl={env.hasUrl}
            hasAnon={env.hasAnon}
          />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}