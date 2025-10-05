import { requireAdmin } from '@/lib/adminGuard';
export const dynamic = 'force-dynamic';

const KEY = 'global';

export async function GET() {
  const { admin } = await requireAdmin();
  const { data } = await admin.from('settings').select('value').eq('key', KEY).maybeSingle();
  return Response.json({ value: data?.value || null });
}

export async function PATCH(req: Request) {
  const { admin } = await requireAdmin();
  const body = await req.json();
  const value = body?.value ?? {};
  const { error } = await admin.from('settings').upsert({ key: KEY, value }, { onConflict: 'key' });
  if (error) return new Response(error.message, { status: 400 });
  return new Response(null, { status: 204 });
}
