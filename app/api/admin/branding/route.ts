import { NextResponse } from 'next/server';

import { getServerClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const { logo_url } = (await req.json().catch(() => ({}))) as { logo_url?: string };
  if (!logo_url) {
    return new NextResponse('logo_url required', { status: 400 });
  }

  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin, role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    return new NextResponse(profileError.message, { status: 400 });
  }

  const isAdmin = !!profile && (profile.is_admin === true || profile.role === 'admin');
  if (!isAdmin) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const { data: current, error: currentError } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'branding')
    .maybeSingle();

  if (currentError) {
    return new NextResponse(currentError.message, { status: 400 });
  }

  const nextValue = { ...(current?.value ?? {}), logo_url };

  const { error } = await supabase
    .from('settings')
    .update({ value: nextValue })
    .eq('key', 'branding');

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
