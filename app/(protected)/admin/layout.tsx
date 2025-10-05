export const dynamic = 'force-dynamic';

import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getServerClient } from '@/lib/supabaseServer';
import AdminNav from '@/components/AdminNav';

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin');

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .maybeSingle<{ is_admin: boolean | null }>();

  const isAdmin = profile ? profile.is_admin === true : false;
  if (error || !isAdmin) redirect('/client');

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
