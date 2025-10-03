import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import NavAdmin from '@/components/NavAdmin';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, role')
    .eq('user_id', session.user.id)
    .maybeSingle();

  const isAdmin = profile?.is_admin === true || profile?.role === 'admin';

  if (!isAdmin) {
    redirect('/client');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavAdmin />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}