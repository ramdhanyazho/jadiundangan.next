import { getServerClient } from '@/lib/supabaseServer';
import type { Database } from '@/types/db';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await req.json().catch(() => ({}));
  const groom_name = String(body?.groom_name || 'Mempelai Pria');
  const bride_name = String(body?.bride_name || 'Mempelai Wanita');

  const base = `${groom_name}-${bride_name}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const slug = base || `undangan-${Date.now()}`;

  const payload: Database['public']['Tables']['invitations']['Insert'] = {
    slug,
    title: `The Wedding of ${groom_name} & ${bride_name}`,
    groom_name,
    bride_name,
    theme_slug: 'jawabiru',
    is_published: false,
    user_id: user.id,
    pages_enabled: {
      cover: true,
      couple: true,
      event: true,
      gallery: true,
      story: true,
      guestbook: true,
      location: true,
      qrcode: true,
      prokes: false,
      gift: true,
    },
  };

  const typedSupabase = supabase as SupabaseClient<Database>;
  const { error } = await typedSupabase
    .from('invitations')
    // Supabase client typing fails to infer our table schema, so cast is required.
    .insert(payload as never);

  if (error) return new Response(error.message, { status: 400 });

  return Response.json({ ok: true, slug });
}
