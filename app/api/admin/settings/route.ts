import { requireAdmin } from '@/lib/adminGuard';
import { getAdminClient } from '@/lib/supabaseAdmin';
import type { Database } from '@/types/db';
export const dynamic = 'force-dynamic';

const KEY = 'global';

export async function GET() {
  await requireAdmin();
  const admin = getAdminClient();
  const settingsTable = 'settings' satisfies keyof Database['public']['Tables'];

  const settingsQuery = admin.from(settingsTable) as any;

  const { data, error } = await settingsQuery
    .select('value')
    .eq('key', KEY)
    .maybeSingle();

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  const value = data ? data.value : null;
  return Response.json({ value });
}

export async function PATCH(req: Request) {
  await requireAdmin();
  const admin = getAdminClient();
  const settingsTable = 'settings' satisfies keyof Database['public']['Tables'];
  const body = await req.json();
  const value = (body?.value ?? {}) as Database['public']['Tables']['settings']['Insert']['value'];
  const payload = { key: KEY, value } satisfies Database['public']['Tables']['settings']['Insert'];
  const settingsQuery = admin.from(settingsTable) as any;
  const { error } = await settingsQuery.upsert(payload, { onConflict: 'key' });
  if (error) return new Response(error.message, { status: 400 });
  return new Response(null, { status: 204 });
}
