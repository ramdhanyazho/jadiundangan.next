import { requireAdmin } from '@/lib/adminGuard';
import { getAdminClient } from '@/lib/supabaseAdmin';
import type { Database } from '@/types/db';

const ALLOWED_STATUSES = ['active', 'inactive'] as const;
type ThemeStatus = (typeof ALLOWED_STATUSES)[number];
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const admin = getAdminClient();
  const themesTable = 'themes' satisfies keyof Database['public']['Tables'];
  const body = await req.json();
  const statusInput = String(body?.status || '');
  if (!ALLOWED_STATUSES.includes(statusInput as ThemeStatus)) {
    return new Response('Invalid status', { status: 400 });
  }

  const status = statusInput as ThemeStatus;
  const payload = { status } satisfies Pick<Database['public']['Tables']['themes']['Update'], 'status'>;
  const themesQuery = admin.from(themesTable) as any;

  const { error } = await themesQuery.update(payload).eq('id', params.id);
  if (error) return new Response(error.message, { status: 400 });
  return new Response(null, { status: 204 });
}
