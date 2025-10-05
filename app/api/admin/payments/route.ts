import { requireAdmin } from '@/lib/adminGuard';
export const dynamic = 'force-dynamic';

export async function GET() {
  const { admin } = await requireAdmin();
  const { data } = await admin
    .from('payments')
    .select('id, invoice_no, amount, status, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(200);
  return Response.json({ items: data ?? [] });
}
