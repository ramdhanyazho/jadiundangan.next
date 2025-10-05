import { requireAdmin } from '@/lib/adminGuard';
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { admin } = await requireAdmin();
  const body = await req.json();
  const status = String(body?.status || '');
  if (!['paid', 'unpaid'].includes(status)) return new Response('Invalid status', { status: 400 });

  const { error } = await admin.from('payments').update({ status }).eq('id', params.id);
  if (error) return new Response(error.message, { status: 400 });
  return new Response(null, { status: 204 });
}
