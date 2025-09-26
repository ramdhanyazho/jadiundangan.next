import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerClient } from '@/lib/supabaseServer';

const formatValue = (value: number | null) => (value !== null && value !== undefined ? value.toString() : '—');

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const supabase = getServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const countProfilesPromise = supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true });
  const countInvitationsPromise = supabase
    .from('invitations')
    .select('id', { count: 'exact', head: true });
  const countPendingPaymentsPromise = supabase
    .from('payments')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending');

  const [profilesResponse, invitationsResponse, paymentsResponse] = await Promise.all([
    countProfilesPromise,
    countInvitationsPromise,
    countPendingPaymentsPromise,
  ]);

  if (profilesResponse.error) {
    console.error('Failed to count profiles', profilesResponse.error);
  }
  if (invitationsResponse.error) {
    console.error('Failed to count invitations', invitationsResponse.error);
  }
  if (paymentsResponse.error) {
    console.error('Failed to count payments', paymentsResponse.error);
  }

  const profileCount =
    typeof profilesResponse.count === 'number' ? profilesResponse.count : null;
  const invitationCount =
    typeof invitationsResponse.count === 'number' ? invitationsResponse.count : null;
  const pendingPaymentsCount =
    typeof paymentsResponse.count === 'number' ? paymentsResponse.count : null;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
        <p className="mt-4 text-3xl font-semibold text-gray-900">{formatValue(profileCount)}</p>
        <p className="mt-2 text-sm text-gray-500">Jumlah seluruh pengguna terdaftar.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <p className="text-sm font-medium text-gray-500">Total Undangan</p>
        <p className="mt-4 text-3xl font-semibold text-gray-900">{formatValue(invitationCount)}</p>
        <p className="mt-2 text-sm text-gray-500">Total undangan digital yang dibuat.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <p className="text-sm font-medium text-gray-500">Pembayaran Pending</p>
        <p className="mt-4 text-3xl font-semibold text-gray-900">{formatValue(pendingPaymentsCount)}</p>
        <p className="mt-2 text-sm text-gray-500">Jumlah pembayaran yang menunggu konfirmasi.</p>
      </div>
    </div>
  );
}