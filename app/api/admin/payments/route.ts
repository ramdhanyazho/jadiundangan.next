import { requireAdmin } from '@/lib/adminGuard';
import { getAdminClient } from '@/lib/supabaseAdmin';
import type { Database } from '@/types/db';
export const dynamic = 'force-dynamic';

export async function GET() {
  await requireAdmin();
  const admin = getAdminClient();
  const paymentsTable = 'payments' satisfies keyof Database['public']['Tables'];
  const paymentsQuery = admin.from(paymentsTable) as any;
  const { data, error } = await paymentsQuery
    .select('id, invoice_no, amount, status, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return Response.json({ items: data ?? [] });
}
