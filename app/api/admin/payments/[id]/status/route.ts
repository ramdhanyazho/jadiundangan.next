import { requireAdmin } from '@/lib/adminGuard';
import { getAdminClient } from '@/lib/supabaseAdmin';
import type { Database } from '@/types/db';

const ALLOWED_STATUSES = ['paid', 'unpaid'] as const;
type PaymentStatus = (typeof ALLOWED_STATUSES)[number];
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const supabaseAdmin = getAdminClient();
  const body = await req.json();
  const statusInput = String(body?.status || '');
  if (!ALLOWED_STATUSES.includes(statusInput as PaymentStatus)) {
    return new Response('Invalid status', { status: 400 });
  }

  const status = statusInput as PaymentStatus;

  const patchPayload = { status } satisfies Database['public']['Tables']['payments']['Update'];

  const paymentsTable = 'payments' satisfies keyof Database['public']['Tables'];
  const paymentsQuery = supabaseAdmin.from(paymentsTable) as any;

  const { error } = await paymentsQuery.update(patchPayload).eq('id', params.id);
  if (error) return new Response(error.message, { status: 400 });
  return new Response(null, { status: 204 });
}
