import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';
import { upsertProfileWithRetry } from '@/lib/upsertProfileWithRetry';

type Payload = {
  user_id: string;
  account: { email: string; full_name?: string | null };
  invitation: {
    slug?: string;
    groom_name: string;
    bride_name: string;
    title?: string;
    theme_slug: string;
    date_display?: string | null;
    location?: string | null;
  };
};

const admin = () =>
  createClient<Database, 'public'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;
  const { user_id, account, invitation } = body || {};

  if (!user_id || !account?.email || !invitation?.groom_name || !invitation?.bride_name || !invitation?.theme_slug) {
    return new NextResponse('Missing fields', { status: 400 });
  }

  const db = admin();

  const { data: theme, error: themeError } = await db
    .from('themes')
    .select('slug,status')
    .eq('slug', invitation.theme_slug)
    .eq('status', 'active')
    .maybeSingle();
  if (themeError) {
    return new NextResponse(themeError.message, { status: 400 });
  }
  if (!theme) {
    return new NextResponse('Theme not available', { status: 400 });
  }

  const base = invitation.slug?.trim() || slugify(`${invitation.groom_name}-${invitation.bride_name}`);
  if (!base) {
    return new NextResponse('Slug required', { status: 400 });
  }

  const { data: exist, error: slugError } = await db
    .from('invitations')
    .select('id')
    .eq('slug', base)
    .maybeSingle();
  if (slugError) {
    return new NextResponse(slugError.message, { status: 400 });
  }
  if (exist) {
    return new NextResponse('Slug already taken', { status: 409 });
  }

  const { error: profileErr } = await upsertProfileWithRetry(db, {
    user_id,
    email: account.email,
    full_name: account.full_name ?? null,
    is_admin: false,
  });

  if (profileErr) {
    return new NextResponse(profileErr.message, { status: 400 });
  }

  const now = new Date().toISOString();
  const { data: inserted, error: invErr } = await db
    .from('invitations')
    .insert({
      user_id,
      slug: base,
      title: invitation.title || `The Wedding of ${invitation.groom_name} & ${invitation.bride_name}`,
      groom_name: invitation.groom_name,
      bride_name: invitation.bride_name,
      theme_slug: theme.slug,
      date_display: invitation.date_display ?? null,
      music_url: null,
      cover_photo_url: null,
      pages_enabled: {
        cover: true,
        couple: true,
        event: true,
        wishes: true,
        gallery: true,
        story: true,
        location: true,
        qrcode: true,
        prokes: false,
        gift: true,
      },
      is_published: false,
      created_at: now,
      updated_at: now,
    })
    .select('id')
    .maybeSingle();

  if (invErr) {
    return new NextResponse(invErr.message, { status: 400 });
  }

  if (inserted?.id && (invitation.date_display || invitation.location)) {
    const eventsPayload = [
      {
        invitation_id: inserted.id,
        type: 'akad',
        title: 'Akad Nikah',
        date_display: invitation.date_display ?? null,
        location: invitation.location ?? null,
      },
      {
        invitation_id: inserted.id,
        type: 'resepsi',
        title: 'Resepsi',
        date_display: invitation.date_display ?? null,
        location: invitation.location ?? null,
      },
    ];

    const { error: eventsError } = await db.from('events').insert(eventsPayload);
    if (eventsError) {
      console.warn('[register-finalize] failed to insert default events', eventsError);
    }
  }

  return NextResponse.json({ ok: true });
}
