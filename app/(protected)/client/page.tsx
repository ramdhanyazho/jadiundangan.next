import { redirect } from 'next/navigation';

import { getServerClient } from '@/lib/supabaseServer';
import type { Database } from '@/types/db';

export const dynamic = 'force-dynamic';

export default async function ClientDashboardPage() {
  try {
    const supabase = getServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect('/client/login');
    }

    const { data: invitations, error: invitationsError } = await supabase
      .from('invitations')
      .select('id, view_count')
      .eq('user_id', session.user.id);

    let activeInvitationsDisplay = '—';
    let totalVisitsDisplay = '—';
    let totalMessagesDisplay = '—';

    if (!invitationsError && Array.isArray(invitations)) {
      type InvitationSummary = Pick<
        Database['public']['Tables']['invitations']['Row'],
        'id' | 'view_count'
      >;

      const invitationList = invitations as InvitationSummary[];

      activeInvitationsDisplay = invitationList.length.toString();

      const totalVisits = invitationList.reduce((sum, invitation) => sum + (invitation.view_count ?? 0), 0);
      totalVisitsDisplay = totalVisits.toString();

      const invitationIds = invitationList.map((invitation) => invitation.id).filter(Boolean);

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
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Konfigurasi Supabase belum lengkap.';

    return (
      <section className="space-y-4 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
        <h1 className="text-xl font-semibold text-slate-900">Dashboard Client</h1>
        <p>Data dashboard client tidak dapat dimuat.</p>
        <p className="font-medium text-rose-600">{message}</p>
        <p>Tambahkan kredensial Supabase pada variabel lingkungan agar data dapat ditampilkan.</p>
      </section>
    );
  }
}
