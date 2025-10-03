import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import NavAdmin from '@/components/NavAdmin';
import { getServerClient } from '@/lib/supabaseServer';
import type { Database } from '@/types/db';

type AdminProfile = Pick<Database['public']['Tables']['profiles']['Row'], 'is_admin' | 'role'>;

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  const supabase = getServerClient();

    data: { user },
  } = await supabase.auth.getUser();

   if (!user) {
    redirect('/login');
  }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('is_admin, role')
    .eq('user_id', user.id)
    .maybeSingle<AdminProfile>();

  const profile = profileData ?? null;
  const isAdmin = Boolean(profile && (profile.is_admin === true || profile.role === 'admin'));

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