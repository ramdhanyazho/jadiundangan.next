import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

import { getServerClient } from '@/lib/supabaseServer';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { media_id } = (await req.json().catch(() => ({}))) as { media_id?: string };
  if (!media_id) {
    return new NextResponse('Missing media_id', { status: 400 });
  }

  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data: mediaRow } = await supabase
    .from('media')
    .select('id, url, invitation_id')
    .eq('id', media_id)
    .maybeSingle();

  if (!mediaRow?.invitation_id) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const { data: invitation } = await supabase
    .from('invitations')
    .select('user_id')
    .eq('id', mediaRow.invitation_id)
    .maybeSingle();

  if (!invitation || invitation.user_id !== user.id) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    if (mediaRow.url) {
      await del(mediaRow.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }
  } catch (error) {
    console.warn('[blob/delete] failed to delete blob', error);
  }

  await supabase.from('media').delete().eq('id', media_id);

  return NextResponse.json({ ok: true });
}
