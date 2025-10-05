export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

import { getServerClient } from '@/lib/supabaseServer';

export default async function AdminDashboardPage() {
  const supabase = getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .maybeSingle<{ is_admin: boolean | null }>();

  if (!profile?.is_admin) {
    redirect('/client');
  }

  const [{ count: users }, { data: paid }, { data: unpaid }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('payments').select('id', { count: 'exact' }).eq('status', 'paid'),
    supabase.from('payments').select('id', { count: 'exact' }).eq('status', 'unpaid'),
  ]);

  const paidCount = paid?.length ?? 0;
  const unpaidCount = unpaid?.length ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card title="Pengguna" value={users ?? 0} />
      <Card title="Pembayaran Lunas" value={paidCount} />
      <Card title="Pembayaran Belum" value={unpaidCount} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm opacity-70">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
