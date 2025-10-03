import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdminClient();

  const [totalUsersResult, totalInvitationsResult, pendingPaymentsResult] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('invitations').select('id', { count: 'exact', head: true }),
    supabase.from('payments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  const totalUsers =
    totalUsersResult.error || typeof totalUsersResult.count !== 'number'
      ? '—'
      : totalUsersResult.count.toString();

  const totalInvitations =
    totalInvitationsResult.error || typeof totalInvitationsResult.count !== 'number'
      ? '—'
      : totalInvitationsResult.count.toString();

  const pendingPayments =
    pendingPaymentsResult.error || typeof pendingPaymentsResult.count !== 'number'
      ? '—'
      : pendingPaymentsResult.count.toString();

  const cards = [
    {
      title: 'Total Pengguna',
      value: totalUsers,
      description: 'Jumlah akun yang terdaftar di platform.',
    },
    {
      title: 'Total Undangan',
      value: totalInvitations,
      description: 'Total undangan yang dibuat oleh seluruh pengguna.',
    },
    {
      title: 'Pembayaran Pending',
      value: pendingPayments,
      description: 'Transaksi yang masih menunggu konfirmasi.',
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ringkasan aktivitas dan metrik utama platform undangan digital Anda.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl bg-white p-6 shadow-xl">
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="mt-4 text-3xl font-semibold text-gray-900">{card.value}</p>
            <p className="mt-2 text-xs text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}