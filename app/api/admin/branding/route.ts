import { NextResponse } from 'next/server';

import { getServerClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const logoUrl = body?.logo_url as string | undefined;
  if (!logoUrl) {
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

  const { error } = await supabase
    .from('settings')
    .upsert({ key: 'branding', value: { logo_url: logoUrl } }, { onConflict: 'key' });

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
