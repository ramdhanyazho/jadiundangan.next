import { getServerClient } from '@/lib/supabaseServer';

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

  const { error } = await supabase.from('invitations').insert({
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
  });

  if (error) return new Response(error.message, { status: 400 });

  return Response.json({ ok: true, slug });
}
