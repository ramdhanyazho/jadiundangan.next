import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';

type Payload = {
  account: { email: string; password: string; full_name?: string };
  invitation: {
    slug?: string;
    title?: string;
    groom_name: string;
    bride_name: string;
    theme_slug: string;
    date_display?: string;
    location?: string;
  };
  options?: { confirmEmail?: boolean };
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);

export async function POST(req: Request) {
  const body = (await req.json()) as Payload;

  const email = body?.account?.email?.trim();
  const password = body?.account?.password;
  const full_name = body?.account?.full_name?.trim() || null;
  const inv = body?.invitation;

  if (!email || !password || !inv?.groom_name || !inv?.bride_name || !inv?.theme_slug) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  const { data: theme, error: themeErr } = await supabaseAdmin
    .from('themes')
    .select('slug,status')
    .eq('slug', inv.theme_slug)
    .eq('status', 'active')
    .maybeSingle();

  if (themeErr) {
    return new NextResponse(themeErr.message, { status: 400 });
  }

  if (!theme) {
    return new NextResponse('Theme not available', { status: 400 });
  }

  const baseSlug = inv.slug?.trim() || slugify(`${inv.groom_name}-${inv.bride_name}`);

  if (!baseSlug) {
    return new NextResponse('Slug is required', { status: 400 });
  }

  const { data: exists, error: slugErr } = await supabaseAdmin
    .from('invitations')
    .select('id')
    .eq('slug', baseSlug)
    .maybeSingle();

  if (slugErr) {
    return new NextResponse(slugErr.message, { status: 400 });
  }

  if (exists) {
    return new NextResponse('Slug already taken', { status: 409 });
  }

  const confirmEmail = body?.options?.confirmEmail ?? true;
  const { data: createdUser, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: !confirmEmail,
    user_metadata: { full_name },
  });

  if (createErr || !createdUser?.user?.id) {
    return new NextResponse(createErr?.message || 'Create user failed', { status: 400 });
  }

  const user_id = createdUser.user.id;

  const { error: profileErr } = await supabaseAdmin.from('profiles').upsert(
    {
      user_id,
      email,
      full_name,
      is_admin: false,
    },
    { onConflict: 'user_id' }
  );

  if (profileErr) {
    return new NextResponse(profileErr.message, { status: 400 });
  }

  const now = new Date().toISOString();
  const { data: invRow, error: invErr } = await supabaseAdmin
    .from('invitations')
    .insert({
      user_id,
      slug: baseSlug,
      title: inv.title || `The Wedding of ${inv.groom_name} & ${inv.bride_name}`,
      groom_name: inv.groom_name,
      bride_name: inv.bride_name,
      theme_slug: theme.slug,
      date_display: inv.date_display || null,
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

  if (invErr || !invRow?.id) {
    return new NextResponse(invErr?.message || 'Create invitation failed', { status: 400 });
  }

  if (inv.date_display || inv.location) {
    const eventsPayload = [
      {
        invitation_id: invRow.id,
        type: 'akad',
        title: 'Akad Nikah',
        date_display: inv.date_display || null,
        location: inv.location || null,
      },
      {
        invitation_id: invRow.id,
        type: 'resepsi',
        title: 'Resepsi',
        date_display: inv.date_display || null,
        location: inv.location || null,
      },
    ];

    const { error: eventErr } = await supabaseAdmin.from('events').insert(eventsPayload);

    if (eventErr) {
      return new NextResponse(eventErr.message, { status: 400 });
    }
  }

  return NextResponse.json(
    {
      ok: true,
      user_id,
      slug: baseSlug,
      next: '/client/login?created=1',
    },
    { status: 201 }
  );
}
