import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerClient } from '@/lib/supabaseServer';

type CountCard = {
  title: string;
  value: string;
  description: string;
};

const createCard = (title: string, value: number | null, description: string): CountCard => ({
  title,
  value: value !== null && value !== undefined ? value.toString() : '—',
  description,
});

export default async function ClientDashboardPage() {
  const cookieStore = cookies();
  const supabase = getServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const invitationsResponse = await supabase
    .from('invitations')
    .select('id')
    .eq('user_id', session.user.id);

  if (invitationsResponse.error) {
    console.error('Failed to fetch invitations', invitationsResponse.error);
  }

  const invitationsData = (invitationsResponse.data ?? []) as { id: string }[];
  const invitationIds = invitationsResponse.error
    ? []
    : invitationsData.map((invitation) => invitation.id);
  const invitationCount = invitationsResponse.error ? null : invitationsData.length;

  let visitCount: number | null = null;
  let guestCount: number | null = null;

  if (invitationIds.length > 0) {
    const visitsResponse = await supabase
      .from('visit_logs')
      .select('id', { count: 'exact', head: true })
      .in('invitation_id', invitationIds);

    if (visitsResponse.error) {
      console.error('Failed to count visits', visitsResponse.error);
    }

    const guestsResponse = await supabase
      .from('guests')
      .select('id', { count: 'exact', head: true })
      .in('invitation_id', invitationIds);

    if (guestsResponse.error) {
      console.error('Failed to count guests', guestsResponse.error);
    }

    visitCount =
      typeof visitsResponse.count === 'number' ? visitsResponse.count : null;
    guestCount =
      typeof guestsResponse.count === 'number' ? guestsResponse.count : null;
  }

  const cards: CountCard[] = [
    createCard('Undangan Aktif', invitationCount, 'Jumlah undangan digital aktif milik Anda.'),
    createCard('Total Kunjungan', visitCount, 'Total kunjungan yang tercatat untuk undangan Anda.'),
    createCard('Ucapan', guestCount, 'Total ucapan dari tamu undangan.'),
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title} className="rounded-2xl bg-white p-6 shadow-xl">
          <p className="text-sm font-medium text-gray-500">{card.title}</p>
          <p className="mt-4 text-3xl font-semibold text-gray-900">{card.value}</p>
          <p className="mt-2 text-sm text-gray-500">{card.description}</p>
        </div>
      ))}
    </div>
  );
}