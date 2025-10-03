// app/(protected)/admin/layout.tsx
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerClient } from '@/lib/supabaseServer';
// Ganti sesuai nama file sebenarnya:
import AdminNav from '@/components/AdminNav';

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  const supabase = getServerClient();

  // 1) Wajib login
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2) Ambil profile HANYA kolom yang ada
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .maybeSingle<{ is_admin: boolean | null }>();

  // Kalau query error, anggap bukan admin
  const isAdmin = profile?.is_admin ?? false;
  if (error || !isAdmin) redirect('/client');

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
