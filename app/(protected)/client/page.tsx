import { redirect } from 'next/navigation';

import { getSupabaseServerClient } from '@/lib/supabaseServer';

export default async function ClientDashboardPage() {
  const supabase = getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: invitations, error: invitationsError } = await supabase
    .from('invitations')
    .select('id, view_count')
    .eq('user_id', session.user.id);

  let activeInvitationsDisplay = '—';
  let totalVisitsDisplay = '—';
  let totalMessagesDisplay = '—';

  if (!invitationsError && Array.isArray(invitations)) {
    activeInvitationsDisplay = invitations.length.toString();

    const totalVisits = invitations.reduce((sum, invitation) => sum + (invitation.view_count ?? 0), 0);
    totalVisitsDisplay = totalVisits.toString();

    const invitationIds = invitations.map((invitation) => invitation.id).filter(Boolean);

    if (invitationIds.length === 0) {
      totalMessagesDisplay = '0';
    } else {
      const { count: messageCount, error: guestCountError } = await supabase
        .from('guests')
        .select('id', { count: 'exact', head: true })
        .in('invitation_id', invitationIds);

      if (!guestCountError && typeof messageCount === 'number') {
        totalMessagesDisplay = messageCount.toString();
      } else if (guestCountError?.code === 'PGRST116') {
        totalMessagesDisplay = '0';
      }
    }
  }

  const cards = [
    {
      title: 'Undangan Aktif',
      value: activeInvitationsDisplay,
      description: 'Jumlah undangan yang terhubung dengan akun Anda.',
    },
    {
      title: 'Total Kunjungan',
      value: totalVisitsDisplay,
      description: 'Akumulasi kunjungan dari semua undangan aktif.',
    },
    {
      title: 'Ucapan',
      value: totalMessagesDisplay,
      description: 'Jumlah ucapan dan RSVP yang diterima tamu.',
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard Client</h1>
        <p className="mt-2 text-sm text-gray-600">
          Pantau performa undangan digital Anda dan respon tamu di satu tempat.
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