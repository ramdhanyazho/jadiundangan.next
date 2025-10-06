import { NextResponse } from 'next/server';

import { getServerClient } from '@/lib/supabaseServer';
import type { Database, Profile, SettingRow } from '@/types/db';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

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

  type BrandingSetting = Pick<SettingRow, 'value'>;

  const { data: current, error: currentError } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'branding')
    .maybeSingle<BrandingSetting>();

  if (currentError) {
    return new NextResponse(currentError.message, { status: 400 });
  }

  const currentValueRaw = current && 'value' in current ? current.value : undefined;
  const currentValue = isRecord(currentValueRaw) ? currentValueRaw : {};
  const nextValue = { ...currentValue, logo_url };
  const updatePayload: Database['public']['Tables']['settings']['Update'] = {
    value: nextValue,
  };

  const { error } = await (supabase.from('settings') as any)
    .update(updatePayload)
    .eq('key', 'branding');

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
