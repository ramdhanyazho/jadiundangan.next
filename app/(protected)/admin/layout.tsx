import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getPublicSupabaseEnv } from '@/lib/publicEnv';
import { getServerClient } from '@/lib/supabaseServer';
import type { Database } from '@/types/db';
import NavAdmin from '@/components/NavAdmin';

type AdminProfile = Pick<Database['public']['Tables']['profiles']['Row'], 'is_admin' | 'role'>;

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  try {
    const supabase = getServerClient();
    const {
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

    const env = getPublicSupabaseEnv();

    return (
      <div className="min-h-screen bg-slate-50">
        <NavAdmin
          supabaseUrl={env.url}
          supabaseAnon={env.anon}
          hasUrl={env.hasUrl}
          hasAnon={env.hasAnon}
        />
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Konfigurasi Supabase belum lengkap.';

    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-3xl px-6 py-20 text-sm text-slate-600">
          <h1 className="text-2xl font-semibold text-slate-900">Area Admin</h1>
          <p className="mt-4">
            Tidak dapat memuat navigasi atau konten admin karena konfigurasi Supabase belum tersedia.
          </p>
          <p className="mt-2 font-medium text-rose-600">{message}</p>
          <p className="mt-2">Tambahkan kredensial Supabase untuk melanjutkan.</p>
        </main>
      </div>
    );
  }
}