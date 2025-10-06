import { NextResponse } from 'next/server';

import { getServerClient } from '@/lib/supabaseServer';
import type { Database, Profile } from '@/types/db';

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

  type ProfileRoleInfo = Pick<Profile, 'is_admin' | 'role'>;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin, role')
    .eq('user_id', user.id)
    .maybeSingle<ProfileRoleInfo>();

  if (profileError) {
    return new NextResponse(profileError.message, { status: 400 });
  }

  const isAdmin = !!profile && (profile.is_admin === true || profile.role === 'admin');
  if (!isAdmin) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  type BrandingSetting = Database['public']['Tables']['settings']['Insert'];

  const brandingSettings: BrandingSetting = { key: 'branding', value: { logo_url: logoUrl } };

  const { error } = await supabase
    .from('settings')
    // Supabase's generated types currently widen this table to `never`, so cast until the schema typings are updated.
    .upsert(brandingSettings as never, { onConflict: 'key' });

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
