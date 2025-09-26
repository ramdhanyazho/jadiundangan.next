import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import NavAdmin from '@/components/NavAdmin';
import { getServerClient } from '@/lib/supabaseServer';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = cookies();
  const supabase = getServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('is_admin, role')
    .eq('user_id', session.user.id)
    .maybeSingle();

  const profile = rawProfile as { is_admin?: boolean | null; role?: string | null } | null;

  const isAdmin = profile
    ? profile.is_admin === true || profile.role === 'admin'
    : false;

  if (!isAdmin) {
    redirect('/client');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavAdmin />
      <main className="px-6 py-10 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}